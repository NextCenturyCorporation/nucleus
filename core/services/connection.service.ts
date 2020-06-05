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

const runRequest = (
    type: string,
    endpoint: string, 
    body: any,
    onSuccess: (response: any) => void,
    onError?: (response: any) => void
): XMLHttpRequest => {
    var xhr = new XMLHttpRequest();
    xhr.open(type, endpoint, true);
    xhr.responseType = 'json';
    if (type === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/json');
    }
    if (onSuccess) {
        xhr.onload = () => {
            onSuccess(xhr.response);
        };
    }
    if (onError) {
        xhr.onerror = () => {
            onError(xhr.response);
        };
    }
    xhr.send(type === 'POST' ? JSON.stringify(body) : body);
    return xhr;
};

export interface MutateObject {
    datastoreHost: string;
    datastoreType: string;
    databaseName: string;
    tableName: string;
    idFieldName: string;
    dataId: any;
    fieldsWithValues: Record<string, any>;
}

export interface Connection<T extends {} = {}> {
    /**
     * Deletes the saved dashboard state with the given name.
     *
     * @arg {string} stateName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @abstract
     */
    deleteState(stateName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): XMLHttpRequest;

    /**
     * Returns the accessible database names.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @abstract
     */
    getDatabaseNames(onSuccess: (response: any) => void, onError?: (response: any) => void): XMLHttpRequest;

    /**
     * Returns the names of the fields in the given database/table.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @abstract
     */
    getFieldNames(databaseName: string, tableName: string, onSuccess: (response: any) => void,
        onError?: (response: any) => void): XMLHttpRequest;

    /**
     * Returns the types of the fields in the given database/table.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @abstract
     */
    getFieldTypes(databaseName: string, tableName: string, onSuccess: (response: any) => void,
        onError?: (response: any) => void): XMLHttpRequest;

    /**
     * Returns the table names in the given database.
     *
     * @arg {string} databaseName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @abstract
     */
    getTableNames(databaseName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): XMLHttpRequest;

    /**
     * Returns the table and field names in the given database.
     *
     * @arg {string} databaseName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @abstract
     */
    getTableNamesAndFieldNames(databaseName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): XMLHttpRequest;

    /**
     * Returns the saved dashboard states.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @abstract
     */
    listStates(limit: number, offset: number, onSuccess: (response: any) => void, onError?: (response: any) => void): XMLHttpRequest;

    /**
     * Loads the saved state with the given name.
     *
     * @arg {string} stateName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @abstract
     */
    loadState(stateName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): XMLHttpRequest;

    /**
     * Runs an export query with the given data and format.
     *
     * @arg {any} exportData
     * @arg {any} exportFormat
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @abstract
     */
    runExportQuery(
        exportData: any,
        exportFormat: any,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): XMLHttpRequest;

    /**
     * Runs an import query with the given payload.
     *
     * @arg {{ hostName: string, dataStoreType: string, database: string, table: string, source: string[], isNew: boolean }} importData
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @abstract
     */
    runImportQuery(
        importData: { hostName: string, dataStoreType: string, database: string, table: string, source: string[], isNew: boolean },
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): XMLHttpRequest;

    /**
     * Runs a mutate query with the given payload.
     *
     * @arg {MutateObject} mutateObject
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @abstract
     */
    runMutate(mutateObject: MutateObject, onSuccess: (response: any) => void, onError?: (response: any) => void): XMLHttpRequest;

    /**
     * Runs a search query with the given payload.
     *
     * @arg {T} searchObject
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @abstract
     */
    runSearch(searchObject: T, onSuccess: (response: any) => void, onError?: (response: any) => void): XMLHttpRequest;

    /**
     * Saves (or overwrites) a state with the given data.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @abstract
     */
    saveState(stateData: any, onSuccess: (response: any) => void, onError?: (response: any) => void): XMLHttpRequest;
}

// Internal class that wraps AbstractSearchService.Connection.  Exported to use in the unit tests.
export class CoreConnection<T extends {} = {}> implements Connection<T> {

    constructor(private dataServerHost: string, private datastoreType: string, private datastoreHost: string) { }

    /**
     * Deletes the saved dashboard state with the given name.
     *
     * @arg {string} stateName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @override
     */
    public deleteState(stateName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): XMLHttpRequest {
        return runRequest('DELETE', this.dataServerHost + 'stateservice/deleteState/' + stateName, null, onSuccess, onError);
    }

    /**
     * Returns the accessible database names.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @override
     */
    public getDatabaseNames(onSuccess: (response: any) => void, onError?: (response: any) => void): XMLHttpRequest {
        const endpoint = this.dataServerHost + 'queryservice/databasenames/' + encodeURIComponent(this.datastoreHost) + '/' +
            encodeURIComponent(this.datastoreType);
        return runRequest('GET', endpoint, null, onSuccess, onError);
    }

    /**
     * Returns the names of the fields in the given database/table.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @override
     */
    public getFieldNames(
        databaseName: string,
        tableName: string,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): XMLHttpRequest {
        const endpoint = this.dataServerHost + 'queryservice/fields/' + encodeURIComponent(this.datastoreHost) + '/' +
            encodeURIComponent(this.datastoreType) + '/' + encodeURIComponent(databaseName) + '/' + encodeURIComponent(tableName);
        return runRequest('GET', endpoint, null, onSuccess, onError);
    }

    /**
     * Returns the types of the fields in the given database/table.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @override
     */
    public getFieldTypes(
        databaseName: string,
        tableName: string,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): XMLHttpRequest {
        const endpoint = this.dataServerHost + 'queryservice/fields/types/' + encodeURIComponent(this.datastoreHost) + '/' +
            encodeURIComponent(this.datastoreType) + '/' + encodeURIComponent(databaseName) + '/' + encodeURIComponent(tableName);
        return runRequest('GET', endpoint, null, onSuccess, onError);
    }

    /**
     * Returns the table names in the given database.
     *
     * @arg {string} databaseName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @override
     */
    public getTableNames(databaseName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): XMLHttpRequest {
        const endpoint = this.dataServerHost + 'queryservice/tablenames/' + encodeURIComponent(this.datastoreHost) + '/' +
            encodeURIComponent(this.datastoreType) + '/' + encodeURIComponent(databaseName);
        return runRequest('GET', endpoint, null, onSuccess, onError);
    }

    /**
     * Returns the table and field names in the given database.
     *
     * @arg {string} databaseName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @override
     */
    public getTableNamesAndFieldNames(
        databaseName: string,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): XMLHttpRequest {
        const endpoint = this.dataServerHost + 'queryservice/tablesandfields/' + encodeURIComponent(this.datastoreHost) + '/' +
            encodeURIComponent(this.datastoreType) + '/' + encodeURIComponent(databaseName);
        return runRequest('GET', endpoint, null, onSuccess, onError);
    }

    /**
     * Returns the saved dashboard states.
     *
     * @arg {number} limit
     * @arg {number} offset
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @override
     */
    public listStates(
        limit: number,
        offset: number,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): XMLHttpRequest {
        return runRequest('GET', this.dataServerHost + 'stateservice/liststates?limit=' + limit + '&offset=' + offset, null, onSuccess,
            onError);
    }

    /**
     * Loads the saved state with the given name.
     *
     * @arg {string} stateName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @override
     */
    public loadState(stateName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): XMLHttpRequest {
        return runRequest('GET', this.dataServerHost + 'stateservice/loadstate?stateName=' + stateName, null, onSuccess, onError);
    }

    /**
     * Runs an export query with the given data and format.
     *
     * @arg {any} exportData
     * @arg {any} exportFormat
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @override
     */
    public runExportQuery(
        exportData: { data: any },
        exportFormat: any,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): XMLHttpRequest {
        return runRequest('POST', this.dataServerHost + 'exportservice/' + exportFormat, exportData, onSuccess, onError);
    }

    /**
     * Runs an import query with the given data and format.
     *
     * @arg {{ hostName: string, dataStoreType: string, database: string, table: string, source: string[], isNew: boolean }} importData
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @override
     */
    public runImportQuery(
        importData: { hostName: string, dataStoreType: string, database: string, table: string, source: string[], isNew: boolean },
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): XMLHttpRequest {
        return runRequest('POST', this.dataServerHost + 'importservice/', importData, onSuccess, onError);
    }

    /**
     * Runs a mutate query with the given data and format.
     *
     * @arg {MutateObject} MutateObject,
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @override
     */
    public runMutate(
        mutateObject: MutateObject,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): XMLHttpRequest {
        return runRequest('POST', this.dataServerHost + 'mutateservice/byid', mutateObject, onSuccess, onError);
    }

    /**
     * Runs a search query with the given payload.
     *
     * @arg {T} searchObject
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @override
     */
    public runSearch(
        searchObject: T,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): XMLHttpRequest {
        const endpoint = this.dataServerHost + 'queryservice/query/' + encodeURIComponent(this.datastoreHost) + '/' +
            encodeURIComponent(this.datastoreType);
        return runRequest('POST', endpoint, searchObject, onSuccess, onError);
    }

    /**
     * Saves (or overwrites) a state with the given data.
     *
     * @arg {any} stateData
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {XMLHttpRequest}
     * @override
     */
    public saveState(
        stateData: any,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): XMLHttpRequest {
        const parameters = (stateData.stateName ? ('?stateName=' + stateData.stateName) : '');
        return runRequest('POST', this.dataServerHost + 'stateservice/savestate' + parameters, stateData, onSuccess, onError);
    }
}

export class ConnectionService {
    // Maps the datastore types to datastore hosts to connections.
    private connections = new Map<string, Map<string, CoreConnection<any>>>();
    private dataServerHost: string = 'http://localhost:8080/neon/services/';
    private dataUpdateSource;

    /**
     * Returns an existing connection to the REST server using the given host and the given datastore type (like elasticsearch or sql), or
     * creates and returns a connection if none exists.
     */
    public connect<T extends {} = {}>(datastoreType: string, datastoreHost: string): CoreConnection<T> {
        if (datastoreType && datastoreHost) {
            if (!this.connections.has(datastoreType)) {
                this.connections.set(datastoreType, new Map<string, CoreConnection<T>>());
            }
            if (!this.connections.get(datastoreType).has(datastoreHost)) {
                const connection: CoreConnection = new CoreConnection<T>(this.dataServerHost, datastoreType, datastoreHost);
                this.connections.get(datastoreType).set(datastoreHost, connection);
            }
            return this.connections.get(datastoreType).get(datastoreHost);
        }
        return null;
    }

    /**
     * Returns the NUCLEUS Data Server status.
     */
    public getServerStatus(onSuccess: (response: any) => void, onError?: (response: any) => void): XMLHttpRequest {
        return runRequest('GET', this.dataServerHost + 'admin/status', null, onSuccess, onError);
    }

    /**
     * Registers a new HTML server-sent event (EventSource) listener for data updates from the NUCLEUS Data Server.
     */
    public listenOnDataUpdate(onUpdate: (response: any) => void, reset: boolean = false) {
        if (!this.dataUpdateSource || reset) {
            this.dataUpdateSource = new EventSource(this.dataServerHost + 'dataset/listen');
            this.dataUpdateSource.addEventListener('message', onUpdate);
        }
    }

    /**
     * Sets the hostname for the NUCLEUS Data Server. Examples: http://localhost:8080/neon, ../neon
     */
    public setDataServerHost(dataServerHost: string): void {
        this.dataServerHost = dataServerHost + (dataServerHost.substr(-1) === '/' ? '' : '/') + 'services/';
    }
}
