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

import { AbstractFilter, BoundsFilter, CompoundFilter, DomainFilter, ListFilter, PairFilter } from '../models/filters';
import { AggregationType, CompoundFilterType, SortOrder, TimeInterval } from '../models/config-option';
import { DatasetUtil, FieldKey } from '../models/dataset';
import { RequestWrapper } from './connection.service';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface FilterClause { }

export interface SearchObject { }
/* eslint-enable @typescript-eslint/no-empty-interface */

export abstract class AbstractSearchService {
    /**
     * Returns a new compound filter clause using the given list of filter clauses.  If only one filter clause is given, just return that
     * filter clause.
     *
     * @arg {FilterClause[]} filterObjects
     * @arg {CompoundFilterType} [type]
     * @return {FilterClause}
     * @abstract
     */
    public abstract createCompoundFilterClause(filterObjects: FilterClause[], type?: CompoundFilterType): FilterClause;

    /**
     * Returns a new filter clause using the given field, operator, and value.
     *
     * @arg {string} field
     * @arg {string} operator
     * @arg {string} value
     * @return {FilterClause}
     * @abstract
     */
    public abstract createFilterClause(field: FieldKey, operator: string, value: string): FilterClause;

    /**
     * Returns whether the given datastore type and host can run a search.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @return {RequestWrapper}
     * @abstract
     */
    public abstract canRunSearch(datastoreType: string, datastoreHost: string): boolean;

    /**
     * Returns a new search object using the given database, table, and field names.
     *
     * @arg {string} database
     * @arg {string} table
     * @arg {string[]} [fields]
     * @return {SearchObject}
     * @abstract
     */
    public abstract createSearch(database: string, table: string, fields?: string[]): SearchObject;

    /**
     * Returns a filter clause using the given filter.
     *
     * @arg {AbstractFilter}
     * @return {FilterClause}
     */
    public generateFilterClauseFromFilter(filter: AbstractFilter): FilterClause {
        if (filter instanceof BoundsFilter) {
            const fieldKey1: FieldKey = DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey1);
            const fieldKey2: FieldKey = DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey2);
            return this.createCompoundFilterClause([
                this.createFilterClause(fieldKey1, '>=', filter.begin1),
                this.createFilterClause(fieldKey1, '<=', filter.end1),
                this.createFilterClause(fieldKey2, '>=', filter.begin2),
                this.createFilterClause(fieldKey2, '<=', filter.end2)
            ], CompoundFilterType.AND);
        }

        if (filter instanceof DomainFilter) {
            const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey);
            return this.createCompoundFilterClause([
                this.createFilterClause(fieldKey, '>=', filter.begin),
                this.createFilterClause(fieldKey, '<=', filter.end)
            ], CompoundFilterType.AND);
        }

        if (filter instanceof ListFilter) {
            const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey);
            return this.createCompoundFilterClause(filter.values.map((value) =>
                this.createFilterClause(fieldKey, filter.operator, value)), filter.type);
        }

        if (filter instanceof PairFilter) {
            const fieldKey1: FieldKey = DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey1);
            const fieldKey2: FieldKey = DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey2);
            return this.createCompoundFilterClause([
                this.createFilterClause(fieldKey1, filter.operator1, filter.value1),
                this.createFilterClause(fieldKey2, filter.operator2, filter.value2)
            ], filter.type);
        }

        if (filter instanceof CompoundFilter) {
            return this.createCompoundFilterClause(filter.filters.map((nested) => this.generateFilterClauseFromFilter(nested)),
                filter.type);
        }

        return null;
    }

    /**
     * Returns an aggregation label from the given descriptor.
     *
     * @arg {string} [descriptor]
     * @return {string}
     */
    public getAggregationLabel(descriptor?: string): string {
        return descriptor ? ('_' + descriptor) : '_aggregation';
    }

    /**
     * Runs the given search using the given datastore type and host.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @arg {SearchObject} queryPayload
     * @return {RequestWrapper}
     * @abstract
     */
    public abstract runSearch(datastoreType: string, datastoreHost: string, search: SearchObject): RequestWrapper;

    /**
     * Transforms the values in the filter clauses in the given search object using the given map of keys-to-values-to-labels.
     *
     * @arg {SearchObject} search
     * @arg {{ [key: string]: { [value: string]: label } }} keysToValuesToLabels
     * @return {SearchObject}
     * @abstract
     */
    public abstract transformFilterClauseValues(
        search: SearchObject,
        keysToValuesToLabels: { [key: string]: { [value: string]: string } }
    ): SearchObject;

    /**
     * Transforms the given search object into an export object.
     *
     * @arg {{columnName:string,prettyName:string}[]} fields
     * @arg {SearchObject} search
     * @arg {string} uniqueName
     * @return {any}
     * @abstract
     */
    public abstract transformSearchToExport(
        hostName: string,
        dataStoreType: string,
        fields: { columnName: string, prettyName: string }[],
        search: SearchObject,
        uniqueName: string
    ): any;

    /**
     * Transforms the values in the given search results using the given map of keys-to-values-to-labels.
     *
     * @arg {{ data: any[] }} results
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {{ data: any[] }}
     * @abstract
     */
    public abstract transformSearchResultValues(
        results: { data: any[] },
        keysToValuesToLabels: { [key: string]: { [value: string]: string } }
    ): { data: any[] };

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
    public abstract withAggregation(
        searchObject: SearchObject,
        field: FieldKey,
        label: string,
        operation: AggregationType
    ): AbstractSearchService;

    /**
     * Adds a group aggregation to the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {string} group
     * @arg {string} label
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract withAggregationByGroupCount(searchObject: SearchObject, group: string, label: string): AbstractSearchService;

    /**
     * Adds a total count aggregation to the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {string} label
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract withAggregationByTotalCount(searchObject: SearchObject, label: string): AbstractSearchService;

    /**
     * Adds a field to the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {FieldKey} field
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract withField(searchObject: SearchObject, field: FieldKey): AbstractSearchService;

    /**
     * Sets the fields in the given search object to match all fields.
     *
     * @arg {SearchObject} searchObject
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract withAllFields(searchObject: SearchObject): AbstractSearchService;

    /**
     * Sets the filter clause in the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {FilterClause} filterObject
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract withFilter(searchObject: SearchObject, filterObject: FilterClause): AbstractSearchService;

    /**
     * Adds a field group to the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {FieldKey} field
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract withGroup(searchObject: SearchObject, field: FieldKey): AbstractSearchService;

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
    public abstract withGroupByDate(
        searchObject: SearchObject,
        field: FieldKey,
        interval: TimeInterval,
        label?: string
    ): AbstractSearchService;

    /**
     * Sets the limit on the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {number} limit
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract withLimit(searchObject: SearchObject, limit: number): AbstractSearchService;

    /**
     * Sets the offset on the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {number} offset
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract withOffset(searchObject: SearchObject, offset: number): AbstractSearchService;

    /**
     * Adds an order field to the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {FieldKey} field
     * @arg {SortOrder} [order]
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract withOrder(searchObject: SearchObject, field: FieldKey, order?: SortOrder): AbstractSearchService;

    /**
     * Adds an order group to the given search object.
     *
     * @arg {SearchObject} searchObject
     * @arg {string} group
     * @arg {SortOrder} [order]
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract withOrderByOperation(searchObject: SearchObject, group: string, order?: SortOrder): AbstractSearchService;
}
