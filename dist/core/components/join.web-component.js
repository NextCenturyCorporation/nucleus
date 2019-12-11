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
var NucleusJoin = /** @class */ (function (_super) {
    __extends(NucleusJoin, _super);
    function NucleusJoin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NucleusJoin, "observedAttributes", {
        get: function () {
            return [
                'join-field-key-1',
                'join-field-key-2',
                'join-operator',
                'join-table-key',
                'join-type'
            ];
        },
        enumerable: true,
        configurable: true
    });
    NucleusJoin.createElement = function (attributes) {
        var joinElement = document.createElement(NucleusJoin.ELEMENT_NAME);
        NucleusJoin.observedAttributes.forEach(function (attribute) {
            if (typeof attributes[attribute] !== 'undefined') {
                joinElement.setAttribute(attribute, attributes[attribute]);
            }
        });
        return joinElement;
    };
    NucleusJoin.ELEMENT_NAME = 'nucleus-join';
    return NucleusJoin;
}(element_web_component_1.NucleusElement));
exports.NucleusJoin = NucleusJoin;
window.customElements.define(NucleusJoin.ELEMENT_NAME, NucleusJoin);
//# sourceMappingURL=join.web-component.js.map