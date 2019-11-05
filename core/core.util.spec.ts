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

import { CoreUtil } from './core.util';

import { FieldConfig } from './models/dataset';
import { FilterCollection } from './models/filters';

describe('CoreUtil', () => {
    it('returns an empty array from flatten if given undefined or empty input', () => {
        expect(CoreUtil.flatten(undefined)).toEqual([]);
        expect(CoreUtil.flatten(null)).toEqual([]);
        expect(CoreUtil.flatten([])).toEqual([]);
        expect(CoreUtil.flatten([[]])).toEqual([]);
    });

    it('returns the expected array from flatten if given an unnested array', () => {
        expect(CoreUtil.flatten([1])).toEqual([1]);
        expect(CoreUtil.flatten([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
        expect(CoreUtil.flatten(['1', '2', '3', '4'])).toEqual(['1', '2', '3', '4']);
        expect(CoreUtil.flatten([true, false])).toEqual([true, false]);
    });

    it('returns the expected array from flatten if given an nested array', () => {
        expect(CoreUtil.flatten([[1]])).toEqual([1]);
        expect(CoreUtil.flatten([[1], 2, 3, 4])).toEqual([1, 2, 3, 4]);
        expect(CoreUtil.flatten([[1, 2], 3, 4])).toEqual([1, 2, 3, 4]);
        expect(CoreUtil.flatten([[1, 2, 3, 4]])).toEqual([1, 2, 3, 4]);
        expect(CoreUtil.flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
        expect(CoreUtil.flatten([[1, [2, 3], 4]])).toEqual([1, 2, 3, 4]);
    });

    it('returns the expected array from flatten if given an array of objects', () => {
        expect(CoreUtil.flatten([{
            key1: 'value1'
        }, {
            key2: 12345
        }])).toEqual([{
            key1: 'value1'
        }, {
            key2: 12345
        }]);
        expect(CoreUtil.flatten([[{
            key1: 'value1'
        }], [{
            key2: 12345
        }]])).toEqual([{
            key1: 'value1'
        }, {
            key2: 12345
        }]);
    });

    it('returns undefined from deepFind if given undefined or an unknown path', () => {
        expect(CoreUtil.deepFind(undefined, undefined)).toBeUndefined();
        expect(CoreUtil.deepFind(undefined, '')).toBeUndefined();
        expect(CoreUtil.deepFind(undefined, 'key')).toBeUndefined();
        expect(CoreUtil.deepFind({}, 'key')).toBeUndefined();
        expect(CoreUtil.deepFind({
            otherKey: 'otherValue'
        }, 'key')).toBeUndefined();
        expect(CoreUtil.deepFind({
            outerKey: {
                innerKey: 'value'
            }
        }, 'outerKey.otherKey')).toBeUndefined();
    });

    it('returns the expected object from deepFind if given an unnested path', () => {
        expect(CoreUtil.deepFind({
            key1: 'value',
            key2: 12345
        }, 'key1')).toEqual('value');
        expect(CoreUtil.deepFind({
            key1: 'value',
            key2: 12345
        }, 'key2')).toEqual(12345);
        expect(CoreUtil.deepFind({
            key1: ['arrayValue'],
            key2: {
                innerKey: 'innerValue'
            }
        }, 'key1')).toEqual(['arrayValue']);
        expect(CoreUtil.deepFind({
            key1: ['arrayValue'],
            key2: {
                innerKey: 'innerValue'
            }
        }, 'key2')).toEqual({
            innerKey: 'innerValue'
        });
    });

    it('returns the expected object from deepFind if given a nested object path', () => {
        expect(CoreUtil.deepFind({
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
        expect(CoreUtil.deepFind({
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
        expect(CoreUtil.deepFind({
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
        expect(CoreUtil.deepFind({
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

    it('returns the expected object from deepFind if given a nested object path that exists at the object root', () => {
        expect(CoreUtil.deepFind({
            'key1.keyA': 'value',
            'key1.keyB': 12345,
            'key2.keyC': ['arrayValue'],
            'key2.keyD': {
                innerKey: 'innerValue'
            }
        }, 'key1.keyA')).toEqual('value');
        expect(CoreUtil.deepFind({
            'key1.keyA': 'value',
            'key1.keyB': 12345,
            'key2.keyC': ['arrayValue'],
            'key2.keyD': {
                innerKey: 'innerValue'
            }
        }, 'key1.keyB')).toEqual(12345);
        expect(CoreUtil.deepFind({
            'key1.keyA': 'value',
            'key1.keyB': 12345,
            'key2.keyC': ['arrayValue'],
            'key2.keyD': {
                innerKey: 'innerValue'
            }
        }, 'key2.keyC')).toEqual(['arrayValue']);
        expect(CoreUtil.deepFind({
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

    it('returns the expected array from deepFind if given a nested array path', () => {
        expect(CoreUtil.deepFind({
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
        expect(CoreUtil.deepFind({
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
        expect(CoreUtil.deepFind({
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
        expect(CoreUtil.deepFind({
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

    it('returns the expected falsey object from deepFind', () => {
        expect(CoreUtil.deepFind({
            key: 0
        }, 'key')).toEqual(0);
        expect(CoreUtil.deepFind({
            key: ''
        }, 'key')).toEqual('');
        expect(CoreUtil.deepFind({
            key: false
        }, 'key')).toEqual(false);
        expect(CoreUtil.deepFind({
            key: null
        }, 'key')).toEqual(null);
    });

    it('returns the expected sort result for string values in ascending order', () => {
        let keys = [{
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

        expect(CoreUtil.sortArrayOfObjects(keys, 'keyA')).toEqual([
            { keyA: 'value16', keyB: 'sierra' },
            { keyA: 'value21', keyB: 'Oscar' },
            { keyA: 'value4', keyB: 'bravo' },
            { keyA: 'value5', keyB: 'foxtrot' },
            { keyA: 'value75', keyB: 'Tango' }
        ]);

        expect(CoreUtil.sortArrayOfObjects(keys, 'keyB')).toEqual([
            { keyA: 'value4', keyB: 'bravo' },
            { keyA: 'value5', keyB: 'foxtrot' },
            { keyA: 'value21', keyB: 'Oscar' },
            { keyA: 'value16', keyB: 'sierra' },
            { keyA: 'value75', keyB: 'Tango' }
        ]);
    });

    it('returns the expected sort result for string values in descending order', () => {
        let keys = [{
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

        expect(CoreUtil.sortArrayOfObjects(keys, 'keyA', -1)).toEqual([
            { keyA: 'value75', keyB: 'Tango' },
            { keyA: 'value5', keyB: 'foxtrot' },
            { keyA: 'value4', keyB: 'bravo' },
            { keyA: 'value21', keyB: 'Oscar' },
            { keyA: 'value16', keyB: 'sierra' }
        ]);
        expect(CoreUtil.sortArrayOfObjects(keys, 'keyB', -1)).toEqual([
            { keyA: 'value75', keyB: 'Tango' },
            { keyA: 'value16', keyB: 'sierra' },
            { keyA: 'value21', keyB: 'Oscar' },
            { keyA: 'value5', keyB: 'foxtrot' },
            { keyA: 'value4', keyB: 'bravo' }
        ]);
    });

    it('changeOrToggleMultipleValues does change given values array to given value and return values', () => {
        let valuesA = [1, 2];
        let resultA = CoreUtil.changeOrToggleMultipleValues([1], valuesA);
        expect(valuesA).toEqual([1]);
        expect(resultA).toEqual(valuesA);

        let valuesB = [1, 2];
        let resultB = CoreUtil.changeOrToggleMultipleValues([3], valuesB);
        expect(valuesB).toEqual([3]);
        expect(resultB).toEqual(valuesB);

        let valuesC = [1, 2];
        let resultC = CoreUtil.changeOrToggleMultipleValues([2, 3], valuesC);
        expect(valuesC).toEqual([2, 3]);
        expect(resultC).toEqual(valuesC);
    });

    it('changeOrToggleMultipleValues does toggle given value in given values array and return values', () => {
        let valuesA = [1, 2];
        let resultA = CoreUtil.changeOrToggleMultipleValues([1], valuesA, true);
        expect(valuesA).toEqual([2]);
        expect(resultA).toEqual(valuesA);

        let valuesB = [1, 2];
        let resultB = CoreUtil.changeOrToggleMultipleValues([3], valuesB, true);
        expect(valuesB).toEqual([1, 2, 3]);
        expect(resultB).toEqual(valuesB);

        let valuesC = [1, 2];
        let resultC = CoreUtil.changeOrToggleMultipleValues([2, 3], valuesC, true);
        expect(valuesC).toEqual([1, 3]);
        expect(resultC).toEqual(valuesC);
    });

    it('changeOrToggleValues does change given values array to given value and return values', () => {
        let valuesA = [1, 2];
        let resultA = CoreUtil.changeOrToggleValues(1, valuesA);
        expect(valuesA).toEqual([1]);
        expect(resultA).toEqual(valuesA);

        let valuesB = [1, 2];
        let resultB = CoreUtil.changeOrToggleValues(3, valuesB);
        expect(valuesB).toEqual([3]);
        expect(resultB).toEqual(valuesB);
    });

    it('changeOrToggleValues does toggle given value in given values array and return values', () => {
        let valuesA = [1, 2];
        let resultA = CoreUtil.changeOrToggleValues(1, valuesA, true);
        expect(valuesA).toEqual([2]);
        expect(resultA).toEqual(valuesA);

        let valuesB = [1, 2];
        let resultB = CoreUtil.changeOrToggleValues(3, valuesB, true);
        expect(valuesB).toEqual([1, 2, 3]);
        expect(resultB).toEqual(valuesB);
    });

    it('checkStringForUrl returns an array of occurrences of urls in the string', () => {
        let testString = 'Hello World, https://www.google.com Goodbye world https://www.yahoo.com';
        expect(CoreUtil.checkStringForUrl(testString)).toEqual(['https://www.google.com', 'https://www.yahoo.com']);
    });

    it('hasUrl works with multiple links', () => {
        let multUrlString = 'Use https://www.google.com to search as well as http://www.bing.com They both work well.';

        let testOut = CoreUtil.hasUrl(multUrlString);
        expect(testOut.url).toEqual(['https://www.google.com', 'http://www.bing.com']);
        expect(testOut.splitText).toEqual(['Use ', ' to search as well as ', ' They both work well.']);
        expect(testOut.test).toEqual(true);
    });

    it('hasUrl checks if url is in string and sets url variable, and adds http if needed', () => {
        let testString = 'Hello World, www.google.com Goodbye world';

        let testOut = CoreUtil.hasUrl(testString);

        expect(testOut.url).toEqual(['http://www.google.com']);
    });

    it('hasUrl correctly recognizes different link prefixes or postfixes', () => {
        let ftpString = 'Hello World, ftp://www.files.org Goodbye world.';
        let queryString = 'Hello World, http://www.files.org/there?next=free Goodbye world.';
        let fragIdString = 'Hello World, http://www.files.org/there.html#bar Goodbye world.';
        let fileString = 'Hello World, file://document.pdf Goodbye world.';

        let testOut = CoreUtil.hasUrl(ftpString);
        expect(testOut.url).toEqual(['ftp://www.files.org']);
        expect(testOut.splitText).toEqual(['Hello World, ', ' Goodbye world.']);

        testOut = CoreUtil.hasUrl(queryString);
        expect(testOut.url).toEqual(['http://www.files.org/there?next=free']);
        expect(testOut.splitText).toEqual(['Hello World, ', ' Goodbye world.']);

        testOut = CoreUtil.hasUrl(fragIdString);
        expect(testOut.url).toEqual(['http://www.files.org/there.html#bar']);
        expect(testOut.splitText).toEqual(['Hello World, ', ' Goodbye world.']);

        testOut = CoreUtil.hasUrl(fileString);
        expect(testOut.url).toEqual(['file://document.pdf']);
        expect(testOut.splitText).toEqual(['Hello World, ', ' Goodbye world.']);
    });

    it('isItemFilteredInEveryField does return expected boolean', () => {
        let fields = [
            FieldConfig.get({ columnName: 'field1' }),
            FieldConfig.get({ columnName: 'field2' })
        ];
        expect(CoreUtil.isItemFilteredInEveryField({}, fields, new Map<string, any[]>())).toEqual(true);

        let itemA = {
            field1: 1,
            field2: 2
        };
        let itemB = {
            field1: 3,
            field2: 4
        };
        let itemC = {
            field1: 1
        };
        expect(CoreUtil.isItemFilteredInEveryField(itemA, fields, new Map<string, any[]>())).toEqual(false);

        let fieldsToValuesA = new Map<string, any[]>();
        fieldsToValuesA.set('field1', [1]);
        fieldsToValuesA.set('field2', [2]);

        expect(CoreUtil.isItemFilteredInEveryField(itemA, fields, fieldsToValuesA)).toEqual(true);
        expect(CoreUtil.isItemFilteredInEveryField(itemB, fields, fieldsToValuesA)).toEqual(false);
        expect(CoreUtil.isItemFilteredInEveryField(itemC, fields, fieldsToValuesA)).toEqual(false);

        let fieldsToValuesB = new Map<string, any[]>();
        fieldsToValuesB.set('field1', [3]);
        fieldsToValuesB.set('field2', [4]);

        expect(CoreUtil.isItemFilteredInEveryField(itemA, fields, fieldsToValuesB)).toEqual(false);
        expect(CoreUtil.isItemFilteredInEveryField(itemB, fields, fieldsToValuesB)).toEqual(true);
        expect(CoreUtil.isItemFilteredInEveryField(itemC, fields, fieldsToValuesB)).toEqual(false);

        let fieldsToValuesC = new Map<string, any[]>();
        fieldsToValuesC.set('field1', [1]);

        expect(CoreUtil.isItemFilteredInEveryField(itemA, fields, fieldsToValuesC)).toEqual(false);
        expect(CoreUtil.isItemFilteredInEveryField(itemB, fields, fieldsToValuesC)).toEqual(false);
        expect(CoreUtil.isItemFilteredInEveryField(itemC, fields, fieldsToValuesC)).toEqual(true);

        let fieldsToValuesD = new Map<string, any[]>();
        fieldsToValuesD.set('field1', [1, 3]);
        fieldsToValuesD.set('field2', [2, 4]);

        expect(CoreUtil.isItemFilteredInEveryField(itemA, fields, fieldsToValuesD)).toEqual(true);
        expect(CoreUtil.isItemFilteredInEveryField(itemB, fields, fieldsToValuesD)).toEqual(true);
        expect(CoreUtil.isItemFilteredInEveryField(itemC, fields, fieldsToValuesD)).toEqual(false);
    });

    it('isItemFilteredInEveryField does return false if fields are empty', () => {
        let itemA = {
            field1: 1,
            field2: 2
        };
        let fieldsToValuesA = new Map<string, any[]>();
        fieldsToValuesA.set('field1', [1]);
        fieldsToValuesA.set('field2', [2]);
        expect(CoreUtil.isItemFilteredInEveryField(itemA, [], fieldsToValuesA)).toEqual(false);
    });

    it('isNumber does return expected boolean', () => {
        expect(CoreUtil.isNumber(true)).toEqual(false);
        expect(CoreUtil.isNumber('a')).toEqual(false);
        expect(CoreUtil.isNumber([1, 2])).toEqual(false);
        expect(CoreUtil.isNumber({
            value: 1
        })).toEqual(false);

        expect(CoreUtil.isNumber(1)).toEqual(true);
        expect(CoreUtil.isNumber(12.34)).toEqual(true);
        expect(CoreUtil.isNumber(-12.34)).toEqual(true);
        expect(CoreUtil.isNumber('1')).toEqual(true);
        expect(CoreUtil.isNumber('12.34')).toEqual(true);
        expect(CoreUtil.isNumber('-12.34')).toEqual(true);
    });

    it('prettifyInteger does return expected string', () => {
        expect(CoreUtil.prettifyInteger(0)).toEqual('0');
        expect(CoreUtil.prettifyInteger(1)).toEqual('1');
        expect(CoreUtil.prettifyInteger(12)).toEqual('12');
        expect(CoreUtil.prettifyInteger(123)).toEqual('123');
        expect(CoreUtil.prettifyInteger(1234)).toEqual('1,234');
        expect(CoreUtil.prettifyInteger(1234567890)).toEqual('1,234,567,890');
    });

    it('retrieveValuesFromListFilters does return expected array', () => {
        expect(CoreUtil.retrieveValuesFromListFilters([])).toEqual([]);
    });

    it('updateElementAttributes does set attributes on element', () => {
        const element = document.createElement('div');
        element.setAttribute('a', '0');
        CoreUtil.updateElementAttributes(element, ['a', 'b'], {
            a: 1,
            b: 2
        });
        expect(element.getAttribute('a')).toEqual('1');
        expect(element.getAttribute('b')).toEqual('2');
    });

    it('updateElementAttributes does remove attributes from element', () => {
        const element = document.createElement('div');
        element.setAttribute('a', '1');
        element.setAttribute('b', '2');
        CoreUtil.updateElementAttributes(element, ['a', 'b'], {
            a: undefined
        });
        expect(element.getAttribute('a')).toEqual(null);
        expect(element.getAttribute('b')).toEqual(null);
    });

    it('updateValuesFromListFilters does return expected Map', () => {
        let fields = [FieldConfig.get({ columnName: 'field1' })];
        let filters = new FilterCollection();
        spyOn(filters, 'getCompatibleFilters').and.callFake((__design) => []);

        spyOn(CoreUtil, 'retrieveValuesFromListFilters').and.callFake((__filters) => [1, 2]);

        let fieldsToValuesA = new Map<string, any[]>();
        let resultA = CoreUtil.updateValuesFromListFilters(fields, filters, fieldsToValuesA, () => null);
        expect(fieldsToValuesA.get('field1')).toEqual([1, 2]);
        expect(resultA).toEqual(fieldsToValuesA);

        let fieldsToValuesB = new Map<string, any[]>();
        fieldsToValuesB.set('field1', [3, 4]);
        let resultB = CoreUtil.updateValuesFromListFilters(fields, filters, fieldsToValuesB, () => null);
        expect(fieldsToValuesB.get('field1')).toEqual([1, 2]);
        expect(resultB).toEqual(fieldsToValuesB);
    });
});
