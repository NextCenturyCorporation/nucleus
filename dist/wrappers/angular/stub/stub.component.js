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
    function NextCenturyStubAngularComponent() {
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
    };
    NextCenturyStubAngularComponent.prototype.filterDataItem = function (item) {
        // TODO Update this.filteredValues based on the given item from this.data
        // Dispatch an event to update the filter components corresponding to this visualization.
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
            templateUrl: './stub.component.html',
            // TODO Add the path to your CSS/SCSS/Less file to styleUrls.
            styleUrls: [],
            encapsulation: core_1.ViewEncapsulation.Emulated,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], NextCenturyStubAngularComponent);
    return NextCenturyStubAngularComponent;
}());
exports.NextCenturyStubAngularComponent = NextCenturyStubAngularComponent;
//# sourceMappingURL=stub.component.js.map