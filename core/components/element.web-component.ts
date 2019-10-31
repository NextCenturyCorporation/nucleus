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

export class NextCenturyElement extends HTMLElement {
    public attributeChangedCallback(__name: string, __oldValue: any, __newValue: any): void {
        // Do nothing.
    }

    public connectedCallback(): void {
        for (const key of (this.constructor as any).observedAttributes) {
            this._upgradeProperty(key);
        }
    }

    public disconnectedCallback(): void {
        // Do nothing.
    }

    /**
     * See https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
     */
    private _upgradeProperty(key: string): void {
        if (this.hasOwnProperty(key)) {
            let value = this[key];
            delete this[key];
            this[key] = value;
        }
    }
}

