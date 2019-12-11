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
import { AbstractSearchService } from '../../../core/services/abstract.search.service';
import { NucleusCommonAngularComponent } from '../core/common.angular-component';
import { NucleusTextCloud } from '../../../visualizations/text-cloud/text-cloud.web-component';
export declare class NucleusTextCloudAngularComponent extends NucleusCommonAngularComponent {
    elementRef: ElementRef;
    searchService: AbstractSearchService;
    constructor(elementRef: ElementRef);
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
     * @override
     */
    protected doesHaveSubclassInputs(): boolean;
    /**
     * @override
     */
    protected findWrappedElement(): NucleusTextCloud;
    /**
     * @override
     */
    protected initWrappedElement(visElement: NucleusTextCloud): void;
    /**
     * @override
     */
    protected onWrapperAfterViewInit(): void;
    /**
     * Redraws the visualization.
     */
    redraw(): void;
    /**
     * @override
     */
    protected retrieveWrappedElementObservedAttributes(): string[];
}
