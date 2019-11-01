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
import { Color, ColorMap, ColorSet } from '../models/color';
export interface Theme {
    id: string;
    name: string;
}
export declare abstract class AbstractColorThemeService {
    /**
     * Returns the color for the given value from an existing color set for the given database/table/field or creates a new color set if
     * none exists.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {string} fieldName
     * @arg {string|string[]} value
     * @return {Color}
     * @abstract
     */
    abstract getColor(databaseName: string, tableName: string, fieldName: string, value: string | string[]): Color;
    /**
     * Returns the unique key for the given database/table/field.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {string} fieldName
     * @return {string}
     * @abstract
     */
    abstract getColorKey(databaseName: string, tableName: string, fieldName: string): string;
    /**
     * Returns the color set for the given database/table/field key.
     *
     * @arg {string} colorKey
     * @return {ColorSet}
     * @abstract
     */
    abstract getColorSet(colorKey: string): ColorSet;
    /**
     * Returns the ID for the current application theme.
     *
     * @return {string}
     * @abstract
     */
    abstract getTheme(): string;
    /**
     * Returns the list of available application themes.
     *
     * @return {Theme[]}
     * @abstract
     */
    abstract getThemes(): Theme[];
    /**
     * Returns the accent color for the current application theme.
     *
     * @return {Color}
     * @abstract
     */
    abstract getThemeAccentColor(): Color;
    /**
     * Returns the hex for the accent color for the current application theme.
     *
     * @return {string}
     * @abstract
     */
    abstract getThemeAccentColorHex(): string;
    /**
     * Returns the text color for the current application theme.
     *
     * @return {Color}
     * @abstract
     */
    abstract getThemeTextColor(): Color;
    /**
     * Returns the hex for the text color for the current application theme.
     *
     * @return {string}
     * @abstract
     */
    abstract getThemeTextColorHex(): string;
    /**
     * Initializes the starting colors using the given input.
     *
     * @arg {ColorMap} colors
     * @abstract
     */
    abstract initializeColors(colors: ColorMap): void;
    /**
     * Sets the current application theme to the theme with the given ID.
     *
     * @arg {string} id
     * @abstract
     */
    abstract setTheme(id: string): void;
}
