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
import { ElementRef } from '@angular/core';
export declare class NucleusStubAngularComponent {
    elementRef: ElementRef;
    data: any[];
    filteredValues: any[];
    constructor(elementRef: ElementRef);
    /**
     * Changes the filtered data in this visualization to the values in the given filter data.  Invoked by a Filter Component.
     */
    changeFilteredData(filterData: any | any[]): void;
    /**
     * Draws the given search data as HTML elements in this visualization.  Invoked by a Search Component.
     */
    drawData(searchData: any[]): void;
    /**
     * Creates or changes the filtered values based on the given item from the visualization's data array.  Invoked by user interaction.
     */
    filterDataItem(item: any): void;
}
