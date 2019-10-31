"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var date_util_1 = require("./date.util");
describe('Date Util Tests', function () {
    // Should return Sun, Jan 2, 2000, 03:04:05
    var createTestDate = function () { return new Date(Date.UTC(2000, 0, 2, 3, 4, 5)); };
    it('addOneOfIntervalToDate returns expected date', function () {
        expect(date_util_1.DateUtil.addOneOfIntervalToDate(createTestDate(), 'minute')).toEqual(new Date(Date.UTC(2000, 0, 2, 3, 5, 4)));
        expect(date_util_1.DateUtil.addOneOfIntervalToDate(createTestDate(), 'hour')).toEqual(new Date(Date.UTC(2000, 0, 2, 4, 4, 4)));
        expect(date_util_1.DateUtil.addOneOfIntervalToDate(createTestDate(), 'day')).toEqual(new Date(Date.UTC(2000, 0, 3, 3, 4, 4)));
        expect(date_util_1.DateUtil.addOneOfIntervalToDate(createTestDate(), 'month')).toEqual(new Date(Date.UTC(2000, 1, 2, 3, 4, 4)));
        expect(date_util_1.DateUtil.addOneOfIntervalToDate(createTestDate(), 'year')).toEqual(new Date(Date.UTC(2001, 0, 2, 3, 4, 4)));
    });
    it('addOneOfIntervalToDate does not modify date arguments', function () {
        var testDate = createTestDate();
        date_util_1.DateUtil.addOneOfIntervalToDate(testDate, 'minute');
        expect(testDate).toEqual(createTestDate());
    });
    it('fromDateToString returns expected string', function () {
        expect(date_util_1.DateUtil.fromDateToString(createTestDate())).toEqual('2000-01-02T03:04:05.000Z');
    });
    it('fromDateToString with string returns expected string', function () {
        expect(date_util_1.DateUtil.fromDateToString('2000-01-02T03:04:05')).toEqual('2000-01-02T03:04:05.000Z');
    });
    it('fromDateToString with output date format returns expected string', function () {
        expect(date_util_1.DateUtil.fromDateToString(createTestDate(), date_util_1.DateFormat.DAY)).toEqual('Jan 2, 2000');
        expect(date_util_1.DateUtil.fromDateToString(createTestDate(), date_util_1.DateFormat.MINUTE)).toEqual('Jan 2, 2000, 3:04 AM');
        expect(date_util_1.DateUtil.fromDateToString(createTestDate(), date_util_1.DateFormat.MONTH)).toEqual('Jan 2000');
        expect(date_util_1.DateUtil.fromDateToString(createTestDate(), date_util_1.DateFormat.PRETTY)).toEqual('Sun, Jan 2, 2000, 3:04 AM');
        expect(date_util_1.DateUtil.fromDateToString(createTestDate(), date_util_1.DateFormat.SHORT)).toEqual('2000-01-02');
        expect(date_util_1.DateUtil.fromDateToString(createTestDate(), date_util_1.DateFormat.YEAR)).toEqual('2000');
    });
    it('fromDateToString with string and output date format returns expected string', function () {
        expect(date_util_1.DateUtil.fromDateToString('2000-01-02T03:04:05', date_util_1.DateFormat.DAY)).toEqual('Jan 2, 2000');
        expect(date_util_1.DateUtil.fromDateToString('2000-01-02T03:04:05', date_util_1.DateFormat.MINUTE)).toEqual('Jan 2, 2000, 3:04 AM');
        expect(date_util_1.DateUtil.fromDateToString('2000-01-02T03:04:05', date_util_1.DateFormat.MONTH)).toEqual('Jan 2000');
        expect(date_util_1.DateUtil.fromDateToString('2000-01-02T03:04:05', date_util_1.DateFormat.PRETTY)).toEqual('Sun, Jan 2, 2000, 3:04 AM');
        expect(date_util_1.DateUtil.fromDateToString('2000-01-02T03:04:05', date_util_1.DateFormat.SHORT)).toEqual('2000-01-02');
        expect(date_util_1.DateUtil.fromDateToString('2000-01-02T03:04:05', date_util_1.DateFormat.YEAR)).toEqual('2000');
    });
    it('fromStringToDate returns expected string', function () {
        expect(date_util_1.DateUtil.fromStringToDate('2000-01-02T03:04:05')).toEqual(createTestDate());
    });
    it('fromStringToDay returns expected number', function () {
        expect(date_util_1.DateUtil.fromStringToDay('2000-01-02T03:04:05')).toEqual(2);
    });
    it('fromStringToHour returns expected number', function () {
        expect(date_util_1.DateUtil.fromStringToHour('2000-01-02T03:04:05')).toEqual(3);
    });
    it('fromStringToMinute returns expected number', function () {
        expect(date_util_1.DateUtil.fromStringToMinute('2000-01-02T03:04:05')).toEqual(4);
    });
    it('fromStringToMonth returns expected number', function () {
        expect(date_util_1.DateUtil.fromStringToMonth('2000-01-02T03:04:05')).toEqual(0);
    });
    it('fromStringToSecond returns expected number', function () {
        expect(date_util_1.DateUtil.fromStringToSecond('2000-01-02T03:04:05')).toEqual(5);
    });
    it('fromStringToTimestamp returns expected number', function () {
        expect(date_util_1.DateUtil.fromStringToTimestamp('2000-01-02T03:04:05')).toEqual(946782245000);
    });
    it('fromStringToYear returns expected number', function () {
        expect(date_util_1.DateUtil.fromStringToYear('2000-01-02T03:04:05')).toEqual(2000);
    });
    it('retrievePastTime returns expected string', function () {
        expect(date_util_1.DateUtil.retrievePastTime(createTestDate())).toEqual('2000-01-02T03:04:05.000Z');
    });
    it('verifyDateStringStrict returns expected boolean', function () {
        expect(date_util_1.DateUtil.verifyDateStringStrict('2000-01-02T03:04:05.678Z')).toEqual(true);
        expect(date_util_1.DateUtil.verifyDateStringStrict('2000-01-02T03:04:05')).toEqual(false);
        expect(date_util_1.DateUtil.verifyDateStringStrict('2000-01-02')).toEqual(false);
        expect(date_util_1.DateUtil.verifyDateStringStrict('string')).toEqual(false);
    });
});
//# sourceMappingURL=date.util.spec.js.map