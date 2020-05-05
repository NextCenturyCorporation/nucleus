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

import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

import { AbstractSearchService } from '@caci-critical-insight-solutions/nucleus-core';
import { CoreUtil } from '@caci-critical-insight-solutions/nucleus-core';
import { NucleusCommonAngularComponent } from '../core/common.angular-component';
import { NucleusTextCloud } from '@caci-critical-insight-solutions/nucleus-visualizations';

const VISUALZIATON_COMPONENT_TEMPLATE = `
<nucleus-text-cloud [attr.id]="id + '-angular'"></nucleus-text-cloud>
`;

@Component({
    selector: 'app-nucleus-angular-text-cloud',
    template: VISUALZIATON_COMPONENT_TEMPLATE,
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NucleusTextCloudAngularComponent extends NucleusCommonAngularComponent {
    @Input() searchService: AbstractSearchService;

    constructor(public elementRef: ElementRef) {
        super();
    }

    /**
     * Creates and returns the export data for the visualization.
     */
    public createExportData(exportFields: { columnName: string, prettyName: string }[], filename: string): { name: string, data: any }[] {
        const visElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular') as NucleusTextCloud;
        return visElement.createExportData(exportFields, filename);
    }

    /**
     * @override
     */
    protected doesHaveSubclassInputs(): boolean {
        return !!this.searchService;
    }

    /**
     * @override
     */
    protected findWrappedElement(): NucleusTextCloud {
        return this.elementRef.nativeElement.querySelector('#' + this.id + '-angular') as NucleusTextCloud;
    }

    /**
     * @override
     */
    protected initWrappedElement(visElement: NucleusTextCloud): void {
        visElement.init(this.dataset, this.filterService, this.searchService);
    }

    /**
     * @override
     */
    protected onWrapperAfterViewInit(): void {
        const visElement: NucleusTextCloud = this.findWrappedElement();

        // Add event propagation listeners after the HTML elements are stable.
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'valuesFiltered');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchCanceled');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchFailed');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchFinished');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, visElement, 'searchLaunched');
    }

    /**
     * Redraws the visualization.
     */
    public redraw(): void {
        const visElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular') as NucleusTextCloud;
        visElement.redraw();
    }

    /**
     * Runs the visualization's search query.
     */
    public runQuery(): void {
        const visElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular') as NucleusTextCloud;
        visElement.runQuery();
    }

    /**
     * @override
     */
    protected retrieveWrappedElementObservedAttributes(): string[] {
        return NucleusTextCloud.observedAttributes;
    }
}
