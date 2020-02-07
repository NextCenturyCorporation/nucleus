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

import { CoreUtil } from '@caci-critical-insight-solutions/nucleus-core';
import { NucleusCommonAngularComponent } from './common.angular-component';
import { NucleusFilter } from '@caci-critical-insight-solutions/nucleus-core';

const FILTER_COMPONENT_TEMPLATE = `
<nucleus-filter [attr.id]="id + '-filter'"></nucleus-filter>
`;

@Component({
    selector: 'app-nucleus-angular-filter',
    template: FILTER_COMPONENT_TEMPLATE,
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NucleusFilterAngularComponent extends NucleusCommonAngularComponent {
    @Input() searchElement: any;
    @Input() visInputElement: any;
    @Input() visOutputElement: any;

    constructor(public elementRef: ElementRef) {
        super();
    }

    /**
     * @override
     */
    protected doesHaveSubclassInputs(): boolean {
        return !!(this.searchElement);
    }

    /**
     * @override
     */
    protected findWrappedElement(): NucleusFilter {
        return this.elementRef.nativeElement.querySelector('#' + this.id + '-filter') as NucleusFilter;
    }

    /**
     * @override
     */
    protected initWrappedElement(filterElement: NucleusFilter): void {
        filterElement.init(this.dataset, this.filterService, {
            search: this.searchElement,
            visInput: this.visInputElement,
            visOutput: this.visOutputElement
        });
    }

    /**
     * @override
     */
    protected onWrapperAfterViewInit(): void {
        const filterElement: NucleusFilter = this.findWrappedElement();

        // Add event propagation listeners after the HTML elements are stable.
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, filterElement, 'valuesFiltered');
    }

    /**
     * @override
     */
    protected retrieveWrappedElementObservedAttributes(): string[] {
        return NucleusFilter.observedAttributes;
    }

    /**
     * Updates filters (creates and/or deletes) using the given values.
     */
    public updateFilteredValues(values: any|any[]): void {
        const filterElement: NucleusFilter = this.findWrappedElement();
        filterElement.updateFilteredValues(values);
    }
}
