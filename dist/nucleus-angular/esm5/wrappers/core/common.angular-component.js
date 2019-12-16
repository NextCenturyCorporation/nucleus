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
var NucleusCommonAngularComponent = /** @class */ (function () {
    function NucleusCommonAngularComponent() {
        this._visualizationIsInitialized = false;
    }
    /**
     * @protected
     * @return {?}
     */
    NucleusCommonAngularComponent.prototype.doesHaveSubclassInputs = /**
     * @protected
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * @protected
     * @return {?}
     */
    NucleusCommonAngularComponent.prototype.onWrapperAfterViewInit = /**
     * @protected
     * @return {?}
     */
    function () {
        // Override if needed.
    };
    /**
     * @protected
     * @return {?}
     */
    NucleusCommonAngularComponent.prototype.onWrapperChanges = /**
     * @protected
     * @return {?}
     */
    function () {
        // Override if needed.
    };
    /**
     * @return {?}
     */
    NucleusCommonAngularComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.onWrapperAfterViewInit();
        // Call ngOnChanges to initialize the visualization if needed after the HTML elements are stable.
        this.ngOnChanges(undefined);
    };
    /**
     * @param {?} __changes
     * @return {?}
     */
    NucleusCommonAngularComponent.prototype.ngOnChanges = /**
     * @param {?} __changes
     * @return {?}
     */
    function (__changes) {
        // Ensure ALL required properties are set before calling init on the visualization.
        if (this.id && this.dataset && this.filterService && this.options && this.doesHaveSubclassInputs()) {
            /** @type {?} */
            var wrappedElement = this.findWrappedElement();
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
    };
    NucleusCommonAngularComponent.propDecorators = {
        dataset: [{ type: Input }],
        filterService: [{ type: Input }],
        id: [{ type: Input }],
        options: [{ type: Input }]
    };
    return NucleusCommonAngularComponent;
}());
export { NucleusCommonAngularComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmFuZ3VsYXItY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbnVjbGV1cy1hbmd1bGFyLyIsInNvdXJjZXMiOlsid3JhcHBlcnMvY29yZS9jb21tb24uYW5ndWxhci1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBLE9BQU8sRUFBNkIsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRTVFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOzs7O0FBRTFFO0lBUUk7UUFGUSxnQ0FBMkIsR0FBWSxLQUFLLENBQUM7SUFFdEMsQ0FBQzs7Ozs7SUFFTiw4REFBc0I7Ozs7SUFBaEM7UUFDSSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7OztJQU1TLDhEQUFzQjs7OztJQUFoQztRQUNJLHNCQUFzQjtJQUMxQixDQUFDOzs7OztJQUVTLHdEQUFnQjs7OztJQUExQjtRQUNJLHNCQUFzQjtJQUMxQixDQUFDOzs7O0lBSUQsdURBQWU7OztJQUFmO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFFOUIsaUdBQWlHO1FBQ2pHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxtREFBVzs7OztJQUFYLFVBQVksU0FBUztRQUNqQixtRkFBbUY7UUFDbkYsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxFQUFFOztnQkFDMUYsY0FBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BELElBQUksY0FBYyxFQUFFO2dCQUNoQixRQUFRLENBQUMsdUJBQXVCLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyx3Q0FBd0MsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFaEgsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBRXhCLElBQUksQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksQ0FBQztpQkFDM0M7YUFDSjtTQUNKO0lBQ0wsQ0FBQzs7MEJBbERBLEtBQUs7Z0NBQ0wsS0FBSztxQkFDTCxLQUFLOzBCQUNMLEtBQUs7O0lBZ0RWLG9DQUFDO0NBQUEsQUFwREQsSUFvREM7U0FwRHFCLDZCQUE2Qjs7O0lBQy9DLGdEQUEwQjs7SUFDMUIsc0RBQXNDOztJQUN0QywyQ0FBb0I7O0lBQ3BCLGdEQUFzQzs7Ozs7SUFFdEMsb0VBQXFEOzs7Ozs7SUFRckQsNkVBQXFEOzs7Ozs7O0lBRXJELG9GQUFrRTs7Ozs7O0lBVWxFLG1HQUF3RSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTkgTmV4dCBDZW50dXJ5IENvcnBvcmF0aW9uXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb3JlVXRpbCB9IGZyb20gJ251Y2xldXMvZGlzdC9jb3JlL2NvcmUudXRpbCc7XG5pbXBvcnQgeyBEYXRhc2V0IH0gZnJvbSAnbnVjbGV1cy9kaXN0L2NvcmUvbW9kZWxzL2RhdGFzZXQnO1xuaW1wb3J0IHsgRmlsdGVyU2VydmljZSB9IGZyb20gJ251Y2xldXMvZGlzdC9jb3JlL3NlcnZpY2VzL2ZpbHRlci5zZXJ2aWNlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE51Y2xldXNDb21tb25Bbmd1bGFyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBkYXRhc2V0OiBEYXRhc2V0O1xuICAgIEBJbnB1dCgpIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2U7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuXG4gICAgcHJpdmF0ZSBfdmlzdWFsaXphdGlvbklzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHByb3RlY3RlZCBkb2VzSGF2ZVN1YmNsYXNzSW5wdXRzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZmluZFdyYXBwZWRFbGVtZW50KCk6IEhUTUxFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGluaXRXcmFwcGVkRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgb25XcmFwcGVyQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gT3ZlcnJpZGUgaWYgbmVlZGVkLlxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbldyYXBwZXJDaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICAvLyBPdmVycmlkZSBpZiBuZWVkZWQuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHJldHJpZXZlV3JhcHBlZEVsZW1lbnRPYnNlcnZlZEF0dHJpYnV0ZXMoKTogc3RyaW5nW107XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMub25XcmFwcGVyQWZ0ZXJWaWV3SW5pdCgpO1xuXG4gICAgICAgIC8vIENhbGwgbmdPbkNoYW5nZXMgdG8gaW5pdGlhbGl6ZSB0aGUgdmlzdWFsaXphdGlvbiBpZiBuZWVkZWQgYWZ0ZXIgdGhlIEhUTUwgZWxlbWVudHMgYXJlIHN0YWJsZS5cbiAgICAgICAgdGhpcy5uZ09uQ2hhbmdlcyh1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKF9fY2hhbmdlcykge1xuICAgICAgICAvLyBFbnN1cmUgQUxMIHJlcXVpcmVkIHByb3BlcnRpZXMgYXJlIHNldCBiZWZvcmUgY2FsbGluZyBpbml0IG9uIHRoZSB2aXN1YWxpemF0aW9uLlxuICAgICAgICBpZiAodGhpcy5pZCAmJiB0aGlzLmRhdGFzZXQgJiYgdGhpcy5maWx0ZXJTZXJ2aWNlICYmIHRoaXMub3B0aW9ucyAmJiB0aGlzLmRvZXNIYXZlU3ViY2xhc3NJbnB1dHMoKSkge1xuICAgICAgICAgICAgY29uc3Qgd3JhcHBlZEVsZW1lbnQgPSB0aGlzLmZpbmRXcmFwcGVkRWxlbWVudCgpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmlkID0gd3JhcHBlZEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgICAgICAgaWYgKHdyYXBwZWRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgQ29yZVV0aWwudXBkYXRlRWxlbWVudEF0dHJpYnV0ZXMod3JhcHBlZEVsZW1lbnQsIHRoaXMucmV0cmlldmVXcmFwcGVkRWxlbWVudE9ic2VydmVkQXR0cmlidXRlcygpLCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vbldyYXBwZXJDaGFuZ2VzKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3Zpc3VhbGl6YXRpb25Jc0luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFdyYXBwZWRFbGVtZW50KHdyYXBwZWRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlzdWFsaXphdGlvbklzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==