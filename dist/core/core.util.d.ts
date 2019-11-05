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
export declare class CoreUtil {
    static URL_PATTERN: RegExp;
    /**
     * Adds a listener on the given event to the given child element that dispatches a copy of the event using the given parent element.
     */
    static addEventPropagationListener(parentElement: HTMLElement, childElement: HTMLElement, eventName: string): void;
    /**
     * Add the given listener of the given event on the element with the given ID.
     */
    static addListener(listener: (event: any) => void, parentElement: HTMLElement, elementId: string, eventName: string): void;
    /**
     * Changes the given array of values to an array with the given values, or toggles the given values in the given array of values.
     */
    static changeOrToggleMultipleValues(newValues: any[], oldValues: any[], toggle?: boolean): any[];
    /**
     * Changes the given array of values to an array with the given value, or toggles the given value in the given array of values.
     */
    static changeOrToggleValues(value: any, values: any[], toggle?: boolean): any[];
    static checkStringForUrl(text: string): RegExpMatchArray;
    /**
     * Returns the object nested inside the given object using the given path string (with periods to mark each nested property).
     *
     * @arg {object} item
     * @arg {string} pathString
     * @return {object}
     */
    static deepFind(item: any, pathString: any): any;
    /**
     * Flattens and returns the given array.
     *
     * @arg {array} input
     * @return {array}
     */
    static flatten(input: any): any;
    static hasUrl(text: string): {
        test: boolean;
        url: any[];
        splitText: any[];
    };
    /**
     * Returns true if the given item contains a value from the given Map of filtered values for all the given filter fields.
     */
    static isItemFilteredInEveryField(item: any, fields: FieldConfig[], fieldsToValues: Map<string, any[]>): boolean;
    /**
     * Returns whether the given item is a number.
     */
    static isNumber(item: any): boolean;
    /**
     * Returns the prettified string of the given integer (with commas).
     */
    static prettifyInteger(item: number): string;
    /**
     * Removes the given listener of the given event on the element with the given ID.
     */
    static removeListener(listener: (event: any) => void, parentElement: HTMLElement, elementId: string, eventName: string): void;
    /**
     * Returns the values in the given ListFilter objects.
     */
    static retrieveValuesFromListFilters(filters: ListFilter[]): any[];
    /**
     * Dynamic sorting over an array of objects
     * https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
     *
     * @arg {array} array
     * @arg {string} key
     * @arg {number} [order=1] 1 if ascending or -1 if descending
     * @return {array}
     */
    static sortArrayOfObjects(array: any[], key: string, order?: number): any[];
    static splitStringByUrl(text: string): string[];
    /**
     * Transforms the given attributes of an HTMLElement into an object.
     */
    static transformElementAttributes(elementAttributes: NamedNodeMap): Record<string, any>;
    /**
     * Transforms the given string or string array into a string array and returns the array.
     *
     * @arg {string|string[]} input
     * @return {string[]}
     */
    static transformToStringArray(input: any, delimiter: string): any;
    /**
     * Updates the given attributes of the given element.
     */
    static updateElementAttributes(element: HTMLElement, observedAttributes: string[], configuredAttributes: Record<string, any>): void;
    /**
     * Removes the given listener of the given old event on the element with the given old ID and adds the listener of
     * the given new event on the element with the given new ID.
     */
    static updateListener(listener: (event: any) => void, parentElement: HTMLElement, oldElementId: string, oldEventName: string, newElementId: string, newEventName: string): void;
    /**
     * Updates the filtered values of all the given filter fields in the given Map using the filters in the given filter collection.
     */
    static updateValuesFromListFilters(fields: FieldConfig[], filters: FilterCollection, fieldsToValues: Map<string, any[]>, createListFilterDesign: (field: FieldConfig, values?: any[]) => ListFilterDesign): Map<string, any>;
}
