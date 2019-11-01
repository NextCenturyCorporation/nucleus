"use strict";
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
var abstract_search_service_1 = require("./abstract.search.service");
var config_option_1 = require("../models/config-option");
var neon_framework_1 = require("neon-framework");
var CoreQueryWrapper = /** @class */ (function () {
    /* eslint-disable-next-line no-shadow */
    function CoreQueryWrapper(query) {
        this.query = query;
    }
    return CoreQueryWrapper;
}());
exports.CoreQueryWrapper = CoreQueryWrapper;
var CoreGroupWrapper = /** @class */ (function () {
    function CoreGroupWrapper(group) {
        this.group = group;
    }
    return CoreGroupWrapper;
}());
exports.CoreGroupWrapper = CoreGroupWrapper;
var CoreWhereWrapper = /** @class */ (function () {
    function CoreWhereWrapper(where) {
        this.where = where;
    }
    return CoreWhereWrapper;
}());
exports.CoreWhereWrapper = CoreWhereWrapper;
var SearchService = /** @class */ (function (_super) {
    __extends(SearchService, _super);
    function SearchService(connectionService) {
        var _this = _super.call(this) || this;
        _this.connectionService = connectionService;
        return _this;
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
    SearchService.prototype.buildCompoundFilterClause = function (filterClauses, type) {
        if (type === void 0) { type = config_option_1.CompoundFilterType.AND; }
        if (!filterClauses.length) {
            return null;
        }
        if (filterClauses.length === 1) {
            return filterClauses[0];
        }
        var wheres = filterClauses.map(function (filterClause) { return (filterClause).where; });
        return new CoreWhereWrapper(type === config_option_1.CompoundFilterType.AND ? neon_framework_1.query.and.apply(neon_framework_1.query, wheres) :
            neon_framework_1.query.or.apply(neon_framework_1.query, wheres));
    };
    /**
     * Returns a new query group using the given group date field and time interval.
     *
     * @arg {string} groupField
     * @arg {TimeInterval} interval
     * @arg {string} [name]
     * @return {CoreGroupWrapper}
     * @override
     */
    SearchService.prototype.buildDateQueryGroup = function (groupField, interval, name) {
        return new CoreGroupWrapper(new neon_framework_1.query.GroupByFunctionClause('' + interval, groupField, name || ('_' + interval)));
    };
    /**
     * Returns a new filter clause using the given field, operator, and value.
     *
     * @arg {string} field
     * @arg {string} operator
     * @arg {string} value
     * @return {CoreWhereWrapper}
     * @override
     */
    SearchService.prototype.buildFilterClause = function (field, operator, value) {
        return new CoreWhereWrapper(neon_framework_1.query.where(field, operator, value));
    };
    /**
     * Returns a new query group using the given group field.
     *
     * @arg {string} groupField
     * @return {CoreGroupWrapper}
     * @override
     */
    SearchService.prototype.buildQueryGroup = function (groupField) {
        return new CoreGroupWrapper(groupField);
    };
    /**
     * Returns a new search query payload using the given database, table, and field names.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {string[]} [fieldNames=[]]
     * @return {CoreQueryWrapper}
     * @override
     */
    SearchService.prototype.buildQueryPayload = function (databaseName, tableName, fieldNames) {
        if (fieldNames === void 0) { fieldNames = []; }
        var queryObject = new neon_framework_1.query.Query().selectFrom(databaseName, tableName);
        if (fieldNames.length) {
            queryObject.withFields(fieldNames);
        }
        return new CoreQueryWrapper(queryObject);
    };
    /**
     * Returns whether the given datastore type and host can run a search.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @return {RequestWrapper}
     * @override
     */
    SearchService.prototype.canRunSearch = function (datastoreType, datastoreHost) {
        return !!(this.connectionService.connect(datastoreType, datastoreHost));
    };
    /**
     * Finds and returns the export fields from the fields, groupByClauses, and aggregates in the given export query object.
     * Assumes activeFields does not have duplicates.
     *
     * @arg {query.Query} exportQuery
     * @arg {{columnName:string,prettyName:string}[]} activeFields
     * @return {ExportField[]}
     * @private
     */
    SearchService.prototype.findExportFields = function (exportQuery, activeFields) {
        var _this = this;
        // Use all activeFields if the exportQuery fields are a wildcard.
        var isWildcard = (exportQuery.fields.length === 1 && exportQuery.fields[0] === '*');
        // Save each activeField that is a field from the exportQuery in the export fields.
        var queryFields = (isWildcard ?
            activeFields :
            activeFields.filter(function (activeField) {
                return exportQuery.fields.some(function (exportFieldName) {
                    return exportFieldName === activeField.columnName;
                });
            }))
            .map(function (activeField) { return ({
            query: activeField.columnName,
            pretty: activeField.prettyName
        }); });
        // Save each group function from the exportQuery in the export fields.
        var groupFields = exportQuery.groupByClauses.filter(function (group) { return group.type === 'function'; }).map(function (group) {
            // Remove the field of each group function from the queryFields.
            queryFields = queryFields.filter(function (field) { return field.query !== group.field; });
            return {
                query: group.name,
                pretty: _this.transformDateGroupOperatorToPrettyName(group.operation, group.field, activeFields)
            };
        });
        // Save each aggregation field from the exportQuery in the export fields.
        var aggregationFields = exportQuery.aggregates.map(function (aggregate) {
            // Remove the field of each non-COUNT aggregation from the queryFields.
            /* eslint-disable-next-line dot-notation */
            if (aggregate.operation !== neon_framework_1.query['COUNT']) {
                queryFields = queryFields.filter(function (field) { return field.query !== aggregate.field; });
            }
            return {
                query: aggregate.name,
                pretty: _this.transformAggregationOperatorToPrettyName(aggregate.operation, aggregate.field, activeFields)
            };
        });
        return queryFields.concat(groupFields).concat(aggregationFields);
    };
    /**
     * Runs the given search using the given datastore type and host.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @arg {CoreQueryWrapper} queryPayload
     * @return {RequestWrapper}
     * @override
     */
    SearchService.prototype.runSearch = function (datastoreType, datastoreHost, queryPayload) {
        var connection = this.connectionService.connect(datastoreType, datastoreHost);
        return connection ? connection.runSearchQuery(queryPayload, null) : null;
    };
    SearchService.prototype.transformAggregationOperatorToPrettyName = function (aggregationOperator, aggregationField, fields) {
        var prettyName = (fields.filter(function (field) { return field.columnName === aggregationField; })[0] || {}).prettyName;
        /* eslint-disable dot-notation */
        switch (aggregationOperator) {
            case neon_framework_1.query['AVG']:
                return 'Average' + (prettyName ? (' ' + prettyName) : '');
            case neon_framework_1.query['COUNT']:
                return 'Count' + (prettyName ? (' ' + prettyName) : '');
            case neon_framework_1.query['MAX']:
                return 'Maximum' + (prettyName ? (' ' + prettyName) : '');
            case neon_framework_1.query['MIN']:
                return 'Minimum' + (prettyName ? (' ' + prettyName) : '');
            case neon_framework_1.query['SUM']:
                return 'Sum' + (prettyName ? (' ' + prettyName) : '');
        }
        /* eslint-enable dot-notation */
        return '';
    };
    SearchService.prototype.transformAggregationType = function (type) {
        /* eslint-disable dot-notation */
        switch (type) {
            case config_option_1.AggregationType.AVG:
                return neon_framework_1.query['AVG'];
            case config_option_1.AggregationType.COUNT:
                return neon_framework_1.query['COUNT'];
            case config_option_1.AggregationType.MAX:
                return neon_framework_1.query['MAX'];
            case config_option_1.AggregationType.MIN:
                return neon_framework_1.query['MIN'];
            case config_option_1.AggregationType.SUM:
                return neon_framework_1.query['SUM'];
        }
        /* eslint-enable dot-notation */
        return '';
    };
    SearchService.prototype.transformDateGroupOperatorToPrettyName = function (groupOperator, groupField, fields) {
        var prettyName = (fields.filter(function (field) { return field.columnName === groupField; })[0] || {}).prettyName;
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
    };
    /**
     * Transforms the values in the filter clauses in the given search query payload using the given map of keys-to-values-to-labels.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {CoreQueryWrapper}
     * @override
     */
    SearchService.prototype.transformFilterClauseValues = function (queryPayload, keysToValuesToLabels) {
        /* eslint-disable-next-line dot-notation */
        var wherePredicate = queryPayload.query['filter'].whereClause;
        if (wherePredicate) {
            this.transformWherePredicateNestedValues(wherePredicate, keysToValuesToLabels);
        }
        return queryPayload;
    };
    /**
     * Transforms the given search query payload into an object to export.
     *
     * @arg {{columnName:string,prettyName:string}[]} fields
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {string} uniqueName
     * @return {any}
     * @override
     */
    SearchService.prototype.transformQueryPayloadToExport = function (hostName, dataStoreType, fields, queryPayload, uniqueName) {
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
    };
    /**
     * Transforms the values in the given search query results using the given map of keys-to-values-to-labels.
     *
     * @arg {{ data: any[] }} queryResults
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {{ data: any[] }}
     * @override
     */
    SearchService.prototype.transformQueryResultsValues = function (queryResults, keysToValuesToLabels) {
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
    /**
     * Transforms the values in the given WherePredicate using the given map of keys-to-values-to-labels.
     *
     * @arg {query.WherePredicate} wherePredicate
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     */
    SearchService.prototype.transformWherePredicateNestedValues = function (wherePredicate, keysToValuesToLabels) {
        switch (wherePredicate.type) {
            case 'and':
            case 'or':
                for (var _i = 0, _a = wherePredicate.whereClauses; _i < _a.length; _i++) {
                    var nestedWherePredicate = _a[_i];
                    this.transformWherePredicateNestedValues(nestedWherePredicate, keysToValuesToLabels);
                }
                break;
            case 'where':
                this.transformWherePredicateValues(wherePredicate, keysToValuesToLabels);
                break;
        }
    };
    SearchService.prototype.transformWherePredicateValues = function (wherePredicate, keysToValuesToLabels) {
        var keys = Object.keys(keysToValuesToLabels);
        var key = wherePredicate.lhs;
        if (keys.includes(key)) {
            var valuesToLabels = keysToValuesToLabels[key];
            var values = Object.keys(valuesToLabels);
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                if (valuesToLabels[value] === wherePredicate.rhs) {
                    wherePredicate.rhs = value;
                }
            }
        }
    };
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
    SearchService.prototype.updateAggregation = function (queryPayload, type, name, field) {
        queryPayload.query.aggregate(this.transformAggregationType(type), field, name);
        return this;
    };
    // TODO THOR-950 Temp function
    /**
     * Sets the fields data in the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {string[]} fields
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.updateFields = function (queryPayload, fields) {
        var existingFields = queryPayload.query.fields;
        queryPayload.query.withFields((existingFields.length === 1 && existingFields[0] === '*') ? fields : existingFields.concat(fields));
        return this;
    };
    /**
     * Sets the fields data in the given search query payload to match all fields.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.updateFieldsToMatchAll = function (queryPayload) {
        queryPayload.query.withFields('*');
        return this;
    };
    /**
     * Sets the filter clause data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {CoreWhereWrapper} filterClause
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.updateFilter = function (queryPayload, filterClause) {
        if (filterClause) {
            queryPayload.query.where(filterClause.where);
        }
        return this;
    };
    /**
     * Sets the group data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {CoreGroupWrapper[]} groupClauses
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.updateGroups = function (queryPayload, groupClauses) {
        queryPayload.query.groupBy(groupClauses.map(function (groupClause) { return groupClause.group; }));
        return this;
    };
    /**
     * Sets the limit data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {number} limit
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.updateLimit = function (queryPayload, limit) {
        queryPayload.query.limit(limit);
        return this;
    };
    /**
     * Sets the offset data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {number} offset
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.updateOffset = function (queryPayload, offset) {
        queryPayload.query.offset(offset);
        return this;
    };
    /**
     * Sets the sort data on the given search query payload.
     *
     * @arg {CoreQueryWrapper} queryPayload
     * @arg {string} field
     * @arg {SortOrder} [order=SortOrder.ASCENDING]
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.updateSort = function (queryPayload, field, order) {
        if (order === void 0) { order = config_option_1.SortOrder.ASCENDING; }
        /* eslint-disable-next-line dot-notation */
        queryPayload.query.sortBy(field, order === config_option_1.SortOrder.ASCENDING ? neon_framework_1.query['ASCENDING'] : neon_framework_1.query['DESCENDING']);
        return this;
    };
    return SearchService;
}(abstract_search_service_1.AbstractSearchService));
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map