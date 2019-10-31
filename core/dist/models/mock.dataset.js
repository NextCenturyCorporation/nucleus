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
Object.defineProperty(exports, "__esModule", { value: true });
var dataset_1 = require("./dataset");
exports.FIELD_MAP = {
    CATEGORY: dataset_1.FieldConfig.get({ columnName: 'testCategoryField', prettyName: 'Test Category Field', type: 'string' }),
    DATE: dataset_1.FieldConfig.get({ columnName: 'testDateField', prettyName: 'Test Date Field', type: 'date' }),
    FIELD_KEY: dataset_1.FieldConfig.get({ columnName: 'testFieldKeyField', prettyName: 'Test Field Key Field', type: 'string' }),
    FILTER: dataset_1.FieldConfig.get({ columnName: 'testFilterField', prettyName: 'Test Filter Field', type: 'string' }),
    ID: dataset_1.FieldConfig.get({ columnName: 'testIdField', prettyName: 'Test ID Field', type: 'string' }),
    LINK: dataset_1.FieldConfig.get({ columnName: 'testLinkField', prettyName: 'Test Link Field', type: 'string' }),
    NAME: dataset_1.FieldConfig.get({ columnName: 'testNameField', prettyName: 'Test Name Field', type: 'string' }),
    RELATION_A: dataset_1.FieldConfig.get({ columnName: 'testRelationFieldA', prettyName: 'Test Relation Field A', type: 'string' }),
    RELATION_B: dataset_1.FieldConfig.get({ columnName: 'testRelationFieldB', prettyName: 'Test Relation Field B', type: 'string' }),
    SIZE: dataset_1.FieldConfig.get({ columnName: 'testSizeField', prettyName: 'Test Size Field', type: 'float' }),
    SORT: dataset_1.FieldConfig.get({ columnName: 'testSortField', prettyName: 'Test Sort Field', type: 'string' }),
    TEXT: dataset_1.FieldConfig.get({ columnName: 'testTextField', prettyName: 'Test Text Field', type: 'string' }),
    TYPE: dataset_1.FieldConfig.get({ columnName: 'testTypeField', prettyName: 'Test Type Field', type: 'string' }),
    X: dataset_1.FieldConfig.get({ columnName: 'testXField', prettyName: 'Test X Field', type: 'float' }),
    Y: dataset_1.FieldConfig.get({ columnName: 'testYField', prettyName: 'Test Y Field', type: 'float' }),
    ES_ID: dataset_1.FieldConfig.get({ columnName: '_id', prettyName: '_id', type: 'string' })
};
// Keep in alphabetical order.
exports.FIELDS = Object.values(exports.FIELD_MAP);
exports.TABLES = {
    testTable1: dataset_1.TableConfig.get({ name: 'testTable1', prettyName: 'Test Table 1', fields: exports.FIELDS }),
    testTable2: dataset_1.TableConfig.get({ name: 'testTable2', prettyName: 'Test Table 2', fields: exports.FIELDS })
};
exports.TABLES_LIST = [exports.TABLES.testTable1, exports.TABLES.testTable2];
exports.DATABASES = {
    testDatabase1: dataset_1.DatabaseConfig.get({
        name: 'testDatabase1',
        prettyName: 'Test Database 1',
        tables: exports.TABLES
    }),
    testDatabase2: dataset_1.DatabaseConfig.get({
        name: 'testDatabase2',
        prettyName: 'Test Database 2',
        tables: exports.TABLES
    })
};
exports.DATABASES_LIST = [exports.DATABASES.testDatabase1, exports.DATABASES.testDatabase2];
exports.DATASTORE = dataset_1.DatastoreConfig.get({
    name: 'datastore1',
    host: 'testHostname',
    type: 'testDatastore',
    databases: exports.DATABASES
});
exports.TABLE_KEYS = {
    table_key_1: 'datastore1.testDatabase1.testTable1',
    table_key_2: 'datastore1.testDatabase2.testTable2'
};
exports.FIELD_KEYS = {
    field_key_1: 'datastore1.testDatabase1.testTable1.testFieldKeyField'
};
var RELATIONS = [
    [
        [
            exports.DATASTORE.name + '.' + exports.DATABASES.testDatabase1.name + '.' + exports.TABLES.testTable1.name + '.' + exports.FIELD_MAP.RELATION_A.columnName
        ],
        [
            exports.DATASTORE.name + '.' + exports.DATABASES.testDatabase2.name + '.' + exports.TABLES.testTable2.name + '.' + exports.FIELD_MAP.RELATION_A.columnName
        ]
    ],
    [
        [
            exports.DATASTORE.name + '.' + exports.DATABASES.testDatabase1.name + '.' + exports.TABLES.testTable1.name + '.' + exports.FIELD_MAP.RELATION_B.columnName
        ],
        [
            exports.DATASTORE.name + '.' + exports.DATABASES.testDatabase2.name + '.' + exports.TABLES.testTable2.name + '.' + exports.FIELD_MAP.RELATION_B.columnName
        ]
    ]
];
exports.DATASET = new dataset_1.Dataset({ datastore1: exports.DATASTORE }, null, null, RELATIONS, exports.TABLE_KEYS, exports.FIELD_KEYS);
//# sourceMappingURL=mock.dataset.js.map