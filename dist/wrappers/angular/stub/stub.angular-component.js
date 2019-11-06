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
// TODO Change your visualization's filenames, selector, and class name.
var NextCenturyStubAngularComponent = /** @class */ (function () {
    // Define a public ElementRef so that parent components may call addEventListener on this visualization's elementRef.nativeElement.
    function NextCenturyStubAngularComponent(elementRef) {
        this.elementRef = elementRef;
        this.data = [];
        this.filteredValues = [];
        // TODO Update constructor as needed.
    }
    /**
     * Changes the filtered data in this visualization to the values in the given filter data.  Invoked by a Filter Component.
     */
    NextCenturyStubAngularComponent.prototype.changeFilteredData = function (filterData) {
        // Documentation on filterData:  https://github.com/NextCenturyCorporation/component-library#filter-data-array
        // TODO If the values in filterData and this.filteredValues are different, set this.filteredValues to the new values.
        // Do NOT dispatch a dataFiltered event here!
    };
    /**
     * Draws the given search data as HTML elements in this visualization.  Invoked by a Search Component.
     */
    NextCenturyStubAngularComponent.prototype.drawData = function (searchData) {
        // Documentation on searchData:  https://github.com/NextCenturyCorporation/component-library#search-data-object
        // TODO Set this.data to the searchData array, transformed as needed by this visualization.
        // Note:  You may need to add a ChangeDetectorRef to your constructor and call detectChanges() on it here.
    };
    /**
     * Creates or changes the filtered values based on the given item from the visualization's data array.  Invoked by user interaction.
     */
    NextCenturyStubAngularComponent.prototype.filterDataItem = function (item) {
        // TODO Update this.filteredValues based on the given item from this.data
        // Dispatch an event to notify this visualization's Filter Components of the new filtered values.
        this.elementRef.nativeElement.dispatchEvent(new CustomEvent('dataFiltered', {
            bubbles: true,
            detail: {
                values: this.filteredValues
            }
        }));
    };
    NextCenturyStubAngularComponent = __decorate([
        core_1.Component({
            selector: 'app-next-century-angular-stub',
            templateUrl: './stub.angular-component.html',
            // TODO Add the path to your CSS/SCSS/Less file to styleUrls.
            styleUrls: [],
            encapsulation: core_1.ViewEncapsulation.Emulated,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], NextCenturyStubAngularComponent);
    return NextCenturyStubAngularComponent;
}());
exports.NextCenturyStubAngularComponent = NextCenturyStubAngularComponent;
//# sourceMappingURL=stub.angular-component.js.map