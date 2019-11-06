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
var core_util_1 = require("../../../core/core.util");
var dataset_1 = require("../../../core/models/dataset");
var filter_service_1 = require("../../../core/services/filter.service");
var NextCenturyCommonAngularComponent = /** @class */ (function () {
    function NextCenturyCommonAngularComponent() {
        this._visualizationIsInitialized = false;
    }
    NextCenturyCommonAngularComponent.prototype.doesHaveSubclassInputs = function () {
        return true;
    };
    NextCenturyCommonAngularComponent.prototype.onWrapperAfterViewInit = function () {
        // Override if needed.
    };
    NextCenturyCommonAngularComponent.prototype.onWrapperChanges = function () {
        // Override if needed.
    };
    NextCenturyCommonAngularComponent.prototype.ngAfterViewInit = function () {
        this.onWrapperAfterViewInit();
        // Call ngOnChanges to initialize the visualization if needed after the HTML elements are stable.
        this.ngOnChanges(undefined);
    };
    NextCenturyCommonAngularComponent.prototype.ngOnChanges = function (__changes) {
        // Ensure ALL required properties are set before calling init on the visualization.
        if (this.id && this.dataset && this.filterService && this.options && this.doesHaveSubclassInputs()) {
            var wrappedElement = this.findWrappedElement();
            this.options.id = wrappedElement.getAttribute('id');
            if (wrappedElement) {
                core_util_1.CoreUtil.updateElementAttributes(wrappedElement, this.retrieveWrappedElementObservedAttributes(), this.options);
                this.onWrapperChanges();
                if (!this._visualizationIsInitialized) {
                    this.initWrappedElement(wrappedElement);
                    this._visualizationIsInitialized = true;
                }
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", dataset_1.Dataset)
    ], NextCenturyCommonAngularComponent.prototype, "dataset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", filter_service_1.FilterService)
    ], NextCenturyCommonAngularComponent.prototype, "filterService", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NextCenturyCommonAngularComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NextCenturyCommonAngularComponent.prototype, "options", void 0);
    return NextCenturyCommonAngularComponent;
}());
exports.NextCenturyCommonAngularComponent = NextCenturyCommonAngularComponent;
//# sourceMappingURL=common.angular-component.js.map