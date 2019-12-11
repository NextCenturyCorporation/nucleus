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
var element_web_component_1 = require("../core/components/element.web-component");
// TODO Change your visualization element's class name.
var NucleusStub = /** @class */ (function (_super) {
    __extends(NucleusStub, _super);
    function NucleusStub() {
        var _this = _super.call(this) || this;
        _this._data = [];
        _this._filteredValues = [];
        var template = document.createElement('template');
        template.innerHTML = "\n            <style>\n                :host {\n                    display: block;\n                }\n\n                :host([hidden]) {\n                    display: none;\n                }\n\n                // TODO Add your visualization element's styles here.\n            </style>\n        ";
        _this._shadowRoot = _this.attachShadow({
            mode: 'open'
        });
        _this._shadowRoot.appendChild(template.content.cloneNode(true));
        _this._visElement = document.createElement('div');
        _this._shadowRoot.appendChild(_this._visElement);
        return _this;
    }
    Object.defineProperty(NucleusStub, "observedAttributes", {
        get: function () {
            return [
            // TODO Add your visualization element's attributes here.
            ];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Changes the filtered data in this visualization to the values in the given filter data.  Invoked by a Filter Component.
     */
    NucleusStub.prototype.changeFilteredData = function (filterData) {
        // Documentation on filterData:  https://github.com/NextCenturyCorporation/nucleus#filter-data-array
        // TODO If the values in filterData and this._filteredValues are different, set this._filteredValues to the new values.
        // TODO If this._filteredValues was changed, call this._redrawDataElements().
        // Do NOT dispatch a dataFiltered event here!
    };
    /**
     * Draws the given search data as HTML elements in this visualization.  Invoked by a Search Component.
     */
    NucleusStub.prototype.drawData = function (searchData) {
        // Documentation on searchData:  https://github.com/NextCenturyCorporation/nucleus#search-data-object
        // TODO Set this._data to the searchData array, transformed as needed by this visualization.
        this._redrawDataElements();
    };
    /**
     * Creates or changes the filtered values based on the given item from the visualization's data array.  Invoked by user interaction.
     */
    NucleusStub.prototype.filterDataItem = function (item) {
        // TODO Update this._filteredValues based on the given item from this._data
        this._redrawDataElements();
        // Dispatch an event to update the filter components corresponding to this visualization.
        this.dispatchEvent(new CustomEvent('dataFiltered', {
            bubbles: true,
            detail: {
                values: this._filteredValues
            }
        }));
    };
    /**
     * Redraws all the HTML elements in this visualization based on the visualization's data array.
     */
    NucleusStub.prototype._redrawDataElements = function () {
        // Replace the visualization's old container element.
        var newElement = document.createElement('div');
        this._shadowRoot.replaceChild(newElement, this._visElement);
        this._visElement = newElement;
        // TODO Use this._data to create new HTML elements (document.createElement) and update this._visElement (appendChild).
    };
    return NucleusStub;
}(element_web_component_1.NucleusElement));
exports.NucleusStub = NucleusStub;
// TODO Change your visualization element's tag and class name.
window.customElements.define('nucleus-stub', NucleusStub);
//# sourceMappingURL=stub.visualization.js.map