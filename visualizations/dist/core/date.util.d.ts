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
export declare enum DateFormat {
    DAY = "MMM D, YYYY",
    ISO = "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]",
    MINUTE = "MMM D, YYYY, h:mm A",
    MONTH = "MMM YYYY",
    PRETTY = "ddd, MMM D, YYYY, h:mm A",
    SHORT = "YYYY-MM-DD",
    YEAR = "YYYY"
}
export declare class DateUtil {
    static STANDARD_FORMAT: DateFormat;
    /**
     * Add one of the given interval (minute/hour/day/month/year) to the given date object, subtract one second, and
     * return the new date.
     */
    static addOneOfIntervalToDate(input: Date, interval: string): Date;
    /**
     * Returns the date string for the given date object (or a date string formatted using the standard date format)
     * formatted using the given output date format (or the standard date format if no date format is given).
     */
    static fromDateToString(input: Date | string, outputFormat?: DateFormat): string;
    /**
     * Returns the date object for the given formatted date string.
     */
    static fromStringToDate(input: string): Date;
    /**
     * Returns the day of month (integer) for the given formatted date string.
     */
    static fromStringToDay(input: string): number;
    /**
     * Returns the hours (integer) for the given formatted date string.
     */
    static fromStringToHour(input: string): number;
    /**
     * Returns the minutes (integer) for the given formatted date string.
     */
    static fromStringToMinute(input: string): number;
    /**
     * Returns the zero-indexed month (integer) for the given formatted date string.
     */
    static fromStringToMonth(input: string): number;
    /**
     * Returns the seconds (integer) for the given formatted date string.
     */
    static fromStringToSecond(input: string): number;
    /**
     * Returns the unix timestamp in milliseconds for the given formatted date string.
     */
    static fromStringToTimestamp(input: string): number;
    /**
     * Returns the year (integer) for the given formatted date string.
     */
    static fromStringToYear(input: string): number;
    /**
     * Returns the date string for the given date object as "X seconds/minutes/hours/days ago".
     */
    static retrievePastTime(input: Date | string, outputFormat?: DateFormat): string;
    /**
     * Returns if the given date string is a valid date.
     */
    static verifyDateStringStrict(input: string): boolean;
}
