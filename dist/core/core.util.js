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
var CoreUtil = /** @class */ (function () {
    function CoreUtil() {
    }
    /**
     * Adds a listener on the given event to the given child element that dispatches a copy of the event using the given parent element.
     */
    CoreUtil.addEventPropagationListener = function (parentElement, childElement, eventName) {
        childElement.addEventListener(eventName, function (event) {
            parentElement.dispatchEvent(new CustomEvent(eventName, {
                detail: event.detail
            }));
        });
    };
    /**
     * Add the given listener of the given event on the element with the given ID.
     */
    CoreUtil.addListener = function (listener, parentElement, elementId, eventName) {
        if (elementId && eventName && parentElement) {
            var element = parentElement.querySelector('#' + elementId);
            if (element) {
                element.addEventListener(eventName, listener);
            }
        }
    };
    /**
     * Changes the given array of values to an array with the given values, or toggles the given values in the given array of values.
     */
    CoreUtil.changeOrToggleMultipleValues = function (newValues, oldValues, toggle) {
        if (toggle === void 0) { toggle = false; }
        if (!toggle) {
            oldValues.splice(0, oldValues.length);
        }
        newValues.forEach(function (newValue) {
            var index = oldValues.indexOf(newValue);
            if (index < 0) {
                oldValues.push(newValue);
            }
            else {
                oldValues.splice(index, 1);
            }
        });
        return oldValues;
    };
    /**
     * Changes the given array of values to an array with the given value, or toggles the given value in the given array of values.
     */
    CoreUtil.changeOrToggleValues = function (value, values, toggle) {
        if (toggle === void 0) { toggle = false; }
        if (toggle) {
            var index = values.indexOf(value);
            if (index < 0) {
                values.push(value);
            }
            else {
                values.splice(index, 1);
            }
        }
        else {
            values.splice(0, values.length, value);
        }
        return values;
    };
    CoreUtil.checkStringForUrl = function (text) {
        // Need to use match operator and not RegExp.exec() because use of global flag
        // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
        var matches = text.match(CoreUtil.URL_PATTERN);
        var prefixPattern = new RegExp('^(http|https|ftp|file)://');
        var temp;
        matches.forEach(function (url, index) {
            if (!prefixPattern.test(url)) {
                temp = 'http://' + url;
                matches[index] = temp;
            }
        });
        return matches;
    };
    /**
     * Returns the object nested inside the given object using the given path string (with periods to mark each nested property).
     *
     * @arg {object} item
     * @arg {string} pathString
     * @return {object}
     */
    CoreUtil.deepFind = function (item, pathString) {
        if (item && typeof item[pathString] !== 'undefined') {
            return item[pathString];
        }
        var itemToReturn = item;
        var path = (pathString ? pathString.split('.') : []);
        for (var index = 0; index < path.length; index++) {
            if (itemToReturn instanceof Array) {
                var nestedPath = path.slice(index).join('.');
                var pieces = [];
                for (var _i = 0, itemToReturn_1 = itemToReturn; _i < itemToReturn_1.length; _i++) {
                    var itemInList = itemToReturn_1[_i];
                    var entryValue = CoreUtil.deepFind(itemInList, nestedPath);
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
    };
    /**
     * Flattens and returns the given array.
     *
     * @arg {array} input
     * @return {array}
     */
    CoreUtil.flatten = function (input) {
        return (input || []).reduce(function (array, element) { return array.concat(Array.isArray(element) ? CoreUtil.flatten(element) : element); }, []);
    };
    CoreUtil.hasUrl = function (text) {
        var test = CoreUtil.URL_PATTERN.test(text);
        var url = [];
        var splitText = [];
        if (test) {
            url = CoreUtil.checkStringForUrl(text);
            splitText = CoreUtil.splitStringByUrl(text);
        }
        return {
            test: test,
            url: url,
            splitText: splitText
        };
    };
    /**
     * Returns true if the given item contains a value from the given Map of filtered values for all the given filter fields.
     */
    CoreUtil.isItemFilteredInEveryField = function (item, fields, fieldsToValues) {
        return !fields.length ? false : fields.filter(function (field) { return !!field.columnName; }).every(function (field) {
            var values = fieldsToValues.get(field.columnName) || [];
            return (!values.length && !item[field.columnName]) || values.indexOf(item[field.columnName]) >= 0;
        });
    };
    /**
     * Returns whether the given item is a number.
     */
    CoreUtil.isNumber = function (item) {
        return !isNaN(parseFloat(item)) && isFinite(item);
    };
    /**
     * Returns the prettified string of the given integer (with commas).
     */
    CoreUtil.prettifyInteger = function (item) {
        return Math.round(item).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    /**
     * Removes the given listener of the given event on the element with the given ID.
     */
    CoreUtil.removeListener = function (listener, parentElement, elementId, eventName) {
        if (elementId && eventName && parentElement) {
            var element = parentElement.querySelector('#' + elementId);
            if (element) {
                element.removeEventListener(eventName, listener);
            }
        }
    };
    /**
     * Returns the values in the given ListFilter objects.
     */
    CoreUtil.retrieveValuesFromListFilters = function (filters) {
        return filters.reduce(function (list, filter) { return list.concat(filter.values); }, []);
    };
    /**
     * Dynamic sorting over an array of objects
     * https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
     *
     * @arg {array} array
     * @arg {string} key
     * @arg {number} [order=1] 1 if ascending or -1 if descending
     * @return {array}
     */
    CoreUtil.sortArrayOfObjects = function (array, key, order) {
        if (order === void 0) { order = 1; }
        return array.sort(function (object1, object2) {
            if (!object1.hasOwnProperty(key) || !object2.hasOwnProperty(key)) {
                // Property doesn't exist on either object
                return 0;
            }
            var varA = (typeof object1[key] === 'string') ? object1[key].toUpperCase() : object1[key];
            var varB = (typeof object2[key] === 'string') ? object2[key].toUpperCase() : object2[key];
            var comparison = 0;
            if (varA > varB) {
                comparison = 1;
            }
            else if (varA < varB) {
                comparison = -1;
            }
            return comparison * order;
        });
    };
    CoreUtil.splitStringByUrl = function (text) {
        var textParts = text.split(CoreUtil.URL_PATTERN);
        return textParts;
    };
    /**
     * Transforms the given attributes of an HTMLElement into an object.
     */
    CoreUtil.transformElementAttributes = function (elementAttributes) {
        var attributes = {};
        // I don't think(?) we're able to use a for-of on a NamedNodeMap.
        /* eslint-disable-next-line @typescript-eslint/prefer-for-of */
        for (var index = 0; index < elementAttributes.length; ++index) {
            attributes[elementAttributes[index].name] = elementAttributes[index].value;
        }
        return attributes;
    };
    /**
     * Transforms the given string or string array into a string array and returns the array.
     *
     * @arg {string|string[]} input
     * @return {string[]}
     */
    CoreUtil.transformToStringArray = function (input, delimiter) {
        if (Array.isArray(input)) {
            return input;
        }
        if (input !== '' && input !== null && typeof input !== 'undefined') {
            var inputValue = input.toString();
            if (inputValue.indexOf('[') === 0 && inputValue.lastIndexOf(']') === (inputValue.length - 1) &&
                typeof inputValue !== 'undefined') {
                inputValue = inputValue.substring(1, inputValue.length - 1);
            }
            return inputValue.indexOf(delimiter) > -1 ? inputValue.split(delimiter) : [inputValue];
        }
        return [];
    };
    /**
     * Updates the given attributes of the given element.
     */
    CoreUtil.updateElementAttributes = function (element, observedAttributes, configuredAttributes) {
        observedAttributes.forEach(function (attribute) {
            if (typeof configuredAttributes[attribute] === 'undefined') {
                if (element.hasAttribute(attribute)) {
                    element.removeAttribute(attribute);
                }
            }
            else if (('' + configuredAttributes[attribute]) !== element.getAttribute(attribute)) {
                element.setAttribute(attribute, configuredAttributes[attribute]);
            }
        });
    };
    /**
     * Removes the given listener of the given old event on the element with the given old ID and adds the listener of
     * the given new event on the element with the given new ID.
     */
    CoreUtil.updateListener = function (listener, parentElement, oldElementId, oldEventName, newElementId, newEventName) {
        CoreUtil.removeListener(listener, parentElement, oldElementId, oldEventName);
        CoreUtil.addListener(listener, parentElement, newElementId, newEventName);
    };
    /**
     * Updates the filtered values of all the given filter fields in the given Map using the filters in the given filter collection.
     */
    CoreUtil.updateValuesFromListFilters = function (fields, filters, fieldsToValues, createListFilterDesign) {
        fields.filter(function (field) { return !!field.columnName; }).forEach(function (field) {
            var listFilters = filters.getCompatibleFilters(createListFilterDesign(field));
            fieldsToValues.set(field.columnName, CoreUtil.retrieveValuesFromListFilters(listFilters));
        });
        return fieldsToValues;
    };
    // eslint-disable-next-line max-len
    CoreUtil.URL_PATTERN = /(?:(?:http:\/\/)|(?:https:\/\/)|(?:ftp:\/\/)|(?:file:\/\/)|(?:www\.).)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&\\/=]*/g;
    return CoreUtil;
}());
exports.CoreUtil = CoreUtil;
//# sourceMappingURL=core.util.js.map