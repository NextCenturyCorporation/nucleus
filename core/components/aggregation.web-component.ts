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

import { NextCenturyElement } from './element.web-component';

export class NextCenturyAggregation extends NextCenturyElement {
    static ELEMENT_NAME = 'next-century-aggregation';

    static get observedAttributes(): string[] {
        return [
            'aggregation-field-key',
            'aggregation-group',
            'aggregation-label',
            'aggregation-operation'
        ];
    }

    static createElement(attributes: Record<string, any>): HTMLElement {
        const aggregationElement = document.createElement(NextCenturyAggregation.ELEMENT_NAME);
        NextCenturyAggregation.observedAttributes.forEach((attribute) => {
            if (typeof attributes[attribute] !== 'undefined') {
                aggregationElement.setAttribute(attribute, attributes[attribute]);
            }
        });
        return aggregationElement;
    }
}

window.customElements.define(NextCenturyAggregation.ELEMENT_NAME, NextCenturyAggregation);

