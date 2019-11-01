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
var NextCenturyElement = /** @class */ (function (_super) {
    __extends(NextCenturyElement, _super);
    function NextCenturyElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NextCenturyElement.prototype.attributeChangedCallback = function (__name, __oldValue, __newValue) {
        // Do nothing.
    };
    NextCenturyElement.prototype.connectedCallback = function () {
        for (var _i = 0, _a = this.constructor.observedAttributes; _i < _a.length; _i++) {
            var key = _a[_i];
            this._upgradeProperty(key);
        }
    };
    NextCenturyElement.prototype.disconnectedCallback = function () {
        // Do nothing.
    };
    /**
     * See https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
     */
    NextCenturyElement.prototype._upgradeProperty = function (key) {
        if (this.hasOwnProperty(key)) {
            var value = this[key];
            delete this[key];
            this[key] = value;
        }
    };
    return NextCenturyElement;
}(HTMLElement));
exports.NextCenturyElement = NextCenturyElement;
//# sourceMappingURL=element.web-component.js.map