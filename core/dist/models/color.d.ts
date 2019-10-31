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
export declare type ColorMap = Record<string, Record<string, Record<string, Record<string, string>>>>;
export declare class Color {
    private css;
    private hoverColor;
    private transparencyHigh;
    /**
     * Creates and returns a Color object using the given Hex string like "#123" or "#112233" or "112233".
     * @arg {string} inputHex
     * @return {Color}
     */
    static fromHexString(inputHex: string): Color;
    /**
     * Creates and returns a Color object using the given RGB numbers.
     * @arg {number} red
     * @arg {number} green
     * @arg {number} blue
     * @return {Color}
     */
    static fromRgb(red: number, green: number, blue: number): Color;
    /**
     * Creates and returns a Color object using the given RGB array like [12, 34, 56].
     * @arg {number[]} inputRGB
     * @return {Color}
     */
    static fromRgbArray(inputRGB: number[]): Color;
    /**
     * Creates and returns a Color object using the given RGB string like "12,34,56".
     * @arg {string} inputRGB
     * @return {Color}
     */
    static fromRgbString(inputRGB: string): Color;
    /**
     * Creates and returns a Color object using the given hex or RGB string.
     */
    static fromString(input: string): Color;
    /**
     * @constructor
     * @arg {string} css
     * @arg {string} hoverColor
     * @arg {string} transparencyHigh
     */
    constructor(css: string, hoverColor: string, transparencyHigh: string);
    /**
     * Returns the computed CSS for the color using the given HTMLElement object to find custom CSS properties like "--variable".
     * @arg {HTMLElement} element
     * @return {string}
     */
    getComputedCss(element: HTMLElement): string;
    /**
     * Returns the CSS for the hover color using the given HTMLElement object to find custom CSS properties like "--variable".
     * @arg {HTMLElement} element
     * @return {string}
     */
    getComputedCssHoverColor(element: HTMLElement): string;
    /**
     * Returns the CSS for the high transparency color using the given HTMLElement object to find custom CSS properties like "--variable".
     * @arg {HTMLElement} element
     * @return {string}
     */
    getComputedCssTransparencyHigh(element: HTMLElement): string;
    /**
     * Returns the CSS for the color.
     * @return {string}
     */
    getCss(): string;
    /**
     * Returns the CSS for the hover color.
     * @return {string}
     */
    getHoverColor(): string;
    /**
     * Returns the CSS for the color with high transparency.
     * @return {string}
     */
    getCssTransparencyHigh(): string;
    /**
     * Returns the color for the given CSS using the given HTMLElement object to find custom CSS properties like "--variable".
     * @arg {string} colorCss
     * @arg {HTMLElement} element
     * @return {string}
     */
    private computeColor;
}
export declare class ColorSet {
    protected colorKey: string;
    protected databaseName: string;
    protected tableName: string;
    protected fieldName: string;
    protected valueToColor: Map<string, Color>;
    protected colors: Color[];
    protected currentIndex: number;
    /**
     * @constructor
     * @arg {string} colorKey
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {string} fieldName
     * @arg {Map<string, Color>} [valueToColor=new Map<string, Color>()]
     */
    constructor(colorKey: string, databaseName: string, tableName: string, fieldName: string, valueToColor?: Map<string, Color>);
    /**
     * Returns the list of keys in this color set.
     *
     * @return {string[]}
     */
    getAllKeys(): string[];
    /**
     * Returns the color field.
     *
     * @return {string}
     */
    getColorField(): string;
    /**
     * Returns the color for the given value.
     *
     * @arg {string} value
     * @return {Color}
     */
    getColorForValue(value: string): Color;
    /**
     * Returns the map of colors.
     *
     * @return {Map<string, Color>}
     */
    getColorMap(): Map<string, Color>;
    protected getColorArray(): Color[];
}
