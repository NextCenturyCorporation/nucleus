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
import { NextCenturyElement } from '../../core/components/element.web-component';
export declare class NextCenturyTextCloudVisualization extends NextCenturyElement {
    private _data;
    private _filtered;
    private _shadowRoot;
    private _textCloudObject;
    private _visElement;
    static readonly observedAttributes: string[];
    constructor();
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    /**
     * Changes the filtered text to the given text or array of text and redraws the visualization using the existing data.
     */
    changeFilteredText(text: any | any[]): void;
    /**
     * Draws the visualization using the given data array and returns the unique data items.
     */
    drawData(data: any[]): number;
    /**
     * Redraws the text cloud.
     */
    redraw(): void;
    /**
     * Toggles the filtered status of the given text cloud data item.
     */
    toggleFilter(text: string): void;
    private _createVisualizationAndRedrawData;
}
