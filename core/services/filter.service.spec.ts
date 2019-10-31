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

import { CompoundFilter, CompoundFilterDesign, FilterDataSource, ListFilter, ListFilterDesign } from '../models/filters';
import { CompoundFilterType } from '../models/config-option';
import { Dataset } from '../models/dataset';
import { FilterChangeListener, FilterService } from './filter.service';

import { DATABASES, DATASET, DATASTORE, FIELD_MAP, TABLES } from '../models/mock.dataset';
import * as _ from 'lodash';

describe('FilterService with no filters', () => {
    let filterService: FilterService;

    beforeEach(() => {
        filterService = new FilterService();
    });

    it('should have expected properties with no filters', () => {
        expect(filterService['filterCollection']).toBeDefined();
        expect((filterService['filterCollection'])['data'].size).toEqual(0);
        expect(filterService['_listeners']).toEqual(new Map<string, FilterChangeListener>());
        expect(filterService['_notifier'].toString()).toEqual(filterService.notifyFilterChangeListeners.bind(filterService).toString());
    });

    it('getFilters with no filters should return expected array', () => {
        expect(filterService.getFilters()).toEqual([]);
    });
});

describe('FilterService with filters', () => {
    let filterService: FilterService;
    let source1: FilterDataSource[];
    let source2: FilterDataSource[];
    let config1A: ListFilterDesign;
    let config1B: ListFilterDesign;
    let config2A: CompoundFilterDesign;
    let filter1A: any;
    let filter1B: any;
    let filter2A: any;
    let relationSource1: FilterDataSource[];
    let relationSource2: FilterDataSource[];
    let relationConfig1: ListFilterDesign;
    let relationConfig2: ListFilterDesign;
    let relationFilter1: any;
    let relationFilter2: any;
    let dataset: Dataset;

    beforeEach(() => {
        filterService = new FilterService();
        dataset = _.cloneDeep(DATASET);
        dataset.setRelations([[[
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_A.columnName
        ], [
            DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_B.columnName
        ]]]);

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

        config1A = new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.ID.columnName, '=', ['testId1']);
        config1B = new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.ID.columnName, '=', ['testId2']);
        config2A = new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
                TABLES.testTable1.name + '.' + FIELD_MAP.SIZE.columnName, '>', [10]),
            new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
                TABLES.testTable1.name + '.' + FIELD_MAP.SIZE.columnName, '<', [20])
        ]);

        filter1A = config1A.toFilter();
        filter1B = config1B.toFilter();
        filter2A = config2A.toFilter();

        config1A.id = filter1A.id;
        config1B.id = filter1B.id;
        config2A.id = filter2A.id;
        config2A.filters[0].id = filter2A.filters[0].id;
        config2A.filters[1].id = filter2A.filters[1].id;

        filterService['filterCollection'].setFilters(source1, [filter1A, filter1B]);
        filterService['filterCollection'].setFilters(source2, [filter2A]);
    });

    afterEach(() => {
        // Services are not recreated in each test so we must reset the internal data.
        (filterService['filterCollection'])['data'].clear();
    });

    /**
     * Generates test relation filters and activates them in the FilterService.
     */
    let activateRelationFilters = () => {
        generateRelationFilters();
        filterService['filterCollection'].setFilters(relationSource1, [relationFilter1]);
        filterService['filterCollection'].setFilters(relationSource2, [relationFilter2]);
    };

    /**
     * Generates test relation filters.
     */
    let generateRelationFilters = () => {
        relationSource1 = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.RELATION_A.columnName,
            operator: '='
        } as FilterDataSource];
        relationSource2 = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.RELATION_B.columnName,
            operator: '='
        } as FilterDataSource];

        relationConfig1 = new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_A.columnName, '=', ['testRelation']);
        relationConfig2 = new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_B.columnName, '=', ['testRelation']);

        relationFilter1 = relationConfig1.toFilter();
        relationFilter2 = relationConfig2.toFilter();
        relationFilter1.relations = [relationFilter2.id];
        relationFilter2.relations = [relationFilter1.id];

        relationConfig1.id = relationFilter1.id;
        relationConfig1.relations = relationFilter1.relations;
        relationConfig2.id = relationFilter2.id;
        relationConfig2.relations = relationFilter2.relations;
    };

    it('should have expected properties', () => {
        expect(filterService['filterCollection'].getDataSources()).toEqual([source1, source2]);
        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        expect(filterService['_listeners']).toEqual(new Map<string, FilterChangeListener>());
        expect(filterService['_notifier'].toString()).toEqual(filterService.notifyFilterChangeListeners.bind(filterService).toString());
    });

    it('deleteFilter should delete filter and call the _notifier', () => {
        let spy = spyOn(filterService as any, '_notifier');

        filterService.deleteFilter('testCaller', config1A);

        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('deleteFilter should also delete relation filters', () => {
        activateRelationFilters();

        let spy = spyOn(filterService as any, '_notifier');

        filterService.deleteFilter('testCaller', relationConfig1);

        expect(filterService['filterCollection'].getFilters(relationSource1)).toEqual([]);
        expect(filterService['filterCollection'].getFilters(relationSource2)).toEqual([]);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('deleteFilters should delete all filters and call the _notifier', () => {
        let spy = spyOn(filterService as any, '_notifier');

        filterService.deleteFilters('testCaller');

        expect(filterService['filterCollection'].getFilters(source1)).toEqual([]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([]);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('deleteFilters with filter-list-to-delete should delete argument filters', () => {
        let spy = spyOn(filterService as any, '_notifier');

        filterService.deleteFilters('testCaller', [config1A]);

        expect(filterService['filterCollection'].getFilters(source1)).toEqual([]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('deleteFilters should also delete relation filters', () => {
        activateRelationFilters();

        let spy = spyOn(filterService as any, '_notifier');

        filterService.deleteFilters('testCaller', [relationConfig1]);

        expect(filterService['filterCollection'].getFilters(relationSource1)).toEqual([]);
        expect(filterService['filterCollection'].getFilters(relationSource2)).toEqual([]);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('deleteFilters should not publish any event if no filters are affected', () => {
        let spy = spyOn(filterService as any, '_notifier');

        filterService.deleteFilters('testCaller', [new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' +
            DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' + FIELD_MAP.TEXT.columnName, '=', [undefined])]);

        expect(spy.calls.count()).toEqual(0);
    });

    it('exchangeFilters should add new filters and call the _notifier', () => {
        let spy = spyOn(filterService as any, '_notifier');

        let testConfig = new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.TEXT.columnName, '=', ['testText']);

        let testSource = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.TEXT.columnName,
            operator: '='
        } as FilterDataSource];

        filterService.exchangeFilters('testCaller', [testConfig], dataset);

        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);

        let listComplete = filterService['filterCollection'].getFilters(testSource);
        expect(listComplete.length).toEqual(1);
        expect((listComplete[0] as ListFilter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.TEXT.columnName);
        expect((listComplete[0] as ListFilter).operator).toEqual('=');
        expect((listComplete[0] as ListFilter).values).toEqual(['testText']);

        testConfig.id = listComplete[0].id;

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('exchangeFilters should delete old filters and call the _notifier', () => {
        let spy = spyOn(filterService as any, '_notifier');

        let testConfig = new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.ID.columnName, '=', ['testId5']);

        filterService.exchangeFilters('testCaller', [testConfig], dataset);

        let listComplete = filterService['filterCollection'].getFilters(source1);
        expect(listComplete.length).toEqual(1);
        expect((listComplete[0] as ListFilter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.ID.columnName);
        expect((listComplete[0] as ListFilter).operator).toEqual('=');
        expect((listComplete[0] as ListFilter).values).toEqual(['testId5']);

        testConfig.id = listComplete[0].id;

        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('exchangeFilters should also add new relation filters', () => {
        generateRelationFilters();

        let spy = spyOn(filterService as any, '_notifier');

        filterService.exchangeFilters('testCaller', [relationConfig1], dataset);

        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);

        let listComplete = filterService['filterCollection'].getFilters(relationSource1);
        expect(listComplete.length).toEqual(1);
        expect((listComplete[0] as ListFilter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_A.columnName);
        expect((listComplete[0] as ListFilter).operator).toEqual('=');
        expect((listComplete[0] as ListFilter).values).toEqual(['testRelation']);

        relationConfig1.id = listComplete[0].id;
        relationConfig1.relations = listComplete[0].relations;

        listComplete = filterService['filterCollection'].getFilters(relationSource2);
        expect(listComplete.length).toEqual(1);
        expect((listComplete[0] as ListFilter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_B.columnName);
        expect((listComplete[0] as ListFilter).operator).toEqual('=');
        expect((listComplete[0] as ListFilter).values).toEqual(['testRelation']);

        relationConfig2.id = listComplete[0].id;
        relationConfig2.relations = listComplete[0].relations;

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('exchangeFilters should also delete old relation filters', () => {
        activateRelationFilters();

        let spy = spyOn(filterService as any, '_notifier');

        let testConfig2 = new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_B.columnName, '=', ['testExchangeRelation']);

        filterService.exchangeFilters('testCaller', [testConfig2], dataset);

        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);

        let listComplete = filterService['filterCollection'].getFilters(relationSource1);
        expect(listComplete.length).toEqual(1);
        expect((listComplete[0] as ListFilter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_A.columnName);
        expect((listComplete[0] as ListFilter).operator).toEqual('=');
        expect((listComplete[0] as ListFilter).values).toEqual(['testExchangeRelation']);

        listComplete = filterService['filterCollection'].getFilters(relationSource2);
        expect(listComplete.length).toEqual(1);
        expect((listComplete[0] as ListFilter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_B.columnName);
        expect((listComplete[0] as ListFilter).operator).toEqual('=');
        expect((listComplete[0] as ListFilter).values).toEqual(['testExchangeRelation']);

        testConfig2.id = listComplete[0].id;
        testConfig2.relations = listComplete[0].relations;

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('exchangeFilters with filter-list-to-delete should delete argument filters', () => {
        let spy = spyOn(filterService as any, '_notifier');

        filterService.exchangeFilters('testCaller', [], dataset, [config1A]);

        expect(filterService['filterCollection'].getFilters(source1)).toEqual([]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('exchangeFilters with filter-list-to-delete should also delete relation filters', () => {
        activateRelationFilters();

        let spy = spyOn(filterService as any, '_notifier');

        filterService.exchangeFilters('testCaller', [], dataset, [relationConfig1]);

        expect(filterService['filterCollection'].getFilters(relationSource1)).toEqual([]);
        expect(filterService['filterCollection'].getFilters(relationSource2)).toEqual([]);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('exchangeFilters should not publish any event if no filters are affected', () => {
        let spy = spyOn(filterService as any, '_notifier');

        filterService.exchangeFilters('testCaller', [], dataset);

        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);

        expect(spy.calls.count()).toEqual(0);
    });

    it('getFilters should return expected array', () => {
        expect(filterService.getFilters()).toEqual([filter1A, filter1B, filter2A]);
        expect(filterService.getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService.getFilters(source2)).toEqual([filter2A]);
        expect(filterService.getFilters([{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.ID.columnName,
            operator: '!='
        } as FilterDataSource])).toEqual([]);
    });

    it('getFiltersToSearch should return expected array', () => {
        expect(filterService.getFiltersToSearch('fakeDatastore1', 'testDatabase1', 'testTable1')).toEqual([]);
        expect(filterService.getFiltersToSearch('datastore1', 'fakeDatabase1', 'testTable1')).toEqual([]);
        expect(filterService.getFiltersToSearch('datastore1', 'testDatabase1', 'fakeTable1')).toEqual([]);

        let filters = filterService.getFiltersToSearch('datastore1', 'testDatabase1', 'testTable1');
        expect(filters.map((filter) => {
            let config = filter.toDesign();
            config.id = undefined;
            return config;
        })).toEqual([new CompoundFilterDesign(CompoundFilterType.OR, [filter1A.toDesign(), filter1B.toDesign()]),
            new CompoundFilterDesign(CompoundFilterType.OR, [filter2A.toDesign()])]);
    });

    it('getFiltersToSearch with filter-list-to-ignore should return expected array', () => {
        let filters1 = filterService.getFiltersToSearch('datastore1', 'testDatabase1', 'testTable1', [config1A]);
        expect(filters1.map((filter) => {
            let config = filter.toDesign();
            config.id = undefined;
            return config;
        })).toEqual([new CompoundFilterDesign(CompoundFilterType.OR, [filter2A.toDesign()])]);

        let filters2 = filterService.getFiltersToSearch('datastore1', 'testDatabase1', 'testTable1', [config1B]);
        expect(filters2.map((filter) => {
            let config = filter.toDesign();
            config.id = undefined;
            return config;
        })).toEqual([new CompoundFilterDesign(CompoundFilterType.OR, [filter2A.toDesign()])]);

        let filters3 = filterService.getFiltersToSearch('datastore1', 'testDatabase1', 'testTable1', [config2A]);
        expect(filters3.map((filter) => {
            let config = filter.toDesign();
            config.id = undefined;
            return config;
        })).toEqual([new CompoundFilterDesign(CompoundFilterType.OR, [filter1A.toDesign(), filter1B.toDesign()])]);

        expect(filterService.getFiltersToSearch('datastore1', 'testDatabase1', 'testTable1', [config1A, config2A])).toEqual([]);
    });

    it('notifyFilterChangeListeners does call each listener callback function', () => {
        let calledA = 0;
        let calledB = 0;

        const expectedCallerId = 'testCaller';

        const listenerA = (callerId: string) => {
            expect(callerId).toBe(expectedCallerId);
            calledA++;
        };

        const listenerB = (callerId: string) => {
            expect(callerId).toBe(expectedCallerId);
            calledB++;
        };

        filterService['_listeners'] = new Map<string, FilterChangeListener>();

        filterService['_listeners'].set('testIdA', listenerA);
        filterService['_listeners'].set('testIdB', listenerB);

        filterService.notifyFilterChangeListeners(expectedCallerId);

        expect(calledA).toBe(1);
        expect(calledB).toBe(1);
    });

    it('overrideFilterChangeNotifier does update _notifier', () => {
        const notifier = (__callerId: string) => {
            // Do nothing.
        };

        filterService.overrideFilterChangeNotifier(notifier);

        expect(filterService['_notifier']).toBe(notifier);
    });

    it('registerFilterChangeListener does update _listeners', () => {
        const listener = (__callerId: string) => {
            // Do nothing.
        };

        filterService['_listeners'] = new Map<string, FilterChangeListener>();

        filterService.registerFilterChangeListener('testIdA', listener);

        expect(filterService['_listeners'].get('testIdA')).toBe(listener);
        expect(filterService['_listeners'].get('testIdB')).toBe(undefined);
    });

    it('retrieveCompatibleFilterCollection should return expected filter collection', () => {
        // Remove the filter value to make the config compatible with each filter of its data source
        config1A.values = [undefined];

        let testCollection = filterService.retrieveCompatibleFilterCollection([config1A]);

        expect(testCollection.getDataSources()).toEqual([source1]);
        expect(testCollection.getFilters(source1)).toEqual([filter1A, filter1B]);
    });

    it('retrieveCompatibleFilterCollection should copy multiple filters if multiple configs have compatible filters', () => {
        // Remove the filter value to make the config compatible with each filter of its data source
        config1A.values = [undefined];

        let testCollection = filterService.retrieveCompatibleFilterCollection([config1A, config2A]);

        expect(testCollection.getDataSources()).toEqual([source1, source2]);
        expect(testCollection.getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(testCollection.getFilters(source2)).toEqual([filter2A]);
    });

    it('retrieveCompatibleFilterCollection should not copy the same filters if configs have the same data source', () => {
        // Remove the filter value to make the config compatible with each filter of its data source
        config1A.values = [undefined];

        let testConfig = new CompoundFilterDesign(CompoundFilterType.AND, [
            new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
                TABLES.testTable1.name + '.' + FIELD_MAP.ID.columnName, '=', [undefined])
        ]);

        let testCollection = filterService.retrieveCompatibleFilterCollection([config1A, testConfig]);

        expect(testCollection.getDataSources()).toEqual([source1]);
        expect(testCollection.getFilters(source1)).toEqual([filter1A, filter1B]);
    });

    it('retrieveCompatibleFilterCollection should do nothing with no compatible filters', () => {
        let testConfig = new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.TEXT.columnName, '=', [undefined]);

        let testSource = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.TEXT.columnName,
            operator: '='
        } as FilterDataSource];

        let testCollection = filterService.retrieveCompatibleFilterCollection([testConfig]);

        expect(testCollection.getDataSources()).toEqual([testSource]);
        expect(testCollection.getFilters(testSource)).toEqual([]);
    });

    it('setFilters should change filterCollection', () => {
        let actual;

        filterService.setFilters([]);
        expect(filterService['filterCollection'].getDataSources()).toEqual([]);

        filterService.setFilters([
            new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
                FIELD_MAP.ID.columnName, '=', ['testId1'])
        ]);
        expect(filterService['filterCollection'].getDataSources()).toEqual([source1]);
        actual = filterService['filterCollection'].getFilters(source1);
        expect(actual.length).toEqual(1);
        expect(actual[0].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
            FIELD_MAP.ID.columnName);
        expect(actual[0].operator).toEqual('=');
        expect(actual[0].values).toEqual(['testId1']);

        filterService.setFilters([
            new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
                FIELD_MAP.ID.columnName, '=', ['testId1']),
            new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
                FIELD_MAP.ID.columnName, '=', ['testId2']),
            new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
                FIELD_MAP.ID.columnName, '=', ['testId3']),
            new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
                FIELD_MAP.ID.columnName, '=', ['testId4'])
        ]);
        expect(filterService['filterCollection'].getDataSources()).toEqual([source1]);
        actual = filterService['filterCollection'].getFilters(source1);
        expect(actual.length).toEqual(4);
        expect(actual[0].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
            FIELD_MAP.ID.columnName);
        expect(actual[0].operator).toEqual('=');
        expect(actual[0].values).toEqual(['testId1']);
        expect(actual[1].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
            FIELD_MAP.ID.columnName);
        expect(actual[1].operator).toEqual('=');
        expect(actual[1].values).toEqual(['testId2']);
        expect(actual[2].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
            FIELD_MAP.ID.columnName);
        expect(actual[2].operator).toEqual('=');
        expect(actual[2].values).toEqual(['testId3']);
        expect(actual[3].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
            FIELD_MAP.ID.columnName);
        expect(actual[3].operator).toEqual('=');
        expect(actual[3].values).toEqual(['testId4']);

        filterService.setFilters([
            new CompoundFilter(CompoundFilterType.AND, [
                new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name +
                    '.' + FIELD_MAP.SIZE.columnName, '>', [10]),
                new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name +
                    '.' + FIELD_MAP.SIZE.columnName, '<', [20])
            ])
        ]);
        expect(filterService['filterCollection'].getDataSources()).toEqual([source2]);
        actual = filterService['filterCollection'].getFilters(source2);
        expect(actual.length).toEqual(1);
        expect(actual[0].type).toEqual(CompoundFilterType.AND);
        expect(actual[0].filters.length).toEqual(2);
        expect(actual[0].filters[0].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.SIZE.columnName);
        expect(actual[0].filters[0].operator).toEqual('>');
        expect(actual[0].filters[0].values).toEqual([10]);
        expect(actual[0].filters[1].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.SIZE.columnName);
        expect(actual[0].filters[1].operator).toEqual('<');
        expect(actual[0].filters[1].values).toEqual([20]);

        filterService.setFilters([
            new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
                FIELD_MAP.ID.columnName, '=', ['testId1']),
            new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
                FIELD_MAP.ID.columnName, '=', ['testId2']),
            new CompoundFilter(CompoundFilterType.AND, [
                new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name +
                    '.' + FIELD_MAP.SIZE.columnName, '>', [10]),
                new ListFilter(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name +
                    '.' + FIELD_MAP.SIZE.columnName, '<', [20])
            ])
        ]);
        expect(filterService['filterCollection'].getDataSources()).toEqual([source1, source2]);
        actual = filterService['filterCollection'].getFilters(source1);
        expect(actual.length).toEqual(2);
        expect(actual[0].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
            FIELD_MAP.ID.columnName);
        expect(actual[0].operator).toEqual('=');
        expect(actual[0].values).toEqual(['testId1']);
        expect(actual[1].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' + TABLES.testTable1.name + '.' +
            FIELD_MAP.ID.columnName);
        expect(actual[1].operator).toEqual('=');
        expect(actual[1].values).toEqual(['testId2']);
        actual = filterService['filterCollection'].getFilters(source2);
        expect(actual.length).toEqual(1);
        expect(actual[0].type).toEqual(CompoundFilterType.AND);
        expect(actual[0].filters.length).toEqual(2);
        expect(actual[0].filters[0].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.SIZE.columnName);
        expect(actual[0].filters[0].operator).toEqual('>');
        expect(actual[0].filters[0].values).toEqual([10]);
        expect(actual[0].filters[1].fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.SIZE.columnName);
        expect(actual[0].filters[1].operator).toEqual('<');
        expect(actual[0].filters[1].values).toEqual([20]);
    });

    it('createFilters should add new filters to an existing data source and call the _notifier', () => {
        let spy = spyOn(filterService as any, '_notifier');

        let testConfig = new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.ID.columnName, '=', ['testId5']);

        filterService.createFilters('testCaller', [testConfig], dataset);

        let listComplete = filterService['filterCollection'].getFilters(source1);
        expect(listComplete.length).toEqual(3);
        expect(listComplete[0]).toEqual(filter1A);
        expect(listComplete[1]).toEqual(filter1B);
        expect((listComplete[2] as ListFilter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.ID.columnName);
        expect((listComplete[2] as ListFilter).operator).toEqual('=');
        expect((listComplete[2] as ListFilter).values).toEqual(['testId5']);

        testConfig.id = listComplete[2].id;

        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('createFilters should add new filters to a new data source and call the _notifier', () => {
        let spy = spyOn(filterService as any, '_notifier');

        let testConfig = new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.TEXT.columnName, '=', ['testText']);

        let testSource = [{
            datastore: DATASTORE.name,
            database: DATABASES.testDatabase1.name,
            table: TABLES.testTable1.name,
            field: FIELD_MAP.TEXT.columnName,
            operator: '='
        } as FilterDataSource];

        filterService.createFilters('testCaller', [testConfig], dataset);

        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);

        let listComplete = filterService['filterCollection'].getFilters(testSource);
        expect(listComplete.length).toEqual(1);
        expect((listComplete[0] as ListFilter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.TEXT.columnName);
        expect((listComplete[0] as ListFilter).operator).toEqual('=');
        expect((listComplete[0] as ListFilter).values).toEqual(['testText']);

        testConfig.id = listComplete[0].id;

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('createFilters should also add new relation filters', () => {
        generateRelationFilters();

        let spy = spyOn(filterService as any, '_notifier');

        filterService.createFilters('testCaller', [relationConfig1], dataset);

        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);

        let listComplete = filterService['filterCollection'].getFilters(relationSource1);
        expect(listComplete.length).toEqual(1);
        expect((listComplete[0] as ListFilter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_A.columnName);
        expect((listComplete[0] as ListFilter).operator).toEqual('=');
        expect((listComplete[0] as ListFilter).values).toEqual(['testRelation']);

        relationConfig1.id = listComplete[0].id;
        relationConfig1.relations = listComplete[0].relations;

        listComplete = filterService['filterCollection'].getFilters(relationSource2);
        expect(listComplete.length).toEqual(1);
        expect((listComplete[0] as ListFilter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_B.columnName);
        expect((listComplete[0] as ListFilter).operator).toEqual('=');
        expect((listComplete[0] as ListFilter).values).toEqual(['testRelation']);

        relationConfig2.id = listComplete[0].id;
        relationConfig2.relations = listComplete[0].relations;

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('createFilters should keep old relation filters and add new relation filters', () => {
        activateRelationFilters();

        let spy = spyOn(filterService as any, '_notifier');

        let testConfig2 = new ListFilterDesign(CompoundFilterType.OR, DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_B.columnName, '=', ['testToggleRelation']);

        filterService.createFilters('testCaller', [testConfig2], dataset);

        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);

        let listComplete = filterService['filterCollection'].getFilters(relationSource1);
        expect(listComplete.length).toEqual(2);
        expect(listComplete[0]).toEqual(relationFilter1);
        expect((listComplete[1] as ListFilter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_A.columnName);
        expect((listComplete[1] as ListFilter).operator).toEqual('=');
        expect((listComplete[1] as ListFilter).values).toEqual(['testToggleRelation']);

        listComplete = filterService['filterCollection'].getFilters(relationSource2);
        expect(listComplete.length).toEqual(2);
        expect(listComplete[0]).toEqual(relationFilter2);
        expect((listComplete[1] as ListFilter).fieldKey).toEqual(DATASTORE.name + '.' + DATABASES.testDatabase1.name + '.' +
            TABLES.testTable1.name + '.' + FIELD_MAP.RELATION_B.columnName);
        expect((listComplete[1] as ListFilter).operator).toEqual('=');
        expect((listComplete[1] as ListFilter).values).toEqual(['testToggleRelation']);

        testConfig2.id = listComplete[1].id;
        testConfig2.relations = listComplete[1].relations;

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });

    it('createFilters should not publish any event if no filters are affected', () => {
        let spy = spyOn(filterService as any, '_notifier');

        filterService.createFilters('testCaller', [], dataset);

        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);

        expect(spy.calls.count()).toEqual(0);
    });

    it('unregisterFilterChangeListener does update _listeners', () => {
        const listener = (__callerId: string) => {
            // Do nothing.
        };

        filterService['_listeners'] = new Map<string, FilterChangeListener>();

        filterService['_listeners'].set('testIdA', listener);
        filterService['_listeners'].set('testIdB', listener);

        filterService.unregisterFilterChangeListener('testIdA');

        expect(filterService['_listeners'].get('testIdA')).toBe(undefined);
        expect(filterService['_listeners'].get('testIdB')).toBe(listener);
    });
});

