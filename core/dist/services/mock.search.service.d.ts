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
export declare class SearchServiceMock extends AbstractSearchService {
    buildCompoundFilterClause(filterClauses: FilterClause[], type?: CompoundFilterType): FilterClause;
    buildDateQueryGroup(groupField: string, interval: TimeInterval, name?: string): QueryGroup;
    buildFilterClause(field: string, operator: string, value: string): FilterClause;
    buildQueryGroup(groupField: string): QueryGroup;
    buildQueryPayload(databaseName: string, tableName: string, fieldNames?: string[]): QueryPayload;
    canRunSearch(datastoreType: string, datastoreHost: string): boolean;
    runSearch(__datastoreType: string, __datastoreHost: string, __queryPayload: QueryPayload): RequestWrapper;
    transformQueryPayloadToExport(hostName: string, dataStoreType: string, fields: {
        columnName: string;
        prettyName: string;
    }[], queryPayload: QueryPayload, uniqueName: string): any;
    transformFilterClauseValues(queryPayload: QueryPayload, keysToValuesToLabels: {
        [key: string]: {
            [value: string]: string;
        };
    }): QueryPayload;
    private transformFilterClauseValuesHelper;
    transformQueryResultsValues(queryResults: {
        data: any[];
    }, keysToValuesToLabels: {
        [key: string]: {
            [value: string]: string;
        };
    }): {
        data: any[];
    };
    updateAggregation(queryPayload: QueryPayload, type: AggregationType, name: string, field: string): AbstractSearchService;
    updateFields(queryPayload: QueryPayload, fields: string[]): AbstractSearchService;
    updateFieldsToMatchAll(queryPayload: QueryPayload): AbstractSearchService;
    updateFilter(queryPayload: QueryPayload, filterClause: FilterClause): AbstractSearchService;
    updateGroups(queryPayload: QueryPayload, groups: QueryGroup[]): AbstractSearchService;
    updateLimit(queryPayload: QueryPayload, limit: number): AbstractSearchService;
    updateOffset(queryPayload: QueryPayload, offset: number): AbstractSearchService;
    updateSort(queryPayload: QueryPayload, field: string, order?: SortOrder): AbstractSearchService;
}
