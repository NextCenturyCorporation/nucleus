/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/core/search.angular-component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractSearchService } from 'nucleus/dist/core/services/abstract.search.service';
import { CoreUtil } from 'nucleus/dist/core/core.util';
import { NucleusAggregation } from 'nucleus/dist/core/components/aggregation.web-component';
import { NucleusCommonAngularComponent } from './common.angular-component';
import { NucleusGroup } from 'nucleus/dist/core/components/group.web-component';
import { NucleusSearch } from 'nucleus/dist/core/components/search.web-component';
/** @type {?} */
var SEARCH_COMPONENT_TEMPLATE = "\n<nucleus-search [attr.id]=\"id + '-search'\">\n    <nucleus-aggregation *ngFor=\"let aggregation of aggregations; let i = index\" [attr.id]=\"id + '-aggregation-' + i\">\n    </nucleus-aggregation>\n    <nucleus-group *ngFor=\"let group of groups; let i = index\" [attr.id]=\"id + '-group-' + i\"></nucleus-group>\n</nucleus-search>\n";
var NucleusSearchAngularComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NucleusSearchAngularComponent, _super);
    function NucleusSearchAngularComponent(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @return {?}
     */
    NucleusSearchAngularComponent.prototype.doesHaveSubclassInputs = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        return !!(this.searchService && this.visInputElement);
    };
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @return {?}
     */
    NucleusSearchAngularComponent.prototype.findWrappedElement = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this.elementRef.nativeElement.querySelector('#' + this.id + '-search')));
    };
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @param {?} searchElement
     * @return {?}
     */
    NucleusSearchAngularComponent.prototype.initWrappedElement = /**
     * @override
     * @protected
     * @param {?} searchElement
     * @return {?}
     */
    function (searchElement) {
        searchElement.init(this.dataset, this.filterService, this.searchService, {
            visInput: this.visInputElement
        });
    };
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @return {?}
     */
    NucleusSearchAngularComponent.prototype.onWrapperAfterViewInit = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var searchElement = this.findWrappedElement();
        // Add event propagation listeners after the HTML elements are stable.
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchCanceled');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchFailed');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchFinished');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchLaunched');
    };
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @return {?}
     */
    NucleusSearchAngularComponent.prototype.onWrapperChanges = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.aggregations) {
            this.aggregations.forEach((/**
             * @param {?} aggregationOptions
             * @param {?} index
             * @return {?}
             */
            function (aggregationOptions, index) {
                /** @type {?} */
                var aggregationElement = (/** @type {?} */ (_this.elementRef.nativeElement.querySelector('#' + _this.id + '-aggregation-' +
                    index)));
                if (aggregationElement) {
                    CoreUtil.updateElementAttributes(aggregationElement, NucleusAggregation.observedAttributes, aggregationOptions);
                }
            }));
        }
        if (this.groups) {
            this.groups.forEach((/**
             * @param {?} groupOptions
             * @param {?} index
             * @return {?}
             */
            function (groupOptions, index) {
                /** @type {?} */
                var groupElement = (/** @type {?} */ (_this.elementRef.nativeElement.querySelector('#' + _this.id + '-group-' +
                    index)));
                if (groupElement) {
                    CoreUtil.updateElementAttributes(groupElement, NucleusGroup.observedAttributes, groupOptions);
                }
            }));
        }
    };
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @return {?}
     */
    NucleusSearchAngularComponent.prototype.retrieveWrappedElementObservedAttributes = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        return NucleusSearch.observedAttributes;
    };
    /**
     * Runs the search query using the current attributes and filters.  Only call this function if you want to manually trigger a requery.
     */
    /**
     * Runs the search query using the current attributes and filters.  Only call this function if you want to manually trigger a requery.
     * @param {?} id
     * @param {?} filters
     * @return {?}
     */
    NucleusSearchAngularComponent.prototype.runQuery = /**
     * Runs the search query using the current attributes and filters.  Only call this function if you want to manually trigger a requery.
     * @param {?} id
     * @param {?} filters
     * @return {?}
     */
    function (id, filters) {
        /** @type {?} */
        var searchElement = this.findWrappedElement();
        searchElement.runQuery();
    };
    /**
     * Updates the unshared filters of this search element with the given filters.
     */
    /**
     * Updates the unshared filters of this search element with the given filters.
     * @param {?} id
     * @param {?} filters
     * @return {?}
     */
    NucleusSearchAngularComponent.prototype.updateFilters = /**
     * Updates the unshared filters of this search element with the given filters.
     * @param {?} id
     * @param {?} filters
     * @return {?}
     */
    function (id, filters) {
        /** @type {?} */
        var searchElement = this.findWrappedElement();
        searchElement.updateFilters(id, filters);
    };
    /**
     * Updates the filter designs of this search element (used to find shared filters) with the given filter designs.
     */
    /**
     * Updates the filter designs of this search element (used to find shared filters) with the given filter designs.
     * @param {?} id
     * @param {?} filterDesigns
     * @return {?}
     */
    NucleusSearchAngularComponent.prototype.updateFilterDesigns = /**
     * Updates the filter designs of this search element (used to find shared filters) with the given filter designs.
     * @param {?} id
     * @param {?} filterDesigns
     * @return {?}
     */
    function (id, filterDesigns) {
        /** @type {?} */
        var searchElement = this.findWrappedElement();
        searchElement.updateFilterDesigns(id, filterDesigns);
    };
    NucleusSearchAngularComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-nucleus-angular-search',
                    template: SEARCH_COMPONENT_TEMPLATE,
                    encapsulation: ViewEncapsulation.Emulated,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    NucleusSearchAngularComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    NucleusSearchAngularComponent.propDecorators = {
        aggregations: [{ type: Input }],
        groups: [{ type: Input }],
        options: [{ type: Input }],
        searchService: [{ type: Input }],
        visInputElement: [{ type: Input }]
    };
    return NucleusSearchAngularComponent;
}(NucleusCommonAngularComponent));
export { NucleusSearchAngularComponent };
if (false) {
    /** @type {?} */
    NucleusSearchAngularComponent.prototype.aggregations;
    /** @type {?} */
    NucleusSearchAngularComponent.prototype.groups;
    /** @type {?} */
    NucleusSearchAngularComponent.prototype.options;
    /** @type {?} */
    NucleusSearchAngularComponent.prototype.searchService;
    /** @type {?} */
    NucleusSearchAngularComponent.prototype.visInputElement;
    /** @type {?} */
    NucleusSearchAngularComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmFuZ3VsYXItY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbnVjbGV1cy1hbmd1bGFyLyIsInNvdXJjZXMiOlsid3JhcHBlcnMvY29yZS9zZWFyY2guYW5ndWxhci1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHekcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDM0YsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQzVGLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbURBQW1ELENBQUM7O0lBRTVFLHlCQUF5QixHQUFHLGtWQU1qQztBQUVEO0lBTW1ELHlEQUE2QjtJQU81RSx1Q0FBbUIsVUFBc0I7UUFBekMsWUFDSSxpQkFBTyxTQUNWO1FBRmtCLGdCQUFVLEdBQVYsVUFBVSxDQUFZOztJQUV6QyxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNPLDhEQUFzQjs7Ozs7SUFBaEM7UUFDSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ08sMERBQWtCOzs7OztJQUE1QjtRQUNJLE9BQU8sbUJBQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFH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N0MsQ0FBQztJQUVEOztPQUVHOzs7Ozs7O0lBQ0ksMkRBQW1COzs7Ozs7SUFBMUIsVUFBMkIsRUFBVSxFQUFFLGFBQXFDOztZQUNsRSxhQUFhLEdBQWtCLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtRQUM5RCxhQUFhLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7O2dCQTNHSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLFFBQVE7b0JBQ3pDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNsRDs7OztnQkF2QjRDLFVBQVU7OzsrQkF5QmxELEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLO2dDQUNMLEtBQUs7a0NBQ0wsS0FBSzs7SUFpR1Ysb0NBQUM7Q0FBQSxBQTVHRCxDQU1tRCw2QkFBNkIsR0FzRy9FO1NBdEdZLDZCQUE2Qjs7O0lBQ3RDLHFEQUE2Qzs7SUFDN0MsK0NBQXVDOztJQUN2QyxnREFBc0M7O0lBQ3RDLHNEQUE4Qzs7SUFDOUMsd0RBQThCOztJQUVsQixtREFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE5IE5leHQgQ2VudHVyeSBDb3Jwb3JhdGlvblxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZpbHRlciwgQWJzdHJhY3RGaWx0ZXJEZXNpZ24gfSBmcm9tICdudWNsZXVzL2Rpc3QvY29yZS9tb2RlbHMvZmlsdGVycyc7XG5pbXBvcnQgeyBBYnN0cmFjdFNlYXJjaFNlcnZpY2UgfSBmcm9tICdudWNsZXVzL2Rpc3QvY29yZS9zZXJ2aWNlcy9hYnN0cmFjdC5zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBDb3JlVXRpbCB9IGZyb20gJ251Y2xldXMvZGlzdC9jb3JlL2NvcmUudXRpbCc7XG5pbXBvcnQgeyBOdWNsZXVzQWdncmVnYXRpb24gfSBmcm9tICdudWNsZXVzL2Rpc3QvY29yZS9jb21wb25lbnRzL2FnZ3JlZ2F0aW9uLndlYi1jb21wb25lbnQnO1xuaW1wb3J0IHsgTnVjbGV1c0NvbW1vbkFuZ3VsYXJDb21wb25lbnQgfSBmcm9tICcuL2NvbW1vbi5hbmd1bGFyLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBOdWNsZXVzR3JvdXAgfSBmcm9tICdudWNsZXVzL2Rpc3QvY29yZS9jb21wb25lbnRzL2dyb3VwLndlYi1jb21wb25lbnQnO1xuaW1wb3J0IHsgTnVjbGV1c1NlYXJjaCB9IGZyb20gJ251Y2xldXMvZGlzdC9jb3JlL2NvbXBvbmVudHMvc2VhcmNoLndlYi1jb21wb25lbnQnO1xuXG5jb25zdCBTRUFSQ0hfQ09NUE9ORU5UX1RFTVBMQVRFID0gYFxuPG51Y2xldXMtc2VhcmNoIFthdHRyLmlkXT1cImlkICsgJy1zZWFyY2gnXCI+XG4gICAgPG51Y2xldXMtYWdncmVnYXRpb24gKm5nRm9yPVwibGV0IGFnZ3JlZ2F0aW9uIG9mIGFnZ3JlZ2F0aW9uczsgbGV0IGkgPSBpbmRleFwiIFthdHRyLmlkXT1cImlkICsgJy1hZ2dyZWdhdGlvbi0nICsgaVwiPlxuICAgIDwvbnVjbGV1cy1hZ2dyZWdhdGlvbj5cbiAgICA8bnVjbGV1cy1ncm91cCAqbmdGb3I9XCJsZXQgZ3JvdXAgb2YgZ3JvdXBzOyBsZXQgaSA9IGluZGV4XCIgW2F0dHIuaWRdPVwiaWQgKyAnLWdyb3VwLScgKyBpXCI+PC9udWNsZXVzLWdyb3VwPlxuPC9udWNsZXVzLXNlYXJjaD5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLW51Y2xldXMtYW5ndWxhci1zZWFyY2gnLFxuICAgIHRlbXBsYXRlOiBTRUFSQ0hfQ09NUE9ORU5UX1RFTVBMQVRFLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE51Y2xldXNTZWFyY2hBbmd1bGFyQ29tcG9uZW50IGV4dGVuZHMgTnVjbGV1c0NvbW1vbkFuZ3VsYXJDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIGFnZ3JlZ2F0aW9uczogUmVjb3JkPHN0cmluZywgYW55PltdO1xuICAgIEBJbnB1dCgpIGdyb3VwczogUmVjb3JkPHN0cmluZywgYW55PltdO1xuICAgIEBJbnB1dCgpIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT47XG4gICAgQElucHV0KCkgc2VhcmNoU2VydmljZTogQWJzdHJhY3RTZWFyY2hTZXJ2aWNlO1xuICAgIEBJbnB1dCgpIHZpc0lucHV0RWxlbWVudDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZG9lc0hhdmVTdWJjbGFzc0lucHV0cygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhKHRoaXMuc2VhcmNoU2VydmljZSAmJiB0aGlzLnZpc0lucHV0RWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGZpbmRXcmFwcGVkRWxlbWVudCgpOiBOdWNsZXVzU2VhcmNoIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgdGhpcy5pZCArICctc2VhcmNoJykgYXMgTnVjbGV1c1NlYXJjaDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaW5pdFdyYXBwZWRFbGVtZW50KHNlYXJjaEVsZW1lbnQ6IE51Y2xldXNTZWFyY2gpOiB2b2lkIHtcbiAgICAgICAgc2VhcmNoRWxlbWVudC5pbml0KHRoaXMuZGF0YXNldCwgdGhpcy5maWx0ZXJTZXJ2aWNlLCB0aGlzLnNlYXJjaFNlcnZpY2UsIHtcbiAgICAgICAgICAgIHZpc0lucHV0OiB0aGlzLnZpc0lucHV0RWxlbWVudFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb25XcmFwcGVyQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoRWxlbWVudDogTnVjbGV1c1NlYXJjaCA9IHRoaXMuZmluZFdyYXBwZWRFbGVtZW50KCk7XG5cbiAgICAgICAgLy8gQWRkIGV2ZW50IHByb3BhZ2F0aW9uIGxpc3RlbmVycyBhZnRlciB0aGUgSFRNTCBlbGVtZW50cyBhcmUgc3RhYmxlLlxuICAgICAgICBDb3JlVXRpbC5hZGRFdmVudFByb3BhZ2F0aW9uTGlzdGVuZXIodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHNlYXJjaEVsZW1lbnQsICdzZWFyY2hDYW5jZWxlZCcpO1xuICAgICAgICBDb3JlVXRpbC5hZGRFdmVudFByb3BhZ2F0aW9uTGlzdGVuZXIodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHNlYXJjaEVsZW1lbnQsICdzZWFyY2hGYWlsZWQnKTtcbiAgICAgICAgQ29yZVV0aWwuYWRkRXZlbnRQcm9wYWdhdGlvbkxpc3RlbmVyKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBzZWFyY2hFbGVtZW50LCAnc2VhcmNoRmluaXNoZWQnKTtcbiAgICAgICAgQ29yZVV0aWwuYWRkRXZlbnRQcm9wYWdhdGlvbkxpc3RlbmVyKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBzZWFyY2hFbGVtZW50LCAnc2VhcmNoTGF1bmNoZWQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb25XcmFwcGVyQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYWdncmVnYXRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmFnZ3JlZ2F0aW9ucy5mb3JFYWNoKChhZ2dyZWdhdGlvbk9wdGlvbnMsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWdncmVnYXRpb25FbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignIycgKyB0aGlzLmlkICsgJy1hZ2dyZWdhdGlvbi0nICtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgpIGFzIE51Y2xldXNBZ2dyZWdhdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoYWdncmVnYXRpb25FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIENvcmVVdGlsLnVwZGF0ZUVsZW1lbnRBdHRyaWJ1dGVzKGFnZ3JlZ2F0aW9uRWxlbWVudCwgTnVjbGV1c0FnZ3JlZ2F0aW9uLm9ic2VydmVkQXR0cmlidXRlcywgYWdncmVnYXRpb25PcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmdyb3Vwcykge1xuICAgICAgICAgICAgdGhpcy5ncm91cHMuZm9yRWFjaCgoZ3JvdXBPcHRpb25zLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgdGhpcy5pZCArICctZ3JvdXAtJyArXG4gICAgICAgICAgICAgICAgICAgIGluZGV4KSBhcyBOdWNsZXVzR3JvdXA7XG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBDb3JlVXRpbC51cGRhdGVFbGVtZW50QXR0cmlidXRlcyhncm91cEVsZW1lbnQsIE51Y2xldXNHcm91cC5vYnNlcnZlZEF0dHJpYnV0ZXMsIGdyb3VwT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcmV0cmlldmVXcmFwcGVkRWxlbWVudE9ic2VydmVkQXR0cmlidXRlcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBOdWNsZXVzU2VhcmNoLm9ic2VydmVkQXR0cmlidXRlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSdW5zIHRoZSBzZWFyY2ggcXVlcnkgdXNpbmcgdGhlIGN1cnJlbnQgYXR0cmlidXRlcyBhbmQgZmlsdGVycy4gIE9ubHkgY2FsbCB0aGlzIGZ1bmN0aW9uIGlmIHlvdSB3YW50IHRvIG1hbnVhbGx5IHRyaWdnZXIgYSByZXF1ZXJ5LlxuICAgICAqL1xuICAgIHB1YmxpYyBydW5RdWVyeShpZDogc3RyaW5nLCBmaWx0ZXJzOiBBYnN0cmFjdEZpbHRlcltdKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlYXJjaEVsZW1lbnQ6IE51Y2xldXNTZWFyY2ggPSB0aGlzLmZpbmRXcmFwcGVkRWxlbWVudCgpO1xuICAgICAgICBzZWFyY2hFbGVtZW50LnJ1blF1ZXJ5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgdW5zaGFyZWQgZmlsdGVycyBvZiB0aGlzIHNlYXJjaCBlbGVtZW50IHdpdGggdGhlIGdpdmVuIGZpbHRlcnMuXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZUZpbHRlcnMoaWQ6IHN0cmluZywgZmlsdGVyczogQWJzdHJhY3RGaWx0ZXJbXSk6IHZvaWQge1xuICAgICAgICBjb25zdCBzZWFyY2hFbGVtZW50OiBOdWNsZXVzU2VhcmNoID0gdGhpcy5maW5kV3JhcHBlZEVsZW1lbnQoKTtcbiAgICAgICAgc2VhcmNoRWxlbWVudC51cGRhdGVGaWx0ZXJzKGlkLCBmaWx0ZXJzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBmaWx0ZXIgZGVzaWducyBvZiB0aGlzIHNlYXJjaCBlbGVtZW50ICh1c2VkIHRvIGZpbmQgc2hhcmVkIGZpbHRlcnMpIHdpdGggdGhlIGdpdmVuIGZpbHRlciBkZXNpZ25zLlxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVGaWx0ZXJEZXNpZ25zKGlkOiBzdHJpbmcsIGZpbHRlckRlc2lnbnM6IEFic3RyYWN0RmlsdGVyRGVzaWduW10pOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoRWxlbWVudDogTnVjbGV1c1NlYXJjaCA9IHRoaXMuZmluZFdyYXBwZWRFbGVtZW50KCk7XG4gICAgICAgIHNlYXJjaEVsZW1lbnQudXBkYXRlRmlsdGVyRGVzaWducyhpZCwgZmlsdGVyRGVzaWducyk7XG4gICAgfVxufVxuIl19