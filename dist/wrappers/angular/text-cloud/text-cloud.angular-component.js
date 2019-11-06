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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var abstract_search_service_1 = require("../../../core/services/abstract.search.service");
var core_util_1 = require("../../../core/core.util");
var common_angular_component_1 = require("../core/common.angular-component");
var text_cloud_web_component_1 = require("../../../visualizations/text-cloud/text-cloud.web-component");
var VISUALZIATON_COMPONENT_TEMPLATE = "\n<next-century-text-cloud [attr.id]=\"id + '-angular'\"></next-century-text-cloud>\n";
var NextCenturyTextCloudAngularComponent = /** @class */ (function (_super) {
    __extends(NextCenturyTextCloudAngularComponent, _super);
    function NextCenturyTextCloudAngularComponent(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /**
     * Creates and returns the export data for the visualization.
     */
    NextCenturyTextCloudAngularComponent.prototype.createExportData = function (exportFields, filename) {
        var visElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular');
        return visElement.createExportData(exportFields, filename);
    };
    /**
     * @override
     */
    NextCenturyTextCloudAngularComponent.prototype.doesHaveSubclassInputs = function () {
        return !!this.searchService;
    };
    /**
     * @override
     */
    NextCenturyTextCloudAngularComponent.prototype.findWrappedElement = function () {
        return this.elementRef.nativeElement.querySelector('#' + this.id + '-angular');
    };
    /**
     * @override
     */
    NextCenturyTextCloudAngularComponent.prototype.initWrappedElement = function (visElement) {
        visElement.init(this.dataset, this.filterService, this.searchService);
    };
    /**
     * @override
     */
    NextCenturyTextCloudAngularComponent.prototype.onWrapperAfterViewInit = function () {
        var visElement = this.findWrappedElement();
        // Add event propagation listeners after the HTML elements are stable.
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'valuesFiltered');
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchCanceled');
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchFailed');
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchFinished');
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchLaunched');
    };
    /**
     * Redraws the visualization.
     */
    NextCenturyTextCloudAngularComponent.prototype.redraw = function () {
        var visElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular');
        visElement.redraw();
    };
    /**
     * @override
     */
    NextCenturyTextCloudAngularComponent.prototype.retrieveWrappedElementObservedAttributes = function () {
        return text_cloud_web_component_1.NextCenturyTextCloud.observedAttributes;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", abstract_search_service_1.AbstractSearchService)
    ], NextCenturyTextCloudAngularComponent.prototype, "searchService", void 0);
    NextCenturyTextCloudAngularComponent = __decorate([
        core_1.Component({
            selector: 'app-next-century-angular-text-cloud',
            template: VISUALZIATON_COMPONENT_TEMPLATE,
            encapsulation: core_1.ViewEncapsulation.Emulated,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], NextCenturyTextCloudAngularComponent);
    return NextCenturyTextCloudAngularComponent;
}(common_angular_component_1.NextCenturyCommonAngularComponent));
exports.NextCenturyTextCloudAngularComponent = NextCenturyTextCloudAngularComponent;
//# sourceMappingURL=text-cloud.angular-component.js.map