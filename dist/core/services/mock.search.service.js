"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
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
var abstract_search_service_1 = require("./abstract.search.service");
var config_option_1 = require("../models/config-option");
var SearchServiceMock = /** @class */ (function (_super) {
    __extends(SearchServiceMock, _super);
    function SearchServiceMock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchServiceMock.prototype.buildCompoundFilterClause = function (filterClauses, type) {
        if (type === void 0) { type = config_option_1.CompoundFilterType.AND; }
        return filterClauses.length ? (filterClauses.length === 1 ? filterClauses[0] : {
            filters: filterClauses,
            type: '' + type
        }) : null;
    };
    SearchServiceMock.prototype.buildDateQueryGroup = function (groupField, interval, name) {
        return {
            field: groupField,
            name: name || ('_' + interval),
            type: '' + interval
        };
    };
    SearchServiceMock.prototype.buildFilterClause = function (field, operator, value) {
        return {
            field: field,
            operator: operator,
            value: value
        };
    };
    SearchServiceMock.prototype.buildQueryGroup = function (groupField) {
        return groupField;
    };
    SearchServiceMock.prototype.buildQueryPayload = function (databaseName, tableName, fieldNames) {
        if (fieldNames === void 0) { fieldNames = ['*']; }
        return {
            database: databaseName,
            table: tableName,
            fields: fieldNames.length ? fieldNames : ['*']
        };
    };
    SearchServiceMock.prototype.canRunSearch = function (datastoreType, datastoreHost) {
        return !!(datastoreType && datastoreHost);
    };
    SearchServiceMock.prototype.runSearch = function (__datastoreType, __datastoreHost, __queryPayload) {
        return {
            always: function () {
                // Do nothing.
            },
            abort: function () {
                // Do nothing.
            },
            done: function () {
                // Do nothing.
            },
            fail: function () {
                // Do nothing.
            }
        };
    };
    SearchServiceMock.prototype.transformQueryPayloadToExport = function (hostName, dataStoreType, fields, queryPayload, uniqueName) {
        return {
            data: {
                fileName: uniqueName,
                dataStoreType: dataStoreType,
                hostName: hostName,
                query: queryPayload,
                queryFieldNameMap: fields.map(function (field) { return ({ query: field.columnName, pretty: field.prettyName }); })
            }
        };
    };
    SearchServiceMock.prototype.transformFilterClauseValues = function (queryPayload, keysToValuesToLabels) {
        this.transformFilterClauseValuesHelper(queryPayload.filter, keysToValuesToLabels);
        return queryPayload;
    };
    SearchServiceMock.prototype.transformFilterClauseValuesHelper = function (filter, keysToValuesToLabels) {
        if (!filter) {
            return;
        }
        if (!filter.type) {
            var keys = Object.keys(keysToValuesToLabels);
            var key = filter.lhs;
            if (keys.includes(key)) {
                var valuesToLabels = keysToValuesToLabels[key];
                var values = Object.keys(valuesToLabels);
                for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                    var value = values_1[_i];
                    if (valuesToLabels[value] === filter.rhs) {
                        filter.rhs = value;
                    }
                }
            }
            return;
        }
        for (var _a = 0, _b = (filter.filters || []); _a < _b.length; _a++) {
            var nestedFilterClause = _b[_a];
            this.transformFilterClauseValuesHelper(nestedFilterClause, keysToValuesToLabels);
        }
    };
    SearchServiceMock.prototype.transformQueryResultsValues = function (queryResults, keysToValuesToLabels) {
        var transformedResults = [];
        for (var _i = 0, _a = queryResults.data; _i < _a.length; _i++) {
            var result = _a[_i];
            var transformedResult = {};
            var _loop_1 = function (key) {
                transformedResult[key] = result[key];
                if (keysToValuesToLabels[key]) {
                    var value = transformedResult[key];
                    if (value instanceof Array) {
                        transformedResult[key] = value.map(function (element) { return keysToValuesToLabels[key][element] || element; });
                    }
                    else {
                        transformedResult[key] = keysToValuesToLabels[key][value] || value;
                    }
                }
            };
            for (var _b = 0, _c = Object.keys(result); _b < _c.length; _b++) {
                var key = _c[_b];
                _loop_1(key);
            }
            transformedResults.push(transformedResult);
        }
        return {
            data: transformedResults
        };
    };
    SearchServiceMock.prototype.updateAggregation = function (queryPayload, type, name, field) {
        queryPayload.aggregation = queryPayload.aggregation || [];
        queryPayload.aggregation.push({
            type: '' + type,
            name: name,
            field: field
        });
        return this;
    };
    SearchServiceMock.prototype.updateFields = function (queryPayload, fields) {
        if (fields.length) {
            var existingFields = queryPayload.fields || [];
            queryPayload.fields = (existingFields.length === 1 && existingFields[0] === '*') ? fields :
                existingFields.concat(fields);
        }
        return this;
    };
    SearchServiceMock.prototype.updateFieldsToMatchAll = function (queryPayload) {
        queryPayload.fields = ['*'];
        return this;
    };
    SearchServiceMock.prototype.updateFilter = function (queryPayload, filterClause) {
        queryPayload.filter = filterClause;
        return this;
    };
    SearchServiceMock.prototype.updateGroups = function (queryPayload, groups) {
        queryPayload.groups = groups;
        return this;
    };
    SearchServiceMock.prototype.updateLimit = function (queryPayload, limit) {
        queryPayload.limit = limit;
        return this;
    };
    SearchServiceMock.prototype.updateOffset = function (queryPayload, offset) {
        queryPayload.offset = offset;
        return this;
    };
    SearchServiceMock.prototype.updateSort = function (queryPayload, field, order) {
        if (order === void 0) { order = config_option_1.SortOrder.ASCENDING; }
        queryPayload.sort = {
            field: field,
            order: order === config_option_1.SortOrder.ASCENDING ? 1 : -1
        };
        return this;
    };
    return SearchServiceMock;
}(abstract_search_service_1.AbstractSearchService));
exports.SearchServiceMock = SearchServiceMock;
//# sourceMappingURL=mock.search.service.js.map