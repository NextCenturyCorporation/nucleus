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

export class NucleusGroup extends NucleusElement {
    static ELEMENT_NAME = 'nucleus-group';

    static get observedAttributes(): string[] {
        return [
            'group-field-key',
            'group-label',
            'group-operation'
        ];
    }

    static createElement(attributes: Record<string, any>): HTMLElement {
        const groupElement = document.createElement(NucleusGroup.ELEMENT_NAME);
        NucleusGroup.observedAttributes.forEach((attribute) => {
            if (typeof attributes[attribute] !== 'undefined') {
                groupElement.setAttribute(attribute, attributes[attribute]);
            }
        });
        return groupElement;
    }
}

window.customElements.define(NucleusGroup.ELEMENT_NAME, NucleusGroup);

