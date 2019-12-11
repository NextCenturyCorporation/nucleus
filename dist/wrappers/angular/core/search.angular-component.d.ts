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
import { AbstractFilter, AbstractFilterDesign } from '../../../core/models/filters';
import { AbstractSearchService } from '../../../core/services/abstract.search.service';
import { NucleusCommonAngularComponent } from './common.angular-component';
import { NucleusSearch } from '../../../core/components/search.web-component';
export declare class NucleusSearchAngularComponent extends NucleusCommonAngularComponent {
    elementRef: ElementRef;
    aggregations: Record<string, any>[];
    groups: Record<string, any>[];
    options: Record<string, any>;
    searchService: AbstractSearchService;
    visInputElement: any;
    constructor(elementRef: ElementRef);
    /**
     * @override
     */
    protected doesHaveSubclassInputs(): boolean;
    /**
     * @override
     */
    protected findWrappedElement(): NucleusSearch;
    /**
     * @override
     */
    protected initWrappedElement(searchElement: NucleusSearch): void;
    /**
     * @override
     */
    protected onWrapperAfterViewInit(): void;
    /**
     * @override
     */
    protected onWrapperChanges(): void;
    /**
     * @override
     */
    protected retrieveWrappedElementObservedAttributes(): string[];
    /**
     * Runs the search query using the current attributes and filters.  Only call this function if you want to manually trigger a requery.
     */
    runQuery(id: string, filters: AbstractFilter[]): void;
    /**
     * Updates the unshared filters of this search element with the given filters.
     */
    updateFilters(id: string, filters: AbstractFilter[]): void;
    /**
     * Updates the filter designs of this search element (used to find shared filters) with the given filter designs.
     */
    updateFilterDesigns(id: string, filterDesigns: AbstractFilterDesign[]): void;
}
