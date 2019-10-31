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
var mock_dataset_1 = require("./mock.dataset");
var _ = require("lodash");
describe('Dataset Tests', function () {
    it('retrieveDatasetFieldKey does return expected list', function () {
        expect(mock_dataset_1.DATASET.retrieveDatasetFieldKey({
            datastore: mock_dataset_1.DATASTORE.name,
            database: mock_dataset_1.DATABASES.testDatabase2.name,
            table: mock_dataset_1.TABLES.testTable2.name,
            field: mock_dataset_1.FIELD_MAP.ID.columnName
        })).toEqual({
            datastore: mock_dataset_1.DATASTORE,
            database: mock_dataset_1.DATABASES.testDatabase2,
            table: mock_dataset_1.TABLES.testTable2,
            field: mock_dataset_1.FIELD_MAP.ID
        });
    });
    it('retrieveDatasetFieldKey does work with empty datastore', function () {
        expect(mock_dataset_1.DATASET.retrieveDatasetFieldKey({
            datastore: '',
            database: mock_dataset_1.DATABASES.testDatabase2.name,
            table: mock_dataset_1.TABLES.testTable2.name,
            field: mock_dataset_1.FIELD_MAP.ID.columnName
        })).toEqual({
            datastore: mock_dataset_1.DATASTORE,
            database: mock_dataset_1.DATABASES.testDatabase2,
            table: mock_dataset_1.TABLES.testTable2,
            field: mock_dataset_1.FIELD_MAP.ID
        });
    });
    it('retrieveDatabase does return expected object', function () {
        expect(mock_dataset_1.DATASET.retrieveDatabase(mock_dataset_1.DATASTORE.name, mock_dataset_1.DATABASES.testDatabase1.name)).toEqual(mock_dataset_1.DATABASES.testDatabase1);
        expect(mock_dataset_1.DATASET.retrieveDatabase(mock_dataset_1.DATASTORE.name, mock_dataset_1.DATABASES.testDatabase2.name)).toEqual(mock_dataset_1.DATABASES.testDatabase2);
        expect(mock_dataset_1.DATASET.retrieveDatabase(mock_dataset_1.DATASTORE.name, '')).toEqual(undefined);
        expect(mock_dataset_1.DATASET.retrieveDatabase('', '')).toEqual(undefined);
        // Backwards compatibility
        expect(mock_dataset_1.DATASET.retrieveDatabase('', mock_dataset_1.DATABASES.testDatabase2.name)).toEqual(mock_dataset_1.DATABASES.testDatabase2);
    });
    it('retrieveDatastore does return expected object', function () {
        expect(mock_dataset_1.DATASET.retrieveDatastore(mock_dataset_1.DATASTORE.name)).toEqual(mock_dataset_1.DATASTORE);
        expect(mock_dataset_1.DATASET.retrieveDatastore('absent')).toEqual(undefined);
        // Backwards compatibility
        expect(mock_dataset_1.DATASET.retrieveDatastore('')).toEqual(mock_dataset_1.DATASTORE);
    });
    it('retrieveField does return expected object', function () {
        expect(mock_dataset_1.DATASET.retrieveField(mock_dataset_1.DATASTORE.name, mock_dataset_1.DATABASES.testDatabase1.name, mock_dataset_1.TABLES.testTable1.name, mock_dataset_1.FIELD_MAP.ID.columnName))
            .toEqual(mock_dataset_1.FIELD_MAP.ID);
        expect(mock_dataset_1.DATASET.retrieveField(mock_dataset_1.DATASTORE.name, mock_dataset_1.DATABASES.testDatabase2.name, mock_dataset_1.TABLES.testTable2.name, mock_dataset_1.FIELD_MAP.ID.columnName))
            .toEqual(mock_dataset_1.FIELD_MAP.ID);
        expect(mock_dataset_1.DATASET.retrieveField(mock_dataset_1.DATASTORE.name, mock_dataset_1.DATABASES.testDatabase2.name, mock_dataset_1.TABLES.testTable2.name, mock_dataset_1.FIELD_MAP.TEXT.columnName))
            .toEqual(mock_dataset_1.FIELD_MAP.TEXT);
        expect(mock_dataset_1.DATASET.retrieveField(mock_dataset_1.DATASTORE.name, '', mock_dataset_1.TABLES.testTable1.name, mock_dataset_1.FIELD_MAP.ID.columnName)).toEqual(undefined);
        expect(mock_dataset_1.DATASET.retrieveField(mock_dataset_1.DATASTORE.name, mock_dataset_1.DATABASES.testDatabase1.name, '', mock_dataset_1.FIELD_MAP.ID.columnName)).toEqual(undefined);
        expect(mock_dataset_1.DATASET.retrieveField(mock_dataset_1.DATASTORE.name, mock_dataset_1.DATABASES.testDatabase1.name, mock_dataset_1.TABLES.testTable1.name, '')).toEqual(undefined);
        // Backwards compatibility
        expect(mock_dataset_1.DATASET.retrieveField('', mock_dataset_1.DATABASES.testDatabase2.name, mock_dataset_1.TABLES.testTable2.name, mock_dataset_1.FIELD_MAP.ID.columnName))
            .toEqual(mock_dataset_1.FIELD_MAP.ID);
    });
    it('retrieveTable does return expected object', function () {
        expect(mock_dataset_1.DATASET.retrieveTable(mock_dataset_1.DATASTORE.name, mock_dataset_1.DATABASES.testDatabase1.name, mock_dataset_1.TABLES.testTable1.name)).toEqual(mock_dataset_1.TABLES.testTable1);
        expect(mock_dataset_1.DATASET.retrieveTable(mock_dataset_1.DATASTORE.name, mock_dataset_1.DATABASES.testDatabase2.name, mock_dataset_1.TABLES.testTable2.name)).toEqual(mock_dataset_1.TABLES.testTable2);
        expect(mock_dataset_1.DATASET.retrieveTable(mock_dataset_1.DATASTORE.name, mock_dataset_1.DATABASES.testDatabase1.name, '')).toEqual(undefined);
        expect(mock_dataset_1.DATASET.retrieveTable(mock_dataset_1.DATASTORE.name, '', mock_dataset_1.TABLES.testTable1.name)).toEqual(undefined);
        // Backwards compatibility
        expect(mock_dataset_1.DATASET.retrieveTable('', mock_dataset_1.DATABASES.testDatabase2.name, mock_dataset_1.TABLES.testTable2.name)).toEqual(mock_dataset_1.TABLES.testTable2);
    });
});
describe('Dataset (Datastore) Tests', function () {
    it('dataset constructor does set absent properties in datastores, databases, tables, and fields', function () {
        var datastore = _.cloneDeep(mock_dataset_1.DATASTORE);
        delete datastore.name;
        delete datastore.databases.testDatabase1.name;
        delete datastore.databases.testDatabase1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.name;
        delete datastore.databases.testDatabase1.tables.testTable1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.labelOptions;
        delete datastore.databases.testDatabase1.tables.testTable1.fields;
        datastore.databases.testDatabase1.tables.testTable2.fields.forEach(function (field) {
            delete field.prettyName;
            delete field.type;
        });
        delete datastore.databases.testDatabase2.tables;
        var dataset = new dataset_1.Dataset({ datastore1: datastore });
        var expected = _.cloneDeep(mock_dataset_1.DATASTORE);
        expected.databases.testDatabase1.prettyName = expected.databases.testDatabase1.name;
        expected.databases.testDatabase1.tables.testTable1.prettyName = expected.databases.testDatabase1.tables.testTable1.name;
        expected.databases.testDatabase1.tables.testTable1.labelOptions = {};
        expected.databases.testDatabase1.tables.testTable1.fields = [];
        expected.databases.testDatabase1.tables.testTable2.fields.forEach(function (field) {
            field.prettyName = field.columnName;
            field.type = 'text';
        });
        delete expected.databases.testDatabase2;
        expect(dataset.datastores.datastore1).toEqual(expected);
    });
    it('datastores setter in dataset does set absent properties in datastores, databases, tables, and fields', function () {
        var dataset = new dataset_1.Dataset({});
        var datastore = _.cloneDeep(mock_dataset_1.DATASTORE);
        delete datastore.name;
        delete datastore.databases.testDatabase1.name;
        delete datastore.databases.testDatabase1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.name;
        delete datastore.databases.testDatabase1.tables.testTable1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.labelOptions;
        delete datastore.databases.testDatabase1.tables.testTable1.fields;
        datastore.databases.testDatabase1.tables.testTable2.fields.forEach(function (field) {
            delete field.prettyName;
            delete field.type;
        });
        delete datastore.databases.testDatabase2.tables;
        dataset.datastores = { datastore1: datastore };
        var expected = _.cloneDeep(mock_dataset_1.DATASTORE);
        expected.databases.testDatabase1.prettyName = expected.databases.testDatabase1.name;
        expected.databases.testDatabase1.tables.testTable1.prettyName = expected.databases.testDatabase1.tables.testTable1.name;
        expected.databases.testDatabase1.tables.testTable1.labelOptions = {};
        expected.databases.testDatabase1.tables.testTable1.fields = [];
        expected.databases.testDatabase1.tables.testTable2.fields.forEach(function (field) {
            field.prettyName = field.columnName;
            field.type = 'text';
        });
        delete expected.databases.testDatabase2;
        expect(dataset.datastores.datastore1).toEqual(expected);
    });
    it('validateDatastore does return null if the datastore name, host, type, or databases are absent', function () {
        var datastoreA = _.cloneDeep(mock_dataset_1.DATASTORE);
        delete datastoreA.name;
        expect(dataset_1.DatasetUtil.validateDatastore(datastoreA)).toEqual(null);
        var datastoreB = _.cloneDeep(mock_dataset_1.DATASTORE);
        delete datastoreB.host;
        expect(dataset_1.DatasetUtil.validateDatastore(datastoreB)).toEqual(null);
        var datastoreC = _.cloneDeep(mock_dataset_1.DATASTORE);
        delete datastoreC.type;
        expect(dataset_1.DatasetUtil.validateDatastore(datastoreC)).toEqual(null);
        var datastoreD = _.cloneDeep(mock_dataset_1.DATASTORE);
        delete datastoreD.databases;
        expect(dataset_1.DatasetUtil.validateDatastore(datastoreD)).toEqual(null);
    });
    it('validateDatastore does set absent properties in datastores, databases, tables, and fields', function () {
        var datastore = _.cloneDeep(mock_dataset_1.DATASTORE);
        delete datastore.databases.testDatabase1.name;
        delete datastore.databases.testDatabase1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.name;
        delete datastore.databases.testDatabase1.tables.testTable1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.labelOptions;
        delete datastore.databases.testDatabase1.tables.testTable1.fields;
        datastore.databases.testDatabase1.tables.testTable2.fields.forEach(function (field) {
            delete field.prettyName;
            delete field.type;
        });
        delete datastore.databases.testDatabase2.tables;
        var expected = _.cloneDeep(mock_dataset_1.DATASTORE);
        expected.databases.testDatabase1.prettyName = expected.databases.testDatabase1.name;
        expected.databases.testDatabase1.tables.testTable1.prettyName = expected.databases.testDatabase1.tables.testTable1.name;
        expected.databases.testDatabase1.tables.testTable1.labelOptions = {};
        expected.databases.testDatabase1.tables.testTable1.fields = [];
        expected.databases.testDatabase1.tables.testTable2.fields.forEach(function (field) {
            field.prettyName = field.columnName;
            field.type = 'text';
        });
        delete expected.databases.testDatabase2;
        expect(dataset_1.DatasetUtil.validateDatastore(datastore)).toEqual(expected);
    });
    it('validateDatastores does delete a datastore if its host, type, or databases are absent (but not name)', function () {
        var datastoreA = _.cloneDeep(mock_dataset_1.DATASTORE);
        delete datastoreA.name;
        expect(dataset_1.DatasetUtil.validateDatastores({ datastoreA: datastoreA })).not.toEqual({});
        var datastoreB = _.cloneDeep(mock_dataset_1.DATASTORE);
        delete datastoreB.host;
        expect(dataset_1.DatasetUtil.validateDatastores({ datastoreB: datastoreB })).toEqual({});
        var datastoreC = _.cloneDeep(mock_dataset_1.DATASTORE);
        delete datastoreC.type;
        expect(dataset_1.DatasetUtil.validateDatastores({ datastoreC: datastoreC })).toEqual({});
        var datastoreD = _.cloneDeep(mock_dataset_1.DATASTORE);
        delete datastoreD.databases;
        expect(dataset_1.DatasetUtil.validateDatastores({ datastoreD: datastoreD })).toEqual({});
    });
    it('validateDatastores does set absent properties in datastores, databases, tables, and fields', function () {
        var datastore = _.cloneDeep(mock_dataset_1.DATASTORE);
        delete datastore.databases.testDatabase1.name;
        delete datastore.databases.testDatabase1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.name;
        delete datastore.databases.testDatabase1.tables.testTable1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.labelOptions;
        delete datastore.databases.testDatabase1.tables.testTable1.fields;
        datastore.databases.testDatabase1.tables.testTable2.fields.forEach(function (field) {
            delete field.prettyName;
            delete field.type;
        });
        delete datastore.databases.testDatabase2.tables;
        var expected = _.cloneDeep(mock_dataset_1.DATASTORE);
        expected.databases.testDatabase1.prettyName = expected.databases.testDatabase1.name;
        expected.databases.testDatabase1.tables.testTable1.prettyName = expected.databases.testDatabase1.tables.testTable1.name;
        expected.databases.testDatabase1.tables.testTable1.labelOptions = {};
        expected.databases.testDatabase1.tables.testTable1.fields = [];
        expected.databases.testDatabase1.tables.testTable2.fields.forEach(function (field) {
            field.prettyName = field.columnName;
            field.type = 'text';
        });
        delete expected.databases.testDatabase2;
        expect(dataset_1.DatasetUtil.validateDatastores({ datastore1: datastore }).datastore1).toEqual(expected);
    });
});
describe('Dataset (Relation) Tests', function () {
    it('dataset constructor does work with relations in string list format', function () {
        var relations = [
            ['datastore1.testDatabase1.testTable1.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldA'],
            ['datastore1.testDatabase1.testTable1.testRelationFieldB', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
        ];
        var dataset = new dataset_1.Dataset({ datastore1: mock_dataset_1.DATASTORE }, null, null, relations);
        expect(dataset.getRelations()).toEqual([
            [
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase1.name,
                        table: mock_dataset_1.TABLES.testTable1.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }],
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase2.name,
                        table: mock_dataset_1.TABLES.testTable2.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }]
            ],
            [
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase1.name,
                        table: mock_dataset_1.TABLES.testTable1.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_B.columnName
                    }],
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase2.name,
                        table: mock_dataset_1.TABLES.testTable2.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_B.columnName
                    }]
            ]
        ]);
    });
    it('setRelations does work with relations in string list format', function () {
        var dataset = new dataset_1.Dataset({ datastore1: mock_dataset_1.DATASTORE });
        var relations = [
            ['datastore1.testDatabase1.testTable1.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldA'],
            ['datastore1.testDatabase1.testTable1.testRelationFieldB', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
        ];
        dataset.setRelations(relations);
        expect(dataset.getRelations()).toEqual([
            [
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase1.name,
                        table: mock_dataset_1.TABLES.testTable1.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }],
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase2.name,
                        table: mock_dataset_1.TABLES.testTable2.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }]
            ],
            [
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase1.name,
                        table: mock_dataset_1.TABLES.testTable1.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_B.columnName
                    }],
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase2.name,
                        table: mock_dataset_1.TABLES.testTable2.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_B.columnName
                    }]
            ]
        ]);
    });
    it('dataset constructor does work with relations in nested list format', function () {
        var relations = [
            [
                ['datastore1.testDatabase1.testTable1.testRelationFieldA'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA']
            ],
            [
                ['datastore1.testDatabase1.testTable1.testRelationFieldA', 'datastore1.testDatabase1.testTable1.testRelationFieldB'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
            ]
        ];
        var dataset = new dataset_1.Dataset({ datastore1: mock_dataset_1.DATASTORE }, null, null, relations);
        expect(dataset.getRelations()).toEqual([
            [
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase1.name,
                        table: mock_dataset_1.TABLES.testTable1.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }],
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase2.name,
                        table: mock_dataset_1.TABLES.testTable2.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }]
            ],
            [
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase1.name,
                        table: mock_dataset_1.TABLES.testTable1.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }, {
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase1.name,
                        table: mock_dataset_1.TABLES.testTable1.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_B.columnName
                    }],
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase2.name,
                        table: mock_dataset_1.TABLES.testTable2.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }, {
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase2.name,
                        table: mock_dataset_1.TABLES.testTable2.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_B.columnName
                    }]
            ]
        ]);
    });
    it('setRelations does work with relations in nested list format', function () {
        var dataset = new dataset_1.Dataset({ datastore1: mock_dataset_1.DATASTORE });
        var relations = [
            [
                ['datastore1.testDatabase1.testTable1.testRelationFieldA'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA']
            ],
            [
                ['datastore1.testDatabase1.testTable1.testRelationFieldA', 'datastore1.testDatabase1.testTable1.testRelationFieldB'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
            ]
        ];
        dataset.setRelations(relations);
        expect(dataset.getRelations()).toEqual([
            [
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase1.name,
                        table: mock_dataset_1.TABLES.testTable1.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }],
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase2.name,
                        table: mock_dataset_1.TABLES.testTable2.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }]
            ],
            [
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase1.name,
                        table: mock_dataset_1.TABLES.testTable1.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }, {
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase1.name,
                        table: mock_dataset_1.TABLES.testTable1.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_B.columnName
                    }],
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase2.name,
                        table: mock_dataset_1.TABLES.testTable2.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }, {
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase2.name,
                        table: mock_dataset_1.TABLES.testTable2.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_B.columnName
                    }]
            ]
        ]);
    });
    it('dataset constructor does work with relations in both single and nested list formats', function () {
        var relations = [
            ['datastore1.testDatabase1.testTable1.testRelationFieldA', ['datastore1.testDatabase2.testTable2.testRelationFieldA']],
            [['datastore1.testDatabase1.testTable1.testRelationFieldB'], 'datastore1.testDatabase2.testTable2.testRelationFieldB']
        ];
        var dataset = new dataset_1.Dataset({ datastore1: mock_dataset_1.DATASTORE }, null, null, relations);
        expect(dataset.getRelations()).toEqual([
            [
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase1.name,
                        table: mock_dataset_1.TABLES.testTable1.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }],
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase2.name,
                        table: mock_dataset_1.TABLES.testTable2.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }]
            ],
            [
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase1.name,
                        table: mock_dataset_1.TABLES.testTable1.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_B.columnName
                    }],
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase2.name,
                        table: mock_dataset_1.TABLES.testTable2.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_B.columnName
                    }]
            ]
        ]);
    });
    it('setRelations does work with relations in both single and nested list formats', function () {
        var dataset = new dataset_1.Dataset({ datastore1: mock_dataset_1.DATASTORE });
        var relations = [
            ['datastore1.testDatabase1.testTable1.testRelationFieldA', ['datastore1.testDatabase2.testTable2.testRelationFieldA']],
            [['datastore1.testDatabase1.testTable1.testRelationFieldB'], 'datastore1.testDatabase2.testTable2.testRelationFieldB']
        ];
        dataset.setRelations(relations);
        expect(dataset.getRelations()).toEqual([
            [
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase1.name,
                        table: mock_dataset_1.TABLES.testTable1.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }],
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase2.name,
                        table: mock_dataset_1.TABLES.testTable2.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                    }]
            ],
            [
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase1.name,
                        table: mock_dataset_1.TABLES.testTable1.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_B.columnName
                    }],
                [{
                        datastore: mock_dataset_1.DATASTORE.name,
                        database: mock_dataset_1.DATABASES.testDatabase2.name,
                        table: mock_dataset_1.TABLES.testTable2.name,
                        field: mock_dataset_1.FIELD_MAP.RELATION_B.columnName
                    }]
            ]
        ]);
    });
    it('dataset constructor does ignore relations on databases/tables/fields that don\'t exist', function () {
        var relations = [
            ['datastore1.fakeDatabase1.testTable1.testRelationFieldA', 'datastore1.fakeDatabase2.testTable2.testRelationFieldA'],
            ['datastore1.testDatabase1.fakeTable1.testRelationFieldA', 'datastore1.testDatabase2.fakeTable2.testRelationFieldA'],
            ['datastore1.testDatabase1.testTable1.fakeRelationFieldA', 'datastore1.testDatabase2.testTable2.fakeRelationFieldA'],
            [
                ['datastore1.fakeDatabase1.testTable1.fakeRelationFieldA', 'datastore1.fakeDatabase1.testTable1.fakeRelationFieldA'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
            ],
            [
                ['datastore1.testDatabase1.fakeTable1.fakeRelationFieldA', 'datastore1.testDatabase1.fakeTable1.fakeRelationFieldA'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
            ],
            [
                ['datastore1.testDatabase1.testTable1.fakeRelationFieldA', 'datastore1.testDatabase1.testTable1.fakeRelationFieldA'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
            ]
        ];
        var dataset = new dataset_1.Dataset({ datastore1: mock_dataset_1.DATASTORE }, null, null, relations);
        expect(dataset.getRelations()).toEqual([]);
    });
    it('setRelations does ignore relations on databases/tables/fields that don\'t exist', function () {
        var dataset = new dataset_1.Dataset({ datastore1: mock_dataset_1.DATASTORE });
        var relations = [
            ['datastore1.fakeDatabase1.testTable1.testRelationFieldA', 'datastore1.fakeDatabase2.testTable2.testRelationFieldA'],
            ['datastore1.testDatabase1.fakeTable1.testRelationFieldA', 'datastore1.testDatabase2.fakeTable2.testRelationFieldA'],
            ['datastore1.testDatabase1.testTable1.fakeRelationFieldA', 'datastore1.testDatabase2.testTable2.fakeRelationFieldA'],
            [
                ['datastore1.fakeDatabase1.testTable1.fakeRelationFieldA', 'datastore1.fakeDatabase1.testTable1.fakeRelationFieldA'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
            ],
            [
                ['datastore1.testDatabase1.fakeTable1.fakeRelationFieldA', 'datastore1.testDatabase1.fakeTable1.fakeRelationFieldA'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
            ],
            [
                ['datastore1.testDatabase1.testTable1.fakeRelationFieldA', 'datastore1.testDatabase1.testTable1.fakeRelationFieldA'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
            ]
        ];
        dataset.setRelations(relations);
        expect(dataset.getRelations()).toEqual([]);
    });
    it('dataset constructor does ignore relations with unequal numbers of fields', function () {
        var relations = [
            [['datastore1.testDatabase1.testTable1.testRelationFieldA'], []],
            [[], ['datastore1.testDatabase2.testTable2.testRelationFieldA']],
            [
                ['datastore1.testDatabase1.testTable1.testRelationFieldA', 'datastore1.testDatabase1.testTable1.testRelationFieldB'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA']
            ],
            [
                ['datastore1.testDatabase1.testTable1.testRelationFieldA'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
            ]
        ];
        var dataset = new dataset_1.Dataset({ datastore1: mock_dataset_1.DATASTORE }, null, null, relations);
        expect(dataset.getRelations()).toEqual([]);
    });
    it('setRelations does ignore relations with unequal numbers of fields', function () {
        var dataset = new dataset_1.Dataset({ datastore1: mock_dataset_1.DATASTORE });
        var relations = [
            [['datastore1.testDatabase1.testTable1.testRelationFieldA'], []],
            [[], ['datastore1.testDatabase2.testTable2.testRelationFieldA']],
            [
                ['datastore1.testDatabase1.testTable1.testRelationFieldA', 'datastore1.testDatabase1.testTable1.testRelationFieldB'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA']
            ],
            [
                ['datastore1.testDatabase1.testTable1.testRelationFieldA'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
            ]
        ];
        dataset.setRelations(relations);
        expect(dataset.getRelations()).toEqual([]);
    });
});
describe('Dataset Util Misc Tests', function () {
    it('deconstructTableOrFieldKeySafely should work as expected', function () {
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKeySafely(null)).toEqual({
            datastore: '',
            database: '',
            table: '',
            field: ''
        });
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKeySafely('')).toEqual({
            datastore: '',
            database: '',
            table: '',
            field: ''
        });
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKeySafely('a')).toEqual({
            datastore: 'a',
            database: '',
            table: '',
            field: ''
        });
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKeySafely('a.b')).toEqual({
            datastore: 'a',
            database: 'b',
            table: '',
            field: ''
        });
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKeySafely('a.b.c')).toEqual({
            datastore: 'a',
            database: 'b',
            table: 'c',
            field: ''
        });
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKeySafely('...d')).toEqual({
            datastore: '',
            database: '',
            table: '',
            field: 'd'
        });
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKeySafely('a.b.c.d')).toEqual({
            datastore: 'a',
            database: 'b',
            table: 'c',
            field: 'd'
        });
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKeySafely('a.b.c.d.e.f')).toEqual({
            datastore: 'a',
            database: 'b',
            table: 'c',
            field: 'd.e.f'
        });
    });
    it('deconstructTableOrFieldKey should work as expected', function () {
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKey(null)).toEqual(null);
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKey('')).toEqual(null);
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKey('a')).toEqual(null);
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKey('a.b')).toEqual(null);
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKey('...d')).toEqual(null);
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKey('a.b.c')).toEqual({
            datastore: 'a',
            database: 'b',
            table: 'c',
            field: ''
        });
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKey('a.b.c.d')).toEqual({
            datastore: 'a',
            database: 'b',
            table: 'c',
            field: 'd'
        });
        expect(dataset_1.DatasetUtil.deconstructTableOrFieldKey('a.b.c.d.e.f')).toEqual({
            datastore: 'a',
            database: 'b',
            table: 'c',
            field: 'd.e.f'
        });
    });
    it('translateFieldKeyToFieldName does return expected string', function () {
        var keyMap = {
            key1: 'a.b.c',
            key2: 'a.b.c.d',
            key3: 'a.b.c.d.e.f'
        };
        expect(dataset_1.DatasetUtil.translateFieldKeyToFieldName('key2', keyMap)).toEqual('d');
        expect(dataset_1.DatasetUtil.translateFieldKeyToFieldName('key3', keyMap)).toEqual('d.e.f');
        expect(dataset_1.DatasetUtil.translateFieldKeyToFieldName('w.x.y.z', keyMap)).toEqual('z');
        expect(dataset_1.DatasetUtil.translateFieldKeyToFieldName('testFieldName', keyMap)).toEqual('testFieldName');
    });
});
//# sourceMappingURL=dataset.spec.js.map