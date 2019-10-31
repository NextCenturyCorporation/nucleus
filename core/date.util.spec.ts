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
import { DateFormat, DateUtil } from './date.util';

describe('Date Util Tests', () => {
    // Should return Sun, Jan 2, 2000, 03:04:05
    const createTestDate = () => new Date(Date.UTC(2000, 0, 2, 3, 4, 5));

    it('addOneOfIntervalToDate returns expected date', () => {
        expect(DateUtil.addOneOfIntervalToDate(createTestDate(), 'minute')).toEqual(new Date(Date.UTC(2000, 0, 2, 3, 5, 4)));
        expect(DateUtil.addOneOfIntervalToDate(createTestDate(), 'hour')).toEqual(new Date(Date.UTC(2000, 0, 2, 4, 4, 4)));
        expect(DateUtil.addOneOfIntervalToDate(createTestDate(), 'day')).toEqual(new Date(Date.UTC(2000, 0, 3, 3, 4, 4)));
        expect(DateUtil.addOneOfIntervalToDate(createTestDate(), 'month')).toEqual(new Date(Date.UTC(2000, 1, 2, 3, 4, 4)));
        expect(DateUtil.addOneOfIntervalToDate(createTestDate(), 'year')).toEqual(new Date(Date.UTC(2001, 0, 2, 3, 4, 4)));
    });

    it('addOneOfIntervalToDate does not modify date arguments', () => {
        const testDate = createTestDate();
        DateUtil.addOneOfIntervalToDate(testDate, 'minute');
        expect(testDate).toEqual(createTestDate());
    });

    it('fromDateToString returns expected string', () => {
        expect(DateUtil.fromDateToString(createTestDate())).toEqual('2000-01-02T03:04:05.000Z');
    });

    it('fromDateToString with string returns expected string', () => {
        expect(DateUtil.fromDateToString('2000-01-02T03:04:05')).toEqual('2000-01-02T03:04:05.000Z');
    });

    it('fromDateToString with output date format returns expected string', () => {
        expect(DateUtil.fromDateToString(createTestDate(), DateFormat.DAY)).toEqual('Jan 2, 2000');
        expect(DateUtil.fromDateToString(createTestDate(), DateFormat.MINUTE)).toEqual('Jan 2, 2000, 3:04 AM');
        expect(DateUtil.fromDateToString(createTestDate(), DateFormat.MONTH)).toEqual('Jan 2000');
        expect(DateUtil.fromDateToString(createTestDate(), DateFormat.PRETTY)).toEqual('Sun, Jan 2, 2000, 3:04 AM');
        expect(DateUtil.fromDateToString(createTestDate(), DateFormat.SHORT)).toEqual('2000-01-02');
        expect(DateUtil.fromDateToString(createTestDate(), DateFormat.YEAR)).toEqual('2000');
    });

    it('fromDateToString with string and output date format returns expected string', () => {
        expect(DateUtil.fromDateToString('2000-01-02T03:04:05', DateFormat.DAY)).toEqual('Jan 2, 2000');
        expect(DateUtil.fromDateToString('2000-01-02T03:04:05', DateFormat.MINUTE)).toEqual('Jan 2, 2000, 3:04 AM');
        expect(DateUtil.fromDateToString('2000-01-02T03:04:05', DateFormat.MONTH)).toEqual('Jan 2000');
        expect(DateUtil.fromDateToString('2000-01-02T03:04:05', DateFormat.PRETTY)).toEqual('Sun, Jan 2, 2000, 3:04 AM');
        expect(DateUtil.fromDateToString('2000-01-02T03:04:05', DateFormat.SHORT)).toEqual('2000-01-02');
        expect(DateUtil.fromDateToString('2000-01-02T03:04:05', DateFormat.YEAR)).toEqual('2000');
    });

    it('fromStringToDate returns expected string', () => {
        expect(DateUtil.fromStringToDate('2000-01-02T03:04:05')).toEqual(createTestDate());
    });

    it('fromStringToDay returns expected number', () => {
        expect(DateUtil.fromStringToDay('2000-01-02T03:04:05')).toEqual(2);
    });

    it('fromStringToHour returns expected number', () => {
        expect(DateUtil.fromStringToHour('2000-01-02T03:04:05')).toEqual(3);
    });

    it('fromStringToMinute returns expected number', () => {
        expect(DateUtil.fromStringToMinute('2000-01-02T03:04:05')).toEqual(4);
    });

    it('fromStringToMonth returns expected number', () => {
        expect(DateUtil.fromStringToMonth('2000-01-02T03:04:05')).toEqual(0);
    });

    it('fromStringToSecond returns expected number', () => {
        expect(DateUtil.fromStringToSecond('2000-01-02T03:04:05')).toEqual(5);
    });

    it('fromStringToTimestamp returns expected number', () => {
        expect(DateUtil.fromStringToTimestamp('2000-01-02T03:04:05')).toEqual(946782245000);
    });

    it('fromStringToYear returns expected number', () => {
        expect(DateUtil.fromStringToYear('2000-01-02T03:04:05')).toEqual(2000);
    });

    it('retrievePastTime returns expected string', () => {
        expect(DateUtil.retrievePastTime(createTestDate())).toEqual('2000-01-02T03:04:05.000Z');
    });

    it('verifyDateStringStrict returns expected boolean', () => {
        expect(DateUtil.verifyDateStringStrict('2000-01-02T03:04:05.678Z')).toEqual(true);
        expect(DateUtil.verifyDateStringStrict('2000-01-02T03:04:05')).toEqual(false);
        expect(DateUtil.verifyDateStringStrict('2000-01-02')).toEqual(false);
        expect(DateUtil.verifyDateStringStrict('string')).toEqual(false);
    });
});
