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
import { Dataset, DatastoreConfig, DatabaseConfig, FieldConfig, TableConfig } from './dataset';
export declare const FIELD_MAP: {
    CATEGORY: FieldConfig;
    DATE: FieldConfig;
    FIELD_KEY: FieldConfig;
    FILTER: FieldConfig;
    ID: FieldConfig;
    LINK: FieldConfig;
    NAME: FieldConfig;
    RELATION_A: FieldConfig;
    RELATION_B: FieldConfig;
    SIZE: FieldConfig;
    SORT: FieldConfig;
    TEXT: FieldConfig;
    TYPE: FieldConfig;
    X: FieldConfig;
    Y: FieldConfig;
    ES_ID: FieldConfig;
};
export declare const FIELDS: FieldConfig[];
export declare const TABLES: {
    testTable1: TableConfig;
    testTable2: TableConfig;
};
export declare const TABLES_LIST: TableConfig[];
export declare const DATABASES: {
    testDatabase1: DatabaseConfig;
    testDatabase2: DatabaseConfig;
};
export declare const DATABASES_LIST: DatabaseConfig[];
export declare const DATASTORE: DatastoreConfig;
export declare const TABLE_KEYS: Record<string, string>;
export declare const FIELD_KEYS: Record<string, string>;
export declare const DATASET: Dataset;
