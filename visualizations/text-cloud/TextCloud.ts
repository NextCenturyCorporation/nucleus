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

//  Reimplemented from: jquery.tagcloud.js at https://github.com/addywaddy/jquery.tagcloud.js by Adam Groves Copyright 2008

export class TextCloud {
    private size: SizeOptions;
    private color: ColorOptions;

    constructor(size?: SizeOptions, color?: ColorOptions) {
        this.size = size || new SizeOptions();
        if (color) {
            this.color = color;
        }
    }

    createTextCloud(data: any[]): any[] {
        let lowest = 0;
        let highest = 0;
        if (data.length > 0) {
            lowest = data[0].value;
            highest = data[0].value;
        }
        for (let item of data) {
            let value = item.value;
            if (value > highest) {
                highest = value;
            }
            if (value < lowest) {
                lowest = value;
            }
        }
        let range = highest - lowest;

        if (range === 0) {
            range = 1;
        }

        // Sizes
        let fontIncr = (this.size.end - this.size.start) / range;

        // Colors
        let colorIncr;
        if (this.color) {
            colorIncr = this.colorIncrement(this.color, range);
        }

        return data.map((item) => {
            let weighting = (item.value === highest ? range : item.value - lowest);
            item.fontSize = this.size.start + (weighting * fontIncr) + this.size.unit;

            if (this.color) {
                item.color = this.tagColor(this.color, colorIncr, weighting);
            }
            return item;
        });
    }

    private colorIncrement(color: ColorOptions, range: number): number[] {
        return this.toRGB(color.end).map((element, index) => (element - this.toRGB(color.start)[index]) / range);
    }

    // Converts hex to an RGB array
    private toRGB(code: string): number[] {
        let hex = (/(\w{2})(\w{2})(\w{2})/).exec((code.length === 4 ? code.replace(/(\w)(\w)(\w)/gi, '$1$1$2$2$3$3') : code));
        return [parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16)];
    }

    private tagColor(color: ColorOptions, increment: number[], weighting: number) {
        let rgb = this.toRGB(color.start).map((element, index) => {
            let ref = Math.round(element + (increment[index] * weighting));
            if (ref > 255) {
                ref = 255;
            } else if (ref < 0) {
                ref = 0;
            }
            return ref;
        });
        return this.toHex(rgb);
    }

    // Converts an RGB array to hex
    private toHex(ary: number[]): string {
        return '#' + ary.map((element) => {
            let hex = element.toString(16);
            hex = (hex.length === 1) ? '0' + hex : hex;
            return hex;
        }).join('');
    }
}

export class SizeOptions {
    start: number;
    end: number;
    unit: string;

    constructor(start?: number, end?: number, unit?: string) {
        this.start = start || 14;
        this.end = end || 18;
        this.unit = unit || 'pt';
    }
}

export class ColorOptions {
    start: string;
    end: string;

    constructor(start: string, end: string) {
        this.start = start;
        this.end = end;
    }
}
