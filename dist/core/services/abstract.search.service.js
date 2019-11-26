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
Object.defineProperty(exports, "__esModule", { value: true });
var filters_1 = require("../models/filters");
var config_option_1 = require("../models/config-option");
var dataset_1 = require("../models/dataset");
/* eslint-enable @typescript-eslint/no-empty-interface */
var AbstractSearchService = /** @class */ (function () {
    function AbstractSearchService() {
    }
    /**
     * Returns a filter clause using the given filter.
     *
     * @arg {AbstractFilter}
     * @return {FilterClause}
     */
    AbstractSearchService.prototype.generateFilterClauseFromFilter = function (filter) {
        var _this = this;
        if (filter instanceof filters_1.BoundsFilter) {
            var fieldKey1 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey1);
            var fieldKey2 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey2);
            return this.createCompoundFilterClause([
                this.createFilterClause(fieldKey1, '>=', filter.begin1),
                this.createFilterClause(fieldKey1, '<=', filter.end1),
                this.createFilterClause(fieldKey2, '>=', filter.begin2),
                this.createFilterClause(fieldKey2, '<=', filter.end2)
            ], config_option_1.CompoundFilterType.AND);
        }
        if (filter instanceof filters_1.DomainFilter) {
            var fieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey);
            return this.createCompoundFilterClause([
                this.createFilterClause(fieldKey, '>=', filter.begin),
                this.createFilterClause(fieldKey, '<=', filter.end)
            ], config_option_1.CompoundFilterType.AND);
        }
        if (filter instanceof filters_1.ListFilter) {
            var fieldKey_1 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey);
            return this.createCompoundFilterClause(filter.values.map(function (value) {
                return _this.createFilterClause(fieldKey_1, filter.operator, value);
            }), filter.type);
        }
        if (filter instanceof filters_1.PairFilter) {
            var fieldKey1 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey1);
            var fieldKey2 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(filter.fieldKey2);
            return this.createCompoundFilterClause([
                this.createFilterClause(fieldKey1, filter.operator1, filter.value1),
                this.createFilterClause(fieldKey2, filter.operator2, filter.value2)
            ], filter.type);
        }
        if (filter instanceof filters_1.CompoundFilter) {
            return this.createCompoundFilterClause(filter.filters.map(function (nested) { return _this.generateFilterClauseFromFilter(nested); }), filter.type);
        }
        return null;
    };
    /**
     * Returns an aggregation name from the given descriptor.
     *
     * @arg {string} [descriptor]
     * @return {string}
     */
    AbstractSearchService.prototype.getAggregationName = function (descriptor) {
        return descriptor ? ('_' + descriptor) : '_aggregation';
    };
    return AbstractSearchService;
}());
exports.AbstractSearchService = AbstractSearchService;
//# sourceMappingURL=abstract.search.service.js.map