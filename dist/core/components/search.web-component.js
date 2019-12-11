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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var filters_1 = require("../models/filters");
var config_option_1 = require("../models/config-option");
var core_util_1 = require("../core.util");
var dataset_1 = require("../models/dataset");
var element_web_component_1 = require("./element.web-component");
var NextCenturySearch = /** @class */ (function (_super) {
    __extends(NextCenturySearch, _super);
    function NextCenturySearch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._idsToFilters = new Map();
        _this._idsToFilterDesigns = new Map();
        return _this;
    }
    Object.defineProperty(NextCenturySearch, "observedAttributes", {
        get: function () {
            return ['id'].concat(NextCenturySearch.requiredAttributes).concat(NextCenturySearch.optionalAttributes);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NextCenturySearch, "optionalAttributes", {
        get: function () {
            return [
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NextCenturySearch, "requiredAttributes", {
        get: function () {
            return [
                'search-field-keys'
            ];
        },
        enumerable: true,
        configurable: true
    });
    NextCenturySearch.createElement = function (id, attributes) {
        if (!id || NextCenturySearch.requiredAttributes.some(function (attribute) { return !attributes[attribute]; })) {
            return null;
        }
        var searchElement = document.createElement(NextCenturySearch.ELEMENT_NAME);
        searchElement.setAttribute('id', id);
        NextCenturySearch.requiredAttributes.forEach(function (attribute) {
            searchElement.setAttribute(attribute, attributes[attribute]);
        });
        NextCenturySearch.optionalAttributes.forEach(function (attribute) {
            if (typeof attributes[attribute] !== 'undefined') {
                searchElement.setAttribute(attribute, attributes[attribute]);
            }
        });
        return searchElement;
    };
    NextCenturySearch.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        _super.prototype.attributeChangedCallback.call(this, name, oldValue, newValue);
        if (!this._isReady()) {
            return;
        }
        if (name === 'id') {
            this._registerWithFilterService(oldValue, newValue);
        }
        this.runQuery();
    };
    NextCenturySearch.prototype.connectedCallback = function () {
        _super.prototype.connectedCallback.call(this);
    };
    NextCenturySearch.prototype.disconnectedCallback = function () {
        _super.prototype.disconnectedCallback.call(this);
        if (this._runningQuery) {
            this._runningQuery.abort();
        }
        if (this.getAttribute('id')) {
            this._registerWithFilterService(this.getAttribute('id'), null);
        }
    };
    /**
     * Creates and returns the export data for the search query built by this search element using the AbstractSearchService.
     */
    NextCenturySearch.prototype.createExportData = function (exportFields, filename) {
        var tableKey = this._retrieveTableKey();
        var datasetTableKey = tableKey ? this._dataset.retrieveDatasetFieldKey(tableKey) : null;
        var dataHost = datasetTableKey ? datasetTableKey.datastore.host : null;
        var dataType = datasetTableKey ? datasetTableKey.datastore.type : null;
        var queryPayload = this._buildQuery();
        return !queryPayload ? [] : [
            this._searchService.transformQueryPayloadToExport(dataHost, dataType, exportFields, queryPayload, filename)
        ];
    };
    /**
     * Initializes this search element with the given dataset and services and starts a new search query if possible (and optional
     * visualization element).
     */
    NextCenturySearch.prototype.init = function (dataset, filterService, searchService, options) {
        this._dataset = dataset;
        this._filterService = filterService;
        this._searchService = searchService;
        if (options && typeof options === 'object') {
            if (options.visInput) {
                this._visInputElement = options.visInput;
            }
            else {
                // Backwards compatibility
                this._visInputElement = options;
            }
        }
        if (this.getAttribute('id')) {
            this._registerWithFilterService(null, this.getAttribute('id'));
            if (this.getAttribute('search-field-keys')) {
                this.runQuery();
            }
            else {
                console.error('Search component must have the search-field-keys attribute!');
            }
        }
        else {
            console.error('Search component must have an id attribute!');
        }
    };
    /**
     * Runs the search query using the current attributes and filters.  Only call this function if you want to manually trigger a requery.
     */
    NextCenturySearch.prototype.runQuery = function () {
        if (!this._isReady()) {
            return;
        }
        var queryPayload = this._buildQuery();
        if (queryPayload) {
            var limit = Number(this.getAttribute('search-limit') || NextCenturySearch.DEFAULT_LIMIT);
            this._searchService.updateLimit(queryPayload, limit);
            var page = Number(this.getAttribute('search-page') || 1);
            this._searchService.updateOffset(queryPayload, (page - 1) * limit);
            var searchFilters = this._retrieveSearchFilters();
            this._startQuery(queryPayload, !!searchFilters.length);
        }
    };
    /**
     * Updates the unshared filters of this search element with the given filters.
     */
    NextCenturySearch.prototype.updateFilters = function (id, filters) {
        this._idsToFilters.set(id, filters);
        this.runQuery();
    };
    /**
     * Updates the filter designs of this search element (used to find shared filters) with the given filter designs.
     */
    NextCenturySearch.prototype.updateFilterDesigns = function (id, filterDesigns) {
        this._idsToFilterDesigns.set(id, filterDesigns);
        this.runQuery();
    };
    /**
     * Returns the search query with its fields, aggregations, groups, filters, and sort.
     */
    NextCenturySearch.prototype._buildQuery = function () {
        var _this = this;
        var searchFilters = this._retrieveSearchFilters();
        var fieldKeys = this._retrieveFieldKeys();
        var allFields = fieldKeys.some(function (fieldKey) { return !!fieldKey && fieldKey.field === '*'; });
        var searchFieldKeys = fieldKeys.filter(function (fieldKey) { return !!fieldKey && !!fieldKey.field && fieldKey.field !== '*'; });
        var aggregations = this._findSearchAggregations();
        var groups = this._findSearchGroups();
        var unsharedFilters = Array.from(this._idsToFilters.values()).reduce(function (completeFilterList, filterList) {
            return completeFilterList.concat(filterList);
        }, []);
        var sortAggregation = this.getAttribute('sort-aggregation');
        var sortFieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.getAttribute('sort-field-key'));
        var fields = allFields ? [] : (searchFieldKeys.map(function (fieldKey) { return fieldKey.field; })
            .concat(aggregations.filter(function (agg) { return agg.fieldKey && agg.fieldKey.field; }).map(function (agg) { return agg.fieldKey.field; }))
            .concat(groups.filter(function (group) { return group.fieldKey && group.fieldKey.field; }).map(function (group) { return group.fieldKey.field; }))
            .concat((sortFieldKey && sortFieldKey.field) ? sortFieldKey.field : []));
        var tableKey = this._retrieveTableKey();
        var queryPayload = this._searchService.buildQueryPayload(tableKey.database, tableKey.table, fields.length ? fields : ['*']);
        var filterClauses = (allFields ? [] : fields)
            .map(function (fieldName) { return _this._searchService.buildFilterClause(fieldName, '!=', null); })
            .concat(searchFilters.map(function (filter) { return _this._searchService.generateFilterClauseFromFilter(filter); }))
            .concat(unsharedFilters.map(function (filter) { return _this._searchService.generateFilterClauseFromFilter(filter); }));
        if (filterClauses.length) {
            this._searchService.updateFilter(queryPayload, filterClauses.length === 1 ? filterClauses[0] :
                this._searchService.buildCompoundFilterClause(filterClauses));
        }
        for (var _i = 0, aggregations_1 = aggregations; _i < aggregations_1.length; _i++) {
            var aggregation = aggregations_1[_i];
            this._searchService.updateAggregation(queryPayload, aggregation.type, aggregation.name, (aggregation.fieldKey && aggregation.fieldKey.field) ? aggregation.fieldKey.field : aggregation.group);
        }
        if (groups.length) {
            var searchGroups = [];
            for (var _a = 0, groups_1 = groups; _a < groups_1.length; _a++) {
                var group = groups_1[_a];
                switch (group.type) {
                    case config_option_1.TimeInterval.MINUTE:
                        searchGroups.push(this._searchService.buildDateQueryGroup(group.fieldKey.field, config_option_1.TimeInterval.MINUTE));
                    // Falls through
                    case config_option_1.TimeInterval.HOUR:
                        searchGroups.push(this._searchService.buildDateQueryGroup(group.fieldKey.field, config_option_1.TimeInterval.HOUR));
                    // Falls through
                    case config_option_1.TimeInterval.DAY_OF_MONTH:
                        searchGroups.push(this._searchService.buildDateQueryGroup(group.fieldKey.field, config_option_1.TimeInterval.DAY_OF_MONTH));
                    // Falls through
                    case config_option_1.TimeInterval.MONTH:
                        searchGroups.push(this._searchService.buildDateQueryGroup(group.fieldKey.field, config_option_1.TimeInterval.MONTH));
                    // Falls through
                    case config_option_1.TimeInterval.YEAR:
                        searchGroups.push(this._searchService.buildDateQueryGroup(group.fieldKey.field, config_option_1.TimeInterval.YEAR));
                        break;
                    default:
                        searchGroups.push(this._searchService.buildQueryGroup(group.fieldKey.field));
                }
            }
            this._searchService.updateGroups(queryPayload, searchGroups);
        }
        if (sortAggregation || (sortFieldKey && sortFieldKey.field)) {
            var sortOrder = (this.getAttribute('sort-order') || config_option_1.SortOrder.DESCENDING);
            this._searchService.updateSort(queryPayload, sortAggregation || sortFieldKey.field, sortOrder);
        }
        return queryPayload;
    };
    /**
     * Returns the aggregation data from the aggregation elements inside this search element.
     */
    NextCenturySearch.prototype._findSearchAggregations = function () {
        var aggregations = [];
        for (var _i = 0, _a = this.getElementsByTagName('next-century-aggregation'); _i < _a.length; _i++) {
            var aggregationElement = _a[_i];
            var fieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(aggregationElement.getAttribute('aggregation-field-key'));
            var group = aggregationElement.getAttribute('aggregation-group');
            var name_1 = aggregationElement.getAttribute('aggregation-name');
            var type = (aggregationElement.getAttribute('aggregation-type') || config_option_1.AggregationType.COUNT);
            if ((fieldKey || group) && name_1) {
                aggregations.push({
                    fieldKey: fieldKey,
                    group: group,
                    name: name_1,
                    type: type
                });
            }
        }
        return aggregations;
    };
    /**
     * Returns the group data from the group elements inside this search element.
     */
    NextCenturySearch.prototype._findSearchGroups = function () {
        var groups = [];
        for (var _i = 0, _a = this.getElementsByTagName('next-century-group'); _i < _a.length; _i++) {
            var groupElement = _a[_i];
            var fieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(groupElement.getAttribute('group-field-key'));
            var name_2 = groupElement.getAttribute('group-name');
            var type = groupElement.getAttribute('group-type');
            if (fieldKey) {
                groups.push({
                    fieldKey: fieldKey,
                    name: name_2,
                    type: type
                });
            }
        }
        return groups;
    };
    /**
     * Handles the behavior whenever any filters in the whole application are changed by starting a new search query if needed.
     */
    NextCenturySearch.prototype._handleFilterChange = function (callerId) {
        if (!this._isReady()) {
            return;
        }
        // Don't run the search query if the event was sent with this element's ID and if filter-self is false.
        if (callerId === this.getAttribute('id') && this.hasAttribute('enable-ignore-self-filter')) {
            return;
        }
        this.runQuery();
    };
    /**
     * Transforms the given search query results, draws them in the visualization element, and emits an event.
     */
    NextCenturySearch.prototype._handleQuerySuccess = function (queryResults, info) {
        var _this = this;
        var aggregations = this._findSearchAggregations();
        var filterValuesList = this._retrieveSharedFilters().reduce(function (list, filter) {
            return list.concat(filter.retrieveValues());
        }, []);
        var data = queryResults.data.map(function (result) {
            var item = {
                aggregations: aggregations.reduce(function (collection, aggregation) {
                    collection[aggregation.name] = result[aggregation.name];
                    return collection;
                }, {}),
                fields: Object.keys(result).reduce(function (collection, key) {
                    if (aggregations.every(function (aggregation) { return aggregation.name !== key; })) {
                        collection[key] = result[key];
                    }
                    return collection;
                }, {}),
                filtered: _this._isFiltered(result, filterValuesList)
            };
            return item;
        });
        var size = data.length;
        var visElement = this._visInputElement || (this.parentElement ? this.parentElement.querySelector('#' +
            this.getAttribute('vis-element-id')) : null);
        var drawFunction = this.getAttribute('vis-draw-function');
        if (visElement && drawFunction) {
            size = visElement[drawFunction](data);
            size = (typeof size === 'number') ? size : data.length;
        }
        this.dispatchEvent(new CustomEvent('searchFinished', {
            bubbles: true,
            detail: {
                data: data,
                info: info,
                size: size
            }
        }));
    };
    /**
     * Returns if the given result is filtered in the given list of filter values.
     */
    NextCenturySearch.prototype._isFiltered = function (result, filterValuesList) {
        for (var _i = 0, filterValuesList_1 = filterValuesList; _i < filterValuesList_1.length; _i++) {
            var filterValues = filterValuesList_1[_i];
            if (filterValues instanceof filters_1.ListOfValues && this._isFilteredByListOfValues(result, filterValues)) {
                return true;
            }
            if (filterValues instanceof filters_1.BoundsValues && this._isFilteredByBoundsValues(result, filterValues)) {
                return true;
            }
            if (filterValues instanceof filters_1.DomainValues && this._isFilteredByDomainValues(result, filterValues)) {
                return true;
            }
            if (filterValues instanceof filters_1.PairOfValues && this._isFilteredByPairOfValues(result, filterValues)) {
                return true;
            }
            if (filterValues instanceof filters_1.CompoundValues && this._isFilteredByCompoundValues(result, filterValues)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Returns if the given result is filtered in the given bounds values.
     */
    NextCenturySearch.prototype._isFilteredByBoundsValues = function (result, boundsValues) {
        var fieldKey1 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(boundsValues.field1);
        var fieldKey2 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(boundsValues.field2);
        if (fieldKey1 && fieldKey2) {
            var value1 = core_util_1.CoreUtil.deepFind(result, fieldKey1.field);
            var value2 = core_util_1.CoreUtil.deepFind(result, fieldKey2.field);
            if (typeof value1 !== 'undefined' && typeof value2 !== 'undefined' &&
                this._isFilteredWithOperator(value1, '>=', boundsValues.begin1) &&
                this._isFilteredWithOperator(value1, '<=', boundsValues.end1) &&
                this._isFilteredWithOperator(value2, '>=', boundsValues.begin2) &&
                this._isFilteredWithOperator(value2, '<=', boundsValues.end2)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Returns if the given result is filtered in the given compound values.
     */
    NextCenturySearch.prototype._isFilteredByCompoundValues = function (result, compoundValues) {
        var _this = this;
        var isFilteredList = compoundValues.nested.map(function (nested) { return _this._isFiltered(result, [nested]); });
        if (isFilteredList.length) {
            if (compoundValues.type === config_option_1.CompoundFilterType.AND && isFilteredList.every(function (isFiltered) { return isFiltered; })) {
                return true;
            }
            if (compoundValues.type === config_option_1.CompoundFilterType.OR && isFilteredList.some(function (isFiltered) { return isFiltered; })) {
                return true;
            }
        }
        return false;
    };
    /**
     * Returns if the given result is filtered in the given domain values.
     */
    NextCenturySearch.prototype._isFilteredByDomainValues = function (result, domainValues) {
        var fieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(domainValues.field);
        if (fieldKey) {
            var value = core_util_1.CoreUtil.deepFind(result, fieldKey.field);
            if (typeof value !== 'undefined' && this._isFilteredWithOperator(value, '>=', domainValues.begin) &&
                this._isFilteredWithOperator(value, '<=', domainValues.end)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Returns if the given result is filtered in the given list of values.
     */
    NextCenturySearch.prototype._isFilteredByListOfValues = function (result, listOfValues) {
        var _this = this;
        var fieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(listOfValues.field);
        if (fieldKey) {
            var value_1 = core_util_1.CoreUtil.deepFind(result, fieldKey.field);
            if (typeof value_1 !== 'undefined') {
                var isFilteredList = listOfValues.values.map(function (otherValue) {
                    return _this._isFilteredWithOperator(value_1, listOfValues.operator, otherValue);
                });
                if (listOfValues.type === config_option_1.CompoundFilterType.AND && isFilteredList.every(function (isFiltered) { return isFiltered; })) {
                    return true;
                }
                if (listOfValues.type === config_option_1.CompoundFilterType.OR && isFilteredList.some(function (isFiltered) { return isFiltered; })) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Returns if the given result is filtered in the given pair of values.
     */
    NextCenturySearch.prototype._isFilteredByPairOfValues = function (result, pairOfValues) {
        var fieldKey1 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(pairOfValues.field1);
        var fieldKey2 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(pairOfValues.field2);
        if (fieldKey1 && fieldKey2) {
            var value1 = core_util_1.CoreUtil.deepFind(result, fieldKey1.field);
            var value2 = core_util_1.CoreUtil.deepFind(result, fieldKey2.field);
            if (typeof value1 !== 'undefined' && typeof value2 !== 'undefined') {
                var isFiltered1 = this._isFilteredWithOperator(value1, pairOfValues.operator1, pairOfValues.value1);
                var isFiltered2 = this._isFilteredWithOperator(value2, pairOfValues.operator2, pairOfValues.value2);
                if (pairOfValues.type === config_option_1.CompoundFilterType.AND && (isFiltered1 && isFiltered2)) {
                    return true;
                }
                if (pairOfValues.type === config_option_1.CompoundFilterType.OR && (isFiltered1 || isFiltered2)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Returns if the given inputs work with the given operator.
     */
    NextCenturySearch.prototype._isFilteredWithOperator = function (input1, operator, input2) {
        var _this = this;
        if (Array.isArray(input1)) {
            return input1.some(function (value) { return _this._isFilteredWithOperator(value, operator, input2); });
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
    };
    /**
     * Returns if the required properties have been initialized to run a search.
     */
    NextCenturySearch.prototype._isReady = function () {
        return !!(this._dataset && this._filterService && this._searchService && this.getAttribute('search-field-keys') &&
            this.getAttribute('id'));
    };
    /**
     * Unregisters the given old ID and registers the given new ID with the FilterService.
     */
    NextCenturySearch.prototype._registerWithFilterService = function (oldId, newId) {
        if (!this._filterService) {
            return;
        }
        if (oldId) {
            this._filterService.unregisterFilterChangeListener(oldId);
        }
        if (newId) {
            this._filterService.registerFilterChangeListener(newId, this._handleFilterChange.bind(this));
        }
    };
    /**
     * Returns all the search field keys.
     */
    NextCenturySearch.prototype._retrieveFieldKeys = function () {
        var fieldKeyStrings = (this.getAttribute('search-field-keys') || '').split(',');
        return fieldKeyStrings.map(function (fieldKeyString) { return dataset_1.DatasetUtil.deconstructTableOrFieldKey(fieldKeyString); });
    };
    /**
     * Returns the all the filters in the datastore/database/table of the search-field-keys (except the filters matching
     * the _idsToFilterDesigns, unless filter-self is true).
     */
    NextCenturySearch.prototype._retrieveSearchFilters = function () {
        if (!this._isReady()) {
            return [];
        }
        // Retrieve the filters that share this component's filter designs to ignore them if configured with enable-ignore-self-filter.
        var sharedFilters = this.hasAttribute('enable-ignore-self-filter') ? this._retrieveSharedFilters() : [];
        var tableKey = this._retrieveTableKey();
        return !tableKey ? [] : this._filterService.getFiltersToSearch(tableKey.datastore, tableKey.database, tableKey.table, sharedFilters.map(function (filter) { return filter.toDesign(); }));
    };
    /**
     * Returns the filters matching the _idsToFilterDesigns.
     */
    NextCenturySearch.prototype._retrieveSharedFilters = function () {
        if (!this._isReady()) {
            return [];
        }
        var filterDesigns = Array.from(this._idsToFilterDesigns.values())
            .reduce(function (completeFilterDesignList, filterDesignList) { return completeFilterDesignList.concat(filterDesignList); }, []);
        return this._filterService.retrieveCompatibleFilterCollection(filterDesigns).getFilters();
    };
    /**
     * Returns the single search table key.
     *
     * TODO Don't assume that each fieldKey contains the same datastore, database, and table.
     */
    NextCenturySearch.prototype._retrieveTableKey = function () {
        var fieldKeys = this._retrieveFieldKeys();
        return fieldKeys.length ? fieldKeys[0] : null;
    };
    /**
     * Starts the given search query using the current attributes, dataset, and services.
     */
    NextCenturySearch.prototype._startQuery = function (queryPayload, isFiltered) {
        var _this = this;
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
        var tableKey = this._retrieveTableKey();
        var datasetTableKey = tableKey ? this._dataset.retrieveDatasetFieldKey(tableKey) : null;
        var dataHost = datasetTableKey ? datasetTableKey.datastore.host : null;
        var dataType = datasetTableKey ? datasetTableKey.datastore.type : null;
        var labels = datasetTableKey ? datasetTableKey.table.labelOptions : {};
        var hideIfUnfiltered = this.hasAttribute('enable-hide-if-unfiltered');
        // Don't run a search query if it is not possible, or if enable-hide-if-unfiltered is true and the search query is not filtered.
        if (!this._searchService.canRunSearch(dataType, dataHost)) {
            this.dispatchEvent(new CustomEvent('searchFailed', {
                bubbles: true,
                detail: {
                    error: 'Cannot Connect to Datastore',
                    message: 'FAILED ' + this.getAttribute('id')
                }
            }));
        }
        if (hideIfUnfiltered && !isFiltered) {
            // Unsure if this should be success or failure.
            this._handleQuerySuccess({ data: [] }, 'Please Filter');
            return;
        }
        this._searchService.transformFilterClauseValues(queryPayload, labels);
        this._runningQuery = this._searchService.runSearch(dataType, dataHost, queryPayload);
        this._runningQuery.always(function () {
            _this._runningQuery = undefined;
        });
        this._runningQuery.fail(function (response) {
            if (response.statusText === 'abort') {
                _this.dispatchEvent(new CustomEvent('searchCanceled', {
                    bubbles: true,
                    detail: {}
                }));
            }
            else {
                _this.dispatchEvent(new CustomEvent('searchFailed', {
                    bubbles: true,
                    detail: {
                        error: response && !!response.responseJSON ? response.responseJSON.stackTrace : response.responseText,
                        message: 'FAILED ' + _this.getAttribute('id')
                    }
                }));
            }
        });
        this._runningQuery.done(function (response) {
            _this._handleQuerySuccess(_this._searchService.transformQueryResultsValues(response, labels), null);
            _this._runningQuery = undefined;
        });
    };
    NextCenturySearch.DEFAULT_LIMIT = 10;
    NextCenturySearch.ELEMENT_NAME = 'next-century-search';
    return NextCenturySearch;
}(element_web_component_1.NextCenturyElement));
exports.NextCenturySearch = NextCenturySearch;
window.customElements.define(NextCenturySearch.ELEMENT_NAME, NextCenturySearch);
//# sourceMappingURL=search.web-component.js.map