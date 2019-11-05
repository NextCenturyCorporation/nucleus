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

import { CoreUtil } from '../../core/core.util';
import { NextCenturyCommonAngularComponent } from './common.angular-component';
import { NextCenturyFilter } from '../../core/components/filter.web-component';

const FILTER_COMPONENT_TEMPLATE = `
<next-century-filter [attr.id]="id + '-filter'"></next-century-filter>
`;

@Component({
    selector: 'app-next-century-angular-filter',
    template: FILTER_COMPONENT_TEMPLATE,
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextCenturyFilterAngularComponent extends NextCenturyCommonAngularComponent {
    @Input() searchElement: any;
    @Input() visElement: any;

    /**
     * @override
     */
    protected doesHaveSubclassInputs(): boolean {
        return !!(this.searchElement && this.visElement);
    }

    /**
     * @override
     */
    protected findWrappedElement(): NextCenturyFilter {
        return this.elementRef.nativeElement.querySelector('#' + this.id + '-filter') as NextCenturyFilter;
    }

    /**
     * @override
     */
    protected initWrappedElement(filterElement: NextCenturyFilter): void {
        filterElement.init(this.dataset, this.filterService, this.visElement, this.searchElement);
    }

    /**
     * @override
     */
    protected onWrapperAfterViewInit(): void {
        const filterElement: NextCenturyFilter = this.findWrappedElement();

        // Add event propagation listeners after the HTML elements are stable.
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, filterElement, 'valuesFiltered');
    }

    /**
     * @override
     */
    protected retrieveWrappedElementObservedAttributes(): string[] {
        return NextCenturyFilter.observedAttributes;
    }

    /**
     * Updates filters (creates and/or deletes) using the given values.
     */
    public updateFilteredValues(values: any|any[]): void {
        const filterElement: NextCenturyFilter = this.findWrappedElement();
        filterElement.updateFilteredValues(values);
    }
}
