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
var core_util_1 = require("../../../core/core.util");
var common_angular_component_1 = require("./common.angular-component");
var filter_web_component_1 = require("../../../core/components/filter.web-component");
var FILTER_COMPONENT_TEMPLATE = "\n<nucleus-filter [attr.id]=\"id + '-filter'\"></nucleus-filter>\n";
var NucleusFilterAngularComponent = /** @class */ (function (_super) {
    __extends(NucleusFilterAngularComponent, _super);
    function NucleusFilterAngularComponent(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /**
     * @override
     */
    NucleusFilterAngularComponent.prototype.doesHaveSubclassInputs = function () {
        return !!(this.searchElement && this.visInputElement && this.visOutputElement);
    };
    /**
     * @override
     */
    NucleusFilterAngularComponent.prototype.findWrappedElement = function () {
        return this.elementRef.nativeElement.querySelector('#' + this.id + '-filter');
    };
    /**
     * @override
     */
    NucleusFilterAngularComponent.prototype.initWrappedElement = function (filterElement) {
        filterElement.init(this.dataset, this.filterService, {
            search: this.searchElement,
            visInput: this.visInputElement,
            visOutput: this.visOutputElement
        });
    };
    /**
     * @override
     */
    NucleusFilterAngularComponent.prototype.onWrapperAfterViewInit = function () {
        var filterElement = this.findWrappedElement();
        // Add event propagation listeners after the HTML elements are stable.
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, filterElement, 'valuesFiltered');
    };
    /**
     * @override
     */
    NucleusFilterAngularComponent.prototype.retrieveWrappedElementObservedAttributes = function () {
        return filter_web_component_1.NucleusFilter.observedAttributes;
    };
    /**
     * Updates filters (creates and/or deletes) using the given values.
     */
    NucleusFilterAngularComponent.prototype.updateFilteredValues = function (values) {
        var filterElement = this.findWrappedElement();
        filterElement.updateFilteredValues(values);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NucleusFilterAngularComponent.prototype, "searchElement", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NucleusFilterAngularComponent.prototype, "visInputElement", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NucleusFilterAngularComponent.prototype, "visOutputElement", void 0);
    NucleusFilterAngularComponent = __decorate([
        core_1.Component({
            selector: 'app-nucleus-angular-filter',
            template: FILTER_COMPONENT_TEMPLATE,
            encapsulation: core_1.ViewEncapsulation.Emulated,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], NucleusFilterAngularComponent);
    return NucleusFilterAngularComponent;
}(common_angular_component_1.NucleusCommonAngularComponent));
exports.NucleusFilterAngularComponent = NucleusFilterAngularComponent;
//# sourceMappingURL=filter.angular-component.js.map