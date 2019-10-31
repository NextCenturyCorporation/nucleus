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
var core_util_1 = require("./core.util");
var dataset_1 = require("./models/dataset");
var filters_1 = require("./models/filters");
describe('CoreUtil', function () {
    it('returns an empty array from flatten if given undefined or empty input', function () {
        expect(core_util_1.CoreUtil.flatten(undefined)).toEqual([]);
        expect(core_util_1.CoreUtil.flatten(null)).toEqual([]);
        expect(core_util_1.CoreUtil.flatten([])).toEqual([]);
        expect(core_util_1.CoreUtil.flatten([[]])).toEqual([]);
    });
    it('returns the expected array from flatten if given an unnested array', function () {
        expect(core_util_1.CoreUtil.flatten([1])).toEqual([1]);
        expect(core_util_1.CoreUtil.flatten([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
        expect(core_util_1.CoreUtil.flatten(['1', '2', '3', '4'])).toEqual(['1', '2', '3', '4']);
        expect(core_util_1.CoreUtil.flatten([true, false])).toEqual([true, false]);
    });
    it('returns the expected array from flatten if given an nested array', function () {
        expect(core_util_1.CoreUtil.flatten([[1]])).toEqual([1]);
        expect(core_util_1.CoreUtil.flatten([[1], 2, 3, 4])).toEqual([1, 2, 3, 4]);
        expect(core_util_1.CoreUtil.flatten([[1, 2], 3, 4])).toEqual([1, 2, 3, 4]);
        expect(core_util_1.CoreUtil.flatten([[1, 2, 3, 4]])).toEqual([1, 2, 3, 4]);
        expect(core_util_1.CoreUtil.flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
        expect(core_util_1.CoreUtil.flatten([[1, [2, 3], 4]])).toEqual([1, 2, 3, 4]);
    });
    it('returns the expected array from flatten if given an array of objects', function () {
        expect(core_util_1.CoreUtil.flatten([{
                key1: 'value1'
            }, {
                key2: 12345
            }])).toEqual([{
                key1: 'value1'
            }, {
                key2: 12345
            }]);
        expect(core_util_1.CoreUtil.flatten([[{
                    key1: 'value1'
                }], [{
                    key2: 12345
                }]])).toEqual([{
                key1: 'value1'
            }, {
                key2: 12345
            }]);
    });
    it('returns undefined from deepFind if given undefined or an unknown path', function () {
        expect(core_util_1.CoreUtil.deepFind(undefined, undefined)).toBeUndefined();
        expect(core_util_1.CoreUtil.deepFind(undefined, '')).toBeUndefined();
        expect(core_util_1.CoreUtil.deepFind(undefined, 'key')).toBeUndefined();
        expect(core_util_1.CoreUtil.deepFind({}, 'key')).toBeUndefined();
        expect(core_util_1.CoreUtil.deepFind({
            otherKey: 'otherValue'
        }, 'key')).toBeUndefined();
        expect(core_util_1.CoreUtil.deepFind({
            outerKey: {
                innerKey: 'value'
            }
        }, 'outerKey.otherKey')).toBeUndefined();
    });
    it('returns the expected object from deepFind if given an unnested path', function () {
        expect(core_util_1.CoreUtil.deepFind({
            key1: 'value',
            key2: 12345
        }, 'key1')).toEqual('value');
        expect(core_util_1.CoreUtil.deepFind({
            key1: 'value',
            key2: 12345
        }, 'key2')).toEqual(12345);
        expect(core_util_1.CoreUtil.deepFind({
            key1: ['arrayValue'],
            key2: {
                innerKey: 'innerValue'
            }
        }, 'key1')).toEqual(['arrayValue']);
        expect(core_util_1.CoreUtil.deepFind({
            key1: ['arrayValue'],
            key2: {
                innerKey: 'innerValue'
            }
        }, 'key2')).toEqual({
            innerKey: 'innerValue'
        });
    });
    it('returns the expected object from deepFind if given a nested object path', function () {
        expect(core_util_1.CoreUtil.deepFind({
            key1: {
                keyA: 'value',
                keyB: 12345
            },
            key2: {
                keyC: ['arrayValue'],
                keyD: {
                    innerKey: 'innerValue'
                }
            }
        }, 'key1.keyA')).toEqual('value');
        expect(core_util_1.CoreUtil.deepFind({
            key1: {
                keyA: 'value',
                keyB: 12345
            },
            key2: {
                keyC: ['arrayValue'],
                keyD: {
                    innerKey: 'innerValue'
                }
            }
        }, 'key1.keyB')).toEqual(12345);
        expect(core_util_1.CoreUtil.deepFind({
            key1: {
                keyA: 'value',
                keyB: 12345
            },
            key2: {
                keyC: ['arrayValue'],
                keyD: {
                    innerKey: 'innerValue'
                }
            }
        }, 'key2.keyC')).toEqual(['arrayValue']);
        expect(core_util_1.CoreUtil.deepFind({
            key1: {
                keyA: 'value',
                keyB: 12345
            },
            key2: {
                keyC: ['arrayValue'],
                keyD: {
                    innerKey: 'innerValue'
                }
            }
        }, 'key2.keyD.innerKey')).toEqual('innerValue');
    });
    it('returns the expected object from deepFind if given a nested object path that exists at the object root', function () {
        expect(core_util_1.CoreUtil.deepFind({
            'key1.keyA': 'value',
            'key1.keyB': 12345,
            'key2.keyC': ['arrayValue'],
            'key2.keyD': {
                innerKey: 'innerValue'
            }
        }, 'key1.keyA')).toEqual('value');
        expect(core_util_1.CoreUtil.deepFind({
            'key1.keyA': 'value',
            'key1.keyB': 12345,
            'key2.keyC': ['arrayValue'],
            'key2.keyD': {
                innerKey: 'innerValue'
            }
        }, 'key1.keyB')).toEqual(12345);
        expect(core_util_1.CoreUtil.deepFind({
            'key1.keyA': 'value',
            'key1.keyB': 12345,
            'key2.keyC': ['arrayValue'],
            'key2.keyD': {
                innerKey: 'innerValue'
            }
        }, 'key2.keyC')).toEqual(['arrayValue']);
        expect(core_util_1.CoreUtil.deepFind({
            'key1.keyA': 'value',
            'key1.keyB': 12345,
            'key2.keyC': ['arrayValue'],
            'key2.keyD': {
                innerKey: 'innerValue'
            }
        }, 'key2.keyD')).toEqual({
            innerKey: 'innerValue'
        });
    });
    it('returns the expected array from deepFind if given a nested array path', function () {
        expect(core_util_1.CoreUtil.deepFind({
            key1: [{
                    keyA: 'value1',
                    keyB: 12345
                }, {
                    keyA: 'value2',
                    keyB: 67890
                }],
            key2: [{
                    keyC: ['arrayValue1'],
                    keyD: {
                        innerKey: 'innerValue1'
                    }
                }, {
                    keyC: ['arrayValue2'],
                    keyD: {
                        innerKey: 'innerValue2'
                    }
                }]
        }, 'key1.keyA')).toEqual(['value1', 'value2']);
        expect(core_util_1.CoreUtil.deepFind({
            key1: [{
                    keyA: 'value1',
                    keyB: 12345
                }, {
                    keyA: 'value2',
                    keyB: 67890
                }],
            key2: [{
                    keyC: ['arrayValue1'],
                    keyD: {
                        innerKey: 'innerValue1'
                    }
                }, {
                    keyC: ['arrayValue2'],
                    keyD: {
                        innerKey: 'innerValue2'
                    }
                }]
        }, 'key1.keyB')).toEqual([12345, 67890]);
        expect(core_util_1.CoreUtil.deepFind({
            key1: [{
                    keyA: 'value1',
                    keyB: 12345
                }, {
                    keyA: 'value2',
                    keyB: 67890
                }],
            key2: [{
                    keyC: ['arrayValue1'],
                    keyD: {
                        innerKey: 'innerValue1'
                    }
                }, {
                    keyC: ['arrayValue2'],
                    keyD: {
                        innerKey: 'innerValue2'
                    }
                }]
        }, 'key2.keyC')).toEqual(['arrayValue1', 'arrayValue2']);
        expect(core_util_1.CoreUtil.deepFind({
            key1: [{
                    keyA: 'value1',
                    keyB: 12345
                }, {
                    keyA: 'value2',
                    keyB: 67890
                }],
            key2: [{
                    keyC: ['arrayValue1'],
                    keyD: {
                        innerKey: 'innerValue1'
                    }
                }, {
                    keyC: ['arrayValue2'],
                    keyD: {
                        innerKey: 'innerValue2'
                    }
                }]
        }, 'key2.keyD.innerKey')).toEqual(['innerValue1', 'innerValue2']);
    });
    it('returns the expected falsey object from deepFind', function () {
        expect(core_util_1.CoreUtil.deepFind({
            key: 0
        }, 'key')).toEqual(0);
        expect(core_util_1.CoreUtil.deepFind({
            key: ''
        }, 'key')).toEqual('');
        expect(core_util_1.CoreUtil.deepFind({
            key: false
        }, 'key')).toEqual(false);
        expect(core_util_1.CoreUtil.deepFind({
            key: null
        }, 'key')).toEqual(null);
    });
    it('returns the expected sort result for string values in ascending order', function () {
        var keys = [{
                keyA: 'value4',
                keyB: 'bravo'
            }, {
                keyA: 'value21',
                keyB: 'Oscar'
            }, {
                keyA: 'value16',
                keyB: 'sierra'
            }, {
                keyA: 'value5',
                keyB: 'foxtrot'
            }, {
                keyA: 'value75',
                keyB: 'Tango'
            }];
        expect(core_util_1.CoreUtil.sortArrayOfObjects(keys, 'keyA')).toEqual([
            { keyA: 'value16', keyB: 'sierra' },
            { keyA: 'value21', keyB: 'Oscar' },
            { keyA: 'value4', keyB: 'bravo' },
            { keyA: 'value5', keyB: 'foxtrot' },
            { keyA: 'value75', keyB: 'Tango' }
        ]);
        expect(core_util_1.CoreUtil.sortArrayOfObjects(keys, 'keyB')).toEqual([
            { keyA: 'value4', keyB: 'bravo' },
            { keyA: 'value5', keyB: 'foxtrot' },
            { keyA: 'value21', keyB: 'Oscar' },
            { keyA: 'value16', keyB: 'sierra' },
            { keyA: 'value75', keyB: 'Tango' }
        ]);
    });
    it('returns the expected sort result for string values in descending order', function () {
        var keys = [{
                keyA: 'value4',
                keyB: 'bravo'
            }, {
                keyA: 'value21',
                keyB: 'Oscar'
            }, {
                keyA: 'value16',
                keyB: 'sierra'
            }, {
                keyA: 'value5',
                keyB: 'foxtrot'
            }, {
                keyA: 'value75',
                keyB: 'Tango'
            }];
        expect(core_util_1.CoreUtil.sortArrayOfObjects(keys, 'keyA', -1)).toEqual([
            { keyA: 'value75', keyB: 'Tango' },
            { keyA: 'value5', keyB: 'foxtrot' },
            { keyA: 'value4', keyB: 'bravo' },
            { keyA: 'value21', keyB: 'Oscar' },
            { keyA: 'value16', keyB: 'sierra' }
        ]);
        expect(core_util_1.CoreUtil.sortArrayOfObjects(keys, 'keyB', -1)).toEqual([
            { keyA: 'value75', keyB: 'Tango' },
            { keyA: 'value16', keyB: 'sierra' },
            { keyA: 'value21', keyB: 'Oscar' },
            { keyA: 'value5', keyB: 'foxtrot' },
            { keyA: 'value4', keyB: 'bravo' }
        ]);
    });
    it('changeOrToggleMultipleValues does change given values array to given value and return values', function () {
        var valuesA = [1, 2];
        var resultA = core_util_1.CoreUtil.changeOrToggleMultipleValues([1], valuesA);
        expect(valuesA).toEqual([1]);
        expect(resultA).toEqual(valuesA);
        var valuesB = [1, 2];
        var resultB = core_util_1.CoreUtil.changeOrToggleMultipleValues([3], valuesB);
        expect(valuesB).toEqual([3]);
        expect(resultB).toEqual(valuesB);
        var valuesC = [1, 2];
        var resultC = core_util_1.CoreUtil.changeOrToggleMultipleValues([2, 3], valuesC);
        expect(valuesC).toEqual([2, 3]);
        expect(resultC).toEqual(valuesC);
    });
    it('changeOrToggleMultipleValues does toggle given value in given values array and return values', function () {
        var valuesA = [1, 2];
        var resultA = core_util_1.CoreUtil.changeOrToggleMultipleValues([1], valuesA, true);
        expect(valuesA).toEqual([2]);
        expect(resultA).toEqual(valuesA);
        var valuesB = [1, 2];
        var resultB = core_util_1.CoreUtil.changeOrToggleMultipleValues([3], valuesB, true);
        expect(valuesB).toEqual([1, 2, 3]);
        expect(resultB).toEqual(valuesB);
        var valuesC = [1, 2];
        var resultC = core_util_1.CoreUtil.changeOrToggleMultipleValues([2, 3], valuesC, true);
        expect(valuesC).toEqual([1, 3]);
        expect(resultC).toEqual(valuesC);
    });
    it('changeOrToggleValues does change given values array to given value and return values', function () {
        var valuesA = [1, 2];
        var resultA = core_util_1.CoreUtil.changeOrToggleValues(1, valuesA);
        expect(valuesA).toEqual([1]);
        expect(resultA).toEqual(valuesA);
        var valuesB = [1, 2];
        var resultB = core_util_1.CoreUtil.changeOrToggleValues(3, valuesB);
        expect(valuesB).toEqual([3]);
        expect(resultB).toEqual(valuesB);
    });
    it('changeOrToggleValues does toggle given value in given values array and return values', function () {
        var valuesA = [1, 2];
        var resultA = core_util_1.CoreUtil.changeOrToggleValues(1, valuesA, true);
        expect(valuesA).toEqual([2]);
        expect(resultA).toEqual(valuesA);
        var valuesB = [1, 2];
        var resultB = core_util_1.CoreUtil.changeOrToggleValues(3, valuesB, true);
        expect(valuesB).toEqual([1, 2, 3]);
        expect(resultB).toEqual(valuesB);
    });
    it('checkStringForUrl returns an array of occurrences of urls in the string', function () {
        var testString = 'Hello World, https://www.google.com Goodbye world https://www.yahoo.com';
        expect(core_util_1.CoreUtil.checkStringForUrl(testString)).toEqual(['https://www.google.com', 'https://www.yahoo.com']);
    });
    it('hasUrl works with multiple links', function () {
        var multUrlString = 'Use https://www.google.com to search as well as http://www.bing.com They both work well.';
        var testOut = core_util_1.CoreUtil.hasUrl(multUrlString);
        expect(testOut.url).toEqual(['https://www.google.com', 'http://www.bing.com']);
        expect(testOut.splitText).toEqual(['Use ', ' to search as well as ', ' They both work well.']);
        expect(testOut.test).toEqual(true);
    });
    it('hasUrl checks if url is in string and sets url variable, and adds http if needed', function () {
        var testString = 'Hello World, www.google.com Goodbye world';
        var testOut = core_util_1.CoreUtil.hasUrl(testString);
        expect(testOut.url).toEqual(['http://www.google.com']);
    });
    it('hasUrl correctly recognizes different link prefixes or postfixes', function () {
        var ftpString = 'Hello World, ftp://www.files.org Goodbye world.';
        var queryString = 'Hello World, http://www.files.org/there?next=free Goodbye world.';
        var fragIdString = 'Hello World, http://www.files.org/there.html#bar Goodbye world.';
        var fileString = 'Hello World, file://document.pdf Goodbye world.';
        var testOut = core_util_1.CoreUtil.hasUrl(ftpString);
        expect(testOut.url).toEqual(['ftp://www.files.org']);
        expect(testOut.splitText).toEqual(['Hello World, ', ' Goodbye world.']);
        testOut = core_util_1.CoreUtil.hasUrl(queryString);
        expect(testOut.url).toEqual(['http://www.files.org/there?next=free']);
        expect(testOut.splitText).toEqual(['Hello World, ', ' Goodbye world.']);
        testOut = core_util_1.CoreUtil.hasUrl(fragIdString);
        expect(testOut.url).toEqual(['http://www.files.org/there.html#bar']);
        expect(testOut.splitText).toEqual(['Hello World, ', ' Goodbye world.']);
        testOut = core_util_1.CoreUtil.hasUrl(fileString);
        expect(testOut.url).toEqual(['file://document.pdf']);
        expect(testOut.splitText).toEqual(['Hello World, ', ' Goodbye world.']);
    });
    it('isItemFilteredInEveryField does return expected boolean', function () {
        var fields = [
            dataset_1.FieldConfig.get({ columnName: 'field1' }),
            dataset_1.FieldConfig.get({ columnName: 'field2' })
        ];
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField({}, fields, new Map())).toEqual(true);
        var itemA = {
            field1: 1,
            field2: 2
        };
        var itemB = {
            field1: 3,
            field2: 4
        };
        var itemC = {
            field1: 1
        };
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField(itemA, fields, new Map())).toEqual(false);
        var fieldsToValuesA = new Map();
        fieldsToValuesA.set('field1', [1]);
        fieldsToValuesA.set('field2', [2]);
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField(itemA, fields, fieldsToValuesA)).toEqual(true);
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField(itemB, fields, fieldsToValuesA)).toEqual(false);
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField(itemC, fields, fieldsToValuesA)).toEqual(false);
        var fieldsToValuesB = new Map();
        fieldsToValuesB.set('field1', [3]);
        fieldsToValuesB.set('field2', [4]);
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField(itemA, fields, fieldsToValuesB)).toEqual(false);
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField(itemB, fields, fieldsToValuesB)).toEqual(true);
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField(itemC, fields, fieldsToValuesB)).toEqual(false);
        var fieldsToValuesC = new Map();
        fieldsToValuesC.set('field1', [1]);
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField(itemA, fields, fieldsToValuesC)).toEqual(false);
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField(itemB, fields, fieldsToValuesC)).toEqual(false);
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField(itemC, fields, fieldsToValuesC)).toEqual(true);
        var fieldsToValuesD = new Map();
        fieldsToValuesD.set('field1', [1, 3]);
        fieldsToValuesD.set('field2', [2, 4]);
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField(itemA, fields, fieldsToValuesD)).toEqual(true);
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField(itemB, fields, fieldsToValuesD)).toEqual(true);
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField(itemC, fields, fieldsToValuesD)).toEqual(false);
    });
    it('isItemFilteredInEveryField does return false if fields are empty', function () {
        var itemA = {
            field1: 1,
            field2: 2
        };
        var fieldsToValuesA = new Map();
        fieldsToValuesA.set('field1', [1]);
        fieldsToValuesA.set('field2', [2]);
        expect(core_util_1.CoreUtil.isItemFilteredInEveryField(itemA, [], fieldsToValuesA)).toEqual(false);
    });
    it('isNumber does return expected boolean', function () {
        expect(core_util_1.CoreUtil.isNumber(true)).toEqual(false);
        expect(core_util_1.CoreUtil.isNumber('a')).toEqual(false);
        expect(core_util_1.CoreUtil.isNumber([1, 2])).toEqual(false);
        expect(core_util_1.CoreUtil.isNumber({
            value: 1
        })).toEqual(false);
        expect(core_util_1.CoreUtil.isNumber(1)).toEqual(true);
        expect(core_util_1.CoreUtil.isNumber(12.34)).toEqual(true);
        expect(core_util_1.CoreUtil.isNumber(-12.34)).toEqual(true);
        expect(core_util_1.CoreUtil.isNumber('1')).toEqual(true);
        expect(core_util_1.CoreUtil.isNumber('12.34')).toEqual(true);
        expect(core_util_1.CoreUtil.isNumber('-12.34')).toEqual(true);
    });
    it('prettifyInteger does return expected string', function () {
        expect(core_util_1.CoreUtil.prettifyInteger(0)).toEqual('0');
        expect(core_util_1.CoreUtil.prettifyInteger(1)).toEqual('1');
        expect(core_util_1.CoreUtil.prettifyInteger(12)).toEqual('12');
        expect(core_util_1.CoreUtil.prettifyInteger(123)).toEqual('123');
        expect(core_util_1.CoreUtil.prettifyInteger(1234)).toEqual('1,234');
        expect(core_util_1.CoreUtil.prettifyInteger(1234567890)).toEqual('1,234,567,890');
    });
    it('retrieveValuesFromListFilters does return expected array', function () {
        expect(core_util_1.CoreUtil.retrieveValuesFromListFilters([])).toEqual([]);
    });
    it('updateValuesFromListFilters does return expected Map', function () {
        var fields = [dataset_1.FieldConfig.get({ columnName: 'field1' })];
        var filters = new filters_1.FilterCollection();
        spyOn(filters, 'getCompatibleFilters').and.callFake(function (__design) { return []; });
        spyOn(core_util_1.CoreUtil, 'retrieveValuesFromListFilters').and.callFake(function (__filters) { return [1, 2]; });
        var fieldsToValuesA = new Map();
        var resultA = core_util_1.CoreUtil.updateValuesFromListFilters(fields, filters, fieldsToValuesA, function () { return null; });
        expect(fieldsToValuesA.get('field1')).toEqual([1, 2]);
        expect(resultA).toEqual(fieldsToValuesA);
        var fieldsToValuesB = new Map();
        fieldsToValuesB.set('field1', [3, 4]);
        var resultB = core_util_1.CoreUtil.updateValuesFromListFilters(fields, filters, fieldsToValuesB, function () { return null; });
        expect(fieldsToValuesB.get('field1')).toEqual([1, 2]);
        expect(resultB).toEqual(fieldsToValuesB);
    });
});
//# sourceMappingURL=core.util.spec.js.map