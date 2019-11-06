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

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

import { CoreUtil } from 'component-library/dist/core/core.util';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
    @Input() filterProperty: string;
    @Input() visTitle: string;

    public data: any[] = [];
    public filterText: string = '';
    public filteredValues: any[] = [];

    constructor(protected changeDetectorRef: ChangeDetectorRef, public elementRef: ElementRef) { }

    /**
     * Changes the filtered data in this visualization to the values in the given filter data.  Invoked by a Filter Component.
     */
    public changeFilteredData(filterData: any|any[]): void {
        const filtered: any[] = !Array.isArray(filterData) ? [filterData] : filterData.reduce((list, part) => list.concat(part), []);

        if (this.filteredValues.length !== filtered.length || this.filteredValues.some((value, index) => value !== filtered[index])) {
            this.filteredValues = filtered;

            this._updateFilterText();

            // Do NOT dispatch a dataFiltered event here!
        }
    }

    /**
     * Draws the given search data as HTML elements in this visualization.  Invoked by a Search Component.
     */
    public drawData(searchData: any[]): void {
        this.data = searchData.map((searchDataObject) => {
            const filterValue = this.filterProperty ? CoreUtil.deepFind(searchDataObject, this.filterProperty) : null;

            searchDataObject.filterValue = filterValue;
            searchDataObject.isClickable = !!filterValue;
            searchDataObject.isHighlighted = searchDataObject.filtered || (filterValue && this.filteredValues.indexOf(filterValue) >= 0);
            searchDataObject.aggregationArray = Object.keys(searchDataObject.aggregations).map((aggregationKey) => ({
                key: aggregationKey,
                value: JSON.stringify(searchDataObject.aggregations[aggregationKey])
            }));
            searchDataObject.fieldArray = Object.keys(searchDataObject.fields).map((fieldKey) => ({
                key: fieldKey,
                value: JSON.stringify(searchDataObject.fields[fieldKey])
            }));

            return searchDataObject;
        });

        this._updateFilterText();

        this.changeDetectorRef.detectChanges();
    }

    /**
     * Creates or changes the filtered values based on the given item from the visualization's data array.  Invoked by user interaction.
     */
    public filterDataItem(item: any): void {
        const index = this.filteredValues.indexOf(item.filterValue);
        if (index >= 0) {
            this.filteredValues.splice(index, 1);
        } else {
            this.filteredValues.push(item.filterValue);
        }

        this._updateFilterText();

        this.elementRef.nativeElement.dispatchEvent(new CustomEvent('dataFiltered', {
            bubbles: true,
            detail: {
                values: this.filteredValues
            }
        }));
    }

    private _updateFilterText(): void {
        this.filterText = !this.filterProperty ? 'Disabled' : (!this.filteredValues.length ? 'None' :
            ('"' + this.filteredValues.join('","') + '"'));
    }
}
