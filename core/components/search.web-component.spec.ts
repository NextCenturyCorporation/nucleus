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

import { CompoundFilterType } from '../models/config-option';
import { Dataset } from '../models/dataset';
import { FilterService } from '../services/filter.service';
import {
    BoundsFilter,
    BoundsFilterDesign,
    DomainFilter,
    DomainFilterDesign,
    ListFilter,
    ListFilterDesign,
    PairFilter,
    PairFilterDesign
} from '../models/filters';
import { NextCenturyAggregation } from './aggregation.web-component';
import { NextCenturyElement } from './element.web-component';
import { NextCenturyGroup } from './group.web-component';
import { NextCenturySearch } from './search.web-component';
import { QueryPayload } from '../services/abstract.search.service';
import { RequestWrapper } from '../services/connection.service';

import { DATASET } from '../models/mock.dataset';
import { SearchServiceMock } from '../services/mock.search.service';

import * as _ from 'lodash';

if (!window.customElements.get('next-century-element-mock')) {
    window.customElements.define('next-century-element-mock', NextCenturyElement);
}

class SearchServiceMockSuccessfulSearch extends SearchServiceMock {
    public responseData: any[] = [];
    public searchArguments: {
        datastoreHost: string;
        datastoreType: string;
        queryPayload: QueryPayload;
    };

    public searches: number = 0;

    public runSearch(datastoreType: string, datastoreHost: string, queryPayload: QueryPayload): RequestWrapper {
        this.searches++;
        this.searchArguments = {
            datastoreHost,
            datastoreType,
            queryPayload
        };

        return {
            always: () => {
                // Do nothing.
            },
            abort: () => {
                // Do nothing.
            },
            done: (callback) => {
                if (callback) {
                    callback({ data: this.responseData });
                }
            },
            fail: () => {
                // Do nothing.
            }
        };
    }
}

describe('Search Component static createElement should return', () => {
    it('expected HTMLElement', () => {
        const actual1 = NextCenturySearch.createElement('testId', {
            'search-field-keys': 'datastore1.testDatabase1.testTable1.testNameField'
        });
        expect(actual1).not.toEqual(null);
        expect(actual1.getAttribute('id')).toEqual('testId');
        expect(actual1.getAttribute('search-field-keys')).toEqual('datastore1.testDatabase1.testTable1.testNameField');

        const actual2 = NextCenturySearch.createElement('testId', {
            'enable-hide-if-unfiltered': true,
            'enable-ignore-self-filter': true,
            'search-field-keys': 'datastore1.testDatabase1.testTable1.testNameField',
            'search-limit': 10000,
            'search-page': 2,
            'sort-aggregation': 'testAgg',
            'sort-field-key': 'datastore1.testDatabase1.testTable1.testNameField',
            'sort-order': 'descending',
            'vis-draw-function': 'drawData',
            'vis-element-id': 'testVisElementId'
        });
        expect(actual2).not.toEqual(null);
        expect(actual2.getAttribute('enable-hide-if-unfiltered')).toEqual('true');
        expect(actual2.getAttribute('enable-ignore-self-filter')).toEqual('true');
        expect(actual2.getAttribute('id')).toEqual('testId');
        expect(actual2.getAttribute('search-field-keys')).toEqual('datastore1.testDatabase1.testTable1.testNameField');
        expect(actual2.getAttribute('search-limit')).toEqual('10000');
        expect(actual2.getAttribute('search-page')).toEqual('2');
        expect(actual2.getAttribute('sort-aggregation')).toEqual('testAgg');
        expect(actual2.getAttribute('sort-field-key')).toEqual('datastore1.testDatabase1.testTable1.testNameField');
        expect(actual2.getAttribute('sort-order')).toEqual('descending');
        expect(actual2.getAttribute('vis-draw-function')).toEqual('drawData');
        expect(actual2.getAttribute('vis-element-id')).toEqual('testVisElementId');
    });

    it('null if the required attributes are not defined', () => {
        expect(NextCenturySearch.createElement('testId', {})).toEqual(null);
        expect(NextCenturySearch.createElement('', {
            'search-field-keys': 'datastore1.testDatabase1.testTable1.testNameField'
        })).toEqual(null);
    });
});

describe('Search Component init should', () => {
    let dataset: Dataset;
    let filterService: FilterService;
    let searchComponent: NextCenturySearch;
    let searchService: SearchServiceMockSuccessfulSearch;

    beforeEach(() => {
        searchComponent = new NextCenturySearch();
        searchComponent.setAttribute('id', 'testSearchElementId');
        searchComponent.setAttribute('search-field-keys', 'datastore1.testDatabase1.testTable1.testNameField');
        dataset = DATASET;
        filterService = new FilterService();
        searchService = new SearchServiceMockSuccessfulSearch();
    });

    it('do nothing without id, search-field-keys, dataset, or services', () => {
        searchComponent.addEventListener('searchFinished', (__event: any) => {
            fail();
        });

        searchComponent.init(dataset, filterService, null);
        expect(searchService.searches).toEqual(0);

        searchComponent.init(dataset, null, searchService);
        expect(searchService.searches).toEqual(0);

        searchComponent.init(null, filterService, searchService);
        expect(searchService.searches).toEqual(0);

        searchComponent.setAttribute('id', '');
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(0);

        searchComponent.setAttribute('search-field-keys', '');
        searchComponent.setAttribute('id', 'testSearchElementId'); // Reset ID
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(0);
    });

    it('register listener with filterService', () => {
        let spy = spyOn(filterService, 'registerFilterChangeListener');

        searchComponent.init(dataset, filterService, searchService);

        expect(spy.calls.count()).toEqual(1);
    });

    it('emit searchFinished with transformed response data', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testDateField: '2019-09-01T00:00:00Z',
                testNameField: 'name1',
                testSizeField: 1,
                testTypeField: 'type1'
            },
            filtered: false
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(1);
            done();
        });

        searchService.responseData = [{
            testDateField: '2019-09-01T00:00:00Z',
            testNameField: 'name1',
            testSizeField: 1,
            testTypeField: 'type1'
        }];

        searchComponent.init(dataset, filterService, searchService);
    });

    it('call draw data function on visualization', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testDateField: '2019-09-01T00:00:00Z',
                testNameField: 'name1',
                testSizeField: 1,
                testTypeField: 'type1'
            },
            filtered: false
        }];

        let visElement = new NextCenturyElement();
        visElement.setAttribute('id', 'testTargetElementId');
        (visElement as any).drawData = (data: any[]) => {
            expect(data).toEqual(expected);
            done();
        };

        let parentElement = new NextCenturyElement();
        parentElement.setAttribute('id', 'testParentElementId');
        parentElement.appendChild(searchComponent);
        parentElement.appendChild(visElement);

        searchService.responseData = [{
            testDateField: '2019-09-01T00:00:00Z',
            testNameField: 'name1',
            testSizeField: 1,
            testTypeField: 'type1'
        }];

        searchComponent.setAttribute('vis-element-id', 'testTargetElementId');
        searchComponent.setAttribute('vis-draw-function', 'drawData');
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('build and run query', () => {
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField'],
                filter: {
                    field: 'testNameField',
                    operator: '!=',
                    value: null
                },
                limit: 10,
                offset: 0
            }
        });
    });

    it('build and run query with fields', () => {
        const fields = [
            'datastore1.testDatabase1.testTable1.testDateField',
            'datastore1.testDatabase1.testTable1.testNameField',
            'datastore1.testDatabase1.testTable1.testSizeField',
            'datastore1.testDatabase1.testTable1.testTypeField'
        ];

        searchComponent.setAttribute('search-field-keys', fields.join(','));
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testDateField', 'testNameField', 'testSizeField', 'testTypeField'],
                filter: {
                    type: 'and',
                    filters: [{
                        field: 'testDateField',
                        operator: '!=',
                        value: null
                    }, {
                        field: 'testNameField',
                        operator: '!=',
                        value: null
                    }, {
                        field: 'testSizeField',
                        operator: '!=',
                        value: null
                    }, {
                        field: 'testTypeField',
                        operator: '!=',
                        value: null
                    }]
                },
                limit: 10,
                offset: 0
            }
        });

        searchComponent.setAttribute('search-field-keys', 'datastore1.testDatabase1.testTable1.*');

        expect(searchService.searches).toEqual(2);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['*'],
                limit: 10,
                offset: 0
            }
        });
    });

    it('build and run query with one aggregation and set expected aggregations in response data', (done) => {
        const expected = [{
            aggregations: {
                _counts: 123
            },
            fields: {
                testDateField: '2019-09-01T00:00:00Z',
                testNameField: 'name1',
                testSizeField: 1,
                testTypeField: 'type1'
            },
            filtered: false
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(1);
            done();
        });

        searchService.responseData = [{
            _counts: 123,
            testDateField: '2019-09-01T00:00:00Z',
            testNameField: 'name1',
            testSizeField: 1,
            testTypeField: 'type1'
        }];

        let aggregation1 = new NextCenturyAggregation();
        aggregation1.setAttribute('aggregation-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        aggregation1.setAttribute('aggregation-name', '_counts');
        searchComponent.appendChild(aggregation1);
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                aggregation: [{
                    field: 'testTypeField',
                    name: '_counts',
                    type: 'count'
                }],
                fields: ['testNameField', 'testTypeField'],
                filter: {
                    type: 'and',
                    filters: [{
                        field: 'testNameField',
                        operator: '!=',
                        value: null
                    }, {
                        field: 'testTypeField',
                        operator: '!=',
                        value: null
                    }]
                },
                limit: 10,
                offset: 0
            }
        });
    });

    it('build and run query with multiple aggregations and set expected aggregations in response data', (done) => {
        const expected = [{
            aggregations: {
                _counts: 123,
                _sums: 456
            },
            fields: {
                testDateField: '2019-09-01T00:00:00Z',
                testNameField: 'name1',
                testSizeField: 1,
                testTypeField: 'type1'
            },
            filtered: false
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(1);
            done();
        });

        searchService.responseData = [{
            _counts: 123,
            _sums: 456,
            testDateField: '2019-09-01T00:00:00Z',
            testNameField: 'name1',
            testSizeField: 1,
            testTypeField: 'type1'
        }];

        let aggregation1 = new NextCenturyAggregation();
        aggregation1.setAttribute('aggregation-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        aggregation1.setAttribute('aggregation-name', '_counts');
        searchComponent.appendChild(aggregation1);
        let aggregation2 = new NextCenturyAggregation();
        aggregation2.setAttribute('aggregation-group', '_counts');
        aggregation2.setAttribute('aggregation-name', '_sums');
        aggregation2.setAttribute('aggregation-type', 'sum');
        searchComponent.appendChild(aggregation2);
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                aggregation: [{
                    field: 'testTypeField',
                    name: '_counts',
                    type: 'count'
                }, {
                    field: '_counts',
                    name: '_sums',
                    type: 'sum'
                }],
                fields: ['testNameField', 'testTypeField'],
                filter: {
                    type: 'and',
                    filters: [{
                        field: 'testNameField',
                        operator: '!=',
                        value: null
                    }, {
                        field: 'testTypeField',
                        operator: '!=',
                        value: null
                    }]
                },
                limit: 10,
                offset: 0
            }
        });
    });

    it('build and run query with groups', () => {
        let group1 = new NextCenturyGroup();
        group1.setAttribute('group-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        searchComponent.appendChild(group1);
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField', 'testTypeField'],
                filter: {
                    type: 'and',
                    filters: [{
                        field: 'testNameField',
                        operator: '!=',
                        value: null
                    }, {
                        field: 'testTypeField',
                        operator: '!=',
                        value: null
                    }]
                },
                groups: ['testTypeField'],
                limit: 10,
                offset: 0
            }
        });

        let group2 = new NextCenturyGroup();
        group2.setAttribute('group-field-key', 'datastore1.testDatabase1.testTable1.testDateField');
        group2.setAttribute('group-type', 'dayOfMonth');
        searchComponent.appendChild(group2);
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(2);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField', 'testTypeField', 'testDateField'],
                filter: {
                    type: 'and',
                    filters: [{
                        field: 'testNameField',
                        operator: '!=',
                        value: null
                    }, {
                        field: 'testTypeField',
                        operator: '!=',
                        value: null
                    }, {
                        field: 'testDateField',
                        operator: '!=',
                        value: null
                    }]
                },
                groups: [
                    'testTypeField',
                    {
                        field: 'testDateField',
                        name: '_dayOfMonth',
                        type: 'dayOfMonth'
                    },
                    {
                        field: 'testDateField',
                        name: '_month',
                        type: 'month'
                    },
                    {
                        field: 'testDateField',
                        name: '_year',
                        type: 'year'
                    }
                ],
                limit: 10,
                offset: 0
            }
        });
    });

    it('build and run query with limit', () => {
        searchComponent.setAttribute('search-limit', '10000');
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField'],
                filter: {
                    field: 'testNameField',
                    operator: '!=',
                    value: null
                },
                limit: 10000,
                offset: 0
            }
        });
    });

    it('build and run query with page', () => {
        searchComponent.setAttribute('search-page', '2');
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField'],
                filter: {
                    field: 'testNameField',
                    operator: '!=',
                    value: null
                },
                limit: 10,
                offset: 10
            }
        });
    });

    it('build and run query with sort', () => {
        searchComponent.setAttribute('sort-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField', 'testTypeField'],
                filter: {
                    type: 'and',
                    filters: [{
                        field: 'testNameField',
                        operator: '!=',
                        value: null
                    }, {
                        field: 'testTypeField',
                        operator: '!=',
                        value: null
                    }]
                },
                limit: 10,
                offset: 0,
                sort: {
                    field: 'testTypeField',
                    order: -1
                }
            }
        });

        searchComponent.setAttribute('sort-order', 'ascending');

        expect(searchService.searches).toEqual(2);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField', 'testTypeField'],
                filter: {
                    type: 'and',
                    filters: [{
                        field: 'testNameField',
                        operator: '!=',
                        value: null
                    }, {
                        field: 'testTypeField',
                        operator: '!=',
                        value: null
                    }]
                },
                limit: 10,
                offset: 0,
                sort: {
                    field: 'testTypeField',
                    order: 1
                }
            }
        });

        searchComponent.setAttribute('sort-aggregation', '_counts');

        expect(searchService.searches).toEqual(3);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField', 'testTypeField'],
                filter: {
                    type: 'and',
                    filters: [{
                        field: 'testNameField',
                        operator: '!=',
                        value: null
                    }, {
                        field: 'testTypeField',
                        operator: '!=',
                        value: null
                    }]
                },
                limit: 10,
                offset: 0,
                sort: {
                    field: '_counts',
                    order: 1
                }
            }
        });
    });

    it('build and run query with filters from filterService', () => {
        filterService.setFilters([
            new BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                10, 20, 30, 40),
            new DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20),
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2']),
            new PairFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', '=', '!=', 'name1', 'type1')
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField'],
                filter: {
                    type: 'and',
                    filters: [{
                        field: 'testNameField',
                        operator: '!=',
                        value: null
                    }, {
                        type: 'and',
                        filters: [{
                            field: 'testXField',
                            operator: '>=',
                            value: 10
                        }, {
                            field: 'testXField',
                            operator: '<=',
                            value: 30
                        }, {
                            field: 'testYField',
                            operator: '>=',
                            value: 20
                        }, {
                            field: 'testYField',
                            operator: '<=',
                            value: 40
                        }]
                    }, {
                        type: 'and',
                        filters: [{
                            field: 'testXField',
                            operator: '>=',
                            value: 10
                        }, {
                            field: 'testXField',
                            operator: '<=',
                            value: 20
                        }]
                    }, {
                        type: 'or',
                        filters: [{
                            field: 'testTypeField',
                            operator: '=',
                            value: 'type1'
                        }, {
                            field: 'testTypeField',
                            operator: '=',
                            value: 'type2'
                        }]
                    }, {
                        type: 'or',
                        filters: [{
                            field: 'testNameField',
                            operator: '=',
                            value: 'name1'
                        }, {
                            field: 'testTypeField',
                            operator: '!=',
                            value: 'type1'
                        }]
                    }]
                },
                limit: 10,
                offset: 0
            }
        });
    });

    it('build and run query with filters from updateFilters', () => {
        searchComponent.updateFilters('testFilterElementId', [
            new BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                10, 20, 30, 40),
            new DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20),
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2']),
            new PairFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', '=', '!=', 'name1', 'type1')
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField'],
                filter: {
                    type: 'and',
                    filters: [{
                        field: 'testNameField',
                        operator: '!=',
                        value: null
                    }, {
                        type: 'and',
                        filters: [{
                            field: 'testXField',
                            operator: '>=',
                            value: 10
                        }, {
                            field: 'testXField',
                            operator: '<=',
                            value: 30
                        }, {
                            field: 'testYField',
                            operator: '>=',
                            value: 20
                        }, {
                            field: 'testYField',
                            operator: '<=',
                            value: 40
                        }]
                    }, {
                        type: 'and',
                        filters: [{
                            field: 'testXField',
                            operator: '>=',
                            value: 10
                        }, {
                            field: 'testXField',
                            operator: '<=',
                            value: 20
                        }]
                    }, {
                        type: 'or',
                        filters: [{
                            field: 'testTypeField',
                            operator: '=',
                            value: 'type1'
                        }, {
                            field: 'testTypeField',
                            operator: '=',
                            value: 'type2'
                        }]
                    }, {
                        type: 'or',
                        filters: [{
                            field: 'testNameField',
                            operator: '=',
                            value: 'name1'
                        }, {
                            field: 'testTypeField',
                            operator: '!=',
                            value: 'type1'
                        }]
                    }]
                },
                limit: 10,
                offset: 0
            }
        });
    });

    it('build and run query with filters from filterService and updateFilters', () => {
        searchComponent.updateFilters('testFilterElementId', [
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2']),
            new PairFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', '=', '!=', 'name1', 'type1')
        ]);

        filterService.setFilters([
            new BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                10, 20, 30, 40),
            new DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20)
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField'],
                filter: {
                    type: 'and',
                    filters: [{
                        field: 'testNameField',
                        operator: '!=',
                        value: null
                    }, {
                        type: 'and',
                        filters: [{
                            field: 'testXField',
                            operator: '>=',
                            value: 10
                        }, {
                            field: 'testXField',
                            operator: '<=',
                            value: 30
                        }, {
                            field: 'testYField',
                            operator: '>=',
                            value: 20
                        }, {
                            field: 'testYField',
                            operator: '<=',
                            value: 40
                        }]
                    }, {
                        type: 'and',
                        filters: [{
                            field: 'testXField',
                            operator: '>=',
                            value: 10
                        }, {
                            field: 'testXField',
                            operator: '<=',
                            value: 20
                        }]
                    }, {
                        type: 'or',
                        filters: [{
                            field: 'testTypeField',
                            operator: '=',
                            value: 'type1'
                        }, {
                            field: 'testTypeField',
                            operator: '=',
                            value: 'type2'
                        }]
                    }, {
                        type: 'or',
                        filters: [{
                            field: 'testNameField',
                            operator: '=',
                            value: 'name1'
                        }, {
                            field: 'testTypeField',
                            operator: '!=',
                            value: 'type1'
                        }]
                    }]
                },
                limit: 10,
                offset: 0
            }
        });
    });

    it('not build and run query if datastore host is invalid', (done) => {
        let datasetCopy = _.cloneDeep(dataset);
        datasetCopy.datastores.datastore1.host = '';

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual([]);
            expect(event.detail.info).toEqual('Cannot Connect to Datastore');
            expect(event.detail.size).toEqual(0);
            done();
        });

        searchComponent.init(datasetCopy, filterService, searchService);
        expect(searchService.searches).toEqual(0);
    });

    it('not build and run query if datastore type is invalid', (done) => {
        let datasetCopy = _.cloneDeep(dataset);
        datasetCopy.datastores.datastore1.type = '';

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual([]);
            expect(event.detail.info).toEqual('Cannot Connect to Datastore');
            expect(event.detail.size).toEqual(0);
            done();
        });

        searchComponent.init(datasetCopy, filterService, searchService);
        expect(searchService.searches).toEqual(0);
    });

    it('not build and run query if it is not filtered and enable-hide-if-unfiltered', (done) => {
        searchComponent.setAttribute('enable-hide-if-unfiltered', 'true');

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual([]);
            expect(event.detail.info).toEqual('Please Filter');
            expect(event.detail.size).toEqual(0);
            done();
        });

        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(0);
    });

    it('build and run query if it is filtered and enable-hide-if-unfiltered', () => {
        searchComponent.setAttribute('enable-hide-if-unfiltered', 'true');

        filterService.setFilters([
            new ListFilter(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1'])
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('build and run query with all filters matching filter designs if enable-ignore-self-filter is false', () => {
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new ListFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);

        filterService.setFilters([
            new ListFilter(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField'],
                filter: {
                    type: 'and',
                    filters: [{
                        field: 'testNameField',
                        operator: '!=',
                        value: null
                    }, {
                        type: 'and',
                        filters: [{
                            field: 'testTypeField',
                            operator: '=',
                            value: 'type1'
                        }, {
                            field: 'testTypeField',
                            operator: '=',
                            value: 'type2'
                        }]
                    }]
                },
                limit: 10,
                offset: 0
            }
        });
    });

    it('build and run query without any filters matching filter designs enable-ignore-self-filter is true', () => {
        searchComponent.setAttribute('enable-ignore-self-filter', 'true');

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new ListFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);

        filterService.setFilters([
            new ListFilter(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField'],
                filter: {
                    field: 'testNameField',
                    operator: '!=',
                    value: null
                },
                limit: 10,
                offset: 0
            }
        });
    });
});

describe('Search Component', () => {
    let dataset: Dataset;
    let filterService: FilterService;
    let searchComponent: NextCenturySearch;
    let searchService: SearchServiceMockSuccessfulSearch;

    beforeEach(() => {
        searchComponent = new NextCenturySearch();
        searchComponent.setAttribute('id', 'testSearchElementId');
        searchComponent.setAttribute('search-field-keys', 'datastore1.testDatabase1.testTable1.testNameField');
        dataset = DATASET;
        filterService = new FilterService();
        searchService = new SearchServiceMockSuccessfulSearch();
    });

    it('setAttribute on ID should register listener with filterService', () => {
        searchComponent.init(dataset, filterService, searchService);

        let spy = spyOn(filterService, 'registerFilterChangeListener');
        searchComponent.setAttribute('id', 'testSearchElement2');
        expect(spy.calls.count()).toEqual(1);
    });

    it('setAttribute should build and run query once initialized', () => {
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);

        searchComponent.setAttribute('id', 'testSearchElement2');
        expect(searchService.searches).toEqual(2);

        searchComponent.setAttribute('search-field-keys', 'datastore1.testDatabase1.testTable1.testTypeField');
        expect(searchService.searches).toEqual(3);

        searchComponent.setAttribute('enable-ignore-self-filter', 'true');
        expect(searchService.searches).toEqual(4);

        searchComponent.removeAttribute('enable-ignore-self-filter');
        expect(searchService.searches).toEqual(5);

        searchComponent.setAttribute('search-limit', '10000');
        expect(searchService.searches).toEqual(6);

        searchComponent.setAttribute('search-page', '2');
        expect(searchService.searches).toEqual(7);

        searchComponent.setAttribute('sort-aggregation', 'testAgg');
        expect(searchService.searches).toEqual(8);

        searchComponent.setAttribute('sort-field-key', 'datastore1.testDatabase1.testTable1.testNameField');
        expect(searchService.searches).toEqual(9);

        searchComponent.setAttribute('sort-order', 'descending');
        expect(searchService.searches).toEqual(10);

        searchComponent.setAttribute('vis-draw-function', 'drawData');
        expect(searchService.searches).toEqual(11);

        searchComponent.setAttribute('vis-element-id', 'testVisElementId');
        expect(searchService.searches).toEqual(12);
    });

    it('notifying filterService listeners should build and run query with filters', () => {
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);

        filterService.setFilters([
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);

        expect(searchService.searches).toEqual(1);

        filterService.notifyFilterChangeListeners('testFilterElementId');

        expect(searchService.searches).toEqual(2);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField'],
                filter: {
                    type: 'and',
                    filters: [{
                        field: 'testNameField',
                        operator: '!=',
                        value: null
                    }, {
                        type: 'or',
                        filters: [{
                            field: 'testTypeField',
                            operator: '=',
                            value: 'type1'
                        }, {
                            field: 'testTypeField',
                            operator: '=',
                            value: 'type2'
                        }]
                    }]
                },
                limit: 10,
                offset: 0
            }
        });
    });

    it('notifying filterService listeners should not build and run query if not initialized', () => {
        filterService.setFilters([
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);

        expect(searchService.searches).toEqual(0);

        filterService.notifyFilterChangeListeners('testFilterElementId');

        expect(searchService.searches).toEqual(0);
    });

    it('notifying filterService listeners should not run query if callerId equals component ID and enable-ignore-self-filter', () => {
        searchComponent.setAttribute('enable-ignore-self-filter', 'true');
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);

        filterService.setFilters([
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);

        expect(searchService.searches).toEqual(1);

        filterService.notifyFilterChangeListeners('testSearchElementId');

        expect(searchService.searches).toEqual(1);
    });

    it('notifying filterService listeners should run query if callerId equals component ID but not enable-ignore-self-filter', () => {
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);

        filterService.setFilters([
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);

        expect(searchService.searches).toEqual(1);

        filterService.notifyFilterChangeListeners('testSearchElementId');

        expect(searchService.searches).toEqual(2);
    });

    it('notifying filterService listeners should run query if enable-ignore-self-filter but callerId not equals component ID', () => {
        searchComponent.setAttribute('enable-ignore-self-filter', 'true');
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);

        filterService.setFilters([
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);

        expect(searchService.searches).toEqual(1);

        filterService.notifyFilterChangeListeners('testFilterElementId');

        expect(searchService.searches).toEqual(2);
    });

    it('updateFilters should build and run query with filters', () => {
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);

        searchComponent.updateFilters('testFilterElementId', [
            new BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                10, 20, 30, 40),
            new DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20),
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2']),
            new PairFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', '=', '!=', 'name1', 'type1')
        ]);

        expect(searchService.searches).toEqual(2);
        expect(searchService.searchArguments).toEqual({
            datastoreHost: dataset.datastores.datastore1.host,
            datastoreType: dataset.datastores.datastore1.type,
            queryPayload: {
                database: 'testDatabase1',
                table: 'testTable1',
                fields: ['testNameField'],
                filter: {
                    type: 'and',
                    filters: [{
                        field: 'testNameField',
                        operator: '!=',
                        value: null
                    }, {
                        type: 'and',
                        filters: [{
                            field: 'testXField',
                            operator: '>=',
                            value: 10
                        }, {
                            field: 'testXField',
                            operator: '<=',
                            value: 30
                        }, {
                            field: 'testYField',
                            operator: '>=',
                            value: 20
                        }, {
                            field: 'testYField',
                            operator: '<=',
                            value: 40
                        }]
                    }, {
                        type: 'and',
                        filters: [{
                            field: 'testXField',
                            operator: '>=',
                            value: 10
                        }, {
                            field: 'testXField',
                            operator: '<=',
                            value: 20
                        }]
                    }, {
                        type: 'or',
                        filters: [{
                            field: 'testTypeField',
                            operator: '=',
                            value: 'type1'
                        }, {
                            field: 'testTypeField',
                            operator: '=',
                            value: 'type2'
                        }]
                    }, {
                        type: 'or',
                        filters: [{
                            field: 'testNameField',
                            operator: '=',
                            value: 'name1'
                        }, {
                            field: 'testTypeField',
                            operator: '!=',
                            value: 'type1'
                        }]
                    }]
                },
                limit: 10,
                offset: 0
            }
        });
    });

    it('updateFilterDesigns should set filtered status in response data', (done) => {
        filterService.setFilters([
            new ListFilter(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1'])
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);

        const expected = [{
            aggregations: {},
            fields: {
                testDateField: '2019-09-01T00:00:00Z',
                testNameField: 'name1',
                testSizeField: 1,
                testTypeField: 'type1'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testDateField: '2019-09-02T00:00:00Z',
                testNameField: 'name2',
                testSizeField: 2,
                testTypeField: 'type2'
            },
            filtered: false
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(2);
            done();
        });

        searchService.responseData = [{
            testDateField: '2019-09-01T00:00:00Z',
            testNameField: 'name1',
            testSizeField: 1,
            testTypeField: 'type1'
        }, {
            testDateField: '2019-09-02T00:00:00Z',
            testNameField: 'name2',
            testSizeField: 2,
            testTypeField: 'type2'
        }];

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new ListFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);

        expect(searchService.searches).toEqual(2);
    });

    it('updateFilterDesigns should have no effect on response data without filters from filterService', (done) => {
        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);

        const expected = [{
            aggregations: {},
            fields: {
                testDateField: '2019-09-01T00:00:00Z',
                testNameField: 'name1',
                testSizeField: 1,
                testTypeField: 'type1'
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testDateField: '2019-09-02T00:00:00Z',
                testNameField: 'name2',
                testSizeField: 2,
                testTypeField: 'type2'
            },
            filtered: false
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(2);
            done();
        });

        searchService.responseData = [{
            testDateField: '2019-09-01T00:00:00Z',
            testNameField: 'name1',
            testSizeField: 1,
            testTypeField: 'type1'
        }, {
            testDateField: '2019-09-02T00:00:00Z',
            testNameField: 'name2',
            testSizeField: 2,
            testTypeField: 'type2'
        }];

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);

        expect(searchService.searches).toEqual(2);
    });
});

describe('Search Component should have expected filtered response data', () => {
    let dataset: Dataset;
    let filterService: FilterService;
    let searchComponent: NextCenturySearch;
    let searchService: SearchServiceMockSuccessfulSearch;

    beforeEach(() => {
        searchComponent = new NextCenturySearch();
        searchComponent.setAttribute('id', 'testSearchElementId');
        searchComponent.setAttribute('search-field-keys', 'datastore1.testDatabase1.testTable1.testNameField');
        dataset = DATASET;
        filterService = new FilterService();
        searchService = new SearchServiceMockSuccessfulSearch();
    });

    it('with one AND list filter value', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testTypeField: 'type1'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testTypeField: 'type2'
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testTypeField: ['type1', 'type2']
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(3);
            done();
        });

        searchService.responseData = [{
            testTypeField: 'type1'
        }, {
            testTypeField: 'type2'
        }, {
            testTypeField: ['type1', 'type2']
        }];

        filterService.setFilters([
            new ListFilter(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1'])
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new ListFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with multiple AND list filter values', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testTypeField: 'type1'
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testTypeField: 'type2'
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testTypeField: ['type1', 'type2']
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(3);
            done();
        });

        searchService.responseData = [{
            testTypeField: 'type1'
        }, {
            testTypeField: 'type2'
        }, {
            testTypeField: ['type1', 'type2']
        }];

        filterService.setFilters([
            new ListFilter(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new ListFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with one OR list filter value', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testTypeField: 'type1'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testTypeField: 'type2'
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testTypeField: ['type1', 'type2']
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(3);
            done();
        });

        searchService.responseData = [{
            testTypeField: 'type1'
        }, {
            testTypeField: 'type2'
        }, {
            testTypeField: ['type1', 'type2']
        }];

        filterService.setFilters([
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1'])
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with multiple OR list filter values', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testTypeField: 'type1'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testTypeField: 'type2'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testTypeField: ['type1', 'type2']
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(3);
            done();
        });

        searchService.responseData = [{
            testTypeField: 'type1'
        }, {
            testTypeField: 'type2'
        }, {
            testTypeField: ['type1', 'type2']
        }];

        filterService.setFilters([
            new ListFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with multiple list filters', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testTypeField: 'type1'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testTypeField: 'type2'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testTypeField: ['type1', 'type2']
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(3);
            done();
        });

        searchService.responseData = [{
            testTypeField: 'type1'
        }, {
            testTypeField: 'type2'
        }, {
            testTypeField: ['type1', 'type2']
        }];

        filterService.setFilters([
            new ListFilter(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1']),
            new ListFilter(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type2'])
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new ListFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with one bounds filter', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testXField: 15,
                testYField: 25
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testXField: 15,
                testYField: 45
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testXField: 35,
                testYField: 45
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testXField: [15, 35],
                testYField: [25, 45]
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(4);
            done();
        });

        searchService.responseData = [{
            testXField: 15,
            testYField: 25
        }, {
            testXField: 15,
            testYField: 45
        }, {
            testXField: 35,
            testYField: 45
        }, {
            testXField: [15, 35],
            testYField: [25, 45]
        }];

        filterService.setFilters([
            new BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                10, 20, 30, 40)
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                undefined, undefined, undefined, undefined)
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with multiple bounds filters', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testXField: 15,
                testYField: 25
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testXField: 15,
                testYField: 45
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testXField: 35,
                testYField: 45
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testXField: [15, 35],
                testYField: [25, 45]
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(4);
            done();
        });

        searchService.responseData = [{
            testXField: 15,
            testYField: 25
        }, {
            testXField: 15,
            testYField: 45
        }, {
            testXField: 35,
            testYField: 45
        }, {
            testXField: [15, 35],
            testYField: [25, 45]
        }];

        filterService.setFilters([
            new BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                10, 20, 30, 40),
            new BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                30, 40, 50, 60)
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                undefined, undefined, undefined, undefined)
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with one domain filter', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testXField: 15
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testXField: 25
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testXField: 35
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testXField: [15, 35]
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(4);
            done();
        });

        searchService.responseData = [{
            testXField: 15
        }, {
            testXField: 25
        }, {
            testXField: 35
        }, {
            testXField: [15, 35]
        }];

        filterService.setFilters([
            new DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20)
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', undefined, undefined)
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with multiple domain filters', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testXField: 15
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testXField: 25
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testXField: 35
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testXField: [15, 35]
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(4);
            done();
        });

        searchService.responseData = [{
            testXField: 15
        }, {
            testXField: 25
        }, {
            testXField: 35
        }, {
            testXField: [15, 35]
        }];

        filterService.setFilters([
            new DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20),
            new DomainFilter('datastore1.testDatabase1.testTable1.testXField', 20, 30)
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', undefined, undefined)
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with AND pair filter values', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testNameField: 'name1',
                testTypeField: 'type1'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testNameField: 'name2',
                testTypeField: 'type2'
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testNameField: 'name1',
                testTypeField: 'type2'
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testNameField: 'name2',
                testTypeField: 'type1'
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testNameField: ['name1', 'name2'],
                testTypeField: ['type1', 'type2']
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(5);
            done();
        });

        searchService.responseData = [{
            testNameField: 'name1',
            testTypeField: 'type1'
        }, {
            testNameField: 'name2',
            testTypeField: 'type2'
        }, {
            testNameField: 'name1',
            testTypeField: 'type2'
        }, {
            testNameField: 'name2',
            testTypeField: 'type1'
        }, {
            testNameField: ['name1', 'name2'],
            testTypeField: ['type1', 'type2']
        }];

        filterService.setFilters([
            new PairFilter(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', '=', '=', 'name1', 'type1')
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new PairFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', '=', '=', undefined, undefined)
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with OR pair filter values', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testNameField: 'name1',
                testTypeField: 'type1'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testNameField: 'name2',
                testTypeField: 'type2'
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testNameField: 'name1',
                testTypeField: 'type2'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testNameField: 'name2',
                testTypeField: 'type1'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testNameField: ['name1', 'name2'],
                testTypeField: ['type1', 'type2']
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(5);
            done();
        });

        searchService.responseData = [{
            testNameField: 'name1',
            testTypeField: 'type1'
        }, {
            testNameField: 'name2',
            testTypeField: 'type2'
        }, {
            testNameField: 'name1',
            testTypeField: 'type2'
        }, {
            testNameField: 'name2',
            testTypeField: 'type1'
        }, {
            testNameField: ['name1', 'name2'],
            testTypeField: ['type1', 'type2']
        }];

        filterService.setFilters([
            new PairFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', '=', '=', 'name1', 'type1')
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new PairFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', '=', '=', undefined, undefined)
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with multiple pair filters', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testNameField: 'name1',
                testTypeField: 'type1'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testNameField: 'name2',
                testTypeField: 'type2'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testNameField: ['name1', 'name2'],
                testTypeField: ['type1', 'type2']
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(3);
            done();
        });

        searchService.responseData = [{
            testNameField: 'name1',
            testTypeField: 'type1'
        }, {
            testNameField: 'name2',
            testTypeField: 'type2'
        }, {
            testNameField: ['name1', 'name2'],
            testTypeField: ['type1', 'type2']
        }];

        filterService.setFilters([
            new PairFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', '=', '=', 'name1', 'type1'),
            new PairFilter(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', '=', '=', 'name2', 'type2')
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new PairFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField',
                'datastore1.testDatabase1.testTable1.testTypeField', '=', '=', undefined, undefined)
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with filters on multiple distinct fields', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testXField: 15,
                testYField: 25
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testXField: 15
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testNameField: 'name1'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testTypeField: 'type1'
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(4);
            done();
        });

        searchService.responseData = [{
            testXField: 15,
            testYField: 25
        }, {
            testXField: 15
        }, {
            testNameField: 'name1'
        }, {
            testTypeField: 'type1'
        }];

        filterService.setFilters([
            new BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                10, 20, 30, 40),
            new DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20),
            new ListFilter(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testNameField', '=', ['name1']),
            new ListFilter(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1'])
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField',
                undefined, undefined, undefined, undefined),
            new DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', undefined, undefined),
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', '=', [undefined]),
            new ListFilterDesign(CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with NOT-EQUALS filter values', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testTypeField: 'type1'
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testTypeField: 'type2'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testTypeField: ['type1', 'type2']
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(3);
            done();
        });

        searchService.responseData = [{
            testTypeField: 'type1'
        }, {
            testTypeField: 'type2'
        }, {
            testTypeField: ['type1', 'type2']
        }];

        filterService.setFilters([
            new ListFilter(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type1'])
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new ListFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', [undefined])
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with CONTAINS filter values', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testTextField: 'a b c'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testTextField: 'd e f'
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testTextField: 'a b c d e f'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testTextField: ['a b c', 'd e f']
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(4);
            done();
        });

        searchService.responseData = [{
            testTextField: 'a b c'
        }, {
            testTextField: 'd e f'
        }, {
            testTextField: 'a b c d e f'
        }, {
            testTextField: ['a b c', 'd e f']
        }];

        filterService.setFilters([
            new ListFilter(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTextField', 'contains', ['a'])
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new ListFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTextField', 'contains', [undefined])
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });

    it('with NOT-CONTAINS filter values', (done) => {
        const expected = [{
            aggregations: {},
            fields: {
                testTextField: 'a b c'
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testTextField: 'd e f'
            },
            filtered: true
        }, {
            aggregations: {},
            fields: {
                testTextField: 'a b c d e f'
            },
            filtered: false
        }, {
            aggregations: {},
            fields: {
                testTextField: ['a b c', 'd e f']
            },
            filtered: true
        }];

        searchComponent.addEventListener('searchFinished', (event: any) => {
            expect(event.detail.data).toEqual(expected);
            expect(event.detail.info).toEqual(null);
            expect(event.detail.size).toEqual(4);
            done();
        });

        searchService.responseData = [{
            testTextField: 'a b c'
        }, {
            testTextField: 'd e f'
        }, {
            testTextField: 'a b c d e f'
        }, {
            testTextField: ['a b c', 'd e f']
        }];

        filterService.setFilters([
            new ListFilter(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTextField', 'not contains', ['a'])
        ]);

        searchComponent.updateFilterDesigns('testFilterElementId', [
            new ListFilterDesign(CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTextField', 'not contains', [undefined])
        ]);

        searchComponent.init(dataset, filterService, searchService);

        expect(searchService.searches).toEqual(1);
    });
});
