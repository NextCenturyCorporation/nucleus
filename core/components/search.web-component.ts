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
    BoundsValues,
    CompoundValues,
    DomainValues,
    FilterValues,
    ListOfValues,
    PairOfValues
} from '../models/filters';
import { AbstractSearchService, FilterClause, SearchObject } from '../services/abstract.search.service';
import { AggregationType, CompoundFilterType, SortOrder, TimeInterval } from '../models/config-option';
import { CoreUtil } from '../core.util';
import { Dataset, DatasetFieldKey, DatasetUtil, FieldKey } from '../models/dataset';
import { FilterService } from '../services/filter.service';
import { NucleusElement } from './element.web-component';

import * as _ from 'lodash';

interface AggregationData {
    fieldKey: FieldKey;
    group: string;
    label: string;
    operation: string;
}

interface GroupData {
    fieldKey: FieldKey;
    label: string;
    operation: string;
}

interface JoinData {
    fieldKey1: FieldKey;
    fieldKey2: FieldKey;
    operator: string;
    tableKey: FieldKey;
    type: string;
}

export class NucleusSearch extends NucleusElement {
    static DEFAULT_LIMIT = 10;
    static ELEMENT_NAME = 'nucleus-search';

    private _dataset: Dataset;
    private _filterService: FilterService;
    private _idsToFilters: Map<string, AbstractFilter[]> = new Map<string, AbstractFilter[]>();
    private _idsToFilterDesigns: Map<string, AbstractFilterDesign[]> = new Map<string, AbstractFilterDesign[]>();
    private _previousFilters: AbstractFilter[] = [];
    private _runningQuery: XMLHttpRequest;
    private _searchService: AbstractSearchService;
    private _visInputElement: any;

    static get observedAttributes(): string[] {
        return ['id'].concat(NucleusSearch.requiredAttributes).concat(NucleusSearch.optionalAttributes);
    }

    static get optionalAttributes(): string[] {
        return [
            'data-limit',
            'enable-hide-if-unfiltered',
            'enable-ignore-self-filter',
            'search-limit',
            'search-page',
            'sort-aggregation',
            'sort-field-key',
            'sort-order',
            'vis-draw-function',
            'vis-element-id'
        ];
    }

    static get requiredAttributes(): string[] {
        return [
            'search-field-keys'
        ];
    }

    static createElement(id: string, attributes: Record<string, any>): NucleusSearch {
        if (!id || NucleusSearch.requiredAttributes.some((attribute) => !attributes[attribute])) {
            return null;
        }

        const searchElement = document.createElement(NucleusSearch.ELEMENT_NAME) as NucleusSearch;
        searchElement.setAttribute('id', id);
        NucleusSearch.requiredAttributes.forEach((attribute) => {
            searchElement.setAttribute(attribute, attributes[attribute]);
        });
        NucleusSearch.optionalAttributes.forEach((attribute) => {
            if (typeof attributes[attribute] !== 'undefined') {
                searchElement.setAttribute(attribute, attributes[attribute]);
            }
        });

        return searchElement;
    }

    public attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        super.attributeChangedCallback(name, oldValue, newValue);

        if (!this._isReady()) {
            return;
        }

        if (name === 'id') {
            this._registerWithFilterService(oldValue, newValue);
        }

        this.runQuery();
    }

    public connectedCallback(): void {
        super.connectedCallback();
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();

        if (this._runningQuery) {
            this._runningQuery.abort();
        }

        if (this.getAttribute('id')) {
            this._registerWithFilterService(this.getAttribute('id'), null);
        }
    }

    /**
     * Creates and returns the export data for the search query built by this search element using the AbstractSearchService.
     */
    public createExportData(exportFields: { columnName: string, prettyName: string }[], filename: string): { name: string, data: any }[] {
        const tableKey: FieldKey = this._retrieveTableKey();
        const datasetTableKey: DatasetFieldKey = tableKey ? this._dataset.retrieveDatasetFieldKey(tableKey) : null;
        const dataHost = datasetTableKey ? datasetTableKey.datastore.host : null;
        const dataType = datasetTableKey ? datasetTableKey.datastore.type : null;

        const searchObject: SearchObject = this._buildQuery();

        return !searchObject ? [] : [
            this._searchService.transformSearchToExport(dataHost, dataType, exportFields, searchObject, filename)
        ];
    }

    /**
     * Initializes this search element with the given dataset and services and starts a new search query if possible (and optional
     * visualization element).
     */
    public init(dataset: Dataset, filterService: FilterService, searchService: AbstractSearchService, options?: any): void {
        this._dataset = dataset;
        this._filterService = filterService;
        this._searchService = searchService;

        if (options && typeof options === 'object') {
            if (options.visInput) {
                this._visInputElement = options.visInput;
            } else {
                // Backwards compatibility
                this._visInputElement = options;
            }
        }

        if (this.getAttribute('id')) {
            this._registerWithFilterService(null, this.getAttribute('id'));

            if (this.getAttribute('search-field-keys')) {
                this.runQuery();
            } else {
                console.error('Search component must have the search-field-keys attribute!');
            }
        } else {
            console.error('Search component must have an id attribute!');
        }
    }

    /**
     * Runs the search query using the current attributes and filters.  Only call this function if you want to manually trigger a requery.
     */
    public runQuery(): void {
        if (!this._isReady()) {
            return;
        }

        let searchObject: SearchObject = this._buildQuery();

        if (searchObject) {
            const searchLimit = Number(this.getAttribute('search-limit') || NucleusSearch.DEFAULT_LIMIT);
            this._searchService.withLimit(searchObject, searchLimit);

            const page = Number(this.getAttribute('search-page') || 1);
            this._searchService.withOffset(searchObject, (page - 1) * searchLimit);

            const searchFilters: AbstractFilter[] = this._retrieveSearchFilters();
            this._startQuery(searchObject, !!searchFilters.length);
        }
    }

    /**
     * Updates the unshared filters of this search element with the given filters.
     */
    public updateFilters(id: string, filters: AbstractFilter[]): void {
        this._idsToFilters.set(id, filters);
        this.runQuery();
    }

    /**
     * Updates the filter designs of this search element (used to find shared filters) with the given filter designs.
     */
    public updateFilterDesigns(id: string, filterDesigns: AbstractFilterDesign[]): void {
        this._idsToFilterDesigns.set(id, filterDesigns);
        this.runQuery();
    }

    /**
     * Returns the search query with its fields, aggregations, groups, filters, and sort.
     */
    private _buildQuery(): SearchObject {
        const searchFilters: AbstractFilter[] = this._retrieveSearchFilters();

        const fieldKeys: FieldKey[] = this._retrieveFieldKeys();
        const allFields = fieldKeys.some((fieldKey) => !!fieldKey && fieldKey.field === '*');
        const searchFieldKeys: FieldKey[] = fieldKeys.filter((fieldKey) => !!fieldKey && !!fieldKey.field && fieldKey.field !== '*');

        const aggregations: AggregationData[] = this._findSearchAggregations();
        const groups: GroupData[] = this._findSearchGroups();
        const joins: JoinData[] = this._findSearchJoins();

        const unsharedFilters: AbstractFilter[] = Array.from(this._idsToFilters.values()).reduce((completeFilterList, filterList) =>
            completeFilterList.concat(filterList), []);

        const sortAggregation = this.getAttribute('sort-aggregation');
        const sortFieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.getAttribute('sort-field-key'));

        const fields: FieldKey[] = _.uniqWith(allFields ? [] : searchFieldKeys
            .concat(aggregations.filter((agg) => agg.fieldKey && agg.fieldKey.field).map((agg) => agg.fieldKey))
            .concat(groups.filter((group) => group.fieldKey && group.fieldKey.field).map((group) => group.fieldKey))
            .concat(joins.map((join) => join.fieldKey1)).concat(joins.map((join) => join.fieldKey2))
            .concat((sortFieldKey && sortFieldKey.field) ? sortFieldKey : []), _.isEqual.bind(this));

        const tableKey: FieldKey = this._retrieveTableKey();
        let searchObject: SearchObject = this._searchService.createSearch(tableKey.database, tableKey.table);
        fields.forEach((field) => {
            this._searchService.withField(searchObject, field);
        });

        const filterClauses: FilterClause[] = (allFields ? [] : fields)
            .map((fieldName) => this._searchService.createFilterClause(fieldName, '!=', null))
            .concat(searchFilters.map((filter) => this._searchService.generateFilterClauseFromFilter(filter)))
            .concat(unsharedFilters.map((filter) => this._searchService.generateFilterClauseFromFilter(filter)));

        if (filterClauses.length) {
            this._searchService.withFilter(searchObject, filterClauses.length === 1 ? filterClauses[0] :
                this._searchService.createCompoundFilterClause(filterClauses));
        }

        for (const aggregation of aggregations) {
            if (aggregation.operation === 'total') {
                this._searchService.withAggregationByTotalCount(searchObject, aggregation.label);
            } else if (aggregation.fieldKey && aggregation.fieldKey.field) {
                this._searchService.withAggregation(searchObject, aggregation.fieldKey, aggregation.label,
                    (aggregation.operation as AggregationType || AggregationType.COUNT));
            } else if (aggregation.group) {
                this._searchService.withAggregationByGroupCount(searchObject, aggregation.group, aggregation.label);
            }
        }

        if (groups.length) {
            for (const group of groups) {
                switch (group.operation) {
                    case (TimeInterval.SECOND as string):
                        this._searchService.withGroupByDate(searchObject, group.fieldKey, TimeInterval.SECOND);
                        // Falls through
                    case (TimeInterval.MINUTE as string):
                        this._searchService.withGroupByDate(searchObject, group.fieldKey, TimeInterval.MINUTE);
                        // Falls through
                    case (TimeInterval.HOUR as string):
                        this._searchService.withGroupByDate(searchObject, group.fieldKey, TimeInterval.HOUR);
                        // Falls through
                    case (TimeInterval.DAY_OF_MONTH as string):
                        this._searchService.withGroupByDate(searchObject, group.fieldKey, TimeInterval.DAY_OF_MONTH);
                        // Falls through
                    case (TimeInterval.MONTH as string):
                        this._searchService.withGroupByDate(searchObject, group.fieldKey, TimeInterval.MONTH);
                        // Falls through
                    case (TimeInterval.YEAR as string):
                        this._searchService.withGroupByDate(searchObject, group.fieldKey, TimeInterval.YEAR);
                        break;
                    default:
                        this._searchService.withGroup(searchObject, group.fieldKey);
                }
            }
        }

        for (const join of joins) {
            this._searchService.withJoin(searchObject, join.type, join.tableKey.database, join.tableKey.table, join.fieldKey1,
                join.operator, join.fieldKey2);
        }

        const sortOrder: SortOrder = (this.getAttribute('sort-order') || SortOrder.DESCENDING) as SortOrder;
        if (sortAggregation) {
            this._searchService.withOrderByOperation(searchObject, sortAggregation, sortOrder);
        } else if (sortFieldKey && sortFieldKey.field) {
            this._searchService.withOrder(searchObject, sortFieldKey, sortOrder);
        }

        return searchObject;
    }

    /**
     * Returns the aggregation data from the aggregation elements inside this search element.
     */
    private _findSearchAggregations(): AggregationData[] {
        let aggregations: AggregationData[] = [];
        for (const aggregationElement of this.getElementsByTagName('nucleus-aggregation') as any) {
            const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(aggregationElement.getAttribute('aggregation-field-key'));
            const group = aggregationElement.getAttribute('aggregation-group');
            const label = aggregationElement.getAttribute('aggregation-label');
            const operation = aggregationElement.getAttribute('aggregation-operation');
            if ((fieldKey || group || operation === 'total') && label) {
                aggregations.push({
                    fieldKey,
                    group,
                    label,
                    operation
                });
            }
        }
        return aggregations;
    }

    /**
     * Returns the group data from the group elements inside this search element.
     */
    private _findSearchGroups(): GroupData[] {
        let groups: GroupData[] = [];
        for (const groupElement of this.getElementsByTagName('nucleus-group') as any) {
            const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(groupElement.getAttribute('group-field-key'));
            const label = groupElement.getAttribute('group-label');
            const operation = groupElement.getAttribute('group-operation');
            if (fieldKey) {
                groups.push({
                    fieldKey,
                    label,
                    operation
                });
            }
        }
        return groups;
    }

    /**
     * Returns the join data from the join elements inside this search element.
     */
    private _findSearchJoins(): JoinData[] {
        let joins: JoinData[] = [];
        for (const joinElement of this.getElementsByTagName('nucleus-join') as any) {
            const fieldKey1: FieldKey = DatasetUtil.deconstructTableOrFieldKey(joinElement.getAttribute('join-field-key-1'));
            const fieldKey2: FieldKey = DatasetUtil.deconstructTableOrFieldKey(joinElement.getAttribute('join-field-key-2'));
            const operator = joinElement.getAttribute('join-operator') || '=';
            const tableKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(joinElement.getAttribute('join-table-key'));
            const type = joinElement.getAttribute('join-type') || '';
            if (fieldKey1 && fieldKey1.field && fieldKey2 && fieldKey2.field && tableKey) {
                joins.push({
                    fieldKey1,
                    fieldKey2,
                    operator,
                    tableKey,
                    type
                });
            }
        }
        return joins;
    }

    /**
     * Handles the behavior whenever any filters in the whole application are changed by starting a new search query if needed.
     */
    private _handleFilterChange(callerId: string): void {
        if (!this._isReady()) {
            return;
        }

        // Don't run the search query if the event was sent with this element's ID and if filter-self is false.
        if (callerId === this.getAttribute('id') && this.hasAttribute('enable-ignore-self-filter')) {
            return;
        }

        // If the new search filters do not match the previous search filters, then run a new search query.
        const filters: AbstractFilter[] = this._retrieveSearchFilters();
        if (filters.length !== this._previousFilters.length || filters.some((filter, index) =>
            !filter.isEquivalentToFilter(this._previousFilters[index]))) {
            this.runQuery();
        }
        this._previousFilters = filters;
    }

    /**
     * Transforms the given search query results, draws them in the visualization element, and emits an event.
     */
    private _handleQuerySuccess(queryResults: { data: any[] }, info: string): void {
        const aggregations: AggregationData[] = this._findSearchAggregations();
        const filterValuesList: FilterValues[] = this._retrieveSharedFilters().reduce((list, filter) =>
            list.concat(filter.retrieveValues()), []);

        const dataLimit = Number(this.getAttribute('data-limit') || queryResults.data.length);
        const data = queryResults.data.slice(0, dataLimit).map((result) => {
            let item = {
                aggregations: aggregations.reduce((collection, aggregation) => {
                    collection[aggregation.label] = result[aggregation.label];
                    return collection;
                }, {}),
                fields: Object.keys(result).reduce((collection, key) => {
                    if (aggregations.every((aggregation) => aggregation.label !== key)) {
                        let lastCollection = collection;
                        let lastKey = key;
                        while (lastKey.indexOf('.') >= 0) {
                            const parentKey = lastKey.substring(0, lastKey.indexOf('.'));
                            lastCollection[parentKey] = lastCollection[parentKey] || {};
                            lastCollection = lastCollection[parentKey];
                            lastKey = lastKey.substring(lastKey.indexOf('.') + 1);
                        }
                        lastCollection[lastKey]= result[key];
                    }
                    return collection;
                }, {}),
                filtered: this._isFiltered(result, filterValuesList)
            };
            return item;
        });

        let size = data.length;

        const visElement = this._visInputElement || (this.parentElement ? this.parentElement.querySelector('#' +
            this.getAttribute('vis-element-id')) : null);
        const drawFunction = this.getAttribute('vis-draw-function');
        if (visElement && drawFunction) {
            size = visElement[drawFunction](data);
            size = (typeof size === 'number') ? size : data.length;
        }

        this.dispatchEvent(new CustomEvent('searchFinished', {
            bubbles: true,
            detail: {
                data,
                info,
                size
            }
        }));
    }

    /**
     * Returns if the given result is filtered in the given list of filter values.
     */
    private _isFiltered(result: any, filterValuesList: FilterValues[]): boolean {
        for (const filterValues of filterValuesList) {
            if (filterValues instanceof ListOfValues && this._isFilteredByListOfValues(result, filterValues)) {
                return true;
            }
            if (filterValues instanceof BoundsValues && this._isFilteredByBoundsValues(result, filterValues)) {
                return true;
            }
            if (filterValues instanceof DomainValues && this._isFilteredByDomainValues(result, filterValues)) {
                return true;
            }
            if (filterValues instanceof PairOfValues && this._isFilteredByPairOfValues(result, filterValues)) {
                return true;
            }
            if (filterValues instanceof CompoundValues && this._isFilteredByCompoundValues(result, filterValues)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns if the given result is filtered in the given bounds values.
     */
    private _isFilteredByBoundsValues(result: any, boundsValues: BoundsValues): boolean {
        const fieldKey1: FieldKey = DatasetUtil.deconstructTableOrFieldKey(boundsValues.field1);
        const fieldKey2: FieldKey = DatasetUtil.deconstructTableOrFieldKey(boundsValues.field2);
        if (fieldKey1 && fieldKey2) {
            const value1 = CoreUtil.deepFind(result, fieldKey1.field);
            const value2 = CoreUtil.deepFind(result, fieldKey2.field);
            if (typeof value1 !== 'undefined' && typeof value2 !== 'undefined' &&
                this._isFilteredWithOperator(value1, '>=', boundsValues.begin1) &&
                this._isFilteredWithOperator(value1, '<=', boundsValues.end1) &&
                this._isFilteredWithOperator(value2, '>=', boundsValues.begin2) &&
                this._isFilteredWithOperator(value2, '<=', boundsValues.end2)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns if the given result is filtered in the given compound values.
     */
    private _isFilteredByCompoundValues(result: any, compoundValues: CompoundValues): boolean {
        const isFilteredList: boolean[] = compoundValues.nested.map((nested) => this._isFiltered(result, [nested]));
        if (isFilteredList.length) {
            if (compoundValues.type === CompoundFilterType.AND && isFilteredList.every((isFiltered) => isFiltered)) {
                return true;
            }
            if (compoundValues.type === CompoundFilterType.OR && isFilteredList.some((isFiltered) => isFiltered)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns if the given result is filtered in the given domain values.
     */
    private _isFilteredByDomainValues(result: any, domainValues: DomainValues): boolean {
        const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(domainValues.field);
        if (fieldKey) {
            const value = CoreUtil.deepFind(result, fieldKey.field);
            if (typeof value !== 'undefined' && this._isFilteredWithOperator(value, '>=', domainValues.begin) &&
                this._isFilteredWithOperator(value, '<=', domainValues.end)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns if the given result is filtered in the given list of values.
     */
    private _isFilteredByListOfValues(result: any, listOfValues: ListOfValues): boolean {
        const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(listOfValues.field);
        if (fieldKey) {
            const value = CoreUtil.deepFind(result, fieldKey.field);
            if (typeof value !== 'undefined') {
                const isFilteredList: boolean[] = listOfValues.values.map((otherValue) =>
                    this._isFilteredWithOperator(value, listOfValues.operator, otherValue));
                if (listOfValues.type === CompoundFilterType.AND && isFilteredList.every((isFiltered) => isFiltered)) {
                    return true;
                }
                if (listOfValues.type === CompoundFilterType.OR && isFilteredList.some((isFiltered) => isFiltered)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Returns if the given result is filtered in the given pair of values.
     */
    private _isFilteredByPairOfValues(result: any, pairOfValues: PairOfValues): boolean {
        const fieldKey1: FieldKey = DatasetUtil.deconstructTableOrFieldKey(pairOfValues.field1);
        const fieldKey2: FieldKey = DatasetUtil.deconstructTableOrFieldKey(pairOfValues.field2);
        if (fieldKey1 && fieldKey2) {
            const value1 = CoreUtil.deepFind(result, fieldKey1.field);
            const value2 = CoreUtil.deepFind(result, fieldKey2.field);
            if (typeof value1 !== 'undefined' && typeof value2 !== 'undefined') {
                const isFiltered1 = this._isFilteredWithOperator(value1, pairOfValues.operator1, pairOfValues.value1);
                const isFiltered2 = this._isFilteredWithOperator(value2, pairOfValues.operator2, pairOfValues.value2);
                if (pairOfValues.type === CompoundFilterType.AND && (isFiltered1 && isFiltered2)) {
                    return true;
                }
                if (pairOfValues.type === CompoundFilterType.OR && (isFiltered1 || isFiltered2)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Returns if the given inputs work with the given operator.
     */
    private _isFilteredWithOperator(input1: any, operator: string, input2: any): boolean {
        if (Array.isArray(input1)) {
            return input1.some((value) => this._isFilteredWithOperator(value, operator, input2));
        }

        if (operator === '=') {
            return input1 === input2;
        }
        if (operator === '!=') {
            return input1 !== input2;
        }
        if (operator === 'contains') {
            return ('' + input1).indexOf('' + input2) >= 0;
        }
        if (operator === 'not contains') {
            return ('' + input1).indexOf('' + input2) < 0;
        }
        if (operator === '>=') {
            return input1 >= input2;
        }
        if (operator === '<=') {
            return input1 <= input2;
        }
        if (operator === '>') {
            return input1 > input2;
        }
        if (operator === '<') {
            return input1 < input2;
        }

        return false;
    }

    /**
     * Returns if the required properties have been initialized to run a search.
     */
    private _isReady(): boolean {
        return !!(this._dataset && this._filterService && this._searchService && this.getAttribute('search-field-keys') &&
            this.getAttribute('id'));
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
            this._filterService.registerFilterChangeListener(newId, this._handleFilterChange.bind(this));
        }
    }

    /**
     * Returns all the search field keys.
     */
    private _retrieveFieldKeys(): FieldKey[] {
        const fieldKeyStrings: string[] = (this.getAttribute('search-field-keys') || '').split(',');
        return fieldKeyStrings.map((fieldKeyString) => DatasetUtil.deconstructTableOrFieldKey(fieldKeyString));
    }

    /**
     * Returns the all the filters in the datastore/database/table of the search-field-keys (except the filters matching
     * the _idsToFilterDesigns, unless filter-self is true).
     */
    private _retrieveSearchFilters(): AbstractFilter[] {
        if (!this._isReady()) {
            return [];
        }

        // Retrieve the filters that share this component's filter designs to ignore them if configured with enable-ignore-self-filter.
        const sharedFilters: AbstractFilter[] = this.hasAttribute('enable-ignore-self-filter') ? this._retrieveSharedFilters() : [];

        const tableKey: FieldKey = this._retrieveTableKey();

        return !tableKey ? [] : this._filterService.getFiltersToSearch(tableKey.datastore, tableKey.database, tableKey.table,
            sharedFilters.map((filter) => filter.toDesign()));
    }

    /**
     * Returns the filters matching the _idsToFilterDesigns.
     */
    private _retrieveSharedFilters(): AbstractFilter[] {
        if (!this._isReady()) {
            return [];
        }

        const filterDesigns: AbstractFilterDesign[] = Array.from(this._idsToFilterDesigns.values())
            .reduce((completeFilterDesignList, filterDesignList) => completeFilterDesignList.concat(filterDesignList), []);

        return this._filterService.retrieveCompatibleFilterCollection(filterDesigns).getFilters();
    }

    /**
     * Returns the single search table key.
     *
     * TODO Don't assume that each fieldKey contains the same datastore, database, and table.
     */
    private _retrieveTableKey(): FieldKey {
        const fieldKeys: FieldKey[] = this._retrieveFieldKeys();
        return fieldKeys.length ? fieldKeys[0] : null;
    }

    /**
     * Starts the given search query using the current attributes, dataset, and services.
     */
    private _startQuery(searchObject: SearchObject, isFiltered: boolean): void {
        if (!this._isReady()) {
            return;
        }

        if (this._runningQuery) {
            this._runningQuery.abort();
        }

        this.dispatchEvent(new CustomEvent('searchLaunched', {
            bubbles: true,
            detail: {}
        }));

        const tableKey: FieldKey = this._retrieveTableKey();
        const datasetTableKey: DatasetFieldKey = tableKey ? this._dataset.retrieveDatasetFieldKey(tableKey) : null;
        const dataHost = datasetTableKey ? datasetTableKey.datastore.host : null;
        const dataType = datasetTableKey ? datasetTableKey.datastore.type : null;
        const labels = datasetTableKey ? datasetTableKey.table.labelOptions : {};
        const hideIfUnfiltered = this.hasAttribute('enable-hide-if-unfiltered');

        // Don't run a search query if it is not possible, or if enable-hide-if-unfiltered is true and the search query is not filtered.
        if (!this._searchService.canRunSearch(dataType, dataHost)) {
            this.dispatchEvent(new CustomEvent('searchFailed', {
                bubbles: true,
                detail: {
                    error: 'Cannot Connect to Datastore',
                    message: 'FAILED ' + this.getAttribute('id')
                }
            }));
            return;
        }
        if (hideIfUnfiltered && !isFiltered) {
            // Unsure if this should be success or failure.
            this._handleQuerySuccess({ data: [] }, 'Please Filter');
            return;
        }

        this._searchService.transformFilterClauseValues(searchObject, labels);

        const onError = (response) => {
            this._runningQuery = undefined;
            if (response.statusText === 'abort') {
                this.dispatchEvent(new CustomEvent('searchCanceled', {
                    bubbles: true,
                    detail: {}
                }));
            } else {
                this.dispatchEvent(new CustomEvent('searchFailed', {
                    bubbles: true,
                    detail: {
                        error: response && !!response.responseJSON ? response.responseJSON.stackTrace : response.responseText,
                        message: 'FAILED ' + this.getAttribute('id')
                    }
                }));
            }
        };

        const onSuccess = (response) => {
            this._runningQuery = undefined;
            this._handleQuerySuccess(this._searchService.transformSearchResultValues(response, labels), null);
        };

        this._runningQuery = this._searchService.runSearch(dataType, dataHost, searchObject, onSuccess, onError);
    }
}

window.customElements.define(NucleusSearch.ELEMENT_NAME, NucleusSearch);

