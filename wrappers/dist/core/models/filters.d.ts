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
import { CompoundFilterType } from './config-option';
import { Dataset, FieldKey } from './dataset';
export interface FilterDataSource {
    datastore: string;
    database: string;
    table: string;
    field: string;
    operator: string;
}
export declare abstract class FilterValues {
}
export declare class BoundsValues extends FilterValues {
    begin1: boolean | number | string;
    begin2: boolean | number | string;
    field1: string;
    field2: string;
    end1: boolean | number | string;
    end2: boolean | number | string;
    constructor(begin1: boolean | number | string, begin2: boolean | number | string, field1: string, field2: string, end1: boolean | number | string, end2: boolean | number | string);
}
export declare class CompoundValues extends FilterValues {
    type: CompoundFilterType;
    nested: FilterValues[];
    constructor(type: CompoundFilterType, nested: FilterValues[]);
}
export declare class DomainValues extends FilterValues {
    begin: boolean | number | string | Date;
    field: string;
    end: boolean | number | string | Date;
    constructor(begin: boolean | number | string | Date, field: string, end: boolean | number | string | Date);
}
export declare class ListOfValues extends FilterValues {
    type: CompoundFilterType;
    field: string;
    operator: string;
    values: (boolean | number | string)[];
    constructor(type: CompoundFilterType, field: string, operator: string, values: (boolean | number | string)[]);
}
export declare class PairOfValues extends FilterValues {
    type: CompoundFilterType;
    field1: string;
    field2: string;
    operator1: string;
    operator2: string;
    value1: boolean | number | string;
    value2: boolean | number | string;
    constructor(type: CompoundFilterType, field1: string, field2: string, operator1: string, operator2: string, value1: boolean | number | string, value2: boolean | number | string);
}
export declare class FilterUtil {
    /**
     * Returns if the given FilterDataSource objects are equivalent.
     *
     * @arg {FilterDataSource} item1
     * @arg {FilterDataSource} item2
     * @arg {boolean} [ignoreOperator=false]
     * @return {boolean}
     */
    static areFilterDataSourcesEquivalent(item1: FilterDataSource, item2: FilterDataSource, ignoreOperator?: boolean): boolean;
    /**
     * Returns if the given FilterDataSource lists are equivalent.
     *
     * @arg {FilterDataSource[]} list1
     * @arg {FilterDataSource[]} list2
     * @return {boolean}
     */
    static areFilterDataSourceListsEquivalent(list1: FilterDataSource[], list2: FilterDataSource[]): boolean;
}
export declare class FilterCollection {
    protected data: Map<FilterDataSource[], AbstractFilter[]>;
    /**
     * Returns the data source for the given filter config as either an existing matching data source within this collection or a new data
     * source (the new data source is also saved in this collection with an empty array).
     */
    findFilterDataSources(filterDesign: AbstractFilterDesign): FilterDataSource[];
    /**
     * Returns the list of filters in this filter collection that are compatible with the given filter config.
     */
    getCompatibleFilters(filterDesign: AbstractFilterDesign): AbstractFilter[];
    /**
     * Returns the data sources within this collection.
     *
     * @return {FilterDataSource[][]}
     */
    getDataSources(): FilterDataSource[][];
    /**
     * Returns the filters for the given data source (or an existing matching data source within this collection).
     *
     * @arg {FilterDataSource[]} [filterDataSourceList]
     * @return {AbstractFilter[]}
     */
    getFilters(filterDataSourceList?: FilterDataSource[]): AbstractFilter[];
    /**
     * Sets the filters for the given data source (or an existing matching data source within this collection) to the given filters, then
     * returns the data source used for the collection key (either the given data source or the existing matching data source).
     *
     * @arg {FilterDataSource[]} filterDataSourceList
     * @arg {AbstractFilter[]} filterList
     * @return {FilterDataSource[]}
     */
    setFilters(filterDataSourceList: FilterDataSource[], filterList: AbstractFilter[]): FilterDataSource[];
}
export declare abstract class AbstractFilter {
    id?: string;
    relations: string[];
    constructor(id?: string, relations?: string[]);
    /**
     * Returns the label for the given field key.  Also returns the database and table if abridged is false.
     */
    protected _createLabelForField(fieldKeyString: string, dataset: Dataset, abridged?: boolean): string;
    /**
     * Returns the label for the given two field keys and filter type.
     */
    protected _createLabelForTwoFields(fieldKeyString1: string, fieldKeyString2: string, dataset: Dataset, type: CompoundFilterType, abridged?: boolean): string;
    /**
     * Returns the label for the given filter operator.
     */
    protected _createLabelForOperator(operator: string): string;
    /**
     * Returns the label for the given field key and values.
     */
    protected _createLabelForValue(fieldKeyString: string, value: any, dataset: Dataset): string;
    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     *
     * @abstract
     */
    abstract createRelationFilter(equivalentFieldKeyList: FieldKey[], substituteFieldKeyList: FieldKey[]): AbstractFilter;
    /**
     * Creates and returns the relation filter list for the filter.
     */
    createRelationFilterList(dataset: Dataset): AbstractFilter[];
    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     */
    abstract doesAffectSearch(datastore: string, database: string, table: string): boolean;
    /**
     * Returns the label for the filter.
     */
    getLabel(dataset: Dataset): string;
    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @abstract
     */
    abstract getLabelForField(dataset: Dataset, abridged?: boolean): string;
    /**
     * Returns the label for the filter's value(s).
     *
     * @abstract
     */
    abstract getLabelForValue(dataset: Dataset, abridged?: boolean): string;
    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @abstract
     */
    abstract isCompatibleWithDesign(filterDesign: AbstractFilterDesign): boolean;
    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @arg {AbstractFilter} filter
     * @return {boolean}
     * @abstract
     */
    abstract isEquivalentToFilter(filter: AbstractFilter): boolean;
    /**
     * Returns if the given field is equivalent to the given data source.
     *
     * @arg {FieldKey} fieldKey
     * @arg {FilterDataSource} filterDataSource
     * @return {boolean}
     * @private
     */
    private _isRelationEquivalent;
    /**
     * Returns the filtered values for the filter object.
     */
    abstract retrieveValues(): FilterValues;
    /**
     * Returns the filter config for the filter object.
     *
     * @abstract
     */
    abstract toDesign(): AbstractFilterDesign;
}
export declare class CompoundFilter extends AbstractFilter {
    type: CompoundFilterType;
    filters: AbstractFilter[];
    constructor(type: CompoundFilterType, filters: AbstractFilter[], id?: string, relations?: string[]);
    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     */
    createRelationFilter(equivalentFieldKeyList: FieldKey[], substituteFieldKeyList: FieldKey[]): AbstractFilter;
    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    doesAffectSearch(datastore: string, database: string, table: string): boolean;
    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    getLabelForField(__dataset: Dataset, __abridged?: boolean): string;
    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    getLabelForValue(dataset: Dataset, abridged?: boolean): string;
    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    isCompatibleWithDesign(filterDesign: AbstractFilterDesign): boolean;
    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    isEquivalentToFilter(filter: AbstractFilter): boolean;
    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    retrieveValues(): FilterValues;
    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    toDesign(): AbstractFilterDesign;
}
export declare class BoundsFilter extends AbstractFilter {
    fieldKey1: string;
    fieldKey2: string;
    begin1: any;
    begin2: any;
    end1: any;
    end2: any;
    constructor(fieldKey1: string, fieldKey2: string, begin1: any, begin2: any, end1: any, end2: any, id?: string, relations?: string[]);
    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     *
     * @override
     */
    createRelationFilter(equivalentFieldKeyList: FieldKey[], substituteFieldKeyList: FieldKey[]): AbstractFilter;
    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    doesAffectSearch(datastore: string, database: string, table: string): boolean;
    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    getLabelForField(dataset: Dataset, abridged?: boolean): string;
    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    getLabelForValue(dataset: Dataset, __abridged?: boolean): string;
    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    isCompatibleWithDesign(filterDesign: AbstractFilterDesign): boolean;
    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    isEquivalentToFilter(filter: AbstractFilter): boolean;
    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    retrieveValues(): BoundsValues;
    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    toDesign(): AbstractFilterDesign;
}
export declare class DomainFilter extends AbstractFilter {
    fieldKey: string;
    begin: any;
    end: any;
    constructor(fieldKey: string, begin: any, end: any, id?: string, relations?: string[]);
    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     *
     * @override
     */
    createRelationFilter(equivalentFieldKeyList: FieldKey[], substituteFieldKeyList: FieldKey[]): AbstractFilter;
    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    doesAffectSearch(datastore: string, database: string, table: string): boolean;
    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    getLabelForField(dataset: Dataset, abridged?: boolean): string;
    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    getLabelForValue(dataset: Dataset, __abridged?: boolean): string;
    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    isCompatibleWithDesign(filterDesign: AbstractFilterDesign): boolean;
    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    isEquivalentToFilter(filter: AbstractFilter): boolean;
    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    retrieveValues(): DomainValues;
    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    toDesign(): AbstractFilterDesign;
}
export declare class ListFilter extends AbstractFilter {
    type: CompoundFilterType;
    fieldKey: string;
    operator: string;
    private _values;
    constructor(type: CompoundFilterType, fieldKey: string, operator: string, values: any[], id?: string, relations?: string[]);
    values: any[];
    private _updateValues;
    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     *
     * @override
     */
    createRelationFilter(equivalentFieldKeyList: FieldKey[], substituteFieldKeyList: FieldKey[]): AbstractFilter;
    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    doesAffectSearch(datastore: string, database: string, table: string): boolean;
    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    getLabelForField(dataset: Dataset, abridged?: boolean): string;
    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    getLabelForValue(dataset: Dataset, __abridged?: boolean): string;
    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    isCompatibleWithDesign(filterDesign: AbstractFilterDesign): boolean;
    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    isEquivalentToFilter(filter: AbstractFilter): boolean;
    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    retrieveValues(): ListOfValues;
    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    toDesign(): AbstractFilterDesign;
}
export declare class PairFilter extends AbstractFilter {
    type: CompoundFilterType;
    fieldKey1: string;
    fieldKey2: string;
    operator1: any;
    operator2: any;
    value1: any;
    value2: any;
    constructor(type: CompoundFilterType, fieldKey1: string, fieldKey2: string, operator1: any, operator2: any, value1: any, value2: any, id?: string, relations?: string[]);
    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     *
     * @override
     */
    createRelationFilter(equivalentFieldKeyList: FieldKey[], substituteFieldKeyList: FieldKey[]): AbstractFilter;
    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    doesAffectSearch(datastore: string, database: string, table: string): boolean;
    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    getLabelForField(dataset: Dataset, abridged?: boolean): string;
    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    getLabelForValue(dataset: Dataset, __abridged?: boolean): string;
    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    isCompatibleWithDesign(filterDesign: AbstractFilterDesign): boolean;
    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    isEquivalentToFilter(filter: AbstractFilter): boolean;
    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    retrieveValues(): PairOfValues;
    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    toDesign(): AbstractFilterDesign;
}
export declare abstract class AbstractFilterDesign {
    id?: string;
    relations: string[];
    constructor(id?: string, relations?: string[]);
    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @abstract
     */
    abstract getDataSources(ignoreOperator?: boolean): FilterDataSource[];
    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @abstract
     */
    abstract toFilter(): AbstractFilter;
}
export declare class CompoundFilterDesign extends AbstractFilterDesign {
    type: CompoundFilterType;
    filters: AbstractFilterDesign[];
    constructor(type: CompoundFilterType, filters: AbstractFilterDesign[], id?: string, relations?: string[]);
    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    getDataSources(ignoreOperator?: boolean): FilterDataSource[];
    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    toFilter(): AbstractFilter;
}
export declare class BoundsFilterDesign extends AbstractFilterDesign {
    fieldKey1: string;
    fieldKey2: string;
    begin1: any;
    begin2: any;
    end1: any;
    end2: any;
    constructor(fieldKey1: string, fieldKey2: string, begin1: any, begin2: any, end1: any, end2: any, id?: string, relations?: string[]);
    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    getDataSources(ignoreOperator?: boolean): FilterDataSource[];
    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    toFilter(): AbstractFilter;
}
export declare class DomainFilterDesign extends AbstractFilterDesign {
    fieldKey: string;
    begin: any;
    end: any;
    constructor(fieldKey: string, begin: any, end: any, id?: string, relations?: string[]);
    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    getDataSources(ignoreOperator?: boolean): FilterDataSource[];
    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    toFilter(): AbstractFilter;
}
export declare class ListFilterDesign extends AbstractFilterDesign {
    type: CompoundFilterType;
    fieldKey: string;
    operator: string;
    values: any[];
    constructor(type: CompoundFilterType, fieldKey: string, operator: string, values: any[], id?: string, relations?: string[]);
    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    getDataSources(ignoreOperator?: boolean): FilterDataSource[];
    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    toFilter(): AbstractFilter;
}
export declare class PairFilterDesign extends AbstractFilterDesign {
    type: CompoundFilterType;
    fieldKey1: string;
    fieldKey2: string;
    operator1: any;
    operator2: any;
    value1: any;
    value2: any;
    constructor(type: CompoundFilterType, fieldKey1: string, fieldKey2: string, operator1: any, operator2: any, value1: any, value2: any, id?: string, relations?: string[]);
    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    getDataSources(ignoreOperator?: boolean): FilterDataSource[];
    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    toFilter(): AbstractFilter;
}
