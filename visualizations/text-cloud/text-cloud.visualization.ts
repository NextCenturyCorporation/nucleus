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

import { ColorOptions, SizeOptions, TextCloud } from './TextCloud';
import { CoreUtil } from '../../core/core.util';
import { NextCenturyElement } from '../../core/components/element.web-component';

export class NextCenturyTextCloudVisualization extends NextCenturyElement {
    private _data: any[] = [];
    private _filtered: string[] = [];
    private _shadowRoot: ShadowRoot;
    private _textCloudObject;
    private _visElement: HTMLElement;

    static get observedAttributes(): string[] {
        return [
            'aggregation-field',
            'aggregation-label',
            'color-accent',
            'color-text',
            'enable-show-paragraphs',
            'enable-show-values',
            'text-field'
        ];
    }

    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host .text-cloud {
                    display: inline-block;
                    height: 100%;
                    width: 100%;
                    overflow-wrap: break-word;
                }

                :host .text-cloud .text {
                    cursor: pointer;
                    display: inline-block;
                    padding: 5px;
                }

                :host .text-cloud .text:hover {
                    color: var(--color-data-item-selectable-dark, dimgrey) !important;
                    text-decoration: none;
                }

                :host .text-cloud .filtered:not(:hover) {
                    color: var(--color-data-item-selectable-dark, dimgrey) !important;
                }

                :host .text-cloud .paragraphs {
                    display: block;
                }

                :host .text-cloud .value {
                    margin-left: 10px;
                }

                :host .text-cloud .paragraphs .value {
                    float: right;
                }

                :host([hidden]) {
                    display: none;
                }
            </style>
        `;

        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._visElement = document.createElement('div');
        this._shadowRoot.appendChild(this._visElement);
        this._createVisualizationAndRedrawData();
    }

    public attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        super.attributeChangedCallback(name, oldValue, newValue);

        if (name === 'color-accent' || name === 'color-text') {
            this._createVisualizationAndRedrawData();
        } else {
            this.redraw();
        }
    }

    /**
     * Changes the filtered text to the given text or array of text and redraws the visualization using the existing data.
     */
    public changeFilteredText(text: any|any[]): void {
        // If text is "a", transform to ["a"]; if text is ["a", "b"], keep it; if text is [["a"], ["b", "c"]], transform to ["a", "b", "c"]
        const filtered: any[] = !Array.isArray(text) ? [text] : text.reduce((list, part) => list.concat(part), []);

        // Only redraw the visualization data if some of the filters have changed.
        if (this._filtered.length !== filtered.length || this._filtered.some((value, index) => value !== filtered[index])) {
            this._filtered = filtered;

            this._data.forEach((item) => {
                item.selected = this._filtered.indexOf(item.key) >= 0;
            });

            // Do NOT dispatch a filter event!

            this.redraw();
        }
    }

    /**
     * Draws the visualization using the given data array and returns the unique data items.
     */
    public drawData(data: any[]): number {
        const aggregationField = this.getAttribute('aggregation-field');
        const textField = this.getAttribute('text-field');

        this._data = !textField ? [] : data.map((item) => {
            const text = CoreUtil.deepFind(item, textField);
            return {
                key: text,
                selected: this._filtered.indexOf(text) >= 0,
                value: aggregationField ? CoreUtil.deepFind(item, aggregationField) : 1
            };
        }).filter((item) => !!item.key);

        this.redraw();

        return this._data.length;
    }

    /**
     * Redraws the text cloud.
     */
    public redraw(): void {
        const aggregationLabel = this.getAttribute('aggregation-label');
        const showParagraphs = !!this.hasAttribute('enable-show-paragraphs');
        const showValues = !!this.hasAttribute('enable-show-values');

        let newElement = document.createElement('div');
        newElement.className = 'text-cloud';
        this._shadowRoot.replaceChild(newElement, this._visElement);
        this._visElement = newElement;

        const textCloudData = this._textCloudObject.createTextCloud(this._data);
        textCloudData.forEach((item) => {
            let elementClasses = ['text'].concat(item.selected ? 'filtered' : []).concat(showParagraphs ? 'paragraphs' : []);

            let itemElement = document.createElement('div');
            itemElement.className = elementClasses.join(' ');
            itemElement.onclick = () => {
                this.toggleFilter(item.key);
            };
            itemElement.style.color = item.color;
            itemElement.style['font-size'] = item.fontSize;
            itemElement.title = (aggregationLabel ? (aggregationLabel + ': ') : '') + item.value;

            let keyElement = document.createElement('span');
            keyElement.className = 'key';
            keyElement.innerHTML = item.key;
            itemElement.appendChild(keyElement);

            if (showValues) {
                let valueElement = document.createElement('span');
                valueElement.className = 'value';
                valueElement.innerHTML = '(' + item.value + ')';
                itemElement.appendChild(valueElement);
            }

            this._visElement.appendChild(itemElement);
        });
    }

    /**
     * Toggles the filtered status of the given text cloud data item.
     */
    public toggleFilter(text: string): void {
        const index = this._filtered.indexOf(text);
        if (index >= 0) {
            this._filtered.splice(index, 1);
        } else {
            this._filtered.push(text);
        }

        this._data.forEach((item) => {
            item.selected = this._filtered.indexOf(item.key) >= 0;
        });

        this.redraw();

        this.dispatchEvent(new CustomEvent('filter', {
            detail: {
                values: this._filtered
            }
        }));
    }

    private _createVisualizationAndRedrawData(): void {
        const accentColorHex = this.getAttribute('color-accent') || '#0000FF';
        const textColorHex = this.getAttribute('color-text') || '#111111';
        this._textCloudObject = new TextCloud(new SizeOptions(80, 140, '%'), new ColorOptions(textColorHex, accentColorHex));
        this.redraw();
    }
}

window.customElements.define('next-century-visualization-text-cloud', NextCenturyTextCloudVisualization);
