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
export declare class TextCloud {
    private size;
    private color;
    constructor(size?: SizeOptions, color?: ColorOptions);
    createTextCloud(data: any[]): any[];
    private colorIncrement;
    private toRGB;
    private tagColor;
    private toHex;
}
export declare class SizeOptions {
    start: number;
    end: number;
    unit: string;
    constructor(start?: number, end?: number, unit?: string);
}
export declare class ColorOptions {
    start: string;
    end: string;
    constructor(start: string, end: string);
}
