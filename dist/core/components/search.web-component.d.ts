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
import { AbstractFilter, AbstractFilterDesign } from '../models/filters';
import { AbstractSearchService } from '../services/abstract.search.service';
import { Dataset } from '../models/dataset';
import { FilterService } from '../services/filter.service';
import { NextCenturyElement } from './element.web-component';
export declare class NextCenturySearch extends NextCenturyElement {
    static DEFAULT_LIMIT: number;
    static ELEMENT_NAME: string;
    private _dataset;
    private _filterService;
    private _idsToFilters;
    private _idsToFilterDesigns;
    private _runningQuery;
    private _searchService;
    private _visInputElement;
    static readonly observedAttributes: string[];
    static readonly optionalAttributes: string[];
    static readonly requiredAttributes: string[];
    static createElement(id: string, attributes: Record<string, any>): NextCenturySearch;
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Creates and returns the export data for the search query built by this search element using the AbstractSearchService.
     */
    createExportData(exportFields: {
        columnName: string;
        prettyName: string;
    }[], filename: string): {
        name: string;
        data: any;
    }[];
    /**
     * Initializes this search element with the given dataset and services and starts a new search query if possible (and optional
     * visualization element).
     */
    init(dataset: Dataset, filterService: FilterService, searchService: AbstractSearchService, options?: any): void;
    /**
     * Updates the unshared filters of this search element with the given filters.
     */
    updateFilters(id: string, filters: AbstractFilter[]): void;
    /**
     * Updates the filter designs of this search element (used to find shared filters) with the given filter designs.
     */
    updateFilterDesigns(id: string, filterDesigns: AbstractFilterDesign[]): void;
    /**
     * Returns the search query with its fields, aggregations, groups, filters, and sort.
     */
    private _buildQuery;
    /**
     * Returns the aggregation data from the aggregation elements inside this search element.
     */
    private _findSearchAggregations;
    /**
     * Returns the group data from the group elements inside this search element.
     */
    private _findSearchGroups;
    /**
     * Handles the behavior whenever any filters in the whole application are changed by starting a new search query if needed.
     */
    private _handleFilterChange;
    /**
     * Transforms the given search query results, draws them in the visualization element, and emits an event.
     */
    private _handleQuerySuccess;
    /**
     * Returns if the given result is filtered in the given list of filter values.
     */
    private _isFiltered;
    /**
     * Returns if the given result is filtered in the given bounds values.
     */
    private _isFilteredByBoundsValues;
    /**
     * Returns if the given result is filtered in the given compound values.
     */
    private _isFilteredByCompoundValues;
    /**
     * Returns if the given result is filtered in the given domain values.
     */
    private _isFilteredByDomainValues;
    /**
     * Returns if the given result is filtered in the given list of values.
     */
    private _isFilteredByListOfValues;
    /**
     * Returns if the given result is filtered in the given pair of values.
     */
    private _isFilteredByPairOfValues;
    /**
     * Returns if the given inputs work with the given operator.
     */
    private _isFilteredWithOperator;
    /**
     * Returns if the required properties have been initialized to run a search.
     */
    private _isReady;
    /**
     * Unregisters the given old ID and registers the given new ID with the FilterService.
     */
    private _registerWithFilterService;
    /**
     * Returns all the search field keys.
     */
    private _retrieveFieldKeys;
    /**
     * Returns the all the filters in the datastore/database/table of the search-field-keys (except the filters matching
     * the _idsToFilterDesigns, unless filter-self is true).
     */
    private _retrieveSearchFilters;
    /**
     * Returns the filters matching the _idsToFilterDesigns.
     */
    private _retrieveSharedFilters;
    /**
     * Returns the single search table key.
     *
     * TODO Don't assume that each fieldKey contains the same datastore, database, and table.
     */
    private _retrieveTableKey;
    /**
     * Runs the given search query using the current attributes, dataset, and services.
     */
    private _runQuery;
    /**
     * Starts a new search query using the current attributes and filters in the FilterService.
     */
    private _startQuery;
}
