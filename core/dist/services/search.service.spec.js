"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var config_option_1 = require("../models/config-option");
var connection_service_1 = require("./connection.service");
var search_service_1 = require("./search.service");
var neon_framework_1 = require("neon-framework");
// TODO How can we call query.and and query.or without using "apply" ?
/* eslint-disable no-useless-call */
describe('Service: Search', function () {
    var service;
    beforeEach(function () {
        service = new search_service_1.SearchService(new connection_service_1.ConnectionService());
    });
    it('buildCompoundFilterClause does return expected filter clause', function () {
        expect(service.buildCompoundFilterClause([
            new search_service_1.CoreWhereWrapper(neon_framework_1.query.where('field1', '=', 'value1')),
            new search_service_1.CoreWhereWrapper(neon_framework_1.query.where('field2', '=', 'value2'))
        ])).toEqual(new search_service_1.CoreWhereWrapper(neon_framework_1.query.and.apply(neon_framework_1.query, [
            neon_framework_1.query.where('field1', '=', 'value1'),
            neon_framework_1.query.where('field2', '=', 'value2')
        ])));
        expect(service.buildCompoundFilterClause([
            new search_service_1.CoreWhereWrapper(neon_framework_1.query.where('field1', '=', 'value1')),
            new search_service_1.CoreWhereWrapper(neon_framework_1.query.where('field2', '=', 'value2'))
        ], config_option_1.CompoundFilterType.OR)).toEqual(new search_service_1.CoreWhereWrapper(neon_framework_1.query.or.apply(neon_framework_1.query, [
            neon_framework_1.query.where('field1', '=', 'value1'),
            neon_framework_1.query.where('field2', '=', 'value2')
        ])));
        expect(service.buildCompoundFilterClause([
            new search_service_1.CoreWhereWrapper(neon_framework_1.query.where('field1', '=', 'value1')),
            new search_service_1.CoreWhereWrapper(neon_framework_1.query.or.apply(neon_framework_1.query, [
                neon_framework_1.query.where('field2', '=', 'value2'),
                neon_framework_1.query.where('field3', '=', 'value3')
            ]))
        ])).toEqual(new search_service_1.CoreWhereWrapper(neon_framework_1.query.and.apply(neon_framework_1.query, [
            neon_framework_1.query.where('field1', '=', 'value1'),
            neon_framework_1.query.or.apply(neon_framework_1.query, [
                neon_framework_1.query.where('field2', '=', 'value2'),
                neon_framework_1.query.where('field3', '=', 'value3')
            ])
        ])));
    });
    it('buildCompoundFilterClause does not wrap single filter clause', function () {
        expect(service.buildCompoundFilterClause([new search_service_1.CoreWhereWrapper(neon_framework_1.query.where('field', '=', 'value'))])).toEqual(new search_service_1.CoreWhereWrapper(neon_framework_1.query.where('field', '=', 'value')));
    });
    it('buildDateQueryGroup does return expected query group', function () {
        expect(service.buildDateQueryGroup('groupField', config_option_1.TimeInterval.MINUTE)).toEqual(new search_service_1.CoreGroupWrapper(new neon_framework_1.query.GroupByFunctionClause('minute', 'groupField', '_minute')));
        expect(service.buildDateQueryGroup('groupField', config_option_1.TimeInterval.HOUR)).toEqual(new search_service_1.CoreGroupWrapper(new neon_framework_1.query.GroupByFunctionClause('hour', 'groupField', '_hour')));
        expect(service.buildDateQueryGroup('groupField', config_option_1.TimeInterval.DAY_OF_MONTH)).toEqual(new search_service_1.CoreGroupWrapper(new neon_framework_1.query.GroupByFunctionClause('dayOfMonth', 'groupField', '_dayOfMonth')));
        expect(service.buildDateQueryGroup('groupField', config_option_1.TimeInterval.MONTH)).toEqual(new search_service_1.CoreGroupWrapper(new neon_framework_1.query.GroupByFunctionClause('month', 'groupField', '_month')));
        expect(service.buildDateQueryGroup('groupField', config_option_1.TimeInterval.YEAR)).toEqual(new search_service_1.CoreGroupWrapper(new neon_framework_1.query.GroupByFunctionClause('year', 'groupField', '_year')));
    });
    it('buildFilterClause does return expected filter clause', function () {
        expect(service.buildFilterClause('field', '=', 'value')).toEqual(new search_service_1.CoreWhereWrapper(neon_framework_1.query.where('field', '=', 'value')));
    });
    it('buildQueryGroup does return expected query group', function () {
        expect(service.buildQueryGroup('groupField')).toEqual(new search_service_1.CoreGroupWrapper('groupField'));
    });
    it('buildQueryPayload does return expected query payload', function () {
        expect(service.buildQueryPayload('database', 'table')).toEqual(new search_service_1.CoreQueryWrapper(new neon_framework_1.query.Query().selectFrom('database', 'table')));
        expect(service.buildQueryPayload('database', 'table', ['field'])).toEqual(new search_service_1.CoreQueryWrapper(new neon_framework_1.query.Query().selectFrom('database', 'table').withFields(['field'])));
        expect(service.buildQueryPayload('database', 'table', ['field1', 'field2'])).toEqual(new search_service_1.CoreQueryWrapper(new neon_framework_1.query.Query()
            .selectFrom('database', 'table').withFields(['field1', 'field2'])));
        expect(service.buildQueryPayload('database', 'table', [])).toEqual(new search_service_1.CoreQueryWrapper(new neon_framework_1.query.Query().selectFrom('database', 'table')));
    });
    it('canRunSearch does return false with no active connection', function () {
        var spy = spyOn(service['connectionService'], 'connect').and.returnValue(null);
        expect(service.canRunSearch('type', 'host')).toEqual(false);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['type', 'host']);
    });
    it('canRunSearch does return true with active connection', function () {
        var spy = spyOn(service['connectionService'], 'connect').and.returnValue({});
        expect(service.canRunSearch('type', 'host')).toEqual(true);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['type', 'host']);
    });
    it('runSearch does call expected function', function () {
        var queryPayload = new search_service_1.CoreQueryWrapper(new neon_framework_1.query.Query());
        var called = 0;
        var spy = spyOn(service['connectionService'], 'connect').and.returnValue({
            runSearchQuery: function (queryInput, __options) {
                expect(queryInput).toEqual(queryPayload);
                called++;
            }
        });
        service.runSearch('type', 'host', queryPayload);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['type', 'host']);
        expect(called).toEqual(1);
    });
    it('transformFilterClauseValues does work as expected', function () {
        var map = {
            field: {
                newValue: 'oldValue'
            }
        };
        var input1 = new neon_framework_1.query.Query().where(neon_framework_1.query.where('field', '=', 'oldValue'));
        service.transformFilterClauseValues(new search_service_1.CoreQueryWrapper(input1), {});
        expect(input1).toEqual(new neon_framework_1.query.Query().where(neon_framework_1.query.where('field', '=', 'oldValue')));
        var input2 = new neon_framework_1.query.Query().where(neon_framework_1.query.where('field', '=', 'oldValue'));
        service.transformFilterClauseValues(new search_service_1.CoreQueryWrapper(input2), map);
        expect(input2).toEqual(new neon_framework_1.query.Query().where(neon_framework_1.query.where('field', '=', 'newValue')));
        var input3 = new neon_framework_1.query.Query().where(neon_framework_1.query.where('field', '=', 'otherValue'));
        service.transformFilterClauseValues(new search_service_1.CoreQueryWrapper(input3), map);
        expect(input3).toEqual(new neon_framework_1.query.Query().where(neon_framework_1.query.where('field', '=', 'otherValue')));
        var input4 = new neon_framework_1.query.Query().where(neon_framework_1.query.where('otherField', '=', 'oldValue'));
        service.transformFilterClauseValues(new search_service_1.CoreQueryWrapper(input4), map);
        expect(input4).toEqual(new neon_framework_1.query.Query().where(neon_framework_1.query.where('otherField', '=', 'oldValue')));
    });
    it('transformFilterClauseValues does work as expected with bool filter', function () {
        var map = {
            field1: {
                newValue1: 'oldValue1'
            },
            field2: {
                newValue2: 'oldValue2',
                newValue3: 'oldValue3'
            }
        };
        var input = new neon_framework_1.query.Query().where(neon_framework_1.query.and.apply(neon_framework_1.query, [
            neon_framework_1.query.where('field1', '=', 'oldValue1'),
            neon_framework_1.query.where('field1', '=', 'oldValue2'),
            neon_framework_1.query.where('field2', '=', 'oldValue2'),
            neon_framework_1.query.where('field2', '=', 'oldValue3'),
            neon_framework_1.query.or.apply(neon_framework_1.query, [
                neon_framework_1.query.where('field1', '=', 'oldValue1'),
                neon_framework_1.query.where('field1', '=', 'oldValue2'),
                neon_framework_1.query.where('field2', '=', 'oldValue2'),
                neon_framework_1.query.where('field2', '=', 'oldValue3')
            ])
        ]));
        service.transformFilterClauseValues(new search_service_1.CoreQueryWrapper(input), map);
        expect(input).toEqual(new neon_framework_1.query.Query().where(neon_framework_1.query.and.apply(neon_framework_1.query, [
            neon_framework_1.query.where('field1', '=', 'newValue1'),
            neon_framework_1.query.where('field1', '=', 'oldValue2'),
            neon_framework_1.query.where('field2', '=', 'newValue2'),
            neon_framework_1.query.where('field2', '=', 'newValue3'),
            neon_framework_1.query.or.apply(neon_framework_1.query, [
                neon_framework_1.query.where('field1', '=', 'newValue1'),
                neon_framework_1.query.where('field1', '=', 'oldValue2'),
                neon_framework_1.query.where('field2', '=', 'newValue2'),
                neon_framework_1.query.where('field2', '=', 'newValue3')
            ])
        ])));
    });
    it('transformQueryPayloadToExport does return expected data', function () {
        var fields = [{
                columnName: 'field1',
                prettyName: 'Pretty Field 1'
            }, {
                columnName: 'field2',
                prettyName: 'Pretty Field 2'
            }, {
                columnName: 'field3',
                prettyName: 'Pretty Field 3'
            }];
        var queryInput = new neon_framework_1.query.Query().withFields('field1', 'field2');
        var queryWrapper = new search_service_1.CoreQueryWrapper(queryInput);
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
    it('transformQueryPayloadToExport does need fields argument to work as expected', function () {
        var queryInput = new neon_framework_1.query.Query().withFields('field1', 'field2');
        expect(service.transformQueryPayloadToExport('testHost', 'testStore', [], new search_service_1.CoreQueryWrapper(queryInput), 'Test Name')).toEqual({
            data: {
                fileName: 'Test Name',
                dataStoreType: 'testStore',
                hostName: 'testHost',
                query: queryInput,
                fieldNamePrettyNamePairs: []
            }
        });
    });
    it('transformQueryPayloadToExport does ignore fields duplicated in the query', function () {
        var fields = [{
                columnName: 'field1',
                prettyName: 'Pretty Field 1'
            }, {
                columnName: 'field2',
                prettyName: 'Pretty Field 2'
            }, {
                columnName: 'field3',
                prettyName: 'Pretty Field 3'
            }];
        var queryInput = new neon_framework_1.query.Query().withFields('field1', 'field1', 'field2');
        var queryWrapper = new search_service_1.CoreQueryWrapper(queryInput);
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
    it('transformQueryPayloadToExport does add function groups', function () {
        var fields = [{
                columnName: 'field1',
                prettyName: 'Pretty Field 1'
            }, {
                columnName: 'field2',
                prettyName: 'Pretty Field 2'
            }, {
                columnName: 'field3',
                prettyName: 'Pretty Field 3'
            }];
        var queryInput = new neon_framework_1.query.Query().withFields('field1', 'field2').groupBy([
            new neon_framework_1.query.GroupByFunctionClause('minute', 'field2', '_minute'),
            new neon_framework_1.query.GroupByFunctionClause('hour', 'field2', '_hour'),
            new neon_framework_1.query.GroupByFunctionClause('dayOfMonth', 'field2', '_dayOfMonth'),
            new neon_framework_1.query.GroupByFunctionClause('month', 'field2', '_month'),
            new neon_framework_1.query.GroupByFunctionClause('year', 'field2', '_year')
        ]);
        var queryWrapper = new search_service_1.CoreQueryWrapper(queryInput);
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
    it('transformQueryPayloadToExport does add aggregations', function () {
        var fields = [{
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
        var queryInput = new neon_framework_1.query.Query().withFields('field1', 'field2').aggregate(neon_framework_1.query['COUNT'], 'field1', '_count');
        var queryWrapper = new search_service_1.CoreQueryWrapper(queryInput);
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
    it('transformQueryPayloadToExport does remove fields of non-count aggregations', function () {
        var fields = [{
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
        var queryInput = new neon_framework_1.query.Query().withFields('field1', 'field2', 'field3', 'field4', 'field5')
            .aggregate(neon_framework_1.query['AVG'], 'field1', '_avg')
            .aggregate(neon_framework_1.query['MAX'], 'field2', '_max')
            .aggregate(neon_framework_1.query['MIN'], 'field3', '_min')
            .aggregate(neon_framework_1.query['SUM'], 'field4', '_sum');
        /* eslint-enable dot-notation */
        var queryWrapper = new search_service_1.CoreQueryWrapper(queryInput);
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
    it('transformQueryPayloadToExport does work with both groups and aggregations', function () {
        var fields = [{
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
        var queryInput = new neon_framework_1.query.Query().withFields('field1', 'field2').groupBy([
            new neon_framework_1.query.GroupByFunctionClause('month', 'field2', '_month'),
            new neon_framework_1.query.GroupByFunctionClause('year', 'field2', '_year')
        ]).aggregate(neon_framework_1.query['COUNT'], 'field1', '_count');
        /* eslint-enable dot-notation */
        var queryWrapper = new search_service_1.CoreQueryWrapper(queryInput);
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
    it('transformQueryPayloadToExport does work with wildcard fields', function () {
        var fields = [{
                columnName: 'field1',
                prettyName: 'Pretty Field 1'
            }, {
                columnName: 'field2',
                prettyName: 'Pretty Field 2'
            }, {
                columnName: 'field3',
                prettyName: 'Pretty Field 3'
            }];
        var queryInput = new neon_framework_1.query.Query().withFields('*');
        var queryWrapper = new search_service_1.CoreQueryWrapper(queryInput);
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
    it('transformQueryResultsValues does work as expected', function () {
        var map = {
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
    it('transformQueryResultsValues does not change the input data', function () {
        var map = {
            field: {
                oldValue: 'newValue'
            }
        };
        var input = [{
                field: 'oldValue'
            }];
        var output = service.transformQueryResultsValues({
            data: input
        }, map);
        expect(output).toEqual({
            data: [{
                    field: 'newValue'
                }]
        });
        expect(output.data).not.toEqual(input);
    });
    it('updateAggregation does update given query payload and does not remove previous aggregations', function () {
        var input = new neon_framework_1.query.Query();
        service.updateAggregation(new search_service_1.CoreQueryWrapper(input), config_option_1.AggregationType.AVG, '_avg', 'field');
        expect(input).toEqual(new neon_framework_1.query.Query().aggregate('avg', 'field', '_avg'));
        service.updateAggregation(new search_service_1.CoreQueryWrapper(input), config_option_1.AggregationType.COUNT, '_count', '*');
        expect(input).toEqual(new neon_framework_1.query.Query().aggregate('avg', 'field', '_avg').aggregate('count', '*', '_count'));
    });
    it('updateFieldsToMatchAll does update given query payload', function () {
        var input = new neon_framework_1.query.Query();
        input.withFields(['field']);
        service.updateFieldsToMatchAll(new search_service_1.CoreQueryWrapper(input));
        expect(input).toEqual(new neon_framework_1.query.Query());
    });
    it('updateFilter does update given query payload', function () {
        var input = new neon_framework_1.query.Query();
        service.updateFilter(new search_service_1.CoreQueryWrapper(input), null);
        expect(input).toEqual(new neon_framework_1.query.Query());
        service.updateFilter(new search_service_1.CoreQueryWrapper(input), new search_service_1.CoreWhereWrapper(neon_framework_1.query.where('field1', '=', 'value1')));
        expect(input).toEqual(new neon_framework_1.query.Query().where(neon_framework_1.query.where('field1', '=', 'value1')));
        service.updateFilter(new search_service_1.CoreQueryWrapper(input), new search_service_1.CoreWhereWrapper(neon_framework_1.query.or.apply(neon_framework_1.query, [
            neon_framework_1.query.where('field2', '=', 'value2'), neon_framework_1.query.where('field3', '=', 'value3')
        ])));
        expect(input).toEqual(new neon_framework_1.query.Query().where(neon_framework_1.query.or.apply(neon_framework_1.query, [
            neon_framework_1.query.where('field2', '=', 'value2'), neon_framework_1.query.where('field3', '=', 'value3')
        ])));
    });
    it('updateGroups does update given query payload', function () {
        var input = new neon_framework_1.query.Query();
        service.updateGroups(new search_service_1.CoreQueryWrapper(input), [new search_service_1.CoreGroupWrapper('group1')]);
        expect(input).toEqual(new neon_framework_1.query.Query().groupBy(['group1']));
        service.updateGroups(new search_service_1.CoreQueryWrapper(input), [new search_service_1.CoreGroupWrapper('group2'), new search_service_1.CoreGroupWrapper('group3')]);
        expect(input).toEqual(new neon_framework_1.query.Query().groupBy(['group2', 'group3']));
    });
    it('updateLimit does update given query payload', function () {
        var input = new neon_framework_1.query.Query();
        service.updateLimit(new search_service_1.CoreQueryWrapper(input), 0);
        expect(input).toEqual(new neon_framework_1.query.Query().limit(0));
        service.updateLimit(new search_service_1.CoreQueryWrapper(input), 100);
        expect(input).toEqual(new neon_framework_1.query.Query().limit(100));
    });
    it('updateOffset does update given query payload', function () {
        var input = new neon_framework_1.query.Query();
        service.updateOffset(new search_service_1.CoreQueryWrapper(input), 0);
        expect(input).toEqual(new neon_framework_1.query.Query().offset(0));
        service.updateOffset(new search_service_1.CoreQueryWrapper(input), 100);
        expect(input).toEqual(new neon_framework_1.query.Query().offset(100));
    });
    it('updateSort does update given query payload', function () {
        var input = new neon_framework_1.query.Query();
        service.updateSort(new search_service_1.CoreQueryWrapper(input), 'sortField');
        expect(input).toEqual(new neon_framework_1.query.Query().sortBy('sortField', 1));
        service.updateSort(new search_service_1.CoreQueryWrapper(input), 'sortField', config_option_1.SortOrder.DESCENDING);
        expect(input).toEqual(new neon_framework_1.query.Query().sortBy('sortField', -1));
    });
});
//# sourceMappingURL=search.service.spec.js.map