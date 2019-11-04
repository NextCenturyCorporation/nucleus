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
    AbstractFilter,
    AbstractFilterDesign,
    BoundsFilterDesign,
    BoundsValues,
    CompoundValues,
    DomainFilterDesign,
    DomainValues,
    FilterCollection,
    FilterValues,
    ListFilterDesign,
    ListOfValues,
    PairFilterDesign,
    PairOfValues
} from '../models/filters';
import { CompoundFilterType } from '../models/config-option';
import { CoreUtil } from '../core.util';
import { Dataset } from '../models/dataset';
import { FilterService } from '../services/filter.service';
import { NextCenturyElement } from './element.web-component';
import { NextCenturySearch } from './search.web-component';

export class NextCenturyFilter extends NextCenturyElement {
    static ELEMENT_NAME = 'next-century-filter';

    private _dataset: Dataset;
    private _filterDesigns: AbstractFilterDesign[] = [];
    private _filterService: FilterService;
    private _visElement: any;

    private _handleFilterEventFromVisualizationCallback: (event: any) => void;

    static get observedAttributes(): string[] {
        return ['id'].concat(NextCenturyFilter.requiredAttributes).concat(NextCenturyFilter.optionalAttributes);
    }

    static get optionalAttributes(): string[] {
        return [
            'bounds-field-key-x',
            'bounds-field-key-y',
            'domain-field-key',
            'list-field-key',
            'list-intersection',
            'list-operator',
            'pair-field-key-1',
            'pair-field-key-2',
            'pair-intersection',
            'pair-operator-1',
            'pair-operator-2',
            'vis-element-id',
            'vis-filter-input-function',
            'vis-filter-output-event'
        ];
    }

    static get requiredAttributes(): string[] {
        return [
            'filter-type',
            'search-element-id'
        ];
    }

    static createElement(id: string, attributes: Record<string, any>): NextCenturyFilter {
        if (!id || NextCenturyFilter.requiredAttributes.some((attribute) => !attributes[attribute])) {
            return null;
        }

        const filterElement = document.createElement(NextCenturyFilter.ELEMENT_NAME) as NextCenturyFilter;
        filterElement.setAttribute('id', id);
        NextCenturyFilter.requiredAttributes.forEach((attribute) => {
            filterElement.setAttribute(attribute, attributes[attribute]);
        });
        NextCenturyFilter.optionalAttributes.forEach((attribute) => {
            if (typeof attributes[attribute] !== 'undefined') {
                filterElement.setAttribute(attribute, attributes[attribute]);
            }
        });

        return filterElement;
    }

    constructor() {
        super();
        this._handleFilterEventFromVisualizationCallback = this._handleFilterEventFromVisualization.bind(this);
    }

    public attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        super.attributeChangedCallback(name, oldValue, newValue);

        if (!this._isReady()) {
            return;
        }

        if (name === 'vis-element-id') {
            if (this.getAttribute('vis-filter-output-event') && this.parentElement) {
                CoreUtil.updateListener(this._handleFilterEventFromVisualizationCallback, this.parentElement, oldValue,
                    this.getAttribute('vis-filter-output-event'), newValue, this.getAttribute('vis-filter-output-event'));
            }
            return;
        }

        if (name === 'vis-filter-output-event') {
            if (this.getAttribute('vis-element-id') && this.parentElement) {
                CoreUtil.updateListener(this._handleFilterEventFromVisualizationCallback, this.parentElement,
                    this.getAttribute('vis-element-id'), oldValue, this.getAttribute('vis-element-id'), newValue);
            }
            return;
        }

        if (name === 'id') {
            this._registerWithFilterService(oldValue, newValue);
        }

        if (name === 'search-element-id' && this.parentElement) {
            const searchElement: NextCenturySearch = this.parentElement.querySelector('#' + oldValue);
            if (searchElement) {
                searchElement.updateFilterDesigns(this.getAttribute('id'), []);
            }
        }

        this._updateFilterDesigns();
    }

    public connectedCallback(): void {
        super.connectedCallback();
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();

        CoreUtil.removeListener(this._handleFilterEventFromVisualizationCallback, this.parentElement, this.getAttribute('vis-element-id'),
            this.getAttribute('vis-filter-output-event'));

        if (this.getAttribute('id')) {
            this._registerWithFilterService(this.getAttribute('id'), null);
        }
    }

    /**
     * Initializes this filter element with the given dataset and services (and optional visualization element).
     */
    public init(dataset: Dataset, filterService: FilterService, visElement?: any): void {
        this._dataset = dataset;
        this._filterService = filterService;
        this._visElement = visElement;

        CoreUtil.addListener(this._handleFilterEventFromVisualizationCallback, this.parentElement, this.getAttribute('vis-element-id'),
            this.getAttribute('vis-filter-output-event'));

        if (this.getAttribute('id')) {
            this._registerWithFilterService(null, this.getAttribute('id'));

            if (this.getAttribute('filter-type') && this.getAttribute('search-element-id')) {
                this._updateFilterDesigns();
            } else {
                console.error('Filter component must have the filter-type and search-element-id attributes!');
            }
        } else {
            console.error('Filter component must have an id attribute!');
        }
    }

    /**
     * Updates filters (creates and/or deletes) using the given values.
     */
    public updateFilters(values: any|any[]): void {
        if (values === null || (Array.isArray(values) && !values.length)) {
            this._handleDeleteFilters();
        } else {
            this._handleExchangeFilters(this._copyArrayOrReturnValue(values));
        }
    }

    /**
     * Returns a copy of the given array or, if not an array, the given value itself.
     */
    private _copyArrayOrReturnValue(valueOrArray: any|any[]): any|any[] {
        return Array.isArray(valueOrArray) ? [].concat(valueOrArray) : valueOrArray;
    }

    /**
     * Returns an array of filter designs with the given values using the current attributes.
     */
    private _createFilterDesigns(values: any|any[]): AbstractFilterDesign[] {
        const filterType = this._retrieveFilterType();
        if (this._isFilterTypeList(filterType)) {
            return this._createFilterDesignsOnList(!!this.hasAttribute('list-intersection'), this.getAttribute('list-field-key'),
                this.getAttribute('list-operator'), values);
        }
        if (this._isFilterTypeBounds(filterType)) {
            return this._createFilterDesignsOnBounds(this.getAttribute('bounds-field-key-x'), this.getAttribute('bounds-field-key-y'),
                values);
        }
        if (this._isFilterTypeDomain(filterType)) {
            return this._createFilterDesignsOnDomain(this.getAttribute('domain-field-key'), values);
        }
        if (this._isFilterTypePair(filterType)) {
            return this._createFilterDesignsOnPair(!!this.hasAttribute('pair-intersection'), this.getAttribute('pair-field-key-1'),
                this.getAttribute('pair-field-key-2'), this.getAttribute('pair-operator-1'), this.getAttribute('pair-operator-2'), values);
        }
        console.warn('Filter component ' + this.getAttribute('id') + ' has unexpected filter type:', filterType);
        return [];
    }

    /**
     * Returns an array of zero or more bounds filter design with the given attributes.
     */
    private _createFilterDesignsOnBounds(fieldKey1: string, fieldKey2: string, values: any|any[]): AbstractFilterDesign[] {
        if (fieldKey1 && fieldKey2 && Array.isArray(values) && values.length) {
            // Handle a nested array like [[1, 2, 3, 4], [5, 6, 7, 8]]
            if (Array.isArray(values[0])) {
                return values.map((value) => this._createFilterDesignsOnBounds(fieldKey1, fieldKey2, value))
                    .reduce((list, part) => list.concat(part), []);
            }
            // Handle a single array like [1, 2, 3, 4]
            if (values.length === 4) {
                return [new BoundsFilterDesign(fieldKey1, fieldKey2, values[0], values[1], values[2], values[3])];
            }
        }
        console.warn('Filter component ' + this.getAttribute('id') + ' has unexpected bounds values:', values);
        return [];
    }

    /**
     * Returns an array of zero or more domain filter design with the given attributes.
     */
    private _createFilterDesignsOnDomain(fieldKey: string, values: any|any[]): AbstractFilterDesign[] {
        if (fieldKey && Array.isArray(values) && values.length) {
            // Handle a nested array like [[1, 2], [3, 4]]
            if (Array.isArray(values[0])) {
                return values.map((value) => this._createFilterDesignsOnDomain(fieldKey, value))
                    .reduce((list, part) => list.concat(part), []);
            }
            // Handle a single array like [1, 2]
            if (values.length === 2) {
                return [new DomainFilterDesign(fieldKey, values[0], values[1])];
            }
        }
        console.warn('Filter component ' + this.getAttribute('id') + ' has unexpected domain values:', values);
        return [];
    }

    /**
     * Returns an array of zero or more list filter design with the given attributes.
     */
    private _createFilterDesignsOnList(
        intersection: boolean,
        fieldKey: string,
        operator: string,
        values: any|any[]
    ): AbstractFilterDesign[] {
        if (fieldKey && operator && !!(Array.isArray(values) ? values.length : values)) {
            // Handle a nested array like [[a, b], [c], [d, e, f]]
            if (Array.isArray(values) && values.some((value) => Array.isArray(value))) {
                return values.map((value) => this._createFilterDesignsOnList(intersection, fieldKey, operator, value))
                    .reduce((list, part) => list.concat(part), []);
            }
            // Handle a single value or array like "a" or [a, b, c, d]
            return [new ListFilterDesign(intersection ? CompoundFilterType.AND : CompoundFilterType.OR, fieldKey, operator,
                Array.isArray(values) ? values : [values])];
        }
        console.warn('Filter component ' + this.getAttribute('id') + ' has unexpected list values:', values);
        return [];
    }

    /**
     * Returns an array of zero or more pair filter design with the given attributes.
     */
    private _createFilterDesignsOnPair(
        intersection: boolean,
        fieldKey1: string,
        fieldKey2: string,
        operator1: string,
        operator2: string,
        values: any|any[]
    ): AbstractFilterDesign[] {
        if (fieldKey1 && fieldKey2 && operator1 && operator2 && Array.isArray(values) && values.length) {
            // Handle a nested array like [[a, b], [c, d]]
            if (Array.isArray(values[0])) {
                return values.map((value) =>
                    this._createFilterDesignsOnPair(intersection, fieldKey1, fieldKey2, operator1, operator2, value))
                    .reduce((list, part) => list.concat(part), []);
            }
            // Handle a single array like [a, b]
            if (values.length === 2) {
                return [new PairFilterDesign(intersection ? CompoundFilterType.AND : CompoundFilterType.OR, fieldKey1, fieldKey2,
                    operator1, operator2, values[0], values[1])];
            }
        }
        console.warn('Filter component ' + this.getAttribute('id') + ' has unexpected pair values:', values);
        return [];
    }

    /**
     * Deletes all the filters in the FilterService with the given filter designs.
     */
    private _deleteFilters(filterDesigns: AbstractFilterDesign[]): void {
        this._filterService.deleteFilters(this.getAttribute('search-element-id'), filterDesigns);
        this.dispatchEvent(new CustomEvent('filtersChanged', {
            bubbles: true,
            detail: {
                filters: []
            }
        }));
    }

    /**
     * Returns values to create blank/empty filter designs.
     */
    private _generateFilterDesignValues(filterType: string): any[] {
        if (this._isFilterTypeList(filterType)) {
            return [undefined];
        }
        if (this._isFilterTypeBounds(filterType)) {
            return [undefined, undefined, undefined, undefined];
        }
        if (this._isFilterTypeDomain(filterType)) {
            return [undefined, undefined];
        }
        if (this._isFilterTypePair(filterType)) {
            return [undefined, undefined];
        }
        console.warn('Filter component ' + this.getAttribute('id') + ' has unexpected filter type:', filterType);
        return [];
    }

    /**
     * Handles the behavior to delete all the filters associated with this filter element in the FilterService.
     */
    private _handleDeleteFilters(values?: any|any[]): void {
        if (this._isReady()) {
            const filterDesigns: AbstractFilterDesign[] = this._createFilterDesigns(typeof values !== 'undefined' ? values :
                this._generateFilterDesignValues(this._retrieveFilterType()));
            if (filterDesigns.length) {
                this._deleteFilters(filterDesigns);
            }
        }
    }

    /**
     * Handles the behavior to exchange all the filters associated with this filter element in the FilterService.
     */
    private _handleExchangeFilters(values: any|any[]): void {
        if (this._isReady()) {
            const filterDesigns: AbstractFilterDesign[] = this._createFilterDesigns(values);
            if (filterDesigns.length) {
                this._filterService.exchangeFilters(this.getAttribute('search-element-id'), filterDesigns, this._dataset);
                this.dispatchEvent(new CustomEvent('filtersChanged', {
                    bubbles: true,
                    detail: {
                        filters: filterDesigns
                    }
                }));
            }
        }
    }

    /**
     * Handles the behavior whenever any filters in the whole application are changed by giving the relevant filter values to the
     * visualization element as needed.
     */
    private _handleFilterChangeFromServices(caller: string): void {
        if (!this._isReady()) {
            return;
        }

        const visElement = this._visElement || (this.parentElement.querySelector('#' + this.getAttribute('vis-element-id')));
        const filterFunction = this.getAttribute('vis-filter-input-function');

        const filterCollection: FilterCollection = this._filterService.retrieveCompatibleFilterCollection(this._filterDesigns);
        const filters: AbstractFilter[] = filterCollection.getFilters();
        const filterValuesList: FilterValues[] = filters.reduce((list, filter) => list.concat(filter.retrieveValues()), []);
        const values: (any|any[])[] = filterValuesList.map((filterValues) => this._retrieveValuesFromFilterValues(filterValues));

        let copyOfValueOrArray: any|any[] = this._copyArrayOrReturnValue(values);
        if (Array.isArray(values) && values.length && Array.isArray(values[0])) {
            copyOfValueOrArray = values.map((value) => this._copyArrayOrReturnValue(value));
        }

        if (visElement && filterFunction) {
            visElement[filterFunction](copyOfValueOrArray);
        }

        this.dispatchEvent(new CustomEvent('valuesFiltered', {
            bubbles: true,
            detail: {
                caller,
                values: copyOfValueOrArray
            }
        }));
    }

    /**
     * Handles the behavior whenever any filter values are emitted from the visualization element by adding or removing filters as needed.
     */
    private _handleFilterEventFromVisualization(event: any) {
        if (event && event.detail && typeof event.detail.values !== 'undefined') {
            this.updateFilters(event.detail.values);
        }
    }

    /**
     * Returns if the current attributes of this filter element correspond to a bounds filter.
     */
    private _isFilterTypeBounds(filterType: string): boolean {
        return !!(filterType === 'bounds' && this.getAttribute('bounds-field-key-x') && this.getAttribute('bounds-field-key-y'));
    }

    /**
     * Returns if the current attributes of this filter element correspond to a domain filter.
     */
    private _isFilterTypeDomain(filterType: string): boolean {
        return !!(filterType === 'domain' && this.getAttribute('domain-field-key'));
    }

    /**
     * Returns if the current attributes of this filter element correspond to a list filter.
     */
    private _isFilterTypeList(filterType: string): boolean {
        return !!(filterType === 'list' && this.getAttribute('list-field-key') && this.getAttribute('list-operator'));
    }

    /**
     * Returns if the current attributes of this filter element correspond to a pair filter.
     */
    private _isFilterTypePair(filterType: string): boolean {
        return !!(filterType === 'pair' && this.getAttribute('pair-field-key-1') && this.getAttribute('pair-field-key-2') &&
            this.getAttribute('pair-operator-1') && this.getAttribute('pair-operator-2'));
    }

    /**
     * Returns if the required properties have been initialized to create a filter.
     */
    private _isReady(): boolean {
        const filterType = this._retrieveFilterType();
        return !!(this._dataset && this._filterService && this.getAttribute('id') && this.getAttribute('search-element-id') &&
            filterType && (this._isFilterTypeBounds(filterType) || this._isFilterTypeDomain(filterType) ||
                this._isFilterTypeList(filterType) || this._isFilterTypePair(filterType)));
    }

    /**
     * Unregisters the given old ID and registers the given new ID with the FilterService.
     */
    private _registerWithFilterService(oldId, newId): void {
        if (!this._filterService) {
            return;
        }
        if (oldId) {
            this._filterService.unregisterFilterChangeListener(oldId);
        }
        if (newId) {
            this._filterService.registerFilterChangeListener(newId, this._handleFilterChangeFromServices.bind(this));
        }
    }

    /**
     * Returns the current filter type attribute of this filter element.
     */
    private _retrieveFilterType(): string {
        return (this.getAttribute('filter-type') || '').toLowerCase();
    }

    /**
     * Returns the boolean/number/string values from the given list of FilterValues.
     */
    private _retrieveValuesFromFilterValues(filterValues: FilterValues): any|any[] {
        if (filterValues instanceof ListOfValues) {
            return filterValues.values;
        }
        if (filterValues instanceof BoundsValues) {
            return [
                filterValues.begin1,
                filterValues.begin2,
                filterValues.end1,
                filterValues.end2
            ];
        }
        if (filterValues instanceof DomainValues) {
            return [filterValues.begin, filterValues.end];
        }
        if (filterValues instanceof PairOfValues) {
            return [filterValues.value1, filterValues.value2];
        }
        if (filterValues instanceof CompoundValues) {
            return filterValues.nested.map((nested) => this._retrieveValuesFromFilterValues([nested]));
        }
        console.warn('Filter component ' + this.getAttribute('id') + ' has unexpected filter values:', filterValues);
        return [];
    }

    /**
     * Updates the filter designs using the current attributes, gives them to the search element, emits an event, and deletes all the old
     * filters created by this filter element.
     */
    private _updateFilterDesigns(): void {
        if (this._isReady() && this.parentElement) {
            const searchElement: NextCenturySearch = this.parentElement.querySelector('#' + this.getAttribute('search-element-id'));
            this._filterDesigns = this._createFilterDesigns(this._generateFilterDesignValues(this._retrieveFilterType()));
            if (searchElement && this._filterDesigns.length) {
                this._handleFilterChangeFromServices(this.getAttribute('search-element-id'));
                searchElement.updateFilterDesigns(this.getAttribute('id'), this._filterDesigns);
                this.dispatchEvent(new CustomEvent('designsChanged', {
                    bubbles: true,
                    detail: {
                        designs: this._filterDesigns
                    }
                }));
            }
        }
    }
}

window.customElements.define(NextCenturyFilter.ELEMENT_NAME, NextCenturyFilter);

