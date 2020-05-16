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

import { Dataset } from '../../core/models/dataset';
import { FilterService } from '../../core/services/filter.service';
import { NucleusTextCloud } from './text-cloud.web-component';

import { DATASET } from '../../core/models/mock.dataset';
import { SearchServiceMock } from '../../core/services/mock.search.service';

describe('Text Cloud Web Component', () => {
    let dataset: Dataset;
    let filterService: FilterService;
    let searchService: SearchServiceMock;
    let textCloudComponent: NucleusTextCloud;

    beforeEach(() => {
        textCloudComponent = new NucleusTextCloud();
        textCloudComponent.setAttribute('id', 'testTextCloud');
        textCloudComponent.setAttribute('text-field-key', 'datastore1.testDatabase1.testTable1.testTextField');
        dataset = DATASET;
        filterService = new FilterService();
        searchService = new SearchServiceMock();
    });

    it('init does create expected elements with default attributes', () => {
        textCloudComponent.init(dataset, filterService, searchService);

        let textCloudElement = textCloudComponent.shadowRoot.querySelector('nucleus-visualization-text-cloud');
        expect(textCloudElement.getAttribute('aggregation-field')).toEqual('aggregations._aggregation');
        expect(textCloudElement.getAttribute('aggregation-title')).toEqual(null);
        expect(textCloudElement.getAttribute('enable-show-values')).toEqual(null);
        expect(textCloudElement.getAttribute('text-field')).toEqual('fields.testTextField');

        let searchComponent = textCloudComponent.shadowRoot.querySelector('nucleus-search');
        expect(searchComponent.getAttribute('data-limit')).toEqual(null);
        expect(searchComponent.getAttribute('enable-hide-if-unfiltered')).toEqual(null);
        expect(searchComponent.getAttribute('enable-ignore-self-filter')).toEqual(null);
        expect(searchComponent.getAttribute('search-field-keys')).toEqual('datastore1.testDatabase1.testTable1.testTextField');
        expect(searchComponent.getAttribute('search-limit')).toEqual('10000');
        expect(searchComponent.getAttribute('search-page')).toEqual(null);
        expect(searchComponent.getAttribute('sort-aggregation')).toEqual('_aggregation');
        expect(searchComponent.getAttribute('sort-field-key')).toEqual(null);
        expect(searchComponent.getAttribute('sort-order')).toEqual(null);
        expect(searchComponent.getAttribute('vis-draw-function')).toEqual('drawData');
        expect(searchComponent.getAttribute('vis-element-id')).toEqual('testTextCloud_visualization');

        let aggregationComponent = searchComponent.querySelector('nucleus-aggregation');
        expect(aggregationComponent.getAttribute('aggregation-field-key')).toEqual('datastore1.testDatabase1.testTable1.testTextField');
        expect(aggregationComponent.getAttribute('aggregation-group')).toEqual(null);
        expect(aggregationComponent.getAttribute('aggregation-label')).toEqual('_aggregation');
        expect(aggregationComponent.getAttribute('aggregation-operation')).toEqual(null);

        let groupComponent = searchComponent.querySelector('nucleus-group');
        expect(groupComponent.getAttribute('group-field-key')).toEqual('datastore1.testDatabase1.testTable1.testTextField');
        expect(groupComponent.getAttribute('group-label')).toEqual(null);
        expect(groupComponent.getAttribute('group-operation')).toEqual(null);

        let filterComponent = textCloudComponent.shadowRoot.querySelector('nucleus-filter');
        expect(filterComponent.getAttribute('filter-type')).toEqual('list');
        expect(filterComponent.getAttribute('list-field-key')).toEqual('datastore1.testDatabase1.testTable1.testTextField');
        expect(filterComponent.getAttribute('list-intersection')).toEqual(null);
        expect(filterComponent.getAttribute('list-operator')).toEqual('=');
        expect(filterComponent.getAttribute('search-element-id')).toEqual('testTextCloud_search');
        expect(filterComponent.getAttribute('vis-element-id')).toEqual('testTextCloud_visualization');
        expect(filterComponent.getAttribute('vis-filter-input-function')).toEqual('changeFilteredText');
        expect(filterComponent.getAttribute('vis-filter-output-event')).toEqual('filter');
    });

    it('init does create expected elements with set attributes', () => {
        textCloudComponent.setAttribute('aggregation-field', 'test');
        textCloudComponent.setAttribute('aggregation-field-key', 'datastore1.testDatabase1.testTable1.testSizeField');
        textCloudComponent.setAttribute('aggregation-group', 'test');
        textCloudComponent.setAttribute('aggregation-label', 'test');
        textCloudComponent.setAttribute('aggregation-title', 'Label');
        textCloudComponent.setAttribute('aggregation-operation', 'sum');
        textCloudComponent.setAttribute('data-limit', '50');
        textCloudComponent.setAttribute('enable-hide-if-unfiltered', 'true');
        textCloudComponent.setAttribute('enable-ignore-self-filter', 'true');
        textCloudComponent.setAttribute('enable-show-values', 'true');
        textCloudComponent.setAttribute('filter-type', 'pair');
        textCloudComponent.setAttribute('group-field-key', 'test');
        textCloudComponent.setAttribute('group-label', 'test');
        textCloudComponent.setAttribute('group-operation', 'year');
        textCloudComponent.setAttribute('list-field-key', 'test');
        textCloudComponent.setAttribute('list-intersection', 'true');
        textCloudComponent.setAttribute('list-operator', 'contains');
        textCloudComponent.setAttribute('search-element-id', 'test');
        textCloudComponent.setAttribute('search-field-keys', 'test');
        textCloudComponent.setAttribute('search-limit', '100');
        textCloudComponent.setAttribute('search-page', '2');
        textCloudComponent.setAttribute('sort-aggregation', 'test');
        textCloudComponent.setAttribute('sort-field-key', 'test');
        textCloudComponent.setAttribute('sort-order', 'ascending');
        textCloudComponent.setAttribute('text-field', 'test');
        textCloudComponent.setAttribute('vis-draw-function', 'test');
        textCloudComponent.setAttribute('vis-element-id', 'test');
        textCloudComponent.setAttribute('vis-filter-input-function', 'test');
        textCloudComponent.setAttribute('vis-filter-output-event', 'test');
        textCloudComponent.init(dataset, filterService, searchService);

        let textCloudElement = textCloudComponent.shadowRoot.querySelector('nucleus-visualization-text-cloud');
        expect(textCloudElement.getAttribute('aggregation-field')).toEqual('aggregations._aggregation');
        expect(textCloudElement.getAttribute('aggregation-title')).toEqual('Label');
        expect(textCloudElement.getAttribute('enable-show-values')).toEqual('true');
        expect(textCloudElement.getAttribute('text-field')).toEqual('fields.testTextField');

        let searchComponent = textCloudComponent.shadowRoot.querySelector('nucleus-search');
        expect(searchComponent.getAttribute('data-limit')).toEqual('50');
        expect(searchComponent.getAttribute('enable-hide-if-unfiltered')).toEqual('true');
        expect(searchComponent.getAttribute('enable-ignore-self-filter')).toEqual('true');
        expect(searchComponent.getAttribute('search-field-keys')).toEqual('datastore1.testDatabase1.testTable1.testTextField');
        expect(searchComponent.getAttribute('search-limit')).toEqual('100');
        expect(searchComponent.getAttribute('search-page')).toEqual('2');
        expect(searchComponent.getAttribute('sort-aggregation')).toEqual('_aggregation');
        expect(searchComponent.getAttribute('sort-field-key')).toEqual(null);
        expect(searchComponent.getAttribute('sort-order')).toEqual('ascending');
        expect(searchComponent.getAttribute('vis-draw-function')).toEqual('drawData');
        expect(searchComponent.getAttribute('vis-element-id')).toEqual('testTextCloud_visualization');

        let aggregationComponent = searchComponent.querySelector('nucleus-aggregation');
        expect(aggregationComponent.getAttribute('aggregation-field-key')).toEqual('datastore1.testDatabase1.testTable1.testSizeField');
        expect(aggregationComponent.getAttribute('aggregation-group')).toEqual(null);
        expect(aggregationComponent.getAttribute('aggregation-label')).toEqual('_aggregation');
        expect(aggregationComponent.getAttribute('aggregation-operation')).toEqual('sum');

        let groupComponent = searchComponent.querySelector('nucleus-group');
        expect(groupComponent.getAttribute('group-field-key')).toEqual('datastore1.testDatabase1.testTable1.testTextField');
        expect(groupComponent.getAttribute('group-label')).toEqual(null);
        expect(groupComponent.getAttribute('group-operation')).toEqual(null);

        let filterComponent = textCloudComponent.shadowRoot.querySelector('nucleus-filter');
        expect(filterComponent.getAttribute('filter-type')).toEqual('list');
        expect(filterComponent.getAttribute('list-field-key')).toEqual('datastore1.testDatabase1.testTable1.testTextField');
        expect(filterComponent.getAttribute('list-intersection')).toEqual('true');
        expect(filterComponent.getAttribute('list-operator')).toEqual('contains');
        expect(filterComponent.getAttribute('search-element-id')).toEqual('testTextCloud_search');
        expect(filterComponent.getAttribute('vis-element-id')).toEqual('testTextCloud_visualization');
        expect(filterComponent.getAttribute('vis-filter-input-function')).toEqual('changeFilteredText');
        expect(filterComponent.getAttribute('vis-filter-output-event')).toEqual('filter');
    });

    it('does autogenerate aggregation-title if aggregation-operation is not count', () => {
        textCloudComponent.setAttribute('aggregation-field-key', 'datastore1.testDatabase1.testTable1.testSizeField');
        textCloudComponent.setAttribute('aggregation-operation', 'sum');
        textCloudComponent.init(dataset, filterService, searchService);

        let textCloudElement = textCloudComponent.shadowRoot.querySelector('nucleus-visualization-text-cloud');
        expect(textCloudElement.getAttribute('aggregation-title')).toEqual('Sum of Test Size Field');
    });

    it('setAttribute does recreate elements', () => {
        textCloudComponent.init(dataset, filterService, searchService);

        let textCloudElement = textCloudComponent.shadowRoot.querySelector('nucleus-visualization-text-cloud');
        expect(textCloudElement.getAttribute('enable-show-values')).toEqual(null);

        textCloudComponent.setAttribute('enable-show-values', 'true');

        textCloudElement = textCloudComponent.shadowRoot.querySelector('nucleus-visualization-text-cloud');
        expect(textCloudElement.getAttribute('enable-show-values')).toEqual('true');
    });
});

