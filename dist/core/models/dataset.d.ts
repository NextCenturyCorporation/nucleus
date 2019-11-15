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
declare type Primitive = number | string | Date | boolean | undefined;
/**
 * This is a recursive mapped type (https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types)
 * that makes all fields optional but type checked (either it's missing or it's the correct type)
 */
export declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] | (T[P] extends (Primitive | Primitive[] | Record<string, Primitive>) ? (T[P] | undefined) : (T[P] extends any[] ? DeepPartial<T[P][0]>[] | undefined : (T[P] extends Record<string, any> ? (T[P][''] extends any[] ? Record<string, DeepPartial<T[P][''][0]>[]> : Record<string, DeepPartial<T[P]['']>>) : DeepPartial<T[P]>)));
} & {
    [key: string]: any;
};
export declare function translateValues<T>(obj: Record<string, Partial<T>>, transform: (input: Partial<T>) => T, applyNames?: boolean): Record<string, T>;
export interface FieldConfig {
    columnName: string;
    prettyName: string;
    hide: boolean;
    type: string;
}
export declare class FieldConfig {
    static get(field?: DeepPartial<FieldConfig>): FieldConfig;
}
export interface TableConfig {
    name: string;
    prettyName: string;
    fields: FieldConfig[];
    labelOptions: Record<string, any | Record<string, any>>;
}
export declare class TableConfig {
    static get(table?: DeepPartial<TableConfig>): TableConfig;
}
export interface DatabaseConfig {
    name: string;
    prettyName: string;
    tables: Record<string, TableConfig>;
}
export declare class DatabaseConfig {
    static get(db?: DeepPartial<DatabaseConfig>): DatabaseConfig;
}
export interface DatastoreConfig {
    name: string;
    host: string;
    type: string;
    databases: Record<string, DatabaseConfig>;
}
export declare class DatastoreConfig {
    static get(config?: DeepPartial<DatastoreConfig>): DatastoreConfig;
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
export declare class Dataset {
    private _datastores;
    private _connectionService;
    private _dataServer;
    tableKeyCollection: Record<string, string>;
    fieldKeyCollection: Record<string, string>;
    private _relations;
    constructor(_datastores: Record<string, DatastoreConfig>, _connectionService?: ConnectionService, _dataServer?: string, relations?: (string | string[])[][], tableKeyCollection?: Record<string, string>, fieldKeyCollection?: Record<string, string>);
    datastores: Record<string, DatastoreConfig>;
    dataServer: string;
    /**
     * Returns this dataset's relations.
     */
    getRelations(): FieldKey[][][];
    /**
     * Returns the database with the given name from the given datastore in this dataset.
     */
    retrieveDatabase(datastoreId: string, databaseName: string): DatabaseConfig;
    /**
     * Returns the dashboard dataset.
     */
    retrieveDatastore(datastoreId: string): DatastoreConfig;
    /**
     * Returns the field with the given name from the given datastore/database/table in this dataset.
     */
    retrieveField(datastoreId: string, databaseName: string, tableName: string, fieldName: string): FieldConfig;
    /**
     * Returns the datastore, database, table, and field objects using the given field key object.
     */
    retrieveDatasetFieldKey(fieldKey: FieldKey): DatasetFieldKey;
    /**
     * Returns the table with the given name from the given datastore/database in this dataset.
     */
    retrieveTable(datastoreId: string, databaseName: string, tableName: string): TableConfig;
    /**
     * Sets this dataset's relations.
     */
    setRelations(relations: (string | string[])[][]): void;
    private _handleDataServer;
    private _updateDatastores;
    /**
     * Returns the list of relation data for the current datastore:  elements of the outer array are individual relations and elements of
     * the inner array are specific fields within the relations.
     */
    private _validateRelations;
}
export declare class DatasetUtil {
    /**
     * Returns whether the given FieldKey objects are equal.
     */
    static areFieldKeysEqual(one: FieldKey, two: FieldKey): boolean;
    /**
     * Returns an object containing the datastore/database/table/field in the given tablekey (datastore.database.table) or fieldkey
     * (datastore.database.table.field).
     */
    static deconstructTableOrFieldKeySafely(key: string): FieldKey;
    /**
     * Returns an object containing the datastore/database/table/field in the given tablekey (datastore.database.table) or fieldkey
     * (datastore.database.table.field), or null if the key is not viable.
     */
    static deconstructTableOrFieldKey(key: string): FieldKey;
    /**
     * Returns the given FieldKey object as a string.
     */
    static fieldKeyToString(fieldKey: FieldKey): string;
    /**
     * Returns just the field name for the given field key.
     */
    static translateFieldKeyToFieldName(fieldKey: string, fieldKeys: Record<string, string>): string;
    /**
     * Retrieves the tables and fields from the data server for the databases in the given datastore and updates the objects as needed.
     */
    static updateDatastoreFromDataServer(connection: Connection, datastore: DatastoreConfig, previouslyFinishedUpdates: Record<string, string[]>, onFinish?: (failedDatabases: string[]) => void): Promise<void>;
    /**
     * Retrieves the field types from the data server for the given table and updates the individual field objects.
     */
    static updateFieldNamesAndTypesFromDataServer(connection: Connection, datastore: DatastoreConfig, database: DatabaseConfig, table: TableConfig): Promise<string>;
    /**
     * Ensures that the given datastore and its databases, tables, and fields have the required properties and returns it if valid.
     */
    static validateDatastore(datastore: DatastoreConfig): DatastoreConfig;
    /**
     * Ensures that the given datastores and their databases, tables, and fields have the required properties and returns the valid ones.
     */
    static validateDatastores(datastores: Record<string, DatastoreConfig>): Record<string, DatastoreConfig>;
}
export {};
