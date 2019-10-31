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

export interface QueryGroup { }

export interface QueryPayload { }
/* eslint-enable @typescript-eslint/no-empty-interface */

export abstract class AbstractSearchService {
    /**
     * Returns a new compound filter clause using the given list of filter clauses.  If only one filter clause is given, just return that
     * filter clause.
     *
     * @arg {FilterClause[]} filterClauses
     * @arg {CompoundFilterType} [type]
     * @return {FilterClause}
     * @abstract
     */
    public abstract buildCompoundFilterClause(filterClauses: FilterClause[], type?: CompoundFilterType): FilterClause;

    /**
     * Returns a new query group using the given group date field and time interval.
     *
     * @arg {string} groupField
     * @arg {TimeInterval} interval
     * @arg {string} [name]
     * @return {QueryGroup}
     * @abstract
     */
    public abstract buildDateQueryGroup(groupField: string, interval: TimeInterval, name?: string): QueryGroup;

    /**
     * Returns a new filter clause using the given field, operator, and value.
     *
     * @arg {string} field
     * @arg {string} operator
     * @arg {string} value
     * @return {FilterClause}
     * @abstract
     */
    public abstract buildFilterClause(field: string, operator: string, value: string): FilterClause;

    /**
     * Returns a new query group using the given group field.
     *
     * @arg {string} groupField
     * @return {QueryGroup}
     * @abstract
     */
    public abstract buildQueryGroup(groupField: string): QueryGroup;

    /**
     * Returns a new search query payload using the given database, table, and field names.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {string[]} [fieldNames]
     * @return {QueryPayload}
     * @abstract
     */
    public abstract buildQueryPayload(databaseName: string, tableName: string, fieldNames?: string[]): QueryPayload;

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
     * Returns a filter clause using the given filter.
     *
     * @arg {AbstractFilter}
     * @return {FilterClause}
     */
    public generateFilterClauseFromFilter(filter: AbstractFilter): FilterClause {
        if (filter instanceof BoundsFilter) {
            const fieldKey1: FieldKey = DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey1);
            const fieldKey2: FieldKey = DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey2);
            return this.buildCompoundFilterClause([
                this.buildFilterClause(fieldKey1.field, '>=', filter.begin1),
                this.buildFilterClause(fieldKey1.field, '<=', filter.end1),
                this.buildFilterClause(fieldKey2.field, '>=', filter.begin2),
                this.buildFilterClause(fieldKey2.field, '<=', filter.end2)
            ], CompoundFilterType.AND);
        }

        if (filter instanceof DomainFilter) {
            const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey);
            return this.buildCompoundFilterClause([
                this.buildFilterClause(fieldKey.field, '>=', filter.begin),
                this.buildFilterClause(fieldKey.field, '<=', filter.end)
            ], CompoundFilterType.AND);
        }

        if (filter instanceof ListFilter) {
            const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey);
            return this.buildCompoundFilterClause(filter.values.map((value) =>
                this.buildFilterClause(fieldKey.field, filter.operator, value)), filter.type);
        }

        if (filter instanceof PairFilter) {
            const fieldKey1: FieldKey = DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey1);
            const fieldKey2: FieldKey = DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey2);
            return this.buildCompoundFilterClause([
                this.buildFilterClause(fieldKey1.field, filter.operator1, filter.value1),
                this.buildFilterClause(fieldKey2.field, filter.operator2, filter.value2)
            ], filter.type);
        }

        if (filter instanceof CompoundFilter) {
            return this.buildCompoundFilterClause(filter.filters.map((nested) => this.generateFilterClauseFromFilter(nested)),
                filter.type);
        }

        return null;
    }

    /**
     * Returns an aggregation name from the given descriptor.
     *
     * @arg {string} [descriptor]
     * @return {string}
     */
    public getAggregationName(descriptor?: string): string {
        return descriptor ? ('_' + descriptor) : '_aggregation';
    }

    /**
     * Runs the given search using the given datastore type and host.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @arg {QueryPayload} queryPayload
     * @return {RequestWrapper}
     * @abstract
     */
    public abstract runSearch(datastoreType: string, datastoreHost: string, queryPayload: QueryPayload): RequestWrapper;

    /**
     * Transforms the values in the filter clauses in the given search query payload using the given map of keys-to-values-to-labels.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {{ [key: string]: { [value: string]: label } }} keysToValuesToLabels
     * @return {QueryPayload}
     * @abstract
     */
    public abstract transformFilterClauseValues(queryPayload: QueryPayload,
        keysToValuesToLabels: { [key: string]: { [value: string]: string } }
    ): QueryPayload;

    /**
     * Transforms the given search query payload into an object to export.
     *
     * @arg {{columnName:string,prettyName:string}[]} fields
     * @arg {QueryPayload} queryPayload
     * @arg {string} uniqueName
     * @return {any}
     * @abstract
     */
    public abstract transformQueryPayloadToExport(
        hostName: string,
        dataStoreType: string,
        fields: { columnName: string, prettyName: string }[],
        queryPayload: QueryPayload,
        uniqueName: string
    ): any;

    /**
     * Transforms the values in the given search query results using the given map of keys-to-values-to-labels.
     *
     * @arg {{ data: any[] }} queryResults
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {{ data: any[] }}
     * @abstract
     */
    public abstract transformQueryResultsValues(queryResults: { data: any[] },
        keysToValuesToLabels: { [key: string]: { [value: string]: string } }
    ): { data: any[] };

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
    public abstract updateAggregation(queryPayload: QueryPayload, type: AggregationType, name: string,
        field: string): AbstractSearchService;

    /**
     * Sets the fields data in the given search query payload.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {string[]} fields
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract updateFields(queryPayload: QueryPayload, fields: string[]): AbstractSearchService;

    /**
     * Sets the fields data in the given search query payload to match all fields.
     *
     * @arg {QueryPayload} queryPayload
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract updateFieldsToMatchAll(queryPayload: QueryPayload): AbstractSearchService;

    /**
     * Sets the filter clause data on the given search query payload.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {FilterClause} filterClause
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract updateFilter(queryPayload: QueryPayload, filterClause: FilterClause): AbstractSearchService;

    /**
     * Sets the group data on the given search query payload.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {QueryGroup[]} groups
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract updateGroups(queryPayload: QueryPayload, groups: QueryGroup[]): AbstractSearchService;

    /**
     * Sets the limit data on the given search query payload.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {number} limit
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract updateLimit(queryPayload: QueryPayload, limit: number): AbstractSearchService;

    /**
     * Sets the offset data on the given search query payload.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {number} offset
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract updateOffset(queryPayload: QueryPayload, offset: number): AbstractSearchService;

    /**
     * Sets the sort data on the given search query payload.
     *
     * @arg {QueryPayload} queryPayload
     * @arg {string} field
     * @arg {SortOrder} [order]
     * @return {AbstractSearchService}
     * @abstract
     */
    public abstract updateSort(queryPayload: QueryPayload, field: string, order?: SortOrder): AbstractSearchService;
}
