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

import {
    Dataset,
    DatastoreConfig,
    DatabaseConfig,
    FieldConfig,
    TableConfig
} from './dataset';

export const FIELD_MAP = {
    CATEGORY: FieldConfig.get({ columnName: 'testCategoryField', prettyName: 'Test Category Field', type: 'string' }),
    DATE: FieldConfig.get({ columnName: 'testDateField', prettyName: 'Test Date Field', type: 'date' }),
    FIELD_KEY: FieldConfig.get({ columnName: 'testFieldKeyField', prettyName: 'Test Field Key Field', type: 'string' }),
    FILTER: FieldConfig.get({ columnName: 'testFilterField', prettyName: 'Test Filter Field', type: 'string' }),
    ID: FieldConfig.get({ columnName: 'testIdField', prettyName: 'Test ID Field', type: 'string' }),
    LINK: FieldConfig.get({ columnName: 'testLinkField', prettyName: 'Test Link Field', type: 'string' }),
    NAME: FieldConfig.get({ columnName: 'testNameField', prettyName: 'Test Name Field', type: 'string' }),
    RELATION_A: FieldConfig.get({ columnName: 'testRelationFieldA', prettyName: 'Test Relation Field A', type: 'string' }),
    RELATION_B: FieldConfig.get({ columnName: 'testRelationFieldB', prettyName: 'Test Relation Field B', type: 'string' }),
    SIZE: FieldConfig.get({ columnName: 'testSizeField', prettyName: 'Test Size Field', type: 'float' }),
    SORT: FieldConfig.get({ columnName: 'testSortField', prettyName: 'Test Sort Field', type: 'string' }),
    TEXT: FieldConfig.get({ columnName: 'testTextField', prettyName: 'Test Text Field', type: 'string' }),
    TYPE: FieldConfig.get({ columnName: 'testTypeField', prettyName: 'Test Type Field', type: 'string' }),
    X: FieldConfig.get({ columnName: 'testXField', prettyName: 'Test X Field', type: 'float' }),
    Y: FieldConfig.get({ columnName: 'testYField', prettyName: 'Test Y Field', type: 'float' }),
    ES_ID: FieldConfig.get({ columnName: '_id', prettyName: '_id', type: 'string' })
};

// Keep in alphabetical order.
export const FIELDS: FieldConfig[] = Object.values(FIELD_MAP);

export const TABLES = {
    testTable1: TableConfig.get({ name: 'testTable1', prettyName: 'Test Table 1', fields: FIELDS }),
    testTable2: TableConfig.get({ name: 'testTable2', prettyName: 'Test Table 2', fields: FIELDS })
};

export const TABLES_LIST = [TABLES.testTable1, TABLES.testTable2];

export const DATABASES = {
    testDatabase1: DatabaseConfig.get({
        name: 'testDatabase1',
        prettyName: 'Test Database 1',
        tables: TABLES
    }),
    testDatabase2: DatabaseConfig.get({
        name: 'testDatabase2',
        prettyName: 'Test Database 2',
        tables: TABLES
    })
};

export const DATABASES_LIST = [DATABASES.testDatabase1, DATABASES.testDatabase2];

export const DATASTORE: DatastoreConfig = DatastoreConfig.get({
    name: 'datastore1',
    host: 'testHostname',
    type: 'testDatastore',
    databases: DATABASES
});

export const TABLE_KEYS: Record<string, string> = {
    table_key_1: 'datastore1.testDatabase1.testTable1',
    table_key_2: 'datastore1.testDatabase2.testTable2'
};

export const FIELD_KEYS: Record<string, string> = {
    field_key_1: 'datastore1.testDatabase1.testTable1.testFieldKeyField'
};

const RELATIONS: string[][][] = [
    [
        [
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_A.columnName
        ],
        [
            DATASTORE.name + '.' + DATABASES.testDatabase2.name + '.' + TABLES.testTable2.name + '.' + FIELD_MAP.RELATION_A.columnName
        ]
    ],
    [
        [
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_B.columnName
        ],
        [
            DATASTORE.name + '.' + DATABASES.testDatabase2.name + '.' + TABLES.testTable2.name + '.' + FIELD_MAP.RELATION_B.columnName
        ]
    ]
];

export const DATASET: Dataset = new Dataset({ datastore1: DATASTORE }, null, null, RELATIONS, TABLE_KEYS, FIELD_KEYS);

