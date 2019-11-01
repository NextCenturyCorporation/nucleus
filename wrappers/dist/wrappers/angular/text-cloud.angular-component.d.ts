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
import { AfterViewInit, ElementRef, OnChanges } from '@angular/core';
import { AbstractSearchService } from '../../core/services/abstract.search.service';
import { Dataset } from '../../core/models/dataset';
import { FilterService } from '../../core/services/filter.service';
export declare class NextCenturyAngularTextCloud implements AfterViewInit, OnChanges {
    private elementRef;
    dataset: Dataset;
    filterService: FilterService;
    id: string;
    options: Record<string, any>;
    searchService: AbstractSearchService;
    private _visualizationIsInitialized;
    constructor(elementRef: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(__changes: any): void;
    /**
     * Creates and returns the export data for the visualization.
     */
    createExportData(exportFields: {
        columnName: string;
        prettyName: string;
    }[], filename: string): {
        name: string;
        data: any;
    }[];
    /**
     * Redraws the visualization.
     */
    redraw(): void;
}
