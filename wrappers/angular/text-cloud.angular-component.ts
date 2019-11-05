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

import { AbstractSearchService } from '../../core/services/abstract.search.service';
import { CoreUtil } from '../../core/core.util';
import { NextCenturyCommonAngularComponent } from './common.angular-component';
import { NextCenturyTextCloud } from '../../visualizations/text-cloud/text-cloud.web-component';

const VISUALZIATON_COMPONENT_TEMPLATE = `
<next-century-text-cloud [attr.id]="id + '-angular'"></next-century-text-cloud>
`;

@Component({
    selector: 'app-next-century-angular-text-cloud',
    template: VISUALZIATON_COMPONENT_TEMPLATE,
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextCenturyTextCloudAngularComponent extends NextCenturyCommonAngularComponent {
    @Input() searchService: AbstractSearchService;

    /**
     * Creates and returns the export data for the visualization.
     */
    public createExportData(exportFields: { columnName: string, prettyName: string }[], filename: string): { name: string, data: any }[] {
        const visElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular') as NextCenturyTextCloud;
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
    protected findWrappedElement(): NextCenturyTextCloud {
        return this.elementRef.nativeElement.querySelector('#' + this.id + '-angular') as NextCenturyTextCloud;
    }

    /**
     * @override
     */
    protected initWrappedElement(visElement: NextCenturyTextCloud): void {
        visElement.init(this.dataset, this.filterService, this.searchService);
    }

    /**
     * @override
     */
    protected onWrapperAfterViewInit(): void {
        const visElement: NextCenturyTextCloud = this.findWrappedElement();

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
        const visElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-angular') as NextCenturyTextCloud;
        visElement.redraw();
    }

    /**
     * @override
     */
    protected retrieveWrappedElementObservedAttributes(): string[] {
        return NextCenturyTextCloud.observedAttributes;
    }
}
