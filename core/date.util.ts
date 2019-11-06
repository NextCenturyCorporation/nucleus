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

import * as moment from 'moment';

export enum DateFormat {
    DAY = 'MMM D, YYYY',
    ISO = 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]',
    MINUTE = 'MMM D, YYYY, h:mm A',
    MONTH = 'MMM YYYY',
    PRETTY = 'ddd, MMM D, YYYY, h:mm A',
    SHORT = 'YYYY-MM-DD',
    YEAR = 'YYYY'
}

export class DateUtil {
    static STANDARD_FORMAT: DateFormat = DateFormat.ISO;
    static USE_LOCAL_TIME: boolean = false;

    /**
     * Add one of the given interval (minute/hour/day/month/year) to the given date object, subtract one second, and
     * return the new date.
     */
    static addOneOfIntervalToDate(input: Date, interval: string): Date {
        let momentObject = moment.utc(input);
        momentObject.add(1, interval as moment.unitOfTime.DurationConstructor);
        momentObject.subtract(1, 'second');
        return momentObject.toDate();
    }

    /**
     * Returns the date string for the given date object (or a date string formatted using the standard date format)
     * formatted using the given output date format (or the standard date format if no date format is given).
     */
    static fromDateToString(input: Date|string, outputFormat: DateFormat = DateUtil.STANDARD_FORMAT): string {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().format(outputFormat as string);
        }

        return moment.utc(input, DateUtil.STANDARD_FORMAT as string).format(outputFormat as string);
    }

    /**
     * Returns the date object for the given formatted date string.
     */
    static fromStringToDate(input: string): Date {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().toDate();
        }

        return moment.utc(input, DateUtil.STANDARD_FORMAT as string).toDate();
    }

    /**
     * Returns the day of month (integer) for the given formatted date string.
     */
    static fromStringToDay(input: string): number {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().date();
        }

        return moment.utc(input, DateUtil.STANDARD_FORMAT as string).date();
    }

    /**
     * Returns the hours (integer) for the given formatted date string.
     */
    static fromStringToHour(input: string): number {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().hour();
        }

        return moment.utc(input, DateUtil.STANDARD_FORMAT as string).hour();
    }

    /**
     * Returns the minutes (integer) for the given formatted date string.
     */
    static fromStringToMinute(input: string): number {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().minute();
        }

        return moment.utc(input, DateUtil.STANDARD_FORMAT as string).minute();
    }

    /**
     * Returns the zero-indexed month (integer) for the given formatted date string.
     */
    static fromStringToMonth(input: string): number {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().month();
        }

        return moment.utc(input, DateUtil.STANDARD_FORMAT as string).month();
    }

    /**
     * Returns the seconds (integer) for the given formatted date string.
     */
    static fromStringToSecond(input: string): number {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().second();
        }

        return moment.utc(input, DateUtil.STANDARD_FORMAT as string).second();
    }

    /**
     * Returns the unix timestamp in milliseconds for the given formatted date string.
     */
    static fromStringToTimestamp(input: string): number {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().valueOf();
        }

        return moment.utc(input, DateUtil.STANDARD_FORMAT as string).valueOf();
    }

    /**
     * Returns the year (integer) for the given formatted date string.
     */
    static fromStringToYear(input: string): number {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().year();
        }

        return moment.utc(input, DateUtil.STANDARD_FORMAT as string).year();
    }

    /**
     * Returns the date string for the given date object as "X seconds/minutes/hours/days ago".
     */
    static retrievePastTime(input: Date|string, outputFormat?: DateFormat): string {
        if (this.USE_LOCAL_TIME) {
            if (moment.parseZone(input).local().diff(Date.now(), 'd', true) < -3) {
                return DateUtil.fromDateToString(input, outputFormat);
            }
            return moment.parseZone(input).local().fromNow();
        }

        if (moment.utc(input, DateUtil.STANDARD_FORMAT as string).diff(Date.now(), 'd', true) < -3) {
            return DateUtil.fromDateToString(input, outputFormat);
        }
        return moment.utc(input, DateUtil.STANDARD_FORMAT as string).fromNow();
    }

    /**
     * Returns if the given date string is a valid date.
     */
    static verifyDateStringStrict(input: string): boolean {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().isValid();
        }

        return moment.utc(input, DateUtil.STANDARD_FORMAT as string, true).isValid();
    }
}

