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

import { AbstractSearchService } from '@caci-critical-insight-solutions/nucleus-core';
import { CoreUtil } from '@caci-critical-insight-solutions/nucleus-core';
import { Dataset, DatasetFieldKey, DatasetUtil, FieldKey } from '@caci-critical-insight-solutions/nucleus-core';
import { FilterService } from '@caci-critical-insight-solutions/nucleus-core';
import { NucleusAggregation } from '@caci-critical-insight-solutions/nucleus-core';
import { NucleusElement } from '@caci-critical-insight-solutions/nucleus-core';
import { NucleusFilter } from '@caci-critical-insight-solutions/nucleus-core';
import { NucleusGroup } from '@caci-critical-insight-solutions/nucleus-core';
import { NucleusSearch } from '@caci-critical-insight-solutions/nucleus-core';
import { NucleusTextCloudVisualization } from './text-cloud.visualization';

export class NucleusTextCloud extends NucleusElement {
    private _containerElement: HTMLElement;
    private _dataset: Dataset;
    private _filterService: FilterService;
    private _searchService: AbstractSearchService;
    private _shadowRoot: ShadowRoot;

    static get observedAttributes(): string[] {
        return ['text-field-key'].concat(NucleusSearch.requiredAttributes).concat(NucleusSearch.optionalAttributes)
            .concat(NucleusFilter.requiredAttributes).concat(NucleusFilter.optionalAttributes)
            .concat(NucleusAggregation.observedAttributes).concat(NucleusGroup.observedAttributes)
            .concat(NucleusTextCloudVisualization.observedAttributes);
    }

    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                :host([hidden]) {
                    display: none;
                }
            </style>
        `;

        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._containerElement = document.createElement('div');
        this._shadowRoot.appendChild(this._containerElement);
    }

    public attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        super.attributeChangedCallback(name, oldValue, newValue);

        this._createVisualization();
    }

    /**
     * Creates and returns the export data for the text cloud.
     */
    public createExportData(exportFields: { columnName: string, prettyName: string }[], filename: string): { name: string, data: any }[] {
        const searchElement: NucleusSearch = this._containerElement.querySelector('nucleus-search');
        return searchElement.createExportData(exportFields, filename);
    }

    /**
     * Initializes the text cloud and search/filter components.
     */
    public init(dataset: Dataset, filterService: FilterService, searchService: AbstractSearchService): void {
        this._dataset = dataset;
        this._filterService = filterService;
        this._searchService = searchService;

        this._createVisualization();
    }

    /**
     * Redraws the text cloud.
     */
    public redraw(): void {
        const visElement: NucleusTextCloudVisualization = this._containerElement.querySelector('nucleus-visualization-text-cloud');
        visElement.redraw();
    }

    /**
     * Runs the text cloud search query.
     */
    public runQuery(): void {
        const searchElement: NucleusSearch = this._containerElement.querySelector('nucleus-search');
        if (searchElement) {
            searchElement.runQuery();
        }
    }

    private _createAggregationTitle(attributes: Record<string, any>): string {
        if (attributes['aggregation-title']) {
            return attributes['aggregation-title'];
        }
        const aggregationType = attributes['aggregation-operation'];
        if (aggregationType && aggregationType !== 'count') {
            const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(attributes['aggregation-field-key']);
            if (fieldKey && fieldKey.field) {
                const datasetFieldKey: DatasetFieldKey = this._dataset.retrieveDatasetFieldKey(fieldKey);
                return aggregationType.substring(0, 1).toUpperCase() + aggregationType.substring(1) +
                    (datasetFieldKey.field ? (' of ' + datasetFieldKey.field.prettyName) : '');
            }
        }
        return undefined;
    }

    private _createVisualization(): void {
        const attributes = CoreUtil.transformElementAttributes(this.attributes);
        const textFieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(attributes['text-field-key']);
        if (!attributes['id'] || !textFieldKey || !textFieldKey.field || !this._dataset || !this._filterService || !this._searchService) {
            return;
        }

        let newElement = document.createElement('div');
        this._shadowRoot.replaceChild(newElement, this._containerElement);
        this._containerElement = newElement;

        const filterElementId = attributes['id'] + '_filter';
        const searchElementId = attributes['id'] + '_search';
        const visElementId = attributes['id'] + '_visualization';

        // Override attributes
        attributes['aggregation-field'] = 'aggregations._aggregation';
        attributes['aggregation-field-key'] = attributes['aggregation-field-key'] || attributes['text-field-key'];
        attributes['aggregation-group'] = undefined;
        attributes['aggregation-label'] = '_aggregation';
        attributes['aggregation-title'] = this._createAggregationTitle(attributes);
        attributes['data-limit'] = attributes['data-limit'];
        attributes['filter-type'] = 'list';
        attributes['group-field-key'] = attributes['text-field-key'];
        attributes['group-label'] = undefined;
        attributes['group-operation'] = undefined;
        attributes['list-field-key'] = attributes['text-field-key'];
        attributes['list-operator'] = attributes['list-operator'] || '=';
        attributes['search-element-id'] = searchElementId;
        attributes['search-field-keys'] = attributes['text-field-key'];
        attributes['search-limit'] = attributes['search-limit'] || 10000;
        attributes['sort-aggregation'] = '_aggregation';
        attributes['sort-field-key'] = undefined;
        attributes['text-field'] = 'fields.' + textFieldKey.field;
        attributes['vis-draw-function'] = 'drawData';
        attributes['vis-element-id'] = visElementId;
        attributes['vis-filter-input-function'] = 'changeFilteredText';
        attributes['vis-filter-output-event'] = 'filter';

        const filterElement = NucleusFilter.createElement(filterElementId, attributes);
        const searchElement = NucleusSearch.createElement(searchElementId, attributes);
        const aggregationElement = NucleusAggregation.createElement(attributes);
        const groupElement = NucleusGroup.createElement(attributes);
        searchElement.append(aggregationElement);
        searchElement.append(groupElement);

        const visElement = document.createElement('nucleus-visualization-text-cloud');
        visElement.setAttribute('id', visElementId);
        NucleusTextCloudVisualization.observedAttributes.forEach((attribute) => {
            if (typeof attributes[attribute] !== 'undefined') {
                visElement.setAttribute(attribute, attributes[attribute]);
            }
        });

        this._containerElement.append(searchElement);
        this._containerElement.append(filterElement);
        this._containerElement.append(visElement);

        CoreUtil.addEventPropagationListener(this, filterElement, 'designsChanged');
        CoreUtil.addEventPropagationListener(this, filterElement, 'filtersChanged');
        CoreUtil.addEventPropagationListener(this, filterElement, 'valuesFiltered');
        CoreUtil.addEventPropagationListener(this, searchElement, 'searchCanceled');
        CoreUtil.addEventPropagationListener(this, searchElement, 'searchFailed');
        CoreUtil.addEventPropagationListener(this, searchElement, 'searchFinished');
        CoreUtil.addEventPropagationListener(this, searchElement, 'searchLaunched');

        filterElement.init(this._dataset, this._filterService);
        searchElement.init(this._dataset, this._filterService, this._searchService);
    }
}

window.customElements.define('nucleus-text-cloud', NucleusTextCloud);
