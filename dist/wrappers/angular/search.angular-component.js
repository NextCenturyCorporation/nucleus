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
var abstract_search_service_1 = require("../../core/services/abstract.search.service");
var core_util_1 = require("../../core/core.util");
var aggregation_web_component_1 = require("../../core/components/aggregation.web-component");
var common_angular_component_1 = require("./common.angular-component");
var group_web_component_1 = require("../../core/components/group.web-component");
var search_web_component_1 = require("../../core/components/search.web-component");
var SEARCH_COMPONENT_TEMPLATE = "\n<next-century-search [attr.id]=\"id + '-search'\">\n    <next-century-aggregation *ngFor=\"let aggregation of aggregations; let i = index\" [attr.id]=\"id + '-aggregation-' + i\">\n    </next-century-aggregation>\n    <next-century-group *ngFor=\"let group of groups; let i = index\" [attr.id]=\"id + '-group-' + i\"></next-century-group>\n</next-century-search>\n";
var NextCenturySearchAngularComponent = /** @class */ (function (_super) {
    __extends(NextCenturySearchAngularComponent, _super);
    function NextCenturySearchAngularComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @override
     */
    NextCenturySearchAngularComponent.prototype.doesHaveSubclassInputs = function () {
        return !!(this.searchService && this.visElement);
    };
    /**
     * @override
     */
    NextCenturySearchAngularComponent.prototype.findWrappedElement = function () {
        return this.elementRef.nativeElement.querySelector('#' + this.id + '-search');
    };
    /**
     * @override
     */
    NextCenturySearchAngularComponent.prototype.initWrappedElement = function (searchElement) {
        searchElement.init(this.dataset, this.filterService, this.searchService, this.visElement);
    };
    /**
     * @override
     */
    NextCenturySearchAngularComponent.prototype.onWrapperAfterViewInit = function () {
        var searchElement = this.findWrappedElement();
        // Add event propagation listeners after the HTML elements are stable.
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchCanceled');
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchFailed');
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchFinished');
        core_util_1.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchLaunched');
    };
    /**
     * @override
     */
    NextCenturySearchAngularComponent.prototype.onWrapperChanges = function () {
        var _this = this;
        if (this.aggregations) {
            this.aggregations.forEach(function (aggregationOptions, index) {
                var aggregationElement = _this.elementRef.nativeElement.querySelector('#' + _this.id + '-aggregation-' +
                    index);
                if (aggregationElement) {
                    core_util_1.CoreUtil.updateElementAttributes(aggregationElement, aggregation_web_component_1.NextCenturyAggregation.observedAttributes, aggregationOptions);
                }
            });
        }
        if (this.groups) {
            this.groups.forEach(function (groupOptions, index) {
                var groupElement = _this.elementRef.nativeElement.querySelector('#' + _this.id + '-group-' +
                    index);
                if (groupElement) {
                    core_util_1.CoreUtil.updateElementAttributes(groupElement, group_web_component_1.NextCenturyGroup.observedAttributes, groupOptions);
                }
            });
        }
    };
    /**
     * @override
     */
    NextCenturySearchAngularComponent.prototype.retrieveWrappedElementObservedAttributes = function () {
        return search_web_component_1.NextCenturySearch.observedAttributes;
    };
    /**
     * Updates the unshared filters of this search element with the given filters.
     */
    NextCenturySearchAngularComponent.prototype.updateFilters = function (id, filters) {
        var searchElement = this.findWrappedElement();
        searchElement.updateFilters(id, filters);
    };
    /**
     * Updates the filter designs of this search element (used to find shared filters) with the given filter designs.
     */
    NextCenturySearchAngularComponent.prototype.updateFilterDesigns = function (id, filterDesigns) {
        var searchElement = this.findWrappedElement();
        searchElement.updateFilterDesigns(id, filterDesigns);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NextCenturySearchAngularComponent.prototype, "aggregations", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NextCenturySearchAngularComponent.prototype, "groups", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NextCenturySearchAngularComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", abstract_search_service_1.AbstractSearchService)
    ], NextCenturySearchAngularComponent.prototype, "searchService", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NextCenturySearchAngularComponent.prototype, "visElement", void 0);
    NextCenturySearchAngularComponent = __decorate([
        core_1.Component({
            selector: 'app-next-century-angular-search',
            template: SEARCH_COMPONENT_TEMPLATE,
            encapsulation: core_1.ViewEncapsulation.Emulated,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], NextCenturySearchAngularComponent);
    return NextCenturySearchAngularComponent;
}(common_angular_component_1.NextCenturyCommonAngularComponent));
exports.NextCenturySearchAngularComponent = NextCenturySearchAngularComponent;
//# sourceMappingURL=search.angular-component.js.map