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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var element_web_component_1 = require("./element.web-component");
var NucleusAggregation = /** @class */ (function (_super) {
    __extends(NucleusAggregation, _super);
    function NucleusAggregation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NucleusAggregation, "observedAttributes", {
        get: function () {
            return [
                'aggregation-field-key',
                'aggregation-group',
                'aggregation-label',
                'aggregation-operation'
            ];
        },
        enumerable: true,
        configurable: true
    });
    NucleusAggregation.createElement = function (attributes) {
        var aggregationElement = document.createElement(NucleusAggregation.ELEMENT_NAME);
        NucleusAggregation.observedAttributes.forEach(function (attribute) {
            if (typeof attributes[attribute] !== 'undefined') {
                aggregationElement.setAttribute(attribute, attributes[attribute]);
            }
        });
        return aggregationElement;
    };
    NucleusAggregation.ELEMENT_NAME = 'nucleus-aggregation';
    return NucleusAggregation;
}(element_web_component_1.NucleusElement));
exports.NucleusAggregation = NucleusAggregation;
window.customElements.define(NucleusAggregation.ELEMENT_NAME, NucleusAggregation);
//# sourceMappingURL=aggregation.web-component.js.map