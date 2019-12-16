/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/core/common.angular-component.ts
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
import { Input } from '@angular/core';
import { CoreUtil } from 'nucleus/dist/core/core.util';
import { Dataset } from 'nucleus/dist/core/models/dataset';
import { FilterService } from 'nucleus/dist/core/services/filter.service';
/**
 * @abstract
 */
export class NucleusCommonAngularComponent {
    constructor() {
        this._visualizationIsInitialized = false;
    }
    /**
     * @protected
     * @return {?}
     */
    doesHaveSubclassInputs() {
        return true;
    }
    /**
     * @protected
     * @return {?}
     */
    onWrapperAfterViewInit() {
        // Override if needed.
    }
    /**
     * @protected
     * @return {?}
     */
    onWrapperChanges() {
        // Override if needed.
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.onWrapperAfterViewInit();
        // Call ngOnChanges to initialize the visualization if needed after the HTML elements are stable.
        this.ngOnChanges(undefined);
    }
    /**
     * @param {?} __changes
     * @return {?}
     */
    ngOnChanges(__changes) {
        // Ensure ALL required properties are set before calling init on the visualization.
        if (this.id && this.dataset && this.filterService && this.options && this.doesHaveSubclassInputs()) {
            /** @type {?} */
            const wrappedElement = this.findWrappedElement();
            this.options.id = wrappedElement.getAttribute('id');
            if (wrappedElement) {
                CoreUtil.updateElementAttributes(wrappedElement, this.retrieveWrappedElementObservedAttributes(), this.options);
                this.onWrapperChanges();
                if (!this._visualizationIsInitialized) {
                    this.initWrappedElement(wrappedElement);
                    this._visualizationIsInitialized = true;
                }
            }
        }
    }
}
NucleusCommonAngularComponent.propDecorators = {
    dataset: [{ type: Input }],
    filterService: [{ type: Input }],
    id: [{ type: Input }],
    options: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NucleusCommonAngularComponent.prototype.dataset;
    /** @type {?} */
    NucleusCommonAngularComponent.prototype.filterService;
    /** @type {?} */
    NucleusCommonAngularComponent.prototype.id;
    /** @type {?} */
    NucleusCommonAngularComponent.prototype.options;
    /**
     * @type {?}
     * @private
     */
    NucleusCommonAngularComponent.prototype._visualizationIsInitialized;
    /**
     * @abstract
     * @protected
     * @return {?}
     */
    NucleusCommonAngularComponent.prototype.findWrappedElement = function () { };
    /**
     * @abstract
     * @protected
     * @param {?} element
     * @return {?}
     */
    NucleusCommonAngularComponent.prototype.initWrappedElement = function (element) { };
    /**
     * @abstract
     * @protected
     * @return {?}
     */
    NucleusCommonAngularComponent.prototype.retrieveWrappedElementObservedAttributes = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmFuZ3VsYXItY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbnVjbGV1cy1hbmd1bGFyLyIsInNvdXJjZXMiOlsid3JhcHBlcnMvY29yZS9jb21tb24uYW5ndWxhci1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBLE9BQU8sRUFBNkIsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRTVFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOzs7O0FBRTFFLE1BQU0sT0FBZ0IsNkJBQTZCO0lBUS9DO1FBRlEsZ0NBQTJCLEdBQVksS0FBSyxDQUFDO0lBRXRDLENBQUM7Ozs7O0lBRU4sc0JBQXNCO1FBQzVCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBTVMsc0JBQXNCO1FBQzVCLHNCQUFzQjtJQUMxQixDQUFDOzs7OztJQUVTLGdCQUFnQjtRQUN0QixzQkFBc0I7SUFDMUIsQ0FBQzs7OztJQUlELGVBQWU7UUFDWCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUU5QixpR0FBaUc7UUFDakcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxTQUFTO1FBQ2pCLG1GQUFtRjtRQUNuRixJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFLEVBQUU7O2tCQUMxRixjQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEQsSUFBSSxjQUFjLEVBQUU7Z0JBQ2hCLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLHdDQUF3QyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUVoSCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFFeEIsSUFBSSxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxDQUFDO2lCQUMzQzthQUNKO1NBQ0o7SUFDTCxDQUFDOzs7c0JBbERBLEtBQUs7NEJBQ0wsS0FBSztpQkFDTCxLQUFLO3NCQUNMLEtBQUs7Ozs7SUFITixnREFBMEI7O0lBQzFCLHNEQUFzQzs7SUFDdEMsMkNBQW9COztJQUNwQixnREFBc0M7Ozs7O0lBRXRDLG9FQUFxRDs7Ozs7O0lBUXJELDZFQUFxRDs7Ozs7OztJQUVyRCxvRkFBa0U7Ozs7OztJQVVsRSxtR0FBd0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE5IE5leHQgQ2VudHVyeSBDb3Jwb3JhdGlvblxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29yZVV0aWwgfSBmcm9tICdudWNsZXVzL2Rpc3QvY29yZS9jb3JlLnV0aWwnO1xuaW1wb3J0IHsgRGF0YXNldCB9IGZyb20gJ251Y2xldXMvZGlzdC9jb3JlL21vZGVscy9kYXRhc2V0JztcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICdudWNsZXVzL2Rpc3QvY29yZS9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOdWNsZXVzQ29tbW9uQW5ndWxhckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgZGF0YXNldDogRGF0YXNldDtcbiAgICBASW5wdXQoKSBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlO1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55PjtcblxuICAgIHByaXZhdGUgX3Zpc3VhbGl6YXRpb25Jc0luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwcm90ZWN0ZWQgZG9lc0hhdmVTdWJjbGFzc0lucHV0cygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGZpbmRXcmFwcGVkRWxlbWVudCgpOiBIVE1MRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBpbml0V3JhcHBlZEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIG9uV3JhcHBlckFmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIE92ZXJyaWRlIGlmIG5lZWRlZC5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25XcmFwcGVyQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgLy8gT3ZlcnJpZGUgaWYgbmVlZGVkLlxuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCByZXRyaWV2ZVdyYXBwZWRFbGVtZW50T2JzZXJ2ZWRBdHRyaWJ1dGVzKCk6IHN0cmluZ1tdO1xuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLm9uV3JhcHBlckFmdGVyVmlld0luaXQoKTtcblxuICAgICAgICAvLyBDYWxsIG5nT25DaGFuZ2VzIHRvIGluaXRpYWxpemUgdGhlIHZpc3VhbGl6YXRpb24gaWYgbmVlZGVkIGFmdGVyIHRoZSBIVE1MIGVsZW1lbnRzIGFyZSBzdGFibGUuXG4gICAgICAgIHRoaXMubmdPbkNoYW5nZXModW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhfX2NoYW5nZXMpIHtcbiAgICAgICAgLy8gRW5zdXJlIEFMTCByZXF1aXJlZCBwcm9wZXJ0aWVzIGFyZSBzZXQgYmVmb3JlIGNhbGxpbmcgaW5pdCBvbiB0aGUgdmlzdWFsaXphdGlvbi5cbiAgICAgICAgaWYgKHRoaXMuaWQgJiYgdGhpcy5kYXRhc2V0ICYmIHRoaXMuZmlsdGVyU2VydmljZSAmJiB0aGlzLm9wdGlvbnMgJiYgdGhpcy5kb2VzSGF2ZVN1YmNsYXNzSW5wdXRzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZWRFbGVtZW50ID0gdGhpcy5maW5kV3JhcHBlZEVsZW1lbnQoKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pZCA9IHdyYXBwZWRFbGVtZW50LmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgICAgIGlmICh3cmFwcGVkRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIENvcmVVdGlsLnVwZGF0ZUVsZW1lbnRBdHRyaWJ1dGVzKHdyYXBwZWRFbGVtZW50LCB0aGlzLnJldHJpZXZlV3JhcHBlZEVsZW1lbnRPYnNlcnZlZEF0dHJpYnV0ZXMoKSwgdGhpcy5vcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25XcmFwcGVyQ2hhbmdlcygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl92aXN1YWxpemF0aW9uSXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRXcmFwcGVkRWxlbWVudCh3cmFwcGVkRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Zpc3VhbGl6YXRpb25Jc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=