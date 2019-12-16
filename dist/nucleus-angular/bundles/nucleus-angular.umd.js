(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('nucleus/dist/core/core.util'), require('nucleus/dist/core/models/dataset'), require('nucleus/dist/core/services/filter.service'), require('nucleus/dist/core/components/filter.web-component'), require('@angular/common'), require('nucleus/dist/core/services/abstract.search.service'), require('nucleus/dist/core/components/aggregation.web-component'), require('nucleus/dist/core/components/group.web-component'), require('nucleus/dist/core/components/search.web-component'), require('nucleus/dist/visualizations/text-cloud/text-cloud.web-component')) :
    typeof define === 'function' && define.amd ? define('nucleus-angular', ['exports', '@angular/core', 'nucleus/dist/core/core.util', 'nucleus/dist/core/models/dataset', 'nucleus/dist/core/services/filter.service', 'nucleus/dist/core/components/filter.web-component', '@angular/common', 'nucleus/dist/core/services/abstract.search.service', 'nucleus/dist/core/components/aggregation.web-component', 'nucleus/dist/core/components/group.web-component', 'nucleus/dist/core/components/search.web-component', 'nucleus/dist/visualizations/text-cloud/text-cloud.web-component'], factory) :
    (global = global || self, factory(global['nucleus-angular'] = {}, global.ng.core, global.core_util, null, null, global.filter_webComponent, global.ng.common, null, global.aggregation_webComponent, global.group_webComponent, global.search_webComponent, global.textCloud_webComponent));
}(this, (function (exports, core, core_util, dataset, filter_service, filter_webComponent, common, abstract_search_service, aggregation_webComponent, group_webComponent, search_webComponent, textCloud_webComponent) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

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
                    core_util.CoreUtil.updateElementAttributes(wrappedElement, this.retrieveWrappedElementObservedAttributes(), this.options);
                    this.onWrapperChanges();
                    if (!this._visualizationIsInitialized) {
                        this.initWrappedElement(wrappedElement);
                        this._visualizationIsInitialized = true;
                    }
                }
            }
        };
        NucleusCommonAngularComponent.propDecorators = {
            dataset: [{ type: core.Input }],
            filterService: [{ type: core.Input }],
            id: [{ type: core.Input }],
            options: [{ type: core.Input }]
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
            core_util.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, filterElement, 'valuesFiltered');
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
            return filter_webComponent.NucleusFilter.observedAttributes;
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
            { type: core.Component, args: [{
                        selector: 'app-nucleus-angular-filter',
                        template: FILTER_COMPONENT_TEMPLATE,
                        encapsulation: core.ViewEncapsulation.Emulated,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        NucleusFilterAngularComponent.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        NucleusFilterAngularComponent.propDecorators = {
            searchElement: [{ type: core.Input }],
            visInputElement: [{ type: core.Input }],
            visOutputElement: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NucleusFilterAngularComponent],
                        exports: [NucleusFilterAngularComponent],
                        entryComponents: [NucleusFilterAngularComponent],
                        imports: [
                            common.CommonModule
                        ],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
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
            core_util.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchCanceled');
            core_util.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchFailed');
            core_util.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchFinished');
            core_util.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchLaunched');
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
                        core_util.CoreUtil.updateElementAttributes(aggregationElement, aggregation_webComponent.NucleusAggregation.observedAttributes, aggregationOptions);
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
                        core_util.CoreUtil.updateElementAttributes(groupElement, group_webComponent.NucleusGroup.observedAttributes, groupOptions);
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
            return search_webComponent.NucleusSearch.observedAttributes;
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
            { type: core.Component, args: [{
                        selector: 'app-nucleus-angular-search',
                        template: SEARCH_COMPONENT_TEMPLATE,
                        encapsulation: core.ViewEncapsulation.Emulated,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        NucleusSearchAngularComponent.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        NucleusSearchAngularComponent.propDecorators = {
            aggregations: [{ type: core.Input }],
            groups: [{ type: core.Input }],
            options: [{ type: core.Input }],
            searchService: [{ type: core.Input }],
            visInputElement: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NucleusSearchAngularComponent],
                        exports: [NucleusSearchAngularComponent],
                        entryComponents: [NucleusSearchAngularComponent],
                        imports: [
                            common.CommonModule
                        ],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
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
            core_util.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'valuesFiltered');
            core_util.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchCanceled');
            core_util.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchFailed');
            core_util.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchFinished');
            core_util.CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchLaunched');
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
            return textCloud_webComponent.NucleusTextCloud.observedAttributes;
        };
        NucleusTextCloudAngularComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'app-nucleus-angular-text-cloud',
                        template: VISUALZIATON_COMPONENT_TEMPLATE,
                        encapsulation: core.ViewEncapsulation.Emulated,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        NucleusTextCloudAngularComponent.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        NucleusTextCloudAngularComponent.propDecorators = {
            searchService: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        declarations: [NucleusTextCloudAngularComponent],
                        exports: [NucleusTextCloudAngularComponent],
                        entryComponents: [NucleusTextCloudAngularComponent],
                        imports: [
                            common.CommonModule
                        ],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return NucleusTextCloudAngularModule;
    }());

    exports.NucleusCommonAngularComponent = NucleusCommonAngularComponent;
    exports.NucleusFilterAngularComponent = NucleusFilterAngularComponent;
    exports.NucleusFilterAngularModule = NucleusFilterAngularModule;
    exports.NucleusSearchAngularComponent = NucleusSearchAngularComponent;
    exports.NucleusSearchAngularModule = NucleusSearchAngularModule;
    exports.NucleusTextCloudAngularComponent = NucleusTextCloudAngularComponent;
    exports.NucleusTextCloudAngularModule = NucleusTextCloudAngularModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=nucleus-angular.umd.js.map
