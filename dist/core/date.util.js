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
var moment = require("moment");
var DateFormat;
(function (DateFormat) {
    DateFormat["DAY"] = "MMM D, YYYY";
    DateFormat["ISO"] = "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]";
    DateFormat["MINUTE"] = "MMM D, YYYY, h:mm A";
    DateFormat["MONTH"] = "MMM YYYY";
    DateFormat["PRETTY"] = "ddd, MMM D, YYYY, h:mm A";
    DateFormat["SHORT"] = "YYYY-MM-DD";
    DateFormat["YEAR"] = "YYYY";
})(DateFormat = exports.DateFormat || (exports.DateFormat = {}));
var DateUtil = /** @class */ (function () {
    function DateUtil() {
    }
    /**
     * Add one of the given interval (minute/hour/day/month/year) to the given date object, subtract one second, and
     * return the new date.
     */
    DateUtil.addOneOfIntervalToDate = function (input, interval) {
        var momentObject = moment.utc(input);
        momentObject.add(1, interval);
        momentObject.subtract(1, 'second');
        return momentObject.toDate();
    };
    /**
     * Returns the date string for the given date object (or a date string formatted using the standard date format)
     * formatted using the given output date format (or the standard date format if no date format is given).
     */
    DateUtil.fromDateToString = function (input, outputFormat) {
        if (outputFormat === void 0) { outputFormat = DateUtil.STANDARD_FORMAT; }
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().format(outputFormat);
        }
        return moment.utc(input, DateUtil.STANDARD_FORMAT).format(outputFormat);
    };
    /**
     * Returns the date object for the given formatted date string.
     */
    DateUtil.fromStringToDate = function (input) {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().toDate();
        }
        return moment.utc(input, DateUtil.STANDARD_FORMAT).toDate();
    };
    /**
     * Returns the day of month (integer) for the given formatted date string.
     */
    DateUtil.fromStringToDay = function (input) {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().date();
        }
        return moment.utc(input, DateUtil.STANDARD_FORMAT).date();
    };
    /**
     * Returns the hours (integer) for the given formatted date string.
     */
    DateUtil.fromStringToHour = function (input) {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().hour();
        }
        return moment.utc(input, DateUtil.STANDARD_FORMAT).hour();
    };
    /**
     * Returns the minutes (integer) for the given formatted date string.
     */
    DateUtil.fromStringToMinute = function (input) {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().minute();
        }
        return moment.utc(input, DateUtil.STANDARD_FORMAT).minute();
    };
    /**
     * Returns the zero-indexed month (integer) for the given formatted date string.
     */
    DateUtil.fromStringToMonth = function (input) {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().month();
        }
        return moment.utc(input, DateUtil.STANDARD_FORMAT).month();
    };
    /**
     * Returns the seconds (integer) for the given formatted date string.
     */
    DateUtil.fromStringToSecond = function (input) {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().second();
        }
        return moment.utc(input, DateUtil.STANDARD_FORMAT).second();
    };
    /**
     * Returns the unix timestamp in milliseconds for the given formatted date string.
     */
    DateUtil.fromStringToTimestamp = function (input) {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().valueOf();
        }
        return moment.utc(input, DateUtil.STANDARD_FORMAT).valueOf();
    };
    /**
     * Returns the year (integer) for the given formatted date string.
     */
    DateUtil.fromStringToYear = function (input) {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().year();
        }
        return moment.utc(input, DateUtil.STANDARD_FORMAT).year();
    };
    /**
     * Returns the date string for the given date object as "X seconds/minutes/hours/days ago".
     */
    DateUtil.retrievePastTime = function (input, outputFormat) {
        if (this.USE_LOCAL_TIME) {
            if (moment.parseZone(input).local().diff(Date.now(), 'd', true) < -3) {
                return DateUtil.fromDateToString(input, outputFormat);
            }
            return moment.parseZone(input).local().fromNow();
        }
        if (moment.utc(input, DateUtil.STANDARD_FORMAT).diff(Date.now(), 'd', true) < -3) {
            return DateUtil.fromDateToString(input, outputFormat);
        }
        return moment.utc(input, DateUtil.STANDARD_FORMAT).fromNow();
    };
    /**
     * Returns if the given date string is a valid date.
     */
    DateUtil.verifyDateStringStrict = function (input) {
        if (this.USE_LOCAL_TIME) {
            return moment.parseZone(input).local().isValid();
        }
        return moment.utc(input, DateUtil.STANDARD_FORMAT, true).isValid();
    };
    DateUtil.STANDARD_FORMAT = DateFormat.ISO;
    DateUtil.USE_LOCAL_TIME = false;
    return DateUtil;
}());
exports.DateUtil = DateUtil;
//# sourceMappingURL=date.util.js.map