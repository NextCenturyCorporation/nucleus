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

import { CoreUtil } from '@caci-critical-insight-solutions/nucleus-core';
import { NucleusElement } from '@caci-critical-insight-solutions/nucleus-core';

// TODO Change your visualization element's class name.
export class NucleusStub extends NucleusElement {
    private _data: any[] = [];
    private _filteredValues: any[] = [];
    private _shadowRoot: ShadowRoot;
    private _visElement: HTMLElement;

    static get observedAttributes(): string[] {
        return [
            // TODO Add your visualization element's attributes here.
        ];
    }

    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                :host([hidden]) {
                    display: none;
                }

                // TODO Add your visualization element's styles here.
            </style>
        `;

        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._visElement = document.createElement('div');
        this._shadowRoot.appendChild(this._visElement);
    }

    /**
     * Changes the filtered data in this visualization to the values in the given filter data.  Invoked by a Filter Component.
     */
    public changeFilteredData(filterData: any|any[]): void {
        // Documentation on filterData:  https://github.com/NextCenturyCorporation/nucleus#filter-data-array

        // TODO If the values in filterData and this._filteredValues are different, set this._filteredValues to the new values.

        // TODO If this._filteredValues was changed, call this._redrawDataElements().

        // Do NOT dispatch a dataFiltered event here!
    }

    /**
     * Draws the given search data as HTML elements in this visualization.  Invoked by a Search Component.
     */
    public drawData(searchData: any[]): void {
        // Documentation on searchData:  https://github.com/NextCenturyCorporation/nucleus#search-data-object

        // TODO Set this._data to the searchData array, transformed as needed by this visualization.

        this._redrawDataElements();
    }

    /**
     * Creates or changes the filtered values based on the given item from the visualization's data array.  Invoked by user interaction.
     */
    public filterDataItem(item: any): void {
        // TODO Update this._filteredValues based on the given item from this._data

        this._redrawDataElements();

        // Dispatch an event to update the filter components corresponding to this visualization.
        this.dispatchEvent(new CustomEvent('dataFiltered', {
            bubbles: true,
            detail: {
                values: this._filteredValues
            }
        }));
    }

    /**
     * Redraws all the HTML elements in this visualization based on the visualization's data array.
     */
    private _redrawDataElements(): void {
        // Replace the visualization's old container element.
        let newElement = document.createElement('div');
        this._shadowRoot.replaceChild(newElement, this._visElement);
        this._visElement = newElement;

        // TODO Use this._data to create new HTML elements (document.createElement) and update this._visElement (appendChild).
    }
}

// TODO Change your visualization element's tag and class name.
window.customElements.define('nucleus-stub', NucleusStub);

