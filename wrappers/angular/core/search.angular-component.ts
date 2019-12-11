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

import { AbstractFilter, AbstractFilterDesign } from '../../../core/models/filters';
import { AbstractSearchService } from '../../../core/services/abstract.search.service';
import { CoreUtil } from '../../../core/core.util';
import { NucleusAggregation } from '../../../core/components/aggregation.web-component';
import { NucleusCommonAngularComponent } from './common.angular-component';
import { NucleusGroup } from '../../../core/components/group.web-component';
import { NucleusSearch } from '../../../core/components/search.web-component';

const SEARCH_COMPONENT_TEMPLATE = `
<nucleus-search [attr.id]="id + '-search'">
    <nucleus-aggregation *ngFor="let aggregation of aggregations; let i = index" [attr.id]="id + '-aggregation-' + i">
    </nucleus-aggregation>
    <nucleus-group *ngFor="let group of groups; let i = index" [attr.id]="id + '-group-' + i"></nucleus-group>
</nucleus-search>
`;

@Component({
    selector: 'app-nucleus-angular-search',
    template: SEARCH_COMPONENT_TEMPLATE,
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NucleusSearchAngularComponent extends NucleusCommonAngularComponent {
    @Input() aggregations: Record<string, any>[];
    @Input() groups: Record<string, any>[];
    @Input() options: Record<string, any>;
    @Input() searchService: AbstractSearchService;
    @Input() visInputElement: any;

    constructor(public elementRef: ElementRef) {
        super();
    }

    /**
     * @override
     */
    protected doesHaveSubclassInputs(): boolean {
        return !!(this.searchService && this.visInputElement);
    }

    /**
     * @override
     */
    protected findWrappedElement(): NucleusSearch {
        return this.elementRef.nativeElement.querySelector('#' + this.id + '-search') as NucleusSearch;
    }

    /**
     * @override
     */
    protected initWrappedElement(searchElement: NucleusSearch): void {
        searchElement.init(this.dataset, this.filterService, this.searchService, {
            visInput: this.visInputElement
        });
    }

    /**
     * @override
     */
    protected onWrapperAfterViewInit(): void {
        const searchElement: NucleusSearch = this.findWrappedElement();

        // Add event propagation listeners after the HTML elements are stable.
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchCanceled');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchFailed');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchFinished');
        CoreUtil.addEventPropagationListener(this.elementRef.nativeElement, searchElement, 'searchLaunched');
    }

    /**
     * @override
     */
    protected onWrapperChanges(): void {
        if (this.aggregations) {
            this.aggregations.forEach((aggregationOptions, index) => {
                const aggregationElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-aggregation-' +
                    index) as NucleusAggregation;
                if (aggregationElement) {
                    CoreUtil.updateElementAttributes(aggregationElement, NucleusAggregation.observedAttributes, aggregationOptions);
                }
            });
        }

        if (this.groups) {
            this.groups.forEach((groupOptions, index) => {
                const groupElement = this.elementRef.nativeElement.querySelector('#' + this.id + '-group-' +
                    index) as NucleusGroup;
                if (groupElement) {
                    CoreUtil.updateElementAttributes(groupElement, NucleusGroup.observedAttributes, groupOptions);
                }
            });
        }
    }

    /**
     * @override
     */
    protected retrieveWrappedElementObservedAttributes(): string[] {
        return NucleusSearch.observedAttributes;
    }

    /**
     * Runs the search query using the current attributes and filters.  Only call this function if you want to manually trigger a requery.
     */
    public runQuery(id: string, filters: AbstractFilter[]): void {
        const searchElement: NucleusSearch = this.findWrappedElement();
        searchElement.runQuery();
    }

    /**
     * Updates the unshared filters of this search element with the given filters.
     */
    public updateFilters(id: string, filters: AbstractFilter[]): void {
        const searchElement: NucleusSearch = this.findWrappedElement();
        searchElement.updateFilters(id, filters);
    }

    /**
     * Updates the filter designs of this search element (used to find shared filters) with the given filter designs.
     */
    public updateFilterDesigns(id: string, filterDesigns: AbstractFilterDesign[]): void {
        const searchElement: NucleusSearch = this.findWrappedElement();
        searchElement.updateFilterDesigns(id, filterDesigns);
    }
}
