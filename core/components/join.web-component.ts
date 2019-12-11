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

import { NucleusElement } from './element.web-component';

export class NucleusJoin extends NucleusElement {
    static ELEMENT_NAME = 'nucleus-join';

    static get observedAttributes(): string[] {
        return [
            'join-field-key-1',
            'join-field-key-2',
            'join-operator',
            'join-table-key',
            'join-type'
        ];
    }

    static createElement(attributes: Record<string, any>): HTMLElement {
        const joinElement = document.createElement(NucleusJoin.ELEMENT_NAME);
        NucleusJoin.observedAttributes.forEach((attribute) => {
            if (typeof attributes[attribute] !== 'undefined') {
                joinElement.setAttribute(attribute, attributes[attribute]);
            }
        });
        return joinElement;
    }
}

window.customElements.define(NucleusJoin.ELEMENT_NAME, NucleusJoin);

