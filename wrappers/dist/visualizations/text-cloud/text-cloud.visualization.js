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
var TextCloud_1 = require("./TextCloud");
var core_util_1 = require("../../core/core.util");
var element_web_component_1 = require("../../core/components/element.web-component");
var NextCenturyTextCloudVisualization = /** @class */ (function (_super) {
    __extends(NextCenturyTextCloudVisualization, _super);
    function NextCenturyTextCloudVisualization() {
        var _this = _super.call(this) || this;
        _this._data = [];
        _this._filtered = [];
        var template = document.createElement('template');
        template.innerHTML = "\n            <style>\n                :host .text-cloud {\n                    display: inline-block;\n                    height: 100%;\n                    width: 100%;\n                    overflow-wrap: break-word;\n                }\n\n                :host .text-cloud .text {\n                    cursor: pointer;\n                    display: inline-block;\n                    padding: 5px;\n                }\n\n                :host .text-cloud .text:hover {\n                    color: var(--color-data-item-selectable-dark, dimgrey) !important;\n                    text-decoration: none;\n                }\n\n                :host .text-cloud .filtered:not(:hover) {\n                    color: var(--color-data-item-selectable-dark, dimgrey) !important;\n                }\n\n                :host .text-cloud .paragraphs {\n                    display: block;\n                }\n\n                :host .text-cloud .value {\n                    margin-left: 10px;\n                }\n\n                :host .text-cloud .paragraphs .value {\n                    float: right;\n                }\n\n                :host([hidden]) {\n                    display: none;\n                }\n            </style>\n        ";
        _this._shadowRoot = _this.attachShadow({
            mode: 'open'
        });
        _this._shadowRoot.appendChild(template.content.cloneNode(true));
        _this._visElement = document.createElement('div');
        _this._shadowRoot.appendChild(_this._visElement);
        _this._createVisualizationAndRedrawData();
        return _this;
    }
    Object.defineProperty(NextCenturyTextCloudVisualization, "observedAttributes", {
        get: function () {
            return [
                'aggregation-field',
                'aggregation-label',
                'color-accent',
                'color-text',
                'enable-show-paragraphs',
                'enable-show-values',
                'text-field'
            ];
        },
        enumerable: true,
        configurable: true
    });
    NextCenturyTextCloudVisualization.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        _super.prototype.attributeChangedCallback.call(this, name, oldValue, newValue);
        if (name === 'color-accent' || name === 'color-text') {
            this._createVisualizationAndRedrawData();
        }
        else {
            this.redraw();
        }
    };
    /**
     * Changes the filtered text to the given text or array of text and redraws the visualization using the existing data.
     */
    NextCenturyTextCloudVisualization.prototype.changeFilteredText = function (text) {
        var _this = this;
        // If text is "a", transform to ["a"]; if text is ["a", "b"], keep it; if text is [["a"], ["b", "c"]], transform to ["a", "b", "c"]
        var filtered = !Array.isArray(text) ? [text] : text.reduce(function (list, part) { return list.concat(part); }, []);
        // Only redraw the visualization data if some of the filters have changed.
        if (this._filtered.length !== filtered.length || this._filtered.some(function (value, index) { return value !== filtered[index]; })) {
            this._filtered = filtered;
            this._data.forEach(function (item) {
                item.selected = _this._filtered.indexOf(item.key) >= 0;
            });
            // Do NOT dispatch a filter event!
            this.redraw();
        }
    };
    /**
     * Draws the visualization using the given data array and returns the unique data items.
     */
    NextCenturyTextCloudVisualization.prototype.drawData = function (data) {
        var _this = this;
        var aggregationField = this.getAttribute('aggregation-field');
        var textField = this.getAttribute('text-field');
        this._data = !textField ? [] : data.map(function (item) {
            var text = core_util_1.CoreUtil.deepFind(item, textField);
            return {
                key: text,
                selected: _this._filtered.indexOf(text) >= 0,
                value: aggregationField ? core_util_1.CoreUtil.deepFind(item, aggregationField) : 1
            };
        }).filter(function (item) { return !!item.key; });
        this.redraw();
        return this._data.length;
    };
    /**
     * Redraws the text cloud.
     */
    NextCenturyTextCloudVisualization.prototype.redraw = function () {
        var _this = this;
        var aggregationLabel = this.getAttribute('aggregation-label');
        var showParagraphs = !!this.hasAttribute('enable-show-paragraphs');
        var showValues = !!this.hasAttribute('enable-show-values');
        var newElement = document.createElement('div');
        newElement.className = 'text-cloud';
        this._shadowRoot.replaceChild(newElement, this._visElement);
        this._visElement = newElement;
        var textCloudData = this._textCloudObject.createTextCloud(this._data);
        textCloudData.forEach(function (item) {
            var elementClasses = ['text'].concat(item.selected ? 'filtered' : []).concat(showParagraphs ? 'paragraphs' : []);
            var itemElement = document.createElement('div');
            itemElement.className = elementClasses.join(' ');
            itemElement.onclick = function () {
                _this.toggleFilter(item.key);
            };
            itemElement.style.color = item.color;
            itemElement.style['font-size'] = item.fontSize;
            itemElement.title = (aggregationLabel ? (aggregationLabel + ': ') : '') + item.value;
            var keyElement = document.createElement('span');
            keyElement.className = 'key';
            keyElement.innerHTML = item.key;
            itemElement.appendChild(keyElement);
            if (showValues) {
                var valueElement = document.createElement('span');
                valueElement.className = 'value';
                valueElement.innerHTML = '(' + item.value + ')';
                itemElement.appendChild(valueElement);
            }
            _this._visElement.appendChild(itemElement);
        });
    };
    /**
     * Toggles the filtered status of the given text cloud data item.
     */
    NextCenturyTextCloudVisualization.prototype.toggleFilter = function (text) {
        var _this = this;
        var index = this._filtered.indexOf(text);
        if (index >= 0) {
            this._filtered.splice(index, 1);
        }
        else {
            this._filtered.push(text);
        }
        this._data.forEach(function (item) {
            item.selected = _this._filtered.indexOf(item.key) >= 0;
        });
        this.redraw();
        this.dispatchEvent(new CustomEvent('filter', {
            detail: {
                values: this._filtered
            }
        }));
    };
    NextCenturyTextCloudVisualization.prototype._createVisualizationAndRedrawData = function () {
        var accentColorHex = this.getAttribute('color-accent') || '#0000FF';
        var textColorHex = this.getAttribute('color-text') || '#111111';
        this._textCloudObject = new TextCloud_1.TextCloud(new TextCloud_1.SizeOptions(80, 140, '%'), new TextCloud_1.ColorOptions(textColorHex, accentColorHex));
        this.redraw();
    };
    return NextCenturyTextCloudVisualization;
}(element_web_component_1.NextCenturyElement));
exports.NextCenturyTextCloudVisualization = NextCenturyTextCloudVisualization;
window.customElements.define('next-century-visualization-text-cloud', NextCenturyTextCloudVisualization);
//# sourceMappingURL=text-cloud.visualization.js.map