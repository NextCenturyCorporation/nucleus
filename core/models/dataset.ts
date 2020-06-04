/**
 * Copyright 2019 Next Century Corporation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Connection, ConnectionService } from '../services/connection.service';

import * as _ from 'lodash';

type Primitive = number | string | Date | boolean | undefined;

/**
 * This is a recursive mapped type (https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types)
 * that makes all fields optional but type checked (either it's missing or it's the correct type)
 */
export type DeepPartial<T> = {
    /* eslint-disable-next-line @typescript-eslint/generic-type-naming */
    [P in keyof T]?: T[P] |
    (T[P] extends (Primitive | Primitive[] | Record<string, Primitive>) ?
        (T[P] | undefined) :
        (T[P] extends any[] ?
            DeepPartial<T[P][0]>[] | undefined :
            (T[P] extends Record<string, any> ?
                (T[P][''] extends any[] ?
                    Record<string, DeepPartial<T[P][''][0]>[]> :
                    Record<string, DeepPartial<T[P]['']>>) :
                DeepPartial<T[P]>)));
} & {
    [key: string]: any;
};

export function translateValues<T>(
    obj: Record<string, Partial<T>>,
    transform: (input: Partial<T>) => T,
    applyNames = false
): Record<string, T> {
    for (const key of Object.keys(obj)) {
        obj[key] = transform(obj[key]);
        if (applyNames && !obj[key]['name']) {
            obj[key]['name'] = key;
        }
    }
    return obj as Record<string, T>;
}

function translate<T>(values: Partial<T>[], transform: (input: Partial<T>) => T): T[] {
    return values.map(transform);
}

export interface FieldConfig {
    columnName: string;
    prettyName: string;
    hide: boolean;
    type: string;
}

export class FieldConfig {
    static get(field: DeepPartial<FieldConfig> = {}) {
        return {
            columnName: '',
            prettyName: '',
            hide: false,
            type: '',
            ...field
        } as FieldConfig;
    }
}

export interface TableConfig {
    name: string;
    prettyName: string;
    fields: FieldConfig[];
    labelOptions: Record<string, any | Record<string, any>>;
}

export class TableConfig {
    static get(table: DeepPartial<TableConfig> = {}) {
        return {
            name: '',
            prettyName: '',
            mappings: {},
            labelOptions: {},
            ...table,
            fields: translate(table.fields || [], FieldConfig.get.bind(null))
        } as TableConfig;
    }
}

export interface DatabaseConfig {
    name: string;
    prettyName: string;
    tables: Record<string, TableConfig>;
}

export class DatabaseConfig {
    static get(db: DeepPartial<DatabaseConfig> = {}) {
        return {
            name: '',
            prettyName: '',
            ...db,
            tables: translateValues(db.tables || {}, TableConfig.get.bind(null), true)
        } as DatabaseConfig;
    }
}

export interface DatastoreConfig {
    name: string;
    host: string;
    type: string;
    databases: Record<string, DatabaseConfig>;
}

export class DatastoreConfig {
    static get(config: DeepPartial<DatastoreConfig> = {}) {
        return {
            name: '',
            host: '',
            type: '',
            ...config,
            databases: translateValues(config.databases || {}, DatabaseConfig.get.bind(null), true)
        } as DatastoreConfig;
    }
}

export interface FieldKey {
    datastore: string;
    database: string;
    table: string;
    field: string;
}

export interface DatasetFieldKey {
    datastore: DatastoreConfig;
    database: DatabaseConfig;
    table: TableConfig;
    field: FieldConfig;
}

export class Dataset {
    private _relations: FieldKey[][][];

    constructor(
        private _datastores: Record<string, DatastoreConfig>,
        private _connectionService: ConnectionService = null,
        private _dataServer: string = null,
        relations: (string|string[])[][] = [],
        public tableKeyCollection: Record<string, string> = {},
        public fieldKeyCollection: Record<string, string> = {}
    ) {
        if (this._connectionService) {
            this._connectionService.setDataServerHost(this._dataServer);
        }
        this._datastores = this._updateDatastores(this._datastores, relations);
        this.tableKeyCollection = this.tableKeyCollection || {};
        this.fieldKeyCollection = this.fieldKeyCollection || {};
    }

    get datastores(): Record<string, DatastoreConfig> {
        return this._datastores;
    }

    set datastores(newDatastores: Record<string, DatastoreConfig>) {
        this._datastores = this._updateDatastores(newDatastores);
    }

    get dataServer(): string {
        return this._dataServer;
    }

    set dataServer(newDataServer: string) {
        this._dataServer = newDataServer;
        if (this._connectionService) {
            this._connectionService.setDataServerHost(this._dataServer);
        }
    }

    /**
     * Returns this dataset's relations.
     */
    public getRelations(): FieldKey[][][] {
        return this._relations;
    }

    /**
     * Returns the database with the given name from the given datastore in this dataset.
     */
    public retrieveDatabase(datastoreId: string, databaseName: string): DatabaseConfig {
        const datastore: DatastoreConfig = this.retrieveDatastore(datastoreId);
        return datastore ? datastore.databases[databaseName] : undefined;
    }

    /**
     * Returns the dashboard dataset.
     */
    public retrieveDatastore(datastoreId: string): DatastoreConfig {
        if (datastoreId) {
            return this._datastores[datastoreId];
        }
        // Backwards compatibility:  in old saved states, assume an empty datastore references the first datastore.
        const datastoreNames = Object.keys(this._datastores);
        return datastoreNames.length ? this._datastores[datastoreNames[0]] : undefined;
    }

    /**
     * Returns the field with the given name from the given datastore/database/table in this dataset.
     */
    public retrieveField(datastoreId: string, databaseName: string, tableName: string, fieldName: string): FieldConfig {
        const table: TableConfig = this.retrieveTable(datastoreId, databaseName, tableName);
        return table ? table.fields.filter((element) => element.columnName === fieldName)[0] : undefined;
    }

    /**
     * Returns the datastore, database, table, and field objects using the given field key object.
     */
    public retrieveDatasetFieldKey(fieldKey: FieldKey): DatasetFieldKey {
        return {
            datastore: this.retrieveDatastore(fieldKey.datastore),
            database: this.retrieveDatabase(fieldKey.datastore, fieldKey.database),
            table: this.retrieveTable(fieldKey.datastore, fieldKey.database, fieldKey.table),
            field: this.retrieveField(fieldKey.datastore, fieldKey.database, fieldKey.table, fieldKey.field)
        };
    }

    /**
     * Returns the table with the given name from the given datastore/database in this dataset.
     */
    public retrieveTable(datastoreId: string, databaseName: string, tableName: string): TableConfig {
        const database: DatabaseConfig = this.retrieveDatabase(datastoreId, databaseName);
        return database ? database.tables[tableName] : undefined;
    }

    /**
     * Sets this dataset's relations.
     */
    public setRelations(relations: (string|string[])[][]): void {
        this._relations = this._validateRelations(relations);
    }

    private _updateDatastores(
        datastores: Record<string, DatastoreConfig>,
        relations?: (string|string[])[][]
    ): Record<string, DatastoreConfig> {
        const validated: Record<string, DatastoreConfig> = DatasetUtil.validateDatastores(datastores);
        if (this._connectionService) {
            Object.keys(validated).forEach((datastoreId) => {
                const connection = this._connectionService.connect(validated[datastoreId].type, validated[datastoreId].host);
                if (connection) {
                    DatasetUtil.updateDatastoreFromDataServer(connection, validated[datastoreId], {}, (__failedDatabases: string[]) => {
                        if (relations) {
                            this._relations = this._validateRelations(relations);
                        }
                    });
                }
            });
        } else if (relations) {
            this._relations = this._validateRelations(relations);
        }
        return validated;
    }

    /**
     * Returns the list of relation data for the current datastore:  elements of the outer array are individual relations and elements of
     * the inner array are specific fields within the relations.
     */
    private _validateRelations(relations: (string|string[])[][]): FieldKey[][][] {
        // Either expect string list structure:  [[a1, a2, a3], [b1, b2]]
        // ....Or expect nested list structure:  [[[x1, y1], [x2, y2], [x3, y3]], [[z1], [z2]]]
        //
        // Each element in the 1st (outermost) list is a separate relation.
        // Each element in the 2nd list is a relation field.
        // Each element in the 3rd (innermost) list is an ordered set of relation fields.  A filter must have each relation field within
        // the ordered set for the relation to be applied.
        //
        // EX: [ // relation list
        //       [ // single relation
        //         [ // relation fields
        //           'datastore1.database1.table1.fieldA',
        //           'datastore1.database1.table1.fieldB'
        //         ],
        //         [ // relation fields
        //           'datastore2.database2.table2.fieldX',
        //           'datastore2.database2.table2.fieldY'
        //         ]
        //       ]
        //     ]
        // Whenever a filter contains both fieldA and fieldB, create a relation filter by replacing fieldA with fieldX and fieldB with
        // fieldY.  Do the reverse whenever a filter contains both fieldX and fieldY.  Do not create a relation filter if a filter contains
        // just fieldA, or just fieldB, or just fieldX, or just fieldY, or more than fieldA and fieldB, or more than fieldX and fieldY.
        return relations.map((configRelation) => configRelation.map((configRelationFields) => {
            // A relation is an array of arrays.  The elements in the outer array are the sets of fields-to-substitute and the elements in
            // the inner arrays are the filtered fields.  The inner arrays must be the same length (the same number of filtered fields).
            let relationFields: string[] = Array.isArray(configRelationFields) ? configRelationFields : [configRelationFields];
            return relationFields.map((item) => {
                const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKeySafely(item);
                const datasetFieldKey: DatasetFieldKey = this.retrieveDatasetFieldKey(fieldKey);
                // Verify that the datastore, database, table, and field are all objects that exist within the dataset.
                return (datasetFieldKey.datastore && datasetFieldKey.database && datasetFieldKey.table && datasetFieldKey.field) ?
                    fieldKey : null;
            }).filter((item) => !!item);
        })).filter((relation) => {
            if (relation.length > 1) {
                // Ensure each inner array element has the same non-zero length because they must have the same number of filtered fields.
                let size = relation[0].length;
                return size && relation.every((relationFields) => relationFields.length === size);
            }
            return false;
        });
    }
}

export class DatasetUtil {
    /**
     * Returns whether the given FieldKey objects are equal.
     */
    static areFieldKeysEqual(one: FieldKey, two: FieldKey): boolean {
        return one.datastore === two.datastore && one.database === two.database && one.table === two.table && one.field === two.field;
    }

    /**
     * Returns an object containing the datastore/database/table/field in the given tablekey (datastore.database.table) or fieldkey
     * (datastore.database.table.field).
     */
    static deconstructTableOrFieldKeySafely(key: string): FieldKey {
        const [datastore, database, table, ...field] = (key || '').split('.');
        return {
            datastore: datastore || '',
            database: database || '',
            table: table || '',
            field: field.join('.')
        };
    }

    /**
     * Returns an object containing the datastore/database/table/field in the given tablekey (datastore.database.table) or fieldkey
     * (datastore.database.table.field), or null if the key is not viable.
     */
    static deconstructTableOrFieldKey(key: string): FieldKey {
        const fieldKeyObject: FieldKey = DatasetUtil.deconstructTableOrFieldKeySafely(key);
        return (fieldKeyObject.database && fieldKeyObject.table) ? fieldKeyObject : null;
    }

    /**
     * Returns the given FieldKey object as a string.
     */
    static fieldKeyToString(fieldKey: FieldKey): string {
        return fieldKey.datastore + '.' + fieldKey.database + '.' + fieldKey.table + '.' + fieldKey.field;
    }

    /**
     * Returns just the field name for the given field key.
     */
    static translateFieldKeyToFieldName(fieldKey: string, fieldKeys: Record<string, string>): string {
        return DatasetUtil.deconstructTableOrFieldKeySafely(fieldKeys[fieldKey] || fieldKey).field || fieldKey;
    }

    /**
     * Retrieves the tables and fields from the data server for the databases in the given datastore and updates the objects as needed.
     */
    static updateDatastoreFromDataServer(
        connection: Connection,
        datastore: DatastoreConfig,
        previouslyFinishedUpdates: Record<string, string[]>,
        onFinish?: (failedDatabases: string[]) => void
    ): Promise<void> {
        return Promise.all(Object.values(datastore.databases).reduce((promises: Promise<string>[], database: DatabaseConfig) =>
            promises.concat(Object.values(database.tables)
                .filter((table: TableConfig) => (previouslyFinishedUpdates[database.name] || []).indexOf(table.name) < 0)
                .map((table: TableConfig) => DatasetUtil.updateFieldNamesAndTypesFromDataServer(connection, datastore, database, table))),
        [] as Promise<string>[])).then((tableKeys: string[]) => {
            if (onFinish) {
                onFinish(tableKeys.filter((tableKey) => !!tableKey));
            }
        });
    }

    /**
     * Retrieves the field types from the data server for the given table and updates the individual field objects.
     */
    static updateFieldNamesAndTypesFromDataServer(
        connection: Connection,
        datastore: DatastoreConfig,
        database: DatabaseConfig,
        table: TableConfig
    ): Promise<string> {
        return new Promise<string>((resolve) =>
            connection.getFieldTypes(database.name, table.name, (fieldNamesAndTypes: Record<string, string>) => {
                if (fieldNamesAndTypes) {
                    let existingFieldNames = new Set(table.fields.map((field) => field.columnName));

                    Object.keys(fieldNamesAndTypes).forEach((fieldName: string) => {
                        if (!existingFieldNames.has(fieldName)) {
                            let newField: FieldConfig = FieldConfig.get({
                                columnName: fieldName,
                                prettyName: fieldName,
                                // If a lot of existing fields were defined (> 25), but this field wasn't, then hide this field.
                                hide: existingFieldNames.size > 25,
                                // Set the default type to text.
                                type: fieldNamesAndTypes[fieldName] || 'text'
                            });
                            table.fields.push(newField);
                        } else {
                            let oldField: FieldConfig = table.fields[_.findIndex(table.fields, (field) => field.columnName === fieldName)];
                            oldField.type = fieldNamesAndTypes[fieldName] || oldField.type;
                        }
                    });
                }
                // Don't return this table if it didn't error.
                resolve(null);
            }, (__error) => {
                // Return this table if it errors.
                resolve(datastore.name + '.' + database.name + '.' + table.name);
            }));
    }

    /**
     * Ensures that the given datastore and its databases, tables, and fields have the required properties and returns it if valid.
     */
    static validateDatastore(datastore: DatastoreConfig): DatastoreConfig {
        datastore.databases = Object.keys(datastore.databases || {}).reduce((outputDatabases, databaseName) => {
            let database: DatabaseConfig = datastore.databases[databaseName];
            database.name = databaseName;
            database.prettyName = database.prettyName || database.name;
            database.tables = Object.keys(database.tables || {}).reduce((outputTables, tableName) => {
                let table = database.tables[tableName];
                table.name = tableName;
                table.prettyName = table.prettyName || table.name;
                // Create a copy to maintain the original config file data.
                table.labelOptions = _.cloneDeep(table.labelOptions || {});
                table.fields = (table.fields || []).filter((field) => !!field.columnName).map((field) => {
                    field.prettyName = field.prettyName || field.columnName;
                    field.type = field.type || 'text';
                    return field;
                });
                // Always keep the table since its fields can be discovered with updateFieldNamesAndTypesFromDataServer
                outputTables[tableName] = table;
                return outputTables;
            }, {});
            if (Object.keys(database.tables).length) {
                outputDatabases[databaseName] = database;
            } else {
                console.warn('Ignoring database ' + databaseName + ' because it does not have any tables');
            }
            return outputDatabases;
        }, {});
        return (datastore.name && datastore.host && datastore.type && Object.keys(datastore.databases).length) ? datastore : null;
    }

    /**
     * Ensures that the given datastores and their databases, tables, and fields have the required properties and returns the valid ones.
     */
    static validateDatastores(datastores: Record<string, DatastoreConfig>): Record<string, DatastoreConfig> {
        return Object.keys(datastores).reduce((outputDatastores, datastoreId) => {
            let datastore: DatastoreConfig = datastores[datastoreId];
            datastore.name = datastoreId;
            outputDatastores[datastoreId] = DatasetUtil.validateDatastore(datastore);
            if (!outputDatastores[datastoreId]) {
                console.warn('Ignoring datastore ' + datastoreId + ' because it does not have correct configuration');
                delete outputDatastores[datastoreId];
            }
            return outputDatastores;
        }, {});
    }
}
