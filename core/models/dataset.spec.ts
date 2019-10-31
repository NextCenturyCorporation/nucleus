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

import { Dataset, DatasetUtil } from './dataset';
import { DATABASES, DATASET, DATASTORE, FIELD_MAP, TABLES } from './mock.dataset';
import * as _ from 'lodash';

describe('Dataset Tests', () => {
    it('retrieveDatasetFieldKey does return expected list', () => {
        expect(DATASET.retrieveDatasetFieldKey({
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase2.name,
            table: TABLES.testTable2.name,
            field: FIELD_MAP.ID.columnName
        })).toEqual({
            datastore: DATASTORE,
            database: DATABASES.testDatabase2,
            table: TABLES.testTable2,
            field: FIELD_MAP.ID
        });
    });

    it('retrieveDatasetFieldKey does work with empty datastore', () => {
        expect(DATASET.retrieveDatasetFieldKey({
            datastore: '',
            database: DATABASES.testDatabase2.name,
            table: TABLES.testTable2.name,
            field: FIELD_MAP.ID.columnName
        })).toEqual({
            datastore: DATASTORE,
            database: DATABASES.testDatabase2,
            table: TABLES.testTable2,
            field: FIELD_MAP.ID
        });
    });

    it('retrieveDatabase does return expected object', () => {
        expect(DATASET.retrieveDatabase(DATASTORE.name, DATABASES.testDatabase1.name)).toEqual(DATABASES.testDatabase1);
        expect(DATASET.retrieveDatabase(DATASTORE.name, DATABASES.testDatabase2.name)).toEqual(DATABASES.testDatabase2);
        expect(DATASET.retrieveDatabase(DATASTORE.name, '')).toEqual(undefined);
        expect(DATASET.retrieveDatabase('', '')).toEqual(undefined);

        // Backwards compatibility
        expect(DATASET.retrieveDatabase('', DATABASES.testDatabase2.name)).toEqual(DATABASES.testDatabase2);
    });

    it('retrieveDatastore does return expected object', () => {
        expect(DATASET.retrieveDatastore(DATASTORE.name)).toEqual(DATASTORE);
        expect(DATASET.retrieveDatastore('absent')).toEqual(undefined);

        // Backwards compatibility
        expect(DATASET.retrieveDatastore('')).toEqual(DATASTORE);
    });

    it('retrieveField does return expected object', () => {
        expect(DATASET.retrieveField(DATASTORE.name, DATABASES.testDatabase1.name, TABLES.testTable1.name, FIELD_MAP.ID.columnName))
            .toEqual(FIELD_MAP.ID);
        expect(DATASET.retrieveField(DATASTORE.name, DATABASES.testDatabase2.name, TABLES.testTable2.name, FIELD_MAP.ID.columnName))
            .toEqual(FIELD_MAP.ID);
        expect(DATASET.retrieveField(DATASTORE.name, DATABASES.testDatabase2.name, TABLES.testTable2.name, FIELD_MAP.TEXT.columnName))
            .toEqual(FIELD_MAP.TEXT);
        expect(DATASET.retrieveField(DATASTORE.name, '', TABLES.testTable1.name, FIELD_MAP.ID.columnName)).toEqual(undefined);
        expect(DATASET.retrieveField(DATASTORE.name, DATABASES.testDatabase1.name, '', FIELD_MAP.ID.columnName)).toEqual(undefined);
        expect(DATASET.retrieveField(DATASTORE.name, DATABASES.testDatabase1.name, TABLES.testTable1.name, '')).toEqual(undefined);

        // Backwards compatibility
        expect(DATASET.retrieveField('', DATABASES.testDatabase2.name, TABLES.testTable2.name, FIELD_MAP.ID.columnName))
            .toEqual(FIELD_MAP.ID);
    });

    it('retrieveTable does return expected object', () => {
        expect(DATASET.retrieveTable(DATASTORE.name, DATABASES.testDatabase1.name, TABLES.testTable1.name)).toEqual(TABLES.testTable1);
        expect(DATASET.retrieveTable(DATASTORE.name, DATABASES.testDatabase2.name, TABLES.testTable2.name)).toEqual(TABLES.testTable2);
        expect(DATASET.retrieveTable(DATASTORE.name, DATABASES.testDatabase1.name, '')).toEqual(undefined);
        expect(DATASET.retrieveTable(DATASTORE.name, '', TABLES.testTable1.name)).toEqual(undefined);

        // Backwards compatibility
        expect(DATASET.retrieveTable('', DATABASES.testDatabase2.name, TABLES.testTable2.name)).toEqual(TABLES.testTable2);
    });
});

describe('Dataset (Datastore) Tests', () => {
    it('dataset constructor does set absent properties in datastores, databases, tables, and fields', () => {
        const datastore = _.cloneDeep(DATASTORE);
        delete datastore.name;
        delete datastore.databases.testDatabase1.name;
        delete datastore.databases.testDatabase1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.name;
        delete datastore.databases.testDatabase1.tables.testTable1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.labelOptions;
        delete datastore.databases.testDatabase1.tables.testTable1.fields;
        datastore.databases.testDatabase1.tables.testTable2.fields.forEach((field) => {
            delete field.prettyName;
            delete field.type;
        });
        delete datastore.databases.testDatabase2.tables;

        const dataset = new Dataset({ datastore1: datastore });

        const expected = _.cloneDeep(DATASTORE);
        expected.databases.testDatabase1.prettyName = expected.databases.testDatabase1.name;
        expected.databases.testDatabase1.tables.testTable1.prettyName = expected.databases.testDatabase1.tables.testTable1.name;
        expected.databases.testDatabase1.tables.testTable1.labelOptions = {};
        expected.databases.testDatabase1.tables.testTable1.fields = [];
        expected.databases.testDatabase1.tables.testTable2.fields.forEach((field) => {
            field.prettyName = field.columnName;
            field.type = 'text';
        });
        delete expected.databases.testDatabase2;

        expect(dataset.datastores.datastore1).toEqual(expected);
    });

    it('datastores setter in dataset does set absent properties in datastores, databases, tables, and fields', () => {
        const dataset = new Dataset({});

        const datastore = _.cloneDeep(DATASTORE);
        delete datastore.name;
        delete datastore.databases.testDatabase1.name;
        delete datastore.databases.testDatabase1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.name;
        delete datastore.databases.testDatabase1.tables.testTable1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.labelOptions;
        delete datastore.databases.testDatabase1.tables.testTable1.fields;
        datastore.databases.testDatabase1.tables.testTable2.fields.forEach((field) => {
            delete field.prettyName;
            delete field.type;
        });
        delete datastore.databases.testDatabase2.tables;

        dataset.datastores = { datastore1: datastore };

        const expected = _.cloneDeep(DATASTORE);
        expected.databases.testDatabase1.prettyName = expected.databases.testDatabase1.name;
        expected.databases.testDatabase1.tables.testTable1.prettyName = expected.databases.testDatabase1.tables.testTable1.name;
        expected.databases.testDatabase1.tables.testTable1.labelOptions = {};
        expected.databases.testDatabase1.tables.testTable1.fields = [];
        expected.databases.testDatabase1.tables.testTable2.fields.forEach((field) => {
            field.prettyName = field.columnName;
            field.type = 'text';
        });
        delete expected.databases.testDatabase2;

        expect(dataset.datastores.datastore1).toEqual(expected);
    });

    it('validateDatastore does return null if the datastore name, host, type, or databases are absent', () => {
        const datastoreA = _.cloneDeep(DATASTORE);
        delete datastoreA.name;
        expect(DatasetUtil.validateDatastore(datastoreA)).toEqual(null);

        const datastoreB = _.cloneDeep(DATASTORE);
        delete datastoreB.host;
        expect(DatasetUtil.validateDatastore(datastoreB)).toEqual(null);

        const datastoreC = _.cloneDeep(DATASTORE);
        delete datastoreC.type;
        expect(DatasetUtil.validateDatastore(datastoreC)).toEqual(null);

        const datastoreD = _.cloneDeep(DATASTORE);
        delete datastoreD.databases;
        expect(DatasetUtil.validateDatastore(datastoreD)).toEqual(null);
    });

    it('validateDatastore does set absent properties in datastores, databases, tables, and fields', () => {
        const datastore = _.cloneDeep(DATASTORE);
        delete datastore.databases.testDatabase1.name;
        delete datastore.databases.testDatabase1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.name;
        delete datastore.databases.testDatabase1.tables.testTable1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.labelOptions;
        delete datastore.databases.testDatabase1.tables.testTable1.fields;
        datastore.databases.testDatabase1.tables.testTable2.fields.forEach((field) => {
            delete field.prettyName;
            delete field.type;
        });
        delete datastore.databases.testDatabase2.tables;

        const expected = _.cloneDeep(DATASTORE);
        expected.databases.testDatabase1.prettyName = expected.databases.testDatabase1.name;
        expected.databases.testDatabase1.tables.testTable1.prettyName = expected.databases.testDatabase1.tables.testTable1.name;
        expected.databases.testDatabase1.tables.testTable1.labelOptions = {};
        expected.databases.testDatabase1.tables.testTable1.fields = [];
        expected.databases.testDatabase1.tables.testTable2.fields.forEach((field) => {
            field.prettyName = field.columnName;
            field.type = 'text';
        });
        delete expected.databases.testDatabase2;

        expect(DatasetUtil.validateDatastore(datastore)).toEqual(expected);
    });

    it('validateDatastores does delete a datastore if its host, type, or databases are absent (but not name)', () => {
        const datastoreA = _.cloneDeep(DATASTORE);
        delete datastoreA.name;
        expect(DatasetUtil.validateDatastores({ datastoreA: datastoreA })).not.toEqual({});

        const datastoreB = _.cloneDeep(DATASTORE);
        delete datastoreB.host;
        expect(DatasetUtil.validateDatastores({ datastoreB: datastoreB })).toEqual({});

        const datastoreC = _.cloneDeep(DATASTORE);
        delete datastoreC.type;
        expect(DatasetUtil.validateDatastores({ datastoreC: datastoreC })).toEqual({});

        const datastoreD = _.cloneDeep(DATASTORE);
        delete datastoreD.databases;
        expect(DatasetUtil.validateDatastores({ datastoreD: datastoreD })).toEqual({});
    });

    it('validateDatastores does set absent properties in datastores, databases, tables, and fields', () => {
        const datastore = _.cloneDeep(DATASTORE);
        delete datastore.databases.testDatabase1.name;
        delete datastore.databases.testDatabase1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.name;
        delete datastore.databases.testDatabase1.tables.testTable1.prettyName;
        delete datastore.databases.testDatabase1.tables.testTable1.labelOptions;
        delete datastore.databases.testDatabase1.tables.testTable1.fields;
        datastore.databases.testDatabase1.tables.testTable2.fields.forEach((field) => {
            delete field.prettyName;
            delete field.type;
        });
        delete datastore.databases.testDatabase2.tables;

        const expected = _.cloneDeep(DATASTORE);
        expected.databases.testDatabase1.prettyName = expected.databases.testDatabase1.name;
        expected.databases.testDatabase1.tables.testTable1.prettyName = expected.databases.testDatabase1.tables.testTable1.name;
        expected.databases.testDatabase1.tables.testTable1.labelOptions = {};
        expected.databases.testDatabase1.tables.testTable1.fields = [];
        expected.databases.testDatabase1.tables.testTable2.fields.forEach((field) => {
            field.prettyName = field.columnName;
            field.type = 'text';
        });
        delete expected.databases.testDatabase2;

        expect(DatasetUtil.validateDatastores({ datastore1: datastore }).datastore1).toEqual(expected);
    });
});

describe('Dataset (Relation) Tests', () => {
    it('dataset constructor does work with relations in string list format', () => {
        const relations = [
            ['datastore1.testDatabase1.testTable1.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldA'],
            ['datastore1.testDatabase1.testTable1.testRelationFieldB', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
        ];
        const dataset = new Dataset({ datastore1: DATASTORE }, null, null, relations);
        expect(dataset.getRelations()).toEqual([
            [
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase1.name,
                    table: TABLES.testTable1.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }],
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase2.name,
                    table: TABLES.testTable2.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }]
            ],
            [
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase1.name,
                    table: TABLES.testTable1.name,
                    field: FIELD_MAP.RELATION_B.columnName
                }],
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase2.name,
                    table: TABLES.testTable2.name,
                    field: FIELD_MAP.RELATION_B.columnName
                }]
            ]
        ]);
    });

    it('setRelations does work with relations in string list format', () => {
        const dataset = new Dataset({ datastore1: DATASTORE });
        const relations = [
            ['datastore1.testDatabase1.testTable1.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldA'],
            ['datastore1.testDatabase1.testTable1.testRelationFieldB', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
        ];
        dataset.setRelations(relations);
        expect(dataset.getRelations()).toEqual([
            [
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase1.name,
                    table: TABLES.testTable1.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }],
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase2.name,
                    table: TABLES.testTable2.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }]
            ],
            [
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase1.name,
                    table: TABLES.testTable1.name,
                    field: FIELD_MAP.RELATION_B.columnName
                }],
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase2.name,
                    table: TABLES.testTable2.name,
                    field: FIELD_MAP.RELATION_B.columnName
                }]
            ]
        ]);
    });

    it('dataset constructor does work with relations in nested list format', () => {
        const relations = [
            [
                ['datastore1.testDatabase1.testTable1.testRelationFieldA'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA']
            ],
            [
                ['datastore1.testDatabase1.testTable1.testRelationFieldA', 'datastore1.testDatabase1.testTable1.testRelationFieldB'],
                ['datastore1.testDatabase2.testTable2.testRelationFieldA', 'datastore1.testDatabase2.testTable2.testRelationFieldB']
            ]
        ];
        const dataset = new Dataset({ datastore1: DATASTORE }, null, null, relations);
        expect(dataset.getRelations()).toEqual([
            [
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase1.name,
                    table: TABLES.testTable1.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }],
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase2.name,
                    table: TABLES.testTable2.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }]
            ],
            [
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase1.name,
                    table: TABLES.testTable1.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }, {
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase1.name,
                    table: TABLES.testTable1.name,
                    field: FIELD_MAP.RELATION_B.columnName
                }],
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase2.name,
                    table: TABLES.testTable2.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }, {
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase2.name,
                    table: TABLES.testTable2.name,
                    field: FIELD_MAP.RELATION_B.columnName
                }]
            ]
        ]);
    });

    it('setRelations does work with relations in nested list format', () => {
        const dataset = new Dataset({ datastore1: DATASTORE });
        const relations = [
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
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase1.name,
                    table: TABLES.testTable1.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }],
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase2.name,
                    table: TABLES.testTable2.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }]
            ],
            [
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase1.name,
                    table: TABLES.testTable1.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }, {
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase1.name,
                    table: TABLES.testTable1.name,
                    field: FIELD_MAP.RELATION_B.columnName
                }],
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase2.name,
                    table: TABLES.testTable2.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }, {
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase2.name,
                    table: TABLES.testTable2.name,
                    field: FIELD_MAP.RELATION_B.columnName
                }]
            ]
        ]);
    });

    it('dataset constructor does work with relations in both single and nested list formats', () => {
        const relations = [
            ['datastore1.testDatabase1.testTable1.testRelationFieldA', ['datastore1.testDatabase2.testTable2.testRelationFieldA']],
            [['datastore1.testDatabase1.testTable1.testRelationFieldB'], 'datastore1.testDatabase2.testTable2.testRelationFieldB']
        ];
        const dataset = new Dataset({ datastore1: DATASTORE }, null, null, relations);
        expect(dataset.getRelations()).toEqual([
            [
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase1.name,
                    table: TABLES.testTable1.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }],
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase2.name,
                    table: TABLES.testTable2.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }]
            ],
            [
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase1.name,
                    table: TABLES.testTable1.name,
                    field: FIELD_MAP.RELATION_B.columnName
                }],
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase2.name,
                    table: TABLES.testTable2.name,
                    field: FIELD_MAP.RELATION_B.columnName
                }]
            ]
        ]);
    });

    it('setRelations does work with relations in both single and nested list formats', () => {
        const dataset = new Dataset({ datastore1: DATASTORE });
        const relations = [
            ['datastore1.testDatabase1.testTable1.testRelationFieldA', ['datastore1.testDatabase2.testTable2.testRelationFieldA']],
            [['datastore1.testDatabase1.testTable1.testRelationFieldB'], 'datastore1.testDatabase2.testTable2.testRelationFieldB']
        ];
        dataset.setRelations(relations);
        expect(dataset.getRelations()).toEqual([
            [
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase1.name,
                    table: TABLES.testTable1.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }],
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase2.name,
                    table: TABLES.testTable2.name,
                    field: FIELD_MAP.RELATION_A.columnName
                }]
            ],
            [
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase1.name,
                    table: TABLES.testTable1.name,
                    field: FIELD_MAP.RELATION_B.columnName
                }],
                [{
                    datastore: DATASTORE.name,
                    database: DATABASES.testDatabase2.name,
                    table: TABLES.testTable2.name,
                    field: FIELD_MAP.RELATION_B.columnName
                }]
            ]
        ]);
    });

    it('dataset constructor does ignore relations on databases/tables/fields that don\'t exist', () => {
        const relations = [
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
        const dataset = new Dataset({ datastore1: DATASTORE }, null, null, relations);
        expect(dataset.getRelations()).toEqual([]);
    });

    it('setRelations does ignore relations on databases/tables/fields that don\'t exist', () => {
        const dataset = new Dataset({ datastore1: DATASTORE });
        const relations = [
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

    it('dataset constructor does ignore relations with unequal numbers of fields', () => {
        const relations = [
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
        const dataset = new Dataset({ datastore1: DATASTORE }, null, null, relations);
        expect(dataset.getRelations()).toEqual([]);
    });

    it('setRelations does ignore relations with unequal numbers of fields', () => {
        const dataset = new Dataset({ datastore1: DATASTORE });
        const relations = [
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

describe('Dataset Util Misc Tests', () => {
    it('deconstructTableOrFieldKeySafely should work as expected', () => {
        expect(DatasetUtil.deconstructTableOrFieldKeySafely(null)).toEqual({
            datastore: '',
            database: '',
            table: '',
            field: ''
        });

        expect(DatasetUtil.deconstructTableOrFieldKeySafely('')).toEqual({
            datastore: '',
            database: '',
            table: '',
            field: ''
        });

        expect(DatasetUtil.deconstructTableOrFieldKeySafely('a')).toEqual({
            datastore: 'a',
            database: '',
            table: '',
            field: ''
        });

        expect(DatasetUtil.deconstructTableOrFieldKeySafely('a.b')).toEqual({
            datastore: 'a',
            database: 'b',
            table: '',
            field: ''
        });

        expect(DatasetUtil.deconstructTableOrFieldKeySafely('a.b.c')).toEqual({
            datastore: 'a',
            database: 'b',
            table: 'c',
            field: ''
        });

        expect(DatasetUtil.deconstructTableOrFieldKeySafely('...d')).toEqual({
            datastore: '',
            database: '',
            table: '',
            field: 'd'
        });

        expect(DatasetUtil.deconstructTableOrFieldKeySafely('a.b.c.d')).toEqual({
            datastore: 'a',
            database: 'b',
            table: 'c',
            field: 'd'
        });

        expect(DatasetUtil.deconstructTableOrFieldKeySafely('a.b.c.d.e.f')).toEqual({
            datastore: 'a',
            database: 'b',
            table: 'c',
            field: 'd.e.f'
        });
    });

    it('deconstructTableOrFieldKey should work as expected', () => {
        expect(DatasetUtil.deconstructTableOrFieldKey(null)).toEqual(null);
        expect(DatasetUtil.deconstructTableOrFieldKey('')).toEqual(null);
        expect(DatasetUtil.deconstructTableOrFieldKey('a')).toEqual(null);
        expect(DatasetUtil.deconstructTableOrFieldKey('a.b')).toEqual(null);
        expect(DatasetUtil.deconstructTableOrFieldKey('...d')).toEqual(null);

        expect(DatasetUtil.deconstructTableOrFieldKey('a.b.c')).toEqual({
            datastore: 'a',
            database: 'b',
            table: 'c',
            field: ''
        });

        expect(DatasetUtil.deconstructTableOrFieldKey('a.b.c.d')).toEqual({
            datastore: 'a',
            database: 'b',
            table: 'c',
            field: 'd'
        });

        expect(DatasetUtil.deconstructTableOrFieldKey('a.b.c.d.e.f')).toEqual({
            datastore: 'a',
            database: 'b',
            table: 'c',
            field: 'd.e.f'
        });
    });

    it('translateFieldKeyToFieldName does return expected string', () => {
        const keyMap = {
            key1: 'a.b.c',
            key2: 'a.b.c.d',
            key3: 'a.b.c.d.e.f'
        };

        expect(DatasetUtil.translateFieldKeyToFieldName('key2', keyMap)).toEqual('d');
        expect(DatasetUtil.translateFieldKeyToFieldName('key3', keyMap)).toEqual('d.e.f');
        expect(DatasetUtil.translateFieldKeyToFieldName('w.x.y.z', keyMap)).toEqual('z');
        expect(DatasetUtil.translateFieldKeyToFieldName('testFieldName', keyMap)).toEqual('testFieldName');
    });
});
