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
import { AbstractSearchService, FilterClause, SearchObject } from './abstract.search.service';
import { AggregationType, CompoundFilterType, SortOrder, TimeInterval } from '../models/config-option';
import { ConnectionService, RequestWrapper } from './connection.service';
import { FieldKey } from '../models/dataset';
declare class CoreFieldClause {
    database: string;
    table: string;
    field: string;
    constructor(database: string, table: string, field: string);
}
export declare abstract class CoreFilterClause implements FilterClause {
    type: string;
    constructor(type: string);
}
declare abstract class CoreAggregateClause {
    type: string;
    constructor(type: string);
}
declare abstract class CoreGroupByClause {
    type: string;
    constructor(type: string);
}
declare abstract class CoreOrderByClause {
    type: string;
    constructor(type: string);
}
export declare class CoreSearch implements SearchObject {
    selectClause: {
        database: string;
        table: string;
        fieldClauses: CoreFieldClause[];
    };
    whereClause: CoreFilterClause;
    aggregateClauses: CoreAggregateClause[];
    groupByClauses: CoreGroupByClause[];
    orderByClauses: CoreOrderByClause[];
    limitClause: {
        limit: number;
    };
    offsetClause: {
        offset: number;
    };
    isDistinct: boolean;
    constructor(database: string, table: string, fields?: string[]);
}
export declare class SearchService extends AbstractSearchService {
    private connectionService;
    constructor(connectionService: ConnectionService);
    /**
     * Returns a new compound filter clause using the given list of filter clauses.  If only one filter clause is given, just return that
     * filter clause.
     *
     * @arg {CoreFilterClause[]} filterObjects
     * @arg {CompoundFilterType} [type=CompoundFilterType.AND]
     * @return {CoreFilterClause}
     * @abstract
     */
    createCompoundFilterClause(filterObjects: CoreFilterClause[], type?: CompoundFilterType): CoreFilterClause;
    /**
     * Returns a new filter clause using the given field, operator, and value.
     *
     * @arg {string} field
     * @arg {string} operator
     * @arg {string} value
     * @return {CoreFilterClause}
     * @override
     */
    createFilterClause(field: FieldKey, operator: string, value: string): CoreFilterClause;
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
     * Returns a new search object using the given database, table, and field names.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {string[]} [fieldNames=[]]
     * @return {CoreSearch}
     * @override
     */
    createSearch(database: string, table: string, fields?: string[]): CoreSearch;
    /**
     * Runs the given search using the given datastore type and host.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @arg {CoreSearch} searchObject
     * @return {RequestWrapper}
     * @override
     */
    runSearch(datastoreType: string, datastoreHost: string, searchObject: CoreSearch): RequestWrapper;
    /**
     * Transforms the values in the filter clauses in the given search object using the given map of keys-to-values-to-labels.
     *
     * @arg {CoreSearch} searchObject
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {CoreSearch}
     * @override
     */
    transformFilterClauseValues(searchObject: CoreSearch, keysToValuesToLabels: {
        [key: string]: {
            [value: string]: string;
        };
    }): CoreSearch;
    /**
     * Transforms the given search object into an export object.
     *
     * @arg {{columnName:string,prettyName:string}[]} fields
     * @arg {CoreSearch} searchObject
     * @arg {string} uniqueName
     * @return {any}
     * @override
     */
    transformSearchToExport(hostName: string, dataStoreType: string, fields: {
        columnName: string;
        prettyName: string;
    }[], searchObject: CoreSearch, uniqueName: string): any;
    /**
     * Transforms the values in the given search results using the given map of keys-to-values-to-labels.
     *
     * @arg {{ data: any[] }} queryResults
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {{ data: any[] }}
     * @override
     */
    transformSearchResultValues(results: {
        data: any[];
    }, keysToValuesToLabels: {
        [key: string]: {
            [value: string]: string;
        };
    }): {
        data: any[];
    };
    /**
     * Adds an aggregation to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {FieldKey} field
     * @arg {string} label
     * @arg {AggregationType} operation
     * @return {AbstractSearchService}
     * @override
     */
    withAggregation(searchObject: CoreSearch, field: FieldKey, label: string, operation: AggregationType): AbstractSearchService;
    /**
     * Adds a field to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {FieldKey} field
     * @return {AbstractSearchService}
     * @override
     */
    withField(searchObject: CoreSearch, field: FieldKey): AbstractSearchService;
    /**
     * Sets the fields in the given search object to match all fields.
     *
     * @arg {CoreSearch} searchObject
     * @return {AbstractSearchService}
     * @override
     */
    withAllFields(searchObject: CoreSearch): AbstractSearchService;
    /**
     * Sets the filter clause in the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {CoreFilterClause} filterObject
     * @return {AbstractSearchService}
     * @override
     */
    withFilter(searchObject: CoreSearch, filterObject: CoreFilterClause): AbstractSearchService;
    /**
     * Adds a group aggregation to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {string} group
     * @arg {string} label
     * @return {AbstractSearchService}
     * @override
     */
    withGroupAggregation(searchObject: CoreSearch, group: string, label: string): AbstractSearchService;
    /**
     * Adds a date group to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {FieldKey} field
     * @arg {TimeInterval} interval
     * @arg {string} [label]
     * @return {AbstractSearchService}
     * @override
     */
    withGroupDate(searchObject: CoreSearch, field: FieldKey, interval: TimeInterval, label?: string): AbstractSearchService;
    /**
     * Adds a field group to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {FieldKey} field
     * @return {AbstractSearchService}
     * @override
     */
    withGroupField(searchObject: CoreSearch, field: FieldKey): AbstractSearchService;
    /**
     * Sets the limit on the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {number} limit
     * @return {AbstractSearchService}
     * @override
     */
    withLimit(searchObject: CoreSearch, limit: number): AbstractSearchService;
    /**
     * Sets the offset on the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {number} offset
     * @return {AbstractSearchService}
     * @override
     */
    withOffset(searchObject: CoreSearch, offset: number): AbstractSearchService;
    /**
     * Adds an order field to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {FieldKey} field
     * @arg {SortOrder} [order=SortOrder.ASCENDING]
     * @return {AbstractSearchService}
     * @override
     */
    withOrderField(searchObject: CoreSearch, field: FieldKey, order?: SortOrder): AbstractSearchService;
    /**
     * Adds an order group to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {string} group
     * @arg {SortOrder} [order=SortOrder.ASCENDING]
     * @return {AbstractSearchService}
     * @override
     */
    withOrderGroup(searchObject: CoreSearch, group: string, order?: SortOrder): AbstractSearchService;
    /**
     * Adds a total count aggregation to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {string} label
     * @return {AbstractSearchService}
     * @override
     */
    withTotalCountAggregation(searchObject: CoreSearch, label: string): AbstractSearchService;
    /**
     * Finds and returns the export fields from the fields, groups, and aggregates in the given export query object.
     * Assumes activeFields does not have duplicates.
     *
     * @arg {CoreSearch} exportQuery
     * @arg {{columnName:string,prettyName:string}[]} activeFields
     * @return {ExportField[]}
     * @private
     */
    private _findExportFields;
    private _transformAggregationOperationToPrettyName;
    private _transformAggregationOperation;
    private _transformDateGroupOperationToPrettyName;
    private _transformFieldKeyToFieldClause;
    private _transformFieldToPrettyName;
    private _transformSortOrder;
    /**
     * Transforms the values in the given FilterClause using the given map of keys-to-values-to-labels.
     *
     * @arg {CoreFilterClause} whereClause
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     */
    private _transformFilterClauseNestedValues;
    private _transformFilterClauseValues;
}
export {};
