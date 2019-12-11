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
import { AbstractSearchService } from '../../core/services/abstract.search.service';
import { Dataset } from '../../core/models/dataset';
import { FilterService } from '../../core/services/filter.service';
import { NucleusElement } from '../../core/components/element.web-component';
export declare class NucleusTextCloud extends NucleusElement {
    private _containerElement;
    private _dataset;
    private _filterService;
    private _searchService;
    private _shadowRoot;
    static readonly observedAttributes: string[];
    constructor();
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    /**
     * Creates and returns the export data for the text cloud.
     */
    createExportData(exportFields: {
        columnName: string;
        prettyName: string;
    }[], filename: string): {
        name: string;
        data: any;
    }[];
    /**
     * Initializes the text cloud and search/filter components.
     */
    init(dataset: Dataset, filterService: FilterService, searchService: AbstractSearchService): void;
    /**
     * Redraws the text cloud.
     */
    redraw(): void;
    private _createAggregationTitle;
    private _createVisualization;
}
