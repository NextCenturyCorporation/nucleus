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
import { AbstractFilter } from '../models/filters';
import { AggregationType, CompoundFilterType, SortOrder, TimeInterval } from '../models/config-option';
import { RequestWrapper } from './connection.service';
export interface FilterClause {
}
export interface QueryGroup {
}
export interface QueryPayload {
}
export declare abstract class AbstractSearchService {
    /**
     * Returns a new compound filter clause using the given list of filter clauses.  If only one filter clause is given, just return that
     * filter clause.
     *
     * @arg {FilterClause[]} filterClauses
     * @arg {CompoundFilterType} [type]
     * @return {FilterClause}
     * @abstract
     */
    abstract buildCompoundFilterClause(filterClauses: FilterClause[], type?: CompoundFilterType): FilterClause;
    /**
     * Returns a new query group using the given group date field and time interval.
     *
     * @arg {string} groupField
     * @arg {TimeInterval} interval
     * @arg {string} [name]
     * @return {QueryGroup}
     * @abstract
     */
    abstract buildDateQueryGroup(groupField: string, interval: TimeInterval, name?: string): QueryGroup;
    /**
     * Returns a new filter clause using the given field, operator, and value.
     *
     * @arg {string} field
     * @arg {string} operator
     * @arg {string} value
     * @return {FilterClause}
     * @abstract
     */
    abstract buildFilterClause(field: string, operator: string, value: string): FilterClause;
    /**
     * Returns a new query group using the given group field.
     *
     * @arg {string} groupField
     * @return {QueryGroup}
     * @abstract
     */
    abstract buildQueryGroup(groupField: string): QueryGroup;
    /**
     * Returns a new search query payload using the given database, table, and field names.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {string[]} [fieldNames]
     * @return {QueryPayload}
     * @abstract
     */
    abstract buildQueryPayload(databaseName: string, tableName: string, fieldNames?: string[]): QueryPayload;
    /**
     * Returns whether the given datastore type and host can run a search.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @return {RequestWrapper}
     * @abstract
     */
    abstract canRunSearch(datastoreType: string, datastoreHost: string): boolean;
    /**
     * Returns a filter clause using the given filter.
     *
     * @arg {AbstractFilter}
     * @return {FilterClause}
     */
    generateFilterClauseFromFilter(filter: AbstractFilter): FilterClause;
    /**
     * Returns an aggregation name from the given descriptor.
     *
     * @arg {string} [descriptor]
     * @return {string}
     */
    getAggregationName(descriptor?: string): string;
    /**
     * Runs the given search using the given datastore type and host.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @arg {QueryPayload} queryPayload
     * @return {RequestWrapper}
     * @abstract
     */
    abstract runSearch(datastoreType: string, datastoreHost: string, queryPayload: QueryPayload): RequestWrapper;
    /**
     * Transforms the values in the filter clauses in the given search query payload using the given map of keys-to-values-to-labels.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {{ [key: string]: { [value: string]: label } }} keysToValuesToLabels
     * @return {QueryPayload}
     * @abstract
     */
    abstract transformFilterClauseValues(queryPayload: QueryPayload, keysToValuesToLabels: {
        [key: string]: {
            [value: string]: string;
        };
    }): QueryPayload;
    /**
     * Transforms the given search query payload into an object to export.
     *
     * @arg {{columnName:string,prettyName:string}[]} fields
     * @arg {QueryPayload} queryPayload
     * @arg {string} uniqueName
     * @return {any}
     * @abstract
     */
    abstract transformQueryPayloadToExport(hostName: string, dataStoreType: string, fields: {
        columnName: string;
        prettyName: string;
    }[], queryPayload: QueryPayload, uniqueName: string): any;
    /**
     * Transforms the values in the given search query results using the given map of keys-to-values-to-labels.
     *
     * @arg {{ data: any[] }} queryResults
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {{ data: any[] }}
     * @abstract
     */
    abstract transformQueryResultsValues(queryResults: {
        data: any[];
    }, keysToValuesToLabels: {
        [key: string]: {
            [value: string]: string;
        };
    }): {
        data: any[];
    };
    /**
     * Sets the aggregation data on the given search query payload.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {AggregationType} type
     * @arg {string} name
     * @arg {string} field
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract updateAggregation(queryPayload: QueryPayload, type: AggregationType, name: string, field: string): AbstractSearchService;
    /**
     * Sets the fields data in the given search query payload.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {string[]} fields
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract updateFields(queryPayload: QueryPayload, fields: string[]): AbstractSearchService;
    /**
     * Sets the fields data in the given search query payload to match all fields.
     *
     * @arg {QueryPayload} queryPayload
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract updateFieldsToMatchAll(queryPayload: QueryPayload): AbstractSearchService;
    /**
     * Sets the filter clause data on the given search query payload.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {FilterClause} filterClause
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract updateFilter(queryPayload: QueryPayload, filterClause: FilterClause): AbstractSearchService;
    /**
     * Sets the group data on the given search query payload.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {QueryGroup[]} groups
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract updateGroups(queryPayload: QueryPayload, groups: QueryGroup[]): AbstractSearchService;
    /**
     * Sets the limit data on the given search query payload.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {number} limit
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract updateLimit(queryPayload: QueryPayload, limit: number): AbstractSearchService;
    /**
     * Sets the offset data on the given search query payload.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {number} offset
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract updateOffset(queryPayload: QueryPayload, offset: number): AbstractSearchService;
    /**
     * Sets the sort data on the given search query payload.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {string} field
     * @arg {SortOrder} [order]
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract updateSort(queryPayload: QueryPayload, field: string, order?: SortOrder): AbstractSearchService;
}
