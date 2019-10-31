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
var color_1 = require("./color");
describe('Color', function () {
    it('fromHexString does create Color from hex string', function () {
        expect(color_1.Color.fromHexString('#000000')).toEqual(new color_1.Color('#000000', 'rgba(0,0,0,0.66)', 'rgba(0,0,0,0.33)'));
        expect(color_1.Color.fromHexString('#ffffff')).toEqual(new color_1.Color('#ffffff', 'rgba(255,255,255,0.66)', 'rgba(255,255,255,0.33)'));
        expect(color_1.Color.fromHexString('#00ff00')).toEqual(new color_1.Color('#00ff00', 'rgba(0,255,0,0.66)', 'rgba(0,255,0,0.33)'));
        expect(color_1.Color.fromHexString('#0f0')).toEqual(new color_1.Color('#0f0', 'rgba(0,255,0,0.66)', 'rgba(0,255,0,0.33)'));
        expect(color_1.Color.fromHexString(null)).toEqual(null);
        expect(color_1.Color.fromHexString('')).toEqual(null);
        expect(color_1.Color.fromHexString('ffffff')).toEqual(new color_1.Color('#ffffff', 'rgba(255,255,255,0.66)', 'rgba(255,255,255,0.33)'));
        expect(color_1.Color.fromHexString('fff')).toEqual(new color_1.Color('#fff', 'rgba(255,255,255,0.66)', 'rgba(255,255,255,0.33)'));
    });
    it('fromRgb does create Color from RGB', function () {
        expect(color_1.Color.fromRgb(0, 0, 0)).toEqual(new color_1.Color('rgb(0,0,0)', 'rgba(0,0,0,0.66)', 'rgba(0,0,0,0.33)'));
        expect(color_1.Color.fromRgb(255, 255, 255)).toEqual(new color_1.Color('rgb(255,255,255)', 'rgba(255,255,255,0.66)', 'rgba(255,255,255,0.33)'));
        expect(color_1.Color.fromRgb(1, 2, 3)).toEqual(new color_1.Color('rgb(1,2,3)', 'rgba(1,2,3,0.66)', 'rgba(1,2,3,0.33)'));
        expect(color_1.Color.fromRgb(1, 2, null)).toEqual(null);
        expect(color_1.Color.fromRgb(1, null, 3)).toEqual(null);
        expect(color_1.Color.fromRgb(null, 2, 3)).toEqual(null);
    });
    it('fromRgbArray does create Color from RGB array', function () {
        expect(color_1.Color.fromRgbArray([0, 0, 0])).toEqual(new color_1.Color('rgb(0,0,0)', 'rgba(0,0,0,0.66)', 'rgba(0,0,0,0.33)'));
        expect(color_1.Color.fromRgbArray([255, 255, 255])).toEqual(new color_1.Color('rgb(255,255,255)', 'rgba(255,255,255,0.66)', 'rgba(255,255,255,0.33)'));
        expect(color_1.Color.fromRgbArray([1, 2, 3])).toEqual(new color_1.Color('rgb(1,2,3)', 'rgba(1,2,3,0.66)', 'rgba(1,2,3,0.33)'));
        expect(color_1.Color.fromRgbArray(null)).toEqual(null);
        expect(color_1.Color.fromRgbArray([])).toEqual(null);
        expect(color_1.Color.fromRgbArray([1])).toEqual(null);
        expect(color_1.Color.fromRgbArray([1, 2])).toEqual(null);
        expect(color_1.Color.fromRgbArray([1, 2, 3, 4])).toEqual(null);
    });
    it('fromRgbString does create Color from RGB string', function () {
        expect(color_1.Color.fromRgbString('0,0,0')).toEqual(new color_1.Color('rgb(0,0,0)', 'rgba(0,0,0,0.66)', 'rgba(0,0,0,0.33)'));
        expect(color_1.Color.fromRgbString('255,255,255')).toEqual(new color_1.Color('rgb(255,255,255)', 'rgba(255,255,255,0.66)', 'rgba(255,255,255,0.33)'));
        expect(color_1.Color.fromRgbString('1,2,3')).toEqual(new color_1.Color('rgb(1,2,3)', 'rgba(1,2,3,0.66)', 'rgba(1,2,3,0.33)'));
        expect(color_1.Color.fromRgbString(null)).toEqual(null);
        expect(color_1.Color.fromRgbString('')).toEqual(null);
        expect(color_1.Color.fromRgbString('1')).toEqual(null);
        expect(color_1.Color.fromRgbString('1,2')).toEqual(null);
        expect(color_1.Color.fromRgbString('1,2,3,4')).toEqual(null);
    });
});
//# sourceMappingURL=color.spec.js.map