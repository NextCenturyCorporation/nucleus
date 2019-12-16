/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/text-cloud/text-cloud.angular-component.ts
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
import { AbstractSearchService } from 'nucleus/dist/core/services/abstract.search.service';
import { CoreUtil } from 'nucleus/dist/core/core.util';
import { NucleusCommonAngularComponent } from '../core/common.angular-component';
import { NucleusTextCloud } from 'nucleus/dist/visualizations/text-cloud/text-cloud.web-component';
/** @type {?} */
const VISUALZIATON_COMPONENT_TEMPLATE = `
<nucleus-text-cloud [attr.id]="id + '-angular'"></nucleus-text-cloud>
`;
export class NucleusTextCloudAngularComponent extends NucleusCommonAngularComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
    }
    /**
     * Creates and returns the export data for the visualization.
     * @param {?} exportFields
     * @param {?} filename
     * @return {?}
     */
    createExportData(exportFields, filename) {
        /** @type {?} */
        const visElement = (/** @type {?} */ (this.elementRef.nativeElement.querySelector('#' + this.id + '-angular')));
        return visElement.createExportData(exportFields, filename);
    }
    /**
     * @override
     * @protected
     * @return {?}
     */
    doesHaveSubclassInputs() {
        return !!this.searchService;
    }
    /**
     * @override
     * @protected
     * @return {?}
     */
    findWrappedElement() {
        return (/** @type {?} */ (this.elementRef.nativeElement.querySelector('#' + this.id + '-angular')));
    }
    /**
     * @override
     * @protected
     * @param {?} visElement
     * @return {?}
     */
    initWrappedElement(visElement) {
        visElement.init(this.dataset, this.filterService, this.searchService);
    }
    /**
     * @override
     * @protected
     * @return {?}
     */
    onWrapperAfterViewInit() {
        /** @type {?} */
        const visElement = this.findWrappedElement();
        // Add event propagation listeners after the HTML elements are stable.
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'valuesFiltered');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchCanceled');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchFailed');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchFinished');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchLaunched');
    }
    /**
     * Redraws the visualization.
     * @return {?}
     */
    redraw() {
        /** @type {?} */
        const visElement = (/** @type {?} */ (this.elementRef.nativeElement.querySelector('#' + this.id + '-angular')));
        visElement.redraw();
    }
    /**
     * @override
     * @protected
     * @return {?}
     */
    retrieveWrappedElementObservedAttributes() {
        return NucleusTextCloud.observedAttributes;
    }
}
NucleusTextCloudAngularComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-nucleus-angular-text-cloud',
                template: VISUALZIATON_COMPONENT_TEMPLATE,
                encapsulation: ViewEncapsulation.Emulated,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
NucleusTextCloudAngularComponent.ctorParameters = () => [
    { type: ElementRef }
];
NucleusTextCloudAngularComponent.propDecorators = {
    searchService: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NucleusTextCloudAngularComponent.prototype.searchService;
    /** @type {?} */
    NucleusTextCloudAngularComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1jbG91ZC5hbmd1bGFyLWNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL251Y2xldXMtYW5ndWxhci8iLCJzb3VyY2VzIjpbIndyYXBwZXJzL3RleHQtY2xvdWQvdGV4dC1jbG91ZC5hbmd1bGFyLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpRUFBaUUsQ0FBQzs7TUFFN0YsK0JBQStCLEdBQUc7O0NBRXZDO0FBUUQsTUFBTSxPQUFPLGdDQUFpQyxTQUFRLDZCQUE2Qjs7OztJQUcvRSxZQUFtQixVQUFzQjtRQUNyQyxLQUFLLEVBQUUsQ0FBQztRQURPLGVBQVUsR0FBVixVQUFVLENBQVk7SUFFekMsQ0FBQzs7Ozs7OztJQUtNLGdCQUFnQixDQUFDLFlBQTBELEVBQUUsUUFBZ0I7O2NBQzFGLFVBQVUsR0FBRyxtQkFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLEVBQW9CO1FBQzlHLE9BQU8sVUFBVSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7Ozs7SUFLUyxzQkFBc0I7UUFDNUIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFLUyxrQkFBa0I7UUFDeEIsT0FBTyxtQkFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLEVBQW9CLENBQUM7SUFDdkcsQ0FBQzs7Ozs7OztJQUtTLGtCQUFrQixDQUFDLFVBQTRCO1FBQ3JELFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMxRSxDQUFDOzs7Ozs7SUFLUyxzQkFBc0I7O2NBQ3RCLFVBQVUsR0FBcUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1FBRTlELHNFQUFzRTtRQUN0RSxRQUFRLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDbEcsUUFBUSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xHLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDaEcsUUFBUSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xHLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUN0RyxDQUFDOzs7OztJQUtNLE1BQU07O2NBQ0gsVUFBVSxHQUFHLG1CQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsRUFBb0I7UUFDOUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7OztJQUtTLHdDQUF3QztRQUM5QyxPQUFPLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDO0lBQy9DLENBQUM7OztZQXJFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdDQUFnQztnQkFDMUMsUUFBUSxFQUFFLCtCQUErQjtnQkFDekMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLFFBQVE7Z0JBQ3pDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2xEOzs7O1lBaEI0QyxVQUFVOzs7NEJBa0JsRCxLQUFLOzs7O0lBQU4seURBQThDOztJQUVsQyxzREFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE5IE5leHQgQ2VudHVyeSBDb3Jwb3JhdGlvblxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBYnN0cmFjdFNlYXJjaFNlcnZpY2UgfSBmcm9tICdudWNsZXVzL2Rpc3QvY29yZS9zZXJ2aWNlcy9hYnN0cmFjdC5zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBDb3JlVXRpbCB9IGZyb20gJ251Y2xldXMvZGlzdC9jb3JlL2NvcmUudXRpbCc7XG5pbXBvcnQgeyBOdWNsZXVzQ29tbW9uQW5ndWxhckNvbXBvbmVudCB9IGZyb20gJy4uL2NvcmUvY29tbW9uLmFuZ3VsYXItY29tcG9uZW50JztcbmltcG9ydCB7IE51Y2xldXNUZXh0Q2xvdWQgfSBmcm9tICdudWNsZXVzL2Rpc3QvdmlzdWFsaXphdGlvbnMvdGV4dC1jbG91ZC90ZXh0LWNsb3VkLndlYi1jb21wb25lbnQnO1xuXG5jb25zdCBWSVNVQUxaSUFUT05fQ09NUE9ORU5UX1RFTVBMQVRFID0gYFxuPG51Y2xldXMtdGV4dC1jbG91ZCBbYXR0ci5pZF09XCJpZCArICctYW5ndWxhcidcIj48L251Y2xldXMtdGV4dC1jbG91ZD5cbmA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLW51Y2xldXMtYW5ndWxhci10ZXh0LWNsb3VkJyxcbiAgICB0ZW1wbGF0ZTogVklTVUFMWklBVE9OX0NPTVBPTkVOVF9URU1QTEFURSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOdWNsZXVzVGV4dENsb3VkQW5ndWxhckNvbXBvbmVudCBleHRlbmRzIE51Y2xldXNDb21tb25Bbmd1bGFyQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBzZWFyY2hTZXJ2aWNlOiBBYnN0cmFjdFNlYXJjaFNlcnZpY2U7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgdGhlIGV4cG9ydCBkYXRhIGZvciB0aGUgdmlzdWFsaXphdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlRXhwb3J0RGF0YShleHBvcnRGaWVsZHM6IHsgY29sdW1uTmFtZTogc3RyaW5nLCBwcmV0dHlOYW1lOiBzdHJpbmcgfVtdLCBmaWxlbmFtZTogc3RyaW5nKTogeyBuYW1lOiBzdHJpbmcsIGRhdGE6IGFueSB9W10ge1xuICAgICAgICBjb25zdCB2aXNFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignIycgKyB0aGlzLmlkICsgJy1hbmd1bGFyJykgYXMgTnVjbGV1c1RleHRDbG91ZDtcbiAgICAgICAgcmV0dXJuIHZpc0VsZW1lbnQuY3JlYXRlRXhwb3J0RGF0YShleHBvcnRGaWVsZHMsIGZpbGVuYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZG9lc0hhdmVTdWJjbGFzc0lucHV0cygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zZWFyY2hTZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBmaW5kV3JhcHBlZEVsZW1lbnQoKTogTnVjbGV1c1RleHRDbG91ZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIHRoaXMuaWQgKyAnLWFuZ3VsYXInKSBhcyBOdWNsZXVzVGV4dENsb3VkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBpbml0V3JhcHBlZEVsZW1lbnQodmlzRWxlbWVudDogTnVjbGV1c1RleHRDbG91ZCk6IHZvaWQge1xuICAgICAgICB2aXNFbGVtZW50LmluaXQodGhpcy5kYXRhc2V0LCB0aGlzLmZpbHRlclNlcnZpY2UsIHRoaXMuc2VhcmNoU2VydmljZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG9uV3JhcHBlckFmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHZpc0VsZW1lbnQ6IE51Y2xldXNUZXh0Q2xvdWQgPSB0aGlzLmZpbmRXcmFwcGVkRWxlbWVudCgpO1xuXG4gICAgICAgIC8vIEFkZCBldmVudCBwcm9wYWdhdGlvbiBsaXN0ZW5lcnMgYWZ0ZXIgdGhlIEhUTUwgZWxlbWVudHMgYXJlIHN0YWJsZS5cbiAgICAgICAgQ29yZVV0aWwuYWRkRXZlbnRQcm9wYWdhdGlvbkxpc3RlbmVyKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB2aXNFbGVtZW50LCAndmFsdWVzRmlsdGVyZWQnKTtcbiAgICAgICAgQ29yZVV0aWwuYWRkRXZlbnRQcm9wYWdhdGlvbkxpc3RlbmVyKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB2aXNFbGVtZW50LCAnc2VhcmNoQ2FuY2VsZWQnKTtcbiAgICAgICAgQ29yZVV0aWwuYWRkRXZlbnRQcm9wYWdhdGlvbkxpc3RlbmVyKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB2aXNFbGVtZW50LCAnc2VhcmNoRmFpbGVkJyk7XG4gICAgICAgIENvcmVVdGlsLmFkZEV2ZW50UHJvcGFnYXRpb25MaXN0ZW5lcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdmlzRWxlbWVudCwgJ3NlYXJjaEZpbmlzaGVkJyk7XG4gICAgICAgIENvcmVVdGlsLmFkZEV2ZW50UHJvcGFnYXRpb25MaXN0ZW5lcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdmlzRWxlbWVudCwgJ3NlYXJjaExhdW5jaGVkJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVkcmF3cyB0aGUgdmlzdWFsaXphdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgcmVkcmF3KCk6IHZvaWQge1xuICAgICAgICBjb25zdCB2aXNFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignIycgKyB0aGlzLmlkICsgJy1hbmd1bGFyJykgYXMgTnVjbGV1c1RleHRDbG91ZDtcbiAgICAgICAgdmlzRWxlbWVudC5yZWRyYXcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcmV0cmlldmVXcmFwcGVkRWxlbWVudE9ic2VydmVkQXR0cmlidXRlcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBOdWNsZXVzVGV4dENsb3VkLm9ic2VydmVkQXR0cmlidXRlcztcbiAgICB9XG59XG4iXX0=