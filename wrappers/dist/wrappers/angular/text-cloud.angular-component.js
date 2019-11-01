"use strict";
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
var core_1 = require("@angular/core");
var abstract_search_service_1 = require("../../core/services/abstract.search.service");
var core_util_1 = require("../../core/core.util");
var dataset_1 = require("../../core/models/dataset");
var filter_service_1 = require("../../core/services/filter.service");
var NextCenturyAngularTextCloud = /** @class */ (function () {
    function NextCenturyAngularTextCloud(elementRef) {
        this.elementRef = elementRef;
        this._visualizationIsInitialized = false;
    }
    NextCenturyAngularTextCloud.prototype.ngAfterViewInit = function () {
        var visElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular');
        // Add event propagation listeners after the HTML elements are stable.
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'designsChanged');
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'filtersChanged');
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'valuesFiltered');
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchCanceled');
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchFailed');
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchFinished');
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchLaunched');
        // Call ngOnChanges to initialize the visualization if needed after the HTML elements are stable.
        this.ngOnChanges(undefined);
    };
    NextCenturyAngularTextCloud.prototype.ngOnChanges = function (__changes) {
        var _this = this;
        // Ensure ALL required properties are set before calling init on the visualization.
        if (this.id && this.dataset && this.filterService && this.searchService && this.options) {
            var visElement_1 = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular');
            if (visElement_1) {
                Object.keys(this.options).forEach(function (attribute) {
                    if (typeof _this.options[attribute] === 'undefined') {
                        if (visElement_1.hasAttribute(attribute)) {
                            visElement_1.removeAttribute(attribute);
                        }
                    }
                    else if (('' + _this.options[attribute]) !== visElement_1.getAttribute(attribute)) {
                        visElement_1.setAttribute(attribute, _this.options[attribute]);
                    }
                });
                if (!this._visualizationIsInitialized) {
                    visElement_1.init(this.dataset, this.filterService, this.searchService);
                    this._visualizationIsInitialized = true;
                }
            }
        }
    };
    /**
     * Creates and returns the export data for the visualization.
     */
    NextCenturyAngularTextCloud.prototype.createExportData = function (exportFields, filename) {
        var visElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular');
        return visElement.createExportData(exportFields, filename);
    };
    /**
     * Redraws the visualization.
     */
    NextCenturyAngularTextCloud.prototype.redraw = function () {
        var visElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular');
        visElement.redraw();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", dataset_1.Dataset)
    ], NextCenturyAngularTextCloud.prototype, "dataset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", filter_service_1.FilterService)
    ], NextCenturyAngularTextCloud.prototype, "filterService", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NextCenturyAngularTextCloud.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NextCenturyAngularTextCloud.prototype, "options", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", abstract_search_service_1.AbstractSearchService)
    ], NextCenturyAngularTextCloud.prototype, "searchService", void 0);
    NextCenturyAngularTextCloud = __decorate([
        core_1.Component({
            selector: 'app-next-century-angular-text-cloud',
            template: '<next-century-text-cloud [attr.id]="id + \'-angular\'"></next-century-text-cloud>',
            encapsulation: core_1.ViewEncapsulation.Emulated,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], NextCenturyAngularTextCloud);
    return NextCenturyAngularTextCloud;
}());
exports.NextCenturyAngularTextCloud = NextCenturyAngularTextCloud;
//# sourceMappingURL=text-cloud.angular-component.js.map