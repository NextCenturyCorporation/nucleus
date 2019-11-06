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
import { AfterViewInit, OnChanges } from '@angular/core';
import { Dataset } from '../../../core/models/dataset';
import { FilterService } from '../../../core/services/filter.service';
export declare abstract class NextCenturyCommonAngularComponent implements AfterViewInit, OnChanges {
    dataset: Dataset;
    filterService: FilterService;
    id: string;
    options: Record<string, any>;
    private _visualizationIsInitialized;
    constructor();
    protected doesHaveSubclassInputs(): boolean;
    protected abstract findWrappedElement(): HTMLElement;
    protected abstract initWrappedElement(element: HTMLElement): void;
    protected onWrapperAfterViewInit(): void;
    protected onWrapperChanges(): void;
    protected abstract retrieveWrappedElementObservedAttributes(): string[];
    ngAfterViewInit(): void;
    ngOnChanges(__changes: any): void;
}
