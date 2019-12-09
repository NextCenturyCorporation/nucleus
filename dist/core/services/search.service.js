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
var CoreFieldClause = /** @class */ (function () {
    function CoreFieldClause(database, table, field) {
        this.database = database;
        this.table = table;
        this.field = field;
    }
    return CoreFieldClause;
}());
var CoreFilterClause = /** @class */ (function () {
    function CoreFilterClause(type) {
        this.type = type;
    }
    return CoreFilterClause;
}());
exports.CoreFilterClause = CoreFilterClause;
var CoreSingularFilterClause = /** @class */ (function (_super) {
    __extends(CoreSingularFilterClause, _super);
    function CoreSingularFilterClause(lhs, operator, rhs) {
        var _this = _super.call(this, 'where') || this;
        _this.lhs = lhs;
        _this.operator = operator;
        _this.rhs = rhs;
        return _this;
    }
    return CoreSingularFilterClause;
}(CoreFilterClause));
var CoreFieldsFilterClause = /** @class */ (function (_super) {
    __extends(CoreFieldsFilterClause, _super);
    function CoreFieldsFilterClause(lhs, operator, rhs) {
        var _this = _super.call(this, 'fields') || this;
        _this.lhs = lhs;
        _this.operator = operator;
        _this.rhs = rhs;
        return _this;
    }
    return CoreFieldsFilterClause;
}(CoreFilterClause));
var CoreCompoundFilterClause = /** @class */ (function (_super) {
    __extends(CoreCompoundFilterClause, _super);
    function CoreCompoundFilterClause(type, whereClauses) {
        var _this = _super.call(this, type) || this;
        _this.whereClauses = whereClauses;
        return _this;
    }
    return CoreCompoundFilterClause;
}(CoreFilterClause));
var CoreAndFilterClause = /** @class */ (function (_super) {
    __extends(CoreAndFilterClause, _super);
    function CoreAndFilterClause(whereClauses) {
        return _super.call(this, 'and', whereClauses) || this;
    }
    return CoreAndFilterClause;
}(CoreCompoundFilterClause));
var CoreOrFilterClause = /** @class */ (function (_super) {
    __extends(CoreOrFilterClause, _super);
    function CoreOrFilterClause(whereClauses) {
        return _super.call(this, 'or', whereClauses) || this;
    }
    return CoreOrFilterClause;
}(CoreCompoundFilterClause));
var CoreAggregateClause = /** @class */ (function () {
    function CoreAggregateClause(type) {
        this.type = type;
    }
    return CoreAggregateClause;
}());
var CoreAggregateByFieldClause = /** @class */ (function (_super) {
    __extends(CoreAggregateByFieldClause, _super);
    function CoreAggregateByFieldClause(fieldClause, label, operation) {
        var _this = _super.call(this, 'field') || this;
        _this.fieldClause = fieldClause;
        _this.label = label;
        _this.operation = operation;
        return _this;
    }
    return CoreAggregateByFieldClause;
}(CoreAggregateClause));
var CoreAggregateByGroupCountClause = /** @class */ (function (_super) {
    __extends(CoreAggregateByGroupCountClause, _super);
    function CoreAggregateByGroupCountClause(group, label) {
        var _this = _super.call(this, 'group') || this;
        _this.group = group;
        _this.label = label;
        return _this;
    }
    return CoreAggregateByGroupCountClause;
}(CoreAggregateClause));
var CoreAggregateByTotalCountClause = /** @class */ (function (_super) {
    __extends(CoreAggregateByTotalCountClause, _super);
    function CoreAggregateByTotalCountClause(label) {
        var _this = _super.call(this, 'total') || this;
        _this.label = label;
        return _this;
    }
    return CoreAggregateByTotalCountClause;
}(CoreAggregateClause));
var CoreGroupByClause = /** @class */ (function () {
    function CoreGroupByClause(type) {
        this.type = type;
    }
    return CoreGroupByClause;
}());
var CoreGroupByFieldClause = /** @class */ (function (_super) {
    __extends(CoreGroupByFieldClause, _super);
    function CoreGroupByFieldClause(fieldClause) {
        var _this = _super.call(this, 'field') || this;
        _this.fieldClause = fieldClause;
        return _this;
    }
    return CoreGroupByFieldClause;
}(CoreGroupByClause));
var CoreGroupByOperationClause = /** @class */ (function (_super) {
    __extends(CoreGroupByOperationClause, _super);
    function CoreGroupByOperationClause(fieldClause, label, operation) {
        var _this = _super.call(this, 'operation') || this;
        _this.fieldClause = fieldClause;
        _this.label = label;
        _this.operation = operation;
        return _this;
    }
    return CoreGroupByOperationClause;
}(CoreGroupByClause));
var CoreOrderByClause = /** @class */ (function () {
    function CoreOrderByClause(type) {
        this.type = type;
    }
    return CoreOrderByClause;
}());
var CoreOrderByFieldClause = /** @class */ (function (_super) {
    __extends(CoreOrderByFieldClause, _super);
    function CoreOrderByFieldClause(fieldClause, order) {
        var _this = _super.call(this, 'field') || this;
        _this.fieldClause = fieldClause;
        _this.order = order;
        return _this;
    }
    return CoreOrderByFieldClause;
}(CoreOrderByClause));
var CoreOrderByOperationClause = /** @class */ (function (_super) {
    __extends(CoreOrderByOperationClause, _super);
    function CoreOrderByOperationClause(operation, order) {
        var _this = _super.call(this, 'operation') || this;
        _this.operation = operation;
        _this.order = order;
        return _this;
    }
    return CoreOrderByOperationClause;
}(CoreOrderByClause));
var CoreSearch = /** @class */ (function () {
    function CoreSearch(database, table, fields) {
        if (fields === void 0) { fields = []; }
        this.whereClause = null;
        this.aggregateClauses = [];
        this.groupByClauses = [];
        this.orderByClauses = [];
        this.limitClause = null;
        this.offsetClause = null;
        this.joinClauses = [];
        this.isDistinct = false;
        this.selectClause = {
            database: database,
            table: table,
            fieldClauses: fields.map(function (field) { return new CoreFieldClause(database, table, field); })
        };
    }
    return CoreSearch;
}());
exports.CoreSearch = CoreSearch;
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
     * @arg {CoreFilterClause[]} filterObjects
     * @arg {CompoundFilterType} [type=CompoundFilterType.AND]
     * @return {CoreFilterClause}
     * @override
     */
    SearchService.prototype.createCompoundFilterClause = function (filterObjects, type) {
        if (type === void 0) { type = config_option_1.CompoundFilterType.AND; }
        if (filterObjects.length === 1) {
            return filterObjects[0];
        }
        if (filterObjects.length) {
            if (type === config_option_1.CompoundFilterType.AND) {
                return new CoreAndFilterClause(filterObjects);
            }
            if (type === config_option_1.CompoundFilterType.OR) {
                return new CoreOrFilterClause(filterObjects);
            }
        }
        return null;
    };
    /**
     * Returns a new filter clause using the given field, operator, and value.
     *
     * @arg {string} field
     * @arg {string} operator
     * @arg {string} value
     * @return {CoreFilterClause}
     * @override
     */
    SearchService.prototype.createFilterClause = function (field, operator, value) {
        return new CoreSingularFilterClause(this._transformFieldKeyToFieldClause(field), operator, value);
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
     * Returns a new search object using the given database, table, and field names.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {string[]} [fieldNames=[]]
     * @return {CoreSearch}
     * @override
     */
    SearchService.prototype.createSearch = function (database, table, fields) {
        if (fields === void 0) { fields = []; }
        return new CoreSearch(database, table, fields);
    };
    /**
     * Runs the given search using the given datastore type and host.
     *
     * @arg {string} datastoreType
     * @arg {string} datastoreHost
     * @arg {CoreSearch} searchObject
     * @return {RequestWrapper}
     * @override
     */
    SearchService.prototype.runSearch = function (datastoreType, datastoreHost, searchObject) {
        var connection = this.connectionService.connect(datastoreType, datastoreHost);
        return connection ? connection.runSearch(searchObject, null) : null;
    };
    /**
     * Transforms the values in the filter clauses in the given search object using the given map of keys-to-values-to-labels.
     *
     * @arg {CoreSearch} searchObject
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {CoreSearch}
     * @override
     */
    SearchService.prototype.transformFilterClauseValues = function (searchObject, keysToValuesToLabels) {
        if (searchObject.whereClause) {
            this._transformFilterClauseNestedValues(searchObject.whereClause, keysToValuesToLabels);
        }
        return searchObject;
    };
    /**
     * Transforms the given search object into an export object.
     *
     * @arg {{columnName:string,prettyName:string}[]} fields
     * @arg {CoreSearch} searchObject
     * @arg {string} uniqueName
     * @return {any}
     * @override
     */
    SearchService.prototype.transformSearchToExport = function (hostName, dataStoreType, fields, searchObject, uniqueName) {
        return {
            data: {
                fileName: uniqueName,
                dataStoreType: dataStoreType,
                hostName: hostName,
                query: searchObject,
                fieldNamePrettyNamePairs: this._findExportFields(searchObject, fields)
            }
        };
    };
    /**
     * Transforms the values in the given search results using the given map of keys-to-values-to-labels.
     *
     * @arg {{ data: any[] }} queryResults
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     * @return {{ data: any[] }}
     * @override
     */
    SearchService.prototype.transformSearchResultValues = function (results, keysToValuesToLabels) {
        var transformedResults = [];
        for (var _i = 0, _a = results.data; _i < _a.length; _i++) {
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
     * Adds an aggregation to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {FieldKey} field
     * @arg {string} label
     * @arg {AggregationType} operation
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.withAggregation = function (searchObject, field, label, operation) {
        searchObject.aggregateClauses.push(new CoreAggregateByFieldClause(this._transformFieldKeyToFieldClause(field), label, this._transformAggregationOperation(operation)));
        return this;
    };
    /**
     * Adds a group aggregation to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {string} group
     * @arg {string} label
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.withAggregationByGroupCount = function (searchObject, group, label) {
        searchObject.aggregateClauses.push(new CoreAggregateByGroupCountClause(group, label));
        return this;
    };
    /**
     * Adds a total count aggregation to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {string} label
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.withAggregationByTotalCount = function (searchObject, label) {
        searchObject.aggregateClauses.push(new CoreAggregateByTotalCountClause(label));
        return this;
    };
    /**
     * Adds a field to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {FieldKey} field
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.withField = function (searchObject, field) {
        searchObject.selectClause.fieldClauses.push(this._transformFieldKeyToFieldClause(field));
        return this;
    };
    /**
     * Sets the fields in the given search object to match all fields.
     *
     * @arg {CoreSearch} searchObject
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.withAllFields = function (searchObject) {
        searchObject.selectClause.fieldClauses = [];
        return this;
    };
    /**
     * Sets the filter clause in the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {CoreFilterClause} filterObject
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.withFilter = function (searchObject, filterObject) {
        searchObject.whereClause = filterObject;
        return this;
    };
    /**
     * Adds a field group to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {FieldKey} field
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.withGroup = function (searchObject, field) {
        searchObject.groupByClauses.push(new CoreGroupByFieldClause(this._transformFieldKeyToFieldClause(field)));
        return this;
    };
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
    SearchService.prototype.withGroupByDate = function (searchObject, field, interval, label) {
        searchObject.groupByClauses.push(new CoreGroupByOperationClause(this._transformFieldKeyToFieldClause(field), label || ('_' + interval), '' + interval));
        return this;
    };
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
    SearchService.prototype.withJoin = function (searchObject, type, database, table, field1, operator, field2) {
        searchObject.joinClauses.push({
            database: database,
            table: table,
            type: type,
            onClause: new CoreFieldsFilterClause(new CoreFieldClause(field1.database, field1.table, field1.field), operator, new CoreFieldClause(field2.database, field2.table, field2.field))
        });
        return this;
    };
    /**
     * Sets the limit on the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {number} limit
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.withLimit = function (searchObject, limit) {
        searchObject.limitClause = {
            limit: limit
        };
        return this;
    };
    /**
     * Sets the offset on the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {number} offset
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.withOffset = function (searchObject, offset) {
        searchObject.offsetClause = {
            offset: offset
        };
        return this;
    };
    /**
     * Adds an order field to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {FieldKey} field
     * @arg {SortOrder} [order=SortOrder.ASCENDING]
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.withOrder = function (searchObject, field, order) {
        if (order === void 0) { order = config_option_1.SortOrder.ASCENDING; }
        searchObject.orderByClauses.push(new CoreOrderByFieldClause(this._transformFieldKeyToFieldClause(field), this._transformSortOrder(order)));
        return this;
    };
    /**
     * Adds an order group to the given search object.
     *
     * @arg {CoreSearch} searchObject
     * @arg {string} operation
     * @arg {SortOrder} [order=SortOrder.ASCENDING]
     * @return {AbstractSearchService}
     * @override
     */
    SearchService.prototype.withOrderByOperation = function (searchObject, operation, order) {
        if (order === void 0) { order = config_option_1.SortOrder.ASCENDING; }
        searchObject.orderByClauses.push(new CoreOrderByOperationClause(operation, this._transformSortOrder(order)));
        return this;
    };
    /**
     * Finds and returns the export fields from the fields, groups, and aggregates in the given export query object.
     * Assumes activeFields does not have duplicates.
     *
     * @arg {CoreSearch} exportQuery
     * @arg {{columnName:string,prettyName:string}[]} activeFields
     * @return {ExportField[]}
     * @private
     */
    SearchService.prototype._findExportFields = function (exportQuery, activeFields) {
        var _this = this;
        // Use all activeFields if the exportQuery fields are a wildcard.
        var isWildcard = (!exportQuery.selectClause.fieldClauses.length);
        // Save each activeField that is a field from the exportQuery in the export fields.
        var queryFields = (isWildcard ?
            activeFields :
            activeFields.filter(function (activeField) {
                return exportQuery.selectClause.fieldClauses.some(function (exportFieldClause) {
                    return exportFieldClause.field === activeField.columnName;
                });
            }))
            .map(function (activeField) { return ({
            query: activeField.columnName,
            pretty: activeField.prettyName
        }); });
        // Save each group function from the exportQuery in the export fields.
        var groupFields = exportQuery.groupByClauses.filter(function (group) { return group.type === 'operation'; }).map(function (input) {
            var group = input;
            // Remove the field of each group operation from the queryFields.
            queryFields = queryFields.filter(function (field) { return field.query !== group.fieldClause.field; });
            return {
                query: group.label,
                pretty: _this._transformDateGroupOperationToPrettyName(group.operation, _this._transformFieldToPrettyName(group.fieldClause.field, activeFields))
            };
        });
        // Save each aggregation field from the exportQuery in the export fields.
        var aggregationFields = exportQuery.aggregateClauses.map(function (input) {
            var queryLabel = '';
            var operation = '';
            var fieldOrGroup = '';
            // Remove the field of each non-COUNT aggregation from the queryFields.
            if (input.type === 'field') {
                var aggregate_1 = input;
                if (aggregate_1.operation !== 'count') {
                    queryFields = queryFields.filter(function (field) { return field.query !== aggregate_1.fieldClause.field; });
                }
                queryLabel = aggregate_1.label;
                operation = aggregate_1.operation;
                fieldOrGroup = _this._transformFieldToPrettyName(aggregate_1.fieldClause.field, activeFields);
            }
            if (input.type === 'group') {
                var aggregate = input;
                queryLabel = aggregate.label;
                operation = 'count';
                fieldOrGroup = aggregate.group;
            }
            if (input.type === 'total') {
                var aggregate = input;
                queryLabel = aggregate.label;
                operation = 'count';
                fieldOrGroup = '*';
            }
            return {
                query: queryLabel,
                pretty: _this._transformAggregationOperationToPrettyName(operation, fieldOrGroup)
            };
        });
        return queryFields.concat(groupFields).concat(aggregationFields);
    };
    SearchService.prototype._transformAggregationOperationToPrettyName = function (aggregationOperation, fieldOrGroup) {
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
    };
    SearchService.prototype._transformAggregationOperation = function (type) {
        switch (type) {
            case config_option_1.AggregationType.AVG:
                return 'avg';
            case config_option_1.AggregationType.COUNT:
                return 'count';
            case config_option_1.AggregationType.MAX:
                return 'max';
            case config_option_1.AggregationType.MIN:
                return 'min';
            case config_option_1.AggregationType.SUM:
                return 'sum';
        }
        return '';
    };
    SearchService.prototype._transformDateGroupOperationToPrettyName = function (groupOperation, fieldOrGroup) {
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
    };
    SearchService.prototype._transformFieldKeyToFieldClause = function (field) {
        return new CoreFieldClause(field.database, field.table, field.field);
    };
    SearchService.prototype._transformFieldToPrettyName = function (inputField, fields) {
        return (fields.filter(function (field) { return field.columnName === inputField; })[0] || {}).prettyName;
    };
    SearchService.prototype._transformSortOrder = function (order) {
        return (order === config_option_1.SortOrder.ASCENDING ? 1 : -1);
    };
    /**
     * Transforms the values in the given FilterClause using the given map of keys-to-values-to-labels.
     *
     * @arg {CoreFilterClause} whereClause
     * @arg {{ [key: string]: { [value: string]: string } }} keysToValuesToLabels
     */
    SearchService.prototype._transformFilterClauseNestedValues = function (whereClause, keysToValuesToLabels) {
        switch (whereClause.type) {
            case 'and':
            case 'or':
                for (var _i = 0, _a = whereClause.whereClauses; _i < _a.length; _i++) {
                    var nestedFilterClause = _a[_i];
                    this._transformFilterClauseNestedValues(nestedFilterClause, keysToValuesToLabels);
                }
                break;
            case 'where':
                this._transformFilterClauseValues(whereClause, keysToValuesToLabels);
                break;
        }
    };
    SearchService.prototype._transformFilterClauseValues = function (whereClause, keysToValuesToLabels) {
        var keys = Object.keys(keysToValuesToLabels);
        var key = whereClause.lhs.field;
        if (keys.includes(key)) {
            var valuesToLabels = keysToValuesToLabels[key];
            var values = Object.keys(valuesToLabels);
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                if (valuesToLabels[value] === whereClause.rhs) {
                    whereClause.rhs = value;
                }
            }
        }
    };
    return SearchService;
}(abstract_search_service_1.AbstractSearchService));
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map