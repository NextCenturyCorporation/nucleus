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
var filters_1 = require("./filters");
var config_option_1 = require("./config-option");
var mock_dataset_1 = require("./mock.dataset");
describe('FilterUtil', function () {
    beforeAll(function () {
        /* eslint-disable no-console */
        console.log('STARTING FILTER UTIL TESTS...');
        /* eslint-enable no-console */
    });
    it('areFilterDataSourcesEquivalent should return expected boolean', function () {
        expect(filters_1.FilterUtil.areFilterDataSourcesEquivalent({
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        }, {
            datastore: 'datastore2',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        })).toEqual(false);
        expect(filters_1.FilterUtil.areFilterDataSourcesEquivalent({
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        }, {
            datastore: 'datastore1',
            database: 'database2',
            table: 'table1',
            field: 'field1',
            operator: '='
        })).toEqual(false);
        expect(filters_1.FilterUtil.areFilterDataSourcesEquivalent({
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        }, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table2',
            field: 'field1',
            operator: '='
        })).toEqual(false);
        expect(filters_1.FilterUtil.areFilterDataSourcesEquivalent({
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        }, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field2',
            operator: '='
        })).toEqual(false);
        expect(filters_1.FilterUtil.areFilterDataSourcesEquivalent({
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        }, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: 'contains'
        })).toEqual(false);
        expect(filters_1.FilterUtil.areFilterDataSourcesEquivalent({
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        }, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        })).toEqual(true);
    });
    it('areFilterDataSourcesEquivalent with ignoreOperator=true should return expected boolean', function () {
        expect(filters_1.FilterUtil.areFilterDataSourcesEquivalent({
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        }, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: 'contains'
        }, true)).toEqual(true);
    });
    it('areFilterDataSourceListsEquivalent should return expected boolean', function () {
        expect(filters_1.FilterUtil.areFilterDataSourceListsEquivalent([{
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: '='
            }], [{
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: '='
            }])).toEqual(true);
        expect(filters_1.FilterUtil.areFilterDataSourceListsEquivalent([{
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: '='
            }], [{
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: 'contains'
            }])).toEqual(false);
        expect(filters_1.FilterUtil.areFilterDataSourceListsEquivalent([{
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: '='
            }], [{
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: '='
            }, {
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: 'contains'
            }])).toEqual(false);
        expect(filters_1.FilterUtil.areFilterDataSourceListsEquivalent([{
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: '='
            }, {
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: 'contains'
            }], [{
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: 'contains'
            }])).toEqual(false);
        expect(filters_1.FilterUtil.areFilterDataSourceListsEquivalent([{
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: '='
            }, {
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: 'contains'
            }], [{
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: '='
            }, {
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: 'contains'
            }])).toEqual(true);
        expect(filters_1.FilterUtil.areFilterDataSourceListsEquivalent([{
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: '='
            }, {
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: 'contains'
            }], [{
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: 'contains'
            }, {
                datastore: 'datastore1',
                database: 'database1',
                table: 'table1',
                field: 'field1',
                operator: '='
            }])).toEqual(true);
    });
});
describe('FilterCollection', function () {
    var filterCollection;
    var source1;
    var source2;
    var filter1A;
    var filter1B;
    var filter2A;
    beforeEach(function () {
        source1 = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.ID.columnName,
                operator: '='
            }];
        source2 = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.SIZE.columnName,
                operator: '>'
            }, {
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.SIZE.columnName,
                operator: '<'
            }];
        filter1A = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId1']);
        filter1B = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId2']);
        filter2A = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName, '>', [10]),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName, '<', [20])
        ]);
        filterCollection = new filters_1.FilterCollection();
        filterCollection.data.set(source1, [filter1A, filter1B]);
        filterCollection.data.set(source2, [filter2A]);
    });
    it('data of new collection should be empty', function () {
        var testCollection = new filters_1.FilterCollection();
        expect(testCollection.data.size).toEqual(0);
    });
    it('findFilterDataSources should return data source from collection', function () {
        expect(filterCollection.findFilterDataSources(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId1']))).toEqual(source1);
        expect(filterCollection.findFilterDataSources(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName, '>', [10]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName, '<', [20])
        ]))).toEqual(source2);
    });
    it('findFilterDataSources should return new data source and add to collection', function () {
        var actual = filterCollection.findFilterDataSources(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.ID.columnName, '!=', ['testId1']));
        expect(actual).toEqual([{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.ID.columnName,
                operator: '!='
            }]);
        expect(filterCollection.data.get(actual)).toEqual([]);
    });
    it('getDataSources should return expected array', function () {
        expect(filterCollection.getDataSources()).toEqual([source1, source2]);
        var testDataSource = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.ID.columnName,
                operator: '!='
            }];
        filterCollection.data.set(testDataSource, []);
        expect(filterCollection.getDataSources()).toEqual([source1, source2, testDataSource]);
    });
    it('getFilters should create and return empty array if data source is not in collection', function () {
        // Different datastore
        var testDataSource1 = [{
                datastore: 'testDatastore2',
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.ID.columnName,
                operator: '='
            }];
        // Different database
        var testDataSource2 = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase2.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.ID.columnName,
                operator: '='
            }];
        // Different table
        var testDataSource3 = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable2.name,
                field: mock_dataset_1.FIELD_MAP.ID.columnName,
                operator: '='
            }];
        // Different field
        var testDataSource4 = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.TEXT.columnName,
                operator: '='
            }];
        // Different operator
        var testDataSource5 = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.ID.columnName,
                operator: '!='
            }];
        // Different operators (compound)
        var testDataSource6 = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.SIZE.columnName,
                operator: '='
            }, {
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.SIZE.columnName,
                operator: '!='
            }];
        expect(filterCollection.getFilters(testDataSource1)).toEqual([]);
        expect(filterCollection.getFilters(testDataSource2)).toEqual([]);
        expect(filterCollection.getFilters(testDataSource3)).toEqual([]);
        expect(filterCollection.getFilters(testDataSource4)).toEqual([]);
        expect(filterCollection.getFilters(testDataSource5)).toEqual([]);
        expect(filterCollection.getFilters(testDataSource6)).toEqual([]);
        expect(filterCollection.data.get(testDataSource1)).toEqual([]);
        expect(filterCollection.data.get(testDataSource2)).toEqual([]);
        expect(filterCollection.data.get(testDataSource3)).toEqual([]);
        expect(filterCollection.data.get(testDataSource4)).toEqual([]);
        expect(filterCollection.data.get(testDataSource5)).toEqual([]);
        expect(filterCollection.data.get(testDataSource6)).toEqual([]);
    });
    it('getFilters should return array from identical data source object in collection', function () {
        expect(filterCollection.getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterCollection.getFilters(source2)).toEqual([filter2A]);
    });
    it('getFilters should return array from similar data source object in collection', function () {
        var testDataSource1 = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.ID.columnName,
                operator: '='
            }];
        var testDataSource2 = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.SIZE.columnName,
                operator: '>'
            }, {
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.SIZE.columnName,
                operator: '<'
            }];
        expect(filterCollection.getFilters(testDataSource1)).toEqual([filter1A, filter1B]);
        expect(filterCollection.getFilters(testDataSource2)).toEqual([filter2A]);
        expect(filterCollection.data.has(testDataSource1)).toEqual(false);
        expect(filterCollection.data.has(testDataSource2)).toEqual(false);
    });
    it('setFilters should save filters with input data source if it is not in collection', function () {
        var testDataSource = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.ID.columnName,
                operator: '!='
            }];
        var testFilter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.ID.columnName, '!=', ['testId']);
        expect(filterCollection.setFilters(testDataSource, [testFilter])).toEqual(testDataSource);
        expect(filterCollection.data.get(testDataSource)).toEqual([testFilter]);
        expect(filterCollection.setFilters(testDataSource, [])).toEqual(testDataSource);
        expect(filterCollection.data.get(testDataSource)).toEqual([]);
    });
    it('setFilters should save filters with identical data source object in collection', function () {
        expect(filterCollection.setFilters(source1, [filter1A])).toEqual(source1);
        expect(filterCollection.data.get(source1)).toEqual([filter1A]);
        expect(filterCollection.setFilters(source1, [])).toEqual(source1);
        expect(filterCollection.data.get(source1)).toEqual([]);
        var testFilter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId']);
        expect(filterCollection.setFilters(source1, [testFilter])).toEqual(source1);
        expect(filterCollection.data.get(source1)).toEqual([testFilter]);
        expect(filterCollection.setFilters(source1, [filter1A, testFilter])).toEqual(source1);
        expect(filterCollection.data.get(source1)).toEqual([filter1A, testFilter]);
    });
    it('setFilters should save filters with similar data source object in collection', function () {
        var testDataSource = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.ID.columnName,
                operator: '='
            }];
        expect(filterCollection.setFilters(testDataSource, [filter1A])).toEqual(source1);
        expect(filterCollection.data.get(source1)).toEqual([filter1A]);
        expect(filterCollection.data.has(testDataSource)).toEqual(false);
        expect(filterCollection.setFilters(testDataSource, [])).toEqual(source1);
        expect(filterCollection.data.get(source1)).toEqual([]);
        expect(filterCollection.data.has(testDataSource)).toEqual(false);
        var testFilter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId']);
        expect(filterCollection.setFilters(testDataSource, [testFilter])).toEqual(source1);
        expect(filterCollection.data.get(source1)).toEqual([testFilter]);
        expect(filterCollection.data.has(testDataSource)).toEqual(false);
        expect(filterCollection.setFilters(testDataSource, [filter1A, testFilter])).toEqual(source1);
        expect(filterCollection.data.get(source1)).toEqual([filter1A, testFilter]);
        expect(filterCollection.data.has(testDataSource)).toEqual(false);
    });
});
describe('Falsey Values Filter on', function () {
    it('zero', function () {
        var filter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [0]);
        expect((filter).fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name +
            '.' + mock_dataset_1.FIELD_MAP.NAME.columnName);
        expect((filter).operator).toEqual('=');
        expect((filter).values).toEqual([0]);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [0]))).toEqual(true);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['']))).toEqual(false);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [false]))).toEqual(false);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [null]))).toEqual(false);
    });
    it('empty string', function () {
        var filter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['']);
        expect((filter).fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name +
            '.' + mock_dataset_1.FIELD_MAP.NAME.columnName);
        expect((filter).operator).toEqual('=');
        expect((filter).values).toEqual(['']);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [0]))).toEqual(false);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['']))).toEqual(true);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [false]))).toEqual(false);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [null]))).toEqual(false);
    });
    it('false', function () {
        var filter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [false]);
        expect((filter).fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name +
            '.' + mock_dataset_1.FIELD_MAP.NAME.columnName);
        expect((filter).operator).toEqual('=');
        expect((filter).values).toEqual([false]);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [0]))).toEqual(false);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['']))).toEqual(false);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [false]))).toEqual(true);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [null]))).toEqual(false);
    });
    it('null', function () {
        var filter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [null]);
        expect((filter).fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name +
            '.' + mock_dataset_1.FIELD_MAP.NAME.columnName);
        expect((filter).operator).toEqual('=');
        expect((filter).values).toEqual([null]);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [0]))).toEqual(false);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['']))).toEqual(false);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [false]))).toEqual(false);
        expect(filter.isCompatibleWithDesign(new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [null]))).toEqual(true);
    });
});
describe('CompoundFilter (One Field)', function () {
    var compoundFilter;
    beforeEach(function () {
        compoundFilter = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100]),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]);
    });
    it('does have expected compound filter properties', function () {
        expect(compoundFilter.id).toBeDefined();
        expect(compoundFilter.relations).toEqual([]);
        expect(compoundFilter.type).toEqual(config_option_1.CompoundFilterType.AND);
        expect(compoundFilter.filters.length).toEqual(2);
        expect(compoundFilter.filters[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName);
        expect(compoundFilter.filters[0].operator).toEqual('>');
        expect(compoundFilter.filters[0].values).toEqual([-100]);
        expect(compoundFilter.filters[1].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName);
        expect(compoundFilter.filters[1].operator).toEqual('<');
        expect(compoundFilter.filters[1].values).toEqual([100]);
    });
    it('createRelationFilter on compound filter should return null if substitue has bad data', function () {
        var actual = compoundFilter.createRelationFilter([{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.X.columnName
            }], [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: ''
            }]);
        expect(actual).toEqual(null);
    });
    it('createRelationFilter on compound filter should return expected object', function () {
        var actual;
        var testSubstituteList = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase2.name,
                table: mock_dataset_1.TABLES.testTable2.name,
                field: mock_dataset_1.FIELD_MAP.Y.columnName
            }];
        actual = compoundFilter.createRelationFilter([{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.X.columnName
            }], testSubstituteList);
        expect(actual.type).toEqual(config_option_1.CompoundFilterType.AND);
        expect(actual.filters.length).toEqual(2);
        expect(actual.filters[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase2.name + '.' + mock_dataset_1.TABLES.testTable2.name +
            '.' + mock_dataset_1.FIELD_MAP.Y.columnName);
        expect(actual.filters[0].operator).toEqual('>');
        expect(actual.filters[0].values).toEqual([-100]);
        expect(actual.filters[1].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase2.name + '.' + mock_dataset_1.TABLES.testTable2.name +
            '.' + mock_dataset_1.FIELD_MAP.Y.columnName);
        expect(actual.filters[1].operator).toEqual('<');
        expect(actual.filters[1].values).toEqual([100]);
    });
    it('doesAffectSearch on compound filter should return expected boolean', function () {
        expect(compoundFilter.doesAffectSearch(mock_dataset_1.DATASTORE.name, 'testDatabase1', 'testTable1')).toEqual(true);
        expect(compoundFilter.doesAffectSearch('testDatastore2', 'testDatabase1', 'testTable1')).toEqual(false);
        expect(compoundFilter.doesAffectSearch(mock_dataset_1.DATASTORE.name, 'testDatabase2', 'testTable1')).toEqual(false);
        expect(compoundFilter.doesAffectSearch(mock_dataset_1.DATASTORE.name, 'testDatabase1', 'testTable2')).toEqual(false);
    });
    it('isCompatibleWithDesign on compound filter should return expected boolean', function () {
        // Correct, with values
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]))).toEqual(true);
        // Correct, with undefined values
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', undefined),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', undefined)
        ]))).toEqual(true);
        // Correct, with empty value array
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', []),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [])
        ]))).toEqual(true);
        // Correct, with undefined element in value array
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [undefined]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [undefined])
        ]))).toEqual(true);
        // Correct, with rearranged structure
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100])
        ]))).toEqual(true);
        // Different datastore
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'testDatastore2.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]))).toEqual(false);
        // Different database
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase2.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]))).toEqual(false);
        // Different table
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable2.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]))).toEqual(false);
        // Different field
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.Y.columnName, '>', [-100]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]))).toEqual(false);
        // Different operator
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [-100]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]))).toEqual(false);
        // Different value
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [1]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]))).toEqual(false);
        // Different type
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]))).toEqual(false);
        // Different structure (additional nested filters)
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [0])
        ]))).toEqual(false);
        // Different structure (deeply nested filters)
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100]),
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
            ])
        ]))).toEqual(false);
        // Different structure (absent nested filters)
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100])
        ]))).toEqual(false);
    });
    it('isEquivalentToFilter on compound filter should return expected boolean', function () {
        // Different datastore
        var testFilter1 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'testDatastore2.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100]),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]);
        // Different database
        var testFilter2 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase2.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100]),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]);
        // Different table
        var testFilter3 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable2.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100]),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]);
        // Different field
        var testFilter4 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.Y.columnName, '>', [-100]),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]);
        // Different operator
        var testFilter5 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [-100]),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]);
        // Different value
        var testFilter6 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [1]),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]);
        // Different type
        var testFilter7 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100]),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]);
        // Correct
        var testFilter8 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100]),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100])
        ]);
        expect(compoundFilter.isEquivalentToFilter(testFilter1)).toEqual(false);
        expect(compoundFilter.isEquivalentToFilter(testFilter2)).toEqual(false);
        expect(compoundFilter.isEquivalentToFilter(testFilter3)).toEqual(false);
        expect(compoundFilter.isEquivalentToFilter(testFilter4)).toEqual(false);
        expect(compoundFilter.isEquivalentToFilter(testFilter5)).toEqual(false);
        expect(compoundFilter.isEquivalentToFilter(testFilter6)).toEqual(false);
        expect(compoundFilter.isEquivalentToFilter(testFilter7)).toEqual(false);
        expect(compoundFilter.isEquivalentToFilter(testFilter8)).toEqual(true);
    });
    it('retrieveValues on compound filter should return expected object', function () {
        expect(compoundFilter.retrieveValues()).toEqual(new filters_1.CompoundValues(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListOfValues(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testXField', '>', [-100]),
            new filters_1.ListOfValues(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testXField', '<', [100])
        ]));
    });
    it('toDesign on compound filter should return expected object', function () {
        expect(compoundFilter.toDesign()).toEqual(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name +
                '.' + mock_dataset_1.FIELD_MAP.X.columnName, '>', [-100], compoundFilter.filters[0].id),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name +
                '.' + mock_dataset_1.FIELD_MAP.X.columnName, '<', [100], compoundFilter.filters[1].id)
        ], compoundFilter.id));
    });
});
describe('CompoundFilter (Multi-Field)', function () {
    var compoundFilter;
    beforeEach(function () {
        compoundFilter = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]);
    });
    it('does have expected compound multi-field filter properties', function () {
        expect(compoundFilter.id).toBeDefined();
        expect(compoundFilter.relations).toEqual([]);
        expect(compoundFilter.type).toEqual(config_option_1.CompoundFilterType.OR);
        expect(compoundFilter.filters.length).toEqual(2);
        expect(compoundFilter.filters[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName);
        expect(compoundFilter.filters[0].operator).toEqual('=');
        expect(compoundFilter.filters[0].values).toEqual(['testName1']);
        expect(compoundFilter.filters[1].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName);
        expect(compoundFilter.filters[1].operator).toEqual('=');
        expect(compoundFilter.filters[1].values).toEqual([10]);
    });
    it('createRelationFilter on compound multi-field filter should return null if substitue has bad data', function () {
        var actual = compoundFilter.createRelationFilter([{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.NAME.columnName
            }], [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: ''
            }]);
        expect(actual).toEqual(null);
    });
    it('createRelationFilter should return null if equivalent fields and substitue fields are not the same length', function () {
        var actual;
        actual = compoundFilter.createRelationFilter([{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.NAME.columnName
            }, {
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.X.columnName
            }], [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.TYPE.columnName
            }]);
        expect(actual).toEqual(null);
        actual = compoundFilter.createRelationFilter([{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.NAME.columnName
            }], [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.TYPE.columnName
            }, {
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.Y.columnName
            }]);
        expect(actual).toEqual(null);
    });
    it('createRelationFilter with single substitute field should return expected object', function () {
        var actual;
        var testSubstituteList = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase2.name,
                table: mock_dataset_1.TABLES.testTable2.name,
                field: mock_dataset_1.FIELD_MAP.TYPE.columnName
            }];
        actual = compoundFilter.createRelationFilter([{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.NAME.columnName
            }], testSubstituteList);
        expect(actual.type).toEqual(config_option_1.CompoundFilterType.OR);
        expect(actual.filters.length).toEqual(2);
        expect(actual.filters[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase2.name + '.' + mock_dataset_1.TABLES.testTable2.name +
            '.' + mock_dataset_1.FIELD_MAP.TYPE.columnName);
        expect(actual.filters[0].operator).toEqual('=');
        expect(actual.filters[0].values).toEqual(['testName1']);
        expect(actual.filters[1].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name +
            '.' + mock_dataset_1.FIELD_MAP.X.columnName);
        expect(actual.filters[1].operator).toEqual('=');
        expect(actual.filters[1].values).toEqual([10]);
    });
    it('createRelationFilter with multiple substitute fields should return expected object', function () {
        var actual;
        var testSubstituteList1 = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase2.name,
                table: mock_dataset_1.TABLES.testTable2.name,
                field: mock_dataset_1.FIELD_MAP.TYPE.columnName
            }];
        var testSubstituteList2 = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase2.name,
                table: mock_dataset_1.TABLES.testTable2.name,
                field: mock_dataset_1.FIELD_MAP.Y.columnName
            }];
        actual = compoundFilter.createRelationFilter([{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.NAME.columnName
            }], testSubstituteList1);
        actual = actual.createRelationFilter([{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.X.columnName
            }], testSubstituteList2);
        expect(actual.type).toEqual(config_option_1.CompoundFilterType.OR);
        expect(actual.filters.length).toEqual(2);
        expect(actual.filters[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase2.name + '.' + mock_dataset_1.TABLES.testTable2.name +
            '.' + mock_dataset_1.FIELD_MAP.TYPE.columnName);
        expect(actual.filters[0].operator).toEqual('=');
        expect(actual.filters[0].values).toEqual(['testName1']);
        expect(actual.filters[1].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase2.name + '.' + mock_dataset_1.TABLES.testTable2.name +
            '.' + mock_dataset_1.FIELD_MAP.Y.columnName);
        expect(actual.filters[1].operator).toEqual('=');
        expect(actual.filters[1].values).toEqual([10]);
    });
    it('doesAffectSearch on compound multi-field filter should return expected boolean', function () {
        expect(compoundFilter.doesAffectSearch(mock_dataset_1.DATASTORE.name, 'testDatabase1', 'testTable1')).toEqual(true);
        expect(compoundFilter.doesAffectSearch('testDatastore2', 'testDatabase1', 'testTable1')).toEqual(false);
        expect(compoundFilter.doesAffectSearch(mock_dataset_1.DATASTORE.name, 'testDatabase2', 'testTable1')).toEqual(false);
        expect(compoundFilter.doesAffectSearch(mock_dataset_1.DATASTORE.name, 'testDatabase1', 'testTable2')).toEqual(false);
    });
    it('isCompatibleWithDesign on compound multi-field filter should return expected boolean', function () {
        // Correct, with values
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]))).toEqual(true);
        // Correct, with undefined values
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', undefined),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', undefined)
        ]))).toEqual(true);
        // Correct, with empty value array
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', []),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [])
        ]))).toEqual(true);
        // Correct, with undefined element in value array
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', [undefined]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [undefined])
        ]))).toEqual(true);
        // Correct, with rearranged structure
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1'])
        ]))).toEqual(true);
        // Different datastore
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'testDatastore2.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]))).toEqual(false);
        // Different database
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase2.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]))).toEqual(false);
        // Different table
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable2.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]))).toEqual(false);
        // Different field
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TYPE.columnName, '=', ['testName1']),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]))).toEqual(false);
        // Different operator
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '!=', ['testName1']),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]))).toEqual(false);
        // Different value
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName2']),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]))).toEqual(false);
        // Different type
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]))).toEqual(false);
        // Different structure (additional nested filters)
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '!=', ['testName2'])
        ]))).toEqual(false);
        // Different structure (deeply nested filters)
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']),
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
            ])
        ]))).toEqual(false);
        // Different structure (absent nested filters)
        expect(compoundFilter.isCompatibleWithDesign(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1'])
        ]))).toEqual(false);
    });
    it('isEquivalentToFilter on compound multi-field filter should return expected boolean', function () {
        // Different datastore
        var testFilter1 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'testDatastore2.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]);
        // Different database
        var testFilter2 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase2.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]);
        // Different table
        var testFilter3 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable2.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]);
        // Different field
        var testFilter4 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TYPE.columnName, '=', ['testName1']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]);
        // Different operator
        var testFilter5 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '!=', ['testName1']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]);
        // Different value
        var testFilter6 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName2']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]);
        // Different type
        var testFilter7 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]);
        // Correct
        var testFilter8 = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10])
        ]);
        expect(compoundFilter.isEquivalentToFilter(testFilter1)).toEqual(false);
        expect(compoundFilter.isEquivalentToFilter(testFilter2)).toEqual(false);
        expect(compoundFilter.isEquivalentToFilter(testFilter3)).toEqual(false);
        expect(compoundFilter.isEquivalentToFilter(testFilter4)).toEqual(false);
        expect(compoundFilter.isEquivalentToFilter(testFilter5)).toEqual(false);
        expect(compoundFilter.isEquivalentToFilter(testFilter6)).toEqual(false);
        expect(compoundFilter.isEquivalentToFilter(testFilter7)).toEqual(false);
        expect(compoundFilter.isEquivalentToFilter(testFilter8)).toEqual(true);
    });
    it('retrieveValues on compound multi-field filter should return expected object', function () {
        expect(compoundFilter.retrieveValues()).toEqual(new filters_1.CompoundValues(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListOfValues(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', '=', ['testName1']),
            new filters_1.ListOfValues(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testXField', '=', [10])
        ]));
    });
    it('toDesign on compound multi-field filter should return expected object', function () {
        expect(compoundFilter.toDesign()).toEqual(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name +
                '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1'], compoundFilter.filters[0].id),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name +
                '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10], compoundFilter.filters[1].id)
        ], compoundFilter.id));
    });
});
describe('CompoundFilter (Nested Compound Filters)', function () {
    var compoundFilter;
    beforeEach(function () {
        compoundFilter = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.AND, [
            new filters_1.CompoundFilter(config_option_1.CompoundFilterType.OR, [
                new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10]),
                new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [20])
            ]),
            new filters_1.CompoundFilter(config_option_1.CompoundFilterType.OR, [
                new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']),
                new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName2'])
            ])
        ]);
    });
    it('does have expected compound nested filter properties', function () {
        expect(compoundFilter.id).toBeDefined();
        expect(compoundFilter.relations).toEqual([]);
        expect(compoundFilter.type).toEqual(config_option_1.CompoundFilterType.AND);
        expect(compoundFilter.filters.length).toEqual(2);
        expect(compoundFilter.filters[0].type).toEqual(config_option_1.CompoundFilterType.OR);
        expect(compoundFilter.filters[0].filters.length).toEqual(2);
        expect(compoundFilter.filters[0].filters[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName);
        expect(compoundFilter.filters[0].filters[0].operator).toEqual('=');
        expect(compoundFilter.filters[0].filters[0].values).toEqual([10]);
        expect(compoundFilter.filters[0].filters[1].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName);
        expect(compoundFilter.filters[0].filters[1].operator).toEqual('=');
        expect(compoundFilter.filters[0].filters[1].values).toEqual([20]);
        expect(compoundFilter.filters[1].type).toEqual(config_option_1.CompoundFilterType.OR);
        expect(compoundFilter.filters[1].filters.length).toEqual(2);
        expect(compoundFilter.filters[1].filters[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName);
        expect(compoundFilter.filters[1].filters[0].operator).toEqual('=');
        expect(compoundFilter.filters[1].filters[0].values).toEqual(['testName1']);
        expect(compoundFilter.filters[1].filters[1].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName);
        expect(compoundFilter.filters[1].filters[1].operator).toEqual('=');
        expect(compoundFilter.filters[1].filters[1].values).toEqual(['testName2']);
    });
    it('retrieveValues on compound nested filter should return expected object', function () {
        expect(compoundFilter.retrieveValues()).toEqual(new filters_1.CompoundValues(config_option_1.CompoundFilterType.AND, [
            new filters_1.CompoundValues(config_option_1.CompoundFilterType.OR, [
                new filters_1.ListOfValues(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testXField', '=', [10]),
                new filters_1.ListOfValues(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testXField', '=', [20])
            ]),
            new filters_1.CompoundValues(config_option_1.CompoundFilterType.OR, [
                new filters_1.ListOfValues(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', '=', ['testName1']),
                new filters_1.ListOfValues(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', '=', ['testName2'])
            ])
        ]));
    });
    it('toDesign on compound nested filters should return expected object', function () {
        expect(compoundFilter.toDesign()).toEqual(new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
                    mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [10], compoundFilter.filters[0].filters[0].id),
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
                    mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, '=', [20], compoundFilter.filters[0].filters[1].id)
            ], compoundFilter.filters[0].id),
            new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
                    mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1'], compoundFilter.filters[1].filters[0].id),
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
                    mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName2'], compoundFilter.filters[1].filters[1].id)
            ], compoundFilter.filters[1].id)
        ], compoundFilter.id));
    });
});
describe('BoundsFilter', function () {
    it('getLabel functions on bounds filter should return expected strings', function () {
        var boundsFilterA = new filters_1.BoundsFilter(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.Y.columnName, -50, -100, 50, 100);
        expect(boundsFilterA.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test X Field and Test Database 1 / ' +
            'Test Table 1 / Test Y Field');
        expect(boundsFilterA.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test X Field and Test Y Field');
        expect(boundsFilterA.getLabelForValue(mock_dataset_1.DATASET)).toEqual('from (-50, -100) to (50, 100)');
    });
    it('retrieveValues on bounds filter does return expected values', function () {
        var boundsFilterA = new filters_1.BoundsFilter(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.Y.columnName, -50, -100, 50, 100);
        expect(boundsFilterA.retrieveValues()).toEqual(new filters_1.BoundsValues(-50, -100, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.X.columnName, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.Y.columnName, 50, 100));
    });
});
describe('DomainFilter', function () {
    it('getLabel functions on domain filter should return expected strings', function () {
        var domainFilterA = new filters_1.DomainFilter(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
            mock_dataset_1.FIELD_MAP.SIZE.columnName, -100, 100);
        expect(domainFilterA.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Size Field');
        expect(domainFilterA.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Size Field');
        expect(domainFilterA.getLabelForValue(mock_dataset_1.DATASET)).toEqual('between -100 and 100');
    });
    it('retrieveValues on domain filter does return expected values', function () {
        var domainFilterA = new filters_1.DomainFilter(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
            mock_dataset_1.FIELD_MAP.SIZE.columnName, -100, 100);
        expect(domainFilterA.retrieveValues()).toEqual(new filters_1.DomainValues(-100, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName, 100));
    });
});
describe('ListFilter', function () {
    it('getLabel functions on list filter should return expected strings', function () {
        var listFilterA = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TEXT.columnName, '!=', ['testText1', 'testText2', 'testText3']);
        expect(listFilterA.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Text Field');
        expect(listFilterA.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Text Field');
        expect(listFilterA.getLabelForValue(mock_dataset_1.DATASET)).toEqual('!= (testText1 or testText2 or testText3)');
        expect(listFilterA.getLabelForValue(mock_dataset_1.DATASET, true)).toEqual('!= (testText1 or testText2 or testText3)');
    });
    it('getLabel functions on list filter with equals operator should return expected strings', function () {
        var listFilterB = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TEXT.columnName, '=', ['testText1', 'testText2', 'testText3']);
        expect(listFilterB.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Text Field');
        expect(listFilterB.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Text Field');
        expect(listFilterB.getLabelForValue(mock_dataset_1.DATASET)).toEqual('testText1 or testText2 or testText3');
        expect(listFilterB.getLabelForValue(mock_dataset_1.DATASET, true)).toEqual('testText1 or testText2 or testText3');
    });
    it('getLabel functions on list filter with many values should return expected strings', function () {
        var values = ['testText1', 'testText2', 'testText3', 'testText4', 'testText5', 'testText6', 'testText7', 'testText8', 'testText9'];
        var listFilterC = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TEXT.columnName, '!=', values);
        expect(listFilterC.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Text Field');
        expect(listFilterC.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Text Field');
        expect(listFilterC.getLabelForValue(mock_dataset_1.DATASET)).toEqual('!= (testText1 or testText2 or testText3 or 6 more...)');
        expect(listFilterC.getLabelForValue(mock_dataset_1.DATASET, true)).toEqual('!= (testText1 or testText2 or testText3 or 6 more...)');
    });
    it('getLabel functions on list filter with many values and equals operator should return expected strings', function () {
        var values = ['testText1', 'testText2', 'testText3', 'testText4', 'testText5', 'testText6', 'testText7', 'testText8', 'testText9'];
        var listFilterD = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TEXT.columnName, '=', values);
        expect(listFilterD.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Text Field');
        expect(listFilterD.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Text Field');
        expect(listFilterD.getLabelForValue(mock_dataset_1.DATASET)).toEqual('testText1 or testText2 or testText3 or 6 more...');
        expect(listFilterD.getLabelForValue(mock_dataset_1.DATASET, true)).toEqual('testText1 or testText2 or testText3 or 6 more...');
    });
    it('retrieveValues on list filter does return expected values', function () {
        var listFilterA = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TEXT.columnName, '!=', ['testText1', 'testText2', 'testText3']);
        expect(listFilterA.retrieveValues()).toEqual(new filters_1.ListOfValues(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TEXT.columnName, '!=', ['testText1', 'testText2', 'testText3']));
    });
});
describe('PairFilter', function () {
    it('getLabel functions on pair filter should return expected strings', function () {
        var pairFilterA = new filters_1.PairFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TYPE.columnName, '=', '!=', 'testName', 'testType');
        expect(pairFilterA.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Name Field or Test Database 1 / ' +
            'Test Table 1 / Test Type Field');
        expect(pairFilterA.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Name Field or Test Type Field');
        expect(pairFilterA.getLabelForValue(mock_dataset_1.DATASET)).toEqual('testName or != testType');
        expect(pairFilterA.getLabelForValue(mock_dataset_1.DATASET, true)).toEqual('testName or != testType');
    });
    it('getLabel functions on pair filter with same operator should return expected strings', function () {
        var pairFilterB = new filters_1.PairFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TYPE.columnName, '!=', '!=', 'testName', 'testType');
        expect(pairFilterB.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Name Field or Test Database 1 / ' +
            'Test Table 1 / Test Type Field');
        expect(pairFilterB.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Name Field or Test Type Field');
        expect(pairFilterB.getLabelForValue(mock_dataset_1.DATASET)).toEqual('!= (testName or testType)');
        expect(pairFilterB.getLabelForValue(mock_dataset_1.DATASET, true)).toEqual('!= (testName or testType)');
    });
    it('retrieveValues on pair filter does return expected values', function () {
        var pairFilterA = new filters_1.PairFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TYPE.columnName, '=', '!=', 'testName', 'testType');
        expect(pairFilterA.retrieveValues()).toEqual(new filters_1.PairOfValues(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TYPE.columnName, '=', '!=', 'testName', 'testType'));
    });
});
describe('Filter getLabel function on', function () {
    it('string filters should return expected strings', function () {
        var stringContainsFilter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, 'contains', ['testName1']);
        expect(stringContainsFilter.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Name Field');
        expect(stringContainsFilter.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Name Field');
        expect(stringContainsFilter.getLabelForValue(mock_dataset_1.DATASET)).toEqual('contains testName1');
        var stringEqualsFilter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName1']);
        expect(stringEqualsFilter.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Name Field');
        expect(stringEqualsFilter.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Name Field');
        expect(stringEqualsFilter.getLabelForValue(mock_dataset_1.DATASET)).toEqual('testName1');
        var stringNotEmptyFilter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '!=', ['']);
        expect(stringNotEmptyFilter.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Name Field');
        expect(stringNotEmptyFilter.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Name Field');
        expect(stringNotEmptyFilter.getLabelForValue(mock_dataset_1.DATASET)).toEqual('!= <empty>');
    });
    it('date filters should return expected strings', function () {
        var dateEqualsFilter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.DATE.columnName, '=', ['2000-01-02T00:00:00Z']);
        expect(dateEqualsFilter.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Date Field');
        expect(dateEqualsFilter.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Date Field');
        expect(dateEqualsFilter.getLabelForValue(mock_dataset_1.DATASET)).toEqual('2000-01-02');
        var dateGreaterThanFilter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.DATE.columnName, '>', ['2000-01-02T00:00:00Z']);
        expect(dateGreaterThanFilter.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Date Field');
        expect(dateGreaterThanFilter.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Date Field');
        expect(dateGreaterThanFilter.getLabelForValue(mock_dataset_1.DATASET)).toEqual('> 2000-01-02');
        var dateLessThanFilter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.DATE.columnName, '<', ['2000-01-02T00:00:00Z']);
        expect(dateLessThanFilter.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Date Field');
        expect(dateLessThanFilter.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Date Field');
        expect(dateLessThanFilter.getLabelForValue(mock_dataset_1.DATASET)).toEqual('< 2000-01-02');
        // TODO THOR-1329 Add tests on dates with non-zero hours/minutes/seconds
    });
    it('number filters should return expected strings', function () {
        var floatEqualsFilter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName, '=', [1234.5678]);
        expect(floatEqualsFilter.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Size Field');
        expect(floatEqualsFilter.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Size Field');
        expect(floatEqualsFilter.getLabelForValue(mock_dataset_1.DATASET)).toEqual('1234.568');
        var intEqualsFilter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName, '=', [1234]);
        expect(intEqualsFilter.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Size Field');
        expect(intEqualsFilter.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Size Field');
        expect(intEqualsFilter.getLabelForValue(mock_dataset_1.DATASET)).toEqual('1234');
        var zeroEqualsFilter = new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName, '=', [0]);
        expect(zeroEqualsFilter.getLabelForField(mock_dataset_1.DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Size Field');
        expect(zeroEqualsFilter.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('Test Size Field');
        expect(zeroEqualsFilter.getLabelForValue(mock_dataset_1.DATASET)).toEqual('0');
    });
    it('compound filter should return expected strings', function () {
        var compoundFilter = new filters_1.CompoundFilter(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.NAME.columnName, '=', ['testName']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TEXT.columnName, 'contains', ['testText']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TYPE.columnName, '!=', ['testType'])
        ]);
        // TODO THOR-1333 Improve label for custom compound filter
        expect(compoundFilter.getLabelForField(mock_dataset_1.DATASET)).toEqual('');
        expect(compoundFilter.getLabelForField(mock_dataset_1.DATASET, true)).toEqual('');
        expect(compoundFilter.getLabelForValue(mock_dataset_1.DATASET)).toEqual('(Test Database 1 / Test Table 1 / Test Name Field testName) or ' +
            '(Test Database 1 / Test Table 1 / Test Text Field contains testText) or ' +
            '(Test Database 1 / Test Table 1 / Test Type Field != testType)');
        expect(compoundFilter.getLabelForValue(mock_dataset_1.DATASET, true)).toEqual('(Test Name Field testName) or ' +
            '(Test Text Field contains testText) or (Test Type Field != testType)');
    });
});
describe('getDataSources in', function () {
    it('BoundsFilterDesign should return expected array', function () {
        var boundsDesignA = new filters_1.BoundsFilterDesign('datastore1.testDatabase2.testTable2.testXField', 'datastore1.testDatabase2.testTable2.testYField', 1, 2, 3, 4);
        expect(boundsDesignA.getDataSources()).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: '>='
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: '<='
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testYField',
                operator: '>='
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testYField',
                operator: '<='
            }]);
        expect(boundsDesignA.getDataSources(true)).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: null
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testYField',
                operator: null
            }]);
    });
    it('BoundsFilterDesign with same field key should return expected array', function () {
        var boundsDesignB = new filters_1.BoundsFilterDesign('datastore1.testDatabase2.testTable2.testXField', 'datastore1.testDatabase2.testTable2.testXField', 1, 2, 3, 4);
        expect(boundsDesignB.getDataSources()).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: '>='
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: '<='
            }]);
        expect(boundsDesignB.getDataSources(true)).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: null
            }]);
    });
    it('DomainFilterDesign should return expected array', function () {
        var domainDesignA = new filters_1.DomainFilterDesign('datastore1.testDatabase2.testTable2.testXField', 1, 2);
        expect(domainDesignA.getDataSources()).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: '>='
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: '<='
            }]);
        expect(domainDesignA.getDataSources(true)).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: null
            }]);
    });
    it('ListFilterDesign should return expected array', function () {
        var listDesignA = new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testIdField', '=', ['test1', 'test2']);
        expect(listDesignA.getDataSources()).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testIdField',
                operator: '='
            }]);
        expect(listDesignA.getDataSources(true)).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testIdField',
                operator: null
            }]);
    });
    it('PairFilterDesign should return expected array', function () {
        var pairDesignA = new filters_1.PairFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase2.testTable2.testXField', 'datastore1.testDatabase2.testTable2.testYField', '=', '!=', 1, 2);
        expect(pairDesignA.getDataSources()).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: '='
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testYField',
                operator: '!='
            }]);
        expect(pairDesignA.getDataSources(true)).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: null
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testYField',
                operator: null
            }]);
    });
    it('PairFilterDesign with same field key should return expected array', function () {
        var pairDesignB = new filters_1.PairFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase2.testTable2.testXField', 'datastore1.testDatabase2.testTable2.testXField', '=', '!=', 1, 2);
        expect(pairDesignB.getDataSources()).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: '='
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: '!='
            }]);
        expect(pairDesignB.getDataSources(true)).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: null
            }]);
    });
    it('PairFilterDesign with same field key and operator should return expected array', function () {
        var pairDesignC = new filters_1.PairFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase2.testTable2.testXField', 'datastore1.testDatabase2.testTable2.testXField', '=', '=', 1, 2);
        expect(pairDesignC.getDataSources()).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: '='
            }]);
        expect(pairDesignC.getDataSources(true)).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: null
            }]);
    });
    it('CompoundFilterDesign with same data sources except operators should return expected array', function () {
        var compoundDesignA = new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testXField', '>', [10]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testXField', '<', [20])
        ]);
        expect(compoundDesignA.getDataSources()).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: '>'
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: '<'
            }]);
        expect(compoundDesignA.getDataSources(true)).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: null
            }]);
    });
    it('CompoundFilterDesign with same data sources should return expected array', function () {
        var compoundDesignB = new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testXField', '=', [10]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testXField', '=', [20])
        ]);
        expect(compoundDesignB.getDataSources()).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: '='
            }]);
        expect(compoundDesignB.getDataSources(true)).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testXField',
                operator: null
            }]);
    });
    it('CompoundFilterDesign with nested compound designs should return expected array', function () {
        var compoundDesignC = new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
            new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testNameField', '=', ['testName1']),
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testSizeField', '=', [10]),
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testTextField', '=', ['testText1'])
            ]),
            new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testNameField', '=', ['testName2']),
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testTextField', '!=', ['testText2']),
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testTypeField', '=', ['testType1'])
            ])
        ]);
        expect(compoundDesignC.getDataSources()).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testNameField',
                operator: '='
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testSizeField',
                operator: '='
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testTextField',
                operator: '='
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testTextField',
                operator: '!='
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testTypeField',
                operator: '='
            }]);
        expect(compoundDesignC.getDataSources(true)).toEqual([{
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testNameField',
                operator: null
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testSizeField',
                operator: null
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testTextField',
                operator: null
            }, {
                datastore: 'datastore1',
                database: 'testDatabase2',
                table: 'testTable2',
                field: 'testTypeField',
                operator: null
            }]);
    });
});
//# sourceMappingURL=filters.spec.js.map