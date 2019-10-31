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
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    ViewEncapsulation
} from '@angular/core';

import { AbstractSearchService } from '../../core/services/abstract.search.service';
import { CoreUtil } from '../../core/core.util';
import { Dataset } from '../../core/models/dataset';
import { FilterService } from '../../core/services/filter.service';
import { NextCenturyTextCloud } from '../../visualizations/text-cloud/text-cloud.web-component';

@Component({
    selector: 'app-next-century-angular-text-cloud',
    template: '<next-century-text-cloud [attr.id]="id + \'-angular\'"></next-century-text-cloud>',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextCenturyAngularTextCloud implements AfterViewInit, OnChanges {
    @Input() dataset: Dataset;
    @Input() filterService: FilterService;
    @Input() id: string;
    @Input() options: Record<string, any>;
    @Input() searchService: AbstractSearchService;

    private _visualizationIsInitialized: boolean = false;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit() {
        const visElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular') as NextCenturyTextCloud;

        // Add event propagation listeners after the HTML elements are stable.
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'designsChanged');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'filtersChanged');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'valuesFiltered');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchCanceled');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchFailed');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchFinished');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchLaunched');

        // Call ngOnChanges to initialize the visualization if needed after the HTML elements are stable.
        this.ngOnChanges(undefined);
    }

    ngOnChanges(__changes) {
        // Ensure ALL required properties are set before calling init on the visualization.
        if (this.id && this.dataset && this.filterService && this.searchService && this.options) {
            const visElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular') as NextCenturyTextCloud;
            if (visElement) {
                Object.keys(this.options).forEach((attribute) => {
                    if (typeof this.options[attribute] === 'undefined') {
                        if (visElement.hasAttribute(attribute)) {
                            visElement.removeAttribute(attribute);
                        }
                    } else if (('' + this.options[attribute]) !== visElement.getAttribute(attribute)) {
                        visElement.setAttribute(attribute, this.options[attribute]);
                    }
                });
                if (!this._visualizationIsInitialized) {
                    visElement.init(this.dataset, this.filterService, this.searchService);
                    this._visualizationIsInitialized = true;
                }
            }
        }
    }

    /**
     * Creates and returns the export data for the visualization.
     */
    public createExportData(exportFields: { columnName: string, prettyName: string }[], filename: string): { name: string, data: any }[] {
        const visElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular') as NextCenturyTextCloud;
        return visElement.createExportData(exportFields, filename);
    }

    /**
     * Redraws the visualization.
     */
    public redraw(): void {
        const visElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular') as NextCenturyTextCloud;
        visElement.redraw();
    }
}
