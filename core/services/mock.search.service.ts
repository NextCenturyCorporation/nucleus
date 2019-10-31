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
import { RequestWrapper } from './connection.service';
import { Injectable } from '@angular/core';

/**
 * Saves filter clauses and query payloads as JSON objects.
 */
@Injectable({
    providedIn: 'root'
})
export class SearchServiceMock extends AbstractSearchService {
    public buildCompoundFilterClause(filterClauses: FilterClause[], type: CompoundFilterType = CompoundFilterType.AND): FilterClause {
        return filterClauses.length ? (filterClauses.length === 1 ? filterClauses[0] : {
            filters: filterClauses,
            type: '' + type
        }) : null;
    }

    public buildDateQueryGroup(groupField: string, interval: TimeInterval, name?: string): QueryGroup {
        return {
            field: groupField,
            name: name || ('_' + interval),
            type: '' + interval
        };
    }

    public buildFilterClause(field: string, operator: string, value: string): FilterClause {
        return {
            field: field,
            operator: operator,
            value: value
        };
    }

    public buildQueryGroup(groupField: string): QueryGroup {
        return groupField;
    }

    public buildQueryPayload(databaseName: string, tableName: string, fieldNames: string[] = ['*']): QueryPayload {
        return {
            database: databaseName,
            table: tableName,
            fields: fieldNames.length ? fieldNames : ['*']
        };
    }

    public canRunSearch(datastoreType: string, datastoreHost: string): boolean {
        return !!(datastoreType && datastoreHost);
    }

    public runSearch(__datastoreType: string, __datastoreHost: string, __queryPayload: QueryPayload): RequestWrapper {
        return {
            always: () => {
                // Do nothing.
            },
            abort: () => {
                // Do nothing.
            },
            done: () => {
                // Do nothing.
            },
            fail: () => {
                // Do nothing.
            }
        };
    }

    public transformQueryPayloadToExport(
        hostName: string,
        dataStoreType: string,
        fields: { columnName: string, prettyName: string }[],
        queryPayload: QueryPayload,
        uniqueName: string
    ): any {
        return {
            data: {
                fileName: uniqueName,
                dataStoreType: dataStoreType,
                hostName: hostName,
                query: queryPayload,
                queryFieldNameMap: fields.map((field) => ({ query: field.columnName, pretty: field.prettyName }))
            }
        };
    }

    public transformFilterClauseValues(queryPayload: QueryPayload,
        keysToValuesToLabels: { [key: string]: { [value: string]: string } }): QueryPayload {
        this.transformFilterClauseValuesHelper((queryPayload as any).filter, keysToValuesToLabels);
        return queryPayload;
    }

    private transformFilterClauseValuesHelper(filter: any, keysToValuesToLabels: { [key: string]: { [value: string]: string } }): void {
        if (!filter) {
            return;
        }

        if (!filter.type) {
            let keys = Object.keys(keysToValuesToLabels);
            let key = filter.lhs;
            if (keys.includes(key)) {
                let valuesToLabels = keysToValuesToLabels[key];
                let values = Object.keys(valuesToLabels);
                for (let value of values) {
                    if (valuesToLabels[value] === filter.rhs) {
                        filter.rhs = value;
                    }
                }
            }
            return;
        }

        for (let nestedFilterClause of (filter.filters || [])) {
            this.transformFilterClauseValuesHelper(nestedFilterClause, keysToValuesToLabels);
        }
    }

    public transformQueryResultsValues(
        queryResults: { data: any[] },
        keysToValuesToLabels: { [key: string]: { [value: string]: string } }
    ): { data: any[] } {
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

    public updateAggregation(queryPayload: QueryPayload, type: AggregationType, name: string, field: string): AbstractSearchService {
        (queryPayload as any).aggregation = (queryPayload as any).aggregation || [];
        (queryPayload as any).aggregation.push({
            type: '' + type,
            name: name,
            field: field
        });
        return this;
    }

    public updateFields(queryPayload: QueryPayload, fields: string[]): AbstractSearchService {
        if (fields.length) {
            let existingFields = (queryPayload as any).fields || [];
            (queryPayload as any).fields = (existingFields.length === 1 && existingFields[0] === '*') ? fields :
                existingFields.concat(fields);
        }
        return this;
    }

    public updateFieldsToMatchAll(queryPayload: QueryPayload): AbstractSearchService {
        (queryPayload as any).fields = ['*'];
        return this;
    }

    public updateFilter(queryPayload: QueryPayload, filterClause: FilterClause): AbstractSearchService {
        (queryPayload as any).filter = filterClause;
        return this;
    }

    public updateGroups(queryPayload: QueryPayload, groups: QueryGroup[]): AbstractSearchService {
        (queryPayload as any).groups = groups;
        return this;
    }

    public updateLimit(queryPayload: QueryPayload, limit: number): AbstractSearchService {
        (queryPayload as any).limit = limit;
        return this;
    }

    public updateOffset(queryPayload: QueryPayload, offset: number): AbstractSearchService {
        (queryPayload as any).offset = offset;
        return this;
    }

    public updateSort(queryPayload: QueryPayload, field: string, order: SortOrder = SortOrder.ASCENDING): AbstractSearchService {
        (queryPayload as any).sort = {
            field: field,
            order: order === SortOrder.ASCENDING ? 1 : -1
        };
        return this;
    }
}
