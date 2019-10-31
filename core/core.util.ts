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

import { FieldConfig } from './models/dataset';
import { FilterCollection, ListFilter, ListFilterDesign } from './models/filters';

export class CoreUtil {
    // eslint-disable-next-line max-len
    static URL_PATTERN = /(?:(?:http:\/\/)|(?:https:\/\/)|(?:ftp:\/\/)|(?:file:\/\/)|(?:www\.).)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&\\/=]*/g;

    /**
     * Adds a listener on the given event to the given child element that dispatches a copy of the event using the given parent element.
     */
    static addEventPropagationListener(parentElement: HTMLElement, childElement: HTMLElement, eventName: string): void {
        childElement.addEventListener(eventName, (event: any) => {
            parentElement.dispatchEvent(new CustomEvent(eventName, {
                detail: event.detail
            }));
        });
    }

    /**
     * Add the given listener of the given event on the element with the given ID.
     */
    static addListener(listener: (event: any) => void, parentElement: HTMLElement, elementId: string, eventName: string): void {
        if (elementId && eventName && parentElement) {
            const element = parentElement.querySelector('#' + elementId);
            if (element) {
                element.addEventListener(eventName, listener);
            }
        }
    }

    /**
     * Changes the given array of values to an array with the given values, or toggles the given values in the given array of values.
     */
    static changeOrToggleMultipleValues(newValues: any[], oldValues: any[], toggle: boolean = false): any[] {
        if (!toggle) {
            oldValues.splice(0, oldValues.length);
        }
        newValues.forEach((newValue) => {
            const index = oldValues.indexOf(newValue);
            if (index < 0) {
                oldValues.push(newValue);
            } else {
                oldValues.splice(index, 1);
            }
        });
        return oldValues;
    }

    /**
     * Changes the given array of values to an array with the given value, or toggles the given value in the given array of values.
     */
    static changeOrToggleValues(value: any, values: any[], toggle: boolean = false): any[] {
        if (toggle) {
            const index = values.indexOf(value);
            if (index < 0) {
                values.push(value);
            } else {
                values.splice(index, 1);
            }
        } else {
            values.splice(0, values.length, value);
        }
        return values;
    }

    static checkStringForUrl(text: string) {
        // Need to use match operator and not RegExp.exec() because use of global flag
        // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
        let matches = text.match(CoreUtil.URL_PATTERN);
        let prefixPattern = new RegExp('^(http|https|ftp|file)://');
        let temp;
        matches.forEach((url, index) => {
            if (!prefixPattern.test(url)) {
                temp = 'http://' + url;
                matches[index] = temp;
            }
        });
        return matches;
    }

    /**
     * Returns the object nested inside the given object using the given path string (with periods to mark each nested property).
     *
     * @arg {object} item
     * @arg {string} pathString
     * @return {object}
     */
    static deepFind(item, pathString) {
        if (item && typeof item[pathString] !== 'undefined') {
            return item[pathString];
        }
        let itemToReturn = item;
        let path = (pathString ? pathString.split('.') : []);
        for (let index = 0; index < path.length; index++) {
            if (itemToReturn instanceof Array) {
                let nestedPath = path.slice(index).join('.');
                let pieces = [];
                for (let itemInList of itemToReturn) {
                    let entryValue = CoreUtil.deepFind(itemInList, nestedPath);
                    if (entryValue instanceof Array) {
                        entryValue = CoreUtil.flatten(entryValue);
                    }
                    pieces = pieces.concat(entryValue);
                }
                return pieces;
            }
            itemToReturn = itemToReturn ? itemToReturn[path[index]] : undefined;
        }
        return itemToReturn;
    }

    /**
     * Flattens and returns the given array.
     *
     * @arg {array} input
     * @return {array}
     */
    static flatten(input) {
        return (input || []).reduce((array, element) => array.concat(Array.isArray(element) ? CoreUtil.flatten(element) : element), []);
    }

    static hasUrl(text: string) {
        let test = CoreUtil.URL_PATTERN.test(text);
        let url = [];
        let splitText = [];
        if (test) {
            url = CoreUtil.checkStringForUrl(text);
            splitText = CoreUtil.splitStringByUrl(text);
        }
        return {
            test,
            url,
            splitText
        };
    }

    /**
     * Returns true if the given item contains a value from the given Map of filtered values for all the given filter fields.
     */
    static isItemFilteredInEveryField(item: any, fields: FieldConfig[], fieldsToValues: Map<string, any[]>): boolean {
        return !fields.length ? false : fields.filter((field) => !!field.columnName).every((field) => {
            const values: any[] = fieldsToValues.get(field.columnName) || [];
            return (!values.length && !item[field.columnName]) || values.indexOf(item[field.columnName]) >= 0;
        });
    }

    /**
     * Returns whether the given item is a number.
     */
    static isNumber(item: any): boolean {
        return !isNaN(parseFloat(item)) && isFinite(item);
    }

    /**
     * Returns the prettified string of the given integer (with commas).
     */
    static prettifyInteger(item: number): string {
        return Math.round(item).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * Removes the given listener of the given event on the element with the given ID.
     */
    static removeListener(listener: (event: any) => void, parentElement: HTMLElement, elementId: string, eventName: string): void {
        if (elementId && eventName && parentElement) {
            const element = parentElement.querySelector('#' + elementId);
            if (element) {
                element.removeEventListener(eventName, listener);
            }
        }
    }

    /**
     * Returns the values in the given ListFilter objects.
     */
    static retrieveValuesFromListFilters(filters: ListFilter[]): any[] {
        return filters.reduce((list, filter) => list.concat(filter.values), []);
    }

    /**
     * Dynamic sorting over an array of objects
     * https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
     *
     * @arg {array} array
     * @arg {string} key
     * @arg {number} [order=1] 1 if ascending or -1 if descending
     * @return {array}
     */

    static sortArrayOfObjects(array: any[], key: string, order: number = 1) {
        return array.sort((object1, object2) => {
            if (!object1.hasOwnProperty(key) || !object2.hasOwnProperty(key)) {
                // Property doesn't exist on either object
                return 0;
            }

            const varA = (typeof object1[key] === 'string') ? object1[key].toUpperCase() : object1[key];
            const varB = (typeof object2[key] === 'string') ? object2[key].toUpperCase() : object2[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return comparison * order;
        });
    }

    static splitStringByUrl(text: string) {
        let textParts = text.split(CoreUtil.URL_PATTERN);
        return textParts;
    }

    /**
     * Transforms the given attributes of an HTMLElement into an object.
     */
    static transformElementAttributes(elementAttributes: NamedNodeMap): Record<string, any> {
        let attributes: Record<string, any> = {};
        // I don't think(?) we're able to use a for-of on a NamedNodeMap.
        /* eslint-disable-next-line @typescript-eslint/prefer-for-of */
        for (let index = 0; index < elementAttributes.length; ++index) {
            attributes[elementAttributes[index].name] = elementAttributes[index].value;
        }
        return attributes;
    }

    /**
     * Transforms the given string or string array into a string array and returns the array.
     *
     * @arg {string|string[]} input
     * @return {string[]}
     */
    static transformToStringArray(input, delimiter: string) {
        if (Array.isArray(input)) {
            return input;
        }
        if (input !== '' && input !== null && typeof input !== 'undefined') {
            let inputValue = input.toString();
            if (inputValue.indexOf('[') === 0 && inputValue.lastIndexOf(']') === (inputValue.length - 1) &&
                typeof inputValue !== 'undefined') {
                inputValue = inputValue.substring(1, inputValue.length - 1);
            }
            return inputValue.indexOf(delimiter) > -1 ? inputValue.split(delimiter) : [inputValue];
        }
        return [];
    }

    /**
     * Updates the filtered values of all the given filter fields in the given Map using the filters in the given filter collection.
     */
    static updateValuesFromListFilters(
        fields: FieldConfig[],
        filters: FilterCollection,
        fieldsToValues: Map<string, any[]>,
        createListFilterDesign: (field: FieldConfig, values?: any[]) => ListFilterDesign
    ): Map<string, any> {
        fields.filter((field) => !!field.columnName).forEach((field) => {
            const listFilters: ListFilter[] = filters.getCompatibleFilters(createListFilterDesign(field)) as ListFilter[];
            fieldsToValues.set(field.columnName, CoreUtil.retrieveValuesFromListFilters(listFilters));
        });
        return fieldsToValues;
    }

    /**
     * Removes the given listener of the given old event on the element with the given old ID and adds the listener of
     * the given new event on the element with the given new ID.
     */
    static updateListener(
        listener: (event: any) => void,
        parentElement: HTMLElement,
        oldElementId: string,
        oldEventName: string,
        newElementId: string,
        newEventName: string
    ): void {
        CoreUtil.removeListener(listener, parentElement, oldElementId, oldEventName);
        CoreUtil.addListener(listener, parentElement, newElementId, newEventName);
    }
}

