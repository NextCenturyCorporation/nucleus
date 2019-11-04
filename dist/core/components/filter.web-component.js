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
var element_web_component_1 = require("./element.web-component");
var NextCenturyFilter = /** @class */ (function (_super) {
    __extends(NextCenturyFilter, _super);
    function NextCenturyFilter() {
        var _this = _super.call(this) || this;
        _this._filterDesigns = [];
        _this._handleFilterEventFromVisualizationCallback = _this._handleFilterEventFromVisualization.bind(_this);
        return _this;
    }
    Object.defineProperty(NextCenturyFilter, "observedAttributes", {
        get: function () {
            return ['id'].concat(NextCenturyFilter.requiredAttributes).concat(NextCenturyFilter.optionalAttributes);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NextCenturyFilter, "optionalAttributes", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NextCenturyFilter, "requiredAttributes", {
        get: function () {
            return [
                'filter-type',
                'search-element-id'
            ];
        },
        enumerable: true,
        configurable: true
    });
    NextCenturyFilter.createElement = function (id, attributes) {
        if (!id || NextCenturyFilter.requiredAttributes.some(function (attribute) { return !attributes[attribute]; })) {
            return null;
        }
        var filterElement = document.createElement(NextCenturyFilter.ELEMENT_NAME);
        filterElement.setAttribute('id', id);
        NextCenturyFilter.requiredAttributes.forEach(function (attribute) {
            filterElement.setAttribute(attribute, attributes[attribute]);
        });
        NextCenturyFilter.optionalAttributes.forEach(function (attribute) {
            if (typeof attributes[attribute] !== 'undefined') {
                filterElement.setAttribute(attribute, attributes[attribute]);
            }
        });
        return filterElement;
    };
    NextCenturyFilter.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        _super.prototype.attributeChangedCallback.call(this, name, oldValue, newValue);
        if (!this._isReady()) {
            return;
        }
        if (name === 'vis-element-id') {
            if (this.getAttribute('vis-filter-output-event') && this.parentElement) {
                core_util_1.CoreUtil.updateListener(this._handleFilterEventFromVisualizationCallback, this.parentElement, oldValue, this.getAttribute('vis-filter-output-event'), newValue, this.getAttribute('vis-filter-output-event'));
            }
            return;
        }
        if (name === 'vis-filter-output-event') {
            if (this.getAttribute('vis-element-id') && this.parentElement) {
                core_util_1.CoreUtil.updateListener(this._handleFilterEventFromVisualizationCallback, this.parentElement, this.getAttribute('vis-element-id'), oldValue, this.getAttribute('vis-element-id'), newValue);
            }
            return;
        }
        if (name === 'id') {
            this._registerWithFilterService(oldValue, newValue);
        }
        if (name === 'search-element-id' && this.parentElement) {
            var searchElement = this.parentElement.querySelector('#' + oldValue);
            if (searchElement) {
                searchElement.updateFilterDesigns(this.getAttribute('id'), []);
            }
        }
        this._updateFilterDesigns();
    };
    NextCenturyFilter.prototype.connectedCallback = function () {
        _super.prototype.connectedCallback.call(this);
    };
    NextCenturyFilter.prototype.disconnectedCallback = function () {
        _super.prototype.disconnectedCallback.call(this);
        core_util_1.CoreUtil.removeListener(this._handleFilterEventFromVisualizationCallback, this.parentElement, this.getAttribute('vis-element-id'), this.getAttribute('vis-filter-output-event'));
        if (this.getAttribute('id')) {
            this._registerWithFilterService(this.getAttribute('id'), null);
        }
    };
    /**
     * Initializes this filter element with the given dataset and services (and optional visualization element).
     */
    NextCenturyFilter.prototype.init = function (dataset, filterService, visElement) {
        this._dataset = dataset;
        this._filterService = filterService;
        this._visElement = visElement;
        core_util_1.CoreUtil.addListener(this._handleFilterEventFromVisualizationCallback, this.parentElement, this.getAttribute('vis-element-id'), this.getAttribute('vis-filter-output-event'));
        if (this.getAttribute('id')) {
            this._registerWithFilterService(null, this.getAttribute('id'));
            if (this.getAttribute('filter-type') && this.getAttribute('search-element-id')) {
                this._updateFilterDesigns();
            }
            else {
                console.error('Filter component must have the filter-type and search-element-id attributes!');
            }
        }
        else {
            console.error('Filter component must have an id attribute!');
        }
    };
    /**
     * Updates filters (creates and/or deletes) using the given values.
     */
    NextCenturyFilter.prototype.updateFilters = function (values) {
        if (values === null || (Array.isArray(values) && !values.length)) {
            this._handleDeleteFilters();
        }
        else {
            this._handleExchangeFilters(this._copyArrayOrReturnValue(values));
        }
    };
    /**
     * Returns a copy of the given array or, if not an array, the given value itself.
     */
    NextCenturyFilter.prototype._copyArrayOrReturnValue = function (valueOrArray) {
        return Array.isArray(valueOrArray) ? [].concat(valueOrArray) : valueOrArray;
    };
    /**
     * Returns an array of filter designs with the given values using the current attributes.
     */
    NextCenturyFilter.prototype._createFilterDesigns = function (values) {
        var filterType = this._retrieveFilterType();
        if (this._isFilterTypeList(filterType)) {
            return this._createFilterDesignsOnList(!!this.hasAttribute('list-intersection'), this.getAttribute('list-field-key'), this.getAttribute('list-operator'), values);
        }
        if (this._isFilterTypeBounds(filterType)) {
            return this._createFilterDesignsOnBounds(this.getAttribute('bounds-field-key-x'), this.getAttribute('bounds-field-key-y'), values);
        }
        if (this._isFilterTypeDomain(filterType)) {
            return this._createFilterDesignsOnDomain(this.getAttribute('domain-field-key'), values);
        }
        if (this._isFilterTypePair(filterType)) {
            return this._createFilterDesignsOnPair(!!this.hasAttribute('pair-intersection'), this.getAttribute('pair-field-key-1'), this.getAttribute('pair-field-key-2'), this.getAttribute('pair-operator-1'), this.getAttribute('pair-operator-2'), values);
        }
        console.warn('Filter component ' + this.getAttribute('id') + ' has unexpected filter type:', filterType);
        return [];
    };
    /**
     * Returns an array of zero or more bounds filter design with the given attributes.
     */
    NextCenturyFilter.prototype._createFilterDesignsOnBounds = function (fieldKey1, fieldKey2, values) {
        var _this = this;
        if (fieldKey1 && fieldKey2 && Array.isArray(values) && values.length) {
            // Handle a nested array like [[1, 2, 3, 4], [5, 6, 7, 8]]
            if (Array.isArray(values[0])) {
                return values.map(function (value) { return _this._createFilterDesignsOnBounds(fieldKey1, fieldKey2, value); })
                    .reduce(function (list, part) { return list.concat(part); }, []);
            }
            // Handle a single array like [1, 2, 3, 4]
            if (values.length === 4) {
                return [new filters_1.BoundsFilterDesign(fieldKey1, fieldKey2, values[0], values[1], values[2], values[3])];
            }
        }
        console.warn('Filter component ' + this.getAttribute('id') + ' has unexpected bounds values:', values);
        return [];
    };
    /**
     * Returns an array of zero or more domain filter design with the given attributes.
     */
    NextCenturyFilter.prototype._createFilterDesignsOnDomain = function (fieldKey, values) {
        var _this = this;
        if (fieldKey && Array.isArray(values) && values.length) {
            // Handle a nested array like [[1, 2], [3, 4]]
            if (Array.isArray(values[0])) {
                return values.map(function (value) { return _this._createFilterDesignsOnDomain(fieldKey, value); })
                    .reduce(function (list, part) { return list.concat(part); }, []);
            }
            // Handle a single array like [1, 2]
            if (values.length === 2) {
                return [new filters_1.DomainFilterDesign(fieldKey, values[0], values[1])];
            }
        }
        console.warn('Filter component ' + this.getAttribute('id') + ' has unexpected domain values:', values);
        return [];
    };
    /**
     * Returns an array of zero or more list filter design with the given attributes.
     */
    NextCenturyFilter.prototype._createFilterDesignsOnList = function (intersection, fieldKey, operator, values) {
        var _this = this;
        if (fieldKey && operator && !!(Array.isArray(values) ? values.length : values)) {
            // Handle a nested array like [[a, b], [c], [d, e, f]]
            if (Array.isArray(values) && values.some(function (value) { return Array.isArray(value); })) {
                return values.map(function (value) { return _this._createFilterDesignsOnList(intersection, fieldKey, operator, value); })
                    .reduce(function (list, part) { return list.concat(part); }, []);
            }
            // Handle a single value or array like "a" or [a, b, c, d]
            return [new filters_1.ListFilterDesign(intersection ? config_option_1.CompoundFilterType.AND : config_option_1.CompoundFilterType.OR, fieldKey, operator, Array.isArray(values) ? values : [values])];
        }
        console.warn('Filter component ' + this.getAttribute('id') + ' has unexpected list values:', values);
        return [];
    };
    /**
     * Returns an array of zero or more pair filter design with the given attributes.
     */
    NextCenturyFilter.prototype._createFilterDesignsOnPair = function (intersection, fieldKey1, fieldKey2, operator1, operator2, values) {
        var _this = this;
        if (fieldKey1 && fieldKey2 && operator1 && operator2 && Array.isArray(values) && values.length) {
            // Handle a nested array like [[a, b], [c, d]]
            if (Array.isArray(values[0])) {
                return values.map(function (value) {
                    return _this._createFilterDesignsOnPair(intersection, fieldKey1, fieldKey2, operator1, operator2, value);
                })
                    .reduce(function (list, part) { return list.concat(part); }, []);
            }
            // Handle a single array like [a, b]
            if (values.length === 2) {
                return [new filters_1.PairFilterDesign(intersection ? config_option_1.CompoundFilterType.AND : config_option_1.CompoundFilterType.OR, fieldKey1, fieldKey2, operator1, operator2, values[0], values[1])];
            }
        }
        console.warn('Filter component ' + this.getAttribute('id') + ' has unexpected pair values:', values);
        return [];
    };
    /**
     * Deletes all the filters in the FilterService with the given filter designs.
     */
    NextCenturyFilter.prototype._deleteFilters = function (filterDesigns) {
        this._filterService.deleteFilters(this.getAttribute('search-element-id'), filterDesigns);
        this.dispatchEvent(new CustomEvent('filtersChanged', {
            bubbles: true,
            detail: {
                filters: []
            }
        }));
    };
    /**
     * Returns values to create blank/empty filter designs.
     */
    NextCenturyFilter.prototype._generateFilterDesignValues = function (filterType) {
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
    };
    /**
     * Handles the behavior to delete all the filters associated with this filter element in the FilterService.
     */
    NextCenturyFilter.prototype._handleDeleteFilters = function (values) {
        if (this._isReady()) {
            var filterDesigns = this._createFilterDesigns(typeof values !== 'undefined' ? values :
                this._generateFilterDesignValues(this._retrieveFilterType()));
            if (filterDesigns.length) {
                this._deleteFilters(filterDesigns);
            }
        }
    };
    /**
     * Handles the behavior to exchange all the filters associated with this filter element in the FilterService.
     */
    NextCenturyFilter.prototype._handleExchangeFilters = function (values) {
        if (this._isReady()) {
            var filterDesigns = this._createFilterDesigns(values);
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
    };
    /**
     * Handles the behavior whenever any filters in the whole application are changed by giving the relevant filter values to the
     * visualization element as needed.
     */
    NextCenturyFilter.prototype._handleFilterChangeFromServices = function (caller) {
        var _this = this;
        if (!this._isReady()) {
            return;
        }
        var visElement = this._visElement || (this.parentElement.querySelector('#' + this.getAttribute('vis-element-id')));
        var filterFunction = this.getAttribute('vis-filter-input-function');
        var filterCollection = this._filterService.retrieveCompatibleFilterCollection(this._filterDesigns);
        var filters = filterCollection.getFilters();
        var filterValuesList = filters.reduce(function (list, filter) { return list.concat(filter.retrieveValues()); }, []);
        var values = filterValuesList.map(function (filterValues) { return _this._retrieveValuesFromFilterValues(filterValues); });
        var copyOfValueOrArray = this._copyArrayOrReturnValue(values);
        if (Array.isArray(values) && values.length && Array.isArray(values[0])) {
            copyOfValueOrArray = values.map(function (value) { return _this._copyArrayOrReturnValue(value); });
        }
        if (visElement && filterFunction) {
            visElement[filterFunction](copyOfValueOrArray);
        }
        this.dispatchEvent(new CustomEvent('valuesFiltered', {
            bubbles: true,
            detail: {
                caller: caller,
                values: copyOfValueOrArray
            }
        }));
    };
    /**
     * Handles the behavior whenever any filter values are emitted from the visualization element by adding or removing filters as needed.
     */
    NextCenturyFilter.prototype._handleFilterEventFromVisualization = function (event) {
        if (event && event.detail && typeof event.detail.values !== 'undefined') {
            this.updateFilters(event.detail.values);
        }
    };
    /**
     * Returns if the current attributes of this filter element correspond to a bounds filter.
     */
    NextCenturyFilter.prototype._isFilterTypeBounds = function (filterType) {
        return !!(filterType === 'bounds' && this.getAttribute('bounds-field-key-x') && this.getAttribute('bounds-field-key-y'));
    };
    /**
     * Returns if the current attributes of this filter element correspond to a domain filter.
     */
    NextCenturyFilter.prototype._isFilterTypeDomain = function (filterType) {
        return !!(filterType === 'domain' && this.getAttribute('domain-field-key'));
    };
    /**
     * Returns if the current attributes of this filter element correspond to a list filter.
     */
    NextCenturyFilter.prototype._isFilterTypeList = function (filterType) {
        return !!(filterType === 'list' && this.getAttribute('list-field-key') && this.getAttribute('list-operator'));
    };
    /**
     * Returns if the current attributes of this filter element correspond to a pair filter.
     */
    NextCenturyFilter.prototype._isFilterTypePair = function (filterType) {
        return !!(filterType === 'pair' && this.getAttribute('pair-field-key-1') && this.getAttribute('pair-field-key-2') &&
            this.getAttribute('pair-operator-1') && this.getAttribute('pair-operator-2'));
    };
    /**
     * Returns if the required properties have been initialized to create a filter.
     */
    NextCenturyFilter.prototype._isReady = function () {
        var filterType = this._retrieveFilterType();
        return !!(this._dataset && this._filterService && this.getAttribute('id') && this.getAttribute('search-element-id') &&
            filterType && (this._isFilterTypeBounds(filterType) || this._isFilterTypeDomain(filterType) ||
            this._isFilterTypeList(filterType) || this._isFilterTypePair(filterType)));
    };
    /**
     * Unregisters the given old ID and registers the given new ID with the FilterService.
     */
    NextCenturyFilter.prototype._registerWithFilterService = function (oldId, newId) {
        if (!this._filterService) {
            return;
        }
        if (oldId) {
            this._filterService.unregisterFilterChangeListener(oldId);
        }
        if (newId) {
            this._filterService.registerFilterChangeListener(newId, this._handleFilterChangeFromServices.bind(this));
        }
    };
    /**
     * Returns the current filter type attribute of this filter element.
     */
    NextCenturyFilter.prototype._retrieveFilterType = function () {
        return (this.getAttribute('filter-type') || '').toLowerCase();
    };
    /**
     * Returns the boolean/number/string values from the given list of FilterValues.
     */
    NextCenturyFilter.prototype._retrieveValuesFromFilterValues = function (filterValues) {
        var _this = this;
        if (filterValues instanceof filters_1.ListOfValues) {
            return filterValues.values;
        }
        if (filterValues instanceof filters_1.BoundsValues) {
            return [
                filterValues.begin1,
                filterValues.begin2,
                filterValues.end1,
                filterValues.end2
            ];
        }
        if (filterValues instanceof filters_1.DomainValues) {
            return [filterValues.begin, filterValues.end];
        }
        if (filterValues instanceof filters_1.PairOfValues) {
            return [filterValues.value1, filterValues.value2];
        }
        if (filterValues instanceof filters_1.CompoundValues) {
            return filterValues.nested.map(function (nested) { return _this._retrieveValuesFromFilterValues([nested]); });
        }
        console.warn('Filter component ' + this.getAttribute('id') + ' has unexpected filter values:', filterValues);
        return [];
    };
    /**
     * Updates the filter designs using the current attributes, gives them to the search element, emits an event, and deletes all the old
     * filters created by this filter element.
     */
    NextCenturyFilter.prototype._updateFilterDesigns = function () {
        if (this._isReady() && this.parentElement) {
            var searchElement = this.parentElement.querySelector('#' + this.getAttribute('search-element-id'));
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
    };
    NextCenturyFilter.ELEMENT_NAME = 'next-century-filter';
    return NextCenturyFilter;
}(element_web_component_1.NextCenturyElement));
exports.NextCenturyFilter = NextCenturyFilter;
window.customElements.define(NextCenturyFilter.ELEMENT_NAME, NextCenturyFilter);
//# sourceMappingURL=filter.web-component.js.map