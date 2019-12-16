/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/core/filter.angular-component.ts
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
import { CoreUtil } from 'nucleus/dist/core/core.util';
import { NucleusCommonAngularComponent } from './common.angular-component';
import { NucleusFilter } from 'nucleus/dist/core/components/filter.web-component';
/** @type {?} */
var FILTER_COMPONENT_TEMPLATE = "\n<nucleus-filter [attr.id]=\"id + '-filter'\"></nucleus-filter>\n";
var NucleusFilterAngularComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NucleusFilterAngularComponent, _super);
    function NucleusFilterAngularComponent(elementRef) {
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
    NucleusFilterAngularComponent.prototype.doesHaveSubclassInputs = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        return !!(this.searchElement && this.visInputElement && this.visOutputElement);
    };
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @return {?}
     */
    NucleusFilterAngularComponent.prototype.findWrappedElement = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this.elementRef.nativeElement.querySelector('#' + this.id + '-filter')));
    };
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @param {?} filterElement
     * @return {?}
     */
    NucleusFilterAngularComponent.prototype.initWrappedElement = /**
     * @override
     * @protected
     * @param {?} filterElement
     * @return {?}
     */
    function (filterElement) {
        filterElement.init(this.dataset, this.filterService, {
            search: this.searchElement,
            visInput: this.visInputElement,
            visOutput: this.visOutputElement
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
    NucleusFilterAngularComponent.prototype.onWrapperAfterViewInit = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var filterElement = this.findWrappedElement();
        // Add event propagation listeners after the HTML elements are stable.
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, filterElement, 'valuesFiltered');
    };
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @return {?}
     */
    NucleusFilterAngularComponent.prototype.retrieveWrappedElementObservedAttributes = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        return NucleusFilter.observedAttributes;
    };
    /**
     * Updates filters (creates and/or deletes) using the given values.
     */
    /**
     * Updates filters (creates and/or deletes) using the given values.
     * @param {?} values
     * @return {?}
     */
    NucleusFilterAngularComponent.prototype.updateFilteredValues = /**
     * Updates filters (creates and/or deletes) using the given values.
     * @param {?} values
     * @return {?}
     */
    function (values) {
        /** @type {?} */
        var filterElement = this.findWrappedElement();
        filterElement.updateFilteredValues(values);
    };
    NucleusFilterAngularComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-nucleus-angular-filter',
                    template: FILTER_COMPONENT_TEMPLATE,
                    encapsulation: ViewEncapsulation.Emulated,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    NucleusFilterAngularComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    NucleusFilterAngularComponent.propDecorators = {
        searchElement: [{ type: Input }],
        visInputElement: [{ type: Input }],
        visOutputElement: [{ type: Input }]
    };
    return NucleusFilterAngularComponent;
}(NucleusCommonAngularComponent));
export { NucleusFilterAngularComponent };
if (false) {
    /** @type {?} */
    NucleusFilterAngularComponent.prototype.searchElement;
    /** @type {?} */
    NucleusFilterAngularComponent.prototype.visInputElement;
    /** @type {?} */
    NucleusFilterAngularComponent.prototype.visOutputElement;
    /** @type {?} */
    NucleusFilterAngularComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmFuZ3VsYXItY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbnVjbGV1cy1hbmd1bGFyLyIsInNvdXJjZXMiOlsid3JhcHBlcnMvY29yZS9maWx0ZXIuYW5ndWxhci1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtREFBbUQsQ0FBQzs7SUFFNUUseUJBQXlCLEdBQUcsb0VBRWpDO0FBRUQ7SUFNbUQseURBQTZCO0lBSzVFLHVDQUFtQixVQUFzQjtRQUF6QyxZQUNJLGlCQUFPLFNBQ1Y7UUFGa0IsZ0JBQVUsR0FBVixVQUFVLENBQVk7O0lBRXpDLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ08sOERBQXNCOzs7OztJQUFoQztRQUNJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ08sMERBQWtCOzs7OztJQUE1QjtRQUNJLE9BQU8sbUJBQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxFQUFpQixDQUFDO0lBQ25HLENBQUM7SUFFRDs7T0FFRzs7Ozs7OztJQUNPLDBEQUFrQjs7Ozs7O0lBQTVCLFVBQTZCLGFBQTRCO1FBQ3JELGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2pELE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYTtZQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDOUIsU0FBUyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7U0FDbkMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDTyw4REFBc0I7Ozs7O0lBQWhDOztZQUNVLGFBQWEsR0FBa0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1FBRTlELHNFQUFzRTtRQUN0RSxRQUFRLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDekcsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDTyxnRkFBd0M7Ozs7O0lBQWxEO1FBQ0ksT0FBTyxhQUFhLENBQUMsa0JBQWtCLENBQUM7SUFDNUMsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSSw0REFBb0I7Ozs7O0lBQTNCLFVBQTRCLE1BQWlCOztZQUNuQyxhQUFhLEdBQWtCLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtRQUM5RCxhQUFhLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Z0JBL0RKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsUUFBUTtvQkFDekMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzs7O2dCQWY0QyxVQUFVOzs7Z0NBaUJsRCxLQUFLO2tDQUNMLEtBQUs7bUNBQ0wsS0FBSzs7SUF1RFYsb0NBQUM7Q0FBQSxBQWhFRCxDQU1tRCw2QkFBNkIsR0EwRC9FO1NBMURZLDZCQUE2Qjs7O0lBQ3RDLHNEQUE0Qjs7SUFDNUIsd0RBQThCOztJQUM5Qix5REFBK0I7O0lBRW5CLG1EQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTkgTmV4dCBDZW50dXJ5IENvcnBvcmF0aW9uXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvcmVVdGlsIH0gZnJvbSAnbnVjbGV1cy9kaXN0L2NvcmUvY29yZS51dGlsJztcbmltcG9ydCB7IE51Y2xldXNDb21tb25Bbmd1bGFyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21tb24uYW5ndWxhci1jb21wb25lbnQnO1xuaW1wb3J0IHsgTnVjbGV1c0ZpbHRlciB9IGZyb20gJ251Y2xldXMvZGlzdC9jb3JlL2NvbXBvbmVudHMvZmlsdGVyLndlYi1jb21wb25lbnQnO1xuXG5jb25zdCBGSUxURVJfQ09NUE9ORU5UX1RFTVBMQVRFID0gYFxuPG51Y2xldXMtZmlsdGVyIFthdHRyLmlkXT1cImlkICsgJy1maWx0ZXInXCI+PC9udWNsZXVzLWZpbHRlcj5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLW51Y2xldXMtYW5ndWxhci1maWx0ZXInLFxuICAgIHRlbXBsYXRlOiBGSUxURVJfQ09NUE9ORU5UX1RFTVBMQVRFLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE51Y2xldXNGaWx0ZXJBbmd1bGFyQ29tcG9uZW50IGV4dGVuZHMgTnVjbGV1c0NvbW1vbkFuZ3VsYXJDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHNlYXJjaEVsZW1lbnQ6IGFueTtcbiAgICBASW5wdXQoKSB2aXNJbnB1dEVsZW1lbnQ6IGFueTtcbiAgICBASW5wdXQoKSB2aXNPdXRwdXRFbGVtZW50OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBkb2VzSGF2ZVN1YmNsYXNzSW5wdXRzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISEodGhpcy5zZWFyY2hFbGVtZW50ICYmIHRoaXMudmlzSW5wdXRFbGVtZW50ICYmIHRoaXMudmlzT3V0cHV0RWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGZpbmRXcmFwcGVkRWxlbWVudCgpOiBOdWNsZXVzRmlsdGVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgdGhpcy5pZCArICctZmlsdGVyJykgYXMgTnVjbGV1c0ZpbHRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaW5pdFdyYXBwZWRFbGVtZW50KGZpbHRlckVsZW1lbnQ6IE51Y2xldXNGaWx0ZXIpOiB2b2lkIHtcbiAgICAgICAgZmlsdGVyRWxlbWVudC5pbml0KHRoaXMuZGF0YXNldCwgdGhpcy5maWx0ZXJTZXJ2aWNlLCB7XG4gICAgICAgICAgICBzZWFyY2g6IHRoaXMuc2VhcmNoRWxlbWVudCxcbiAgICAgICAgICAgIHZpc0lucHV0OiB0aGlzLnZpc0lucHV0RWxlbWVudCxcbiAgICAgICAgICAgIHZpc091dHB1dDogdGhpcy52aXNPdXRwdXRFbGVtZW50XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBvbldyYXBwZXJBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmaWx0ZXJFbGVtZW50OiBOdWNsZXVzRmlsdGVyID0gdGhpcy5maW5kV3JhcHBlZEVsZW1lbnQoKTtcblxuICAgICAgICAvLyBBZGQgZXZlbnQgcHJvcGFnYXRpb24gbGlzdGVuZXJzIGFmdGVyIHRoZSBIVE1MIGVsZW1lbnRzIGFyZSBzdGFibGUuXG4gICAgICAgIENvcmVVdGlsLmFkZEV2ZW50UHJvcGFnYXRpb25MaXN0ZW5lcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZmlsdGVyRWxlbWVudCwgJ3ZhbHVlc0ZpbHRlcmVkJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHJldHJpZXZlV3JhcHBlZEVsZW1lbnRPYnNlcnZlZEF0dHJpYnV0ZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gTnVjbGV1c0ZpbHRlci5vYnNlcnZlZEF0dHJpYnV0ZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBmaWx0ZXJzIChjcmVhdGVzIGFuZC9vciBkZWxldGVzKSB1c2luZyB0aGUgZ2l2ZW4gdmFsdWVzLlxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVGaWx0ZXJlZFZhbHVlcyh2YWx1ZXM6IGFueXxhbnlbXSk6IHZvaWQge1xuICAgICAgICBjb25zdCBmaWx0ZXJFbGVtZW50OiBOdWNsZXVzRmlsdGVyID0gdGhpcy5maW5kV3JhcHBlZEVsZW1lbnQoKTtcbiAgICAgICAgZmlsdGVyRWxlbWVudC51cGRhdGVGaWx0ZXJlZFZhbHVlcyh2YWx1ZXMpO1xuICAgIH1cbn1cbiJdfQ==