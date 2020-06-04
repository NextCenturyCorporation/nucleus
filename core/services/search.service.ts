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
import { ConnectionService, CoreConnection } from './connection.service';
import { FieldKey } from '../models/dataset';

class CoreFieldClause {
    constructor(public database: string, public table: string, public field: string) {}
}

export abstract class CoreFilterClause implements FilterClause {
    constructor(public type: string) {}
}

class CoreSingularFilterClause extends CoreFilterClause {
    constructor(public lhs: CoreFieldClause, public operator: string, public rhs: any) {
        super('where');
    }
}

class CoreFieldsFilterClause extends CoreFilterClause {
    constructor(public lhs: CoreFieldClause, public operator: string, public rhs: CoreFieldClause) {
        super('fields');
    }
}

abstract class CoreCompoundFilterClause extends CoreFilterClause {
    constructor(type: string, public whereClauses: CoreFilterClause[]) {
        super(type);
    }
}

class CoreAndFilterClause extends CoreCompoundFilterClause {
    constructor(whereClauses: CoreFilterClause[]) {
        super('and', whereClauses);
    }
}

class CoreOrFilterClause extends CoreCompoundFilterClause {
    constructor(whereClauses: CoreFilterClause[]) {
        super('or', whereClauses);
    }
}

abstract class CoreAggregateClause {
    constructor(public type: string) {}
}

class CoreAggregateByFieldClause extends CoreAggregateClause {
    constructor(public fieldClause: CoreFieldClause, public label: string, public operation: string) {
        super('field');
    }
}

class CoreAggregateByGroupCountClause extends CoreAggregateClause {
    constructor(public group: string, public label: string) {
        super('group');
    }
}

class CoreAggregateByTotalCountClause extends CoreAggregateClause {
    constructor(public label: string) {
        super('total');
    }
}

abstract class CoreGroupByClause {
    constructor(public type: string) {}
}

class CoreGroupByFieldClause extends CoreGroupByClause {
    constructor(public fieldClause: CoreFieldClause) {
        super('field');
    }
}

class CoreGroupByOperationClause extends CoreGroupByClause {
    constructor(public fieldClause: CoreFieldClause, public label: string, public operation: string) {
        super('operation');
    }
}

abstract class CoreOrderByClause {
    constructor(public type: string) {}
}

class CoreOrderByFieldClause extends CoreOrderByClause {
    constructor(public fieldClause: CoreFieldClause, public order: number) {
        super('field');
    }
}

class CoreOrderByOperationClause extends CoreOrderByClause {
    constructor(public operation: string, public order: number) {
        super('operation');
    }
}

export class CoreSearch implements SearchObject {
    public selectClause: { database: string, table: string, fieldClauses: CoreFieldClause[] };
    public whereClause: CoreFilterClause = null;
    public aggregateClauses: CoreAggregateClause[] = [];
    public groupByClauses: CoreGroupByClause[] = [];
    public orderByClauses: CoreOrderByClause[] = [];
    public limitClause: { limit: number } = null;
    public offsetClause: { offset: number } = null;
    public joinClauses: { database: string, table: string, type: string, onClause: CoreFilterClause }[] = [];
    public isDistinct: boolean = false;

    constructor(database: string, table: string, fields: string[] = []) {
        this.selectClause = {
            database,
            table,
            fieldClauses: fields.map((field) => new CoreFieldClause(database, table, field))
        };
    }
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
     * @arg {CoreFilterClause[]} filterObjects
     * @arg {CompoundFilterType} [type=CompoundFilterType.AND]
     * @return {CoreFilterClause}
     * @override
     */
    public createCompoundFilterClause(
        filterObjects: CoreFilterClause[],
        type: CompoundFilterType = CompoundFilterType.AND
    ): CoreFilterClause {
        if (filterObjects.length === 1) {
            return filterObjects[0];
        }
        if (filterObjects.length) {
            if (type === CompoundFilterType.AND) {
                return new CoreAndFilterClause(filterObjects);
            }
            if (type === CompoundFilterType.OR) {
                return new CoreOrFilterClause(filterObjects);
            }
        }
        return null;
    }

    /**
     * Returns a new filter clause using the given field, operator, and value.
     *
     * @arg {string} field
     * @arg {string} operator
     * @arg {string} value
     * @return {CoreFilterClause}
     * @override
     */
    public createFilterClause(field: FieldKey, operator: string, value: string): CoreFilterClause {
        return new CoreSingularFilterClause(this._transformFieldKeyToFieldClause(field), operator, value);
    }

    /**
     * Returns whether the given datastore type and host can run a search.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @return {boolean}
     * @override
     */
    public canRunSearch(datastoreType: string, datastoreHost: string): boolean {
        return !!(this.connectionService.connect(datastoreType, datastoreHost));
    }

    /**
     * Returns a new search object using the given database, table, and field names.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {string[]} [fieldNames=[]]
     * @return {CoreSearch}
     * @override
     */
    public createSearch(database: string, table: string, fields: string[] = []): CoreSearch {
        return new CoreSearch(database, table, fields);
    }

    /**
     * Runs the given search using the given datastore type and host.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @arg {CoreSearch} searchObject
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @override
     */
    public runSearch(
        datastoreType: string,
        datastoreHost: string,
        searchObject: CoreSearch,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): XMLHttpRequest {
        let connection: CoreConnection<CoreSearch> = this.connectionService.connect(datastoreType, datastoreHost);
        return connection ? connection.runSearch(searchObject, onSuccess, onError) : null;
    }

    /**
     * Transforms the values in the filter clauses in the given search object using the given map of keys-to-values-to-labels.
     *
     * @arg {CoreSearch} searchObject
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {CoreSearch}
     * @override
     */
    public transformFilterClauseValues(
        searchObject: CoreSearch,
        keysToValuesToLabels: { [key: string]: { [value: string]: string } }
    ): CoreSearch {
        if (searchObject.whereClause) {
            this._transformFilterClauseNestedValues(searchObject.whereClause, keysToValuesToLabels);
        }

        return searchObject;
    }

    /**
     * Transforms the given search object into an export object.
     *
     * @arg {{columnName:string,prettyName:string}[]} fields
     * @arg {CoreSearch} searchObject
     * @arg {string} uniqueName
     * @return {any}
     * @override
     */
    public transformSearchToExport(
        hostName: string,
        dataStoreType: string,
        fields: { columnName: string, prettyName: string }[],
        searchObject: CoreSearch,
        uniqueName: string
    ): any {
        return {
            data: {
                fileName: uniqueName,
                dataStoreType: dataStoreType,
                hostName: hostName,
                query: searchObject,
                fieldNamePrettyNamePairs: this._findExportFields(searchObject, fields)
            }
        };
    }

    /**
     * Transforms the values in the given search results using the given map of keys-to-values-to-labels.
     *
     * @arg {{ data: any[] }} queryResults
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {{ data: any[] }}
     * @override
     */
    public transformSearchResultValues(
        results: { data: any[] },
        keysToValuesToLabels: { [key: string]: { [value: string]: string } }
    ): { data: any[] } {
        let transformedResults = [];
        for (let result of results.data) {
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
     * Adds an aggregation to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {FieldKey} field
     * @arg {string} label
     * @arg {AggregationType} operation
     * @return {AbstractSearchService}
     * @override
     */
    public withAggregation(searchObject: CoreSearch, field: FieldKey, label: string, operation: AggregationType): AbstractSearchService {
        searchObject.aggregateClauses.push(new CoreAggregateByFieldClause(this._transformFieldKeyToFieldClause(field), label,
            this._transformAggregationOperation(operation)));
        return this;
    }

    /**
     * Adds a group aggregation to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {string} group
     * @arg {string} label
     * @return {AbstractSearchService}
     * @override
     */
    public withAggregationByGroupCount(searchObject: CoreSearch, group: string, label: string): AbstractSearchService {
        searchObject.aggregateClauses.push(new CoreAggregateByGroupCountClause(group, label));
        return this;
    }

    /**
     * Adds a total count aggregation to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {string} label
     * @return {AbstractSearchService}
     * @override
     */
    public withAggregationByTotalCount(searchObject: CoreSearch, label: string): AbstractSearchService {
        searchObject.aggregateClauses.push(new CoreAggregateByTotalCountClause(label));
        return this;
    }

    /**
     * Adds a field to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {FieldKey} field
     * @return {AbstractSearchService}
     * @override
     */
    public withField(searchObject: CoreSearch, field: FieldKey): AbstractSearchService {
        searchObject.selectClause.fieldClauses.push(this._transformFieldKeyToFieldClause(field));
        return this;
    }

    /**
     * Sets the fields in the given search object to match all fields.
     *
     * @arg {CoreSearch} searchObject
     * @return {AbstractSearchService}
     * @override
     */
    public withAllFields(searchObject: CoreSearch): AbstractSearchService {
        searchObject.selectClause.fieldClauses = [];
        return this;
    }

    /**
     * Sets the filter clause in the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {CoreFilterClause} filterObject
     * @return {AbstractSearchService}
     * @override
     */
    public withFilter(searchObject: CoreSearch, filterObject: CoreFilterClause): AbstractSearchService {
        searchObject.whereClause = filterObject;
        return this;
    }

    /**
     * Adds a field group to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {FieldKey} field
     * @return {AbstractSearchService}
     * @override
     */
    public withGroup(searchObject: CoreSearch, field: FieldKey): AbstractSearchService {
        searchObject.groupByClauses.push(new CoreGroupByFieldClause(this._transformFieldKeyToFieldClause(field)));
        return this;
    }

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
    public withGroupByDate(searchObject: CoreSearch, field: FieldKey, interval: TimeInterval, label?: string): AbstractSearchService {
        searchObject.groupByClauses.push(new CoreGroupByOperationClause(this._transformFieldKeyToFieldClause(field),
            label || ('_' + interval), '' + interval));
        return this;
    }

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
     * @override
     */
    public withJoin(
        searchObject: CoreSearch,
        type: string,
        database: string,
        table: string,
        field1: FieldKey,
        operator: string,
        field2: FieldKey
    ): AbstractSearchService {
        searchObject.joinClauses.push({
            database,
            table,
            type,
            onClause: new CoreFieldsFilterClause(
                new CoreFieldClause(field1.database, field1.table, field1.field),
                operator,
                new CoreFieldClause(field2.database, field2.table, field2.field)
            )
        });
        return this;
    }

    /**
     * Sets the limit on the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {number} limit
     * @return {AbstractSearchService}
     * @override
     */
    public withLimit(searchObject: CoreSearch, limit: number): AbstractSearchService {
        searchObject.limitClause = {
            limit
        };
        return this;
    }

    /**
     * Sets the offset on the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {number} offset
     * @return {AbstractSearchService}
     * @override
     */
    public withOffset(searchObject: CoreSearch, offset: number): AbstractSearchService {
        searchObject.offsetClause = {
            offset
        };
        return this;
    }

    /**
     * Adds an order field to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {FieldKey} field
     * @arg {SortOrder} [order=SortOrder.ASCENDING]
     * @return {AbstractSearchService}
     * @override
     */
    public withOrder(searchObject: CoreSearch, field: FieldKey, order: SortOrder = SortOrder.ASCENDING): AbstractSearchService {
        searchObject.orderByClauses.push(new CoreOrderByFieldClause(this._transformFieldKeyToFieldClause(field),
            this._transformSortOrder(order)));
        return this;
    }

    /**
     * Adds an order group to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {string} operation
     * @arg {SortOrder} [order=SortOrder.ASCENDING]
     * @return {AbstractSearchService}
     * @override
     */
    public withOrderByOperation(
        searchObject: CoreSearch,
        operation: string,
        order: SortOrder = SortOrder.ASCENDING
    ): AbstractSearchService {
        searchObject.orderByClauses.push(new CoreOrderByOperationClause(operation, this._transformSortOrder(order)));
        return this;
    }

    /**
     * Finds and returns the export fields from the fields, groups, and aggregates in the given export query object.
     * Assumes activeFields does not have duplicates.
     *
     * @arg {CoreSearch} exportQuery
     * @arg {{columnName:string,prettyName:string}[]} activeFields
     * @return {ExportField[]}
     * @private
     */
    private _findExportFields(exportQuery: CoreSearch, activeFields: { columnName: string, prettyName: string }[]): ExportField[] {
        // Use all activeFields if the exportQuery fields are a wildcard.
        let isWildcard = (!exportQuery.selectClause.fieldClauses.length);

        // Save each activeField that is a field from the exportQuery in the export fields.
        let queryFields: ExportField[] =
            (
                isWildcard ?
                    activeFields :
                    activeFields.filter((activeField) =>
                        exportQuery.selectClause.fieldClauses.some((exportFieldClause) =>
                            exportFieldClause.field === activeField.columnName))
            )
                .map((activeField) => ({
                    query: activeField.columnName,
                    pretty: activeField.prettyName
                } as ExportField));

        // Save each group function from the exportQuery in the export fields.
        let groupFields: ExportField[] = exportQuery.groupByClauses.filter((group) => group.type === 'operation').map((input) => {
            const group = input as CoreGroupByOperationClause;
            // Remove the field of each group operation from the queryFields.
            queryFields = queryFields.filter((field) => field.query !== group.fieldClause.field);
            return {
                query: group.label,
                pretty: this._transformDateGroupOperationToPrettyName(group.operation, this._transformFieldToPrettyName(
                    group.fieldClause.field, activeFields
                ))
            } as ExportField;
        });

        // Save each aggregation field from the exportQuery in the export fields.
        let aggregationFields: ExportField[] = exportQuery.aggregateClauses.map((input) => {
            let queryLabel = '';
            let operation = '';
            let fieldOrGroup = '';
            // Remove the field of each non-COUNT aggregation from the queryFields.
            if (input.type === 'field') {
                const aggregate = input as CoreAggregateByFieldClause;
                if (aggregate.operation !== 'count') {
                    queryFields = queryFields.filter((field) => field.query !== aggregate.fieldClause.field);
                }
                queryLabel = aggregate.label;
                operation = aggregate.operation;
                fieldOrGroup = this._transformFieldToPrettyName(aggregate.fieldClause.field, activeFields);
            }
            if (input.type === 'group') {
                const aggregate = input as CoreAggregateByGroupCountClause;
                queryLabel = aggregate.label;
                operation = 'count';
                fieldOrGroup = aggregate.group;
            }
            if (input.type === 'total') {
                const aggregate = input as CoreAggregateByTotalCountClause;
                queryLabel = aggregate.label;
                operation = 'count';
                fieldOrGroup = '*';
            }
            return {
                query: queryLabel,
                pretty: this._transformAggregationOperationToPrettyName(operation, fieldOrGroup)
            } as ExportField;
        });

        return queryFields.concat(groupFields).concat(aggregationFields);
    }

    private _transformAggregationOperationToPrettyName(aggregationOperation: string, fieldOrGroup: string) {
        switch (aggregationOperation) {
            case 'avg':
                return 'Average' + (fieldOrGroup ? (' ' + fieldOrGroup) : '');
            case 'count':
                return 'Count' + (fieldOrGroup ? (' ' + fieldOrGroup) : '');
            case 'max':
                return 'Maximum' + (fieldOrGroup ? (' ' + fieldOrGroup) : '');
            case 'min':
                return 'Minimum' + (fieldOrGroup ? (' ' + fieldOrGroup) : '');
            case 'sum':
                return 'Sum' + (fieldOrGroup ? (' ' + fieldOrGroup) : '');
        }
        return '';
    }

    private _transformAggregationOperation(type: AggregationType): string {
        switch (type) {
            case AggregationType.AVG:
                return 'avg';
            case AggregationType.COUNT:
                return 'count';
            case AggregationType.MAX:
                return 'max';
            case AggregationType.MIN:
                return 'min';
            case AggregationType.SUM:
                return 'sum';
        }
        return '';
    }

    private _transformDateGroupOperationToPrettyName(groupOperation: string, fieldOrGroup: string): string {
        switch (groupOperation) {
            case 'minute':
                return 'Minute' + (fieldOrGroup ? (' ' + fieldOrGroup) : '');
            case 'hour':
                return 'Hour' + (fieldOrGroup ? (' ' + fieldOrGroup) : '');
            case 'dayOfMonth':
                return 'Day' + (fieldOrGroup ? (' ' + fieldOrGroup) : '');
            case 'month':
                return 'Month' + (fieldOrGroup ? (' ' + fieldOrGroup) : '');
            case 'year':
                return 'Year' + (fieldOrGroup ? (' ' + fieldOrGroup) : '');
        }
        return '';
    }

    private _transformFieldKeyToFieldClause(field: FieldKey): CoreFieldClause {
        return new CoreFieldClause(field.database, field.table, field.field);
    }

    private _transformFieldToPrettyName(inputField: string, fields: { columnName: string, prettyName: string }[]): string {
        return (fields.filter((field) => field.columnName === inputField)[0] || {} as any).prettyName;
    }

    private _transformSortOrder(order: SortOrder): number {
        return (order === SortOrder.ASCENDING ? 1 : -1);
    }

    /**
     * Transforms the values in the given FilterClause using the given map of keys-to-values-to-labels.
     *
     * @arg {CoreFilterClause} whereClause
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     */
    private _transformFilterClauseNestedValues(
        whereClause: CoreFilterClause,
        keysToValuesToLabels: { [key: string]: { [value: string]: string } }
    ): void {
        switch (whereClause.type) {
            case 'and':
            case 'or':
                for (let nestedFilterClause of (whereClause as CoreCompoundFilterClause).whereClauses) {
                    this._transformFilterClauseNestedValues(nestedFilterClause, keysToValuesToLabels);
                }
                break;
            case 'where':
                this._transformFilterClauseValues((whereClause as CoreSingularFilterClause), keysToValuesToLabels);
                break;
        }
    }

    private _transformFilterClauseValues(
        whereClause: CoreSingularFilterClause,
        keysToValuesToLabels: { [key: string]: { [value: string]: string } }
    ): void {
        let keys = Object.keys(keysToValuesToLabels);
        let key = whereClause.lhs.field;
        if (keys.includes(key)) {
            let valuesToLabels = keysToValuesToLabels[key];
            let values = Object.keys(valuesToLabels);
            for (let value of values) {
                if (valuesToLabels[value] === whereClause.rhs) {
                    whereClause.rhs = value;
                }
            }
        }
    }
}
