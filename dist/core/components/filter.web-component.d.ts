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
import { Dataset } from '../models/dataset';
import { FilterService } from '../services/filter.service';
import { NextCenturyElement } from './element.web-component';
export declare class NextCenturyFilter extends NextCenturyElement {
    static ELEMENT_NAME: string;
    private _dataset;
    private _filterDesigns;
    private _filterService;
    private _visElement;
    private _handleFilterEventFromVisualizationCallback;
    static readonly observedAttributes: string[];
    static readonly optionalAttributes: string[];
    static readonly requiredAttributes: string[];
    static createElement(id: string, attributes: Record<string, any>): NextCenturyFilter;
    constructor();
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Initializes this filter element with the given dataset and services (and optional visualization element).
     */
    init(dataset: Dataset, filterService: FilterService, visElement?: any): void;
    /**
     * Updates filters (creates and/or deletes) using the given values.
     */
    updateFilters(values: any | any[]): void;
    /**
     * Returns a copy of the given array or, if not an array, the given value itself.
     */
    private _copyArrayOrReturnValue;
    /**
     * Returns an array of filter designs with the given values using the current attributes.
     */
    private _createFilterDesigns;
    /**
     * Returns an array of zero or more bounds filter design with the given attributes.
     */
    private _createFilterDesignsOnBounds;
    /**
     * Returns an array of zero or more domain filter design with the given attributes.
     */
    private _createFilterDesignsOnDomain;
    /**
     * Returns an array of zero or more list filter design with the given attributes.
     */
    private _createFilterDesignsOnList;
    /**
     * Returns an array of zero or more pair filter design with the given attributes.
     */
    private _createFilterDesignsOnPair;
    /**
     * Deletes all the filters in the FilterService with the given filter designs.
     */
    private _deleteFilters;
    /**
     * Returns values to create blank/empty filter designs.
     */
    private _generateFilterDesignValues;
    /**
     * Handles the behavior to delete all the filters associated with this filter element in the FilterService.
     */
    private _handleDeleteFilters;
    /**
     * Handles the behavior to exchange all the filters associated with this filter element in the FilterService.
     */
    private _handleExchangeFilters;
    /**
     * Handles the behavior whenever any filters in the whole application are changed by giving the relevant filter values to the
     * visualization element as needed.
     */
    private _handleFilterChangeFromServices;
    /**
     * Handles the behavior whenever any filter values are emitted from the visualization element by adding or removing filters as needed.
     */
    private _handleFilterEventFromVisualization;
    /**
     * Returns if the current attributes of this filter element correspond to a bounds filter.
     */
    private _isFilterTypeBounds;
    /**
     * Returns if the current attributes of this filter element correspond to a domain filter.
     */
    private _isFilterTypeDomain;
    /**
     * Returns if the current attributes of this filter element correspond to a list filter.
     */
    private _isFilterTypeList;
    /**
     * Returns if the current attributes of this filter element correspond to a pair filter.
     */
    private _isFilterTypePair;
    /**
     * Returns if the required properties have been initialized to create a filter.
     */
    private _isReady;
    /**
     * Unregisters the given old ID and registers the given new ID with the FilterService.
     */
    private _registerWithFilterService;
    /**
     * Returns the current filter type attribute of this filter element.
     */
    private _retrieveFilterType;
    /**
     * Returns the boolean/number/string values from the given list of FilterValues.
     */
    private _retrieveValuesFromFilterValues;
    /**
     * Updates the filter designs using the current attributes, gives them to the search element, emits an event, and deletes all the old
     * filters created by this filter element.
     */
    private _updateFilterDesigns;
}
