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
import { NextCenturyCommonAngularComponent } from './common.angular-component';
import { NextCenturyFilter } from '../../../core/components/filter.web-component';
export declare class NextCenturyFilterAngularComponent extends NextCenturyCommonAngularComponent {
    searchElement: any;
    visElement: any;
    /**
     * @override
     */
    protected doesHaveSubclassInputs(): boolean;
    /**
     * @override
     */
    protected findWrappedElement(): NextCenturyFilter;
    /**
     * @override
     */
    protected initWrappedElement(filterElement: NextCenturyFilter): void;
    /**
     * @override
     */
    protected onWrapperAfterViewInit(): void;
    /**
     * @override
     */
    protected retrieveWrappedElementObservedAttributes(): string[];
    /**
     * Updates filters (creates and/or deletes) using the given values.
     */
    updateFilteredValues(values: any | any[]): void;
}
