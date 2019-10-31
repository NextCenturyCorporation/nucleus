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

import { Color } from './color';

describe('Color', () => {
    it('fromHexString does create Color from hex string', () => {
        expect(Color.fromHexString('#000000')).toEqual(new Color('#000000', 'rgba(0,0,0,0.66)', 'rgba(0,0,0,0.33)'));
        expect(Color.fromHexString('#ffffff')).toEqual(new Color('#ffffff', 'rgba(255,255,255,0.66)', 'rgba(255,255,255,0.33)'));
        expect(Color.fromHexString('#00ff00')).toEqual(new Color('#00ff00', 'rgba(0,255,0,0.66)', 'rgba(0,255,0,0.33)'));
        expect(Color.fromHexString('#0f0')).toEqual(new Color('#0f0', 'rgba(0,255,0,0.66)', 'rgba(0,255,0,0.33)'));

        expect(Color.fromHexString(null)).toEqual(null);
        expect(Color.fromHexString('')).toEqual(null);

        expect(Color.fromHexString('ffffff')).toEqual(new Color('#ffffff', 'rgba(255,255,255,0.66)', 'rgba(255,255,255,0.33)'));
        expect(Color.fromHexString('fff')).toEqual(new Color('#fff', 'rgba(255,255,255,0.66)', 'rgba(255,255,255,0.33)'));
    });

    it('fromRgb does create Color from RGB', () => {
        expect(Color.fromRgb(0, 0, 0)).toEqual(new Color('rgb(0,0,0)', 'rgba(0,0,0,0.66)', 'rgba(0,0,0,0.33)'));
        expect(Color.fromRgb(255, 255, 255)).toEqual(new Color('rgb(255,255,255)', 'rgba(255,255,255,0.66)', 'rgba(255,255,255,0.33)'));
        expect(Color.fromRgb(1, 2, 3)).toEqual(new Color('rgb(1,2,3)', 'rgba(1,2,3,0.66)', 'rgba(1,2,3,0.33)'));

        expect(Color.fromRgb(1, 2, null)).toEqual(null);
        expect(Color.fromRgb(1, null, 3)).toEqual(null);
        expect(Color.fromRgb(null, 2, 3)).toEqual(null);
    });

    it('fromRgbArray does create Color from RGB array', () => {
        expect(Color.fromRgbArray([0, 0, 0])).toEqual(new Color('rgb(0,0,0)', 'rgba(0,0,0,0.66)', 'rgba(0,0,0,0.33)'));
        expect(Color.fromRgbArray([255, 255, 255])).toEqual(new Color('rgb(255,255,255)', 'rgba(255,255,255,0.66)',
            'rgba(255,255,255,0.33)'));
        expect(Color.fromRgbArray([1, 2, 3])).toEqual(new Color('rgb(1,2,3)', 'rgba(1,2,3,0.66)', 'rgba(1,2,3,0.33)'));

        expect(Color.fromRgbArray(null)).toEqual(null);
        expect(Color.fromRgbArray([])).toEqual(null);
        expect(Color.fromRgbArray([1])).toEqual(null);
        expect(Color.fromRgbArray([1, 2])).toEqual(null);
        expect(Color.fromRgbArray([1, 2, 3, 4])).toEqual(null);
    });

    it('fromRgbString does create Color from RGB string', () => {
        expect(Color.fromRgbString('0,0,0')).toEqual(new Color('rgb(0,0,0)', 'rgba(0,0,0,0.66)', 'rgba(0,0,0,0.33)'));
        expect(Color.fromRgbString('255,255,255')).toEqual(new Color('rgb(255,255,255)', 'rgba(255,255,255,0.66)',
            'rgba(255,255,255,0.33)'));
        expect(Color.fromRgbString('1,2,3')).toEqual(new Color('rgb(1,2,3)', 'rgba(1,2,3,0.66)', 'rgba(1,2,3,0.33)'));

        expect(Color.fromRgbString(null)).toEqual(null);
        expect(Color.fromRgbString('')).toEqual(null);
        expect(Color.fromRgbString('1')).toEqual(null);
        expect(Color.fromRgbString('1,2')).toEqual(null);
        expect(Color.fromRgbString('1,2,3,4')).toEqual(null);
    });
});

