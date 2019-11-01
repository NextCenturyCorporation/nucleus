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
var Color = /** @class */ (function () {
    /**
     * @constructor
     * @arg {string} css
     * @arg {string} hoverColor
     * @arg {string} transparencyHigh
     */
    function Color(css, hoverColor, transparencyHigh) {
        this.css = css;
        this.hoverColor = hoverColor;
        this.transparencyHigh = transparencyHigh;
    }
    /**
     * Creates and returns a Color object using the given Hex string like "#123" or "#112233" or "112233".
     * @arg {string} inputHex
     * @return {Color}
     */
    Color.fromHexString = function (inputHex) {
        if (!inputHex) {
            return null;
        }
        // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        var hex = inputHex.replace(shorthandRegex, function (__m, red, green, blue) { return red + red + green + green + blue + blue; });
        var hexArray = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(hex);
        if (hexArray) {
            var rgb = parseInt(hexArray[1], 16) + ',' + parseInt(hexArray[2], 16) + ',' + parseInt(hexArray[3], 16);
            return new Color((inputHex.indexOf('#') === 0 ? inputHex : ('#' + inputHex)), 'rgba(' + rgb + ',0.66)', 'rgba(' + rgb + ',0.33)');
        }
        return null;
    };
    /**
     * Creates and returns a Color object using the given RGB numbers.
     * @arg {number} red
     * @arg {number} green
     * @arg {number} blue
     * @return {Color}
     */
    Color.fromRgb = function (red, green, blue) {
        if (red === null || green === null || blue === null) {
            return null;
        }
        var rgb = red + ',' + green + ',' + blue;
        return new Color('rgb(' + rgb + ')', 'rgba(' + rgb + ',0.66)', 'rgba(' + rgb + ',0.33)');
    };
    /**
     * Creates and returns a Color object using the given RGB array like [12, 34, 56].
     * @arg {number[]} inputRGB
     * @return {Color}
     */
    Color.fromRgbArray = function (inputRGB) {
        if (inputRGB === null || inputRGB.length !== 3) {
            return null;
        }
        return Color.fromRgb(inputRGB[0], inputRGB[1], inputRGB[2]);
    };
    /**
     * Creates and returns a Color object using the given RGB string like "12,34,56".
     * @arg {string} inputRGB
     * @return {Color}
     */
    Color.fromRgbString = function (inputRGB) {
        if (inputRGB === null || inputRGB.length < 5) {
            return null;
        }
        var arrayRGB = inputRGB.replace(/[^\d,]/g, '').split(',');
        return arrayRGB.length === 3 ? Color.fromRgb(Number(arrayRGB[0]), Number(arrayRGB[1]), Number(arrayRGB[2])) : null;
    };
    /**
     * Creates and returns a Color object using the given hex or RGB string.
     */
    Color.fromString = function (input) {
        return (input.indexOf('#') < 0) ? Color.fromRgbString(input) : Color.fromHexString(input);
    };
    /**
     * Returns the computed CSS for the color using the given HTMLElement object to find custom CSS properties like "--variable".
     * @arg {HTMLElement} element
     * @return {string}
     */
    Color.prototype.getComputedCss = function (element) {
        return this.computeColor(this.css, element);
    };
    /**
     * Returns the CSS for the hover color using the given HTMLElement object to find custom CSS properties like "--variable".
     * @arg {HTMLElement} element
     * @return {string}
     */
    Color.prototype.getComputedCssHoverColor = function (element) {
        return this.computeColor(this.hoverColor, element);
    };
    /**
     * Returns the CSS for the high transparency color using the given HTMLElement object to find custom CSS properties like "--variable".
     * @arg {HTMLElement} element
     * @return {string}
     */
    Color.prototype.getComputedCssTransparencyHigh = function (element) {
        return this.computeColor(this.transparencyHigh, element);
    };
    /**
     * Returns the CSS for the color.
     * @return {string}
     */
    Color.prototype.getCss = function () {
        return this.css;
    };
    /**
     * Returns the CSS for the hover color.
     * @return {string}
     */
    Color.prototype.getHoverColor = function () {
        return this.hoverColor;
    };
    /**
     * Returns the CSS for the color with high transparency.
     * @return {string}
     */
    Color.prototype.getCssTransparencyHigh = function () {
        return this.transparencyHigh;
    };
    /**
     * Returns the color for the given CSS using the given HTMLElement object to find custom CSS properties like "--variable".
     * @arg {string} colorCss
     * @arg {HTMLElement} element
     * @return {string}
     */
    Color.prototype.computeColor = function (colorCss, element) {
        if (colorCss.indexOf('var(--') === 0) {
            var css = colorCss.substring(4, colorCss.length - 1);
            css = css.indexOf(',') >= 0 ? css.substring(0, css.indexOf(',')) : css;
            return getComputedStyle(element).getPropertyValue(css).trim();
        }
        if (colorCss.indexOf('--') === 0) {
            return getComputedStyle(element).getPropertyValue(colorCss).trim();
        }
        return colorCss;
    };
    return Color;
}());
exports.Color = Color;
var ColorSet = /** @class */ (function () {
    /**
     * @constructor
     * @arg {string} colorKey
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {string} fieldName
     * @arg {Map<string, Color>} [valueToColor=new Map<string, Color>()]
     */
    function ColorSet(colorKey, databaseName, tableName, fieldName, valueToColor) {
        if (valueToColor === void 0) { valueToColor = new Map(); }
        this.colorKey = colorKey;
        this.databaseName = databaseName;
        this.tableName = tableName;
        this.fieldName = fieldName;
        this.valueToColor = valueToColor;
        this.colors = [
            Color.fromHexString('#0000FF'),
            Color.fromHexString('#00FF00'),
            Color.fromHexString('#FF0000'),
            Color.fromHexString('#00FFFF'),
            Color.fromHexString('#FFFF00'),
            Color.fromHexString('#FF00FF'),
            Color.fromHexString('#000080'),
            Color.fromHexString('#008000'),
            Color.fromHexString('#800000'),
            Color.fromHexString('#008080'),
            Color.fromHexString('#808000'),
            Color.fromHexString('#800080'),
            Color.fromHexString('#0080FF'),
            Color.fromHexString('#80FF00'),
            Color.fromHexString('#FF0080'),
            Color.fromHexString('#FF8000'),
            Color.fromHexString('#00FF80'),
            Color.fromHexString('#8000FF'),
            Color.fromHexString('#8080FF'),
            Color.fromHexString('#80FF80'),
            Color.fromHexString('#FF8080'),
            Color.fromHexString('#80FFFF'),
            Color.fromHexString('#FFFF80'),
            Color.fromHexString('#FF80FF') // Purple?
        ];
        this.currentIndex = 0;
    }
    /**
     * Returns the list of keys in this color set.
     *
     * @return {string[]}
     */
    ColorSet.prototype.getAllKeys = function () {
        return Array.from(this.valueToColor.keys()).sort();
    };
    /**
     * Returns the color field.
     *
     * @return {string}
     */
    ColorSet.prototype.getColorField = function () {
        return this.fieldName;
    };
    /**
     * Returns the color for the given value.
     *
     * @arg {string} value
     * @return {Color}
     */
    ColorSet.prototype.getColorForValue = function (value) {
        var color = this.valueToColor.get(value);
        var colorArray = this.getColorArray() || [];
        if (!color) {
            color = colorArray[this.currentIndex];
            this.valueToColor.set(value, color);
            this.currentIndex = (this.currentIndex + 1) % colorArray.length;
        }
        return color;
    };
    /**
     * Returns the map of colors.
     *
     * @return {Map<string, Color>}
     */
    ColorSet.prototype.getColorMap = function () {
        return this.valueToColor;
    };
    ColorSet.prototype.getColorArray = function () {
        return this.colors;
    };
    return ColorSet;
}());
exports.ColorSet = ColorSet;
//# sourceMappingURL=color.js.map