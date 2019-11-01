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
import { AbstractSearchService, FilterClause, QueryGroup, QueryPayload } from './abstract.search.service';
import { AggregationType, CompoundFilterType, SortOrder, TimeInterval } from '../models/config-option';
import { ConnectionService, RequestWrapper } from './connection.service';
import { query } from 'neon-framework';
export declare class CoreQueryWrapper implements QueryPayload {
    query: query.Query;
    constructor(query: query.Query);
}
export declare class CoreGroupWrapper implements QueryGroup {
    group: string | query.GroupByFunctionClause;
    constructor(group: string | query.GroupByFunctionClause);
}
export declare class CoreWhereWrapper implements FilterClause {
    where: query.WherePredicate;
    constructor(where: query.WherePredicate);
}
export declare class SearchService extends AbstractSearchService {
    private connectionService;
    constructor(connectionService: ConnectionService);
    /**
     * Returns a new compound filter clause using the given list of filter clauses.  If only one filter clause is given, just return that
     * filter clause.
     *
     * @arg {CoreWhereWrapper[]} filterClauses
     * @arg {CompoundFilterType} [type=CompoundFilterType.AND]
     * @return {CoreWhereWrapper}
     * @abstract
     */
    buildCompoundFilterClause(filterClauses: CoreWhereWrapper[], type?: CompoundFilterType): CoreWhereWrapper;
    /**
     * Returns a new query group using the given group date field and time interval.
     *
     * @arg {string} groupField
     * @arg {TimeInterval} interval
     * @arg {string} [name]
     * @return {CoreGroupWrapper}
     * @override
     */
    buildDateQueryGroup(groupField: string, interval: TimeInterval, name?: string): CoreGroupWrapper;
    /**
     * Returns a new filter clause using the given field, operator, and value.
     *
     * @arg {string} field
     * @arg {string} operator
     * @arg {string} value
     * @return {CoreWhereWrapper}
     * @override
     */
    buildFilterClause(field: string, operator: string, value: string): CoreWhereWrapper;
    /**
     * Returns a new query group using the given group field.
     *
     * @arg {string} groupField
     * @return {CoreGroupWrapper}
     * @override
     */
    buildQueryGroup(groupField: string): CoreGroupWrapper;
    /**
     * Returns a new search query payload using the given database, table, and field names.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {string[]} [fieldNames=[]]
     * @return {CoreQueryWrapper}
     * @override
     */
    buildQueryPayload(databaseName: string, tableName: string, fieldNames?: string[]): CoreQueryWrapper;
    /**
     * Returns whether the given datastore type and host can run a search.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @return {RequestWrapper}
     * @override
     */
    canRunSearch(datastoreType: string, datastoreHost: string): boolean;
    /**
     * Finds and returns the export fields from the fields, groupByClauses, and aggregates in the given export query object.
     * Assumes activeFields does not have duplicates.
     *
     * @arg {query.Query} exportQuery
     * @arg {{columnName:string,prettyName:string}[]} activeFields
     * @return {ExportField[]}
     * @private
     */
    private findExportFields;
    /**
     * Runs the given search using the given datastore type and host.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @arg {CoreQueryWrapper} queryPayload
     * @return {RequestWrapper}
     * @override
     */
    runSearch(datastoreType: string, datastoreHost: string, queryPayload: CoreQueryWrapper): RequestWrapper;
    private transformAggregationOperatorToPrettyName;
    private transformAggregationType;
    private transformDateGroupOperatorToPrettyName;
    /**
     * Transforms the values in the filter clauses in the given search query payload using the given map of keys-to-values-to-labels.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {CoreQueryWrapper}
     * @override
     */
    transformFilterClauseValues(queryPayload: CoreQueryWrapper, keysToValuesToLabels: {
        [key: string]: {
            [value: string]: string;
        };
    }): CoreQueryWrapper;
    /**
     * Transforms the given search query payload into an object to export.
     *
     * @arg {{columnName:string,prettyName:string}[]} fields
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {string} uniqueName
     * @return {any}
     * @override
     */
    transformQueryPayloadToExport(hostName: string, dataStoreType: string, fields: {
        columnName: string;
        prettyName: string;
    }[], queryPayload: CoreQueryWrapper, uniqueName: string): any;
    /**
     * Transforms the values in the given search query results using the given map of keys-to-values-to-labels.
     *
     * @arg {{ data: any[] }} queryResults
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {{ data: any[] }}
     * @override
     */
    transformQueryResultsValues(queryResults: {
        data: any[];
    }, keysToValuesToLabels: {
        [key: string]: {
            [value: string]: string;
        };
    }): {
        data: any[];
    };
    /**
     * Transforms the values in the given WherePredicate using the given map of keys-to-values-to-labels.
     *
     * @arg {query.WherePredicate} wherePredicate
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     */
    private transformWherePredicateNestedValues;
    private transformWherePredicateValues;
    /**
     * Sets the aggregation data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {AggregationType} type
     * @arg {string} name
     * @arg {string} field
     * @return {AbstractSearchService}
     * @override
     */
    updateAggregation(queryPayload: CoreQueryWrapper, type: AggregationType, name: string, field: string): AbstractSearchService;
    /**
     * Sets the fields data in the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {string[]} fields
     * @return {AbstractSearchService}
     * @override
     */
    updateFields(queryPayload: CoreQueryWrapper, fields: string[]): AbstractSearchService;
    /**
     * Sets the fields data in the given search query payload to match all fields.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @return {AbstractSearchService}
     * @override
     */
    updateFieldsToMatchAll(queryPayload: CoreQueryWrapper): AbstractSearchService;
    /**
     * Sets the filter clause data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {CoreWhereWrapper} filterClause
     * @return {AbstractSearchService}
     * @override
     */
    updateFilter(queryPayload: CoreQueryWrapper, filterClause: CoreWhereWrapper): AbstractSearchService;
    /**
     * Sets the group data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {CoreGroupWrapper[]} groupClauses
     * @return {AbstractSearchService}
     * @override
     */
    updateGroups(queryPayload: CoreQueryWrapper, groupClauses: CoreGroupWrapper[]): AbstractSearchService;
    /**
     * Sets the limit data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {number} limit
     * @return {AbstractSearchService}
     * @override
     */
    updateLimit(queryPayload: CoreQueryWrapper, limit: number): AbstractSearchService;
    /**
     * Sets the offset data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {number} offset
     * @return {AbstractSearchService}
     * @override
     */
    updateOffset(queryPayload: CoreQueryWrapper, offset: number): AbstractSearchService;
    /**
     * Sets the sort data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {string} field
     * @arg {SortOrder} [order=SortOrder.ASCENDING]
     * @return {AbstractSearchService}
     * @override
     */
    updateSort(queryPayload: CoreQueryWrapper, field: string, order?: SortOrder): AbstractSearchService;
}
