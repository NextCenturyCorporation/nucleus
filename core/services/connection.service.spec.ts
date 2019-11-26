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

import { ConnectionService, CoreConnection } from './connection.service';

describe('ConnectionService', () => {
    let service: ConnectionService;

    beforeEach(() => {
        service = new ConnectionService();
    });

    it('createConnection does return a new connection', () => {
        let connection = new query.Connection();
        spyOn(service, 'neonConnection').and.returnValue(connection);
        let spy = spyOn(connection, 'connect');

        let output = service.connect('elasticsearchrest', 'localhost');

        expect(output.connection).toEqual(connection);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['elasticsearchrest', 'localhost', true]);
    });

    it('createConnection does return an existing connection', () => {
        let existingConnection = new CoreConnection(new query.Connection());
        service['connections'].set('elasticsearchrest', new Map<string, any>());
        service['connections'].get('elasticsearchrest').set('localhost', existingConnection);

        let connection = new query.Connection();
        spyOn(service, 'neonConnection').and.returnValue(connection);
        let spy = spyOn(connection, 'connect');

        let output = service.connect('elasticsearchrest', 'localhost');

        expect(output).toEqual(existingConnection);
        expect(spy.calls.count()).toEqual(0);
    });
});
