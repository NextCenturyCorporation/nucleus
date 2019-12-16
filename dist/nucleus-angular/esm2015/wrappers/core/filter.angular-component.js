/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/core/filter.angular-component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const FILTER_COMPONENT_TEMPLATE = `
<nucleus-filter [attr.id]="id + '-filter'"></nucleus-filter>
`;
export class NucleusFilterAngularComponent extends NucleusCommonAngularComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
    }
    /**
     * @override
     * @protected
     * @return {?}
     */
    doesHaveSubclassInputs() {
        return !!(this.searchElement && this.visInputElement && this.visOutputElement);
    }
    /**
     * @override
     * @protected
     * @return {?}
     */
    findWrappedElement() {
        return (/** @type {?} */ (this.elementRef.nativeElement.querySelector('#' + this.id + '-filter')));
    }
    /**
     * @override
     * @protected
     * @param {?} filterElement
     * @return {?}
     */
    initWrappedElement(filterElement) {
        filterElement.init(this.dataset, this.filterService, {
            search: this.searchElement,
            visInput: this.visInputElement,
            visOutput: this.visOutputElement
        });
    }
    /**
     * @override
     * @protected
     * @return {?}
     */
    onWrapperAfterViewInit() {
        /** @type {?} */
        const filterElement = this.findWrappedElement();
        // Add event propagation listeners after the HTML elements are stable.
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, filterElement, 'valuesFiltered');
    }
    /**
     * @override
     * @protected
     * @return {?}
     */
    retrieveWrappedElementObservedAttributes() {
        return NucleusFilter.observedAttributes;
    }
    /**
     * Updates filters (creates and/or deletes) using the given values.
     * @param {?} values
     * @return {?}
     */
    updateFilteredValues(values) {
        /** @type {?} */
        const filterElement = this.findWrappedElement();
        filterElement.updateFilteredValues(values);
    }
}
NucleusFilterAngularComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-nucleus-angular-filter',
                template: FILTER_COMPONENT_TEMPLATE,
                encapsulation: ViewEncapsulation.Emulated,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
NucleusFilterAngularComponent.ctorParameters = () => [
    { type: ElementRef }
];
NucleusFilterAngularComponent.propDecorators = {
    searchElement: [{ type: Input }],
    visInputElement: [{ type: Input }],
    visOutputElement: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmFuZ3VsYXItY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbnVjbGV1cy1hbmd1bGFyLyIsInNvdXJjZXMiOlsid3JhcHBlcnMvY29yZS9maWx0ZXIuYW5ndWxhci1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdkQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1EQUFtRCxDQUFDOztNQUU1RSx5QkFBeUIsR0FBRzs7Q0FFakM7QUFRRCxNQUFNLE9BQU8sNkJBQThCLFNBQVEsNkJBQTZCOzs7O0lBSzVFLFlBQW1CLFVBQXNCO1FBQ3JDLEtBQUssRUFBRSxDQUFDO1FBRE8sZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUV6QyxDQUFDOzs7Ozs7SUFLUyxzQkFBc0I7UUFDNUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbkYsQ0FBQzs7Ozs7O0lBS1Msa0JBQWtCO1FBQ3hCLE9BQU8sbUJBQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxFQUFpQixDQUFDO0lBQ25HLENBQUM7Ozs7Ozs7SUFLUyxrQkFBa0IsQ0FBQyxhQUE0QjtRQUNyRCxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNqRCxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDMUIsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQzlCLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1NBQ25DLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUtTLHNCQUFzQjs7Y0FDdEIsYUFBYSxHQUFrQixJQUFJLENBQUMsa0JBQWtCLEVBQUU7UUFFOUQsc0VBQXNFO1FBQ3RFLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUN6RyxDQUFDOzs7Ozs7SUFLUyx3Q0FBd0M7UUFDOUMsT0FBTyxhQUFhLENBQUMsa0JBQWtCLENBQUM7SUFDNUMsQ0FBQzs7Ozs7O0lBS00sb0JBQW9CLENBQUMsTUFBaUI7O2NBQ25DLGFBQWEsR0FBa0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1FBQzlELGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7WUEvREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxRQUFRO2dCQUN6QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDs7OztZQWY0QyxVQUFVOzs7NEJBaUJsRCxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSzs7OztJQUZOLHNEQUE0Qjs7SUFDNUIsd0RBQThCOztJQUM5Qix5REFBK0I7O0lBRW5CLG1EQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTkgTmV4dCBDZW50dXJ5IENvcnBvcmF0aW9uXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvcmVVdGlsIH0gZnJvbSAnbnVjbGV1cy9kaXN0L2NvcmUvY29yZS51dGlsJztcbmltcG9ydCB7IE51Y2xldXNDb21tb25Bbmd1bGFyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21tb24uYW5ndWxhci1jb21wb25lbnQnO1xuaW1wb3J0IHsgTnVjbGV1c0ZpbHRlciB9IGZyb20gJ251Y2xldXMvZGlzdC9jb3JlL2NvbXBvbmVudHMvZmlsdGVyLndlYi1jb21wb25lbnQnO1xuXG5jb25zdCBGSUxURVJfQ09NUE9ORU5UX1RFTVBMQVRFID0gYFxuPG51Y2xldXMtZmlsdGVyIFthdHRyLmlkXT1cImlkICsgJy1maWx0ZXInXCI+PC9udWNsZXVzLWZpbHRlcj5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLW51Y2xldXMtYW5ndWxhci1maWx0ZXInLFxuICAgIHRlbXBsYXRlOiBGSUxURVJfQ09NUE9ORU5UX1RFTVBMQVRFLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE51Y2xldXNGaWx0ZXJBbmd1bGFyQ29tcG9uZW50IGV4dGVuZHMgTnVjbGV1c0NvbW1vbkFuZ3VsYXJDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHNlYXJjaEVsZW1lbnQ6IGFueTtcbiAgICBASW5wdXQoKSB2aXNJbnB1dEVsZW1lbnQ6IGFueTtcbiAgICBASW5wdXQoKSB2aXNPdXRwdXRFbGVtZW50OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBkb2VzSGF2ZVN1YmNsYXNzSW5wdXRzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISEodGhpcy5zZWFyY2hFbGVtZW50ICYmIHRoaXMudmlzSW5wdXRFbGVtZW50ICYmIHRoaXMudmlzT3V0cHV0RWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGZpbmRXcmFwcGVkRWxlbWVudCgpOiBOdWNsZXVzRmlsdGVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgdGhpcy5pZCArICctZmlsdGVyJykgYXMgTnVjbGV1c0ZpbHRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaW5pdFdyYXBwZWRFbGVtZW50KGZpbHRlckVsZW1lbnQ6IE51Y2xldXNGaWx0ZXIpOiB2b2lkIHtcbiAgICAgICAgZmlsdGVyRWxlbWVudC5pbml0KHRoaXMuZGF0YXNldCwgdGhpcy5maWx0ZXJTZXJ2aWNlLCB7XG4gICAgICAgICAgICBzZWFyY2g6IHRoaXMuc2VhcmNoRWxlbWVudCxcbiAgICAgICAgICAgIHZpc0lucHV0OiB0aGlzLnZpc0lucHV0RWxlbWVudCxcbiAgICAgICAgICAgIHZpc091dHB1dDogdGhpcy52aXNPdXRwdXRFbGVtZW50XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBvbldyYXBwZXJBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmaWx0ZXJFbGVtZW50OiBOdWNsZXVzRmlsdGVyID0gdGhpcy5maW5kV3JhcHBlZEVsZW1lbnQoKTtcblxuICAgICAgICAvLyBBZGQgZXZlbnQgcHJvcGFnYXRpb24gbGlzdGVuZXJzIGFmdGVyIHRoZSBIVE1MIGVsZW1lbnRzIGFyZSBzdGFibGUuXG4gICAgICAgIENvcmVVdGlsLmFkZEV2ZW50UHJvcGFnYXRpb25MaXN0ZW5lcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZmlsdGVyRWxlbWVudCwgJ3ZhbHVlc0ZpbHRlcmVkJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHJldHJpZXZlV3JhcHBlZEVsZW1lbnRPYnNlcnZlZEF0dHJpYnV0ZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gTnVjbGV1c0ZpbHRlci5vYnNlcnZlZEF0dHJpYnV0ZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBmaWx0ZXJzIChjcmVhdGVzIGFuZC9vciBkZWxldGVzKSB1c2luZyB0aGUgZ2l2ZW4gdmFsdWVzLlxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVGaWx0ZXJlZFZhbHVlcyh2YWx1ZXM6IGFueXxhbnlbXSk6IHZvaWQge1xuICAgICAgICBjb25zdCBmaWx0ZXJFbGVtZW50OiBOdWNsZXVzRmlsdGVyID0gdGhpcy5maW5kV3JhcHBlZEVsZW1lbnQoKTtcbiAgICAgICAgZmlsdGVyRWxlbWVudC51cGRhdGVGaWx0ZXJlZFZhbHVlcyh2YWx1ZXMpO1xuICAgIH1cbn1cbiJdfQ==