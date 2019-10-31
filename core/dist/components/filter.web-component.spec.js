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
var config_option_1 = require("../models/config-option");
var filter_service_1 = require("../services/filter.service");
var filters_1 = require("../models/filters");
var element_web_component_1 = require("./element.web-component");
var filter_web_component_1 = require("./filter.web-component");
var search_web_component_1 = require("./search.web-component");
var mock_dataset_1 = require("../models/mock.dataset");
if (!window.customElements.get('next-century-element-mock')) {
    window.customElements.define('next-century-element-mock', element_web_component_1.NextCenturyElement);
}
describe('Filter Component static createElement should return', function () {
    it('expected HTMLElement', function () {
        var actual1 = filter_web_component_1.NextCenturyFilter.createElement('testId', {
            'filter-type': 'list',
            'search-element-id': 'testSearchElementId'
        });
        expect(actual1).not.toEqual(null);
        expect(actual1.getAttribute('id')).toEqual('testId');
        expect(actual1.getAttribute('filter-type')).toEqual('list');
        expect(actual1.getAttribute('search-element-id')).toEqual('testSearchElementId');
        var actual2 = filter_web_component_1.NextCenturyFilter.createElement('testId', {
            'bounds-field-key-x': 'datastore1.testDatabase1.testTable1.testXField',
            'bounds-field-key-y': 'datastore1.testDatabase1.testTable1.testYField',
            'domain-field-key': 'datastore1.testDatabase1.testTable1.testSizeField',
            'filter-type': 'list',
            'list-field-key': 'datastore1.testDatabase1.testTable1.testTextField',
            'list-intersection': true,
            'list-operator': 'contains',
            'pair-field-key-1': 'datastore1.testDatabase1.testTable1.testNameField',
            'pair-field-key-2': 'datastore1.testDatabase1.testTable1.testTypeField',
            'pair-intersection': true,
            'pair-operator-1': '=',
            'pair-operator-2': '!=',
            'search-element-id': 'testSearchElementId',
            'vis-element-id': 'testVisElementId',
            'vis-filter-input-function': 'changeFilter',
            'vis-filter-output-event': 'filtered'
        });
        expect(actual2).not.toEqual(null);
        expect(actual2.getAttribute('id')).toEqual('testId');
        expect(actual2.getAttribute('bounds-field-key-x')).toEqual('datastore1.testDatabase1.testTable1.testXField');
        expect(actual2.getAttribute('bounds-field-key-y')).toEqual('datastore1.testDatabase1.testTable1.testYField');
        expect(actual2.getAttribute('domain-field-key')).toEqual('datastore1.testDatabase1.testTable1.testSizeField');
        expect(actual1.getAttribute('filter-type')).toEqual('list');
        expect(actual2.getAttribute('list-field-key')).toEqual('datastore1.testDatabase1.testTable1.testTextField');
        expect(actual2.getAttribute('list-intersection')).toEqual('true');
        expect(actual2.getAttribute('list-operator')).toEqual('contains');
        expect(actual2.getAttribute('pair-field-key-1')).toEqual('datastore1.testDatabase1.testTable1.testNameField');
        expect(actual2.getAttribute('pair-field-key-2')).toEqual('datastore1.testDatabase1.testTable1.testTypeField');
        expect(actual2.getAttribute('pair-intersection')).toEqual('true');
        expect(actual2.getAttribute('pair-operator-1')).toEqual('=');
        expect(actual2.getAttribute('pair-operator-2')).toEqual('!=');
        expect(actual1.getAttribute('search-element-id')).toEqual('testSearchElementId');
        expect(actual2.getAttribute('vis-element-id')).toEqual('testVisElementId');
        expect(actual2.getAttribute('vis-filter-input-function')).toEqual('changeFilter');
        expect(actual2.getAttribute('vis-filter-output-event')).toEqual('filtered');
    });
    it('null if the required attributes are not defined', function () {
        expect(filter_web_component_1.NextCenturyFilter.createElement('testId', {})).toEqual(null);
        expect(filter_web_component_1.NextCenturyFilter.createElement('', {
            'filter-type': 'list'
        })).toEqual(null);
        expect(filter_web_component_1.NextCenturyFilter.createElement('', {
            'search-element-id': 'testSearchElementId'
        })).toEqual(null);
    });
});
describe('Filter Component', function () {
    var dataset;
    var filterComponent;
    var filterService;
    var parentElement;
    var searchComponent;
    var spyOnUpdateFilterDesigns;
    beforeEach(function () {
        filterComponent = new filter_web_component_1.NextCenturyFilter();
        filterComponent.setAttribute('id', 'testFilterElementId');
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '=');
        filterComponent.setAttribute('search-element-id', 'testSearchElementId');
        searchComponent = new search_web_component_1.NextCenturySearch();
        searchComponent.setAttribute('id', 'testSearchElementId');
        parentElement = new element_web_component_1.NextCenturyElement();
        parentElement.setAttribute('id', 'testParentElementId');
        parentElement.appendChild(filterComponent);
        parentElement.appendChild(searchComponent);
        dataset = mock_dataset_1.DATASET;
        filterService = new filter_service_1.FilterService();
        spyOnUpdateFilterDesigns = spyOn(searchComponent, 'updateFilterDesigns');
    });
    it('init should do nothing without id, filter-type, search-element-id, dataset, or filterService', function () {
        filterComponent.addEventListener('searchFinished', function (__event) {
            fail();
        });
        filterComponent.init(dataset, null);
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(0);
        filterComponent.init(null, filterService);
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(0);
        filterComponent.setAttribute('id', '');
        filterComponent.init(dataset, filterService);
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(0);
        filterComponent.setAttribute('search-element-id', '');
        filterComponent.setAttribute('id', 'testFilterElementId'); // Reset ID
        filterComponent.init(dataset, filterService);
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(0);
        filterComponent.setAttribute('filter-type', '');
        filterComponent.setAttribute('search-element-id', 'testSearchElementId'); // Reset search-element-id
        filterComponent.init(dataset, filterService);
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(0);
    });
    it('init should register listener with filterService', function () {
        var spy = spyOn(filterService, 'registerFilterChangeListener');
        filterComponent.init(dataset, filterService);
        expect(spy.calls.count()).toEqual(1);
    });
    it('init should register event listener on visualization element', function () {
        var visElement = new element_web_component_1.NextCenturyElement();
        visElement.setAttribute('id', 'testVisElementId');
        parentElement.appendChild(visElement);
        var spy = spyOn(visElement, 'addEventListener');
        filterComponent.setAttribute('vis-element-id', 'testVisElementId');
        filterComponent.setAttribute('vis-filter-output-event', 'filtered');
        filterComponent.init(dataset, filterService);
        expect(spy.calls.count()).toEqual(1);
    });
    it('init should emit designsChanged', function (done) {
        filterComponent.addEventListener('designsChanged', function (event) {
            expect(event.detail.designs).toEqual([
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
            ]);
            done();
        });
        filterComponent.init(dataset, filterService);
    });
    it('setAttribute should call updateFilterDesigns in searchComponent once initialized', function () {
        filterComponent.init(dataset, filterService);
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        filterComponent.setAttribute('id', 'testFilterElement2');
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(2);
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testNameField');
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(3);
        filterComponent.setAttribute('list-intersection', 'true');
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(4);
        filterComponent.setAttribute('list-operator', '!=');
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(5);
    });
    it('setAttribute should not call updateFilterDesigns in searchComponent if attributes do not work with filter-type', function () {
        filterComponent.init(dataset, filterService);
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        filterComponent.setAttribute('filter-type', 'bounds');
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        filterComponent.setAttribute('bounds-field-key-x', 'datastore1.testDatabase1.testTable1.testXField');
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        filterComponent.setAttribute('bounds-field-key-y', 'datastore1.testDatabase1.testTable1.testYField');
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(2);
    });
    it('setAttribute on ID should register listener with filterService', function () {
        filterComponent.init(dataset, filterService);
        var spy = spyOn(filterService, 'registerFilterChangeListener');
        filterComponent.setAttribute('id', 'testFilterElement2');
        expect(spy.calls.count()).toEqual(1);
    });
    it('setAttribute on search-element-id should remove filter designs from previous searchComponent', function () {
        filterComponent.init(dataset, filterService);
        filterComponent.setAttribute('search-element-id', 'testSearchElement2');
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(2);
        expect(spyOnUpdateFilterDesigns.calls.argsFor(1)).toEqual(['testFilterElementId', []]);
    });
    it('setAttribute on vis-element-id or vis-filter-output-event should register event listener on visualization element', function () {
        var visElement = new element_web_component_1.NextCenturyElement();
        visElement.setAttribute('id', 'testVisElementId');
        parentElement.appendChild(visElement);
        filterComponent.setAttribute('vis-element-id', 'previousVisElementId');
        filterComponent.setAttribute('vis-filter-output-event', 'previousName');
        filterComponent.init(dataset, filterService);
        var spy = spyOn(visElement, 'addEventListener');
        filterComponent.setAttribute('vis-element-id', 'testVisElementId');
        expect(spy.calls.count()).toEqual(1);
        filterComponent.setAttribute('vis-filter-output-event', 'filtered');
        expect(spy.calls.count()).toEqual(2);
    });
    it('visualization element filter event does call updateFilters with filter values', function () {
        var visElement = new element_web_component_1.NextCenturyElement();
        visElement.setAttribute('id', 'testVisElementId');
        parentElement.appendChild(visElement);
        filterComponent.setAttribute('vis-element-id', 'testVisElementId');
        filterComponent.setAttribute('vis-filter-output-event', 'filtered');
        filterComponent.init(dataset, filterService);
        var spy = spyOn(filterComponent, 'updateFilters');
        visElement.dispatchEvent(new CustomEvent('filtered', {
            detail: {
                values: 'type1'
            }
        }));
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['type1']);
        visElement.dispatchEvent(new CustomEvent('filtered', {
            detail: {
                values: ['type1', 'type2']
            }
        }));
        expect(spy.calls.count()).toEqual(2);
        expect(spy.calls.argsFor(1)).toEqual([['type1', 'type2']]);
        visElement.dispatchEvent(new CustomEvent('filtered', {
            detail: {
                values: null
            }
        }));
        expect(spy.calls.count()).toEqual(3);
        expect(spy.calls.argsFor(2)).toEqual([null]);
    });
    it('visualization element filter event does not call updateFilters if filter values are not defined', function () {
        var visElement = new element_web_component_1.NextCenturyElement();
        visElement.setAttribute('id', 'testVisElementId');
        parentElement.appendChild(visElement);
        filterComponent.setAttribute('vis-element-id', 'testVisElementId');
        filterComponent.setAttribute('vis-filter-output-event', 'filtered');
        filterComponent.init(dataset, filterService);
        var spy = spyOn(filterComponent, 'updateFilters');
        visElement.dispatchEvent(new CustomEvent('filtered', {
            detail: {}
        }));
        expect(spy.calls.count()).toEqual(0);
    });
});
describe('Filter Component init should call updateFilterDesigns in searchComponent', function () {
    var dataset;
    var filterComponent;
    var filterService;
    var parentElement;
    var searchComponent;
    var spyOnUpdateFilterDesigns;
    beforeEach(function () {
        filterComponent = new filter_web_component_1.NextCenturyFilter();
        filterComponent.setAttribute('id', 'testFilterElementId');
        filterComponent.setAttribute('search-element-id', 'testSearchElementId');
        searchComponent = new search_web_component_1.NextCenturySearch();
        searchComponent.setAttribute('id', 'testSearchElementId');
        parentElement = new element_web_component_1.NextCenturyElement();
        parentElement.setAttribute('id', 'testParentElementId');
        parentElement.appendChild(filterComponent);
        parentElement.appendChild(searchComponent);
        dataset = mock_dataset_1.DATASET;
        filterService = new filter_service_1.FilterService();
        spyOnUpdateFilterDesigns = spyOn(searchComponent, 'updateFilterDesigns');
    });
    it('with bounds filter design', function () {
        filterComponent.setAttribute('filter-type', 'bounds');
        filterComponent.setAttribute('bounds-field-key-x', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.setAttribute('bounds-field-key-y', 'datastore1.testDatabase1.testTable1.testYField');
        filterComponent.init(dataset, filterService);
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        expect(spyOnUpdateFilterDesigns.calls.argsFor(0)).toEqual(['testFilterElementId', [
                new filters_1.BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', undefined, undefined, undefined, undefined)
            ]]);
    });
    it('with domain filter design', function () {
        filterComponent.setAttribute('filter-type', 'domain');
        filterComponent.setAttribute('domain-field-key', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.init(dataset, filterService);
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        expect(spyOnUpdateFilterDesigns.calls.argsFor(0)).toEqual(['testFilterElementId', [
                new filters_1.DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', undefined, undefined)
            ]]);
    });
    it('with OR list filter design', function () {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.init(dataset, filterService);
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        expect(spyOnUpdateFilterDesigns.calls.argsFor(0)).toEqual(['testFilterElementId', [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', [undefined])
            ]]);
    });
    it('with AND list filter design', function () {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.setAttribute('list-intersection', 'true');
        filterComponent.init(dataset, filterService);
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        expect(spyOnUpdateFilterDesigns.calls.argsFor(0)).toEqual(['testFilterElementId', [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', [undefined])
            ]]);
    });
    it('with OR pair filter design', function () {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-operator-1', 'contains');
        filterComponent.setAttribute('pair-operator-2', 'not contains');
        filterComponent.init(dataset, filterService);
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        expect(spyOnUpdateFilterDesigns.calls.argsFor(0)).toEqual(['testFilterElementId', [
                new filters_1.PairFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', undefined, undefined)
            ]]);
    });
    it('with AND pair filter design', function () {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-intersection', 'true');
        filterComponent.setAttribute('pair-operator-1', 'contains');
        filterComponent.setAttribute('pair-operator-2', 'not contains');
        filterComponent.init(dataset, filterService);
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        expect(spyOnUpdateFilterDesigns.calls.argsFor(0)).toEqual(['testFilterElementId', [
                new filters_1.PairFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', undefined, undefined)
            ]]);
    });
});
describe('Filter Component updateFilters should', function () {
    var dataset;
    var filterComponent;
    var filterService;
    var spyOnChangeFilters;
    var spyOnDeleteFilters;
    beforeEach(function () {
        filterComponent = new filter_web_component_1.NextCenturyFilter();
        filterComponent.setAttribute('id', 'testFilterElementId');
        filterComponent.setAttribute('search-element-id', 'testSearchElementId');
        filterComponent.setAttribute('vis-element-id', 'testVisElementId');
        filterComponent.setAttribute('vis-filter-output-event', 'filtered');
        dataset = mock_dataset_1.DATASET;
        filterService = new filter_service_1.FilterService();
        spyOnChangeFilters = spyOn(filterService, 'exchangeFilters');
        spyOnDeleteFilters = spyOn(filterService, 'deleteFilters');
    });
    it('call exchangeFilters on filterService with one bounds filter', function () {
        filterComponent.setAttribute('filter-type', 'bounds');
        filterComponent.setAttribute('bounds-field-key-x', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.setAttribute('bounds-field-key-y', 'datastore1.testDatabase1.testTable1.testYField');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters([10, 20, 30, 40]);
        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', 10, 20, 30, 40)
            ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });
    it('call exchangeFilters on filterService with multiple bounds filters', function () {
        filterComponent.setAttribute('filter-type', 'bounds');
        filterComponent.setAttribute('bounds-field-key-x', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.setAttribute('bounds-field-key-y', 'datastore1.testDatabase1.testTable1.testYField');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters([[10, 20, 30, 40], [50, 60, 70, 80]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', 10, 20, 30, 40),
                new filters_1.BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', 50, 60, 70, 80)
            ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });
    it('call exchangeFilters on filterService with one domain filter', function () {
        filterComponent.setAttribute('filter-type', 'domain');
        filterComponent.setAttribute('domain-field-key', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters([10, 20]);
        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', 10, 20)
            ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });
    it('call exchangeFilters on filterService with multiple domain filters', function () {
        filterComponent.setAttribute('filter-type', 'domain');
        filterComponent.setAttribute('domain-field-key', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters([[10, 20], [30, 40]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', 10, 20),
                new filters_1.DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', 30, 40)
            ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });
    it('call exchangeFilters on filterService with one OR list filter containing one value', function () {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters('type1');
        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type1'])
            ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });
    it('call exchangeFilters on filterService with one AND list filter containing one value', function () {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-intersection', 'true');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters('type1');
        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type1'])
            ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });
    it('call exchangeFilters on filterService with one OR list filter containing multiple values', function () {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters(['type1', 'type2']);
        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type1', 'type2'])
            ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });
    it('call exchangeFilters on filterService with one AND list filter containing multiple values', function () {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-intersection', 'true');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters(['type1', 'type2']);
        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type1', 'type2'])
            ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });
    it('call exchangeFilters on filterService with multiple list filters', function () {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters(['type1', ['type2', 'type3']]);
        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type1']),
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type2', 'type3'])
            ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });
    it('call exchangeFilters on filterService with one OR pair filter', function () {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-operator-1', 'contains');
        filterComponent.setAttribute('pair-operator-2', 'not contains');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters(['name1', 'type1']);
        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.PairFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', 'name1', 'type1')
            ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });
    it('call exchangeFilters on filterService with one AND pair filter', function () {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-intersection', 'true');
        filterComponent.setAttribute('pair-operator-1', 'contains');
        filterComponent.setAttribute('pair-operator-2', 'not contains');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters(['name1', 'type1']);
        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.PairFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', 'name1', 'type1')
            ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });
    it('call exchangeFilters on filterService with multiple pair filters', function () {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-operator-1', 'contains');
        filterComponent.setAttribute('pair-operator-2', 'not contains');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters([['name1', 'type1'], ['name2', 'type2']]);
        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.PairFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', 'name1', 'type1'),
                new filters_1.PairFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', 'name2', 'type2')
            ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });
    it('call deleteFilters on filterService with one bounds filter', function () {
        filterComponent.setAttribute('filter-type', 'bounds');
        filterComponent.setAttribute('bounds-field-key-x', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.setAttribute('bounds-field-key-y', 'datastore1.testDatabase1.testTable1.testYField');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters(null);
        expect(spyOnDeleteFilters.calls.count()).toEqual(1);
        expect(spyOnDeleteFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', undefined, undefined, undefined, undefined)
            ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);
        filterComponent.updateFilters([]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(2);
        expect(spyOnDeleteFilters.calls.argsFor(1)).toEqual(['testSearchElementId', [
                new filters_1.BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', undefined, undefined, undefined, undefined)
            ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);
    });
    it('call deleteFilters on filterService with one domain filter', function () {
        filterComponent.setAttribute('filter-type', 'domain');
        filterComponent.setAttribute('domain-field-key', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters(null);
        expect(spyOnDeleteFilters.calls.count()).toEqual(1);
        expect(spyOnDeleteFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', undefined, undefined)
            ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);
        filterComponent.updateFilters([]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(2);
        expect(spyOnDeleteFilters.calls.argsFor(1)).toEqual(['testSearchElementId', [
                new filters_1.DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', undefined, undefined)
            ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);
    });
    it('call deleteFilters on filterService with one list filter', function () {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters(null);
        expect(spyOnDeleteFilters.calls.count()).toEqual(1);
        expect(spyOnDeleteFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', [undefined])
            ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);
        filterComponent.updateFilters([]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(2);
        expect(spyOnDeleteFilters.calls.argsFor(1)).toEqual(['testSearchElementId', [
                new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', [undefined])
            ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);
    });
    it('call deleteFilters on filterService with one pair filter', function () {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-operator-1', 'contains');
        filterComponent.setAttribute('pair-operator-2', 'not contains');
        filterComponent.init(dataset, filterService);
        filterComponent.updateFilters(null);
        expect(spyOnDeleteFilters.calls.count()).toEqual(1);
        expect(spyOnDeleteFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
                new filters_1.PairFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', undefined, undefined)
            ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);
        filterComponent.updateFilters([]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(2);
        expect(spyOnDeleteFilters.calls.argsFor(1)).toEqual(['testSearchElementId', [
                new filters_1.PairFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', undefined, undefined)
            ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);
    });
});
describe('Filter Component notification from filterService should call filter function on vis and emit valuesFiltered', function () {
    var dataset;
    var filterComponent;
    var filterService;
    var parentElement;
    var visElement;
    beforeEach(function () {
        filterComponent = new filter_web_component_1.NextCenturyFilter();
        filterComponent.setAttribute('id', 'testFilterElementId');
        filterComponent.setAttribute('search-element-id', 'testSearchElementId');
        filterComponent.setAttribute('vis-element-id', 'testVisElementId');
        filterComponent.setAttribute('vis-filter-input-function', 'changeFilter');
        visElement = new element_web_component_1.NextCenturyElement();
        visElement.setAttribute('id', 'testVisElementId');
        parentElement = new element_web_component_1.NextCenturyElement();
        parentElement.setAttribute('id', 'testParentElementId');
        parentElement.appendChild(filterComponent);
        parentElement.appendChild(visElement);
        dataset = mock_dataset_1.DATASET;
        filterService = new filter_service_1.FilterService();
    });
    it('with one bounds filter', function (done) {
        filterComponent.setAttribute('filter-type', 'bounds');
        filterComponent.setAttribute('bounds-field-key-x', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.setAttribute('bounds-field-key-y', 'datastore1.testDatabase1.testTable1.testYField');
        var called = 0;
        visElement.changeFilter = function (values) {
            called++;
            expect(values).toEqual([[10, 20, 30, 40]]);
        };
        filterComponent.addEventListener('valuesFiltered', function (event) {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([[10, 20, 30, 40]]);
            done();
        });
        filterService.setFilters([
            new filters_1.BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', 10, 20, 30, 40)
        ]);
        filterComponent.init(dataset, filterService);
        filterService.notifyFilterChangeListeners('testSearchElementId');
    });
    it('with multiple bounds filters', function (done) {
        filterComponent.setAttribute('filter-type', 'bounds');
        filterComponent.setAttribute('bounds-field-key-x', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.setAttribute('bounds-field-key-y', 'datastore1.testDatabase1.testTable1.testYField');
        var called = 0;
        visElement.changeFilter = function (values) {
            called++;
            expect(values).toEqual([[10, 20, 30, 40], [50, 60, 70, 80]]);
        };
        filterComponent.addEventListener('valuesFiltered', function (event) {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([[10, 20, 30, 40], [50, 60, 70, 80]]);
            done();
        });
        filterService.setFilters([
            new filters_1.BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', 10, 20, 30, 40),
            new filters_1.BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', 50, 60, 70, 80)
        ]);
        filterComponent.init(dataset, filterService);
        filterService.notifyFilterChangeListeners('testSearchElementId');
    });
    it('with one domain filter', function (done) {
        filterComponent.setAttribute('filter-type', 'domain');
        filterComponent.setAttribute('domain-field-key', 'datastore1.testDatabase1.testTable1.testXField');
        var called = 0;
        visElement.changeFilter = function (values) {
            called++;
            expect(values).toEqual([[10, 20]]);
        };
        filterComponent.addEventListener('valuesFiltered', function (event) {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([[10, 20]]);
            done();
        });
        filterService.setFilters([
            new filters_1.DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20)
        ]);
        filterComponent.init(dataset, filterService);
        filterService.notifyFilterChangeListeners('testSearchElementId');
    });
    it('with multiple domain filters', function (done) {
        filterComponent.setAttribute('filter-type', 'domain');
        filterComponent.setAttribute('domain-field-key', 'datastore1.testDatabase1.testTable1.testXField');
        var called = 0;
        visElement.changeFilter = function (values) {
            called++;
            expect(values).toEqual([[10, 20], [30, 40]]);
        };
        filterComponent.addEventListener('valuesFiltered', function (event) {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([[10, 20], [30, 40]]);
            done();
        });
        filterService.setFilters([
            new filters_1.DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20),
            new filters_1.DomainFilter('datastore1.testDatabase1.testTable1.testXField', 30, 40)
        ]);
        filterComponent.init(dataset, filterService);
        filterService.notifyFilterChangeListeners('testSearchElementId');
    });
    it('with one list filter', function (done) {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '=');
        var called = 0;
        visElement.changeFilter = function (values) {
            called++;
            expect(values).toEqual([['type1', 'type2']]);
        };
        filterComponent.addEventListener('valuesFiltered', function (event) {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([['type1', 'type2']]);
            done();
        });
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);
        filterComponent.init(dataset, filterService);
        filterService.notifyFilterChangeListeners('testSearchElementId');
    });
    it('with multiple list filters', function (done) {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '=');
        var called = 0;
        visElement.changeFilter = function (values) {
            called++;
            expect(values).toEqual([['type1'], ['type2', 'type3']]);
        };
        filterComponent.addEventListener('valuesFiltered', function (event) {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([['type1'], ['type2', 'type3']]);
            done();
        });
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type2', 'type3'])
        ]);
        filterComponent.init(dataset, filterService);
        filterService.notifyFilterChangeListeners('testSearchElementId');
    });
    it('with one pair filter', function (done) {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-operator-1', '=');
        filterComponent.setAttribute('pair-operator-2', '!=');
        var called = 0;
        visElement.changeFilter = function (values) {
            called++;
            expect(values).toEqual([['name1', 'type1']]);
        };
        filterComponent.addEventListener('valuesFiltered', function (event) {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([['name1', 'type1']]);
            done();
        });
        filterService.setFilters([
            new filters_1.PairFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', '=', '!=', 'name1', 'type1')
        ]);
        filterComponent.init(dataset, filterService);
        filterService.notifyFilterChangeListeners('testSearchElementId');
    });
    it('with multiple pair filters', function (done) {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-operator-1', '=');
        filterComponent.setAttribute('pair-operator-2', '!=');
        var called = 0;
        visElement.changeFilter = function (values) {
            called++;
            expect(values).toEqual([['name1', 'type1'], ['name2', 'type2']]);
        };
        filterComponent.addEventListener('valuesFiltered', function (event) {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([['name1', 'type1'], ['name2', 'type2']]);
            done();
        });
        filterService.setFilters([
            new filters_1.PairFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', '=', '!=', 'name1', 'type1'),
            new filters_1.PairFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', '=', '!=', 'name2', 'type2')
        ]);
        filterComponent.init(dataset, filterService);
        filterService.notifyFilterChangeListeners('testSearchElementId');
    });
    it('with no filters', function (done) {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '=');
        var called = 0;
        visElement.changeFilter = function (values) {
            called++;
            expect(values).toEqual([]);
        };
        filterComponent.addEventListener('valuesFiltered', function (event) {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([]);
            done();
        });
        filterComponent.init(dataset, filterService);
        filterService.notifyFilterChangeListeners('testSearchElementId');
    });
    it('with filters that are not equivalent to internal filter designs', function (done) {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '=');
        var called = 0;
        visElement.changeFilter = function (values) {
            called++;
            expect(values).toEqual([]);
        };
        filterComponent.addEventListener('valuesFiltered', function (event) {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([]);
            done();
        });
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', '=', ['name1']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type2', 'type3'])
        ]);
        filterComponent.init(dataset, filterService);
        filterService.notifyFilterChangeListeners('testSearchElementId');
    });
});
//# sourceMappingURL=filter.web-component.spec.js.map