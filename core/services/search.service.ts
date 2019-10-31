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
import { ConnectionService, CoreConnection, RequestWrapper } from './connection.service';

import { query } from 'neon-framework';

export class CoreQueryWrapper implements QueryPayload {
    /* eslint-disable-next-line no-shadow */
    constructor(public query: query.Query) { }
}

export class CoreGroupWrapper implements QueryGroup {
    constructor(public group: string | query.GroupByFunctionClause) { }
}

export class CoreWhereWrapper implements FilterClause {
    constructor(public where: query.WherePredicate) { }
}

interface ExportField {
    query: string;
    pretty: string;
}

export class SearchService extends AbstractSearchService {
    constructor(private connectionService: ConnectionService) {
        super();
    }

    /**
     * Returns a new compound filter clause using the given list of filter clauses.  If only one filter clause is given, just return that
     * filter clause.
     *
     * @arg {CoreWhereWrapper[]} filterClauses
     * @arg {CompoundFilterType} [type=CompoundFilterType.AND]
     * @return {CoreWhereWrapper}
     * @abstract
     */
    public buildCompoundFilterClause(
        filterClauses: CoreWhereWrapper[],
        type: CompoundFilterType = CompoundFilterType.AND
    ): CoreWhereWrapper {
        if (!filterClauses.length) {
            return null;
        }
        if (filterClauses.length === 1) {
            return filterClauses[0];
        }
        let wheres = filterClauses.map((filterClause) => (filterClause).where);
        return new CoreWhereWrapper(type === CompoundFilterType.AND ? query.and.apply(query, wheres) :
            query.or.apply(query, wheres));
    }

    /**
     * Returns a new query group using the given group date field and time interval.
     *
     * @arg {string} groupField
     * @arg {TimeInterval} interval
     * @arg {string} [name]
     * @return {CoreGroupWrapper}
     * @override
     */
    public buildDateQueryGroup(groupField: string, interval: TimeInterval, name?: string): CoreGroupWrapper {
        return new CoreGroupWrapper(new query.GroupByFunctionClause('' + interval, groupField, name || ('_' + interval)));
    }

    /**
     * Returns a new filter clause using the given field, operator, and value.
     *
     * @arg {string} field
     * @arg {string} operator
     * @arg {string} value
     * @return {CoreWhereWrapper}
     * @override
     */
    public buildFilterClause(field: string, operator: string, value: string): CoreWhereWrapper {
        return new CoreWhereWrapper(query.where(field, operator, value));
    }

    /**
     * Returns a new query group using the given group field.
     *
     * @arg {string} groupField
     * @return {CoreGroupWrapper}
     * @override
     */
    public buildQueryGroup(groupField: string): CoreGroupWrapper {
        return new CoreGroupWrapper(groupField);
    }

    /**
     * Returns a new search query payload using the given database, table, and field names.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {string[]} [fieldNames=[]]
     * @return {CoreQueryWrapper}
     * @override
     */
    public buildQueryPayload(databaseName: string, tableName: string, fieldNames: string[] = []): CoreQueryWrapper {
        let queryObject: query.Query = new query.Query().selectFrom(databaseName, tableName);
        if (fieldNames.length) {
            queryObject.withFields(fieldNames);
        }
        return new CoreQueryWrapper(queryObject);
    }

    /**
     * Returns whether the given datastore type and host can run a search.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @return {RequestWrapper}
     * @override
     */
    public canRunSearch(datastoreType: string, datastoreHost: string): boolean {
        return !!(this.connectionService.connect(datastoreType, datastoreHost));
    }

    /**
     * Finds and returns the export fields from the fields, groupByClauses, and aggregates in the given export query object.
     * Assumes activeFields does not have duplicates.
     *
     * @arg {query.Query} exportQuery
     * @arg {{columnName:string,prettyName:string}[]} activeFields
     * @return {ExportField[]}
     * @private
     */
    private findExportFields(exportQuery: any, activeFields: { columnName: string, prettyName: string }[]): ExportField[] {
        // Use all activeFields if the exportQuery fields are a wildcard.
        let isWildcard: boolean = (exportQuery.fields.length === 1 && exportQuery.fields[0] === '*');

        // Save each activeField that is a field from the exportQuery in the export fields.
        let queryFields: ExportField[] =
            (
                isWildcard ?
                    activeFields :
                    activeFields.filter((activeField) =>
                        exportQuery.fields.some((exportFieldName) =>
                            exportFieldName === activeField.columnName))
            )
                .map((activeField) => ({
                    query: activeField.columnName,
                    pretty: activeField.prettyName
                } as ExportField));

        // Save each group function from the exportQuery in the export fields.
        let groupFields: ExportField[] = exportQuery.groupByClauses.filter((group) => group.type === 'function').map((group) => {
            // Remove the field of each group function from the queryFields.
            queryFields = queryFields.filter((field) => field.query !== group.field);
            return {
                query: group.name,
                pretty: this.transformDateGroupOperatorToPrettyName(group.operation, group.field, activeFields)
            } as ExportField;
        });

        // Save each aggregation field from the exportQuery in the export fields.
        let aggregationFields: ExportField[] = exportQuery.aggregates.map((aggregate) => {
            // Remove the field of each non-COUNT aggregation from the queryFields.
            /* eslint-disable-next-line dot-notation */
            if (aggregate.operation !== query['COUNT']) {
                queryFields = queryFields.filter((field) => field.query !== aggregate.field);
            }

            return {
                query: aggregate.name,
                pretty: this.transformAggregationOperatorToPrettyName(aggregate.operation, aggregate.field, activeFields)
            } as ExportField;
        });

        return queryFields.concat(groupFields).concat(aggregationFields);
    }

    /**
     * Runs the given search using the given datastore type and host.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @arg {CoreQueryWrapper} queryPayload
     * @return {RequestWrapper}
     * @override
     */
    public runSearch(datastoreType: string, datastoreHost: string, queryPayload: CoreQueryWrapper): RequestWrapper {
        let connection: CoreConnection<CoreQueryWrapper> = this.connectionService.connect(datastoreType, datastoreHost);
        return connection ? connection.runSearchQuery(queryPayload, null) : null;
    }

    private transformAggregationOperatorToPrettyName(
        aggregationOperator: string,
        aggregationField: string,
        fields: { columnName: string, prettyName: string }[]
    ): string {
        let prettyName = (fields.filter((field) => field.columnName === aggregationField)[0] || {} as any).prettyName;

        /* eslint-disable dot-notation */
        switch (aggregationOperator) {
            case query['AVG']:
                return 'Average' + (prettyName ? (' ' + prettyName) : '');
            case query['COUNT']:
                return 'Count' + (prettyName ? (' ' + prettyName) : '');
            case query['MAX']:
                return 'Maximum' + (prettyName ? (' ' + prettyName) : '');
            case query['MIN']:
                return 'Minimum' + (prettyName ? (' ' + prettyName) : '');
            case query['SUM']:
                return 'Sum' + (prettyName ? (' ' + prettyName) : '');
        }
        /* eslint-enable dot-notation */
        return '';
    }

    private transformAggregationType(type: AggregationType): string {
        /* eslint-disable dot-notation */
        switch (type) {
            case AggregationType.AVG:
                return query['AVG'];
            case AggregationType.COUNT:
                return query['COUNT'];
            case AggregationType.MAX:
                return query['MAX'];
            case AggregationType.MIN:
                return query['MIN'];
            case AggregationType.SUM:
                return query['SUM'];
        }
        /* eslint-enable dot-notation */
        return '';
    }

    private transformDateGroupOperatorToPrettyName(
        groupOperator: string,
        groupField: string,
        fields: { columnName: string, prettyName: string }[]
    ): string {
        let prettyName = (fields.filter((field) => field.columnName === groupField)[0] || {} as any).prettyName;
        switch (groupOperator) {
            case 'minute':
                return 'Minute' + (prettyName ? (' ' + prettyName) : '');
            case 'hour':
                return 'Hour' + (prettyName ? (' ' + prettyName) : '');
            case 'dayOfMonth':
                return 'Day' + (prettyName ? (' ' + prettyName) : '');
            case 'month':
                return 'Month' + (prettyName ? (' ' + prettyName) : '');
            case 'year':
                return 'Year' + (prettyName ? (' ' + prettyName) : '');
        }
        return '';
    }

    /**
     * Transforms the values in the filter clauses in the given search query payload using the given map of keys-to-values-to-labels.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {CoreQueryWrapper}
     * @override
     */
    public transformFilterClauseValues(queryPayload: CoreQueryWrapper,
        keysToValuesToLabels: { [key: string]: { [value: string]: string } }): CoreQueryWrapper {
        /* eslint-disable-next-line dot-notation */
        let wherePredicate: query.WherePredicate = queryPayload.query['filter'].whereClause;

        if (wherePredicate) {
            this.transformWherePredicateNestedValues(wherePredicate, keysToValuesToLabels);
        }

        return queryPayload;
    }

    /**
     * Transforms the given search query payload into an object to export.
     *
     * @arg {{columnName:string,prettyName:string}[]} fields
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {string} uniqueName
     * @return {any}
     * @override
     */
    public transformQueryPayloadToExport(
        hostName: string,
        dataStoreType: string,
        fields: { columnName: string, prettyName: string }[],
        queryPayload: CoreQueryWrapper,
        uniqueName: string
    ): any {
        return {
            data: {
                // IgnoreFilters: undefined,
                // ignoredFilterIds: [],
                fileName: uniqueName,
                dataStoreType: dataStoreType,
                hostName: hostName,
                query: queryPayload.query,
                fieldNamePrettyNamePairs: this.findExportFields(queryPayload.query, fields)
                // SelectionOnly: undefined,
                // type: 'query'
            }
        };
    }

    /**
     * Transforms the values in the given search query results using the given map of keys-to-values-to-labels.
     *
     * @arg {{ data: any[] }} queryResults
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {{ data: any[] }}
     * @override
     */
    public transformQueryResultsValues(queryResults: { data: any[] },
        keysToValuesToLabels: { [key: string]: { [value: string]: string } }): { data: any[] } {
        let transformedResults = [];
        for (let result of queryResults.data) {
            let transformedResult = {};
            for (let key of Object.keys(result)) {
                transformedResult[key] = result[key];
                if (keysToValuesToLabels[key]) {
                    let value = transformedResult[key];
                    if (value instanceof Array) {
                        transformedResult[key] = value.map((element) => keysToValuesToLabels[key][element] || element);
                    } else {
                        transformedResult[key] = keysToValuesToLabels[key][value] || value;
                    }
                }
            }
            transformedResults.push(transformedResult);
        }
        return {
            data: transformedResults
        };
    }

    /**
     * Transforms the values in the given WherePredicate using the given map of keys-to-values-to-labels.
     *
     * @arg {query.WherePredicate} wherePredicate
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     */
    private transformWherePredicateNestedValues(
        wherePredicate: query.WherePredicate,
        keysToValuesToLabels: { [key: string]: { [value: string]: string } }
    ): void {
        switch (wherePredicate.type) {
            case 'and':
            case 'or':
                for (let nestedWherePredicate of wherePredicate.whereClauses) {
                    this.transformWherePredicateNestedValues(nestedWherePredicate, keysToValuesToLabels);
                }
                break;
            case 'where':
                this.transformWherePredicateValues(wherePredicate, keysToValuesToLabels);
                break;
        }
    }

    private transformWherePredicateValues(
        wherePredicate: query.WherePredicate,
        keysToValuesToLabels: { [key: string]: { [value: string]: string } }
    ): void {
        let keys = Object.keys(keysToValuesToLabels);
        let key = wherePredicate.lhs;
        if (keys.includes(key)) {
            let valuesToLabels = keysToValuesToLabels[key];
            let values = Object.keys(valuesToLabels);
            for (let value of values) {
                if (valuesToLabels[value] === wherePredicate.rhs) {
                    wherePredicate.rhs = value;
                }
            }
        }
    }

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
    public updateAggregation(queryPayload: CoreQueryWrapper, type: AggregationType, name: string, field: string): AbstractSearchService {
        queryPayload.query.aggregate(this.transformAggregationType(type), field, name);
        return this;
    }

    // TODO THOR-950 Temp function
    /**
     * Sets the fields data in the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {string[]} fields
     * @return {AbstractSearchService}
     * @override
     */
    public updateFields(queryPayload: CoreQueryWrapper, fields: string[]): AbstractSearchService {
        let existingFields: string[] = (queryPayload.query as any).fields;
        queryPayload.query.withFields((existingFields.length === 1 && existingFields[0] === '*') ? fields : existingFields.concat(fields));
        return this;
    }

    /**
     * Sets the fields data in the given search query payload to match all fields.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @return {AbstractSearchService}
     * @override
     */
    public updateFieldsToMatchAll(queryPayload: CoreQueryWrapper): AbstractSearchService {
        queryPayload.query.withFields('*');
        return this;
    }

    /**
     * Sets the filter clause data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {CoreWhereWrapper} filterClause
     * @return {AbstractSearchService}
     * @override
     */
    public updateFilter(queryPayload: CoreQueryWrapper, filterClause: CoreWhereWrapper): AbstractSearchService {
        if (filterClause) {
            queryPayload.query.where(filterClause.where);
        }
        return this;
    }

    /**
     * Sets the group data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {CoreGroupWrapper[]} groupClauses
     * @return {AbstractSearchService}
     * @override
     */
    public updateGroups(queryPayload: CoreQueryWrapper, groupClauses: CoreGroupWrapper[]): AbstractSearchService {
        queryPayload.query.groupBy(groupClauses.map((groupClause) => groupClause.group));
        return this;
    }

    /**
     * Sets the limit data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {number} limit
     * @return {AbstractSearchService}
     * @override
     */
    public updateLimit(queryPayload: CoreQueryWrapper, limit: number): AbstractSearchService {
        queryPayload.query.limit(limit);
        return this;
    }

    /**
     * Sets the offset data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {number} offset
     * @return {AbstractSearchService}
     * @override
     */
    public updateOffset(queryPayload: CoreQueryWrapper, offset: number): AbstractSearchService {
        queryPayload.query.offset(offset);
        return this;
    }

    /**
     * Sets the sort data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {string} field
     * @arg {SortOrder} [order=SortOrder.ASCENDING]
     * @return {AbstractSearchService}
     * @override
     */
    public updateSort(queryPayload: CoreQueryWrapper, field: string, order: SortOrder = SortOrder.ASCENDING): AbstractSearchService {
        /* eslint-disable-next-line dot-notation */
        queryPayload.query.sortBy(field, order === SortOrder.ASCENDING ? query['ASCENDING'] : query['DESCENDING']);
        return this;
    }
}
