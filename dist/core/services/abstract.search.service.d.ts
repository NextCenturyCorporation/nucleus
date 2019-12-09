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
import { FieldKey } from '../models/dataset';
import { RequestWrapper } from './connection.service';
export interface FilterClause {
}
export interface SearchObject {
}
export declare abstract class AbstractSearchService {
    /**
     * Returns a new compound filter clause using the given list of filter clauses.  If only one filter clause is given, just return that
     * filter clause.
     *
     * @arg {FilterClause[]} filterObjects
     * @arg {CompoundFilterType} [type]
     * @return {FilterClause}
     * @abstract
     */
    abstract createCompoundFilterClause(filterObjects: FilterClause[], type?: CompoundFilterType): FilterClause;
    /**
     * Returns a new filter clause using the given field, operator, and value.
     *
     * @arg {string} field
     * @arg {string} operator
     * @arg {string} value
     * @return {FilterClause}
     * @abstract
     */
    abstract createFilterClause(field: FieldKey, operator: string, value: string): FilterClause;
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
     * Returns a new search object using the given database, table, and field names.
     *
     * @arg {string} database
     * @arg {string} table
     * @arg {string[]} [fields]
     * @return {SearchObject}
     * @abstract
     */
    abstract createSearch(database: string, table: string, fields?: string[]): SearchObject;
    /**
     * Returns a filter clause using the given filter.
     *
     * @arg {AbstractFilter}
     * @return {FilterClause}
     */
    generateFilterClauseFromFilter(filter: AbstractFilter): FilterClause;
    /**
     * Returns an aggregation label from the given descriptor.
     *
     * @arg {string} [descriptor]
     * @return {string}
     */
    getAggregationLabel(descriptor?: string): string;
    /**
     * Runs the given search using the given datastore type and host.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @arg {SearchObject} queryPayload
     * @return {RequestWrapper}
     * @abstract
     */
    abstract runSearch(datastoreType: string, datastoreHost: string, search: SearchObject): RequestWrapper;
    /**
     * Transforms the values in the filter clauses in the given search object using the given map of keys-to-values-to-labels.
     *
     * @arg {SearchObject} search
     * @arg {{ [key: string]: { [value: string]: label } }} keysToValuesToLabels
     * @return {SearchObject}
     * @abstract
     */
    abstract transformFilterClauseValues(search: SearchObject, keysToValuesToLabels: {
        [key: string]: {
            [value: string]: string;
        };
    }): SearchObject;
    /**
     * Transforms the given search object into an export object.
     *
     * @arg {{columnName:string,prettyName:string}[]} fields
     * @arg {SearchObject} search
     * @arg {string} uniqueName
     * @return {any}
     * @abstract
     */
    abstract transformSearchToExport(hostName: string, dataStoreType: string, fields: {
        columnName: string;
        prettyName: string;
    }[], search: SearchObject, uniqueName: string): any;
    /**
     * Transforms the values in the given search results using the given map of keys-to-values-to-labels.
     *
     * @arg {{ data: any[] }} results
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {{ data: any[] }}
     * @abstract
     */
    abstract transformSearchResultValues(results: {
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
     * @arg {SearchObject} searchObject
     * @arg {FieldKey} field
     * @arg {string} label
     * @arg {AggregationType} operation
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract withAggregation(searchObject: SearchObject, field: FieldKey, label: string, operation: AggregationType): AbstractSearchService;
    /**
     * Adds a group aggregation to the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {string} group
     * @arg {string} label
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract withAggregationByGroupCount(searchObject: SearchObject, group: string, label: string): AbstractSearchService;
    /**
     * Adds a total count aggregation to the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {string} label
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract withAggregationByTotalCount(searchObject: SearchObject, label: string): AbstractSearchService;
    /**
     * Adds a field to the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {FieldKey} field
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract withField(searchObject: SearchObject, field: FieldKey): AbstractSearchService;
    /**
     * Sets the fields in the given search object to match all fields.
     *
     * @arg {SearchObject} searchObject
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract withAllFields(searchObject: SearchObject): AbstractSearchService;
    /**
     * Sets the filter clause in the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {FilterClause} filterObject
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract withFilter(searchObject: SearchObject, filterObject: FilterClause): AbstractSearchService;
    /**
     * Adds a field group to the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {FieldKey} field
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract withGroup(searchObject: SearchObject, field: FieldKey): AbstractSearchService;
    /**
     * Adds a date group to the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {FieldKey} field
     * @arg {TimeInterval} interval
     * @arg {string} [label]
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract withGroupByDate(searchObject: SearchObject, field: FieldKey, interval: TimeInterval, label?: string): AbstractSearchService;
    /**
     * Adds a join clause to the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {string} type
     * @arg {string} database
     * @arg {string} table
     * @arg {FieldKey} field1
     * @arg {string} operator
     * @arg {FieldKey} field2
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract withJoin(searchObject: SearchObject, type: string, database: string, table: string, field1: FieldKey, operator: string, field2: FieldKey): AbstractSearchService;
    /**
     * Sets the limit on the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {number} limit
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract withLimit(searchObject: SearchObject, limit: number): AbstractSearchService;
    /**
     * Sets the offset on the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {number} offset
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract withOffset(searchObject: SearchObject, offset: number): AbstractSearchService;
    /**
     * Adds an order field to the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {FieldKey} field
     * @arg {SortOrder} [order]
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract withOrder(searchObject: SearchObject, field: FieldKey, order?: SortOrder): AbstractSearchService;
    /**
     * Adds an order group to the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {string} group
     * @arg {SortOrder} [order]
     * @return {AbstractSearchService}
     * @abstract
     */
    abstract withOrderByOperation(searchObject: SearchObject, group: string, order?: SortOrder): AbstractSearchService;
}
