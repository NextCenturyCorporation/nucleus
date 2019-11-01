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
var config_option_1 = require("./config-option");
var dataset_1 = require("./dataset");
var date_util_1 = require("../date.util");
var _ = require("lodash");
var FilterValues = /** @class */ (function () {
    function FilterValues() {
    }
    return FilterValues;
}());
exports.FilterValues = FilterValues;
var BoundsValues = /** @class */ (function (_super) {
    __extends(BoundsValues, _super);
    function BoundsValues(begin1, begin2, field1, field2, end1, end2) {
        var _this = _super.call(this) || this;
        _this.begin1 = begin1;
        _this.begin2 = begin2;
        _this.field1 = field1;
        _this.field2 = field2;
        _this.end1 = end1;
        _this.end2 = end2;
        return _this;
    }
    return BoundsValues;
}(FilterValues));
exports.BoundsValues = BoundsValues;
var CompoundValues = /** @class */ (function (_super) {
    __extends(CompoundValues, _super);
    function CompoundValues(type, nested) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.nested = nested;
        return _this;
    }
    return CompoundValues;
}(FilterValues));
exports.CompoundValues = CompoundValues;
var DomainValues = /** @class */ (function (_super) {
    __extends(DomainValues, _super);
    function DomainValues(begin, field, end) {
        var _this = _super.call(this) || this;
        _this.begin = begin;
        _this.field = field;
        _this.end = end;
        return _this;
    }
    return DomainValues;
}(FilterValues));
exports.DomainValues = DomainValues;
var ListOfValues = /** @class */ (function (_super) {
    __extends(ListOfValues, _super);
    function ListOfValues(type, field, operator, values) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.field = field;
        _this.operator = operator;
        _this.values = values;
        return _this;
    }
    return ListOfValues;
}(FilterValues));
exports.ListOfValues = ListOfValues;
var PairOfValues = /** @class */ (function (_super) {
    __extends(PairOfValues, _super);
    function PairOfValues(type, field1, field2, operator1, operator2, value1, value2) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.field1 = field1;
        _this.field2 = field2;
        _this.operator1 = operator1;
        _this.operator2 = operator2;
        _this.value1 = value1;
        _this.value2 = value2;
        return _this;
    }
    return PairOfValues;
}(FilterValues));
exports.PairOfValues = PairOfValues;
var FilterUtil = /** @class */ (function () {
    function FilterUtil() {
    }
    /**
     * Returns if the given FilterDataSource objects are equivalent.
     *
     * @arg {FilterDataSource} item1
     * @arg {FilterDataSource} item2
     * @arg {boolean} [ignoreOperator=false]
     * @return {boolean}
     */
    FilterUtil.areFilterDataSourcesEquivalent = function (item1, item2, ignoreOperator) {
        if (ignoreOperator === void 0) { ignoreOperator = false; }
        return !!(item1.datastore === item2.datastore && item1.database === item2.database && item1.table === item2.table &&
            item1.field === item2.field && (ignoreOperator ? true : item1.operator === item2.operator));
    };
    /**
     * Returns if the given FilterDataSource lists are equivalent.
     *
     * @arg {FilterDataSource[]} list1
     * @arg {FilterDataSource[]} list2
     * @return {boolean}
     */
    FilterUtil.areFilterDataSourceListsEquivalent = function (list1, list2) {
        var _this = this;
        return list1.length === list2.length &&
            // Each FilterDataSource in list1 must be equivalent to a FilterDataSource in list2.
            list1.every(function (item1) { return list2.some(function (item2) { return _this.areFilterDataSourcesEquivalent(item1, item2); }); }) &&
            // Each FilterDataSource in list2 must be equivalent to a FilterDataSource in list1.
            list2.every(function (item2) { return list2.some(function (item1) { return _this.areFilterDataSourcesEquivalent(item1, item2); }); });
    };
    return FilterUtil;
}());
exports.FilterUtil = FilterUtil;
var FilterCollection = /** @class */ (function () {
    function FilterCollection() {
        this.data = new Map();
    }
    /**
     * Returns the data source for the given filter config as either an existing matching data source within this collection or a new data
     * source (the new data source is also saved in this collection with an empty array).
     */
    FilterCollection.prototype.findFilterDataSources = function (filterDesign) {
        var filterDataSourceList = filterDesign.getDataSources();
        // Return a matching existing FilterDataSource list if possible (should either be length 0 or 1 matches).
        var matchingDataSourceList = this.getDataSources().filter(function (existingDataSourceList) {
            return FilterUtil.areFilterDataSourceListsEquivalent(filterDataSourceList, existingDataSourceList);
        });
        if (matchingDataSourceList.length) {
            if (matchingDataSourceList.length > 1) {
                console.error('Multiple equivalent data source objects in filter collection; something is wrong!', this.data);
            }
            return matchingDataSourceList[0];
        }
        // Otherwise save the FilterDataSource in the internal data and return it.
        this.data.set(filterDataSourceList, []);
        return filterDataSourceList;
    };
    /**
     * Returns the list of filters in this filter collection that are compatible with the given filter config.
     */
    FilterCollection.prototype.getCompatibleFilters = function (filterDesign) {
        var filterDataSourceList = this.findFilterDataSources(filterDesign);
        var filterList = this.getFilters(filterDataSourceList);
        return filterList.filter(function (filter) { return filter.isCompatibleWithDesign(filterDesign); });
    };
    /**
     * Returns the data sources within this collection.
     *
     * @return {FilterDataSource[][]}
     */
    FilterCollection.prototype.getDataSources = function () {
        return Array.from(this.data.keys());
    };
    /**
     * Returns the filters for the given data source (or an existing matching data source within this collection).
     *
     * @arg {FilterDataSource[]} [filterDataSourceList]
     * @return {AbstractFilter[]}
     */
    FilterCollection.prototype.getFilters = function (filterDataSourceList) {
        var _this = this;
        if (!filterDataSourceList) {
            return this.getDataSources().reduce(function (filterList, dataSourceList) { return filterList.concat(_this.getFilters(dataSourceList)); }, []);
        }
        if (this.data.has(filterDataSourceList)) {
            return this.data.get(filterDataSourceList) || [];
        }
        // Return a matching existing FilterDataSource list if possible (should either be length 0 or 1 matches).
        var matchingDataSourceList = this.getDataSources().filter(function (existingDataSourceList) {
            return FilterUtil.areFilterDataSourceListsEquivalent(filterDataSourceList, existingDataSourceList);
        });
        if (matchingDataSourceList.length) {
            if (matchingDataSourceList.length > 1) {
                console.error('Multiple equivalent data source objects in filter collection; something is wrong!', this.data);
            }
            return this.data.get(matchingDataSourceList[0]) || [];
        }
        // Otherwise save the FilterDataSource in the internal data and return the empty array.
        this.data.set(filterDataSourceList, []);
        return this.data.get(filterDataSourceList);
    };
    /**
     * Sets the filters for the given data source (or an existing matching data source within this collection) to the given filters, then
     * returns the data source used for the collection key (either the given data source or the existing matching data source).
     *
     * @arg {FilterDataSource[]} filterDataSourceList
     * @arg {AbstractFilter[]} filterList
     * @return {FilterDataSource[]}
     */
    FilterCollection.prototype.setFilters = function (filterDataSourceList, filterList) {
        if (this.data.has(filterDataSourceList)) {
            this.data.set(filterDataSourceList, filterList);
            return filterDataSourceList;
        }
        // Return a matching existing FilterDataSource list if possible (should either be length 0 or 1 matches).
        var matchingDataSourceList = this.getDataSources().filter(function (existingDataSourceList) {
            return FilterUtil.areFilterDataSourceListsEquivalent(filterDataSourceList, existingDataSourceList);
        });
        if (matchingDataSourceList.length) {
            if (matchingDataSourceList.length > 1) {
                console.error('Multiple equivalent data source objects in filter collection; something is wrong!', this.data);
            }
            this.data.set(matchingDataSourceList[0], filterList);
            return matchingDataSourceList[0];
        }
        // Otherwise save the FilterDataSource in the internal data with the input array.
        this.data.set(filterDataSourceList, filterList);
        return filterDataSourceList;
    };
    return FilterCollection;
}());
exports.FilterCollection = FilterCollection;
var filterIdCollection = new Map();
var nextFilterId = 1;
var AbstractFilter = /** @class */ (function () {
    function AbstractFilter(id, relations) {
        if (relations === void 0) { relations = []; }
        this.id = id;
        this.relations = relations;
        if (!this.id) {
            do {
                this.id = 'id' + (nextFilterId++);
            } while (filterIdCollection.get(this.id));
        }
        filterIdCollection.set(this.id, true);
    }
    /**
     * Returns the label for the given field key.  Also returns the database and table if abridged is false.
     */
    AbstractFilter.prototype._createLabelForField = function (fieldKeyString, dataset, abridged) {
        if (abridged === void 0) { abridged = false; }
        var fieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(fieldKeyString);
        var datasetFieldKey = dataset.retrieveDatasetFieldKey(fieldKey);
        return abridged ? datasetFieldKey.field.prettyName : (datasetFieldKey.database.prettyName + ' / ' +
            datasetFieldKey.table.prettyName + ' / ' + datasetFieldKey.field.prettyName);
    };
    /**
     * Returns the label for the given two field keys and filter type.
     */
    AbstractFilter.prototype._createLabelForTwoFields = function (fieldKeyString1, fieldKeyString2, dataset, type, abridged) {
        if (abridged === void 0) { abridged = false; }
        var label1 = this._createLabelForField(fieldKeyString1, dataset, abridged);
        var label2 = this._createLabelForField(fieldKeyString2, dataset, abridged);
        if (abridged) {
            var nestedFields1 = label1.split('.');
            var nestedFields2 = label2.split('.');
            if (nestedFields1.length === nestedFields2.length && nestedFields1.length > 1) {
                var fieldsPrefix1 = label1.substring(0, label1.lastIndexOf('.'));
                if (fieldsPrefix1 === label2.substring(0, label2.lastIndexOf('.'))) {
                    return fieldsPrefix1;
                }
            }
        }
        return label1 + ' ' + type + ' ' + label2;
    };
    /**
     * Returns the label for the given filter operator.
     */
    AbstractFilter.prototype._createLabelForOperator = function (operator) {
        return operator === '=' ? '' : operator;
    };
    /**
     * Returns the label for the given field key and values.
     */
    AbstractFilter.prototype._createLabelForValue = function (fieldKeyString, value, dataset) {
        var fieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(fieldKeyString);
        var datasetFieldKey = dataset.retrieveDatasetFieldKey(fieldKey);
        if (datasetFieldKey.field.type === 'date' || value instanceof Date) {
            // TODO THOR-1259 Let user switch from UTC to local time
            // TODO THOR-1329 If hour or minutes are not zero, add hour and minutes and seconds to output string format.
            return date_util_1.DateUtil.fromDateToString(value, date_util_1.DateFormat.SHORT);
        }
        if (typeof value === 'number') {
            return '' + (value % 1 === 0 ? value : parseFloat('' + value).toFixed(3));
        }
        return value === '' ? '<empty>' : value;
    };
    /**
     * Creates and returns the relation filter list for the filter.
     */
    AbstractFilter.prototype.createRelationFilterList = function (dataset) {
        var _this = this;
        var filterDataSourceList = this.toDesign().getDataSources(true);
        return dataset.getRelations().reduce(function (returnList, relation) {
            var relationFilterList = [];
            // Assume that each item within the relation list is a nested list with the same length.
            // EX:  [[x1, y1], [x2, y2], [x3, y3]]
            if (relation.length && relation[0].length === filterDataSourceList.length) {
                var equivalentRelationList_1 = relation.filter(function (relationFieldKeyList) {
                    // Each item within the relationFieldKeyList must be equivalent to a FilterDataSource.
                    return relationFieldKeyList.every(function (relationFieldKey) { return filterDataSourceList.some(function (filterDataSource) {
                        return _this._isRelationEquivalent(relationFieldKey, filterDataSource);
                    }); }) &&
                        // Each FilterDataSource must be equivalent to an item within the relationFieldKeyList.
                        filterDataSourceList.every(function (filterDataSource) { return relationFieldKeyList.some(function (relationFieldKey) {
                            return _this._isRelationEquivalent(relationFieldKey, filterDataSource);
                        }); });
                });
                // The length of equivalentRelationList should be either 0 or 1.
                if (equivalentRelationList_1.length) {
                    // Create new relation filters.
                    relation.forEach(function (relationFieldKeyList) {
                        // Do not create a relation that is the same as the original filter.
                        if (relationFieldKeyList !== equivalentRelationList_1[0]) {
                            var relationFilter = _this.createRelationFilter(equivalentRelationList_1[0], relationFieldKeyList);
                            relationFilterList.push(relationFilter);
                        }
                    });
                    // Save sibling relation filter IDs in the new relation filters.
                    relationFilterList.concat(_this).forEach(function (outerFilter) {
                        relationFilterList.concat(_this).forEach(function (innerFilter) {
                            if (outerFilter.id !== innerFilter.id) {
                                outerFilter.relations.push(innerFilter.id);
                            }
                        });
                    });
                }
            }
            return returnList.concat(relationFilterList);
        }, []);
    };
    /**
     * Returns the label for the filter.
     */
    AbstractFilter.prototype.getLabel = function (dataset) {
        return this.getLabelForField(dataset) + this.getLabelForValue(dataset);
    };
    /**
     * Returns if the given field is equivalent to the given data source.
     *
     * @arg {FieldKey} fieldKey
     * @arg {FilterDataSource} filterDataSource
     * @return {boolean}
     * @private
     */
    AbstractFilter.prototype._isRelationEquivalent = function (fieldKey, filterDataSource) {
        return !!(fieldKey.datastore === filterDataSource.datastore && fieldKey.database === filterDataSource.database &&
            fieldKey.table === filterDataSource.table && fieldKey.field === filterDataSource.field);
    };
    return AbstractFilter;
}());
exports.AbstractFilter = AbstractFilter;
var CompoundFilter = /** @class */ (function (_super) {
    __extends(CompoundFilter, _super);
    function CompoundFilter(type, filters, id, relations) {
        var _this = _super.call(this, id, relations) || this;
        _this.type = type;
        _this.filters = filters;
        return _this;
    }
    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     */
    CompoundFilter.prototype.createRelationFilter = function (equivalentFieldKeyList, substituteFieldKeyList) {
        if (equivalentFieldKeyList.length !== substituteFieldKeyList.length) {
            return null;
        }
        var nestedRelationExists = false;
        var relationFilter = new CompoundFilter(this.type, this.filters.map(function (filter) {
            var nestedRelationFilter = filter.createRelationFilter(equivalentFieldKeyList, substituteFieldKeyList);
            nestedRelationExists = nestedRelationExists || !!nestedRelationFilter;
            // A compound filter can exchange one of its nested filters with a relation and keep the rest of the original nested filters.
            return nestedRelationFilter || filter;
        }));
        // Return null unless at least one nested relation filter exists.
        return nestedRelationExists ? relationFilter : null;
    };
    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    CompoundFilter.prototype.doesAffectSearch = function (datastore, database, table) {
        return this.filters.some(function (nested) { return nested.doesAffectSearch(datastore, database, table); });
    };
    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    CompoundFilter.prototype.getLabelForField = function (__dataset, __abridged) {
        if (__abridged === void 0) { __abridged = false; }
        return '';
    };
    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    CompoundFilter.prototype.getLabelForValue = function (dataset, abridged) {
        // TODO THOR-1333 Improve label for custom compound filter
        var _this = this;
        if (abridged === void 0) { abridged = false; }
        // Group the filters by unique field.
        var filtersByField = this.filters.reduce(function (collection, filter) {
            var field = filter.getLabelForField(dataset, abridged);
            collection[field] = collection[field] || [];
            collection[field].push(filter);
            return collection;
        }, {});
        return '(' + Object.keys(filtersByField).reduce(function (list, field) {
            var labels = filtersByField[field].map(function (filter) { return filter.getLabelForValue(dataset, abridged); });
            // Do not show parentheses around only one operator.
            return list.concat(field + ' ' + (labels.length > 1 ? ('(' + labels.join(' ' + _this.type + ' ') + ')') : labels[0]));
        }, []).join(') ' + this.type + ' (') + ')';
    };
    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    CompoundFilter.prototype.isCompatibleWithDesign = function (filterDesign) {
        var _this = this;
        if (!(filterDesign instanceof CompoundFilterDesign)) {
            return false;
        }
        var compoundFilterDesign = (filterDesign);
        // If the filter design contains more than one FilterDataSource, ensure that 1) each nested design is compatible with at least one
        // nested filter object, 2) each nested filter object is compatible with at least one nested filter design, and 3) both lists are
        // the same length.  This forces designs to have specific nested filters but lets them have nested filters in an unexpected order.
        return compoundFilterDesign.type === this.type &&
            compoundFilterDesign.filters &&
            compoundFilterDesign.filters.length === this.filters.length &&
            compoundFilterDesign.filters.every(function (nestedDesign) {
                return _this.filters.some(function (nestedFilter) {
                    return nestedFilter.isCompatibleWithDesign(nestedDesign);
                });
            }) &&
            this.filters.every(function (nestedFilter) {
                return compoundFilterDesign.filters.some(function (nestedDesign) {
                    return nestedFilter.isCompatibleWithDesign(nestedDesign);
                });
            });
    };
    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    CompoundFilter.prototype.isEquivalentToFilter = function (filter) {
        var _this = this;
        return filter instanceof CompoundFilter && filter.type === this.type &&
            filter.filters.length === this.filters.length &&
            filter.filters.every(function (nestedFilter, index) { return nestedFilter && nestedFilter.isEquivalentToFilter(_this.filters[index]); });
    };
    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    CompoundFilter.prototype.retrieveValues = function () {
        return new CompoundValues(this.type, this.filters.reduce(function (list, filter) { return list.concat(filter.retrieveValues()); }, []));
    };
    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    CompoundFilter.prototype.toDesign = function () {
        return new CompoundFilterDesign(this.type, this.filters.map(function (filter) { return filter.toDesign(); }), this.id, this.relations);
    };
    return CompoundFilter;
}(AbstractFilter));
exports.CompoundFilter = CompoundFilter;
var BoundsFilter = /** @class */ (function (_super) {
    __extends(BoundsFilter, _super);
    function BoundsFilter(fieldKey1, fieldKey2, begin1, begin2, end1, end2, id, relations) {
        var _this = _super.call(this, id, relations) || this;
        _this.fieldKey1 = fieldKey1;
        _this.fieldKey2 = fieldKey2;
        _this.begin1 = begin1;
        _this.begin2 = begin2;
        _this.end1 = end1;
        _this.end2 = end2;
        return _this;
    }
    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     *
     * @override
     */
    BoundsFilter.prototype.createRelationFilter = function (equivalentFieldKeyList, substituteFieldKeyList) {
        if (equivalentFieldKeyList.length !== 2 || substituteFieldKeyList.length !== 2) {
            return null;
        }
        if (substituteFieldKeyList[0].database && substituteFieldKeyList[0].table && substituteFieldKeyList[0].field &&
            substituteFieldKeyList[1].database && substituteFieldKeyList[1].table && substituteFieldKeyList[1].field) {
            var internalFieldKey1 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey1);
            var internalFieldKey2 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey2);
            if (dataset_1.DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[0], internalFieldKey1) &&
                dataset_1.DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[1], internalFieldKey2)) {
                return new BoundsFilter(dataset_1.DatasetUtil.fieldKeyToString(substituteFieldKeyList[0]), dataset_1.DatasetUtil.fieldKeyToString(substituteFieldKeyList[1]), this.begin1, this.begin2, this.end1, this.end2);
            }
            if (dataset_1.DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[1], internalFieldKey1) &&
                dataset_1.DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[0], internalFieldKey2)) {
                return new BoundsFilter(dataset_1.DatasetUtil.fieldKeyToString(substituteFieldKeyList[1]), dataset_1.DatasetUtil.fieldKeyToString(substituteFieldKeyList[0]), this.begin1, this.begin2, this.end1, this.end2);
            }
        }
        return null;
    };
    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    BoundsFilter.prototype.doesAffectSearch = function (datastore, database, table) {
        var fieldKey1 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey1);
        var fieldKey2 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey2);
        return (fieldKey1.datastore === datastore && fieldKey1.database === database && fieldKey1.table === table) ||
            (fieldKey2.datastore === datastore && fieldKey2.database === database && fieldKey2.table === table);
    };
    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    BoundsFilter.prototype.getLabelForField = function (dataset, abridged) {
        if (abridged === void 0) { abridged = false; }
        return this._createLabelForTwoFields(this.fieldKey1, this.fieldKey2, dataset, config_option_1.CompoundFilterType.AND, abridged);
    };
    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    BoundsFilter.prototype.getLabelForValue = function (dataset, __abridged) {
        if (__abridged === void 0) { __abridged = false; }
        return 'from (' + this._createLabelForValue(this.fieldKey1, this.begin1, dataset) + ', ' +
            this._createLabelForValue(this.fieldKey2, this.begin2, dataset) + ') to (' +
            this._createLabelForValue(this.fieldKey1, this.end1, dataset) + ', ' +
            this._createLabelForValue(this.fieldKey2, this.end2, dataset) + ')';
    };
    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    BoundsFilter.prototype.isCompatibleWithDesign = function (filterDesign) {
        return filterDesign instanceof BoundsFilterDesign && filterDesign.fieldKey1 === this.fieldKey1 &&
            filterDesign.fieldKey2 === this.fieldKey2 &&
            (typeof filterDesign.begin1 !== 'undefined' ? filterDesign.begin1 === this.begin1 : true) &&
            (typeof filterDesign.begin2 !== 'undefined' ? filterDesign.begin2 === this.begin2 : true) &&
            (typeof filterDesign.end1 !== 'undefined' ? filterDesign.end1 === this.end1 : true) &&
            (typeof filterDesign.end2 !== 'undefined' ? filterDesign.end2 === this.end2 : true);
    };
    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    BoundsFilter.prototype.isEquivalentToFilter = function (filter) {
        return filter instanceof BoundsFilter && filter.fieldKey1 === this.fieldKey1 && filter.fieldKey2 === this.fieldKey2 &&
            filter.begin1 === this.begin1 && filter.begin2 === this.begin2 && filter.end1 === this.end1 && filter.end2 === this.end2;
    };
    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    BoundsFilter.prototype.retrieveValues = function () {
        return new BoundsValues(this.begin1, this.begin2, this.fieldKey1, this.fieldKey2, this.end1, this.end2);
    };
    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    BoundsFilter.prototype.toDesign = function () {
        return new BoundsFilterDesign(this.fieldKey1, this.fieldKey2, this.begin1, this.begin2, this.end1, this.end2, this.id, this.relations);
    };
    return BoundsFilter;
}(AbstractFilter));
exports.BoundsFilter = BoundsFilter;
var DomainFilter = /** @class */ (function (_super) {
    __extends(DomainFilter, _super);
    function DomainFilter(fieldKey, begin, end, id, relations) {
        var _this = _super.call(this, id, relations) || this;
        _this.fieldKey = fieldKey;
        _this.begin = begin;
        _this.end = end;
        return _this;
    }
    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     *
     * @override
     */
    DomainFilter.prototype.createRelationFilter = function (equivalentFieldKeyList, substituteFieldKeyList) {
        if (equivalentFieldKeyList.length !== 1 || substituteFieldKeyList.length !== 1) {
            return null;
        }
        if (substituteFieldKeyList[0].database && substituteFieldKeyList[0].table && substituteFieldKeyList[0].field) {
            var internalFieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey);
            if (dataset_1.DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[0], internalFieldKey)) {
                return new DomainFilter(dataset_1.DatasetUtil.fieldKeyToString(substituteFieldKeyList[0]), this.begin, this.end);
            }
        }
        return null;
    };
    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    DomainFilter.prototype.doesAffectSearch = function (datastore, database, table) {
        var fieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey);
        return (fieldKey.datastore === datastore && fieldKey.database === database && fieldKey.table === table);
    };
    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    DomainFilter.prototype.getLabelForField = function (dataset, abridged) {
        if (abridged === void 0) { abridged = false; }
        return this._createLabelForField(this.fieldKey, dataset, abridged);
    };
    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    DomainFilter.prototype.getLabelForValue = function (dataset, __abridged) {
        if (__abridged === void 0) { __abridged = false; }
        return 'between ' + this._createLabelForValue(this.fieldKey, this.begin, dataset) + ' and ' +
            this._createLabelForValue(this.fieldKey, this.end, dataset);
    };
    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    DomainFilter.prototype.isCompatibleWithDesign = function (filterDesign) {
        return filterDesign instanceof DomainFilterDesign && filterDesign.fieldKey === this.fieldKey &&
            (typeof filterDesign.begin !== 'undefined' ? filterDesign.begin === this.begin : true) &&
            (typeof filterDesign.end !== 'undefined' ? filterDesign.end === this.end : true);
    };
    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    DomainFilter.prototype.isEquivalentToFilter = function (filter) {
        return filter instanceof DomainFilter && filter.fieldKey === this.fieldKey && filter.begin === this.begin &&
            filter.end === this.end;
    };
    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    DomainFilter.prototype.retrieveValues = function () {
        return new DomainValues(this.begin, this.fieldKey, this.end);
    };
    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    DomainFilter.prototype.toDesign = function () {
        return new DomainFilterDesign(this.fieldKey, this.begin, this.end, this.id, this.relations);
    };
    return DomainFilter;
}(AbstractFilter));
exports.DomainFilter = DomainFilter;
var ListFilter = /** @class */ (function (_super) {
    __extends(ListFilter, _super);
    function ListFilter(type, fieldKey, operator, values, id, relations) {
        var _this = _super.call(this, id, relations) || this;
        _this.type = type;
        _this.fieldKey = fieldKey;
        _this.operator = operator;
        _this._updateValues(values);
        return _this;
    }
    Object.defineProperty(ListFilter.prototype, "values", {
        get: function () {
            return this._values;
        },
        set: function (input) {
            this._updateValues(input);
        },
        enumerable: true,
        configurable: true
    });
    ListFilter.prototype._updateValues = function (input) {
        this._values = ((input && Array.isArray(input) && input.length) ? input : []).filter(function (value) { return typeof value !== 'undefined'; });
        if (!this._values.length) {
            console.warn('ListFilter ' + this.id + ' with fieldkey ' + this.fieldKey + ' and operator ' + this.operator +
                ' should have values but does not!');
        }
    };
    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     *
     * @override
     */
    ListFilter.prototype.createRelationFilter = function (equivalentFieldKeyList, substituteFieldKeyList) {
        if (equivalentFieldKeyList.length !== 1 || substituteFieldKeyList.length !== 1) {
            return null;
        }
        if (substituteFieldKeyList[0].database && substituteFieldKeyList[0].table && substituteFieldKeyList[0].field) {
            var internalFieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey);
            if (dataset_1.DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[0], internalFieldKey)) {
                return new ListFilter(this.type, dataset_1.DatasetUtil.fieldKeyToString(substituteFieldKeyList[0]), this.operator, this._values);
            }
        }
        return null;
    };
    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    ListFilter.prototype.doesAffectSearch = function (datastore, database, table) {
        var fieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey);
        return (fieldKey.datastore === datastore && fieldKey.database === database && fieldKey.table === table);
    };
    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    ListFilter.prototype.getLabelForField = function (dataset, abridged) {
        if (abridged === void 0) { abridged = false; }
        return this._createLabelForField(this.fieldKey, dataset, abridged);
    };
    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    ListFilter.prototype.getLabelForValue = function (dataset, __abridged) {
        var _this = this;
        if (__abridged === void 0) { __abridged = false; }
        // Only show the first 3 values.  Add a suffix with the count of the hidden values.
        var labels = this._values.slice(0, 3).map(function (value) {
            return _this._createLabelForValue(_this.fieldKey, value, dataset);
        });
        var suffix = (this._values.length > 3 ? (' ' + this.type + ' ' + (this._values.length - 3) + ' more...') : '');
        var operator = this._createLabelForOperator(this.operator);
        // Do not show the operator if it is empty.
        return (operator ? (operator + ' ' + (labels.length > 1 ? '(' : '')) : '') + labels.join(' ' + this.type + ' ') + suffix +
            ((operator && labels.length > 1) ? ')' : '');
    };
    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    ListFilter.prototype.isCompatibleWithDesign = function (filterDesign) {
        var _this = this;
        if (filterDesign instanceof ListFilterDesign && filterDesign.fieldKey === this.fieldKey &&
            filterDesign.operator === this.operator && filterDesign.type === this.type) {
            if (!filterDesign.values || !filterDesign.values.length ||
                (filterDesign.values.length === 1 && typeof filterDesign.values[0] === 'undefined')) {
                return true;
            }
            if (filterDesign.values.length !== this._values.length) {
                return false;
            }
            return filterDesign.values.every(function (value, index) { return value === _this._values[index]; });
        }
        return false;
    };
    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    ListFilter.prototype.isEquivalentToFilter = function (filter) {
        return filter instanceof ListFilter && filter.fieldKey === this.fieldKey && filter.operator === this.operator &&
            filter.type === this.type && _.isEqual(_.sortBy(filter.values), _.sortBy(this._values));
    };
    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    ListFilter.prototype.retrieveValues = function () {
        return new ListOfValues(this.type, this.fieldKey, this.operator, this._values);
    };
    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    ListFilter.prototype.toDesign = function () {
        return new ListFilterDesign(this.type, this.fieldKey, this.operator, (this._values.length ? this._values : [undefined]), this.id, this.relations);
    };
    return ListFilter;
}(AbstractFilter));
exports.ListFilter = ListFilter;
var PairFilter = /** @class */ (function (_super) {
    __extends(PairFilter, _super);
    function PairFilter(type, fieldKey1, fieldKey2, operator1, operator2, value1, value2, id, relations) {
        var _this = _super.call(this, id, relations) || this;
        _this.type = type;
        _this.fieldKey1 = fieldKey1;
        _this.fieldKey2 = fieldKey2;
        _this.operator1 = operator1;
        _this.operator2 = operator2;
        _this.value1 = value1;
        _this.value2 = value2;
        return _this;
    }
    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     *
     * @override
     */
    PairFilter.prototype.createRelationFilter = function (equivalentFieldKeyList, substituteFieldKeyList) {
        if (equivalentFieldKeyList.length !== 2 || substituteFieldKeyList.length !== 2) {
            return null;
        }
        if (substituteFieldKeyList[0].database && substituteFieldKeyList[0].table && substituteFieldKeyList[0].field &&
            substituteFieldKeyList[1].database && substituteFieldKeyList[1].table && substituteFieldKeyList[1].field) {
            var internalFieldKey1 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey1);
            var internalFieldKey2 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey2);
            if (dataset_1.DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[0], internalFieldKey1) &&
                dataset_1.DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[1], internalFieldKey2)) {
                return new PairFilter(this.type, dataset_1.DatasetUtil.fieldKeyToString(substituteFieldKeyList[0]), dataset_1.DatasetUtil.fieldKeyToString(substituteFieldKeyList[1]), this.operator1, this.operator2, this.value1, this.value2);
            }
            if (dataset_1.DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[1], internalFieldKey1) &&
                dataset_1.DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[0], internalFieldKey2)) {
                return new PairFilter(this.type, dataset_1.DatasetUtil.fieldKeyToString(substituteFieldKeyList[1]), dataset_1.DatasetUtil.fieldKeyToString(substituteFieldKeyList[0]), this.operator1, this.operator2, this.value1, this.value2);
            }
        }
        return null;
    };
    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    PairFilter.prototype.doesAffectSearch = function (datastore, database, table) {
        var fieldKey1 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey1);
        var fieldKey2 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey2);
        return (fieldKey1.datastore === datastore && fieldKey1.database === database && fieldKey1.table === table) ||
            (fieldKey2.datastore === datastore && fieldKey2.database === database && fieldKey2.table === table);
    };
    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    PairFilter.prototype.getLabelForField = function (dataset, abridged) {
        if (abridged === void 0) { abridged = false; }
        return this._createLabelForTwoFields(this.fieldKey1, this.fieldKey2, dataset, this.type, abridged);
    };
    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    PairFilter.prototype.getLabelForValue = function (dataset, __abridged) {
        if (__abridged === void 0) { __abridged = false; }
        var operator1 = this._createLabelForOperator(this.operator1);
        var operator2 = this._createLabelForOperator(this.operator2);
        // If the operator of each nested filter is the same, only show it once.  Do not show the operator if it is empty.
        if (operator1 === operator2) {
            return (operator1 ? (operator1 + ' ') : '') + '(' + this._createLabelForValue(this.fieldKey1, this.value1, dataset) +
                ' ' + this.type + ' ' + this._createLabelForValue(this.fieldKey2, this.value2, dataset) + ')';
        }
        // Do not show the operator if it is empty.
        return (operator1 ? (operator1 + ' ') : '') + this._createLabelForValue(this.fieldKey1, this.value1, dataset) + ' ' +
            this.type + ' ' + (operator2 ? (operator2 + ' ') : '') + this._createLabelForValue(this.fieldKey2, this.value2, dataset);
    };
    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    PairFilter.prototype.isCompatibleWithDesign = function (filterDesign) {
        return filterDesign instanceof PairFilterDesign && filterDesign.fieldKey1 === this.fieldKey1 &&
            filterDesign.fieldKey2 === this.fieldKey2 && filterDesign.operator1 === this.operator1 &&
            filterDesign.operator2 === this.operator2 && filterDesign.type === this.type &&
            (typeof filterDesign.value1 !== 'undefined' ? filterDesign.value1 === this.value1 : true) &&
            (typeof filterDesign.value2 !== 'undefined' ? filterDesign.value2 === this.value2 : true);
    };
    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    PairFilter.prototype.isEquivalentToFilter = function (filter) {
        return filter instanceof PairFilter && filter.fieldKey1 === this.fieldKey1 && filter.fieldKey2 === this.fieldKey2 &&
            filter.operator1 === this.operator1 && filter.operator2 === this.operator2 && filter.value1 === this.value1 &&
            filter.value2 === this.value2 && filter.type === this.type;
    };
    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    PairFilter.prototype.retrieveValues = function () {
        return new PairOfValues(this.type, this.fieldKey1, this.fieldKey2, this.operator1, this.operator2, this.value1, this.value2);
    };
    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    PairFilter.prototype.toDesign = function () {
        return new PairFilterDesign(this.type, this.fieldKey1, this.fieldKey2, this.operator1, this.operator2, this.value1, this.value2, this.id, this.relations);
    };
    return PairFilter;
}(AbstractFilter));
exports.PairFilter = PairFilter;
var AbstractFilterDesign = /** @class */ (function () {
    function AbstractFilterDesign(id, relations) {
        if (relations === void 0) { relations = []; }
        this.id = id;
        this.relations = relations;
    }
    return AbstractFilterDesign;
}());
exports.AbstractFilterDesign = AbstractFilterDesign;
var CompoundFilterDesign = /** @class */ (function (_super) {
    __extends(CompoundFilterDesign, _super);
    function CompoundFilterDesign(type, filters, id, relations) {
        var _this = _super.call(this, id, relations) || this;
        _this.type = type;
        _this.filters = filters;
        return _this;
    }
    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    CompoundFilterDesign.prototype.getDataSources = function (ignoreOperator) {
        if (ignoreOperator === void 0) { ignoreOperator = false; }
        return this.filters.reduce(function (list, nestedDesign) {
            var nestedDataSourceList = nestedDesign.getDataSources(ignoreOperator);
            nestedDataSourceList.forEach(function (nestedDataSource) {
                var exists = list.some(function (existingDataSource) { return FilterUtil.areFilterDataSourcesEquivalent(nestedDataSource, existingDataSource, ignoreOperator); });
                if (!exists) {
                    list.push(nestedDataSource);
                }
            });
            return list;
        }, []);
    };
    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    CompoundFilterDesign.prototype.toFilter = function () {
        return new CompoundFilter(this.type, this.filters.map(function (nestedDesign) { return nestedDesign.toFilter(); }), this.id, this.relations);
    };
    return CompoundFilterDesign;
}(AbstractFilterDesign));
exports.CompoundFilterDesign = CompoundFilterDesign;
var BoundsFilterDesign = /** @class */ (function (_super) {
    __extends(BoundsFilterDesign, _super);
    function BoundsFilterDesign(fieldKey1, fieldKey2, begin1, begin2, end1, end2, id, relations) {
        var _this = _super.call(this, id, relations) || this;
        _this.fieldKey1 = fieldKey1;
        _this.fieldKey2 = fieldKey2;
        _this.begin1 = begin1;
        _this.begin2 = begin2;
        _this.end1 = end1;
        _this.end2 = end2;
        return _this;
    }
    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    BoundsFilterDesign.prototype.getDataSources = function (ignoreOperator) {
        if (ignoreOperator === void 0) { ignoreOperator = false; }
        var fieldKey1 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey1);
        var fieldKey2 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey2);
        if (this.fieldKey1 === this.fieldKey2) {
            if (ignoreOperator) {
                return [{
                        datastore: fieldKey1.datastore,
                        database: fieldKey1.database,
                        table: fieldKey1.table,
                        field: fieldKey1.field,
                        operator: null
                    }];
            }
            return [{
                    datastore: fieldKey1.datastore,
                    database: fieldKey1.database,
                    table: fieldKey1.table,
                    field: fieldKey1.field,
                    operator: '>='
                }, {
                    datastore: fieldKey1.datastore,
                    database: fieldKey1.database,
                    table: fieldKey1.table,
                    field: fieldKey1.field,
                    operator: '<='
                }];
        }
        if (ignoreOperator) {
            return [{
                    datastore: fieldKey1.datastore,
                    database: fieldKey1.database,
                    table: fieldKey1.table,
                    field: fieldKey1.field,
                    operator: null
                }, {
                    datastore: fieldKey2.datastore,
                    database: fieldKey2.database,
                    table: fieldKey2.table,
                    field: fieldKey2.field,
                    operator: null
                }];
        }
        return [{
                datastore: fieldKey1.datastore,
                database: fieldKey1.database,
                table: fieldKey1.table,
                field: fieldKey1.field,
                operator: '>='
            }, {
                datastore: fieldKey1.datastore,
                database: fieldKey1.database,
                table: fieldKey1.table,
                field: fieldKey1.field,
                operator: '<='
            }, {
                datastore: fieldKey2.datastore,
                database: fieldKey2.database,
                table: fieldKey2.table,
                field: fieldKey2.field,
                operator: '>='
            }, {
                datastore: fieldKey2.datastore,
                database: fieldKey2.database,
                table: fieldKey2.table,
                field: fieldKey2.field,
                operator: '<='
            }];
    };
    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    BoundsFilterDesign.prototype.toFilter = function () {
        return new BoundsFilter(this.fieldKey1, this.fieldKey2, this.begin1, this.begin2, this.end1, this.end2, this.id, this.relations);
    };
    return BoundsFilterDesign;
}(AbstractFilterDesign));
exports.BoundsFilterDesign = BoundsFilterDesign;
var DomainFilterDesign = /** @class */ (function (_super) {
    __extends(DomainFilterDesign, _super);
    function DomainFilterDesign(fieldKey, begin, end, id, relations) {
        var _this = _super.call(this, id, relations) || this;
        _this.fieldKey = fieldKey;
        _this.begin = begin;
        _this.end = end;
        return _this;
    }
    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    DomainFilterDesign.prototype.getDataSources = function (ignoreOperator) {
        if (ignoreOperator === void 0) { ignoreOperator = false; }
        var fieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey);
        if (ignoreOperator) {
            return [{
                    datastore: fieldKey.datastore,
                    database: fieldKey.database,
                    table: fieldKey.table,
                    field: fieldKey.field,
                    operator: null
                }];
        }
        return [{
                datastore: fieldKey.datastore,
                database: fieldKey.database,
                table: fieldKey.table,
                field: fieldKey.field,
                operator: '>='
            }, {
                datastore: fieldKey.datastore,
                database: fieldKey.database,
                table: fieldKey.table,
                field: fieldKey.field,
                operator: '<='
            }];
    };
    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    DomainFilterDesign.prototype.toFilter = function () {
        return new DomainFilter(this.fieldKey, this.begin, this.end, this.id, this.relations);
    };
    return DomainFilterDesign;
}(AbstractFilterDesign));
exports.DomainFilterDesign = DomainFilterDesign;
var ListFilterDesign = /** @class */ (function (_super) {
    __extends(ListFilterDesign, _super);
    function ListFilterDesign(type, fieldKey, operator, values, id, relations) {
        var _this = _super.call(this, id, relations) || this;
        _this.type = type;
        _this.fieldKey = fieldKey;
        _this.operator = operator;
        _this.values = values;
        return _this;
    }
    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    ListFilterDesign.prototype.getDataSources = function (ignoreOperator) {
        if (ignoreOperator === void 0) { ignoreOperator = false; }
        var fieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey);
        return [{
                datastore: fieldKey.datastore,
                database: fieldKey.database,
                table: fieldKey.table,
                field: fieldKey.field,
                operator: ignoreOperator ? null : this.operator
            }];
    };
    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    ListFilterDesign.prototype.toFilter = function () {
        return new ListFilter(this.type, this.fieldKey, this.operator, this.values, this.id, this.relations);
    };
    return ListFilterDesign;
}(AbstractFilterDesign));
exports.ListFilterDesign = ListFilterDesign;
var PairFilterDesign = /** @class */ (function (_super) {
    __extends(PairFilterDesign, _super);
    function PairFilterDesign(type, fieldKey1, fieldKey2, operator1, operator2, value1, value2, id, relations) {
        var _this = _super.call(this, id, relations) || this;
        _this.type = type;
        _this.fieldKey1 = fieldKey1;
        _this.fieldKey2 = fieldKey2;
        _this.operator1 = operator1;
        _this.operator2 = operator2;
        _this.value1 = value1;
        _this.value2 = value2;
        return _this;
    }
    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    PairFilterDesign.prototype.getDataSources = function (ignoreOperator) {
        if (ignoreOperator === void 0) { ignoreOperator = false; }
        var fieldKey1 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey1);
        var fieldKey2 = dataset_1.DatasetUtil.deconstructTableOrFieldKey(this.fieldKey2);
        if (this.fieldKey1 === this.fieldKey2) {
            if (this.operator1 === this.operator2 || ignoreOperator) {
                return [{
                        datastore: fieldKey1.datastore,
                        database: fieldKey1.database,
                        table: fieldKey1.table,
                        field: fieldKey1.field,
                        operator: ignoreOperator ? null : this.operator1
                    }];
            }
            return [{
                    datastore: fieldKey1.datastore,
                    database: fieldKey1.database,
                    table: fieldKey1.table,
                    field: fieldKey1.field,
                    operator: this.operator1
                }, {
                    datastore: fieldKey2.datastore,
                    database: fieldKey2.database,
                    table: fieldKey2.table,
                    field: fieldKey2.field,
                    operator: this.operator2
                }];
        }
        return [{
                datastore: fieldKey1.datastore,
                database: fieldKey1.database,
                table: fieldKey1.table,
                field: fieldKey1.field,
                operator: ignoreOperator ? null : this.operator1
            }, {
                datastore: fieldKey2.datastore,
                database: fieldKey2.database,
                table: fieldKey2.table,
                field: fieldKey2.field,
                operator: ignoreOperator ? null : this.operator2
            }];
    };
    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    PairFilterDesign.prototype.toFilter = function () {
        return new PairFilter(this.type, this.fieldKey1, this.fieldKey2, this.operator1, this.operator2, this.value1, this.value2, this.id, this.relations);
    };
    return PairFilterDesign;
}(AbstractFilterDesign));
exports.PairFilterDesign = PairFilterDesign;
//# sourceMappingURL=filters.js.map