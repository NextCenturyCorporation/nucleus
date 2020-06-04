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
import { ConnectionService, CoreConnection } from './connection.service';
import { SearchService, CoreSearch } from './search.service';
import { FieldKey } from '../models/dataset';

describe('Service: Search', () => {
    const fieldKey1 = {
        datastore: 'testDatastore',
        database: 'testDatabase1',
        table: 'testTable1',
        field: 'testField1'
    } as FieldKey;

    const fieldKey2 = {
        datastore: 'testDatastore',
        database: 'testDatabase1',
        table: 'testTable1',
        field: 'testField2'
    } as FieldKey;

    const fieldKey3 = {
        datastore: 'testDatastore',
        database: 'testDatabase1',
        table: 'testTable1',
        field: 'testField3'
    } as FieldKey;

    const fieldKey4 = {
        datastore: 'testDatastore',
        database: 'testDatabase1',
        table: 'testTable1',
        field: 'testField4'
    } as FieldKey;

    let service: SearchService;

    beforeEach(() => {
        service = new SearchService(new ConnectionService());
    });

    it('createCompoundFilterClause does return expected AND filter clause', () => {
        let actual = service.createCompoundFilterClause([
            service.createFilterClause(fieldKey1, '=', 'value1'),
            service.createFilterClause(fieldKey2, '!=', 'value2')
        ], CompoundFilterType.AND);
        let expected = {
            type: 'and',
            whereClauses: [{
                type: 'where',
                lhs: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                operator: '=',
                rhs: 'value1'
            }, {
                type: 'where',
                lhs: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField2'
                },
                operator: '!=',
                rhs: 'value2'
            }]
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('createCompoundFilterClause does return expected OR filter clause', () => {
        let actual = service.createCompoundFilterClause([
            service.createFilterClause(fieldKey1, '=', 'value1'),
            service.createFilterClause(fieldKey2, '!=', 'value2')
        ], CompoundFilterType.OR);
        let expected = {
            type: 'or',
            whereClauses: [{
                type: 'where',
                lhs: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                operator: '=',
                rhs: 'value1'
            }, {
                type: 'where',
                lhs: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField2'
                },
                operator: '!=',
                rhs: 'value2'
            }]
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('createCompoundFilterClause does return expected nested filter clause', () => {
        let actual = service.createCompoundFilterClause([
            service.createCompoundFilterClause([
                service.createFilterClause(fieldKey1, '=', 'value1'),
                service.createFilterClause(fieldKey2, '!=', 'value2')
            ], CompoundFilterType.AND),
            service.createCompoundFilterClause([
                service.createFilterClause(fieldKey1, '=', 'value3'),
                service.createFilterClause(fieldKey2, '!=', 'value4')
            ], CompoundFilterType.AND)
        ], CompoundFilterType.OR);
        let expected = {
            type: 'or',
            whereClauses: [{
                type: 'and',
                whereClauses: [{
                    type: 'where',
                    lhs: {
                        database: 'testDatabase1',
                        table: 'testTable1',
                        field: 'testField1'
                    },
                    operator: '=',
                    rhs: 'value1'
                }, {
                    type: 'where',
                    lhs: {
                        database: 'testDatabase1',
                        table: 'testTable1',
                        field: 'testField2'
                    },
                    operator: '!=',
                    rhs: 'value2'
                }]
            }, {
                type: 'and',
                whereClauses: [{
                    type: 'where',
                    lhs: {
                        database: 'testDatabase1',
                        table: 'testTable1',
                        field: 'testField1'
                    },
                    operator: '=',
                    rhs: 'value3'
                }, {
                    type: 'where',
                    lhs: {
                        database: 'testDatabase1',
                        table: 'testTable1',
                        field: 'testField2'
                    },
                    operator: '!=',
                    rhs: 'value4'
                }]
            }]
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('createCompoundFilterClause does not wrap single filter clause', () => {
        let actual = service.createCompoundFilterClause([service.createFilterClause(fieldKey1, '=', 'value')]);
        let expected = {
            type: 'where',
            lhs: {
                database: 'testDatabase1',
                table: 'testTable1',
                field: 'testField1'
            },
            operator: '=',
            rhs: 'value'
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('createFilterClause does return expected filter clause', () => {
        let actual = service.createFilterClause(fieldKey1, '=', 'value');
        let expected = {
            type: 'where',
            lhs: {
                database: 'testDatabase1',
                table: 'testTable1',
                field: 'testField1'
            },
            operator: '=',
            rhs: 'value'
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('createSearch does return expected search object', () => {
        let actual = service.createSearch('testDatabase1', 'testTable1');
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('createSearch with fields does return expected search object', () => {
        let actual = service.createSearch('testDatabase1', 'testTable1', ['testField1', 'testField2']);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: [{
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                }, {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField2'
                }]
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('canRunSearch does return false with no active connection', () => {
        let spy = spyOn(service['connectionService'], 'connect').and.returnValue(null);

        expect(service.canRunSearch('type', 'host')).toEqual(false);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['type', 'host']);
    });

    it('canRunSearch does return true with active connection', () => {
        let spy = spyOn(service['connectionService'], 'connect').and.returnValue(new CoreConnection('server', 'type', 'host'));

        expect(service.canRunSearch('type', 'host')).toEqual(true);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['type', 'host']);
    });

    it('runSearch does call expected function', () => {
        let searchObject = new CoreSearch('testDatabase1', 'testTable1');
        let connection = new CoreConnection('testServer', 'testDatabase1', 'testTable1');
        let called = 0;
        spyOn(connection, 'runSearch').and.callFake((queryInput, __options) => {
            expect(queryInput).toEqual(searchObject);
            called++;
            return null;
        });
        let spy = spyOn(service['connectionService'], 'connect').and.returnValue(connection);

        service.runSearch('type', 'host', searchObject, null, null);

        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(['type', 'host']);
        expect(called).toEqual(1);
    });

    it('transformFilterClauseValues with no fields does work as expected', () => {
        let searchObject = new CoreSearch('testDatabase1', 'testTable1');
        let actual = service.createFilterClause(fieldKey1, '=', 'oldValue');
        let expected = {
            type: 'where',
            lhs: {
                database: 'testDatabase1',
                table: 'testTable1',
                field: 'testField1'
            },
            operator: '=',
            rhs: 'oldValue'
        };
        searchObject.whereClause = actual;
        service.transformFilterClauseValues(searchObject, {});
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('transformFilterClauseValues with equal value does work as expected', () => {
        let map = {
            testField1: {
                newValue: 'oldValue'
            }
        };

        let searchObject = new CoreSearch('testDatabase1', 'testTable1');
        let actual = service.createFilterClause(fieldKey1, '=', 'oldValue');
        let expected = {
            type: 'where',
            lhs: {
                database: 'testDatabase1',
                table: 'testTable1',
                field: 'testField1'
            },
            operator: '=',
            rhs: 'newValue'
        };
        searchObject.whereClause = actual;
        service.transformFilterClauseValues(searchObject, map);
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('transformFilterClauseValues with different value does work as expected', () => {
        let map = {
            testField1: {
                newValue: 'oldValue'
            }
        };

        let searchObject = new CoreSearch('testDatabase1', 'testTable1');
        let actual = service.createFilterClause(fieldKey1, '=', 'otherValue');
        let expected = {
            type: 'where',
            lhs: {
                database: 'testDatabase1',
                table: 'testTable1',
                field: 'testField1'
            },
            operator: '=',
            rhs: 'otherValue'
        };
        searchObject.whereClause = actual;
        service.transformFilterClauseValues(searchObject, map);
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('transformFilterClauseValues with different field does work as expected', () => {
        let map = {
            testField1: {
                newValue: 'oldValue'
            }
        };

        let searchObject = new CoreSearch('testDatabase1', 'testTable1');
        let actual = service.createFilterClause(fieldKey2, '=', 'oldValue');
        let expected = {
            type: 'where',
            lhs: {
                database: 'testDatabase1',
                table: 'testTable1',
                field: 'testField2'
            },
            operator: '=',
            rhs: 'oldValue'
        };
        searchObject.whereClause = actual;
        service.transformFilterClauseValues(searchObject, map);
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('transformFilterClauseValues does work as expected with compound filter', () => {
        let map = {
            testField1: {
                newValue1: 'oldValue1'
            },
            testField2: {
                newValue2: 'oldValue2',
                newValue3: 'oldValue3'
            }
        };

        let searchObject = new CoreSearch('testDatabase1', 'testTable1');

        let actual = service.createCompoundFilterClause([
            service.createFilterClause(fieldKey1, '=', 'oldValue1'),
            service.createFilterClause(fieldKey1, '=', 'oldValue2'),
            service.createFilterClause(fieldKey2, '=', 'oldValue2'),
            service.createFilterClause(fieldKey2, '=', 'oldValue3'),
            service.createCompoundFilterClause([
                service.createFilterClause(fieldKey1, '=', 'oldValue1'),
                service.createFilterClause(fieldKey1, '=', 'oldValue2'),
                service.createFilterClause(fieldKey2, '=', 'oldValue2'),
                service.createFilterClause(fieldKey2, '=', 'oldValue3')
            ])
        ]);
        let expected = {
            type: 'and',
            whereClauses: [{
                type: 'where',
                lhs: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                operator: '=',
                rhs: 'newValue1'
            }, {
                type: 'where',
                lhs: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                operator: '=',
                rhs: 'oldValue2'
            }, {
                type: 'where',
                lhs: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField2'
                },
                operator: '=',
                rhs: 'newValue2'
            }, {
                type: 'where',
                lhs: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField2'
                },
                operator: '=',
                rhs: 'newValue3'
            }, {
                type: 'and',
                whereClauses: [{
                    type: 'where',
                    lhs: {
                        database: 'testDatabase1',
                        table: 'testTable1',
                        field: 'testField1'
                    },
                    operator: '=',
                    rhs: 'newValue1'
                }, {
                    type: 'where',
                    lhs: {
                        database: 'testDatabase1',
                        table: 'testTable1',
                        field: 'testField1'
                    },
                    operator: '=',
                    rhs: 'oldValue2'
                }, {
                    type: 'where',
                    lhs: {
                        database: 'testDatabase1',
                        table: 'testTable1',
                        field: 'testField2'
                    },
                    operator: '=',
                    rhs: 'newValue2'
                }, {
                    type: 'where',
                    lhs: {
                        database: 'testDatabase1',
                        table: 'testTable1',
                        field: 'testField2'
                    },
                    operator: '=',
                    rhs: 'newValue3'
                }]
            }]
        };
        searchObject.whereClause = actual;
        service.transformFilterClauseValues(searchObject, map);
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('transformSearchToExport does return expected data', () => {
        let fields = [{
            columnName: 'testField1',
            prettyName: 'Pretty Field 1'
        }, {
            columnName: 'testField2',
            prettyName: 'Pretty Field 2'
        }, {
            columnName: 'testField3',
            prettyName: 'Pretty Field 3'
        }];

        let queryInput = new CoreSearch('testDatabase1', 'testTable1', ['testField1', 'testField2']);

        expect(service.transformSearchToExport('testHost', 'testStore', fields, queryInput, 'Test Name')).toEqual({
            data: {
                fieldNamePrettyNamePairs: [{
                    query: 'testField1',
                    pretty: 'Pretty Field 1'
                }, {
                    query: 'testField2',
                    pretty: 'Pretty Field 2'
                }],
                fileName: 'Test Name',
                query: queryInput,
                hostName: 'testHost',
                dataStoreType: 'testStore'
            }
        });
    });

    it('transformSearchToExport does need fields argument to work as expected', () => {
        let queryInput = new CoreSearch('testDatabase1', 'testTable1', ['testField1', 'testField2']);

        expect(service.transformSearchToExport('testHost', 'testStore', [], queryInput, 'Test Name')).toEqual({
            data: {
                fileName: 'Test Name',
                dataStoreType: 'testStore',
                hostName: 'testHost',
                query: queryInput,
                fieldNamePrettyNamePairs: []
            }
        });
    });

    it('transformSearchToExport does ignore fields duplicated in the query', () => {
        let fields = [{
            columnName: 'testField1',
            prettyName: 'Pretty Field 1'
        }, {
            columnName: 'testField2',
            prettyName: 'Pretty Field 2'
        }, {
            columnName: 'testField3',
            prettyName: 'Pretty Field 3'
        }];

        let queryInput = new CoreSearch('testDatabase1', 'testTable1', ['testField1', 'testField1', 'testField2']);

        expect(service.transformSearchToExport('testHost', 'testStore', fields, queryInput, 'Test Name')).toEqual({
            data: {
                fieldNamePrettyNamePairs: [{
                    query: 'testField1',
                    pretty: 'Pretty Field 1'
                }, {
                    query: 'testField2',
                    pretty: 'Pretty Field 2'
                }],
                fileName: 'Test Name',
                query: queryInput,
                hostName: 'testHost',
                dataStoreType: 'testStore'
            }
        });
    });

    it('transformSearchToExport does add date groups', () => {
        let fields = [{
            columnName: 'testField1',
            prettyName: 'Pretty Field 1'
        }, {
            columnName: 'testField2',
            prettyName: 'Pretty Field 2'
        }, {
            columnName: 'testField3',
            prettyName: 'Pretty Field 3'
        }];

        let queryInput = new CoreSearch('testDatabase1', 'testTable1', ['testField1', 'testField2']);
        service.withGroupByDate(queryInput, fieldKey2, TimeInterval.MINUTE);
        service.withGroupByDate(queryInput, fieldKey2, TimeInterval.HOUR);
        service.withGroupByDate(queryInput, fieldKey2, TimeInterval.DAY_OF_MONTH);
        service.withGroupByDate(queryInput, fieldKey2, TimeInterval.MONTH);
        service.withGroupByDate(queryInput, fieldKey2, TimeInterval.YEAR);

        expect(service.transformSearchToExport('testHost', 'testStore', fields, queryInput, 'Test Name')).toEqual({
            data: {
                fieldNamePrettyNamePairs: [{
                    query: 'testField1',
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

    it('transformSearchToExport does add aggregations', () => {
        let fields = [{
            columnName: 'testField1',
            prettyName: 'Pretty Field 1'
        }, {
            columnName: 'testField2',
            prettyName: 'Pretty Field 2'
        }, {
            columnName: 'testField3',
            prettyName: 'Pretty Field 3'
        }];

        let queryInput = new CoreSearch('testDatabase1', 'testTable1', ['testField1', 'testField2']);
        service.withAggregation(queryInput, fieldKey1, '_count', AggregationType.COUNT);

        expect(service.transformSearchToExport('testHost', 'testStore', fields, queryInput, 'Test Name')).toEqual({
            data: {
                fieldNamePrettyNamePairs: [{
                    query: 'testField1',
                    pretty: 'Pretty Field 1'
                }, {
                    query: 'testField2',
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

    it('transformSearchToExport does remove fields of non-count aggregations', () => {
        let fields = [{
            columnName: 'testField1',
            prettyName: 'Pretty Field 1'
        }, {
            columnName: 'testField2',
            prettyName: 'Pretty Field 2'
        }, {
            columnName: 'testField3',
            prettyName: 'Pretty Field 3'
        }, {
            columnName: 'testField4',
            prettyName: 'Pretty Field 4'
        }, {
            columnName: 'testField5',
            prettyName: 'Pretty Field 5'
        }];

        let queryInput = new CoreSearch('testDatabase1', 'testTable1', ['testField1',
            'testField2',
            'testField3',
            'testField4',
            'testField5']);
        service.withAggregation(queryInput, fieldKey1, '_avg', AggregationType.AVG);
        service.withAggregation(queryInput, fieldKey2, '_max', AggregationType.MAX);
        service.withAggregation(queryInput, fieldKey3, '_min', AggregationType.MIN);
        service.withAggregation(queryInput, fieldKey4, '_sum', AggregationType.SUM);

        expect(service.transformSearchToExport('testHost', 'testStore', fields, queryInput, 'Test Name')).toEqual({
            data: {
                fieldNamePrettyNamePairs: [{
                    query: 'testField5',
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

    it('transformSearchToExport does work with both groups and aggregations', () => {
        let fields = [{
            columnName: 'testField1',
            prettyName: 'Pretty Field 1'
        }, {
            columnName: 'testField2',
            prettyName: 'Pretty Field 2'
        }, {
            columnName: 'testField3',
            prettyName: 'Pretty Field 3'
        }];

        let queryInput = new CoreSearch('testDatabase1', 'testTable1', ['testField1', 'testField2']);
        service.withGroupByDate(queryInput, fieldKey2, TimeInterval.MONTH);
        service.withGroupByDate(queryInput, fieldKey2, TimeInterval.YEAR);
        service.withAggregation(queryInput, fieldKey1, '_count', AggregationType.COUNT);

        expect(service.transformSearchToExport('testHost', 'testStore', fields, queryInput, 'Test Name')).toEqual({
            data: {
                fieldNamePrettyNamePairs: [{
                    query: 'testField1',
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

    it('transformSearchToExport does work with all fields', () => {
        let fields = [{
            columnName: 'testField1',
            prettyName: 'Pretty Field 1'
        }, {
            columnName: 'testField2',
            prettyName: 'Pretty Field 2'
        }, {
            columnName: 'testField3',
            prettyName: 'Pretty Field 3'
        }];

        let queryInput = new CoreSearch('testDatabase1', 'testTable1', []);

        expect(service.transformSearchToExport('testHost', 'testStore', fields, queryInput, 'Test Name')).toEqual({
            data: {
                fieldNamePrettyNamePairs: [{
                    query: 'testField1',
                    pretty: 'Pretty Field 1'
                }, {
                    query: 'testField2',
                    pretty: 'Pretty Field 2'
                }, {
                    query: 'testField3',
                    pretty: 'Pretty Field 3'
                }],
                fileName: 'Test Name',
                query: queryInput,
                hostName: 'testHost',
                dataStoreType: 'testStore'
            }
        });
    });

    it('transformSearchResultValues does work as expected', () => {
        let map = {
            field: {
                oldValue: 'newValue'
            }
        };

        expect(service.transformSearchResultValues({ data: [] }, map)).toEqual({ data: [] });

        expect(service.transformSearchResultValues({
            data: [{
                field: 'oldValue'
            }]
        }, map)).toEqual({
            data: [{
                field: 'newValue'
            }]
        });

        expect(service.transformSearchResultValues({
            data: [{
                field: 'otherValue'
            }]
        }, map)).toEqual({
            data: [{
                field: 'otherValue'
            }]
        });

        expect(service.transformSearchResultValues({
            data: [{
                field: ['oldValue', 'otherValue']
            }]
        }, map)).toEqual({
            data: [{
                field: ['newValue', 'otherValue']
            }]
        });

        expect(service.transformSearchResultValues({
            data: [{
                otherField: 'oldValue'
            }]
        }, map)).toEqual({
            data: [{
                otherField: 'oldValue'
            }]
        });

        expect(service.transformSearchResultValues({
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

    it('transformSearchResultValues does not change the input data', () => {
        let map = {
            field: {
                oldValue: 'newValue'
            }
        };

        let input = [{
            field: 'oldValue'
        }];

        let output = service.transformSearchResultValues({
            data: input
        }, map);

        expect(output).toEqual({
            data: [{
                field: 'newValue'
            }]
        });

        expect(output.data).not.toEqual(input);
    });

    it('withAggregation does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withAggregation(actual, fieldKey1, '_avg', AggregationType.AVG);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [{
                type: 'field',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_avg',
                operation: 'avg'
            }],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withAggregation does not remove previous aggregations', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withAggregation(actual, fieldKey1, '_avg', AggregationType.AVG);
        service.withAggregation(actual, fieldKey1, '_count', AggregationType.COUNT);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [{
                type: 'field',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_avg',
                operation: 'avg'
            }, {
                type: 'field',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_count',
                operation: 'count'
            }],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withField does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withField(actual, fieldKey1);
        service.withField(actual, fieldKey2);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: [{
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                }, {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField2'
                }]
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withAllFields does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withField(actual, fieldKey1);
        service.withAllFields(actual);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withFilter with singular filter clause does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withFilter(actual, service.createFilterClause(fieldKey1, '=', 'value1'));
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: {
                type: 'where',
                lhs: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                operator: '=',
                rhs: 'value1'
            },
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withFilter with compound filter clause does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withFilter(actual, service.createCompoundFilterClause([
            service.createFilterClause(fieldKey1, '=', 'value1'),
            service.createFilterClause(fieldKey2, '!=', 'value2')
        ]));
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: {
                type: 'and',
                whereClauses: [{
                    type: 'where',
                    lhs: {
                        database: 'testDatabase1',
                        table: 'testTable1',
                        field: 'testField1'
                    },
                    operator: '=',
                    rhs: 'value1'
                }, {
                    type: 'where',
                    lhs: {
                        database: 'testDatabase1',
                        table: 'testTable1',
                        field: 'testField2'
                    },
                    operator: '!=',
                    rhs: 'value2'
                }]
            },
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withFilter does remove previous filter clause', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withFilter(actual, service.createFilterClause(fieldKey1, '=', 'value1'));
        service.withFilter(actual, service.createFilterClause(fieldKey2, '!=', 'value2'));
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: {
                type: 'where',
                lhs: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField2'
                },
                operator: '!=',
                rhs: 'value2'
            },
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withAggregationByGroupCount does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withAggregationByGroupCount(actual, 'groupLabel', '_count');
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [{
                type: 'group',
                group: 'groupLabel',
                label: '_count'
            }],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withAggregationByGroupCount does not remove previous aggregations', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withAggregation(actual, fieldKey1, '_avg', AggregationType.AVG);
        service.withAggregationByGroupCount(actual, 'groupLabel', '_count');
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [{
                type: 'field',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_avg',
                operation: 'avg'
            }, {
                type: 'group',
                group: 'groupLabel',
                label: '_count'
            }],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withGroupByDate on SECOND does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withGroupByDate(actual, fieldKey1, TimeInterval.SECOND);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [{
                type: 'operation',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_second',
                operation: 'second'
            }],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withGroupByDate on MINUTE does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withGroupByDate(actual, fieldKey1, TimeInterval.MINUTE);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [{
                type: 'operation',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_minute',
                operation: 'minute'
            }],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withGroupByDate on HOUR does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withGroupByDate(actual, fieldKey1, TimeInterval.HOUR);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [{
                type: 'operation',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_hour',
                operation: 'hour'
            }],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withGroupByDate on DAY_OF_MONTH does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withGroupByDate(actual, fieldKey1, TimeInterval.DAY_OF_MONTH);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [{
                type: 'operation',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_dayOfMonth',
                operation: 'dayOfMonth'
            }],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withGroupByDate on MONTH does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withGroupByDate(actual, fieldKey1, TimeInterval.MONTH);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [{
                type: 'operation',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_month',
                operation: 'month'
            }],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withGroupByDate on YEAR does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withGroupByDate(actual, fieldKey1, TimeInterval.YEAR);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [{
                type: 'operation',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_year',
                operation: 'year'
            }],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withGroupByDate does not remove previous groups', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withGroup(actual, fieldKey1);
        service.withGroupByDate(actual, fieldKey1, TimeInterval.MONTH);
        service.withGroupByDate(actual, fieldKey1, TimeInterval.YEAR);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [{
                type: 'field',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                }
            }, {
                type: 'operation',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_month',
                operation: 'month'
            }, {
                type: 'operation',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_year',
                operation: 'year'
            }],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withGroup does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withGroup(actual, fieldKey1);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [{
                type: 'field',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                }
            }],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withGroup does not remove previous groups', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withGroupByDate(actual, fieldKey1, TimeInterval.MONTH);
        service.withGroupByDate(actual, fieldKey1, TimeInterval.YEAR);
        service.withGroup(actual, fieldKey1);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [{
                type: 'operation',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_month',
                operation: 'month'
            }, {
                type: 'operation',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_year',
                operation: 'year'
            }, {
                type: 'field',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                }
            }],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withJoin does update given search object', () => {
        const joinFieldKey = {
            datastore: 'testDatastore',
            database: 'testDatabase2',
            table: 'testTable2',
            field: 'testJoinField1'
        } as FieldKey;

        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withJoin(actual, 'inner', 'testDatabase2', 'testTable2', fieldKey1, '=', joinFieldKey);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [{
                type: 'inner',
                database: 'testDatabase2',
                table: 'testTable2',
                onClause: {
                    type: 'fields',
                    lhs: {
                        database: 'testDatabase1',
                        table: 'testTable1',
                        field: 'testField1'
                    },
                    operator: '=',
                    rhs: {
                        database: 'testDatabase2',
                        table: 'testTable2',
                        field: 'testJoinField1'
                    }
                }
            }],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withJoin does not remove previous joins', () => {
        const joinFieldKey1 = {
            datastore: 'testDatastore',
            database: 'testDatabase2',
            table: 'testTable2',
            field: 'testJoinField1'
        } as FieldKey;

        const joinFieldKey2 = {
            datastore: 'testDatastore',
            database: 'testDatabase3',
            table: 'testTable3',
            field: 'testJoinField2'
        } as FieldKey;

        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withJoin(actual, 'inner', 'testDatabase2', 'testTable2', fieldKey1, '=', joinFieldKey1);
        service.withJoin(actual, '', 'testDatabase3', 'testTable3', fieldKey2, '=', joinFieldKey2);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [{
                type: 'inner',
                database: 'testDatabase2',
                table: 'testTable2',
                onClause: {
                    type: 'fields',
                    lhs: {
                        database: 'testDatabase1',
                        table: 'testTable1',
                        field: 'testField1'
                    },
                    operator: '=',
                    rhs: {
                        database: 'testDatabase2',
                        table: 'testTable2',
                        field: 'testJoinField1'
                    }
                }
            }, {
                type: '',
                database: 'testDatabase3',
                table: 'testTable3',
                onClause: {
                    type: 'fields',
                    lhs: {
                        database: 'testDatabase1',
                        table: 'testTable1',
                        field: 'testField2'
                    },
                    operator: '=',
                    rhs: {
                        database: 'testDatabase3',
                        table: 'testTable3',
                        field: 'testJoinField2'
                    }
                }
            }],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withLimit does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withLimit(actual, 100);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: { limit: 100 },
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withOffset does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withOffset(actual, 100);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: { offset: 100 },
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withOrder sort ascending does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withOrder(actual, fieldKey1, SortOrder.ASCENDING);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [{
                type: 'field',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                order: 1
            }],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withOrder sort descending does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withOrder(actual, fieldKey1, SortOrder.DESCENDING);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [{
                type: 'field',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                order: -1
            }],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withOrder does not remove previous orders', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withOrder(actual, fieldKey1, SortOrder.ASCENDING);
        service.withOrder(actual, fieldKey2, SortOrder.DESCENDING);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [{
                type: 'field',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                order: 1
            }, {
                type: 'field',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField2'
                },
                order: -1
            }],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withOrderByOperation sort ascending does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withOrderByOperation(actual, 'operationLabel', SortOrder.ASCENDING);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [{
                type: 'operation',
                operation: 'operationLabel',
                order: 1
            }],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withOrderByOperation sort descending does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withOrderByOperation(actual, 'operationLabel', SortOrder.DESCENDING);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [{
                type: 'operation',
                operation: 'operationLabel',
                order: -1
            }],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withOrderByOperation does not remove previous orders', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withOrder(actual, fieldKey1, SortOrder.ASCENDING);
        service.withOrderByOperation(actual, 'operationLabel', SortOrder.DESCENDING);
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [],
            groupByClauses: [],
            orderByClauses: [{
                type: 'field',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                order: 1
            }, {
                type: 'operation',
                operation: 'operationLabel',
                order: -1
            }],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withAggregationByTotalCount does update given search object', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withAggregationByTotalCount(actual, '_count');
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [{
                type: 'total',
                label: '_count'
            }],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });

    it('withAggregationByTotalCount does not remove previous aggregations', () => {
        let actual = new CoreSearch('testDatabase1', 'testTable1');
        service.withAggregation(actual, fieldKey1, '_avg', AggregationType.AVG);
        service.withAggregationByTotalCount(actual, '_count');
        let expected = {
            selectClause: {
                database: 'testDatabase1',
                table: 'testTable1',
                fieldClauses: []
            },
            whereClause: null,
            aggregateClauses: [{
                type: 'field',
                fieldClause: {
                    database: 'testDatabase1',
                    table: 'testTable1',
                    field: 'testField1'
                },
                label: '_avg',
                operation: 'avg'
            }, {
                type: 'total',
                label: '_count'
            }],
            groupByClauses: [],
            orderByClauses: [],
            limitClause: null,
            offsetClause: null,
            joinClauses: [],
            isDistinct: false
        };
        expect(JSON.parse(JSON.stringify(actual))).toEqual(expected);
    });
});
