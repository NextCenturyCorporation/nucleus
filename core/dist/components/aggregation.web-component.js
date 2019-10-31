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
var NextCenturyAggregation = /** @class */ (function (_super) {
    __extends(NextCenturyAggregation, _super);
    function NextCenturyAggregation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NextCenturyAggregation, "observedAttributes", {
        get: function () {
            return [
                'aggregation-field-key',
                'aggregation-group',
                'aggregation-name',
                'aggregation-type'
            ];
        },
        enumerable: true,
        configurable: true
    });
    NextCenturyAggregation.createElement = function (attributes) {
        var aggregationElement = document.createElement(NextCenturyAggregation.ELEMENT_NAME);
        NextCenturyAggregation.observedAttributes.forEach(function (attribute) {
            if (typeof attributes[attribute] !== 'undefined') {
                aggregationElement.setAttribute(attribute, attributes[attribute]);
            }
        });
        return aggregationElement;
    };
    NextCenturyAggregation.ELEMENT_NAME = 'next-century-aggregation';
    return NextCenturyAggregation;
}(element_web_component_1.NextCenturyElement));
exports.NextCenturyAggregation = NextCenturyAggregation;
window.customElements.define(NextCenturyAggregation.ELEMENT_NAME, NextCenturyAggregation);
//# sourceMappingURL=aggregation.web-component.js.map