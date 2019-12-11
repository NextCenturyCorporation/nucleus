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

import { CompoundFilterType } from '../models/config-option';
import { Dataset } from '../models/dataset';
import { FilterService } from '../services/filter.service';
import {
    BoundsFilter,
    BoundsFilterDesign,
    DomainFilter,
    DomainFilterDesign,
    ListFilter,
    ListFilterDesign,
    PairFilter,
    PairFilterDesign
} from '../models/filters';
import { NucleusElement } from './element.web-component';
import { NucleusFilter } from './filter.web-component';
import { NucleusSearch } from './search.web-component';

import { DATASET } from '../models/mock.dataset';

if (!window.customElements.get('nucleus-element-mock')) {
    window.customElements.define('nucleus-element-mock', NucleusElement);
}

describe('Filter Component static createElement should return', () => {
    it('expected HTMLElement', () => {
        const actual1 = NucleusFilter.createElement('testId', {
            'filter-type': 'list',
            'search-element-id': 'testSearchElementId'
        });
        expect(actual1).not.toEqual(null);
        expect(actual1.getAttribute('id')).toEqual('testId');
        expect(actual1.getAttribute('filter-type')).toEqual('list');
        expect(actual1.getAttribute('search-element-id')).toEqual('testSearchElementId');

        const actual2 = NucleusFilter.createElement('testId', {
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

    it('null if the required attributes are not defined', () => {
        expect(NucleusFilter.createElement('testId', {})).toEqual(null);
        expect(NucleusFilter.createElement('', {
            'filter-type': 'list'
        })).toEqual(null);
        expect(NucleusFilter.createElement('', {
            'search-element-id': 'testSearchElementId'
        })).toEqual(null);
    });
});

describe('Filter Component', () => {
    let dataset: Dataset;
    let filterComponent: NucleusFilter;
    let filterService: FilterService;
    let parentElement: NucleusElement;
    let searchComponent: NucleusSearch;
    let spyOnUpdateFilterDesigns;

    beforeEach(() => {
        filterComponent = new NucleusFilter();
        filterComponent.setAttribute('id', 'testFilterElementId');
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '=');
        filterComponent.setAttribute('search-element-id', 'testSearchElementId');

        searchComponent = new NucleusSearch();
        searchComponent.setAttribute('id', 'testSearchElementId');

        parentElement = new NucleusElement();
        parentElement.setAttribute('id', 'testParentElementId');
        parentElement.appendChild(filterComponent);
        parentElement.appendChild(searchComponent);

        dataset = DATASET;
        filterService = new FilterService();
        spyOnUpdateFilterDesigns = spyOn(searchComponent, 'updateFilterDesigns');
    });

    it('init should do nothing without id, filter-type, search-element-id, dataset, or filterService', () => {
        filterComponent.addEventListener('searchFinished', (__event: any) => {
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

    it('init should register listener with filterService', () => {
        let spy = spyOn(filterService, 'registerFilterChangeListener');

        filterComponent.init(dataset, filterService);

        expect(spy.calls.count()).toEqual(1);
    });

    it('init should register event listener on visualization element', () => {
        let visElement = new NucleusElement();
        visElement.setAttribute('id', 'testVisElementId');
        parentElement.appendChild(visElement);

        let spy = spyOn(visElement, 'addEventListener');

        filterComponent.setAttribute('vis-element-id', 'testVisElementId');
        filterComponent.setAttribute('vis-filter-output-event', 'filtered');

        filterComponent.init(dataset, filterService);

        expect(spy.calls.count()).toEqual(1);
    });

    it('init should emit designsChanged', (done) => {
        filterComponent.addEventListener('designsChanged', (event: any) => {
            expect(event.detail.designs).toEqual([
                new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
            ]);
            done();
        });

        filterComponent.init(dataset, filterService);
    });

    it('setAttribute should call updateFilterDesigns in searchComponent once initialized', () => {
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

    it('setAttribute should not call updateFilterDesigns in searchComponent if attributes do not work with filter-type', () => {
        filterComponent.init(dataset, filterService);
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);

        filterComponent.setAttribute('filter-type', 'bounds');
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);

        filterComponent.setAttribute('bounds-field-key-x', 'datastore1.testDatabase1.testTable1.testXField');
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);

        filterComponent.setAttribute('bounds-field-key-y', 'datastore1.testDatabase1.testTable1.testYField');
        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(2);
    });

    it('setAttribute on ID should register listener with filterService', () => {
        filterComponent.init(dataset, filterService);

        let spy = spyOn(filterService, 'registerFilterChangeListener');

        filterComponent.setAttribute('id', 'testFilterElement2');

        expect(spy.calls.count()).toEqual(1);
    });

    it('setAttribute on search-element-id should remove filter designs from previous searchComponent', () => {
        filterComponent.init(dataset, filterService);

        filterComponent.setAttribute('search-element-id', 'testSearchElement2');

        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(2);
        expect(spyOnUpdateFilterDesigns.calls.argsFor(1)).toEqual(['testFilterElementId', []]);
    });

    it('setAttribute on vis-element-id or vis-filter-output-event should register event listener on visualization element', () => {
        let visElement = new NucleusElement();
        visElement.setAttribute('id', 'testVisElementId');
        parentElement.appendChild(visElement);

        filterComponent.setAttribute('vis-element-id', 'previousVisElementId');
        filterComponent.setAttribute('vis-filter-output-event', 'previousName');
        filterComponent.init(dataset, filterService);

        let spy = spyOn(visElement, 'addEventListener');

        filterComponent.setAttribute('vis-element-id', 'testVisElementId');

        expect(spy.calls.count()).toEqual(1);

        filterComponent.setAttribute('vis-filter-output-event', 'filtered');

        expect(spy.calls.count()).toEqual(2);
    });

    it('visualization element filter event does call updateFilteredValues with filter values', () => {
        let visElement = new NucleusElement();
        visElement.setAttribute('id', 'testVisElementId');
        parentElement.appendChild(visElement);

        filterComponent.setAttribute('vis-element-id', 'testVisElementId');
        filterComponent.setAttribute('vis-filter-output-event', 'filtered');
        filterComponent.init(dataset, filterService);

        let spy = spyOn(filterComponent, 'updateFilteredValues');

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

    it('visualization element filter event does not call updateFilteredValues if filter values are not defined', () => {
        let visElement = new NucleusElement();
        visElement.setAttribute('id', 'testVisElementId');
        parentElement.appendChild(visElement);

        filterComponent.setAttribute('vis-element-id', 'testVisElementId');
        filterComponent.setAttribute('vis-filter-output-event', 'filtered');
        filterComponent.init(dataset, filterService);

        let spy = spyOn(filterComponent, 'updateFilteredValues');

        visElement.dispatchEvent(new CustomEvent('filtered', {
            detail: {}
        }));

        expect(spy.calls.count()).toEqual(0);
    });
});

describe('Filter Component init should call updateFilterDesigns in searchComponent', () => {
    let dataset: Dataset;
    let filterComponent: NucleusFilter;
    let filterService: FilterService;
    let parentElement: NucleusElement;
    let searchComponent: NucleusSearch;
    let spyOnUpdateFilterDesigns;

    beforeEach(() => {
        filterComponent = new NucleusFilter();
        filterComponent.setAttribute('id', 'testFilterElementId');
        filterComponent.setAttribute('search-element-id', 'testSearchElementId');

        searchComponent = new NucleusSearch();
        searchComponent.setAttribute('id', 'testSearchElementId');

        parentElement = new NucleusElement();
        parentElement.setAttribute('id', 'testParentElementId');
        parentElement.appendChild(filterComponent);
        parentElement.appendChild(searchComponent);

        dataset = DATASET;
        filterService = new FilterService();
        spyOnUpdateFilterDesigns = spyOn(searchComponent, 'updateFilterDesigns');
    });

    it('with bounds filter design', () => {
        filterComponent.setAttribute('filter-type', 'bounds');
        filterComponent.setAttribute('bounds-field-key-x', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.setAttribute('bounds-field-key-y', 'datastore1.testDatabase1.testTable1.testYField');
        filterComponent.init(dataset, filterService);

        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        expect(spyOnUpdateFilterDesigns.calls.argsFor(0)).toEqual(['testFilterElementId', [
            new BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                undefined, undefined, undefined, undefined)
        ]]);
    });

    it('with domain filter design', () => {
        filterComponent.setAttribute('filter-type', 'domain');
        filterComponent.setAttribute('domain-field-key', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.init(dataset, filterService);

        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        expect(spyOnUpdateFilterDesigns.calls.argsFor(0)).toEqual(['testFilterElementId', [
            new DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', undefined, undefined)
        ]]);
    });

    it('with OR list filter design', () => {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.init(dataset, filterService);

        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        expect(spyOnUpdateFilterDesigns.calls.argsFor(0)).toEqual(['testFilterElementId', [
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', [undefined])
        ]]);
    });

    it('with AND list filter design', () => {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.setAttribute('list-intersection', 'true');
        filterComponent.init(dataset, filterService);

        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        expect(spyOnUpdateFilterDesigns.calls.argsFor(0)).toEqual(['testFilterElementId', [
            new ListFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', [undefined])
        ]]);
    });

    it('with OR pair filter design', () => {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-operator-1', 'contains');
        filterComponent.setAttribute('pair-operator-2', 'not contains');
        filterComponent.init(dataset, filterService);

        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        expect(spyOnUpdateFilterDesigns.calls.argsFor(0)).toEqual(['testFilterElementId', [
            new PairFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', undefined, undefined)
        ]]);
    });

    it('with AND pair filter design', () => {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-intersection', 'true');
        filterComponent.setAttribute('pair-operator-1', 'contains');
        filterComponent.setAttribute('pair-operator-2', 'not contains');
        filterComponent.init(dataset, filterService);

        expect(spyOnUpdateFilterDesigns.calls.count()).toEqual(1);
        expect(spyOnUpdateFilterDesigns.calls.argsFor(0)).toEqual(['testFilterElementId', [
            new PairFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', undefined, undefined)
        ]]);
    });
});

describe('Filter Component updateFilteredValues should', () => {
    let dataset: Dataset;
    let filterComponent: NucleusFilter;
    let filterService: FilterService;
    let spyOnChangeFilters;
    let spyOnDeleteFilters;

    beforeEach(() => {
        filterComponent = new NucleusFilter();
        filterComponent.setAttribute('id', 'testFilterElementId');
        filterComponent.setAttribute('search-element-id', 'testSearchElementId');
        filterComponent.setAttribute('vis-element-id', 'testVisElementId');
        filterComponent.setAttribute('vis-filter-output-event', 'filtered');

        dataset = DATASET;
        filterService = new FilterService();
        spyOnChangeFilters = spyOn(filterService, 'exchangeFilters');
        spyOnDeleteFilters = spyOn(filterService, 'deleteFilters');
    });

    it('call exchangeFilters on filterService with one bounds filter', () => {
        filterComponent.setAttribute('filter-type', 'bounds');
        filterComponent.setAttribute('bounds-field-key-x', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.setAttribute('bounds-field-key-y', 'datastore1.testDatabase1.testTable1.testYField');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues([10, 20, 30, 40]);

        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                10, 20, 30, 40)
        ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });

    it('call exchangeFilters on filterService with multiple bounds filters', () => {
        filterComponent.setAttribute('filter-type', 'bounds');
        filterComponent.setAttribute('bounds-field-key-x', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.setAttribute('bounds-field-key-y', 'datastore1.testDatabase1.testTable1.testYField');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues([[10, 20, 30, 40], [50, 60, 70, 80]]);

        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                10, 20, 30, 40),
            new BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                50, 60, 70, 80)
        ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });

    it('call exchangeFilters on filterService with one domain filter', () => {
        filterComponent.setAttribute('filter-type', 'domain');
        filterComponent.setAttribute('domain-field-key', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues([10, 20]);

        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', 10, 20)
        ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });

    it('call exchangeFilters on filterService with multiple domain filters', () => {
        filterComponent.setAttribute('filter-type', 'domain');
        filterComponent.setAttribute('domain-field-key', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues([[10, 20], [30, 40]]);

        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', 10, 20),
            new DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', 30, 40)
        ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });

    it('call exchangeFilters on filterService with one OR list filter containing one value', () => {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues('type1');

        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type1'])
        ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });

    it('call exchangeFilters on filterService with one AND list filter containing one value', () => {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-intersection', 'true');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues('type1');

        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new ListFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type1'])
        ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });

    it('call exchangeFilters on filterService with one OR list filter containing multiple values', () => {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues(['type1', 'type2']);

        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type1', 'type2'])
        ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });

    it('call exchangeFilters on filterService with one AND list filter containing multiple values', () => {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-intersection', 'true');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues(['type1', 'type2']);

        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new ListFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type1', 'type2'])
        ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });

    it('call exchangeFilters on filterService with multiple list filters', () => {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues(['type1', ['type2', 'type3']]);

        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type1']),
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type2', 'type3'])
        ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });

    it('call exchangeFilters on filterService with one OR pair filter', () => {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-operator-1', 'contains');
        filterComponent.setAttribute('pair-operator-2', 'not contains');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues(['name1', 'type1']);

        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new PairFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', 'name1', 'type1')
        ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });

    it('call exchangeFilters on filterService with one AND pair filter', () => {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-intersection', 'true');
        filterComponent.setAttribute('pair-operator-1', 'contains');
        filterComponent.setAttribute('pair-operator-2', 'not contains');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues(['name1', 'type1']);

        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new PairFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', 'name1', 'type1')
        ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });

    it('call exchangeFilters on filterService with multiple pair filters', () => {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-operator-1', 'contains');
        filterComponent.setAttribute('pair-operator-2', 'not contains');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues([['name1', 'type1'], ['name2', 'type2']]);

        expect(spyOnChangeFilters.calls.count()).toEqual(1);
        expect(spyOnChangeFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new PairFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', 'name1', 'type1'),
            new PairFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', 'name2', 'type2')
        ], dataset]);
        expect(spyOnDeleteFilters.calls.count()).toEqual(0);
    });

    it('call deleteFilters on filterService with one bounds filter', () => {
        filterComponent.setAttribute('filter-type', 'bounds');
        filterComponent.setAttribute('bounds-field-key-x', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.setAttribute('bounds-field-key-y', 'datastore1.testDatabase1.testTable1.testYField');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues(null);

        expect(spyOnDeleteFilters.calls.count()).toEqual(1);
        expect(spyOnDeleteFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                undefined, undefined, undefined, undefined)
        ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);

        filterComponent.updateFilteredValues([]);

        expect(spyOnDeleteFilters.calls.count()).toEqual(2);
        expect(spyOnDeleteFilters.calls.argsFor(1)).toEqual(['testSearchElementId', [
            new BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                undefined, undefined, undefined, undefined)
        ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);
    });

    it('call deleteFilters on filterService with one domain filter', () => {
        filterComponent.setAttribute('filter-type', 'domain');
        filterComponent.setAttribute('domain-field-key', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues(null);

        expect(spyOnDeleteFilters.calls.count()).toEqual(1);
        expect(spyOnDeleteFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', undefined, undefined)
        ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);

        filterComponent.updateFilteredValues([]);

        expect(spyOnDeleteFilters.calls.count()).toEqual(2);
        expect(spyOnDeleteFilters.calls.argsFor(1)).toEqual(['testSearchElementId', [
            new DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', undefined, undefined)
        ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);
    });

    it('call deleteFilters on filterService with one list filter', () => {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '!=');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues(null);

        expect(spyOnDeleteFilters.calls.count()).toEqual(1);
        expect(spyOnDeleteFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', [undefined])
        ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);

        filterComponent.updateFilteredValues([]);

        expect(spyOnDeleteFilters.calls.count()).toEqual(2);
        expect(spyOnDeleteFilters.calls.argsFor(1)).toEqual(['testSearchElementId', [
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', [undefined])
        ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);
    });

    it('call deleteFilters on filterService with one pair filter', () => {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-operator-1', 'contains');
        filterComponent.setAttribute('pair-operator-2', 'not contains');
        filterComponent.init(dataset, filterService);

        filterComponent.updateFilteredValues(null);

        expect(spyOnDeleteFilters.calls.count()).toEqual(1);
        expect(spyOnDeleteFilters.calls.argsFor(0)).toEqual(['testSearchElementId', [
            new PairFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', undefined, undefined)
        ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);

        filterComponent.updateFilteredValues([]);

        expect(spyOnDeleteFilters.calls.count()).toEqual(2);
        expect(spyOnDeleteFilters.calls.argsFor(1)).toEqual(['testSearchElementId', [
            new PairFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', 'contains', 'not contains', undefined, undefined)
        ]]);
        expect(spyOnChangeFilters.calls.count()).toEqual(0);
    });
});

describe('Filter Component notification from filterService should call filter function on vis and emit valuesFiltered', () => {
    let dataset: Dataset;
    let filterComponent: NucleusFilter;
    let filterService: FilterService;
    let parentElement: NucleusElement;
    let visElement: NucleusElement;

    beforeEach(() => {
        filterComponent = new NucleusFilter();
        filterComponent.setAttribute('id', 'testFilterElementId');
        filterComponent.setAttribute('search-element-id', 'testSearchElementId');
        filterComponent.setAttribute('vis-element-id', 'testVisElementId');
        filterComponent.setAttribute('vis-filter-input-function', 'changeFilter');

        visElement = new NucleusElement();
        visElement.setAttribute('id', 'testVisElementId');

        parentElement = new NucleusElement();
        parentElement.setAttribute('id', 'testParentElementId');
        parentElement.appendChild(filterComponent);
        parentElement.appendChild(visElement);

        dataset = DATASET;
        filterService = new FilterService();
    });

    it('with one bounds filter', (done) => {
        filterComponent.setAttribute('filter-type', 'bounds');
        filterComponent.setAttribute('bounds-field-key-x', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.setAttribute('bounds-field-key-y', 'datastore1.testDatabase1.testTable1.testYField');

        let called = 0;
        (visElement as any).changeFilter = (values: any[]) => {
            called++;
            expect(values).toEqual([[10, 20, 30, 40]]);
        };

        filterComponent.addEventListener('valuesFiltered', (event: any) => {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([[10, 20, 30, 40]]);
            done();
        });

        filterService.setFilters([
            new BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                10, 20, 30, 40)
        ]);

        filterComponent.init(dataset, filterService);

        filterService.notifyFilterChangeListeners('testSearchElementId');
    });

    it('with multiple bounds filters', (done) => {
        filterComponent.setAttribute('filter-type', 'bounds');
        filterComponent.setAttribute('bounds-field-key-x', 'datastore1.testDatabase1.testTable1.testXField');
        filterComponent.setAttribute('bounds-field-key-y', 'datastore1.testDatabase1.testTable1.testYField');

        let called = 0;
        (visElement as any).changeFilter = (values: any[]) => {
            called++;
            expect(values).toEqual([[10, 20, 30, 40], [50, 60, 70, 80]]);
        };

        filterComponent.addEventListener('valuesFiltered', (event: any) => {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([[10, 20, 30, 40], [50, 60, 70, 80]]);
            done();
        });

        filterService.setFilters([
            new BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                10, 20, 30, 40),
            new BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                50, 60, 70, 80)
        ]);

        filterComponent.init(dataset, filterService);

        filterService.notifyFilterChangeListeners('testSearchElementId');
    });

    it('with one domain filter', (done) => {
        filterComponent.setAttribute('filter-type', 'domain');
        filterComponent.setAttribute('domain-field-key', 'datastore1.testDatabase1.testTable1.testXField');

        let called = 0;
        (visElement as any).changeFilter = (values: any[]) => {
            called++;
            expect(values).toEqual([[10, 20]]);
        };

        filterComponent.addEventListener('valuesFiltered', (event: any) => {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([[10, 20]]);
            done();
        });

        filterService.setFilters([
            new DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20)
        ]);

        filterComponent.init(dataset, filterService);

        filterService.notifyFilterChangeListeners('testSearchElementId');
    });

    it('with multiple domain filters', (done) => {
        filterComponent.setAttribute('filter-type', 'domain');
        filterComponent.setAttribute('domain-field-key', 'datastore1.testDatabase1.testTable1.testXField');

        let called = 0;
        (visElement as any).changeFilter = (values: any[]) => {
            called++;
            expect(values).toEqual([[10, 20], [30, 40]]);
        };

        filterComponent.addEventListener('valuesFiltered', (event: any) => {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([[10, 20], [30, 40]]);
            done();
        });

        filterService.setFilters([
            new DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20),
            new DomainFilter('datastore1.testDatabase1.testTable1.testXField', 30, 40)
        ]);

        filterComponent.init(dataset, filterService);

        filterService.notifyFilterChangeListeners('testSearchElementId');
    });

    it('with one list filter', (done) => {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '=');

        let called = 0;
        (visElement as any).changeFilter = (values: any[]) => {
            called++;
            expect(values).toEqual([['type1', 'type2']]);
        };

        filterComponent.addEventListener('valuesFiltered', (event: any) => {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([['type1', 'type2']]);
            done();
        });

        filterService.setFilters([
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);

        filterComponent.init(dataset, filterService);

        filterService.notifyFilterChangeListeners('testSearchElementId');
    });

    it('with multiple list filters', (done) => {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '=');

        let called = 0;
        (visElement as any).changeFilter = (values: any[]) => {
            called++;
            expect(values).toEqual([['type1'], ['type2', 'type3']]);
        };

        filterComponent.addEventListener('valuesFiltered', (event: any) => {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([['type1'], ['type2', 'type3']]);
            done();
        });

        filterService.setFilters([
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1']),
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type2', 'type3'])
        ]);

        filterComponent.init(dataset, filterService);

        filterService.notifyFilterChangeListeners('testSearchElementId');
    });

    it('with one pair filter', (done) => {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-operator-1', '=');
        filterComponent.setAttribute('pair-operator-2', '!=');

        let called = 0;
        (visElement as any).changeFilter = (values: any[]) => {
            called++;
            expect(values).toEqual([['name1', 'type1']]);
        };

        filterComponent.addEventListener('valuesFiltered', (event: any) => {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([['name1', 'type1']]);
            done();
        });

        filterService.setFilters([
            new PairFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', '=', '!=', 'name1', 'type1')
        ]);

        filterComponent.init(dataset, filterService);

        filterService.notifyFilterChangeListeners('testSearchElementId');
    });

    it('with multiple pair filters', (done) => {
        filterComponent.setAttribute('filter-type', 'pair');
        filterComponent.setAttribute('pair-field-key-1', 'datastore1.testDatabase1.testTable1.testNameField');
        filterComponent.setAttribute('pair-field-key-2', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('pair-operator-1', '=');
        filterComponent.setAttribute('pair-operator-2', '!=');

        let called = 0;
        (visElement as any).changeFilter = (values: any[]) => {
            called++;
            expect(values).toEqual([['name1', 'type1'], ['name2', 'type2']]);
        };

        filterComponent.addEventListener('valuesFiltered', (event: any) => {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([['name1', 'type1'], ['name2', 'type2']]);
            done();
        });

        filterService.setFilters([
            new PairFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', '=', '!=', 'name1', 'type1'),
            new PairFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', '=', '!=', 'name2', 'type2')
        ]);

        filterComponent.init(dataset, filterService);

        filterService.notifyFilterChangeListeners('testSearchElementId');
    });

    it('with no filters', (done) => {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '=');

        let called = 0;
        (visElement as any).changeFilter = (values: any[]) => {
            called++;
            expect(values).toEqual([]);
        };

        filterComponent.addEventListener('valuesFiltered', (event: any) => {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([]);
            done();
        });

        filterComponent.init(dataset, filterService);

        filterService.notifyFilterChangeListeners('testSearchElementId');
    });

    it('with filters that are not equivalent to internal filter designs', (done) => {
        filterComponent.setAttribute('filter-type', 'list');
        filterComponent.setAttribute('list-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        filterComponent.setAttribute('list-operator', '=');

        let called = 0;
        (visElement as any).changeFilter = (values: any[]) => {
            called++;
            expect(values).toEqual([]);
        };

        filterComponent.addEventListener('valuesFiltered', (event: any) => {
            expect(called).toEqual(1);
            expect(event.detail.values).toEqual([]);
            done();
        });

        filterService.setFilters([
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', '=', ['name1']),
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type2', 'type3'])
        ]);

        filterComponent.init(dataset, filterService);

        filterService.notifyFilterChangeListeners('testSearchElementId');
    });
});
