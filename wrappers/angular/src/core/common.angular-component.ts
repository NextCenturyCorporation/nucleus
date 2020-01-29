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

import { AfterViewInit, ElementRef, Input, OnChanges } from '@angular/core';

import { CoreUtil } from '@caci-critical-insight-solutions/nucleus-core';
import { Dataset } from '@caci-critical-insight-solutions/nucleus-core';
import { FilterService } from '@caci-critical-insight-solutions/nucleus-core';

export abstract class NucleusCommonAngularComponent implements AfterViewInit, OnChanges {
    @Input() dataset: Dataset;
    @Input() filterService: FilterService;
    @Input() id: string;
    @Input() options: Record<string, any>;

    private _visualizationIsInitialized: boolean = false;

    constructor() {}

    protected doesHaveSubclassInputs(): boolean {
        return true;
    }

    protected abstract findWrappedElement(): HTMLElement;

    protected abstract initWrappedElement(element: HTMLElement): void;

    protected onWrapperAfterViewInit(): void {
        // Override if needed.
    }

    protected onWrapperChanges(): void {
        // Override if needed.
    }

    protected abstract retrieveWrappedElementObservedAttributes(): string[];

    ngAfterViewInit() {
        this.onWrapperAfterViewInit();

        // Call ngOnChanges to initialize the visualization if needed after the HTML elements are stable.
        this.ngOnChanges(undefined);
    }

    ngOnChanges(__changes) {
        // Ensure ALL required properties are set before calling init on the visualization.
        if (this.id && this.dataset && this.filterService && this.options && this.doesHaveSubclassInputs()) {
            const wrappedElement = this.findWrappedElement();
            this.options.id = wrappedElement.getAttribute('id');
            if (wrappedElement) {
                CoreUtil.updateElementAttributes(wrappedElement, this.retrieveWrappedElementObservedAttributes(), this.options);

                this.onWrapperChanges();

                if (!this._visualizationIsInitialized) {
                    this.initWrappedElement(wrappedElement);
                    this._visualizationIsInitialized = true;
                }
            }
        }
    }
}
