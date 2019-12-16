import { Input, Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreUtil } from 'nucleus/dist/core/core.util';
import 'nucleus/dist/core/models/dataset';
import 'nucleus/dist/core/services/filter.service';
import { __extends } from 'tslib';
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
var NucleusFilterAngularModule = /** @class */ (function () {
    function NucleusFilterAngularModule() {
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
    return NucleusFilterAngularModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/core/search.angular-component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var SEARCH_COMPONENT_TEMPLATE = "\n<nucleus-search [attr.id]=\"id + '-search'\">\n    <nucleus-aggregation *ngFor=\"let aggregation of aggregations; let i = index\" [attr.id]=\"id + '-aggregation-' + i\">\n    </nucleus-aggregation>\n    <nucleus-group *ngFor=\"let group of groups; let i = index\" [attr.id]=\"id + '-group-' + i\"></nucleus-group>\n</nucleus-search>\n";
var NucleusSearchAngularComponent = /** @class */ (function (_super) {
    __extends(NucleusSearchAngularComponent, _super);
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
var NucleusSearchAngularModule = /** @class */ (function () {
    function NucleusSearchAngularModule() {
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
    return NucleusSearchAngularModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: wrappers/text-cloud/text-cloud.angular-component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var VISUALZIATON_COMPONENT_TEMPLATE = "\n<nucleus-text-cloud [attr.id]=\"id + '-angular'\"></nucleus-text-cloud>\n";
var NucleusTextCloudAngularComponent = /** @class */ (function (_super) {
    __extends(NucleusTextCloudAngularComponent, _super);
    function NucleusTextCloudAngularComponent(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /**
     * Creates and returns the export data for the visualization.
     */
    /**
     * Creates and returns the export data for the visualization.
     * @param {?} exportFields
     * @param {?} filename
     * @return {?}
     */
    NucleusTextCloudAngularComponent.prototype.createExportData = /**
     * Creates and returns the export data for the visualization.
     * @param {?} exportFields
     * @param {?} filename
     * @return {?}
     */
    function (exportFields, filename) {
        /** @type {?} */
        var visElement = (/** @type {?} */ (this.elementRef.nativeElement.querySelector('#' + this.id + '-angular')));
        return visElement.createExportData(exportFields, filename);
    };
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @return {?}
     */
    NucleusTextCloudAngularComponent.prototype.doesHaveSubclassInputs = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        return !!this.searchService;
    };
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @return {?}
     */
    NucleusTextCloudAngularComponent.prototype.findWrappedElement = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this.elementRef.nativeElement.querySelector('#' + this.id + '-angular')));
    };
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @param {?} visElement
     * @return {?}
     */
    NucleusTextCloudAngularComponent.prototype.initWrappedElement = /**
     * @override
     * @protected
     * @param {?} visElement
     * @return {?}
     */
    function (visElement) {
        visElement.init(this.dataset, this.filterService, this.searchService);
    };
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @return {?}
     */
    NucleusTextCloudAngularComponent.prototype.onWrapperAfterViewInit = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var visElement = this.findWrappedElement();
        // Add event propagation listeners after the HTML elements are stable.
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'valuesFiltered');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchCanceled');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchFailed');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchFinished');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchLaunched');
    };
    /**
     * Redraws the visualization.
     */
    /**
     * Redraws the visualization.
     * @return {?}
     */
    NucleusTextCloudAngularComponent.prototype.redraw = /**
     * Redraws the visualization.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var visElement = (/** @type {?} */ (this.elementRef.nativeElement.querySelector('#' + this.id + '-angular')));
        visElement.redraw();
    };
    /**
     * @override
     */
    /**
     * @override
     * @protected
     * @return {?}
     */
    NucleusTextCloudAngularComponent.prototype.retrieveWrappedElementObservedAttributes = /**
     * @override
     * @protected
     * @return {?}
     */
    function () {
        return NucleusTextCloud.observedAttributes;
    };
    NucleusTextCloudAngularComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-nucleus-angular-text-cloud',
                    template: VISUALZIATON_COMPONENT_TEMPLATE,
                    encapsulation: ViewEncapsulation.Emulated,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    NucleusTextCloudAngularComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    NucleusTextCloudAngularComponent.propDecorators = {
        searchService: [{ type: Input }]
    };
    return NucleusTextCloudAngularComponent;
}(NucleusCommonAngularComponent));
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
var NucleusTextCloudAngularModule = /** @class */ (function () {
    function NucleusTextCloudAngularModule() {
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
    return NucleusTextCloudAngularModule;
}());

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
