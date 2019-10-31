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
var filters_1 = require("../models/filters");
var config_option_1 = require("../models/config-option");
var filter_service_1 = require("./filter.service");
var mock_dataset_1 = require("../models/mock.dataset");
var _ = require("lodash");
describe('FilterService with no filters', function () {
    var filterService;
    beforeEach(function () {
        filterService = new filter_service_1.FilterService();
    });
    it('should have expected properties with no filters', function () {
        expect(filterService['filterCollection']).toBeDefined();
        expect((filterService['filterCollection'])['data'].size).toEqual(0);
        expect(filterService['_listeners']).toEqual(new Map());
        expect(filterService['_notifier'].toString()).toEqual(filterService.notifyFilterChangeListeners.bind(filterService).toString());
    });
    it('getFilters with no filters should return expected array', function () {
        expect(filterService.getFilters()).toEqual([]);
    });
});
describe('FilterService with filters', function () {
    var filterService;
    var source1;
    var source2;
    var config1A;
    var config1B;
    var config2A;
    var filter1A;
    var filter1B;
    var filter2A;
    var relationSource1;
    var relationSource2;
    var relationConfig1;
    var relationConfig2;
    var relationFilter1;
    var relationFilter2;
    var dataset;
    beforeEach(function () {
        filterService = new filter_service_1.FilterService();
        dataset = _.cloneDeep(mock_dataset_1.DATASET);
        dataset.setRelations([[[
                    mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.RELATION_A.columnName
                ], [
                    mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.RELATION_B.columnName
                ]]]);
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
        config1A = new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId1']);
        config1B = new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId2']);
        config2A = new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
                mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName, '>', [10]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
                mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName, '<', [20])
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
    afterEach(function () {
        // Services are not recreated in each test so we must reset the internal data.
        (filterService['filterCollection'])['data'].clear();
    });
    /**
     * Generates test relation filters and activates them in the FilterService.
     */
    var activateRelationFilters = function () {
        generateRelationFilters();
        filterService['filterCollection'].setFilters(relationSource1, [relationFilter1]);
        filterService['filterCollection'].setFilters(relationSource2, [relationFilter2]);
    };
    /**
     * Generates test relation filters.
     */
    var generateRelationFilters = function () {
        relationSource1 = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.RELATION_A.columnName,
                operator: '='
            }];
        relationSource2 = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.RELATION_B.columnName,
                operator: '='
            }];
        relationConfig1 = new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.RELATION_A.columnName, '=', ['testRelation']);
        relationConfig2 = new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.RELATION_B.columnName, '=', ['testRelation']);
        relationFilter1 = relationConfig1.toFilter();
        relationFilter2 = relationConfig2.toFilter();
        relationFilter1.relations = [relationFilter2.id];
        relationFilter2.relations = [relationFilter1.id];
        relationConfig1.id = relationFilter1.id;
        relationConfig1.relations = relationFilter1.relations;
        relationConfig2.id = relationFilter2.id;
        relationConfig2.relations = relationFilter2.relations;
    };
    it('should have expected properties', function () {
        expect(filterService['filterCollection'].getDataSources()).toEqual([source1, source2]);
        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        expect(filterService['_listeners']).toEqual(new Map());
        expect(filterService['_notifier'].toString()).toEqual(filterService.notifyFilterChangeListeners.bind(filterService).toString());
    });
    it('deleteFilter should delete filter and call the _notifier', function () {
        var spy = spyOn(filterService, '_notifier');
        filterService.deleteFilter('testCaller', config1A);
        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('deleteFilter should also delete relation filters', function () {
        activateRelationFilters();
        var spy = spyOn(filterService, '_notifier');
        filterService.deleteFilter('testCaller', relationConfig1);
        expect(filterService['filterCollection'].getFilters(relationSource1)).toEqual([]);
        expect(filterService['filterCollection'].getFilters(relationSource2)).toEqual([]);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('deleteFilters should delete all filters and call the _notifier', function () {
        var spy = spyOn(filterService, '_notifier');
        filterService.deleteFilters('testCaller');
        expect(filterService['filterCollection'].getFilters(source1)).toEqual([]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([]);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('deleteFilters with filter-list-to-delete should delete argument filters', function () {
        var spy = spyOn(filterService, '_notifier');
        filterService.deleteFilters('testCaller', [config1A]);
        expect(filterService['filterCollection'].getFilters(source1)).toEqual([]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('deleteFilters should also delete relation filters', function () {
        activateRelationFilters();
        var spy = spyOn(filterService, '_notifier');
        filterService.deleteFilters('testCaller', [relationConfig1]);
        expect(filterService['filterCollection'].getFilters(relationSource1)).toEqual([]);
        expect(filterService['filterCollection'].getFilters(relationSource2)).toEqual([]);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('deleteFilters should not publish any event if no filters are affected', function () {
        var spy = spyOn(filterService, '_notifier');
        filterService.deleteFilters('testCaller', [new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' +
                mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TEXT.columnName, '=', [undefined])]);
        expect(spy.calls.count()).toEqual(0);
    });
    it('exchangeFilters should add new filters and call the _notifier', function () {
        var spy = spyOn(filterService, '_notifier');
        var testConfig = new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TEXT.columnName, '=', ['testText']);
        var testSource = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.TEXT.columnName,
                operator: '='
            }];
        filterService.exchangeFilters('testCaller', [testConfig], dataset);
        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        var listComplete = filterService['filterCollection'].getFilters(testSource);
        expect(listComplete.length).toEqual(1);
        expect(listComplete[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TEXT.columnName);
        expect(listComplete[0].operator).toEqual('=');
        expect(listComplete[0].values).toEqual(['testText']);
        testConfig.id = listComplete[0].id;
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('exchangeFilters should delete old filters and call the _notifier', function () {
        var spy = spyOn(filterService, '_notifier');
        var testConfig = new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId5']);
        filterService.exchangeFilters('testCaller', [testConfig], dataset);
        var listComplete = filterService['filterCollection'].getFilters(source1);
        expect(listComplete.length).toEqual(1);
        expect(listComplete[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.ID.columnName);
        expect(listComplete[0].operator).toEqual('=');
        expect(listComplete[0].values).toEqual(['testId5']);
        testConfig.id = listComplete[0].id;
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('exchangeFilters should also add new relation filters', function () {
        generateRelationFilters();
        var spy = spyOn(filterService, '_notifier');
        filterService.exchangeFilters('testCaller', [relationConfig1], dataset);
        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        var listComplete = filterService['filterCollection'].getFilters(relationSource1);
        expect(listComplete.length).toEqual(1);
        expect(listComplete[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.RELATION_A.columnName);
        expect(listComplete[0].operator).toEqual('=');
        expect(listComplete[0].values).toEqual(['testRelation']);
        relationConfig1.id = listComplete[0].id;
        relationConfig1.relations = listComplete[0].relations;
        listComplete = filterService['filterCollection'].getFilters(relationSource2);
        expect(listComplete.length).toEqual(1);
        expect(listComplete[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.RELATION_B.columnName);
        expect(listComplete[0].operator).toEqual('=');
        expect(listComplete[0].values).toEqual(['testRelation']);
        relationConfig2.id = listComplete[0].id;
        relationConfig2.relations = listComplete[0].relations;
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('exchangeFilters should also delete old relation filters', function () {
        activateRelationFilters();
        var spy = spyOn(filterService, '_notifier');
        var testConfig2 = new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.RELATION_B.columnName, '=', ['testExchangeRelation']);
        filterService.exchangeFilters('testCaller', [testConfig2], dataset);
        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        var listComplete = filterService['filterCollection'].getFilters(relationSource1);
        expect(listComplete.length).toEqual(1);
        expect(listComplete[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.RELATION_A.columnName);
        expect(listComplete[0].operator).toEqual('=');
        expect(listComplete[0].values).toEqual(['testExchangeRelation']);
        listComplete = filterService['filterCollection'].getFilters(relationSource2);
        expect(listComplete.length).toEqual(1);
        expect(listComplete[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.RELATION_B.columnName);
        expect(listComplete[0].operator).toEqual('=');
        expect(listComplete[0].values).toEqual(['testExchangeRelation']);
        testConfig2.id = listComplete[0].id;
        testConfig2.relations = listComplete[0].relations;
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('exchangeFilters with filter-list-to-delete should delete argument filters', function () {
        var spy = spyOn(filterService, '_notifier');
        filterService.exchangeFilters('testCaller', [], dataset, [config1A]);
        expect(filterService['filterCollection'].getFilters(source1)).toEqual([]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('exchangeFilters with filter-list-to-delete should also delete relation filters', function () {
        activateRelationFilters();
        var spy = spyOn(filterService, '_notifier');
        filterService.exchangeFilters('testCaller', [], dataset, [relationConfig1]);
        expect(filterService['filterCollection'].getFilters(relationSource1)).toEqual([]);
        expect(filterService['filterCollection'].getFilters(relationSource2)).toEqual([]);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('exchangeFilters should not publish any event if no filters are affected', function () {
        var spy = spyOn(filterService, '_notifier');
        filterService.exchangeFilters('testCaller', [], dataset);
        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        expect(spy.calls.count()).toEqual(0);
    });
    it('getFilters should return expected array', function () {
        expect(filterService.getFilters()).toEqual([filter1A, filter1B, filter2A]);
        expect(filterService.getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService.getFilters(source2)).toEqual([filter2A]);
        expect(filterService.getFilters([{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.ID.columnName,
                operator: '!='
            }])).toEqual([]);
    });
    it('getFiltersToSearch should return expected array', function () {
        expect(filterService.getFiltersToSearch('fakeDatastore1', 'testDatabase1', 'testTable1')).toEqual([]);
        expect(filterService.getFiltersToSearch('datastore1', 'fakeDatabase1', 'testTable1')).toEqual([]);
        expect(filterService.getFiltersToSearch('datastore1', 'testDatabase1', 'fakeTable1')).toEqual([]);
        var filters = filterService.getFiltersToSearch('datastore1', 'testDatabase1', 'testTable1');
        expect(filters.map(function (filter) {
            var config = filter.toDesign();
            config.id = undefined;
            return config;
        })).toEqual([new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [filter1A.toDesign(), filter1B.toDesign()]),
            new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [filter2A.toDesign()])]);
    });
    it('getFiltersToSearch with filter-list-to-ignore should return expected array', function () {
        var filters1 = filterService.getFiltersToSearch('datastore1', 'testDatabase1', 'testTable1', [config1A]);
        expect(filters1.map(function (filter) {
            var config = filter.toDesign();
            config.id = undefined;
            return config;
        })).toEqual([new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [filter2A.toDesign()])]);
        var filters2 = filterService.getFiltersToSearch('datastore1', 'testDatabase1', 'testTable1', [config1B]);
        expect(filters2.map(function (filter) {
            var config = filter.toDesign();
            config.id = undefined;
            return config;
        })).toEqual([new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [filter2A.toDesign()])]);
        var filters3 = filterService.getFiltersToSearch('datastore1', 'testDatabase1', 'testTable1', [config2A]);
        expect(filters3.map(function (filter) {
            var config = filter.toDesign();
            config.id = undefined;
            return config;
        })).toEqual([new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.OR, [filter1A.toDesign(), filter1B.toDesign()])]);
        expect(filterService.getFiltersToSearch('datastore1', 'testDatabase1', 'testTable1', [config1A, config2A])).toEqual([]);
    });
    it('notifyFilterChangeListeners does call each listener callback function', function () {
        var calledA = 0;
        var calledB = 0;
        var expectedCallerId = 'testCaller';
        var listenerA = function (callerId) {
            expect(callerId).toBe(expectedCallerId);
            calledA++;
        };
        var listenerB = function (callerId) {
            expect(callerId).toBe(expectedCallerId);
            calledB++;
        };
        filterService['_listeners'] = new Map();
        filterService['_listeners'].set('testIdA', listenerA);
        filterService['_listeners'].set('testIdB', listenerB);
        filterService.notifyFilterChangeListeners(expectedCallerId);
        expect(calledA).toBe(1);
        expect(calledB).toBe(1);
    });
    it('overrideFilterChangeNotifier does update _notifier', function () {
        var notifier = function (__callerId) {
            // Do nothing.
        };
        filterService.overrideFilterChangeNotifier(notifier);
        expect(filterService['_notifier']).toBe(notifier);
    });
    it('registerFilterChangeListener does update _listeners', function () {
        var listener = function (__callerId) {
            // Do nothing.
        };
        filterService['_listeners'] = new Map();
        filterService.registerFilterChangeListener('testIdA', listener);
        expect(filterService['_listeners'].get('testIdA')).toBe(listener);
        expect(filterService['_listeners'].get('testIdB')).toBe(undefined);
    });
    it('retrieveCompatibleFilterCollection should return expected filter collection', function () {
        // Remove the filter value to make the config compatible with each filter of its data source
        config1A.values = [undefined];
        var testCollection = filterService.retrieveCompatibleFilterCollection([config1A]);
        expect(testCollection.getDataSources()).toEqual([source1]);
        expect(testCollection.getFilters(source1)).toEqual([filter1A, filter1B]);
    });
    it('retrieveCompatibleFilterCollection should copy multiple filters if multiple configs have compatible filters', function () {
        // Remove the filter value to make the config compatible with each filter of its data source
        config1A.values = [undefined];
        var testCollection = filterService.retrieveCompatibleFilterCollection([config1A, config2A]);
        expect(testCollection.getDataSources()).toEqual([source1, source2]);
        expect(testCollection.getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(testCollection.getFilters(source2)).toEqual([filter2A]);
    });
    it('retrieveCompatibleFilterCollection should not copy the same filters if configs have the same data source', function () {
        // Remove the filter value to make the config compatible with each filter of its data source
        config1A.values = [undefined];
        var testConfig = new filters_1.CompoundFilterDesign(config_option_1.CompoundFilterType.AND, [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
                mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.ID.columnName, '=', [undefined])
        ]);
        var testCollection = filterService.retrieveCompatibleFilterCollection([config1A, testConfig]);
        expect(testCollection.getDataSources()).toEqual([source1]);
        expect(testCollection.getFilters(source1)).toEqual([filter1A, filter1B]);
    });
    it('retrieveCompatibleFilterCollection should do nothing with no compatible filters', function () {
        var testConfig = new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TEXT.columnName, '=', [undefined]);
        var testSource = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.TEXT.columnName,
                operator: '='
            }];
        var testCollection = filterService.retrieveCompatibleFilterCollection([testConfig]);
        expect(testCollection.getDataSources()).toEqual([testSource]);
        expect(testCollection.getFilters(testSource)).toEqual([]);
    });
    it('setFilters should change filterCollection', function () {
        var actual;
        filterService.setFilters([]);
        expect(filterService['filterCollection'].getDataSources()).toEqual([]);
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
                mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId1'])
        ]);
        expect(filterService['filterCollection'].getDataSources()).toEqual([source1]);
        actual = filterService['filterCollection'].getFilters(source1);
        expect(actual.length).toEqual(1);
        expect(actual[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
            mock_dataset_1.FIELD_MAP.ID.columnName);
        expect(actual[0].operator).toEqual('=');
        expect(actual[0].values).toEqual(['testId1']);
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
                mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId1']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
                mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId2']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
                mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId3']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
                mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId4'])
        ]);
        expect(filterService['filterCollection'].getDataSources()).toEqual([source1]);
        actual = filterService['filterCollection'].getFilters(source1);
        expect(actual.length).toEqual(4);
        expect(actual[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
            mock_dataset_1.FIELD_MAP.ID.columnName);
        expect(actual[0].operator).toEqual('=');
        expect(actual[0].values).toEqual(['testId1']);
        expect(actual[1].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
            mock_dataset_1.FIELD_MAP.ID.columnName);
        expect(actual[1].operator).toEqual('=');
        expect(actual[1].values).toEqual(['testId2']);
        expect(actual[2].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
            mock_dataset_1.FIELD_MAP.ID.columnName);
        expect(actual[2].operator).toEqual('=');
        expect(actual[2].values).toEqual(['testId3']);
        expect(actual[3].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
            mock_dataset_1.FIELD_MAP.ID.columnName);
        expect(actual[3].operator).toEqual('=');
        expect(actual[3].values).toEqual(['testId4']);
        filterService.setFilters([
            new filters_1.CompoundFilter(config_option_1.CompoundFilterType.AND, [
                new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name +
                    '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName, '>', [10]),
                new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name +
                    '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName, '<', [20])
            ])
        ]);
        expect(filterService['filterCollection'].getDataSources()).toEqual([source2]);
        actual = filterService['filterCollection'].getFilters(source2);
        expect(actual.length).toEqual(1);
        expect(actual[0].type).toEqual(config_option_1.CompoundFilterType.AND);
        expect(actual[0].filters.length).toEqual(2);
        expect(actual[0].filters[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName);
        expect(actual[0].filters[0].operator).toEqual('>');
        expect(actual[0].filters[0].values).toEqual([10]);
        expect(actual[0].filters[1].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName);
        expect(actual[0].filters[1].operator).toEqual('<');
        expect(actual[0].filters[1].values).toEqual([20]);
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
                mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId1']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
                mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId2']),
            new filters_1.CompoundFilter(config_option_1.CompoundFilterType.AND, [
                new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name +
                    '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName, '>', [10]),
                new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name +
                    '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName, '<', [20])
            ])
        ]);
        expect(filterService['filterCollection'].getDataSources()).toEqual([source1, source2]);
        actual = filterService['filterCollection'].getFilters(source1);
        expect(actual.length).toEqual(2);
        expect(actual[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
            mock_dataset_1.FIELD_MAP.ID.columnName);
        expect(actual[0].operator).toEqual('=');
        expect(actual[0].values).toEqual(['testId1']);
        expect(actual[1].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' + mock_dataset_1.TABLES.testTable1.name + '.' +
            mock_dataset_1.FIELD_MAP.ID.columnName);
        expect(actual[1].operator).toEqual('=');
        expect(actual[1].values).toEqual(['testId2']);
        actual = filterService['filterCollection'].getFilters(source2);
        expect(actual.length).toEqual(1);
        expect(actual[0].type).toEqual(config_option_1.CompoundFilterType.AND);
        expect(actual[0].filters.length).toEqual(2);
        expect(actual[0].filters[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName);
        expect(actual[0].filters[0].operator).toEqual('>');
        expect(actual[0].filters[0].values).toEqual([10]);
        expect(actual[0].filters[1].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.SIZE.columnName);
        expect(actual[0].filters[1].operator).toEqual('<');
        expect(actual[0].filters[1].values).toEqual([20]);
    });
    it('createFilters should add new filters to an existing data source and call the _notifier', function () {
        var spy = spyOn(filterService, '_notifier');
        var testConfig = new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.ID.columnName, '=', ['testId5']);
        filterService.createFilters('testCaller', [testConfig], dataset);
        var listComplete = filterService['filterCollection'].getFilters(source1);
        expect(listComplete.length).toEqual(3);
        expect(listComplete[0]).toEqual(filter1A);
        expect(listComplete[1]).toEqual(filter1B);
        expect(listComplete[2].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.ID.columnName);
        expect(listComplete[2].operator).toEqual('=');
        expect(listComplete[2].values).toEqual(['testId5']);
        testConfig.id = listComplete[2].id;
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('createFilters should add new filters to a new data source and call the _notifier', function () {
        var spy = spyOn(filterService, '_notifier');
        var testConfig = new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TEXT.columnName, '=', ['testText']);
        var testSource = [{
                datastore: mock_dataset_1.DATASTORE.name,
                database: mock_dataset_1.DATABASES.testDatabase1.name,
                table: mock_dataset_1.TABLES.testTable1.name,
                field: mock_dataset_1.FIELD_MAP.TEXT.columnName,
                operator: '='
            }];
        filterService.createFilters('testCaller', [testConfig], dataset);
        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        var listComplete = filterService['filterCollection'].getFilters(testSource);
        expect(listComplete.length).toEqual(1);
        expect(listComplete[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.TEXT.columnName);
        expect(listComplete[0].operator).toEqual('=');
        expect(listComplete[0].values).toEqual(['testText']);
        testConfig.id = listComplete[0].id;
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('createFilters should also add new relation filters', function () {
        generateRelationFilters();
        var spy = spyOn(filterService, '_notifier');
        filterService.createFilters('testCaller', [relationConfig1], dataset);
        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        var listComplete = filterService['filterCollection'].getFilters(relationSource1);
        expect(listComplete.length).toEqual(1);
        expect(listComplete[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.RELATION_A.columnName);
        expect(listComplete[0].operator).toEqual('=');
        expect(listComplete[0].values).toEqual(['testRelation']);
        relationConfig1.id = listComplete[0].id;
        relationConfig1.relations = listComplete[0].relations;
        listComplete = filterService['filterCollection'].getFilters(relationSource2);
        expect(listComplete.length).toEqual(1);
        expect(listComplete[0].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.RELATION_B.columnName);
        expect(listComplete[0].operator).toEqual('=');
        expect(listComplete[0].values).toEqual(['testRelation']);
        relationConfig2.id = listComplete[0].id;
        relationConfig2.relations = listComplete[0].relations;
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('createFilters should keep old relation filters and add new relation filters', function () {
        activateRelationFilters();
        var spy = spyOn(filterService, '_notifier');
        var testConfig2 = new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.RELATION_B.columnName, '=', ['testToggleRelation']);
        filterService.createFilters('testCaller', [testConfig2], dataset);
        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        var listComplete = filterService['filterCollection'].getFilters(relationSource1);
        expect(listComplete.length).toEqual(2);
        expect(listComplete[0]).toEqual(relationFilter1);
        expect(listComplete[1].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.RELATION_A.columnName);
        expect(listComplete[1].operator).toEqual('=');
        expect(listComplete[1].values).toEqual(['testToggleRelation']);
        listComplete = filterService['filterCollection'].getFilters(relationSource2);
        expect(listComplete.length).toEqual(2);
        expect(listComplete[0]).toEqual(relationFilter2);
        expect(listComplete[1].fieldKey).toEqual(mock_dataset_1.DATASTORE.name + '.' + mock_dataset_1.DATABASES.testDatabase1.name + '.' +
            mock_dataset_1.TABLES.testTable1.name + '.' + mock_dataset_1.FIELD_MAP.RELATION_B.columnName);
        expect(listComplete[1].operator).toEqual('=');
        expect(listComplete[1].values).toEqual(['testToggleRelation']);
        testConfig2.id = listComplete[1].id;
        testConfig2.relations = listComplete[1].relations;
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['testCaller']);
    });
    it('createFilters should not publish any event if no filters are affected', function () {
        var spy = spyOn(filterService, '_notifier');
        filterService.createFilters('testCaller', [], dataset);
        expect(filterService['filterCollection'].getFilters(source1)).toEqual([filter1A, filter1B]);
        expect(filterService['filterCollection'].getFilters(source2)).toEqual([filter2A]);
        expect(spy.calls.count()).toEqual(0);
    });
    it('unregisterFilterChangeListener does update _listeners', function () {
        var listener = function (__callerId) {
            // Do nothing.
        };
        filterService['_listeners'] = new Map();
        filterService['_listeners'].set('testIdA', listener);
        filterService['_listeners'].set('testIdB', listener);
        filterService.unregisterFilterChangeListener('testIdA');
        expect(filterService['_listeners'].get('testIdA')).toBe(undefined);
        expect(filterService['_listeners'].get('testIdB')).toBe(listener);
    });
});
//# sourceMappingURL=filter.service.spec.js.map