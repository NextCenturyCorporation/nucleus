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
var core_util_1 = require("../core/core.util");
var element_web_component_1 = require("../core/components/element.web-component");
var NucleusExample = /** @class */ (function (_super) {
    __extends(NucleusExample, _super);
    function NucleusExample() {
        var _this = _super.call(this) || this;
        _this._selected = [];
        var template = document.createElement('template');
        template.innerHTML = "\n            <style>\n                :host {\n                    display: block;\n                }\n\n                :host([hidden]) {\n                    display: none;\n                }\n\n                .block {\n                    border-bottom: 2px solid black;\n                    color: black;\n                    margin-bottom: 10px;\n                    padding-bottom: 10px;\n                }\n\n                .highlight {\n                    color: orange;\n                }\n\n                .row {\n                    padding-left: 10px;\n                }\n\n                .title {\n                    font-weight: bold;\n                }\n\n                .clickable:hover {\n                    color: blue;\n                    cursor: pointer;\n                }\n            </style>\n        ";
        _this._shadowRoot = _this.attachShadow({
            mode: 'open'
        });
        _this._shadowRoot.appendChild(template.content.cloneNode(true));
        _this._visElement = document.createElement('div');
        _this._shadowRoot.appendChild(_this._visElement);
        return _this;
    }
    Object.defineProperty(NucleusExample, "observedAttributes", {
        get: function () {
            return [
                'selection-field',
                'vis-title'
            ];
        },
        enumerable: true,
        configurable: true
    });
    NucleusExample.prototype.changeSelectedText = function (text) {
        // If text is "a", transform to ["a"]; if text is ["a", "b"], keep it; if text is [["a"], ["b", "c"]], transform to ["a", "b", "c"]
        var selected = !Array.isArray(text) ? [text] : text.reduce(function (list, part) { return list.concat(part); }, []);
        // Only redraw the visualization data if some of the selected text items have changed.
        if (this._selected.length !== selected.length || this._selected.some(function (value, index) { return value !== selected[index]; })) {
            this._selected = selected;
            // Do NOT dispatch a dataSelected event!
            this._redrawData();
        }
    };
    NucleusExample.prototype.drawData = function (data) {
        this._data = data;
        this._redrawData();
        this.dispatchEvent(new CustomEvent('draw', {
            bubbles: true,
            detail: {}
        }));
    };
    NucleusExample.prototype.select = function (item) {
        var index = this._selected.indexOf(item);
        if (index >= 0) {
            this._selected.splice(index, 1);
        }
        else {
            this._selected.push(item);
        }
        this._redrawData();
        this.dispatchEvent(new CustomEvent('dataSelected', {
            bubbles: true,
            detail: {
                values: this._selected
            }
        }));
    };
    NucleusExample.prototype._redrawData = function () {
        var _this = this;
        var newElement = document.createElement('div');
        this._shadowRoot.replaceChild(newElement, this._visElement);
        this._visElement = newElement;
        var selectedAsText = this._selected.length ? ('"' + this._selected.join('","') + '"') : 'None';
        var selectionField = this.getAttribute('selection-field');
        var visTitle = this.getAttribute('vis-title');
        var countElement = document.createElement('div');
        countElement.className = 'block title';
        countElement.innerHTML = (!visTitle ? '' : ('<div>' + visTitle + '</div>')) + '<div>Total: ' + this._data.length + '</div>' +
            '<div>Filters: ' + (!selectionField ? 'Disabled' : selectedAsText) + '</div>';
        this._visElement.appendChild(countElement);
        var containerElement = document.createElement('div');
        containerElement.className = 'container';
        this._data.forEach(function (item) {
            var selectionValue = selectionField ? core_util_1.CoreUtil.deepFind(item, selectionField) : null;
            var filtered = item.filtered || (selectionValue && _this._selected.indexOf(selectionValue) >= 0);
            var blockElement = document.createElement('div');
            blockElement.className = ['block'].concat(filtered ? 'highlight' : []).concat(selectionValue ? 'clickable' : []).join(' ');
            blockElement.onclick = !selectionValue ? undefined : function () {
                _this.select(selectionValue);
            };
            if (Object.keys(item.aggregations).length) {
                var aggregationTitleElement = document.createElement('div');
                aggregationTitleElement.className = 'title';
                aggregationTitleElement.innerHTML = 'Aggregations:';
                blockElement.appendChild(aggregationTitleElement);
                Object.keys(item.aggregations).forEach(function (aggregation) {
                    var rowElement = document.createElement('div');
                    rowElement.className = 'row';
                    rowElement.innerHTML = aggregation + ': ' + JSON.stringify(item.aggregations[aggregation]);
                    blockElement.appendChild(rowElement);
                });
            }
            var fieldTitleElement = document.createElement('div');
            fieldTitleElement.className = 'title';
            fieldTitleElement.innerHTML = 'Fields:';
            blockElement.appendChild(fieldTitleElement);
            Object.keys(item.fields).forEach(function (field) {
                var rowElement = document.createElement('div');
                rowElement.className = 'row';
                rowElement.innerHTML = field + ': ' + JSON.stringify(item.fields[field]);
                blockElement.appendChild(rowElement);
            });
            var selectionTitleElement = document.createElement('div');
            selectionTitleElement.className = 'title';
            selectionTitleElement.innerHTML = 'Filtered: ' + (filtered ? 'Yes' : 'No');
            blockElement.appendChild(selectionTitleElement);
            containerElement.appendChild(blockElement);
        });
        this._visElement.appendChild(containerElement);
    };
    return NucleusExample;
}(element_web_component_1.NucleusElement));
exports.NucleusExample = NucleusExample;
window.customElements.define('nucleus-example', NucleusExample);
//# sourceMappingURL=example.web-component.js.map