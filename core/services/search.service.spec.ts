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

import { AggregationType, CompoundFilterType, SortOrder, TimeInterval } from '../models/config-option';
import { ConnectionService } from './connection.service';
import { SearchService, CoreGroupWrapper, CoreWhereWrapper, CoreQueryWrapper } from './search.service';

import { query } from 'neon-framework';

// TODO How can we call query.and and query.or without using "apply" ?
/* eslint-disable no-useless-call */

describe('Service: Search', () => {
    let service: SearchService;

    beforeEach(() => {
        service = new SearchService(new ConnectionService());
    });

    it('buildCompoundFilterClause does return expected filter clause', () => {
        expect(service.buildCompoundFilterClause([
            new CoreWhereWrapper(query.where('field1', '=', 'value1')),
            new CoreWhereWrapper(query.where('field2', '=', 'value2'))
        ])).toEqual(new CoreWhereWrapper(query.and.apply(query, [
            query.where('field1', '=', 'value1'),
            query.where('field2', '=', 'value2')
        ])));

        expect(service.buildCompoundFilterClause([
            new CoreWhereWrapper(query.where('field1', '=', 'value1')),
            new CoreWhereWrapper(query.where('field2', '=', 'value2'))
        ], CompoundFilterType.OR)).toEqual(new CoreWhereWrapper(query.or.apply(query, [
            query.where('field1', '=', 'value1'),
            query.where('field2', '=', 'value2')
        ])));

        expect(service.buildCompoundFilterClause([
            new CoreWhereWrapper(query.where('field1', '=', 'value1')),
            new CoreWhereWrapper(query.or.apply(query, [
                query.where('field2', '=', 'value2'),
                query.where('field3', '=', 'value3')
            ]))
        ])).toEqual(new CoreWhereWrapper(query.and.apply(query, [
            query.where('field1', '=', 'value1'),
            query.or.apply(query, [
                query.where('field2', '=', 'value2'),
                query.where('field3', '=', 'value3')
            ])
        ])));
    });

    it('buildCompoundFilterClause does not wrap single filter clause', () => {
        expect(service.buildCompoundFilterClause([new CoreWhereWrapper(query.where('field', '=', 'value'))])).toEqual(
            new CoreWhereWrapper(query.where('field', '=', 'value'))
        );
    });

    it('buildDateQueryGroup does return expected query group', () => {
        expect(service.buildDateQueryGroup('groupField', TimeInterval.MINUTE)).toEqual(new CoreGroupWrapper(
            new query.GroupByFunctionClause('minute', 'groupField', '_minute')
        ));
        expect(service.buildDateQueryGroup('groupField', TimeInterval.HOUR)).toEqual(new CoreGroupWrapper(
            new query.GroupByFunctionClause('hour', 'groupField', '_hour')
        ));
        expect(service.buildDateQueryGroup('groupField', TimeInterval.DAY_OF_MONTH)).toEqual(new CoreGroupWrapper(
            new query.GroupByFunctionClause('dayOfMonth', 'groupField', '_dayOfMonth')
        ));
        expect(service.buildDateQueryGroup('groupField', TimeInterval.MONTH)).toEqual(new CoreGroupWrapper(
            new query.GroupByFunctionClause('month', 'groupField', '_month')
        ));
        expect(service.buildDateQueryGroup('groupField', TimeInterval.YEAR)).toEqual(new CoreGroupWrapper(
            new query.GroupByFunctionClause('year', 'groupField', '_year')
        ));
    });

    it('buildFilterClause does return expected filter clause', () => {
        expect(service.buildFilterClause('field', '=', 'value')).toEqual(new CoreWhereWrapper(query.where('field', '=', 'value')));
    });

    it('buildQueryGroup does return expected query group', () => {
        expect(service.buildQueryGroup('groupField')).toEqual(new CoreGroupWrapper('groupField'));
    });

    it('buildQueryPayload does return expected query payload', () => {
        expect(service.buildQueryPayload('database', 'table')).toEqual(new CoreQueryWrapper(new query.Query().selectFrom('database',
            'table')));

        expect(service.buildQueryPayload('database', 'table', ['field'])).toEqual(new CoreQueryWrapper(new query.Query().selectFrom(
            'database', 'table'
        ).withFields(['field'])));

        expect(service.buildQueryPayload('database', 'table', ['field1', 'field2'])).toEqual(new CoreQueryWrapper(new query.Query()
            .selectFrom('database', 'table').withFields(['field1', 'field2'])));

        expect(service.buildQueryPayload('database', 'table', [])).toEqual(new CoreQueryWrapper(new query.Query().selectFrom('database',
            'table')));
    });

    it('canRunSearch does return false with no active connection', () => {
        let spy = spyOn(service['connectionService'], 'connect').and.returnValue(null);

        expect(service.canRunSearch('type', 'host')).toEqual(false);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['type', 'host']);
    });

    it('canRunSearch does return true with active connection', () => {
        let spy = spyOn(service['connectionService'], 'connect').and.returnValue({});

        expect(service.canRunSearch('type', 'host')).toEqual(true);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['type', 'host']);
    });

    it('runSearch does call expected function', () => {
        let queryPayload = new CoreQueryWrapper(new query.Query());
        let called = 0;
        let spy = spyOn(service['connectionService'], 'connect').and.returnValue({
            runSearchQuery: (queryInput, __options) => {
                expect(queryInput).toEqual(queryPayload);
                called++;
            }
        });

        service.runSearch('type', 'host', queryPayload);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['type', 'host']);
        expect(called).toEqual(1);
    });

    it('transformFilterClauseValues does work as expected', () => {
        let map = {
            field: {
                newValue: 'oldValue'
            }
        };

        let input1 = new query.Query().where(query.where('field', '=', 'oldValue'));
        service.transformFilterClauseValues(new CoreQueryWrapper(input1), {});
        expect(input1).toEqual(new query.Query().where(query.where('field', '=', 'oldValue')));

        let input2 = new query.Query().where(query.where('field', '=', 'oldValue'));
        service.transformFilterClauseValues(new CoreQueryWrapper(input2), map);
        expect(input2).toEqual(new query.Query().where(query.where('field', '=', 'newValue')));

        let input3 = new query.Query().where(query.where('field', '=', 'otherValue'));
        service.transformFilterClauseValues(new CoreQueryWrapper(input3), map);
        expect(input3).toEqual(new query.Query().where(query.where('field', '=', 'otherValue')));

        let input4 = new query.Query().where(query.where('otherField', '=', 'oldValue'));
        service.transformFilterClauseValues(new CoreQueryWrapper(input4), map);
        expect(input4).toEqual(new query.Query().where(query.where('otherField', '=', 'oldValue')));
    });

    it('transformFilterClauseValues does work as expected with bool filter', () => {
        let map = {
            field1: {
                newValue1: 'oldValue1'
            },
            field2: {
                newValue2: 'oldValue2',
                newValue3: 'oldValue3'
            }
        };

        let input = new query.Query().where(query.and.apply(query, [
            query.where('field1', '=', 'oldValue1'),
            query.where('field1', '=', 'oldValue2'),
            query.where('field2', '=', 'oldValue2'),
            query.where('field2', '=', 'oldValue3'),
            query.or.apply(query, [
                query.where('field1', '=', 'oldValue1'),
                query.where('field1', '=', 'oldValue2'),
                query.where('field2', '=', 'oldValue2'),
                query.where('field2', '=', 'oldValue3')
            ])
        ]));
        service.transformFilterClauseValues(new CoreQueryWrapper(input), map);
        expect(input).toEqual(new query.Query().where(query.and.apply(query, [
            query.where('field1', '=', 'newValue1'),
            query.where('field1', '=', 'oldValue2'),
            query.where('field2', '=', 'newValue2'),
            query.where('field2', '=', 'newValue3'),
            query.or.apply(query, [
                query.where('field1', '=', 'newValue1'),
                query.where('field1', '=', 'oldValue2'),
                query.where('field2', '=', 'newValue2'),
                query.where('field2', '=', 'newValue3')
            ])
        ])));
    });

    it('transformQueryPayloadToExport does return expected data', () => {
        let fields = [{
            columnName: 'field1',
            prettyName: 'Pretty Field 1'
        }, {
            columnName: 'field2',
            prettyName: 'Pretty Field 2'
        }, {
            columnName: 'field3',
            prettyName: 'Pretty Field 3'
        }];

        let queryInput = new query.Query().withFields('field1', 'field2');
        let queryWrapper = new CoreQueryWrapper(queryInput);

        expect(service.transformQueryPayloadToExport('testHost', 'testStore', fields, queryWrapper, 'Test Name')).toEqual({
            data: {
                fieldNamePrettyNamePairs: [{
                    query: 'field1',
                    pretty: 'Pretty Field 1'
                }, {
                    query: 'field2',
                    pretty: 'Pretty Field 2'
                }],
                fileName: 'Test Name',
                query: queryInput,
                hostName: 'testHost',
                dataStoreType: 'testStore'
            }
        });
    });

    it('transformQueryPayloadToExport does need fields argument to work as expected', () => {
        let queryInput = new query.Query().withFields('field1', 'field2');

        expect(service.transformQueryPayloadToExport('testHost', 'testStore', [], new CoreQueryWrapper(queryInput), 'Test Name')).toEqual({
            data: {
                fileName: 'Test Name',
                dataStoreType: 'testStore',
                hostName: 'testHost',
                query: queryInput,
                fieldNamePrettyNamePairs: []
            }
        });
    });

    it('transformQueryPayloadToExport does ignore fields duplicated in the query', () => {
        let fields = [{
            columnName: 'field1',
            prettyName: 'Pretty Field 1'
        }, {
            columnName: 'field2',
            prettyName: 'Pretty Field 2'
        }, {
            columnName: 'field3',
            prettyName: 'Pretty Field 3'
        }];

        let queryInput = new query.Query().withFields('field1', 'field1', 'field2');
        let queryWrapper = new CoreQueryWrapper(queryInput);

        expect(service.transformQueryPayloadToExport('testHost', 'testStore', fields, queryWrapper, 'Test Name')).toEqual({
            data: {
                fieldNamePrettyNamePairs: [{
                    query: 'field1',
                    pretty: 'Pretty Field 1'
                }, {
                    query: 'field2',
                    pretty: 'Pretty Field 2'
                }],
                fileName: 'Test Name',
                query: queryInput,
                hostName: 'testHost',
                dataStoreType: 'testStore'
            }
        });
    });

    it('transformQueryPayloadToExport does add function groups', () => {
        let fields = [{
            columnName: 'field1',
            prettyName: 'Pretty Field 1'
        }, {
            columnName: 'field2',
            prettyName: 'Pretty Field 2'
        }, {
            columnName: 'field3',
            prettyName: 'Pretty Field 3'
        }];

        let queryInput = new query.Query().withFields('field1', 'field2').groupBy([
            new query.GroupByFunctionClause('minute', 'field2', '_minute'),
            new query.GroupByFunctionClause('hour', 'field2', '_hour'),
            new query.GroupByFunctionClause('dayOfMonth', 'field2', '_dayOfMonth'),
            new query.GroupByFunctionClause('month', 'field2', '_month'),
            new query.GroupByFunctionClause('year', 'field2', '_year')
        ]);

        let queryWrapper = new CoreQueryWrapper(queryInput);
        expect(service.transformQueryPayloadToExport('testHost', 'testStore', fields, queryWrapper, 'Test Name')).toEqual({
            data: {
                fieldNamePrettyNamePairs: [{
                    query: 'field1',
                    pretty: 'Pretty Field 1'
                }, {
                    query: '_minute',
                    pretty: 'Minute Pretty Field 2'
                }, {
                    query: '_hour',
                    pretty: 'Hour Pretty Field 2'
                }, {
                    query: '_dayOfMonth',
                    pretty: 'Day Pretty Field 2'
                }, {
                    query: '_month',
                    pretty: 'Month Pretty Field 2'
                }, {
                    query: '_year',
                    pretty: 'Year Pretty Field 2'
                }],
                fileName: 'Test Name',
                query: queryInput,
                hostName: 'testHost',
                dataStoreType: 'testStore'
            }
        });
    });

    it('transformQueryPayloadToExport does add aggregations', () => {
        let fields = [{
            columnName: 'field1',
            prettyName: 'Pretty Field 1'
        }, {
            columnName: 'field2',
            prettyName: 'Pretty Field 2'
        }, {
            columnName: 'field3',
            prettyName: 'Pretty Field 3'
        }];

        /* eslint-disable-next-line dot-notation */
        let queryInput = new query.Query().withFields('field1', 'field2').aggregate(query['COUNT'], 'field1', '_count');
        let queryWrapper = new CoreQueryWrapper(queryInput);
        expect(service.transformQueryPayloadToExport('testHost', 'testStore', fields, queryWrapper, 'Test Name')).toEqual({
            data: {
                fieldNamePrettyNamePairs: [{
                    query: 'field1',
                    pretty: 'Pretty Field 1'
                }, {
                    query: 'field2',
                    pretty: 'Pretty Field 2'
                }, {
                    query: '_count',
                    pretty: 'Count Pretty Field 1'
                }],
                fileName: 'Test Name',
                query: queryInput,
                hostName: 'testHost',
                dataStoreType: 'testStore'
            }
        });
    });

    it('transformQueryPayloadToExport does remove fields of non-count aggregations', () => {
        let fields = [{
            columnName: 'field1',
            prettyName: 'Pretty Field 1'
        }, {
            columnName: 'field2',
            prettyName: 'Pretty Field 2'
        }, {
            columnName: 'field3',
            prettyName: 'Pretty Field 3'
        }, {
            columnName: 'field4',
            prettyName: 'Pretty Field 4'
        }, {
            columnName: 'field5',
            prettyName: 'Pretty Field 5'
        }];

        /* eslint-disable dot-notation */
        let queryInput = new query.Query().withFields('field1', 'field2', 'field3', 'field4', 'field5')
            .aggregate(query['AVG'], 'field1', '_avg')
            .aggregate(query['MAX'], 'field2', '_max')
            .aggregate(query['MIN'], 'field3', '_min')
            .aggregate(query['SUM'], 'field4', '_sum');
        /* eslint-enable dot-notation */

        let queryWrapper = new CoreQueryWrapper(queryInput);
        expect(service.transformQueryPayloadToExport('testHost', 'testStore', fields, queryWrapper, 'Test Name')).toEqual({
            data: {
                fieldNamePrettyNamePairs: [{
                    query: 'field5',
                    pretty: 'Pretty Field 5'
                }, {
                    query: '_avg',
                    pretty: 'Average Pretty Field 1'
                }, {
                    query: '_max',
                    pretty: 'Maximum Pretty Field 2'
                }, {
                    query: '_min',
                    pretty: 'Minimum Pretty Field 3'
                }, {
                    query: '_sum',
                    pretty: 'Sum Pretty Field 4'
                }],
                fileName: 'Test Name',
                query: queryInput,
                hostName: 'testHost',
                dataStoreType: 'testStore'

            }
        });
    });

    it('transformQueryPayloadToExport does work with both groups and aggregations', () => {
        let fields = [{
            columnName: 'field1',
            prettyName: 'Pretty Field 1'
        }, {
            columnName: 'field2',
            prettyName: 'Pretty Field 2'
        }, {
            columnName: 'field3',
            prettyName: 'Pretty Field 3'
        }];

        /* eslint-disable dot-notation */
        let queryInput = new query.Query().withFields('field1', 'field2').groupBy([
            new query.GroupByFunctionClause('month', 'field2', '_month'),
            new query.GroupByFunctionClause('year', 'field2', '_year')
        ]).aggregate(query['COUNT'], 'field1', '_count');
        /* eslint-enable dot-notation */

        let queryWrapper = new CoreQueryWrapper(queryInput);
        expect(service.transformQueryPayloadToExport('testHost', 'testStore', fields, queryWrapper, 'Test Name')).toEqual({
            data: {
                fieldNamePrettyNamePairs: [{
                    query: 'field1',
                    pretty: 'Pretty Field 1'
                }, {
                    query: '_month',
                    pretty: 'Month Pretty Field 2'
                }, {
                    query: '_year',
                    pretty: 'Year Pretty Field 2'
                }, {
                    query: '_count',
                    pretty: 'Count Pretty Field 1'
                }],
                fileName: 'Test Name',
                query: queryInput,
                hostName: 'testHost',
                dataStoreType: 'testStore'
            }
        });
    });

    it('transformQueryPayloadToExport does work with wildcard fields', () => {
        let fields = [{
            columnName: 'field1',
            prettyName: 'Pretty Field 1'
        }, {
            columnName: 'field2',
            prettyName: 'Pretty Field 2'
        }, {
            columnName: 'field3',
            prettyName: 'Pretty Field 3'
        }];

        let queryInput = new query.Query().withFields('*');
        let queryWrapper = new CoreQueryWrapper(queryInput);
        expect(service.transformQueryPayloadToExport('testHost', 'testStore', fields, queryWrapper, 'Test Name')).toEqual({
            data: {
                fieldNamePrettyNamePairs: [{
                    query: 'field1',
                    pretty: 'Pretty Field 1'
                }, {
                    query: 'field2',
                    pretty: 'Pretty Field 2'
                }, {
                    query: 'field3',
                    pretty: 'Pretty Field 3'
                }],
                fileName: 'Test Name',
                query: queryInput,
                hostName: 'testHost',
                dataStoreType: 'testStore'
            }
        });
    });

    it('transformQueryResultsValues does work as expected', () => {
        let map = {
            field: {
                oldValue: 'newValue'
            }
        };

        expect(service.transformQueryResultsValues({ data: [] }, map)).toEqual({ data: [] });

        expect(service.transformQueryResultsValues({
            data: [{
                field: 'oldValue'
            }]
        }, map)).toEqual({
            data: [{
                field: 'newValue'
            }]
        });

        expect(service.transformQueryResultsValues({
            data: [{
                field: 'otherValue'
            }]
        }, map)).toEqual({
            data: [{
                field: 'otherValue'
            }]
        });

        expect(service.transformQueryResultsValues({
            data: [{
                field: ['oldValue', 'otherValue']
            }]
        }, map)).toEqual({
            data: [{
                field: ['newValue', 'otherValue']
            }]
        });

        expect(service.transformQueryResultsValues({
            data: [{
                otherField: 'oldValue'
            }]
        }, map)).toEqual({
            data: [{
                otherField: 'oldValue'
            }]
        });

        expect(service.transformQueryResultsValues({
            data: [{
                field: 'oldValue'
            }, {
                field: 'newValue'
            }, {
                field: 'otherValue'
            }, {
                field: ['oldValue', 'otherValue']
            }, {
                otherField: 'oldValue'
            }, {
                field: 'oldValue',
                otherField: 'oldValue'
            }]
        }, map)).toEqual({
            data: [{
                field: 'newValue'
            }, {
                field: 'newValue'
            }, {
                field: 'otherValue'
            }, {
                field: ['newValue', 'otherValue']
            }, {
                otherField: 'oldValue'
            }, {
                field: 'newValue',
                otherField: 'oldValue'
            }]
        });
    });

    it('transformQueryResultsValues does not change the input data', () => {
        let map = {
            field: {
                oldValue: 'newValue'
            }
        };

        let input = [{
            field: 'oldValue'
        }];

        let output = service.transformQueryResultsValues({
            data: input
        }, map);

        expect(output).toEqual({
            data: [{
                field: 'newValue'
            }]
        });

        expect(output.data).not.toEqual(input);
    });

    it('updateAggregation does update given query payload and does not remove previous aggregations', () => {
        let input: query.Query = new query.Query();

        service.updateAggregation(new CoreQueryWrapper(input), AggregationType.AVG, '_avg', 'field');
        expect(input).toEqual(new query.Query().aggregate('avg', 'field', '_avg'));

        service.updateAggregation(new CoreQueryWrapper(input), AggregationType.COUNT, '_count', '*');
        expect(input).toEqual(new query.Query().aggregate('avg', 'field', '_avg').aggregate('count', '*', '_count'));
    });

    it('updateFieldsToMatchAll does update given query payload', () => {
        let input: query.Query = new query.Query();
        input.withFields(['field']);

        service.updateFieldsToMatchAll(new CoreQueryWrapper(input));
        expect(input).toEqual(new query.Query());
    });

    it('updateFilter does update given query payload', () => {
        let input: query.Query = new query.Query();

        service.updateFilter(new CoreQueryWrapper(input), null);
        expect(input).toEqual(new query.Query());

        service.updateFilter(new CoreQueryWrapper(input), new CoreWhereWrapper(query.where('field1', '=', 'value1')));
        expect(input).toEqual(new query.Query().where(query.where('field1', '=', 'value1')));

        service.updateFilter(new CoreQueryWrapper(input), new CoreWhereWrapper(query.or.apply(query, [
            query.where('field2', '=', 'value2'), query.where('field3', '=', 'value3')
        ])));
        expect(input).toEqual(new query.Query().where(query.or.apply(query, [
            query.where('field2', '=', 'value2'), query.where('field3', '=', 'value3')
        ])));
    });

    it('updateGroups does update given query payload', () => {
        let input: query.Query = new query.Query();

        service.updateGroups(new CoreQueryWrapper(input), [new CoreGroupWrapper('group1')]);
        expect(input).toEqual(new query.Query().groupBy(['group1']));

        service.updateGroups(new CoreQueryWrapper(input), [new CoreGroupWrapper('group2'), new CoreGroupWrapper('group3')]);
        expect(input).toEqual(new query.Query().groupBy(['group2', 'group3']));
    });

    it('updateLimit does update given query payload', () => {
        let input: query.Query = new query.Query();

        service.updateLimit(new CoreQueryWrapper(input), 0);
        expect(input).toEqual(new query.Query().limit(0));

        service.updateLimit(new CoreQueryWrapper(input), 100);
        expect(input).toEqual(new query.Query().limit(100));
    });

    it('updateOffset does update given query payload', () => {
        let input: query.Query = new query.Query();

        service.updateOffset(new CoreQueryWrapper(input), 0);
        expect(input).toEqual(new query.Query().offset(0));

        service.updateOffset(new CoreQueryWrapper(input), 100);
        expect(input).toEqual(new query.Query().offset(100));
    });

    it('updateSort does update given query payload', () => {
        let input: query.Query = new query.Query();

        service.updateSort(new CoreQueryWrapper(input), 'sortField');
        expect(input).toEqual(new query.Query().sortBy('sortField', 1));

        service.updateSort(new CoreQueryWrapper(input), 'sortField', SortOrder.DESCENDING);
        expect(input).toEqual(new query.Query().sortBy('sortField', -1));
    });
});
