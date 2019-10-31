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
var connection_service_1 = require("./connection.service");
describe('ConnectionService', function () {
    var service;
    beforeEach(function () {
        service = new connection_service_1.ConnectionService();
    });
    it('createConnection does return a new connection', function () {
        var connection = new neon_framework_1.query.Connection();
        spyOn(service, 'neonConnection').and.returnValue(connection);
        var spy = spyOn(connection, 'connect');
        var output = service.connect('elasticsearchrest', 'localhost');
        expect(output.connection).toEqual(connection);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['elasticsearchrest', 'localhost', false]);
    });
    it('createConnection does return an existing connection', function () {
        var existingConnection = new connection_service_1.CoreConnection(new neon_framework_1.query.Connection());
        service['connections'].set('elasticsearchrest', new Map());
        service['connections'].get('elasticsearchrest').set('localhost', existingConnection);
        var connection = new neon_framework_1.query.Connection();
        spyOn(service, 'neonConnection').and.returnValue(connection);
        var spy = spyOn(connection, 'connect');
        var output = service.connect('elasticsearchrest', 'localhost');
        expect(output).toEqual(existingConnection);
        expect(spy.calls.count()).toEqual(0);
    });
});
//# sourceMappingURL=connection.service.spec.js.map