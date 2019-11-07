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
import { query } from 'neon-framework';
export interface RequestWrapper {
    abort(): void;
    always(callback: Function): void;
    done(callback: Function): void;
    fail(callback: Function): void;
}
export interface Connection<T extends {
    query: any;
} = {
    query: any;
}> {
    /**
     * Deletes the saved dashboard state with the given name.
     *
     * @arg {string} stateName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @abstract
     */
    deleteState(stateName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Returns the accessible database names.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @abstract
     */
    getDatabaseNames(onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Returns the types of the fields in the given database/table.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @abstract
     */
    getFieldTypes(databaseName: string, tableName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Returns the saved dashboard states.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @abstract
     */
    listStates(limit: number, offset: number, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Returns the table and field names in the given database.
     *
     * @arg {string} databaseName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @abstract
     */
    getTableNamesAndFieldNames(databaseName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Loads the saved state with the given name.
     *
     * @arg {string} stateName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @abstract
     */
    loadState(stateName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Runs an export query with the given data and format.
     *
     * @arg {any} exportData
     * @arg {any} exportFormat
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @abstract
     */
    runExportQuery(exportData: any, exportFormat: any, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Runs a search query with the given payload.
     *
     * @arg {T} queryPayload
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @abstract
     */
    runSearchQuery(queryPayload: T, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Saves (or overwrites) a state with the given data.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @abstract
     */
    saveState(stateData: any, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
}
export declare class CoreConnection<T extends {
    query: any;
} = {
    query: any;
}> implements Connection<T> {
    connection: query.Connection;
    constructor(connection: query.Connection);
    /**
     * Deletes the saved dashboard state with the given name.
     *
     * @arg {string} stateName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    deleteState(stateName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Returns the accessible database names.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    getDatabaseNames(onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Returns the types of the fields in the given database/table.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    getFieldTypes(databaseName: string, tableName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Returns the saved dashboard states.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    listStates(limit: number, offset: number, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Returns the table and field names in the given database.
     *
     * @arg {string} databaseName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    getTableNamesAndFieldNames(databaseName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Loads the saved state with the given name.
     *
     * @arg {string} stateName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    loadState(stateName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Runs an export query with the given data and format.
     *
     * @arg {any} exportData
     * @arg {any} exportFormat
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    runExportQuery(exportData: {
        data: any;
    }, exportFormat: any, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    /**
     * Runs a search query with the given payload.
     *
     * @arg {T} queryPayload
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    runSearchQuery(queryPayload: T, __onSuccess: (response: any) => void, __onError?: (response: any) => void): RequestWrapper;
    /**
     * Saves (or overwrites) a state with the given data.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    saveState(stateData: any, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
}
export declare class ConnectionService {
    private connections;
    /**
     * Returns an existing connection to the REST server using the given host and the given datastore type (like elasticsearch or sql), or
     * creates and returns a connection if none exists.
     */
    connect<T extends {
        query: any;
    } = {
        query: any;
    }>(datastoreType: string, datastoreHost: string, ignoreUpdates?: boolean): CoreConnection<T>;
    /**
     * Returns the server status.
     */
    getServerStatus(onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;
    private neonConnection;
}
