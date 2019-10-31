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
    BoundsFilter,
    BoundsFilterDesign,
    BoundsValues,
    CompoundFilter,
    CompoundFilterDesign,
    CompoundValues,
    DomainFilter,
    DomainFilterDesign,
    DomainValues,
    FilterCollection,
    FilterDataSource,
    FilterUtil,
    ListFilter,
    ListFilterDesign,
    ListOfValues,
    PairFilter,
    PairFilterDesign,
    PairOfValues
} from './filters';

import { CompoundFilterType } from './config-option';

import { DATABASES, DATASET, DATASTORE, FIELD_MAP, TABLES } from './mock.dataset';

describe('FilterUtil', () => {
    beforeAll(() => {
        /* eslint-disable no-console */
        console.log('STARTING FILTER UTIL TESTS...');
        /* eslint-enable no-console */
    });

    it('areFilterDataSourcesEquivalent should return expected boolean', () => {
        expect(FilterUtil.areFilterDataSourcesEquivalent({
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource, {
            datastore: 'datastore2',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource)).toEqual(false);

        expect(FilterUtil.areFilterDataSourcesEquivalent({
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource, {
            datastore: 'datastore1',
            database: 'database2',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource)).toEqual(false);

        expect(FilterUtil.areFilterDataSourcesEquivalent({
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table2',
            field: 'field1',
            operator: '='
        } as FilterDataSource)).toEqual(false);

        expect(FilterUtil.areFilterDataSourcesEquivalent({
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field2',
            operator: '='
        } as FilterDataSource)).toEqual(false);

        expect(FilterUtil.areFilterDataSourcesEquivalent({
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: 'contains'
        } as FilterDataSource)).toEqual(false);

        expect(FilterUtil.areFilterDataSourcesEquivalent({
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource)).toEqual(true);
    });

    it('areFilterDataSourcesEquivalent with ignoreOperator=true should return expected boolean', () => {
        expect(FilterUtil.areFilterDataSourcesEquivalent({
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: 'contains'
        } as FilterDataSource, true)).toEqual(true);
    });

    it('areFilterDataSourceListsEquivalent should return expected boolean', () => {
        expect(FilterUtil.areFilterDataSourceListsEquivalent([{
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource], [{
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource])).toEqual(true);

        expect(FilterUtil.areFilterDataSourceListsEquivalent([{
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource], [{
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: 'contains'
        } as FilterDataSource])).toEqual(false);

        expect(FilterUtil.areFilterDataSourceListsEquivalent([{
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource], [{
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: 'contains'
        } as FilterDataSource])).toEqual(false);

        expect(FilterUtil.areFilterDataSourceListsEquivalent([{
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: 'contains'
        } as FilterDataSource], [{
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: 'contains'
        } as FilterDataSource])).toEqual(false);

        expect(FilterUtil.areFilterDataSourceListsEquivalent([{
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: 'contains'
        } as FilterDataSource], [{
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: 'contains'
        } as FilterDataSource])).toEqual(true);

        expect(FilterUtil.areFilterDataSourceListsEquivalent([{
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: 'contains'
        } as FilterDataSource], [{
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: 'contains'
        } as FilterDataSource, {
            datastore: 'datastore1',
            database: 'database1',
            table: 'table1',
            field: 'field1',
            operator: '='
        } as FilterDataSource])).toEqual(true);
    });
});

describe('FilterCollection', () => {
    let filterCollection: FilterCollection;
    let source1: FilterDataSource[];
    let source2: FilterDataSource[];
    let filter1A: any;
    let filter1B: any;
    let filter2A: any;

    beforeEach(() => {
        source1 = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.ID.columnName,
            operator: '='
        } as FilterDataSource];
        source2 = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.SIZE.columnName,
            operator: '>'
        } as FilterDataSource, {
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.SIZE.columnName,
            operator: '<'
        } as FilterDataSource];
        filter1A = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.ID.columnName,
            '=',
            ['testId1']
        );
        filter1B = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.ID.columnName,
            '=',
            ['testId2']
        );
        filter2A = new CompoundFilter(CompoundFilterType.AND, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.SIZE.columnName,
                '>',
                [10]
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.SIZE.columnName,
                '<',
                [20]
            )
        ]);

        filterCollection = new FilterCollection();
        (filterCollection as any).data.set(source1, [filter1A, filter1B]);
        (filterCollection as any).data.set(source2, [filter2A]);
    });

    it('data of new collection should be empty', () => {
        let testCollection = new FilterCollection();
        expect((testCollection as any).data.size).toEqual(0);
    });

    it('findFilterDataSources should return data source from collection', () => {
        expect(filterCollection.findFilterDataSources(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.ID.columnName,
            '=',
            ['testId1']
        ))).toEqual(source1);

        expect(filterCollection.findFilterDataSources(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.SIZE.columnName,
                '>',
                [10]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.SIZE.columnName,
                '<',
                [20]
            )
        ]))).toEqual(source2);
    });

    it('findFilterDataSources should return new data source and add to collection', () => {
        let actual = filterCollection.findFilterDataSources(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.ID.columnName,
            '!=',
            ['testId1']
        ));

        expect(actual).toEqual([{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.ID.columnName,
            operator: '!='
        } as FilterDataSource]);

        expect((filterCollection as any).data.get(actual)).toEqual([]);
    });

    it('getDataSources should return expected array', () => {
        expect(filterCollection.getDataSources()).toEqual([source1, source2]);

        let testDataSource = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.ID.columnName,
            operator: '!='
        } as FilterDataSource];

        (filterCollection as any).data.set(testDataSource, []);

        expect(filterCollection.getDataSources()).toEqual([source1, source2, testDataSource]);
    });

    it('getFilters should create and return empty array if data source is not in collection', () => {
        // Different datastore
        let testDataSource1 = [{
            datastore: 'testDatastore2',
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.ID.columnName,
            operator: '='
        } as FilterDataSource];

        // Different database
        let testDataSource2 = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase2.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.ID.columnName,
            operator: '='
        } as FilterDataSource];

        // Different table
        let testDataSource3 = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable2.name,
            field: FIELD_MAP.ID.columnName,
            operator: '='
        } as FilterDataSource];

        // Different field
        let testDataSource4 = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.TEXT.columnName,
            operator: '='
        } as FilterDataSource];

        // Different operator
        let testDataSource5 = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.ID.columnName,
            operator: '!='
        } as FilterDataSource];

        // Different operators (compound)
        let testDataSource6 = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.SIZE.columnName,
            operator: '='
        } as FilterDataSource, {
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.SIZE.columnName,
            operator: '!='
        } as FilterDataSource];

        expect(filterCollection.getFilters(testDataSource1)).toEqual([]);
        expect(filterCollection.getFilters(testDataSource2)).toEqual([]);
        expect(filterCollection.getFilters(testDataSource3)).toEqual([]);
        expect(filterCollection.getFilters(testDataSource4)).toEqual([]);
        expect(filterCollection.getFilters(testDataSource5)).toEqual([]);
        expect(filterCollection.getFilters(testDataSource6)).toEqual([]);

        expect((filterCollection as any).data.get(testDataSource1)).toEqual([]);
        expect((filterCollection as any).data.get(testDataSource2)).toEqual([]);
        expect((filterCollection as any).data.get(testDataSource3)).toEqual([]);
        expect((filterCollection as any).data.get(testDataSource4)).toEqual([]);
        expect((filterCollection as any).data.get(testDataSource5)).toEqual([]);
        expect((filterCollection as any).data.get(testDataSource6)).toEqual([]);
    });

    it('getFilters should return array from identical data source object in collection', () => {
        expect(filterCollection.getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterCollection.getFilters(source2)).toEqual([filter2A]);
    });

    it('getFilters should return array from similar data source object in collection', () => {
        let testDataSource1 = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.ID.columnName,
            operator: '='
        } as FilterDataSource];

        let testDataSource2 = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.SIZE.columnName,
            operator: '>'
        } as FilterDataSource, {
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.SIZE.columnName,
            operator: '<'
        } as FilterDataSource];

        expect(filterCollection.getFilters(testDataSource1)).toEqual([filter1A, filter1B]);
        expect(filterCollection.getFilters(testDataSource2)).toEqual([filter2A]);

        expect((filterCollection as any).data.has(testDataSource1)).toEqual(false);
        expect((filterCollection as any).data.has(testDataSource2)).toEqual(false);
    });

    it('setFilters should save filters with input data source if it is not in collection', () => {
        let testDataSource = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.ID.columnName,
            operator: '!='
        } as FilterDataSource];

        let testFilter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.ID.columnName,
            '!=',
            ['testId']
        );

        expect(filterCollection.setFilters(testDataSource, [testFilter])).toEqual(testDataSource);
        expect((filterCollection as any).data.get(testDataSource)).toEqual([testFilter]);

        expect(filterCollection.setFilters(testDataSource, [])).toEqual(testDataSource);
        expect((filterCollection as any).data.get(testDataSource)).toEqual([]);
    });

    it('setFilters should save filters with identical data source object in collection', () => {
        expect(filterCollection.setFilters(source1, [filter1A])).toEqual(source1);
        expect((filterCollection as any).data.get(source1)).toEqual([filter1A]);

        expect(filterCollection.setFilters(source1, [])).toEqual(source1);
        expect((filterCollection as any).data.get(source1)).toEqual([]);

        let testFilter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.ID.columnName,
            '=',
            ['testId']
        );

        expect(filterCollection.setFilters(source1, [testFilter])).toEqual(source1);
        expect((filterCollection as any).data.get(source1)).toEqual([testFilter]);

        expect(filterCollection.setFilters(source1, [filter1A, testFilter])).toEqual(source1);
        expect((filterCollection as any).data.get(source1)).toEqual([filter1A, testFilter]);
    });

    it('setFilters should save filters with similar data source object in collection', () => {
        let testDataSource = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.ID.columnName,
            operator: '='
        } as FilterDataSource];

        expect(filterCollection.setFilters(testDataSource, [filter1A])).toEqual(source1);
        expect((filterCollection as any).data.get(source1)).toEqual([filter1A]);
        expect((filterCollection as any).data.has(testDataSource)).toEqual(false);

        expect(filterCollection.setFilters(testDataSource, [])).toEqual(source1);
        expect((filterCollection as any).data.get(source1)).toEqual([]);
        expect((filterCollection as any).data.has(testDataSource)).toEqual(false);

        let testFilter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.ID.columnName,
            '=',
            ['testId']
        );

        expect(filterCollection.setFilters(testDataSource, [testFilter])).toEqual(source1);
        expect((filterCollection as any).data.get(source1)).toEqual([testFilter]);
        expect((filterCollection as any).data.has(testDataSource)).toEqual(false);

        expect(filterCollection.setFilters(testDataSource, [filter1A, testFilter])).toEqual(source1);
        expect((filterCollection as any).data.get(source1)).toEqual([filter1A, testFilter]);
        expect((filterCollection as any).data.has(testDataSource)).toEqual(false);
    });
});

describe('Falsey Values Filter on', () => {
    it('zero', () => {
        let filter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [0]
        );

        expect((filter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name +
            '.' + FIELD_MAP.NAME.columnName);
        expect((filter).operator).toEqual('=');
        expect((filter).values).toEqual([0]);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [0]
        ))).toEqual(true);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            ['']
        ))).toEqual(false);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [false]
        ))).toEqual(false);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [null]
        ))).toEqual(false);
    });

    it('empty string', () => {
        let filter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            ['']
        );

        expect((filter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name +
            '.' + FIELD_MAP.NAME.columnName);
        expect((filter).operator).toEqual('=');
        expect((filter).values).toEqual(['']);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [0]
        ))).toEqual(false);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            ['']
        ))).toEqual(true);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [false]
        ))).toEqual(false);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [null]
        ))).toEqual(false);
    });

    it('false', () => {
        let filter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [false]
        );

        expect((filter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name +
            '.' + FIELD_MAP.NAME.columnName);
        expect((filter).operator).toEqual('=');
        expect((filter).values).toEqual([false]);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [0]
        ))).toEqual(false);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            ['']
        ))).toEqual(false);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [false]
        ))).toEqual(true);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [null]
        ))).toEqual(false);
    });

    it('null', () => {
        let filter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [null]
        );

        expect((filter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name +
            '.' + FIELD_MAP.NAME.columnName);
        expect((filter).operator).toEqual('=');
        expect((filter).values).toEqual([null]);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [0]
        ))).toEqual(false);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            ['']
        ))).toEqual(false);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [false]
        ))).toEqual(false);

        expect(filter.isCompatibleWithDesign(new ListFilterDesign(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            [null]
        ))).toEqual(true);
    });
});

describe('CompoundFilter (One Field)', () => {
    let compoundFilter: any;

    beforeEach(() => {
        compoundFilter = new CompoundFilter(CompoundFilterType.AND, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [-100]
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]);
    });

    it('does have expected compound filter properties', () => {
        expect(compoundFilter.id).toBeDefined();
        expect(compoundFilter.relations).toEqual([]);
        expect(compoundFilter.type).toEqual(CompoundFilterType.AND);

        expect(compoundFilter.filters.length).toEqual(2);
        expect(compoundFilter.filters[0].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName);
        expect(compoundFilter.filters[0].operator).toEqual('>');
        expect(compoundFilter.filters[0].values).toEqual([-100]);
        expect(compoundFilter.filters[1].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName);
        expect(compoundFilter.filters[1].operator).toEqual('<');
        expect(compoundFilter.filters[1].values).toEqual([100]);
    });

    it('createRelationFilter on compound filter should return null if substitue has bad data', () => {
        let actual = compoundFilter.createRelationFilter([{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.X.columnName
        }], [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: ''
        }]);
        expect(actual).toEqual(null);
    });

    it('createRelationFilter on compound filter should return expected object', () => {
        let actual;

        let testSubstituteList = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase2.name,
            table: TABLES.testTable2.name,
            field: FIELD_MAP.Y.columnName
        }];

        actual = compoundFilter.createRelationFilter([{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.X.columnName
        }], testSubstituteList);
        expect(actual.type).toEqual(CompoundFilterType.AND);
        expect(actual.filters.length).toEqual(2);
        expect(actual.filters[0].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase2.name + '.' + TABLES.testTable2.name +
            '.' + FIELD_MAP.Y.columnName);
        expect(actual.filters[0].operator).toEqual('>');
        expect(actual.filters[0].values).toEqual([-100]);
        expect(actual.filters[1].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase2.name + '.' + TABLES.testTable2.name +
            '.' + FIELD_MAP.Y.columnName);
        expect(actual.filters[1].operator).toEqual('<');
        expect(actual.filters[1].values).toEqual([100]);
    });

    it('doesAffectSearch on compound filter should return expected boolean', () => {
        expect(compoundFilter.doesAffectSearch(DATASTORE.name, 'testDatabase1', 'testTable1')).toEqual(true);
        expect(compoundFilter.doesAffectSearch('testDatastore2', 'testDatabase1', 'testTable1')).toEqual(false);
        expect(compoundFilter.doesAffectSearch(DATASTORE.name, 'testDatabase2', 'testTable1')).toEqual(false);
        expect(compoundFilter.doesAffectSearch(DATASTORE.name, 'testDatabase1', 'testTable2')).toEqual(false);
    });

    it('isCompatibleWithDesign on compound filter should return expected boolean', () => {
        // Correct, with values
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [-100]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]))).toEqual(true);

        // Correct, with undefined values
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                undefined
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                undefined
            )
        ]))).toEqual(true);

        // Correct, with empty value array
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                []
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                []
            )
        ]))).toEqual(true);

        // Correct, with undefined element in value array
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [undefined]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [undefined]
            )
        ]))).toEqual(true);

        // Correct, with rearranged structure
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [-100]
            )
        ]))).toEqual(true);

        // Different datastore
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                'testDatastore2.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [-100]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]))).toEqual(false);

        // Different database
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase2.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [-100]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]))).toEqual(false);

        // Different table
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable2.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [-100]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]))).toEqual(false);

        // Different field
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.Y.columnName,
                '>',
                [-100]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]))).toEqual(false);

        // Different operator
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [-100]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]))).toEqual(false);

        // Different value
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [1]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]))).toEqual(false);

        // Different type
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [-100]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]))).toEqual(false);

        // Different structure (additional nested filters)
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [-100]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [0]
            )
        ]))).toEqual(false);

        // Different structure (deeply nested filters)
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new CompoundFilterDesign(CompoundFilterType.AND, [
                new ListFilterDesign(
                    CompoundFilterType.OR,
                    DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                    '>',
                    [-100]
                ),
                new ListFilterDesign(
                    CompoundFilterType.OR,
                    DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                    '<',
                    [100]
                )
            ])
        ]))).toEqual(false);

        // Different structure (absent nested filters)
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [-100]
            )
        ]))).toEqual(false);
    });

    it('isEquivalentToFilter on compound filter should return expected boolean', () => {
        // Different datastore
        let testFilter1 = new CompoundFilter(CompoundFilterType.AND, [
            new ListFilter(
                CompoundFilterType.OR,
                'testDatastore2.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [-100]
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]);

        // Different database
        let testFilter2 = new CompoundFilter(CompoundFilterType.AND, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase2.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [-100]
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]);

        // Different table
        let testFilter3 = new CompoundFilter(CompoundFilterType.AND, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable2.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [-100]
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]);

        // Different field
        let testFilter4 = new CompoundFilter(CompoundFilterType.AND, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.Y.columnName,
                '>',
                [-100]
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]);

        // Different operator
        let testFilter5 = new CompoundFilter(CompoundFilterType.AND, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [-100]
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]);

        // Different value
        let testFilter6 = new CompoundFilter(CompoundFilterType.AND, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [1]
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]);

        // Different type
        let testFilter7 = new CompoundFilter(CompoundFilterType.OR, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [-100]
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
        ]);

        // Correct
        let testFilter8 = new CompoundFilter(CompoundFilterType.AND, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '>',
                [-100]
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '<',
                [100]
            )
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

    it('retrieveValues on compound filter should return expected object', () => {
        expect(compoundFilter.retrieveValues()).toEqual(new CompoundValues(CompoundFilterType.AND, [
            new ListOfValues(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testXField', '>', [-100]),
            new ListOfValues(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testXField', '<', [100])
        ]));
    });

    it('toDesign on compound filter should return expected object', () => {
        expect(compoundFilter.toDesign()).toEqual(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name +
                '.' + FIELD_MAP.X.columnName, '>', [-100], compoundFilter.filters[0].id),
            new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name +
                '.' + FIELD_MAP.X.columnName, '<', [100], compoundFilter.filters[1].id)
        ], compoundFilter.id));
    });
});

describe('CompoundFilter (Multi-Field)', () => {
    let compoundFilter: any;

    beforeEach(() => {
        compoundFilter = new CompoundFilter(CompoundFilterType.OR, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName1']
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]);
    });

    it('does have expected compound multi-field filter properties', () => {
        expect(compoundFilter.id).toBeDefined();
        expect(compoundFilter.relations).toEqual([]);
        expect(compoundFilter.type).toEqual(CompoundFilterType.OR);

        expect(compoundFilter.filters.length).toEqual(2);
        expect(compoundFilter.filters[0].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName);
        expect(compoundFilter.filters[0].operator).toEqual('=');
        expect(compoundFilter.filters[0].values).toEqual(['testName1']);
        expect(compoundFilter.filters[1].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName);
        expect(compoundFilter.filters[1].operator).toEqual('=');
        expect(compoundFilter.filters[1].values).toEqual([10]);
    });

    it('createRelationFilter on compound multi-field filter should return null if substitue has bad data', () => {
        let actual = compoundFilter.createRelationFilter([{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.NAME.columnName
        }], [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: ''
        }]);
        expect(actual).toEqual(null);
    });

    it('createRelationFilter should return null if equivalent fields and substitue fields are not the same length', () => {
        let actual;

        actual = compoundFilter.createRelationFilter([{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.NAME.columnName
        }, {
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.X.columnName
        }], [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.TYPE.columnName
        }]);
        expect(actual).toEqual(null);

        actual = compoundFilter.createRelationFilter([{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.NAME.columnName
        }], [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.TYPE.columnName
        }, {
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.Y.columnName
        }]);
        expect(actual).toEqual(null);
    });

    it('createRelationFilter with single substitute field should return expected object', () => {
        let actual;

        let testSubstituteList = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase2.name,
            table: TABLES.testTable2.name,
            field: FIELD_MAP.TYPE.columnName
        }];

        actual = compoundFilter.createRelationFilter([{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.NAME.columnName
        }], testSubstituteList);
        expect(actual.type).toEqual(CompoundFilterType.OR);
        expect(actual.filters.length).toEqual(2);
        expect(actual.filters[0].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase2.name + '.' + TABLES.testTable2.name +
            '.' + FIELD_MAP.TYPE.columnName);
        expect(actual.filters[0].operator).toEqual('=');
        expect(actual.filters[0].values).toEqual(['testName1']);
        expect(actual.filters[1].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name +
            '.' + FIELD_MAP.X.columnName);
        expect(actual.filters[1].operator).toEqual('=');
        expect(actual.filters[1].values).toEqual([10]);
    });

    it('createRelationFilter with multiple substitute fields should return expected object', () => {
        let actual;

        let testSubstituteList1 = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase2.name,
            table: TABLES.testTable2.name,
            field: FIELD_MAP.TYPE.columnName
        }];

        let testSubstituteList2 = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase2.name,
            table: TABLES.testTable2.name,
            field: FIELD_MAP.Y.columnName
        }];

        actual = compoundFilter.createRelationFilter([{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.NAME.columnName
        }], testSubstituteList1);

        actual = actual.createRelationFilter([{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.X.columnName
        }], testSubstituteList2);
        expect(actual.type).toEqual(CompoundFilterType.OR);
        expect(actual.filters.length).toEqual(2);
        expect(actual.filters[0].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase2.name + '.' + TABLES.testTable2.name +
            '.' + FIELD_MAP.TYPE.columnName);
        expect(actual.filters[0].operator).toEqual('=');
        expect(actual.filters[0].values).toEqual(['testName1']);
        expect(actual.filters[1].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase2.name + '.' + TABLES.testTable2.name +
            '.' + FIELD_MAP.Y.columnName);
        expect(actual.filters[1].operator).toEqual('=');
        expect(actual.filters[1].values).toEqual([10]);
    });

    it('doesAffectSearch on compound multi-field filter should return expected boolean', () => {
        expect(compoundFilter.doesAffectSearch(DATASTORE.name, 'testDatabase1', 'testTable1')).toEqual(true);
        expect(compoundFilter.doesAffectSearch('testDatastore2', 'testDatabase1', 'testTable1')).toEqual(false);
        expect(compoundFilter.doesAffectSearch(DATASTORE.name, 'testDatabase2', 'testTable1')).toEqual(false);
        expect(compoundFilter.doesAffectSearch(DATASTORE.name, 'testDatabase1', 'testTable2')).toEqual(false);
    });

    it('isCompatibleWithDesign on compound multi-field filter should return expected boolean', () => {
        // Correct, with values
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName1']
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]))).toEqual(true);

        // Correct, with undefined values
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                undefined
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                undefined
            )
        ]))).toEqual(true);

        // Correct, with empty value array
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                []
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                []
            )
        ]))).toEqual(true);

        // Correct, with undefined element in value array
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                [undefined]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [undefined]
            )
        ]))).toEqual(true);

        // Correct, with rearranged structure
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName1']
            )
        ]))).toEqual(true);

        // Different datastore
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                'testDatastore2.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName1']
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]))).toEqual(false);

        // Different database
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase2.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName1']
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]))).toEqual(false);

        // Different table
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable2.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName1']
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]))).toEqual(false);

        // Different field
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.TYPE.columnName,
                '=',
                ['testName1']
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]))).toEqual(false);

        // Different operator
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '!=',
                ['testName1']
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]))).toEqual(false);

        // Different value
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName2']
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]))).toEqual(false);

        // Different type
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName1']
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]))).toEqual(false);

        // Different structure (additional nested filters)
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName1']
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            ),
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '!=',
                ['testName2']
            )
        ]))).toEqual(false);

        // Different structure (deeply nested filters)
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new CompoundFilterDesign(CompoundFilterType.OR, [
                new ListFilterDesign(
                    CompoundFilterType.OR,
                    DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                    '=',
                    ['testName1']
                ),
                new ListFilterDesign(
                    CompoundFilterType.OR,
                    DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                    '=',
                    [10]
                )
            ])
        ]))).toEqual(false);

        // Different structure (absent nested filters)
        expect(compoundFilter.isCompatibleWithDesign(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName1']
            )
        ]))).toEqual(false);
    });

    it('isEquivalentToFilter on compound multi-field filter should return expected boolean', () => {
        // Different datastore
        let testFilter1 = new CompoundFilter(CompoundFilterType.OR, [
            new ListFilter(
                CompoundFilterType.OR,
                'testDatastore2.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName1']
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]);

        // Different database
        let testFilter2 = new CompoundFilter(CompoundFilterType.OR, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase2.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName1']
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]);

        // Different table
        let testFilter3 = new CompoundFilter(CompoundFilterType.OR, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable2.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName1']
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]);

        // Different field
        let testFilter4 = new CompoundFilter(CompoundFilterType.OR, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.TYPE.columnName,
                '=',
                ['testName1']
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]);

        // Different operator
        let testFilter5 = new CompoundFilter(CompoundFilterType.OR, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '!=',
                ['testName1']
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]);

        // Different value
        let testFilter6 = new CompoundFilter(CompoundFilterType.OR, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName2']
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]);

        // Different type
        let testFilter7 = new CompoundFilter(CompoundFilterType.AND, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName1']
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
        ]);

        // Correct
        let testFilter8 = new CompoundFilter(CompoundFilterType.OR, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName1']
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                '=',
                [10]
            )
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

    it('retrieveValues on compound multi-field filter should return expected object', () => {
        expect(compoundFilter.retrieveValues()).toEqual(new CompoundValues(CompoundFilterType.OR, [
            new ListOfValues(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', '=', ['testName1']),
            new ListOfValues(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testXField', '=', [10])
        ]));
    });

    it('toDesign on compound multi-field filter should return expected object', () => {
        expect(compoundFilter.toDesign()).toEqual(new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name +
                '.' + FIELD_MAP.NAME.columnName, '=', ['testName1'], compoundFilter.filters[0].id),
            new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name +
                '.' + FIELD_MAP.X.columnName, '=', [10], compoundFilter.filters[1].id)
        ], compoundFilter.id));
    });
});

describe('CompoundFilter (Nested Compound Filters)', () => {
    let compoundFilter: any;

    beforeEach(() => {
        compoundFilter = new CompoundFilter(CompoundFilterType.AND, [
            new CompoundFilter(CompoundFilterType.OR, [
                new ListFilter(
                    CompoundFilterType.OR,
                    DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                    '=',
                    [10]
                ),
                new ListFilter(
                    CompoundFilterType.OR,
                    DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
                    '=',
                    [20]
                )
            ]),
            new CompoundFilter(CompoundFilterType.OR, [
                new ListFilter(
                    CompoundFilterType.OR,
                    DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                    '=',
                    ['testName1']
                ),
                new ListFilter(
                    CompoundFilterType.OR,
                    DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                    '=',
                    ['testName2']
                )
            ])
        ]);
    });

    it('does have expected compound nested filter properties', () => {
        expect(compoundFilter.id).toBeDefined();
        expect(compoundFilter.relations).toEqual([]);
        expect(compoundFilter.type).toEqual(CompoundFilterType.AND);

        expect(compoundFilter.filters.length).toEqual(2);
        expect(compoundFilter.filters[0].type).toEqual(CompoundFilterType.OR);
        expect(compoundFilter.filters[0].filters.length).toEqual(2);
        expect(compoundFilter.filters[0].filters[0].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName);
        expect(compoundFilter.filters[0].filters[0].operator).toEqual('=');
        expect(compoundFilter.filters[0].filters[0].values).toEqual([10]);
        expect(compoundFilter.filters[0].filters[1].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName);
        expect(compoundFilter.filters[0].filters[1].operator).toEqual('=');
        expect(compoundFilter.filters[0].filters[1].values).toEqual([20]);
        expect(compoundFilter.filters[1].type).toEqual(CompoundFilterType.OR);
        expect(compoundFilter.filters[1].filters.length).toEqual(2);
        expect(compoundFilter.filters[1].filters[0].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName);
        expect(compoundFilter.filters[1].filters[0].operator).toEqual('=');
        expect(compoundFilter.filters[1].filters[0].values).toEqual(['testName1']);
        expect(compoundFilter.filters[1].filters[1].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName);
        expect(compoundFilter.filters[1].filters[1].operator).toEqual('=');
        expect(compoundFilter.filters[1].filters[1].values).toEqual(['testName2']);
    });

    it('retrieveValues on compound nested filter should return expected object', () => {
        expect(compoundFilter.retrieveValues()).toEqual(new CompoundValues(CompoundFilterType.AND, [
            new CompoundValues(CompoundFilterType.OR, [
                new ListOfValues(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testXField', '=', [10]),
                new ListOfValues(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testXField', '=', [20])
            ]),
            new CompoundValues(CompoundFilterType.OR, [
                new ListOfValues(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', '=', ['testName1']),
                new ListOfValues(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', '=', ['testName2'])
            ])
        ]));
    });

    it('toDesign on compound nested filters should return expected object', () => {
        expect(compoundFilter.toDesign()).toEqual(new CompoundFilterDesign(CompoundFilterType.AND, [
            new CompoundFilterDesign(CompoundFilterType.OR, [
                new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
                    TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName, '=', [10], compoundFilter.filters[0].filters[0].id),
                new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
                    TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName, '=', [20], compoundFilter.filters[0].filters[1].id)
            ], compoundFilter.filters[0].id),
            new CompoundFilterDesign(CompoundFilterType.OR, [
                new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
                    TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName, '=', ['testName1'], compoundFilter.filters[1].filters[0].id),
                new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
                    TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName, '=', ['testName2'], compoundFilter.filters[1].filters[1].id)
            ], compoundFilter.filters[1].id)
        ], compoundFilter.id));
    });
});

describe('BoundsFilter', () => {
    it('getLabel functions on bounds filter should return expected strings', () => {
        let boundsFilterA = new BoundsFilter(
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.Y.columnName,
            -50, -100, 50, 100
        );

        expect(boundsFilterA.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test X Field and Test Database 1 / ' +
            'Test Table 1 / Test Y Field');
        expect(boundsFilterA.getLabelForField(DATASET, true)).toEqual('Test X Field and Test Y Field');
        expect(boundsFilterA.getLabelForValue(DATASET)).toEqual('from (-50, -100) to (50, 100)');
    });

    it('retrieveValues on bounds filter does return expected values', () => {
        let boundsFilterA = new BoundsFilter(
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.Y.columnName,
            -50, -100, 50, 100
        );

        expect(boundsFilterA.retrieveValues()).toEqual(new BoundsValues(
            -50,
            -100,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.X.columnName,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.Y.columnName,
            50,
            100
        ));
    });
});

describe('DomainFilter', () => {
    it('getLabel functions on domain filter should return expected strings', () => {
        let domainFilterA = new DomainFilter(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
            FIELD_MAP.SIZE.columnName, -100, 100);

        expect(domainFilterA.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Size Field');
        expect(domainFilterA.getLabelForField(DATASET, true)).toEqual('Test Size Field');
        expect(domainFilterA.getLabelForValue(DATASET)).toEqual('between -100 and 100');
    });

    it('retrieveValues on domain filter does return expected values', () => {
        let domainFilterA = new DomainFilter(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
            FIELD_MAP.SIZE.columnName, -100, 100);

        expect(domainFilterA.retrieveValues()).toEqual(new DomainValues(
            -100,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.SIZE.columnName,
            100
        ));
    });
});

describe('ListFilter', () => {
    it('getLabel functions on list filter should return expected strings', () => {
        let listFilterA = new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.TEXT.columnName, '!=', ['testText1', 'testText2', 'testText3']);

        expect(listFilterA.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Text Field');
        expect(listFilterA.getLabelForField(DATASET, true)).toEqual('Test Text Field');
        expect(listFilterA.getLabelForValue(DATASET)).toEqual('!= (testText1 or testText2 or testText3)');
        expect(listFilterA.getLabelForValue(DATASET, true)).toEqual('!= (testText1 or testText2 or testText3)');
    });

    it('getLabel functions on list filter with equals operator should return expected strings', () => {
        let listFilterB = new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.TEXT.columnName, '=', ['testText1', 'testText2', 'testText3']);

        expect(listFilterB.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Text Field');
        expect(listFilterB.getLabelForField(DATASET, true)).toEqual('Test Text Field');
        expect(listFilterB.getLabelForValue(DATASET)).toEqual('testText1 or testText2 or testText3');
        expect(listFilterB.getLabelForValue(DATASET, true)).toEqual('testText1 or testText2 or testText3');
    });

    it('getLabel functions on list filter with many values should return expected strings', () => {
        let values = ['testText1', 'testText2', 'testText3', 'testText4', 'testText5', 'testText6', 'testText7', 'testText8', 'testText9'];
        let listFilterC = new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.TEXT.columnName, '!=', values);

        expect(listFilterC.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Text Field');
        expect(listFilterC.getLabelForField(DATASET, true)).toEqual('Test Text Field');
        expect(listFilterC.getLabelForValue(DATASET)).toEqual('!= (testText1 or testText2 or testText3 or 6 more...)');
        expect(listFilterC.getLabelForValue(DATASET, true)).toEqual('!= (testText1 or testText2 or testText3 or 6 more...)');
    });

    it('getLabel functions on list filter with many values and equals operator should return expected strings', () => {
        let values = ['testText1', 'testText2', 'testText3', 'testText4', 'testText5', 'testText6', 'testText7', 'testText8', 'testText9'];
        let listFilterD = new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.TEXT.columnName, '=', values);

        expect(listFilterD.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Text Field');
        expect(listFilterD.getLabelForField(DATASET, true)).toEqual('Test Text Field');
        expect(listFilterD.getLabelForValue(DATASET)).toEqual('testText1 or testText2 or testText3 or 6 more...');
        expect(listFilterD.getLabelForValue(DATASET, true)).toEqual('testText1 or testText2 or testText3 or 6 more...');
    });

    it('retrieveValues on list filter does return expected values', () => {
        let listFilterA = new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.TEXT.columnName, '!=', ['testText1', 'testText2', 'testText3']);

        expect(listFilterA.retrieveValues()).toEqual(new ListOfValues(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.TEXT.columnName,
            '!=',
            ['testText1', 'testText2', 'testText3']
        ));
    });
});

describe('PairFilter', () => {
    it('getLabel functions on pair filter should return expected strings', () => {
        let pairFilterA = new PairFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.TYPE.columnName, '=', '!=', 'testName', 'testType');

        expect(pairFilterA.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Name Field or Test Database 1 / ' +
            'Test Table 1 / Test Type Field');
        expect(pairFilterA.getLabelForField(DATASET, true)).toEqual('Test Name Field or Test Type Field');
        expect(pairFilterA.getLabelForValue(DATASET)).toEqual('testName or != testType');
        expect(pairFilterA.getLabelForValue(DATASET, true)).toEqual('testName or != testType');
    });

    it('getLabel functions on pair filter with same operator should return expected strings', () => {
        let pairFilterB = new PairFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.TYPE.columnName, '!=', '!=', 'testName', 'testType');

        expect(pairFilterB.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Name Field or Test Database 1 / ' +
            'Test Table 1 / Test Type Field');
        expect(pairFilterB.getLabelForField(DATASET, true)).toEqual('Test Name Field or Test Type Field');
        expect(pairFilterB.getLabelForValue(DATASET)).toEqual('!= (testName or testType)');
        expect(pairFilterB.getLabelForValue(DATASET, true)).toEqual('!= (testName or testType)');
    });

    it('retrieveValues on pair filter does return expected values', () => {
        let pairFilterA = new PairFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.TYPE.columnName, '=', '!=', 'testName', 'testType');

        expect(pairFilterA.retrieveValues()).toEqual(new PairOfValues(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.TYPE.columnName,
            '=',
            '!=',
            'testName',
            'testType'
        ));
    });
});

describe('Filter getLabel function on', () => {
    it('string filters should return expected strings', () => {
        let stringContainsFilter: ListFilter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            'contains',
            ['testName1']
        );

        expect(stringContainsFilter.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Name Field');
        expect(stringContainsFilter.getLabelForField(DATASET, true)).toEqual('Test Name Field');
        expect(stringContainsFilter.getLabelForValue(DATASET)).toEqual('contains testName1');

        let stringEqualsFilter: ListFilter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '=',
            ['testName1']
        );

        expect(stringEqualsFilter.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Name Field');
        expect(stringEqualsFilter.getLabelForField(DATASET, true)).toEqual('Test Name Field');
        expect(stringEqualsFilter.getLabelForValue(DATASET)).toEqual('testName1');

        let stringNotEmptyFilter: ListFilter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
            '!=',
            ['']
        );

        expect(stringNotEmptyFilter.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Name Field');
        expect(stringNotEmptyFilter.getLabelForField(DATASET, true)).toEqual('Test Name Field');
        expect(stringNotEmptyFilter.getLabelForValue(DATASET)).toEqual('!= <empty>');
    });

    it('date filters should return expected strings', () => {
        let dateEqualsFilter: ListFilter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.DATE.columnName,
            '=',
            ['2000-01-02T00:00:00Z']
        );

        expect(dateEqualsFilter.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Date Field');
        expect(dateEqualsFilter.getLabelForField(DATASET, true)).toEqual('Test Date Field');
        expect(dateEqualsFilter.getLabelForValue(DATASET)).toEqual('2000-01-02');

        let dateGreaterThanFilter: ListFilter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.DATE.columnName,
            '>',
            ['2000-01-02T00:00:00Z']
        );

        expect(dateGreaterThanFilter.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Date Field');
        expect(dateGreaterThanFilter.getLabelForField(DATASET, true)).toEqual('Test Date Field');
        expect(dateGreaterThanFilter.getLabelForValue(DATASET)).toEqual('> 2000-01-02');

        let dateLessThanFilter: ListFilter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.DATE.columnName,
            '<',
            ['2000-01-02T00:00:00Z']
        );

        expect(dateLessThanFilter.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Date Field');
        expect(dateLessThanFilter.getLabelForField(DATASET, true)).toEqual('Test Date Field');
        expect(dateLessThanFilter.getLabelForValue(DATASET)).toEqual('< 2000-01-02');

        // TODO THOR-1329 Add tests on dates with non-zero hours/minutes/seconds
    });

    it('number filters should return expected strings', () => {
        let floatEqualsFilter: ListFilter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.SIZE.columnName,
            '=',
            [1234.5678]
        );

        expect(floatEqualsFilter.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Size Field');
        expect(floatEqualsFilter.getLabelForField(DATASET, true)).toEqual('Test Size Field');
        expect(floatEqualsFilter.getLabelForValue(DATASET)).toEqual('1234.568');

        let intEqualsFilter: ListFilter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.SIZE.columnName,
            '=',
            [1234]
        );

        expect(intEqualsFilter.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Size Field');
        expect(intEqualsFilter.getLabelForField(DATASET, true)).toEqual('Test Size Field');
        expect(intEqualsFilter.getLabelForValue(DATASET)).toEqual('1234');

        let zeroEqualsFilter: ListFilter = new ListFilter(
            CompoundFilterType.OR,
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.SIZE.columnName,
            '=',
            [0]
        );

        expect(zeroEqualsFilter.getLabelForField(DATASET)).toEqual('Test Database 1 / Test Table 1 / Test Size Field');
        expect(zeroEqualsFilter.getLabelForField(DATASET, true)).toEqual('Test Size Field');
        expect(zeroEqualsFilter.getLabelForValue(DATASET)).toEqual('0');
    });

    it('compound filter should return expected strings', () => {
        let compoundFilter = new CompoundFilter(CompoundFilterType.OR, [
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.NAME.columnName,
                '=',
                ['testName']
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.TEXT.columnName,
                'contains',
                ['testText']
            ),
            new ListFilter(
                CompoundFilterType.OR,
                DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.TYPE.columnName,
                '!=',
                ['testType']
            )
        ]);

        // TODO THOR-1333 Improve label for custom compound filter
        expect(compoundFilter.getLabelForField(DATASET)).toEqual('');
        expect(compoundFilter.getLabelForField(DATASET, true)).toEqual('');
        expect(compoundFilter.getLabelForValue(DATASET)).toEqual('(Test Database 1 / Test Table 1 / Test Name Field testName) or ' +
            '(Test Database 1 / Test Table 1 / Test Text Field contains testText) or ' +
            '(Test Database 1 / Test Table 1 / Test Type Field != testType)');
        expect(compoundFilter.getLabelForValue(DATASET, true)).toEqual('(Test Name Field testName) or ' +
            '(Test Text Field contains testText) or (Test Type Field != testType)');
    });
});

describe('getDataSources in', () => {
    it('BoundsFilterDesign should return expected array', () => {
        const boundsDesignA = new BoundsFilterDesign('datastore1.testDatabase2.testTable2.testXField',
            'datastore1.testDatabase2.testTable2.testYField', 1, 2, 3, 4);

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

    it('BoundsFilterDesign with same field key should return expected array', () => {
        const boundsDesignB = new BoundsFilterDesign('datastore1.testDatabase2.testTable2.testXField',
            'datastore1.testDatabase2.testTable2.testXField', 1, 2, 3, 4);

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

    it('DomainFilterDesign should return expected array', () => {
        const domainDesignA = new DomainFilterDesign('datastore1.testDatabase2.testTable2.testXField', 1, 2);

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

    it('ListFilterDesign should return expected array', () => {
        const listDesignA = new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testIdField', '=',
            ['test1', 'test2']);

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

    it('PairFilterDesign should return expected array', () => {
        const pairDesignA = new PairFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase2.testTable2.testXField',
            'datastore1.testDatabase2.testTable2.testYField', '=', '!=', 1, 2);

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

    it('PairFilterDesign with same field key should return expected array', () => {
        const pairDesignB = new PairFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase2.testTable2.testXField',
            'datastore1.testDatabase2.testTable2.testXField', '=', '!=', 1, 2);

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

    it('PairFilterDesign with same field key and operator should return expected array', () => {
        const pairDesignC = new PairFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase2.testTable2.testXField',
            'datastore1.testDatabase2.testTable2.testXField', '=', '=', 1, 2);

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

    it('CompoundFilterDesign with same data sources except operators should return expected array', () => {
        const compoundDesignA = new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testXField', '>', [10]),
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testXField', '<', [20])
        ]);

        expect(compoundDesignA.getDataSources()).toEqual([{
            datastore: 'datastore1',
            database: 'testDatabase2',
            table: 'testTable2',
            field: 'testXField',
            operator: '>'
        } as FilterDataSource, {
            datastore: 'datastore1',
            database: 'testDatabase2',
            table: 'testTable2',
            field: 'testXField',
            operator: '<'
        } as FilterDataSource]);

        expect(compoundDesignA.getDataSources(true)).toEqual([{
            datastore: 'datastore1',
            database: 'testDatabase2',
            table: 'testTable2',
            field: 'testXField',
            operator: null
        } as FilterDataSource]);
    });

    it('CompoundFilterDesign with same data sources should return expected array', () => {
        const compoundDesignB = new CompoundFilterDesign(CompoundFilterType.OR, [
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testXField', '=', [10]),
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testXField', '=', [20])
        ]);

        expect(compoundDesignB.getDataSources()).toEqual([{
            datastore: 'datastore1',
            database: 'testDatabase2',
            table: 'testTable2',
            field: 'testXField',
            operator: '='
        } as FilterDataSource]);

        expect(compoundDesignB.getDataSources(true)).toEqual([{
            datastore: 'datastore1',
            database: 'testDatabase2',
            table: 'testTable2',
            field: 'testXField',
            operator: null
        } as FilterDataSource]);
    });

    it('CompoundFilterDesign with nested compound designs should return expected array', () => {
        const compoundDesignC = new CompoundFilterDesign(CompoundFilterType.OR, [
            new CompoundFilterDesign(CompoundFilterType.OR, [
                new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testNameField', '=', ['testName1']),
                new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testSizeField', '=', [10]),
                new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testTextField', '=', ['testText1'])
            ]),
            new CompoundFilterDesign(CompoundFilterType.OR, [
                new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testNameField', '=', ['testName2']),
                new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testTextField', '!=', ['testText2']),
                new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase2.testTable2.testTypeField', '=', ['testType1'])
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
        } as FilterDataSource]);

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
        } as FilterDataSource]);
    });
});
