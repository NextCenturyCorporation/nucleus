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
var core_util_1 = require("../../core/core.util");
var dataset_1 = require("../../core/models/dataset");
var aggregation_web_component_1 = require("../../core/components/aggregation.web-component");
var element_web_component_1 = require("../../core/components/element.web-component");
var filter_web_component_1 = require("../../core/components/filter.web-component");
var group_web_component_1 = require("../../core/components/group.web-component");
var search_web_component_1 = require("../../core/components/search.web-component");
var text_cloud_visualization_1 = require("../../visualizations/text-cloud/text-cloud.visualization");
var NextCenturyTextCloud = /** @class */ (function (_super) {
    __extends(NextCenturyTextCloud, _super);
    function NextCenturyTextCloud() {
        var _this = _super.call(this) || this;
        var template = document.createElement('template');
        template.innerHTML = "\n            <style>\n                :host {\n                    display: block;\n                }\n\n                :host([hidden]) {\n                    display: none;\n                }\n            </style>\n        ";
        _this._shadowRoot = _this.attachShadow({
            mode: 'open'
        });
        _this._shadowRoot.appendChild(template.content.cloneNode(true));
        _this._containerElement = document.createElement('div');
        _this._shadowRoot.appendChild(_this._containerElement);
        return _this;
    }
    Object.defineProperty(NextCenturyTextCloud, "observedAttributes", {
        get: function () {
            return ['text-field-key'].concat(search_web_component_1.NextCenturySearch.requiredAttributes).concat(search_web_component_1.NextCenturySearch.optionalAttributes)
                .concat(filter_web_component_1.NextCenturyFilter.requiredAttributes).concat(filter_web_component_1.NextCenturyFilter.optionalAttributes)
                .concat(aggregation_web_component_1.NextCenturyAggregation.observedAttributes).concat(group_web_component_1.NextCenturyGroup.observedAttributes)
                .concat(text_cloud_visualization_1.NextCenturyTextCloudVisualization.observedAttributes);
        },
        enumerable: true,
        configurable: true
    });
    NextCenturyTextCloud.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        _super.prototype.attributeChangedCallback.call(this, name, oldValue, newValue);
        this._createVisualization();
    };
    /**
     * Creates and returns the export data for the text cloud.
     */
    NextCenturyTextCloud.prototype.createExportData = function (exportFields, filename) {
        var searchElement = this._containerElement.querySelector('next-century-search');
        return searchElement.createExportData(exportFields, filename);
    };
    /**
     * Initializes the text cloud and search/filter components.
     */
    NextCenturyTextCloud.prototype.init = function (dataset, filterService, searchService) {
        this._dataset = dataset;
        this._filterService = filterService;
        this._searchService = searchService;
        this._createVisualization();
    };
    /**
     * Redraws the text cloud.
     */
    NextCenturyTextCloud.prototype.redraw = function () {
        var visElement = this._containerElement.querySelector('next-century-visualization-text-cloud');
        visElement.redraw();
    };
    NextCenturyTextCloud.prototype._createAggregationLabel = function (attributes) {
        if (attributes['aggregation-label']) {
            return attributes['aggregation-label'];
        }
        var aggregationType = attributes['aggregation-type'];
        if (aggregationType && aggregationType !== 'count') {
            var fieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(attributes['aggregation-field-key']);
            if (fieldKey && fieldKey.field) {
                var datasetFieldKey = this._dataset.retrieveDatasetFieldKey(fieldKey);
                return aggregationType.substring(0, 1).toUpperCase() + aggregationType.substring(1) +
                    (datasetFieldKey.field ? (' of ' + datasetFieldKey.field.prettyName) : '');
            }
        }
        return undefined;
    };
    NextCenturyTextCloud.prototype._createVisualization = function () {
        var attributes = core_util_1.CoreUtil.transformElementAttributes(this.attributes);
        var textFieldKey = dataset_1.DatasetUtil.deconstructTableOrFieldKey(attributes['text-field-key']);
        if (!attributes['id'] || !textFieldKey || !textFieldKey.field || !this._dataset || !this._filterService || !this._searchService) {
            return;
        }
        var newElement = document.createElement('div');
        this._shadowRoot.replaceChild(newElement, this._containerElement);
        this._containerElement = newElement;
        var filterElementId = attributes['id'] + '_filter';
        var searchElementId = attributes['id'] + '_search';
        var visElementId = attributes['id'] + '_visualization';
        // Override attributes
        attributes['aggregation-field'] = 'aggregations._aggregation';
        attributes['aggregation-field-key'] = attributes['aggregation-field-key'] || attributes['text-field-key'];
        attributes['aggregation-group'] = undefined;
        attributes['aggregation-label'] = this._createAggregationLabel(attributes);
        attributes['aggregation-name'] = '_aggregation';
        attributes['filter-type'] = 'list';
        attributes['group-field-key'] = attributes['text-field-key'];
        attributes['group-name'] = undefined;
        attributes['group-type'] = undefined;
        attributes['list-field-key'] = attributes['text-field-key'];
        attributes['list-operator'] = attributes['list-operator'] || '=';
        attributes['search-element-id'] = searchElementId;
        attributes['search-field-keys'] = attributes['text-field-key'];
        attributes['search-limit'] = attributes['search-limit'] || 10000;
        attributes['sort-aggregation'] = '_aggregation';
        attributes['sort-field-key'] = undefined;
        attributes['text-field'] = 'fields.' + textFieldKey.field;
        attributes['vis-draw-function'] = 'drawData';
        attributes['vis-element-id'] = visElementId;
        attributes['vis-filter-input-function'] = 'changeFilteredText';
        attributes['vis-filter-output-event'] = 'filter';
        var filterElement = filter_web_component_1.NextCenturyFilter.createElement(filterElementId, attributes);
        var searchElement = search_web_component_1.NextCenturySearch.createElement(searchElementId, attributes);
        var aggregationElement = aggregation_web_component_1.NextCenturyAggregation.createElement(attributes);
        var groupElement = group_web_component_1.NextCenturyGroup.createElement(attributes);
        searchElement.append(aggregationElement);
        searchElement.append(groupElement);
        var visElement = document.createElement('next-century-visualization-text-cloud');
        visElement.setAttribute('id', visElementId);
        text_cloud_visualization_1.NextCenturyTextCloudVisualization.observedAttributes.forEach(function (attribute) {
            if (typeof attributes[attribute] !== 'undefined') {
                visElement.setAttribute(attribute, attributes[attribute]);
            }
        });
        this._containerElement.append(searchElement);
        this._containerElement.append(filterElement);
        this._containerElement.append(visElement);
        core_util_1.CoreUtil.addEventPropagationListener(this, filterElement, 'designsChanged');
        core_util_1.CoreUtil.addEventPropagationListener(this, filterElement, 'filtersChanged');
        core_util_1.CoreUtil.addEventPropagationListener(this, filterElement, 'valuesFiltered');
        core_util_1.CoreUtil.addEventPropagationListener(this, searchElement, 'searchCanceled');
        core_util_1.CoreUtil.addEventPropagationListener(this, searchElement, 'searchFailed');
        core_util_1.CoreUtil.addEventPropagationListener(this, searchElement, 'searchFinished');
        core_util_1.CoreUtil.addEventPropagationListener(this, searchElement, 'searchLaunched');
        filterElement.init(this._dataset, this._filterService);
        searchElement.init(this._dataset, this._filterService, this._searchService);
    };
    return NextCenturyTextCloud;
}(element_web_component_1.NextCenturyElement));
exports.NextCenturyTextCloud = NextCenturyTextCloud;
window.customElements.define('next-century-text-cloud', NextCenturyTextCloud);
//# sourceMappingURL=text-cloud.web-component.js.map