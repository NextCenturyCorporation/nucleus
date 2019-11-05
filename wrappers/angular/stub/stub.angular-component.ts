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

import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';

// TODO Change your visualization's filenames, selector, and class name.
@Component({
    selector: 'app-next-century-angular-stub',
    templateUrl: './stub.angular-component.html',
    // TODO Add the path to your CSS/SCSS/Less file to styleUrls.
    styleUrls: [],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextCenturyStubAngularComponent {
    public data: any[] = [];
    public filteredValues: any[] = [];

    constructor(protected elementRef: ElementRef) {
        // TODO Update constructor as needed.
    }

    /**
     * Changes the filtered data in this visualization to the values in the given filter data.  Invoked by a Filter Component.
     */
    public changeFilteredData(filterData: any|any[]): void {
        // Documentation on filterData:  https://github.com/NextCenturyCorporation/component-library#filter-data-array

        // TODO If the values in filterData and this.filteredValues are different, set this.filteredValues to the new values.

        // Do NOT dispatch a dataFiltered event here!
    }

    /**
     * Draws the given search data as HTML elements in this visualization.  Invoked by a Search Component.
     */
    public drawData(searchData: any[]): void {
        // Documentation on searchData:  https://github.com/NextCenturyCorporation/component-library#search-data-object

        // TODO Set this.data to the searchData array, transformed as needed by this visualization.
    }

    public filterDataItem(item: any): void {
        // TODO Update this.filteredValues based on the given item from this.data

        // Dispatch an event to update the filter components corresponding to this visualization.
        this.elementRef.nativeElement.dispatchEvent(new CustomEvent('dataFiltered', {
            bubbles: true,
            detail: {
                values: this.filteredValues
            }
        }));
    }
}
