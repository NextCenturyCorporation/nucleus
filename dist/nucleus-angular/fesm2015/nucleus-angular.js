import { Input, Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreUtil } from 'nucleus/dist/core/core.util';
import 'nucleus/dist/core/models/dataset';
import 'nucleus/dist/core/services/filter.service';
import { NucleusFilter } from 'nucleus/dist/core/components/filter.web-component';
import { CommonModule } from '@angular/common';
import 'nucleus/dist/core/services/abstract.search.service';
import { NucleusAggregation } from 'nucleus/dist/core/components/aggregation.web-component';
import { NucleusGroup } from 'nucleus/dist/core/components/group.web-component';
import { NucleusSearch } from 'nucleus/dist/core/components/search.web-component';
import { NucleusTextCloud } from 'nucleus/dist/visualizations/text-cloud/text-cloud.web-component';

/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/core/common.angular-component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class NucleusCommonAngularComponent {
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

/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/core/filter.angular-component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FILTER_COMPONENT_TEMPLATE = `
<nucleus-filter [attr.id]="id + '-filter'"></nucleus-filter>
`;
class NucleusFilterAngularComponent extends NucleusCommonAngularComponent {
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

/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/core/filter.angular-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NucleusFilterAngularModule {
}
NucleusFilterAngularModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NucleusFilterAngularComponent],
                exports: [NucleusFilterAngularComponent],
                entryComponents: [NucleusFilterAngularComponent],
                imports: [
                    CommonModule
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/core/search.angular-component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const SEARCH_COMPONENT_TEMPLATE = `
<nucleus-search [attr.id]="id + '-search'">
    <nucleus-aggregation *ngFor="let aggregation of aggregations; let i = index" [attr.id]="id + '-aggregation-' + i">
    </nucleus-aggregation>
    <nucleus-group *ngFor="let group of groups; let i = index" [attr.id]="id + '-group-' + i"></nucleus-group>
</nucleus-search>
`;
class NucleusSearchAngularComponent extends NucleusCommonAngularComponent {
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
        return !!(this.searchService && this.visInputElement);
    }
    /**
     * @override
     * @protected
     * @return {?}
     */
    findWrappedElement() {
        return (/** @type {?} */ (this.elementRef.nativeElement.querySelector('#' + this.id + '-search')));
    }
    /**
     * @override
     * @protected
     * @param {?} searchElement
     * @return {?}
     */
    initWrappedElement(searchElement) {
        searchElement.init(this.dataset, this.filterService, this.searchService, {
            visInput: this.visInputElement
        });
    }
    /**
     * @override
     * @protected
     * @return {?}
     */
    onWrapperAfterViewInit() {
        /** @type {?} */
        const searchElement = this.findWrappedElement();
        // Add event propagation listeners after the HTML elements are stable.
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchCanceled');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchFailed');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchFinished');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchLaunched');
    }
    /**
     * @override
     * @protected
     * @return {?}
     */
    onWrapperChanges() {
        if (this.aggregations) {
            this.aggregations.forEach((/**
             * @param {?} aggregationOptions
             * @param {?} index
             * @return {?}
             */
            (aggregationOptions, index) => {
                /** @type {?} */
                const aggregationElement = (/** @type {?} */ (this.elementRef.nativeElement.querySelector('#' + this.id + '-aggregation-' +
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
            (groupOptions, index) => {
                /** @type {?} */
                const groupElement = (/** @type {?} */ (this.elementRef.nativeElement.querySelector('#' + this.id + '-group-' +
                    index)));
                if (groupElement) {
                    CoreUtil.updateElementAttributes(groupElement, NucleusGroup.observedAttributes, groupOptions);
                }
            }));
        }
    }
    /**
     * @override
     * @protected
     * @return {?}
     */
    retrieveWrappedElementObservedAttributes() {
        return NucleusSearch.observedAttributes;
    }
    /**
     * Runs the search query using the current attributes and filters.  Only call this function if you want to manually trigger a requery.
     * @param {?} id
     * @param {?} filters
     * @return {?}
     */
    runQuery(id, filters) {
        /** @type {?} */
        const searchElement = this.findWrappedElement();
        searchElement.runQuery();
    }
    /**
     * Updates the unshared filters of this search element with the given filters.
     * @param {?} id
     * @param {?} filters
     * @return {?}
     */
    updateFilters(id, filters) {
        /** @type {?} */
        const searchElement = this.findWrappedElement();
        searchElement.updateFilters(id, filters);
    }
    /**
     * Updates the filter designs of this search element (used to find shared filters) with the given filter designs.
     * @param {?} id
     * @param {?} filterDesigns
     * @return {?}
     */
    updateFilterDesigns(id, filterDesigns) {
        /** @type {?} */
        const searchElement = this.findWrappedElement();
        searchElement.updateFilterDesigns(id, filterDesigns);
    }
}
NucleusSearchAngularComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-nucleus-angular-search',
                template: SEARCH_COMPONENT_TEMPLATE,
                encapsulation: ViewEncapsulation.Emulated,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
NucleusSearchAngularComponent.ctorParameters = () => [
    { type: ElementRef }
];
NucleusSearchAngularComponent.propDecorators = {
    aggregations: [{ type: Input }],
    groups: [{ type: Input }],
    options: [{ type: Input }],
    searchService: [{ type: Input }],
    visInputElement: [{ type: Input }]
};
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

/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/core/search.angular-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NucleusSearchAngularModule {
}
NucleusSearchAngularModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NucleusSearchAngularComponent],
                exports: [NucleusSearchAngularComponent],
                entryComponents: [NucleusSearchAngularComponent],
                imports: [
                    CommonModule
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/text-cloud/text-cloud.angular-component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const VISUALZIATON_COMPONENT_TEMPLATE = `
<nucleus-text-cloud [attr.id]="id + '-angular'"></nucleus-text-cloud>
`;
class NucleusTextCloudAngularComponent extends NucleusCommonAngularComponent {
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

/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/text-cloud/text-cloud.angular-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NucleusTextCloudAngularModule {
}
NucleusTextCloudAngularModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NucleusTextCloudAngularComponent],
                exports: [NucleusTextCloudAngularComponent],
                entryComponents: [NucleusTextCloudAngularComponent],
                imports: [
                    CommonModule
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: nucleus-angular.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NucleusCommonAngularComponent, NucleusFilterAngularComponent, NucleusFilterAngularModule, NucleusSearchAngularComponent, NucleusSearchAngularModule, NucleusTextCloudAngularComponent, NucleusTextCloudAngularModule };
//# sourceMappingURL=nucleus-angular.js.map
