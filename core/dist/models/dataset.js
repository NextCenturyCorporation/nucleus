"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
// Needed to call setNeonServerUrl
var neon = require("neon-framework");
function translateValues(obj, transform, applyNames) {
    if (applyNames === void 0) { applyNames = false; }
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        obj[key] = transform(obj[key]);
        if (applyNames && !obj[key]['name']) {
            obj[key]['name'] = key;
        }
    }
    return obj;
}
exports.translateValues = translateValues;
function translate(values, transform) {
    return values.map(transform);
}
var FieldConfig = /** @class */ (function () {
    function FieldConfig() {
    }
    FieldConfig.get = function (field) {
        if (field === void 0) { field = {}; }
        return __assign({ columnName: '', prettyName: '', hide: false, type: '' }, field);
    };
    return FieldConfig;
}());
exports.FieldConfig = FieldConfig;
var TableConfig = /** @class */ (function () {
    function TableConfig() {
    }
    TableConfig.get = function (table) {
        if (table === void 0) { table = {}; }
        return __assign({ name: '', prettyName: '', mappings: {}, labelOptions: {} }, table, { fields: translate(table.fields || [], FieldConfig.get.bind(null)) });
    };
    return TableConfig;
}());
exports.TableConfig = TableConfig;
var DatabaseConfig = /** @class */ (function () {
    function DatabaseConfig() {
    }
    DatabaseConfig.get = function (db) {
        if (db === void 0) { db = {}; }
        return __assign({ name: '', prettyName: '' }, db, { tables: translateValues(db.tables || {}, TableConfig.get.bind(null), true) });
    };
    return DatabaseConfig;
}());
exports.DatabaseConfig = DatabaseConfig;
var DatastoreConfig = /** @class */ (function () {
    function DatastoreConfig() {
    }
    DatastoreConfig.get = function (config) {
        if (config === void 0) { config = {}; }
        return __assign({ name: '', host: '', type: '' }, config, { databases: translateValues(config.databases || {}, DatabaseConfig.get.bind(null), true) });
    };
    return DatastoreConfig;
}());
exports.DatastoreConfig = DatastoreConfig;
var Dataset = /** @class */ (function () {
    function Dataset(_datastores, _connectionService, _dataServer, relations, tableKeyCollection, fieldKeyCollection) {
        if (_connectionService === void 0) { _connectionService = null; }
        if (_dataServer === void 0) { _dataServer = null; }
        if (relations === void 0) { relations = []; }
        if (tableKeyCollection === void 0) { tableKeyCollection = {}; }
        if (fieldKeyCollection === void 0) { fieldKeyCollection = {}; }
        this._datastores = _datastores;
        this._connectionService = _connectionService;
        this._dataServer = _dataServer;
        this.tableKeyCollection = tableKeyCollection;
        this.fieldKeyCollection = fieldKeyCollection;
        this._datastores = this._updateDatastores(this._datastores);
        this._handleDataServer(this._dataServer);
        this._relations = this._validateRelations(relations);
    }
    Object.defineProperty(Dataset.prototype, "datastores", {
        get: function () {
            return this._datastores;
        },
        set: function (newDatastores) {
            this._datastores = this._updateDatastores(newDatastores);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dataset.prototype, "dataServer", {
        get: function () {
            return this._dataServer;
        },
        set: function (newDataServer) {
            this._handleDataServer(newDataServer);
            this._dataServer = newDataServer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns this dataset's relations.
     */
    Dataset.prototype.getRelations = function () {
        return this._relations;
    };
    /**
     * Returns the database with the given name from the given datastore in this dataset.
     */
    Dataset.prototype.retrieveDatabase = function (datastoreId, databaseName) {
        var datastore = this.retrieveDatastore(datastoreId);
        return datastore ? datastore.databases[databaseName] : undefined;
    };
    /**
     * Returns the dashboard dataset.
     */
    Dataset.prototype.retrieveDatastore = function (datastoreId) {
        if (datastoreId) {
            return this._datastores[datastoreId];
        }
        // Backwards compatibility:  in old saved states, assume an empty datastore references the first datastore.
        var datastoreNames = Object.keys(this._datastores);
        return datastoreNames.length ? this._datastores[datastoreNames[0]] : undefined;
    };
    /**
     * Returns the field with the given name from the given datastore/database/table in this dataset.
     */
    Dataset.prototype.retrieveField = function (datastoreId, databaseName, tableName, fieldName) {
        var table = this.retrieveTable(datastoreId, databaseName, tableName);
        return table ? table.fields.filter(function (element) { return element.columnName === fieldName; })[0] : undefined;
    };
    /**
     * Returns the datastore, database, table, and field objects using the given field key object.
     */
    Dataset.prototype.retrieveDatasetFieldKey = function (fieldKey) {
        return {
            datastore: this.retrieveDatastore(fieldKey.datastore),
            database: this.retrieveDatabase(fieldKey.datastore, fieldKey.database),
            table: this.retrieveTable(fieldKey.datastore, fieldKey.database, fieldKey.table),
            field: this.retrieveField(fieldKey.datastore, fieldKey.database, fieldKey.table, fieldKey.field)
        };
    };
    /**
     * Returns the table with the given name from the given datastore/database in this dataset.
     */
    Dataset.prototype.retrieveTable = function (datastoreId, databaseName, tableName) {
        var database = this.retrieveDatabase(datastoreId, databaseName);
        return database ? database.tables[tableName] : undefined;
    };
    /**
     * Sets this dataset's relations.
     */
    Dataset.prototype.setRelations = function (relations) {
        this._relations = this._validateRelations(relations);
    };
    Dataset.prototype._handleDataServer = function (dataServer) {
        if (dataServer) {
            neon.setNeonServerUrl(dataServer);
        }
    };
    Dataset.prototype._updateDatastores = function (datastores) {
        var _this = this;
        var validated = DatasetUtil.validateDatastores(datastores);
        if (this._connectionService) {
            Object.keys(validated).forEach(function (datastoreId) {
                var connection = _this._connectionService.connect(validated[datastoreId].type, validated[datastoreId].host);
                if (connection) {
                    DatasetUtil.updateDatastoreFromDataServer(connection, validated[datastoreId]);
                }
            });
        }
        return validated;
    };
    /**
     * Returns the list of relation data for the current datastore:  elements of the outer array are individual relations and elements of
     * the inner array are specific fields within the relations.
     */
    Dataset.prototype._validateRelations = function (relations) {
        var _this = this;
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
        return relations.map(function (configRelation) { return configRelation.map(function (configRelationFields) {
            // A relation is an array of arrays.  The elements in the outer array are the sets of fields-to-substitute and the elements in
            // the inner arrays are the filtered fields.  The inner arrays must be the same length (the same number of filtered fields).
            var relationFields = Array.isArray(configRelationFields) ? configRelationFields : [configRelationFields];
            return relationFields.map(function (item) {
                var fieldKey = DatasetUtil.deconstructTableOrFieldKeySafely(item);
                var datasetFieldKey = _this.retrieveDatasetFieldKey(fieldKey);
                // Verify that the datastore, database, table, and field are all objects that exist within the dataset.
                return (datasetFieldKey.datastore && datasetFieldKey.database && datasetFieldKey.table && datasetFieldKey.field) ?
                    fieldKey : null;
            }).filter(function (item) { return !!item; });
        }); }).filter(function (relation) {
            if (relation.length > 1) {
                // Ensure each inner array element has the same non-zero length because they must have the same number of filtered fields.
                var size_1 = relation[0].length;
                return size_1 && relation.every(function (relationFields) { return relationFields.length === size_1; });
            }
            return false;
        });
    };
    return Dataset;
}());
exports.Dataset = Dataset;
var DatasetUtil = /** @class */ (function () {
    function DatasetUtil() {
    }
    /**
     * Returns whether the given FieldKey objects are equal.
     */
    DatasetUtil.areFieldKeysEqual = function (one, two) {
        return one.datastore === two.datastore && one.database === two.database && one.table === two.table && one.field === two.field;
    };
    /**
     * Returns an object containing the datastore/database/table/field in the given tablekey (datastore.database.table) or fieldkey
     * (datastore.database.table.field).
     */
    DatasetUtil.deconstructTableOrFieldKeySafely = function (key) {
        var _a = (key || '').split('.'), datastore = _a[0], database = _a[1], table = _a[2], field = _a.slice(3);
        return {
            datastore: datastore || '',
            database: database || '',
            table: table || '',
            field: field.join('.')
        };
    };
    /**
     * Returns an object containing the datastore/database/table/field in the given tablekey (datastore.database.table) or fieldkey
     * (datastore.database.table.field), or null if the key is not viable.
     */
    DatasetUtil.deconstructTableOrFieldKey = function (key) {
        var fieldKeyObject = DatasetUtil.deconstructTableOrFieldKeySafely(key);
        return (fieldKeyObject.database && fieldKeyObject.table) ? fieldKeyObject : null;
    };
    /**
     * Returns the given FieldKey object as a string.
     */
    DatasetUtil.fieldKeyToString = function (fieldKey) {
        return fieldKey.datastore + '.' + fieldKey.database + '.' + fieldKey.table + '.' + fieldKey.field;
    };
    /**
     * Returns just the field name for the given field key.
     */
    DatasetUtil.translateFieldKeyToFieldName = function (fieldKey, fieldKeys) {
        return DatasetUtil.deconstructTableOrFieldKeySafely(fieldKeys[fieldKey] || fieldKey).field || fieldKey;
    };
    /**
     * Retrieves the tables and fields from the data server for the databases in the given datastore and updates the objects as needed.
     */
    DatasetUtil.updateDatastoreFromDataServer = function (connection, datastore, onFinish) {
        return Promise.all(Object.values(datastore.databases).map(function (database) {
            return DatasetUtil.updateFieldNamesFromDataServer(connection, database);
        })).then(function (databases) {
            if (onFinish) {
                onFinish(databases.filter(function (database) { return !!database; }));
            }
        });
    };
    /**
     * Retrieves the field names from the data server for the tables in the given database and updates the fields in the table objects.
     */
    DatasetUtil.updateFieldNamesFromDataServer = function (connection, database) {
        return new Promise(function (resolve) {
            connection.getTableNamesAndFieldNames(database.name, function (tableNamesAndFieldNames) {
                var promisesOnFields = [];
                Object.keys(tableNamesAndFieldNames).forEach(function (tableName) {
                    var table = database.tables[tableName];
                    if (table) {
                        var existingFields_1 = new Set(table.fields.map(function (field) { return field.columnName; }));
                        tableNamesAndFieldNames[tableName].forEach(function (fieldName) {
                            if (!existingFields_1.has(fieldName)) {
                                var newField = FieldConfig.get({
                                    columnName: fieldName,
                                    prettyName: fieldName,
                                    // If a lot of existing fields were defined (> 25), but this field wasn't, then hide this field.
                                    hide: existingFields_1.size > 25,
                                    // Set the default type to text.
                                    type: 'text'
                                });
                                table.fields.push(newField);
                            }
                        });
                        promisesOnFields.push(DatasetUtil.updateFieldTypesFromDataServer(connection, database, table));
                    }
                });
                Promise.all(promisesOnFields).then(function (tables) {
                    // Don't return this database if it and all its tables didn't error.
                    resolve(tables.filter(function (table) { return !!table; }).length ? database : null);
                });
            }, function (__error) {
                // Return this database if it errors.
                resolve(database);
            });
        });
    };
    /**
     * Retrieves the field types from the data server for the given table and updates the individual field objects.
     */
    DatasetUtil.updateFieldTypesFromDataServer = function (connection, database, table) {
        return new Promise(function (resolve) {
            return connection.getFieldTypes(database.name, table.name, function (fieldTypes) {
                if (fieldTypes) {
                    table.fields.forEach(function (field) {
                        field.type = fieldTypes[field.columnName] || field.type;
                    });
                }
                // Don't return this table if it didn't error.
                resolve(null);
            }, function (__error) {
                // Return this table if it errors.
                resolve(table);
            });
        });
    };
    /**
     * Ensures that the given datastore and its databases, tables, and fields have the required properties and returns it if valid.
     */
    DatasetUtil.validateDatastore = function (datastore) {
        datastore.databases = Object.keys(datastore.databases || {}).reduce(function (outputDatabases, databaseName) {
            var database = datastore.databases[databaseName];
            database.name = databaseName;
            database.prettyName = database.prettyName || database.name;
            database.tables = Object.keys(database.tables || {}).reduce(function (outputTables, tableName) {
                var table = database.tables[tableName];
                table.name = tableName;
                table.prettyName = table.prettyName || table.name;
                // Create a copy to maintain the original config file data.
                table.labelOptions = _.cloneDeep(table.labelOptions || {});
                table.fields = (table.fields || []).filter(function (field) { return !!field.columnName; }).map(function (field) {
                    field.prettyName = field.prettyName || field.columnName;
                    field.type = field.type || 'text';
                    return field;
                });
                // Always keep the table since its fields can be discovered with updateFieldNamesFromDataServer
                outputTables[tableName] = table;
                return outputTables;
            }, {});
            if (Object.keys(database.tables).length) {
                outputDatabases[databaseName] = database;
            }
            else {
                console.warn('Ignoring database ' + databaseName + ' because it does not have any tables');
            }
            return outputDatabases;
        }, {});
        return (datastore.name && datastore.host && datastore.type && Object.keys(datastore.databases).length) ? datastore : null;
    };
    /**
     * Ensures that the given datastores and their databases, tables, and fields have the required properties and returns the valid ones.
     */
    DatasetUtil.validateDatastores = function (datastores) {
        return Object.keys(datastores).reduce(function (outputDatastores, datastoreId) {
            var datastore = datastores[datastoreId];
            datastore.name = datastoreId;
            outputDatastores[datastoreId] = DatasetUtil.validateDatastore(datastore);
            if (!outputDatastores[datastoreId]) {
                console.warn('Ignoring datastore ' + datastoreId + ' because it does not have correct configuration');
                delete outputDatastores[datastoreId];
            }
            return outputDatastores;
        }, {});
    };
    return DatasetUtil;
}());
exports.DatasetUtil = DatasetUtil;
//# sourceMappingURL=dataset.js.map