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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var config_option_1 = require("../models/config-option");
var filter_service_1 = require("../services/filter.service");
var filters_1 = require("../models/filters");
var aggregation_web_component_1 = require("./aggregation.web-component");
var element_web_component_1 = require("./element.web-component");
var group_web_component_1 = require("./group.web-component");
var search_web_component_1 = require("./search.web-component");
var mock_dataset_1 = require("../models/mock.dataset");
var mock_search_service_1 = require("../services/mock.search.service");
var _ = require("lodash");
if (!window.customElements.get('next-century-element-mock')) {
    window.customElements.define('next-century-element-mock', element_web_component_1.NextCenturyElement);
}
var SearchServiceMockSuccessfulSearch = /** @class */ (function (_super) {
    __extends(SearchServiceMockSuccessfulSearch, _super);
    function SearchServiceMockSuccessfulSearch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.responseData = [];
        _this.searches = 0;
        return _this;
    }
    SearchServiceMockSuccessfulSearch.prototype.runSearch = function (datastoreType, datastoreHost, queryPayload) {
        var _this = this;
        this.searches++;
        this.searchArguments = {
            datastoreHost: datastoreHost,
            datastoreType: datastoreType,
            queryPayload: queryPayload
        };
        return {
            always: function () {
                // Do nothing.
            },
            abort: function () {
                // Do nothing.
            },
            done: function (callback) {
                if (callback) {
                    callback({ data: _this.responseData });
                }
            },
            fail: function () {
                // Do nothing.
            }
        };
    };
    return SearchServiceMockSuccessfulSearch;
}(mock_search_service_1.SearchServiceMock));
describe('Search Component static createElement should return', function () {
    it('expected HTMLElement', function () {
        var actual1 = search_web_component_1.NextCenturySearch.createElement('testId', {
            'search-field-keys': 'datastore1.testDatabase1.testTable1.testNameField'
        });
        expect(actual1).not.toEqual(null);
        expect(actual1.getAttribute('id')).toEqual('testId');
        expect(actual1.getAttribute('search-field-keys')).toEqual('datastore1.testDatabase1.testTable1.testNameField');
        var actual2 = search_web_component_1.NextCenturySearch.createElement('testId', {
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
    it('null if the required attributes are not defined', function () {
        expect(search_web_component_1.NextCenturySearch.createElement('testId', {})).toEqual(null);
        expect(search_web_component_1.NextCenturySearch.createElement('', {
            'search-field-keys': 'datastore1.testDatabase1.testTable1.testNameField'
        })).toEqual(null);
    });
});
describe('Search Component init should', function () {
    var dataset;
    var filterService;
    var searchComponent;
    var searchService;
    beforeEach(function () {
        searchComponent = new search_web_component_1.NextCenturySearch();
        searchComponent.setAttribute('id', 'testSearchElementId');
        searchComponent.setAttribute('search-field-keys', 'datastore1.testDatabase1.testTable1.testNameField');
        dataset = mock_dataset_1.DATASET;
        filterService = new filter_service_1.FilterService();
        searchService = new SearchServiceMockSuccessfulSearch();
    });
    it('do nothing without id, search-field-keys, dataset, or services', function () {
        searchComponent.addEventListener('searchFinished', function (__event) {
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
    it('register listener with filterService', function () {
        var spy = spyOn(filterService, 'registerFilterChangeListener');
        searchComponent.init(dataset, filterService, searchService);
        expect(spy.calls.count()).toEqual(1);
    });
    it('emit searchFinished with transformed response data', function (done) {
        var expected = [{
                aggregations: {},
                fields: {
                    testDateField: '2019-09-01T00:00:00Z',
                    testNameField: 'name1',
                    testSizeField: 1,
                    testTypeField: 'type1'
                },
                filtered: false
            }];
        searchComponent.addEventListener('searchFinished', function (event) {
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
    it('call draw data function on visualization', function (done) {
        var expected = [{
                aggregations: {},
                fields: {
                    testDateField: '2019-09-01T00:00:00Z',
                    testNameField: 'name1',
                    testSizeField: 1,
                    testTypeField: 'type1'
                },
                filtered: false
            }];
        var visElement = new element_web_component_1.NextCenturyElement();
        visElement.setAttribute('id', 'testTargetElementId');
        visElement.drawData = function (data) {
            expect(data).toEqual(expected);
            done();
        };
        var parentElement = new element_web_component_1.NextCenturyElement();
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
    it('build and run query', function () {
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
    it('build and run query with fields', function () {
        var fields = [
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
    it('build and run query with one aggregation and set expected aggregations in response data', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
        var aggregation1 = new aggregation_web_component_1.NextCenturyAggregation();
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
    it('build and run query with multiple aggregations and set expected aggregations in response data', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
        var aggregation1 = new aggregation_web_component_1.NextCenturyAggregation();
        aggregation1.setAttribute('aggregation-field-key', 'datastore1.testDatabase1.testTable1.testTypeField');
        aggregation1.setAttribute('aggregation-name', '_counts');
        searchComponent.appendChild(aggregation1);
        var aggregation2 = new aggregation_web_component_1.NextCenturyAggregation();
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
    it('build and run query with groups', function () {
        var group1 = new group_web_component_1.NextCenturyGroup();
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
        var group2 = new group_web_component_1.NextCenturyGroup();
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
    it('build and run query with limit', function () {
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
    it('build and run query with page', function () {
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
    it('build and run query with sort', function () {
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
    it('build and run query with filters from filterService', function () {
        filterService.setFilters([
            new filters_1.BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', 10, 20, 30, 40),
            new filters_1.DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2']),
            new filters_1.PairFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', '=', '!=', 'name1', 'type1')
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
    it('build and run query with filters from updateFilters', function () {
        searchComponent.updateFilters('testFilterElementId', [
            new filters_1.BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', 10, 20, 30, 40),
            new filters_1.DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2']),
            new filters_1.PairFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', '=', '!=', 'name1', 'type1')
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
    it('build and run query with filters from filterService and updateFilters', function () {
        searchComponent.updateFilters('testFilterElementId', [
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2']),
            new filters_1.PairFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', '=', '!=', 'name1', 'type1')
        ]);
        filterService.setFilters([
            new filters_1.BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', 10, 20, 30, 40),
            new filters_1.DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20)
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
    it('not build and run query if datastore host is invalid', function (done) {
        var datasetCopy = _.cloneDeep(dataset);
        datasetCopy.datastores.datastore1.host = '';
        searchComponent.addEventListener('searchFinished', function (event) {
            expect(event.detail.data).toEqual([]);
            expect(event.detail.info).toEqual('Cannot Connect to Datastore');
            expect(event.detail.size).toEqual(0);
            done();
        });
        searchComponent.init(datasetCopy, filterService, searchService);
        expect(searchService.searches).toEqual(0);
    });
    it('not build and run query if datastore type is invalid', function (done) {
        var datasetCopy = _.cloneDeep(dataset);
        datasetCopy.datastores.datastore1.type = '';
        searchComponent.addEventListener('searchFinished', function (event) {
            expect(event.detail.data).toEqual([]);
            expect(event.detail.info).toEqual('Cannot Connect to Datastore');
            expect(event.detail.size).toEqual(0);
            done();
        });
        searchComponent.init(datasetCopy, filterService, searchService);
        expect(searchService.searches).toEqual(0);
    });
    it('not build and run query if it is not filtered and enable-hide-if-unfiltered', function (done) {
        searchComponent.setAttribute('enable-hide-if-unfiltered', 'true');
        searchComponent.addEventListener('searchFinished', function (event) {
            expect(event.detail.data).toEqual([]);
            expect(event.detail.info).toEqual('Please Filter');
            expect(event.detail.size).toEqual(0);
            done();
        });
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(0);
    });
    it('build and run query if it is filtered and enable-hide-if-unfiltered', function () {
        searchComponent.setAttribute('enable-hide-if-unfiltered', 'true');
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1'])
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('build and run query with all filters matching filter designs if enable-ignore-self-filter is false', function () {
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
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
    it('build and run query without any filters matching filter designs enable-ignore-self-filter is true', function () {
        searchComponent.setAttribute('enable-ignore-self-filter', 'true');
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
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
describe('Search Component', function () {
    var dataset;
    var filterService;
    var searchComponent;
    var searchService;
    beforeEach(function () {
        searchComponent = new search_web_component_1.NextCenturySearch();
        searchComponent.setAttribute('id', 'testSearchElementId');
        searchComponent.setAttribute('search-field-keys', 'datastore1.testDatabase1.testTable1.testNameField');
        dataset = mock_dataset_1.DATASET;
        filterService = new filter_service_1.FilterService();
        searchService = new SearchServiceMockSuccessfulSearch();
    });
    it('setAttribute on ID should register listener with filterService', function () {
        searchComponent.init(dataset, filterService, searchService);
        var spy = spyOn(filterService, 'registerFilterChangeListener');
        searchComponent.setAttribute('id', 'testSearchElement2');
        expect(spy.calls.count()).toEqual(1);
    });
    it('setAttribute should build and run query once initialized', function () {
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
    it('notifying filterService listeners should build and run query with filters', function () {
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
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
    it('notifying filterService listeners should not build and run query if not initialized', function () {
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);
        expect(searchService.searches).toEqual(0);
        filterService.notifyFilterChangeListeners('testFilterElementId');
        expect(searchService.searches).toEqual(0);
    });
    it('notifying filterService listeners should not run query if callerId equals component ID and enable-ignore-self-filter', function () {
        searchComponent.setAttribute('enable-ignore-self-filter', 'true');
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);
        expect(searchService.searches).toEqual(1);
        filterService.notifyFilterChangeListeners('testSearchElementId');
        expect(searchService.searches).toEqual(1);
    });
    it('notifying filterService listeners should run query if callerId equals component ID but not enable-ignore-self-filter', function () {
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);
        expect(searchService.searches).toEqual(1);
        filterService.notifyFilterChangeListeners('testSearchElementId');
        expect(searchService.searches).toEqual(2);
    });
    it('notifying filterService listeners should run query if enable-ignore-self-filter but callerId not equals component ID', function () {
        searchComponent.setAttribute('enable-ignore-self-filter', 'true');
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);
        expect(searchService.searches).toEqual(1);
        filterService.notifyFilterChangeListeners('testFilterElementId');
        expect(searchService.searches).toEqual(2);
    });
    it('updateFilters should build and run query with filters', function () {
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
        searchComponent.updateFilters('testFilterElementId', [
            new filters_1.BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', 10, 20, 30, 40),
            new filters_1.DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2']),
            new filters_1.PairFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', '=', '!=', 'name1', 'type1')
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
    it('updateFilterDesigns should set filtered status in response data', function (done) {
        filterService.setFilters([
            new filters_1.ListFilter(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1'])
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);
        expect(searchService.searches).toEqual(2);
    });
    it('updateFilterDesigns should have no effect on response data without filters from filterService', function (done) {
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);
        expect(searchService.searches).toEqual(2);
    });
});
describe('Search Component should have expected filtered response data', function () {
    var dataset;
    var filterService;
    var searchComponent;
    var searchService;
    beforeEach(function () {
        searchComponent = new search_web_component_1.NextCenturySearch();
        searchComponent.setAttribute('id', 'testSearchElementId');
        searchComponent.setAttribute('search-field-keys', 'datastore1.testDatabase1.testTable1.testNameField');
        dataset = mock_dataset_1.DATASET;
        filterService = new filter_service_1.FilterService();
        searchService = new SearchServiceMockSuccessfulSearch();
    });
    it('with one AND list filter value', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.ListFilter(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1'])
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with multiple AND list filter values', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.ListFilter(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with one OR list filter value', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1'])
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with multiple OR list filter values', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.ListFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1', 'type2'])
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with multiple list filters', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.ListFilter(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type2'])
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with one bounds filter', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', 10, 20, 30, 40)
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', undefined, undefined, undefined, undefined)
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with multiple bounds filters', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', 10, 20, 30, 40),
            new filters_1.BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', 30, 40, 50, 60)
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', undefined, undefined, undefined, undefined)
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with one domain filter', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20)
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', undefined, undefined)
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with multiple domain filters', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20),
            new filters_1.DomainFilter('datastore1.testDatabase1.testTable1.testXField', 20, 30)
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', undefined, undefined)
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with AND pair filter values', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.PairFilter(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', '=', '=', 'name1', 'type1')
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.PairFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', '=', '=', undefined, undefined)
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with OR pair filter values', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.PairFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', '=', '=', 'name1', 'type1')
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.PairFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', '=', '=', undefined, undefined)
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with multiple pair filters', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.PairFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', '=', '=', 'name1', 'type1'),
            new filters_1.PairFilter(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', '=', '=', 'name2', 'type2')
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.PairFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', 'datastore1.testDatabase1.testTable1.testTypeField', '=', '=', undefined, undefined)
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with filters on multiple distinct fields', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.BoundsFilter('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', 10, 20, 30, 40),
            new filters_1.DomainFilter('datastore1.testDatabase1.testTable1.testXField', 10, 20),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testNameField', '=', ['name1']),
            new filters_1.ListFilter(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '=', ['type1'])
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.BoundsFilterDesign('datastore1.testDatabase1.testTable1.testXField', 'datastore1.testDatabase1.testTable1.testYField', undefined, undefined, undefined, undefined),
            new filters_1.DomainFilterDesign('datastore1.testDatabase1.testTable1.testXField', undefined, undefined),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testNameField', '=', [undefined]),
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.OR, 'datastore1.testDatabase1.testTable1.testTypeField', '=', [undefined])
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with NOT-EQUALS filter values', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.ListFilter(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', ['type1'])
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTypeField', '!=', [undefined])
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with CONTAINS filter values', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.ListFilter(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTextField', 'contains', ['a'])
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTextField', 'contains', [undefined])
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
    it('with NOT-CONTAINS filter values', function (done) {
        var expected = [{
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
        searchComponent.addEventListener('searchFinished', function (event) {
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
            new filters_1.ListFilter(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTextField', 'not contains', ['a'])
        ]);
        searchComponent.updateFilterDesigns('testFilterElementId', [
            new filters_1.ListFilterDesign(config_option_1.CompoundFilterType.AND, 'datastore1.testDatabase1.testTable1.testTextField', 'not contains', [undefined])
        ]);
        searchComponent.init(dataset, filterService, searchService);
        expect(searchService.searches).toEqual(1);
    });
});
//# sourceMappingURL=search.web-component.spec.js.map