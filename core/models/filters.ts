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
import { Dataset, DatasetFieldKey, DatasetUtil, FieldKey } from './dataset';
import { DateFormat, DateUtil } from '../date.util';
import * as _ from 'lodash';

export interface FilterDataSource {
    datastore: string;
    database: string;
    table: string;
    field: string;
    operator: string;
}

export abstract class FilterValues { }

export class BoundsValues extends FilterValues {
    constructor(
        public begin1: boolean|number|string,
        public begin2: boolean|number|string,
        public field1: string,
        public field2: string,
        public end1: boolean|number|string,
        public end2: boolean|number|string
    ) {
        super();
    }
}

export class CompoundValues extends FilterValues {
    constructor(public type: CompoundFilterType, public nested: FilterValues[]) {
        super();
    }
}

export class DomainValues extends FilterValues {
    constructor(public begin: boolean|number|string|Date, public field: string, public end: boolean|number|string|Date) {
        super();
    }
}

export class ListOfValues extends FilterValues {
    constructor(
        public type: CompoundFilterType,
        public field: string,
        public operator: string,
        public values: (boolean|number|string)[]
    ) {
        super();
    }
}

export class PairOfValues extends FilterValues {
    constructor(
        public type: CompoundFilterType,
        public field1: string,
        public field2: string,
        public operator1: string,
        public operator2: string,
        public value1: boolean|number|string,
        public value2: boolean|number|string
    ) {
        super();
    }
}

export class FilterUtil {
    /**
     * Returns if the given FilterDataSource objects are equivalent.
     *
     * @arg {FilterDataSource} item1
     * @arg {FilterDataSource} item2
     * @arg {boolean} [ignoreOperator=false]
     * @return {boolean}
     */
    static areFilterDataSourcesEquivalent(
        item1: FilterDataSource,
        item2: FilterDataSource,
        ignoreOperator: boolean = false
    ): boolean {
        return !!(item1.datastore === item2.datastore && item1.database === item2.database && item1.table === item2.table &&
            item1.field === item2.field && (ignoreOperator ? true : item1.operator === item2.operator));
    }

    /**
     * Returns if the given FilterDataSource lists are equivalent.
     *
     * @arg {FilterDataSource[]} list1
     * @arg {FilterDataSource[]} list2
     * @return {boolean}
     */
    static areFilterDataSourceListsEquivalent(list1: FilterDataSource[], list2: FilterDataSource[]): boolean {
        return list1.length === list2.length &&
            // Each FilterDataSource in list1 must be equivalent to a FilterDataSource in list2.
            list1.every((item1) => list2.some((item2) => this.areFilterDataSourcesEquivalent(item1, item2))) &&
            // Each FilterDataSource in list2 must be equivalent to a FilterDataSource in list1.
            list2.every((item2) => list2.some((item1) => this.areFilterDataSourcesEquivalent(item1, item2)));
    }
}

export class FilterCollection {
    protected data: Map<FilterDataSource[], AbstractFilter[]> = new Map<FilterDataSource[], AbstractFilter[]>();

    /**
     * Returns the data source for the given filter config as either an existing matching data source within this collection or a new data
     * source (the new data source is also saved in this collection with an empty array).
     */
    public findFilterDataSources(filterDesign: AbstractFilterDesign): FilterDataSource[] {
        let filterDataSourceList: FilterDataSource[] = filterDesign.getDataSources();

        // Return a matching existing FilterDataSource list if possible (should either be length 0 or 1 matches).
        let matchingDataSourceList: FilterDataSource[][] = this.getDataSources().filter((existingDataSourceList) =>
            FilterUtil.areFilterDataSourceListsEquivalent(filterDataSourceList, existingDataSourceList));

        if (matchingDataSourceList.length) {
            if (matchingDataSourceList.length > 1) {
                console.error('Multiple equivalent data source objects in filter collection; something is wrong!', this.data);
            }
            return matchingDataSourceList[0];
        }

        // Otherwise save the FilterDataSource in the internal data and return it.
        this.data.set(filterDataSourceList, []);

        return filterDataSourceList;
    }

    /**
     * Returns the list of filters in this filter collection that are compatible with the given filter config.
     */
    public getCompatibleFilters(filterDesign: AbstractFilterDesign): AbstractFilter[] {
        let filterDataSourceList: FilterDataSource[] = this.findFilterDataSources(filterDesign);
        let filterList: AbstractFilter[] = this.getFilters(filterDataSourceList);
        return filterList.filter((filter) => filter.isCompatibleWithDesign(filterDesign));
    }

    /**
     * Returns the data sources within this collection.
     *
     * @return {FilterDataSource[][]}
     */
    public getDataSources(): FilterDataSource[][] {
        return Array.from(this.data.keys());
    }

    /**
     * Returns the filters for the given data source (or an existing matching data source within this collection).
     *
     * @arg {FilterDataSource[]} [filterDataSourceList]
     * @return {AbstractFilter[]}
     */
    public getFilters(filterDataSourceList?: FilterDataSource[]): AbstractFilter[] {
        if (!filterDataSourceList) {
            return this.getDataSources().reduce((filterList, dataSourceList) => filterList.concat(this.getFilters(dataSourceList)),
                [] as AbstractFilter[]);
        }

        if (this.data.has(filterDataSourceList)) {
            return this.data.get(filterDataSourceList) || [];
        }

        // Return a matching existing FilterDataSource list if possible (should either be length 0 or 1 matches).
        let matchingDataSourceList: FilterDataSource[][] = this.getDataSources().filter((existingDataSourceList) =>
            FilterUtil.areFilterDataSourceListsEquivalent(filterDataSourceList, existingDataSourceList));

        if (matchingDataSourceList.length) {
            if (matchingDataSourceList.length > 1) {
                console.error('Multiple equivalent data source objects in filter collection; something is wrong!', this.data);
            }
            return this.data.get(matchingDataSourceList[0]) || [];
        }

        // Otherwise save the FilterDataSource in the internal data and return the empty array.
        this.data.set(filterDataSourceList, []);

        return this.data.get(filterDataSourceList);
    }

    /**
     * Sets the filters for the given data source (or an existing matching data source within this collection) to the given filters, then
     * returns the data source used for the collection key (either the given data source or the existing matching data source).
     *
     * @arg {FilterDataSource[]} filterDataSourceList
     * @arg {AbstractFilter[]} filterList
     * @return {FilterDataSource[]}
     */
    public setFilters(filterDataSourceList: FilterDataSource[], filterList: AbstractFilter[]): FilterDataSource[] {
        if (this.data.has(filterDataSourceList)) {
            this.data.set(filterDataSourceList, filterList);
            return filterDataSourceList;
        }

        // Return a matching existing FilterDataSource list if possible (should either be length 0 or 1 matches).
        let matchingDataSourceList: FilterDataSource[][] = this.getDataSources().filter((existingDataSourceList) =>
            FilterUtil.areFilterDataSourceListsEquivalent(filterDataSourceList, existingDataSourceList));

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
    }
}

let filterIdCollection: Map<string, boolean> = new Map<string, boolean>();
let nextFilterId = 1;

export abstract class AbstractFilter {
    constructor(public id?: string, public relations: string[] = []) {
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
    protected _createLabelForField(fieldKeyString: string, dataset: Dataset, abridged: boolean = false): string {
        const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(fieldKeyString);
        const datasetFieldKey: DatasetFieldKey = dataset.retrieveDatasetFieldKey(fieldKey);
        return abridged ? datasetFieldKey.field.prettyName : (datasetFieldKey.database.prettyName + ' / ' +
            datasetFieldKey.table.prettyName + ' / ' + datasetFieldKey.field.prettyName);
    }

    /**
     * Returns the label for the given two field keys and filter type.
     */
    protected _createLabelForTwoFields(
        fieldKeyString1: string,
        fieldKeyString2: string,
        dataset: Dataset,
        type: CompoundFilterType,
        abridged: boolean = false
    ): string {
        let label1 = this._createLabelForField(fieldKeyString1, dataset, abridged);
        let label2 = this._createLabelForField(fieldKeyString2, dataset, abridged);
        if (abridged) {
            let nestedFields1: string[] = label1.split('.');
            let nestedFields2: string[] = label2.split('.');
            if (nestedFields1.length === nestedFields2.length && nestedFields1.length > 1) {
                let fieldsPrefix1 = label1.substring(0, label1.lastIndexOf('.'));
                if (fieldsPrefix1 === label2.substring(0, label2.lastIndexOf('.'))) {
                    return fieldsPrefix1;
                }
            }
        }
        return label1 + ' ' + type + ' ' + label2;
    }

    /**
     * Returns the label for the given filter operator.
     */
    protected _createLabelForOperator(operator: string): string {
        return operator === '=' ? '' : operator;
    }

    /**
     * Returns the label for the given field key and values.
     */
    protected _createLabelForValue(fieldKeyString: string, value: any, dataset: Dataset): string {
        const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(fieldKeyString);
        const datasetFieldKey: DatasetFieldKey = dataset.retrieveDatasetFieldKey(fieldKey);
        if (datasetFieldKey.field.type === 'date' || value instanceof Date) {
            // TODO THOR-1259 Let user switch from UTC to local time
            // TODO THOR-1329 If hour or minutes are not zero, add hour and minutes and seconds to output string format.
            return DateUtil.fromDateToString(value, DateFormat.SHORT);
        }
        if (typeof value === 'number') {
            return '' + (value % 1 === 0 ? value : parseFloat('' + value).toFixed(3));
        }
        return value === '' ? '<empty>' : value;
    }

    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     *
     * @abstract
     */
    public abstract createRelationFilter(equivalentFieldKeyList: FieldKey[], substituteFieldKeyList: FieldKey[]): AbstractFilter;

    /**
     * Creates and returns the relation filter list for the filter.
     */
    public createRelationFilterList(dataset: Dataset): AbstractFilter[] {
        let filterDataSourceList: FilterDataSource[] = this.toDesign().getDataSources(true);

        return dataset.getRelations().reduce((returnList, relation) => {
            let relationFilterList: AbstractFilter[] = [];

            // Assume that each item within the relation list is a nested list with the same length.
            // EX:  [[x1, y1], [x2, y2], [x3, y3]]
            if (relation.length && relation[0].length === filterDataSourceList.length) {
                let equivalentRelationList: FieldKey[][] = relation.filter((relationFieldKeyList) =>
                    // Each item within the relationFieldKeyList must be equivalent to a FilterDataSource.
                    relationFieldKeyList.every((relationFieldKey) => filterDataSourceList.some((filterDataSource) =>
                        this._isRelationEquivalent(relationFieldKey, filterDataSource))) &&
                    // Each FilterDataSource must be equivalent to an item within the relationFieldKeyList.
                    filterDataSourceList.every((filterDataSource) => relationFieldKeyList.some((relationFieldKey) =>
                        this._isRelationEquivalent(relationFieldKey, filterDataSource))));

                // The length of equivalentRelationList should be either 0 or 1.
                if (equivalentRelationList.length) {
                    // Create new relation filters.
                    relation.forEach((relationFieldKeyList) => {
                        // Do not create a relation that is the same as the original filter.
                        if (relationFieldKeyList !== equivalentRelationList[0]) {
                            let relationFilter: AbstractFilter = this.createRelationFilter(equivalentRelationList[0],
                                relationFieldKeyList);
                            relationFilterList.push(relationFilter);
                        }
                    });

                    // Save sibling relation filter IDs in the new relation filters.
                    relationFilterList.concat(this).forEach((outerFilter) => {
                        relationFilterList.concat(this).forEach((innerFilter) => {
                            if (outerFilter.id !== innerFilter.id) {
                                outerFilter.relations.push(innerFilter.id);
                            }
                        });
                    });
                }
            }
            return returnList.concat(relationFilterList);
        }, [] as AbstractFilter[]);
    }

    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     */
    public abstract doesAffectSearch(datastore: string, database: string, table: string): boolean;

    /**
     * Returns the label for the filter.
     */
    public getLabel(dataset: Dataset): string {
        return this.getLabelForField(dataset) + this.getLabelForValue(dataset);
    }

    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @abstract
     */
    public abstract getLabelForField(dataset: Dataset, abridged?: boolean): string;

    /**
     * Returns the label for the filter's value(s).
     *
     * @abstract
     */
    public abstract getLabelForValue(dataset: Dataset, abridged?: boolean): string;

    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @abstract
     */
    public abstract isCompatibleWithDesign(filterDesign: AbstractFilterDesign): boolean;

    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @arg {AbstractFilter} filter
     * @return {boolean}
     * @abstract
     */
    public abstract isEquivalentToFilter(filter: AbstractFilter): boolean;

    /**
     * Returns if the given field is equivalent to the given data source.
     *
     * @arg {FieldKey} fieldKey
     * @arg {FilterDataSource} filterDataSource
     * @return {boolean}
     * @private
     */
    private _isRelationEquivalent(fieldKey: FieldKey, filterDataSource: FilterDataSource): boolean {
        return !!(fieldKey.datastore === filterDataSource.datastore && fieldKey.database === filterDataSource.database &&
            fieldKey.table === filterDataSource.table && fieldKey.field === filterDataSource.field);
    }

    /**
     * Returns the filtered values for the filter object.
     */
    public abstract retrieveValues(): FilterValues;

    /**
     * Returns the filter config for the filter object.
     *
     * @abstract
     */
    public abstract toDesign(): AbstractFilterDesign;
}

export class CompoundFilter extends AbstractFilter {
    constructor(
        public type: CompoundFilterType,
        public filters: AbstractFilter[],
        id?: string,
        relations?: string[]
    ) {
        super(id, relations);
    }

    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     */
    public createRelationFilter(equivalentFieldKeyList: FieldKey[], substituteFieldKeyList: FieldKey[]): AbstractFilter {
        if (equivalentFieldKeyList.length !== substituteFieldKeyList.length) {
            return null;
        }

        let nestedRelationExists = false;

        let relationFilter: CompoundFilter = new CompoundFilter(this.type, this.filters.map((filter) => {
            let nestedRelationFilter: AbstractFilter = filter.createRelationFilter(equivalentFieldKeyList, substituteFieldKeyList);
            nestedRelationExists = nestedRelationExists || !!nestedRelationFilter;
            // A compound filter can exchange one of its nested filters with a relation and keep the rest of the original nested filters.
            return nestedRelationFilter || filter;
        }));

        // Return null unless at least one nested relation filter exists.
        return nestedRelationExists ? relationFilter : null;
    }

    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    public doesAffectSearch(datastore: string, database: string, table: string): boolean {
        return this.filters.some((nested) => nested.doesAffectSearch(datastore, database, table));
    }

    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    public getLabelForField(__dataset: Dataset, __abridged: boolean = false): string {
        return '';
    }

    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    public getLabelForValue(dataset: Dataset, abridged: boolean = false): string {
        // TODO THOR-1333 Improve label for custom compound filter

        // Group the filters by unique field.
        const filtersByField: Record<string, AbstractFilter[]> = this.filters.reduce((collection, filter) => {
            let field = filter.getLabelForField(dataset, abridged);
            collection[field] = collection[field] || [];
            collection[field].push(filter);
            return collection;
        }, {}) as Record<string, AbstractFilter[]>;

        return '(' + Object.keys(filtersByField).reduce((list, field) => {
            let labels: string[] = filtersByField[field].map((filter) => filter.getLabelForValue(dataset, abridged));
            // Do not show parentheses around only one operator.
            return list.concat(field + ' ' + (labels.length > 1 ? ('(' + labels.join(' ' + this.type + ' ') + ')') : labels[0]));
        }, []).join(') ' + this.type + ' (') + ')';
    }

    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    public isCompatibleWithDesign(filterDesign: AbstractFilterDesign): boolean {
        if (!(filterDesign instanceof CompoundFilterDesign)) {
            return false;
        }

        let compoundFilterDesign = (filterDesign);

        // If the filter design contains more than one FilterDataSource, ensure that 1) each nested design is compatible with at least one
        // nested filter object, 2) each nested filter object is compatible with at least one nested filter design, and 3) both lists are
        // the same length.  This forces designs to have specific nested filters but lets them have nested filters in an unexpected order.
        return compoundFilterDesign.type === this.type &&
            compoundFilterDesign.filters &&
            compoundFilterDesign.filters.length === this.filters.length &&
            compoundFilterDesign.filters.every((nestedDesign: AbstractFilterDesign) =>
                this.filters.some((nestedFilter: AbstractFilter) =>
                    nestedFilter.isCompatibleWithDesign(nestedDesign))) &&
            this.filters.every((nestedFilter: AbstractFilter) =>
                compoundFilterDesign.filters.some((nestedDesign: AbstractFilterDesign) =>
                    nestedFilter.isCompatibleWithDesign(nestedDesign)));
    }

    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    public isEquivalentToFilter(filter: AbstractFilter): boolean {
        return filter instanceof CompoundFilter && filter.type === this.type &&
            filter.filters.length === this.filters.length &&
            filter.filters.every((nestedFilter, index) => nestedFilter && nestedFilter.isEquivalentToFilter(this.filters[index]));
    }

    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    public retrieveValues(): FilterValues {
        return new CompoundValues(this.type, this.filters.reduce((list, filter) => list.concat(filter.retrieveValues()), []));
    }

    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    public toDesign(): AbstractFilterDesign {
        return new CompoundFilterDesign(this.type, this.filters.map((filter) => filter.toDesign()), this.id, this.relations);
    }
}

export class BoundsFilter extends AbstractFilter {
    constructor(
        public fieldKey1: string,
        public fieldKey2: string,
        public begin1: any,
        public begin2: any,
        public end1: any,
        public end2: any,
        id?: string,
        relations?: string[]
    ) {
        super(id, relations);
    }

    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     *
     * @override
     */
    public createRelationFilter(equivalentFieldKeyList: FieldKey[], substituteFieldKeyList: FieldKey[]): AbstractFilter {
        if (equivalentFieldKeyList.length !== 2 || substituteFieldKeyList.length !== 2) {
            return null;
        }

        if (substituteFieldKeyList[0].database && substituteFieldKeyList[0].table && substituteFieldKeyList[0].field &&
            substituteFieldKeyList[1].database && substituteFieldKeyList[1].table && substituteFieldKeyList[1].field) {
            const internalFieldKey1: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey1);
            const internalFieldKey2: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey2);

            if (DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[0], internalFieldKey1) &&
                DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[1], internalFieldKey2)) {
                return new BoundsFilter(DatasetUtil.fieldKeyToString(substituteFieldKeyList[0]), DatasetUtil.fieldKeyToString(
                    substituteFieldKeyList[1]
                ), this.begin1, this.begin2, this.end1, this.end2);
            }

            if (DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[1], internalFieldKey1) &&
                DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[0], internalFieldKey2)) {
                return new BoundsFilter(DatasetUtil.fieldKeyToString(substituteFieldKeyList[1]), DatasetUtil.fieldKeyToString(
                    substituteFieldKeyList[0]
                ), this.begin1, this.begin2, this.end1, this.end2);
            }
        }

        return null;
    }

    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    public doesAffectSearch(datastore: string, database: string, table: string): boolean {
        const fieldKey1: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey1);
        const fieldKey2: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey2);
        return (fieldKey1.datastore === datastore && fieldKey1.database === database && fieldKey1.table === table) ||
            (fieldKey2.datastore === datastore && fieldKey2.database === database && fieldKey2.table === table);
    }

    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    public getLabelForField(dataset: Dataset, abridged: boolean = false): string {
        return this._createLabelForTwoFields(this.fieldKey1, this.fieldKey2, dataset, CompoundFilterType.AND, abridged);
    }

    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    public getLabelForValue(dataset: Dataset, __abridged: boolean = false): string {
        return 'from (' + this._createLabelForValue(this.fieldKey1, this.begin1, dataset) + ', ' +
            this._createLabelForValue(this.fieldKey2, this.begin2, dataset) + ') to (' +
            this._createLabelForValue(this.fieldKey1, this.end1, dataset) + ', ' +
            this._createLabelForValue(this.fieldKey2, this.end2, dataset) + ')';
    }

    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    public isCompatibleWithDesign(filterDesign: AbstractFilterDesign): boolean {
        return filterDesign instanceof BoundsFilterDesign && filterDesign.fieldKey1 === this.fieldKey1 &&
            filterDesign.fieldKey2 === this.fieldKey2 &&
            (typeof filterDesign.begin1 !== 'undefined' ? filterDesign.begin1 === this.begin1 : true) &&
            (typeof filterDesign.begin2 !== 'undefined' ? filterDesign.begin2 === this.begin2 : true) &&
            (typeof filterDesign.end1 !== 'undefined' ? filterDesign.end1 === this.end1 : true) &&
            (typeof filterDesign.end2 !== 'undefined' ? filterDesign.end2 === this.end2 : true);
    }

    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    public isEquivalentToFilter(filter: AbstractFilter): boolean {
        return filter instanceof BoundsFilter && filter.fieldKey1 === this.fieldKey1 && filter.fieldKey2 === this.fieldKey2 &&
            filter.begin1 === this.begin1 && filter.begin2 === this.begin2 && filter.end1 === this.end1 && filter.end2 === this.end2;
    }

    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    public retrieveValues(): BoundsValues {
        return new BoundsValues(this.begin1, this.begin2, this.fieldKey1, this.fieldKey2, this.end1, this.end2);
    }

    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    public toDesign(): AbstractFilterDesign {
        return new BoundsFilterDesign(this.fieldKey1, this.fieldKey2, this.begin1, this.begin2, this.end1, this.end2, this.id,
            this.relations);
    }
}

export class DomainFilter extends AbstractFilter {
    constructor(
        public fieldKey: string,
        public begin: any,
        public end: any,
        id?: string,
        relations?: string[]
    ) {
        super(id, relations);
    }

    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     *
     * @override
     */
    public createRelationFilter(equivalentFieldKeyList: FieldKey[], substituteFieldKeyList: FieldKey[]): AbstractFilter {
        if (equivalentFieldKeyList.length !== 1 || substituteFieldKeyList.length !== 1) {
            return null;
        }

        if (substituteFieldKeyList[0].database && substituteFieldKeyList[0].table && substituteFieldKeyList[0].field) {
            const internalFieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey);
            if (DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[0], internalFieldKey)) {
                return new DomainFilter(DatasetUtil.fieldKeyToString(substituteFieldKeyList[0]), this.begin, this.end);
            }
        }

        return null;
    }

    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    public doesAffectSearch(datastore: string, database: string, table: string): boolean {
        const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey);
        return (fieldKey.datastore === datastore && fieldKey.database === database && fieldKey.table === table);
    }

    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    public getLabelForField(dataset: Dataset, abridged: boolean = false): string {
        return this._createLabelForField(this.fieldKey, dataset, abridged);
    }

    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    public getLabelForValue(dataset: Dataset, __abridged: boolean = false): string {
        return 'between ' + this._createLabelForValue(this.fieldKey, this.begin, dataset) + ' and ' +
            this._createLabelForValue(this.fieldKey, this.end, dataset);
    }

    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    public isCompatibleWithDesign(filterDesign: AbstractFilterDesign): boolean {
        return filterDesign instanceof DomainFilterDesign && filterDesign.fieldKey === this.fieldKey &&
            (typeof filterDesign.begin !== 'undefined' ? filterDesign.begin === this.begin : true) &&
            (typeof filterDesign.end !== 'undefined' ? filterDesign.end === this.end : true);
    }

    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    public isEquivalentToFilter(filter: AbstractFilter): boolean {
        return filter instanceof DomainFilter && filter.fieldKey === this.fieldKey && filter.begin === this.begin &&
            filter.end === this.end;
    }

    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    public retrieveValues(): DomainValues {
        return new DomainValues(this.begin, this.fieldKey, this.end);
    }

    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    public toDesign(): AbstractFilterDesign {
        return new DomainFilterDesign(this.fieldKey, this.begin, this.end, this.id, this.relations);
    }
}

export class ListFilter extends AbstractFilter {
    private _values: any[];

    constructor(
        public type: CompoundFilterType,
        public fieldKey: string,
        public operator: string,
        values: any[],
        id?: string,
        relations?: string[]
    ) {
        super(id, relations);
        this._updateValues(values);
    }

    get values(): any[] {
        return this._values;
    }

    set values(input: any[]) {
        this._updateValues(input);
    }

    private _updateValues(input: any[]) {
        this._values = ((input && Array.isArray(input) && input.length) ? input : []).filter((value) => typeof value !== 'undefined');
        if (!this._values.length) {
            console.warn('ListFilter ' + this.id + ' with fieldkey ' + this.fieldKey + ' and operator ' + this.operator +
                ' should have values but does not!');
        }
    }

    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     *
     * @override
     */
    public createRelationFilter(equivalentFieldKeyList: FieldKey[], substituteFieldKeyList: FieldKey[]): AbstractFilter {
        if (equivalentFieldKeyList.length !== 1 || substituteFieldKeyList.length !== 1) {
            return null;
        }

        if (substituteFieldKeyList[0].database && substituteFieldKeyList[0].table && substituteFieldKeyList[0].field) {
            const internalFieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey);
            if (DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[0], internalFieldKey)) {
                return new ListFilter(this.type, DatasetUtil.fieldKeyToString(substituteFieldKeyList[0]), this.operator, this._values);
            }
        }

        return null;
    }

    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    public doesAffectSearch(datastore: string, database: string, table: string): boolean {
        const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey);
        return (fieldKey.datastore === datastore && fieldKey.database === database && fieldKey.table === table);
    }

    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    public getLabelForField(dataset: Dataset, abridged: boolean = false): string {
        return this._createLabelForField(this.fieldKey, dataset, abridged);
    }

    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    public getLabelForValue(dataset: Dataset, __abridged: boolean = false): string {
        // Only show the first 3 values.  Add a suffix with the count of the hidden values.
        let labels: string[] = this._values.slice(0, 3).map((value) =>
            this._createLabelForValue(this.fieldKey, value, dataset));
        let suffix = (this._values.length > 3 ? (' ' + this.type + ' ' + (this._values.length - 3) + ' more...') : '');
        let operator = this._createLabelForOperator(this.operator);
        // Do not show the operator if it is empty.
        return (operator ? (operator + ' ' + (labels.length > 1 ? '(' : '')) : '') + labels.join(' ' + this.type + ' ') + suffix +
            ((operator && labels.length > 1) ? ')' : '');
    }

    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    public isCompatibleWithDesign(filterDesign: AbstractFilterDesign): boolean {
        if (filterDesign instanceof ListFilterDesign && filterDesign.fieldKey === this.fieldKey &&
            filterDesign.operator === this.operator && filterDesign.type === this.type) {
            if (!filterDesign.values || !filterDesign.values.length ||
                (filterDesign.values.length === 1 && typeof filterDesign.values[0] === 'undefined')) {
                return true;
            }

            if (filterDesign.values.length !== this._values.length) {
                return false;
            }

            return filterDesign.values.every((value, index) => value === this._values[index]);
        }

        return false;
    }

    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    public isEquivalentToFilter(filter: AbstractFilter): boolean {
        return filter instanceof ListFilter && filter.fieldKey === this.fieldKey && filter.operator === this.operator &&
            filter.type === this.type && _.isEqual(_.sortBy(filter.values), _.sortBy(this._values));
    }

    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    public retrieveValues(): ListOfValues {
        return new ListOfValues(this.type, this.fieldKey, this.operator, this._values);
    }

    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    public toDesign(): AbstractFilterDesign {
        return new ListFilterDesign(this.type, this.fieldKey, this.operator, (this._values.length ? this._values : [undefined]), this.id,
            this.relations);
    }
}

export class PairFilter extends AbstractFilter {
    constructor(
        public type: CompoundFilterType,
        public fieldKey1: string,
        public fieldKey2: string,
        public operator1: any,
        public operator2: any,
        public value1: any,
        public value2: any,
        id?: string,
        relations?: string[]
    ) {
        super(id, relations);
    }

    /**
     * Creates and returns a relation filter of this filter by exchanging the given equivalent fields with the given substitute fields.
     *
     * @override
     */
    public createRelationFilter(equivalentFieldKeyList: FieldKey[], substituteFieldKeyList: FieldKey[]): AbstractFilter {
        if (equivalentFieldKeyList.length !== 2 || substituteFieldKeyList.length !== 2) {
            return null;
        }

        if (substituteFieldKeyList[0].database && substituteFieldKeyList[0].table && substituteFieldKeyList[0].field &&
            substituteFieldKeyList[1].database && substituteFieldKeyList[1].table && substituteFieldKeyList[1].field) {
            const internalFieldKey1: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey1);
            const internalFieldKey2: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey2);

            if (DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[0], internalFieldKey1) &&
                DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[1], internalFieldKey2)) {
                return new PairFilter(this.type, DatasetUtil.fieldKeyToString(substituteFieldKeyList[0]), DatasetUtil.fieldKeyToString(
                    substituteFieldKeyList[1]
                ), this.operator1, this.operator2, this.value1, this.value2);
            }

            if (DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[1], internalFieldKey1) &&
                DatasetUtil.areFieldKeysEqual(equivalentFieldKeyList[0], internalFieldKey2)) {
                return new PairFilter(this.type, DatasetUtil.fieldKeyToString(substituteFieldKeyList[1]), DatasetUtil.fieldKeyToString(
                    substituteFieldKeyList[0]
                ), this.operator1, this.operator2, this.value1, this.value2);
            }
        }

        return null;
    }

    /**
     * Returns if this filter affects a search in the given datastore/database/table.
     *
     * @override
     */
    public doesAffectSearch(datastore: string, database: string, table: string): boolean {
        const fieldKey1: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey1);
        const fieldKey2: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey2);
        return (fieldKey1.datastore === datastore && fieldKey1.database === database && fieldKey1.table === table) ||
            (fieldKey2.datastore === datastore && fieldKey2.database === database && fieldKey2.table === table);
    }

    /**
     * Returns the label for the filter's field(s).  Also returns the database and table if abridged is false.
     *
     * @override
     */
    public getLabelForField(dataset: Dataset, abridged: boolean = false): string {
        return this._createLabelForTwoFields(this.fieldKey1, this.fieldKey2, dataset, this.type, abridged);
    }

    /**
     * Returns the label for the filter's value(s).
     *
     * @override
     */
    public getLabelForValue(dataset: Dataset, __abridged: boolean = false): string {
        let operator1 = this._createLabelForOperator(this.operator1);
        let operator2 = this._createLabelForOperator(this.operator2);
        // If the operator of each nested filter is the same, only show it once.  Do not show the operator if it is empty.
        if (operator1 === operator2) {
            return (operator1 ? (operator1 + ' ') : '') + '(' + this._createLabelForValue(this.fieldKey1, this.value1, dataset) +
                ' ' + this.type + ' ' + this._createLabelForValue(this.fieldKey2, this.value2, dataset) + ')';
        }
        // Do not show the operator if it is empty.
        return (operator1 ? (operator1 + ' ') : '') + this._createLabelForValue(this.fieldKey1, this.value1, dataset) + ' ' +
            this.type + ' ' + (operator2 ? (operator2 + ' ') : '') + this._createLabelForValue(this.fieldKey2, this.value2, dataset);
    }

    /**
     * Returns if this filter is compatible with the given filter config.  Compatible filters must have the same FilterDataSource list.
     *
     * @override
     */
    public isCompatibleWithDesign(filterDesign: AbstractFilterDesign): boolean {
        return filterDesign instanceof PairFilterDesign && filterDesign.fieldKey1 === this.fieldKey1 &&
            filterDesign.fieldKey2 === this.fieldKey2 && filterDesign.operator1 === this.operator1 &&
            filterDesign.operator2 === this.operator2 && filterDesign.type === this.type &&
            (typeof filterDesign.value1 !== 'undefined' ? filterDesign.value1 === this.value1 : true) &&
            (typeof filterDesign.value2 !== 'undefined' ? filterDesign.value2 === this.value2 : true);
    }

    /**
     * Returns if this filter is equivalent to the given filter.
     *
     * @override
     */
    public isEquivalentToFilter(filter: AbstractFilter): boolean {
        return filter instanceof PairFilter && filter.fieldKey1 === this.fieldKey1 && filter.fieldKey2 === this.fieldKey2 &&
            filter.operator1 === this.operator1 && filter.operator2 === this.operator2 && filter.value1 === this.value1 &&
            filter.value2 === this.value2 && filter.type === this.type;
    }

    /**
     * Returns the filtered values for the filter object.
     *
     * @override
     */
    public retrieveValues(): PairOfValues {
        return new PairOfValues(this.type, this.fieldKey1, this.fieldKey2, this.operator1, this.operator2, this.value1, this.value2);
    }

    /**
     * Returns the filter config for the filter object.
     *
     * @override
     */
    public toDesign(): AbstractFilterDesign {
        return new PairFilterDesign(this.type, this.fieldKey1, this.fieldKey2, this.operator1, this.operator2, this.value1, this.value2,
            this.id, this.relations);
    }
}

export abstract class AbstractFilterDesign {
    constructor(public id?: string, public relations: string[] = []) { }

    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @abstract
     */
    public abstract getDataSources(ignoreOperator?: boolean): FilterDataSource[];

    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @abstract
     */
    public abstract toFilter(): AbstractFilter;
}

export class CompoundFilterDesign extends AbstractFilterDesign {
    constructor(
        public type: CompoundFilterType,
        public filters: AbstractFilterDesign[],
        id?: string,
        relations?: string[]
    ) {
        super(id, relations);
    }

    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    public getDataSources(ignoreOperator: boolean = false): FilterDataSource[] {
        return this.filters.reduce((list, nestedDesign) => {
            let nestedDataSourceList: FilterDataSource[] = nestedDesign.getDataSources(ignoreOperator);

            nestedDataSourceList.forEach((nestedDataSource) => {
                let exists = list.some((existingDataSource) => FilterUtil.areFilterDataSourcesEquivalent(nestedDataSource,
                    existingDataSource, ignoreOperator));

                if (!exists) {
                    list.push(nestedDataSource);
                }
            });

            return list;
        }, []);
    }

    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    public toFilter(): AbstractFilter {
        return new CompoundFilter(this.type, this.filters.map((nestedDesign) => nestedDesign.toFilter()), this.id, this.relations);
    }
}

export class BoundsFilterDesign extends AbstractFilterDesign {
    constructor(
        public fieldKey1: string,
        public fieldKey2: string,
        public begin1: any,
        public begin2: any,
        public end1: any,
        public end2: any,
        id?: string,
        relations?: string[]
    ) {
        super(id, relations);
    }

    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    public getDataSources(ignoreOperator: boolean = false): FilterDataSource[] {
        const fieldKey1: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey1);
        const fieldKey2: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey2);

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
    }

    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    public toFilter(): AbstractFilter {
        return new BoundsFilter(this.fieldKey1, this.fieldKey2, this.begin1, this.begin2, this.end1, this.end2, this.id, this.relations);
    }
}

export class DomainFilterDesign extends AbstractFilterDesign {
    constructor(public fieldKey: string, public begin: any, public end: any, id?: string, relations?: string[]) {
        super(id, relations);
    }

    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    public getDataSources(ignoreOperator: boolean = false): FilterDataSource[] {
        const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey);

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
    }

    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    public toFilter(): AbstractFilter {
        return new DomainFilter(this.fieldKey, this.begin, this.end, this.id, this.relations);
    }
}

export class ListFilterDesign extends AbstractFilterDesign {
    constructor(
        public type: CompoundFilterType,
        public fieldKey: string,
        public operator: string,
        public values: any[],
        id?: string,
        relations?: string[]
    ) {
        super(id, relations);
    }

    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    public getDataSources(ignoreOperator: boolean = false): FilterDataSource[] {
        const fieldKey: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey);
        return [{
            datastore: fieldKey.datastore,
            database: fieldKey.database,
            table: fieldKey.table,
            field: fieldKey.field,
            operator: ignoreOperator ? null : this.operator
        }];
    }

    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    public toFilter(): AbstractFilter {
        return new ListFilter(this.type, this.fieldKey, this.operator, this.values, this.id, this.relations);
    }
}

export class PairFilterDesign extends AbstractFilterDesign {
    constructor(
        public type: CompoundFilterType,
        public fieldKey1: string,
        public fieldKey2: string,
        public operator1: any,
        public operator2: any,
        public value1: any,
        public value2: any,
        id?: string,
        relations?: string[]
    ) {
        super(id, relations);
    }

    /**
     * Creates and returns the FilterDataSource list for this FilterDesign object.
     *
     * @override
     */
    public getDataSources(ignoreOperator: boolean = false): FilterDataSource[] {
        const fieldKey1: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey1);
        const fieldKey2: FieldKey = DatasetUtil.deconstructTableOrFieldKey(this.fieldKey2);

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
    }

    /**
     * Creates and returns the Filter for this FilterDesign.
     *
     * @override
     */
    public toFilter(): AbstractFilter {
        return new PairFilter(this.type, this.fieldKey1, this.fieldKey2, this.operator1, this.operator2, this.value1, this.value2,
            this.id, this.relations);
    }
}

