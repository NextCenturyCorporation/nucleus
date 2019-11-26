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
import { query, ImportQuery } from 'neon-framework';

export interface RequestWrapper {
    abort(): void;
    always(callback: Function): void;
    done(callback: Function): void;
    fail(callback: Function): void;
}

export interface Connection<T extends {} = {}> {

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
     * Returns the names of the fields in the given database/table.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @abstract
     */
    getFieldNames(databaseName: string, tableName: string, onSuccess: (response: any) => void,
        onError?: (response: any) => void): RequestWrapper;

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
    getFieldTypes(databaseName: string, tableName: string, onSuccess: (response: any) => void,
        onError?: (response: any) => void): RequestWrapper;

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
     * Returns the table names in the given database.
     *
     * @arg {string} databaseName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @abstract
     */
    getTableNames(databaseName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;

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
    runExportQuery(
        exportData: any,
        exportFormat: any,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): RequestWrapper;

    /**
     * Runs a search query with the given payload.
     *
     * @arg {T} searchObject
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @abstract
     */
    runSearch(searchObject: T, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper;

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

// Internal class that wraps AbstractSearchService.Connection.  Exported to use in the unit tests.
export class CoreConnection<T extends {} = {}> implements Connection<T> {
    constructor(public connection: query.Connection) { }

    /**
     * Deletes the saved dashboard state with the given name.
     *
     * @arg {string} stateName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    public deleteState(stateName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper {
        return this.connection.deleteState(stateName, onSuccess, onError);
    }

    /**
     * Returns the accessible database names.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    public getDatabaseNames(onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper {
        return this.connection.getDatabaseNames(onSuccess, onError);
    }

    /**
     * Returns the names of the fields in the given database/table.
     *
     * @arg {string} databaseName
     * @arg {string} tableName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    public getFieldNames(
        databaseName: string,
        tableName: string,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): RequestWrapper {
        return this.connection.getFieldNames(databaseName, tableName, onSuccess, onError);
    }

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
    public getFieldTypes(
        databaseName: string,
        tableName: string,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): RequestWrapper {
        return this.connection.getFieldTypes(databaseName, tableName, onSuccess, onError);
    }

    /**
     * Returns the saved dashboard states.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    public listStates(limit: number, offset: number, onSuccess: (response: any) => void,
        onError?: (response: any) => void): RequestWrapper {
        return this.connection.listStates(limit, offset, onSuccess, onError);
    }

    /**
     * Returns the table names in the given database.
     *
     * @arg {string} databaseName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    public getTableNames(databaseName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper {
        return this.connection.getTableNames(databaseName, onSuccess, onError);
    }

    /**
     * Returns the table and field names in the given database.
     *
     * @arg {string} databaseName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    public getTableNamesAndFieldNames(
        databaseName: string,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): RequestWrapper {
        return this.connection.getTableNamesAndFieldNames(databaseName, onSuccess, onError);
    }

    /**
     * Loads the saved state with the given name.
     *
     * @arg {string} stateName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    public loadState(stateName: string, onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper {
        return this.connection.loadState({
            stateName: stateName
        }, onSuccess, onError);
    }

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
    public runExportQuery(
        exportData: { data: any },
        exportFormat: any,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): RequestWrapper {
        return this.connection.executeExport(exportData, onSuccess, onError, exportFormat);
    }

    /**
     * Runs an import query with the given data and format.
     *
     * @arg {any} exportData
     * @arg {any} exportFormat
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    public runImportQuery(
        importQuery: ImportQuery,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): RequestWrapper {
        return this.connection.executeImport(importQuery, onSuccess, onError);
    }

    /**
     * Runs a search query with the given payload.
     *
     * @arg {T} searchObject
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    public runSearch(
        searchObject: T,
        __onSuccess: (response: any) => void,
        __onError?: (response: any) => void
    ): RequestWrapper {
        return this.connection.executeQuery(searchObject, null);
    }

    /**
     * Saves (or overwrites) a state with the given data.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    public saveState(
        stateData: any,
        onSuccess: (response: any) => void,
        onError?: (response: any) => void
    ): RequestWrapper {
        return this.connection.saveState(stateData, onSuccess, onError);
    }
}

export class ConnectionService {
    // Maps the datastore types to datastore hosts to connections.
    private connections = new Map<string, Map<string, CoreConnection<any>>>();

    /**
     * Returns an existing connection to the REST server using the given host and the given datastore type (like elasticsearch or sql), or
     * creates and returns a connection if none exists.
     */
    public connect<T extends {} = {}>(
        datastoreType: string,
        datastoreHost: string,
        startListener: boolean = false
    ): CoreConnection<T> {
        if (datastoreType && datastoreHost) {
            if (!this.connections.has(datastoreType)) {
                this.connections.set(datastoreType, new Map<string, CoreConnection<T>>());
            }
            if (!this.connections.get(datastoreType).has(datastoreHost)) {
                let connection = this.neonConnection();
                connection.connect(datastoreType, datastoreHost, !startListener);
                this.connections.get(datastoreType).set(datastoreHost, new CoreConnection<T>(connection));
            }
            return this.connections.get(datastoreType).get(datastoreHost);
        }
        return null;
    }

    /**
     * Returns the server status.
     */
    public getServerStatus(onSuccess: (response: any) => void, onError?: (response: any) => void): RequestWrapper {
        return query.getServerStatus(onSuccess, onError);
    }

    private neonConnection(): query.Connection {
        return new query.Connection();
    }
}
