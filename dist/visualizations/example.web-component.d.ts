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
import { NucleusElement } from '../core/components/element.web-component';
export declare class NucleusExample extends NucleusElement {
    private _data;
    private _selected;
    private _shadowRoot;
    private _visElement;
    static readonly observedAttributes: string[];
    constructor();
    changeSelectedText(text: any | any[]): void;
    drawData(data: any[]): void;
    select(item: any): void;
    private _redrawData;
}
