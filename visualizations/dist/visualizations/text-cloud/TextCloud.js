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
//  Reimplemented from: jquery.tagcloud.js at https://github.com/addywaddy/jquery.tagcloud.js by Adam Groves Copyright 2008
var TextCloud = /** @class */ (function () {
    function TextCloud(size, color) {
        this.size = size || new SizeOptions();
        if (color) {
            this.color = color;
        }
    }
    TextCloud.prototype.createTextCloud = function (data) {
        var _this = this;
        var lowest = 0;
        var highest = 0;
        if (data.length > 0) {
            lowest = data[0].value;
            highest = data[0].value;
        }
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var value = item.value;
            if (value > highest) {
                highest = value;
            }
            if (value < lowest) {
                lowest = value;
            }
        }
        var range = highest - lowest;
        if (range === 0) {
            range = 1;
        }
        // Sizes
        var fontIncr = (this.size.end - this.size.start) / range;
        // Colors
        var colorIncr;
        if (this.color) {
            colorIncr = this.colorIncrement(this.color, range);
        }
        return data.map(function (item) {
            var weighting = (item.value === highest ? range : item.value - lowest);
            item.fontSize = _this.size.start + (weighting * fontIncr) + _this.size.unit;
            if (_this.color) {
                item.color = _this.tagColor(_this.color, colorIncr, weighting);
            }
            return item;
        });
    };
    TextCloud.prototype.colorIncrement = function (color, range) {
        var _this = this;
        return this.toRGB(color.end).map(function (element, index) { return (element - _this.toRGB(color.start)[index]) / range; });
    };
    // Converts hex to an RGB array
    TextCloud.prototype.toRGB = function (code) {
        var hex = (/(\w{2})(\w{2})(\w{2})/).exec((code.length === 4 ? code.replace(/(\w)(\w)(\w)/gi, '$1$1$2$2$3$3') : code));
        return [parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16)];
    };
    TextCloud.prototype.tagColor = function (color, increment, weighting) {
        var rgb = this.toRGB(color.start).map(function (element, index) {
            var ref = Math.round(element + (increment[index] * weighting));
            if (ref > 255) {
                ref = 255;
            }
            else if (ref < 0) {
                ref = 0;
            }
            return ref;
        });
        return this.toHex(rgb);
    };
    // Converts an RGB array to hex
    TextCloud.prototype.toHex = function (ary) {
        return '#' + ary.map(function (element) {
            var hex = element.toString(16);
            hex = (hex.length === 1) ? '0' + hex : hex;
            return hex;
        }).join('');
    };
    return TextCloud;
}());
exports.TextCloud = TextCloud;
var SizeOptions = /** @class */ (function () {
    function SizeOptions(start, end, unit) {
        this.start = start || 14;
        this.end = end || 18;
        this.unit = unit || 'pt';
    }
    return SizeOptions;
}());
exports.SizeOptions = SizeOptions;
var ColorOptions = /** @class */ (function () {
    function ColorOptions(start, end) {
        this.start = start;
        this.end = end;
    }
    return ColorOptions;
}());
exports.ColorOptions = ColorOptions;
//# sourceMappingURL=TextCloud.js.map