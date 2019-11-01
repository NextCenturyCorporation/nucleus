"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var neon_framework_1 = require("neon-framework");
// Internal class that wraps AbstractSearchService.Connection.  Exported to use in the unit tests.
var CoreConnection = /** @class */ (function () {
    function CoreConnection(connection) {
        this.connection = connection;
    }
    /**
     * Deletes the saved dashboard state with the given name.
     *
     * @arg {string} stateName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    CoreConnection.prototype.deleteState = function (stateName, onSuccess, onError) {
        return this.connection.deleteState(stateName, onSuccess, onError);
    };
    /**
     * Returns the accessible database names.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    CoreConnection.prototype.getDatabaseNames = function (onSuccess, onError) {
        return this.connection.getDatabaseNames(onSuccess, onError);
    };
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
    CoreConnection.prototype.getFieldTypes = function (databaseName, tableName, onSuccess, onError) {
        return this.connection.getFieldTypes(databaseName, tableName, onSuccess, onError);
    };
    /**
     * Returns the saved dashboard states.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    CoreConnection.prototype.listStates = function (limit, offset, onSuccess, onError) {
        return this.connection.listStates(limit, offset, onSuccess, onError);
    };
    /**
     * Returns the table and field names in the given database.
     *
     * @arg {string} databaseName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    CoreConnection.prototype.getTableNamesAndFieldNames = function (databaseName, onSuccess, onError) {
        return this.connection.getTableNamesAndFieldNames(databaseName, onSuccess, onError);
    };
    /**
     * Loads the saved state with the given name.
     *
     * @arg {string} stateName
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    CoreConnection.prototype.loadState = function (stateName, onSuccess, onError) {
        return this.connection.loadState({
            stateName: stateName
        }, onSuccess, onError);
    };
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
    CoreConnection.prototype.runExportQuery = function (exportData, exportFormat, onSuccess, onError) {
        return this.connection.executeExport(exportData, onSuccess, onError, exportFormat);
    };
    /**
     * Runs a search query with the given payload.
     *
     * @arg {T} queryPayload
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    CoreConnection.prototype.runSearchQuery = function (queryPayload, __onSuccess, __onError) {
        return this.connection.executeQuery(queryPayload.query, null);
    };
    /**
     * Saves (or overwrites) a state with the given data.
     *
     * @arg {(response: any) => void} onSuccess
     * @arg {(response: any) => void} [onError]
     * @return {RequestWrapper}
     * @override
     */
    CoreConnection.prototype.saveState = function (stateData, onSuccess, onError) {
        return this.connection.saveState(stateData, onSuccess, onError);
    };
    return CoreConnection;
}());
exports.CoreConnection = CoreConnection;
var ConnectionService = /** @class */ (function () {
    function ConnectionService() {
        // Maps the datastore types to datastore hosts to connections.
        this.connections = new Map();
    }
    /**
     * Returns an existing connection to the REST server using the given host and the given datastore type (like elasticsearch or sql), or
     * creates and returns a connection if none exists.
     */
    ConnectionService.prototype.connect = function (datastoreType, datastoreHost, ignoreUpdates) {
        if (ignoreUpdates === void 0) { ignoreUpdates = false; }
        if (datastoreType && datastoreHost) {
            if (!this.connections.has(datastoreType)) {
                this.connections.set(datastoreType, new Map());
            }
            if (!this.connections.get(datastoreType).has(datastoreHost)) {
                var connection = this.neonConnection();
                connection.connect(datastoreType, datastoreHost, ignoreUpdates);
                this.connections.get(datastoreType).set(datastoreHost, new CoreConnection(connection));
            }
            return this.connections.get(datastoreType).get(datastoreHost);
        }
        return null;
    };
    ConnectionService.prototype.neonConnection = function () {
        return new neon_framework_1.query.Connection();
    };
    return ConnectionService;
}());
exports.ConnectionService = ConnectionService;
//# sourceMappingURL=connection.service.js.map