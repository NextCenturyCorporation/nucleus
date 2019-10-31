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

export type ColorMap = Record<string, Record<string, Record<string, Record<string, string>>>>;

export class Color {
    /**
     * Creates and returns a Color object using the given Hex string like "#123" or "#112233" or "112233".
     * @arg {string} inputHex
     * @return {Color}
     */
    static fromHexString(inputHex: string): Color {
        if (!inputHex) {
            return null;
        }
        // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        let hex = inputHex.replace(shorthandRegex, (__m, red, green, blue) => red + red + green + green + blue + blue);
        let hexArray = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(hex);
        if (hexArray) {
            let rgb = parseInt(hexArray[1], 16) + ',' + parseInt(hexArray[2], 16) + ',' + parseInt(hexArray[3], 16);
            return new Color((inputHex.indexOf('#') === 0 ? inputHex : ('#' + inputHex)), 'rgba(' + rgb + ',0.66)',
                'rgba(' + rgb + ',0.33)');
        }
        return null;
    }

    /**
     * Creates and returns a Color object using the given RGB numbers.
     * @arg {number} red
     * @arg {number} green
     * @arg {number} blue
     * @return {Color}
     */
    static fromRgb(red: number, green: number, blue: number): Color {
        if (red === null || green === null || blue === null) {
            return null;
        }
        let rgb = red + ',' + green + ',' + blue;
        return new Color('rgb(' + rgb + ')', 'rgba(' + rgb + ',0.66)', 'rgba(' + rgb + ',0.33)');
    }

    /**
     * Creates and returns a Color object using the given RGB array like [12, 34, 56].
     * @arg {number[]} inputRGB
     * @return {Color}
     */
    static fromRgbArray(inputRGB: number[]): Color {
        if (inputRGB === null || inputRGB.length !== 3) {
            return null;
        }
        return Color.fromRgb(inputRGB[0], inputRGB[1], inputRGB[2]);
    }

    /**
     * Creates and returns a Color object using the given RGB string like "12,34,56".
     * @arg {string} inputRGB
     * @return {Color}
     */
    static fromRgbString(inputRGB: string): Color {
        if (inputRGB === null || inputRGB.length < 5) {
            return null;
        }
        let arrayRGB = inputRGB.replace(/[^\d,]/g, '').split(',');
        return arrayRGB.length === 3 ? Color.fromRgb(Number(arrayRGB[0]), Number(arrayRGB[1]), Number(arrayRGB[2])) : null;
    }

    /**
     * Creates and returns a Color object using the given hex or RGB string.
     */
    static fromString(input: string): Color {
        return (input.indexOf('#') < 0) ? Color.fromRgbString(input) : Color.fromHexString(input);
    }

    /**
     * @constructor
     * @arg {string} css
     * @arg {string} hoverColor
     * @arg {string} transparencyHigh
     */
    constructor(private css: string, private hoverColor: string, private transparencyHigh: string) {}

    /**
     * Returns the computed CSS for the color using the given HTMLElement object to find custom CSS properties like "--variable".
     * @arg {HTMLElement} element
     * @return {string}
     */
    public getComputedCss(element: HTMLElement): string {
        return this.computeColor(this.css, element);
    }

    /**
     * Returns the CSS for the hover color using the given HTMLElement object to find custom CSS properties like "--variable".
     * @arg {HTMLElement} element
     * @return {string}
     */
    public getComputedCssHoverColor(element: HTMLElement): string {
        return this.computeColor(this.hoverColor, element);
    }

    /**
     * Returns the CSS for the high transparency color using the given HTMLElement object to find custom CSS properties like "--variable".
     * @arg {HTMLElement} element
     * @return {string}
     */
    public getComputedCssTransparencyHigh(element: HTMLElement): string {
        return this.computeColor(this.transparencyHigh, element);
    }

    /**
     * Returns the CSS for the color.
     * @return {string}
     */
    public getCss(): string {
        return this.css;
    }

    /**
     * Returns the CSS for the hover color.
     * @return {string}
     */
    public getHoverColor(): string {
        return this.hoverColor;
    }

    /**
     * Returns the CSS for the color with high transparency.
     * @return {string}
     */
    public getCssTransparencyHigh(): string {
        return this.transparencyHigh;
    }

    /**
     * Returns the color for the given CSS using the given HTMLElement object to find custom CSS properties like "--variable".
     * @arg {string} colorCss
     * @arg {HTMLElement} element
     * @return {string}
     */
    private computeColor(colorCss: string, element: HTMLElement): string {
        if (colorCss.indexOf('var(--') === 0) {
            let css = colorCss.substring(4, colorCss.length - 1);
            css = css.indexOf(',') >= 0 ? css.substring(0, css.indexOf(',')) : css;
            return getComputedStyle(element).getPropertyValue(css).trim();
        }
        if (colorCss.indexOf('--') === 0) {
            return getComputedStyle(element).getPropertyValue(colorCss).trim();
        }
        return colorCss;
    }
}

export class ColorSet {
    protected colors: Color[] = [
        Color.fromHexString('#0000FF'), // Blue
        Color.fromHexString('#00FF00'), // Lime
        Color.fromHexString('#FF0000'), // Red

        Color.fromHexString('#00FFFF'), // Cyan
        Color.fromHexString('#FFFF00'), // Yellow
        Color.fromHexString('#FF00FF'), // Magenta

        Color.fromHexString('#000080'), // Navy
        Color.fromHexString('#008000'), // Green
        Color.fromHexString('#800000'), // Maroon

        Color.fromHexString('#008080'), // Teal
        Color.fromHexString('#808000'), // Olive
        Color.fromHexString('#800080'), // Purple

        Color.fromHexString('#0080FF'), // Blue?
        Color.fromHexString('#80FF00'), // Green?
        Color.fromHexString('#FF0080'), // Purple?
        Color.fromHexString('#FF8000'), // Orange
        Color.fromHexString('#00FF80'), // Green?
        Color.fromHexString('#8000FF'), // Purple?

        Color.fromHexString('#8080FF'), // Blue?
        Color.fromHexString('#80FF80'), // Green?
        Color.fromHexString('#FF8080'), // Red?

        Color.fromHexString('#80FFFF'), // Blue?
        Color.fromHexString('#FFFF80'), // Yellow?
        Color.fromHexString('#FF80FF') // Purple?
    ];

    protected currentIndex: number = 0;

    /**
     * @constructor
     * @arg {string} colorKey
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {string} fieldName
     * @arg {Map<string, Color>} [valueToColor=new Map<string, Color>()]
     */
    constructor(
        protected colorKey: string,
        protected databaseName: string,
        protected tableName: string,
        protected fieldName: string,
        protected valueToColor: Map<string, Color> = new Map<string, Color>()
    ) { }

    /**
     * Returns the list of keys in this color set.
     *
     * @return {string[]}
     */
    public getAllKeys(): string[] {
        return Array.from(this.valueToColor.keys()).sort();
    }

    /**
     * Returns the color field.
     *
     * @return {string}
     */
    public getColorField(): string {
        return this.fieldName;
    }

    /**
     * Returns the color for the given value.
     *
     * @arg {string} value
     * @return {Color}
     */
    public getColorForValue(value: string): Color {
        let color = this.valueToColor.get(value);
        let colorArray: Color[] = this.getColorArray() || [];
        if (!color) {
            color = colorArray[this.currentIndex];
            this.valueToColor.set(value, color);
            this.currentIndex = (this.currentIndex + 1) % colorArray.length;
        }
        return color;
    }

    /**
     * Returns the map of colors.
     *
     * @return {Map<string, Color>}
     */
    public getColorMap(): Map<string, Color> {
        return this.valueToColor;
    }

    protected getColorArray(): Color[] {
        return this.colors;
    }
}
