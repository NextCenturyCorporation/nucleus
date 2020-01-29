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

export class NucleusExample extends NucleusElement {
    private _data: any[];
    private _selected: any[] = [];
    private _shadowRoot: ShadowRoot;
    private _visElement: HTMLElement;

    static get observedAttributes(): string[] {
        return [
            'selection-field',
            'vis-title'
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

                .block {
                    border-bottom: 2px solid black;
                    color: black;
                    margin-bottom: 10px;
                    padding-bottom: 10px;
                }

                .highlight {
                    color: orange;
                }

                .row {
                    padding-left: 10px;
                }

                .title {
                    font-weight: bold;
                }

                .clickable:hover {
                    color: blue;
                    cursor: pointer;
                }
            </style>
        `;

        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._visElement = document.createElement('div');
        this._shadowRoot.appendChild(this._visElement);
    }

    public changeSelectedText(text: any|any[]): void {
        // If text is "a", transform to ["a"]; if text is ["a", "b"], keep it; if text is [["a"], ["b", "c"]], transform to ["a", "b", "c"]
        const selected: any[] = !Array.isArray(text) ? [text] : text.reduce((list, part) => list.concat(part), []);

        // Only redraw the visualization data if some of the selected text items have changed.
        if (this._selected.length !== selected.length || this._selected.some((value, index) => value !== selected[index])) {
            this._selected = selected;

            // Do NOT dispatch a dataSelected event!

            this._redrawData();
        }
    }

    public drawData(data: any[]): void {
        this._data = data;
        this._redrawData();

        this.dispatchEvent(new CustomEvent('draw', {
            bubbles: true,
            detail: {}
        }));
    }

    public select(item: any): void {
        const index = this._selected.indexOf(item);
        if (index >= 0) {
            this._selected.splice(index, 1);
        } else {
            this._selected.push(item);
        }

        this._redrawData();

        this.dispatchEvent(new CustomEvent('dataSelected', {
            bubbles: true,
            detail: {
                values: this._selected
            }
        }));
    }

    private _redrawData(): void {
        let newElement = document.createElement('div');
        this._shadowRoot.replaceChild(newElement, this._visElement);
        this._visElement = newElement;

        const selectedAsText = this._selected.length ? ('"' + this._selected.join('","') + '"') : 'None';
        const selectionField = this.getAttribute('selection-field');
        const visTitle = this.getAttribute('vis-title');

        let countElement = document.createElement('div');
        countElement.className = 'block title';
        countElement.innerHTML = (!visTitle ? '' : ('<div>' + visTitle + '</div>')) + '<div>Total: ' + this._data.length + '</div>' +
            '<div>Filters: ' + (!selectionField ? 'Disabled' : selectedAsText) + '</div>';
        this._visElement.appendChild(countElement);

        let containerElement = document.createElement('div');
        containerElement.className = 'container';

        this._data.forEach((item) => {
            const selectionValue = selectionField ? CoreUtil.deepFind(item, selectionField) : null;
            const filtered = item.filtered || (selectionValue && this._selected.indexOf(selectionValue) >= 0);

            let blockElement = document.createElement('div');
            blockElement.className = ['block'].concat(filtered ? 'highlight' : []).concat(selectionValue ? 'clickable' : []).join(' ');
            blockElement.onclick = !selectionValue ? undefined : () => {
                this.select(selectionValue);
            };

            if (Object.keys(item.aggregations).length) {
                let aggregationTitleElement = document.createElement('div');
                aggregationTitleElement.className = 'title';
                aggregationTitleElement.innerHTML = 'Aggregations:';
                blockElement.appendChild(aggregationTitleElement);

                Object.keys(item.aggregations).forEach((aggregation) => {
                    let rowElement = document.createElement('div');
                    rowElement.className = 'row';
                    rowElement.innerHTML = aggregation + ': ' + JSON.stringify(item.aggregations[aggregation]);
                    blockElement.appendChild(rowElement);
                });
            }

            let fieldTitleElement = document.createElement('div');
            fieldTitleElement.className = 'title';
            fieldTitleElement.innerHTML = 'Fields:';
            blockElement.appendChild(fieldTitleElement);

            Object.keys(item.fields).forEach((field) => {
                let rowElement = document.createElement('div');
                rowElement.className = 'row';
                rowElement.innerHTML = field + ': ' + JSON.stringify(item.fields[field]);
                blockElement.appendChild(rowElement);
            });

            let selectionTitleElement = document.createElement('div');
            selectionTitleElement.className = 'title';
            selectionTitleElement.innerHTML = 'Filtered: ' + (filtered ? 'Yes' : 'No');
            blockElement.appendChild(selectionTitleElement);

            containerElement.appendChild(blockElement);
        });

        this._visElement.appendChild(containerElement);
    }
}

window.customElements.define('nucleus-example', NucleusExample);

