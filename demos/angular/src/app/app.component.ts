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
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { CoreUtil } from 'component-library/dist/core/core.util';
import { DatabaseConfig, Dataset, DatastoreConfig, TableConfig } from 'component-library/dist/core/models/dataset';
import { DateUtil } from 'component-library/dist/core/date.util';

import { ConnectionService } from 'component-library/dist/core/services/connection.service';
import { FilterService } from 'component-library/dist/core/services/filter.service';
import { SearchService } from 'component-library/dist/core/services/search.service';

import { NextCenturyFilterAngularComponent } from 'component-library/dist/wrappers/angular/core/filter.angular-component';
import { NextCenturySearchAngularComponent } from 'component-library/dist/wrappers/angular/core/search.angular-component';

import { ExampleComponent } from './example.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
    @ViewChild('vis1', { static: false }) vis1;

    @ViewChild('vis2', { static: false }) vis2;
    @ViewChild('search2', { static: false }) search2;

    @ViewChild('vis3', { static: false }) vis3;
    @ViewChild('search3', { static: false }) search3;

    @ViewChild('vis4', { static: false }) vis4;
    @ViewChild('search4', { static: false }) search4;
    @ViewChild('filter4', { static: false }) filter4;

    @ViewChild('vis5', { static: false }) vis5;
    @ViewChild('search5', { static: false }) search5;
    @ViewChild('filter5A', { static: false }) filter5A;
    @ViewChild('filter5B', { static: false }) filter5B;

    // API:  https://github.com/NextCenturyCorporation/component-library/tree/master/core/components

    public searchOptions1 = {
        'search-field-keys': 'es1.earthquakes.quakedata.*',
        'search-limit': 100,
        'sort-field-key': 'es1.earthquakes.quakedata.time',
        'sort-order': 'descending',
        'vis-draw-function': 'drawData'
    }

    public searchOptions2 = {
        'search-field-keys': [
            'es1.earthquakes.quakedata.id',
            'es1.earthquakes.quakedata.latitude',
            'es1.earthquakes.quakedata.longitude',
            'es1.earthquakes.quakedata.net',
            'es1.earthquakes.quakedata.time'
        ].join(','),
        'search-limit': 100,
        'sort-field-key': 'es1.earthquakes.quakedata.id',
        'sort-order': 'ascending',
        'vis-draw-function': 'drawData'
    }

    public filterOptions2 = {
        'filter-type': 'list',
        'list-field-key': 'es1.earthquakes.quakedata.id',
        'list-operator': '=',
        'vis-filter-input-function': 'changeFilteredData',
        'vis-filter-output-event': 'dataFiltered'
    }

    public searchOptions3 = {
        'search-field-keys': 'es1.earthquakes.quakedata.net',
        'search-limit': 0,
        'sort-aggregation': '_count',
        'sort-order': 'descending',
        'vis-draw-function': 'drawData'
    }

    public searchAggregations3 = [{
        'aggregation-field-key': 'es1.earthquakes.quakedata.net',
        'aggregation-name': '_count'
    }];

    public searchGroups3 = [{
        'group-field-key': 'es1.earthquakes.quakedata.net'
    }];

    public filterOptions3 = {
        'filter-type': 'list',
        'list-field-key': 'es1.earthquakes.quakedata.net',
        'list-operator': '=',
        'vis-filter-input-function': 'changeFilteredData',
        'vis-filter-output-event': 'dataFiltered'
    }

    public searchOptions4 = {
        'search-field-keys': 'es1.earthquakes.quakedata.time',
        'search-limit': 0,
        'sort-aggregation': '_timestamp',
        'sort-order': 'ascending'
        // Note no vis-draw-function
    }

    public searchAggregations4 = [{
        'aggregation-field-key': 'es1.earthquakes.quakedata.time',
        'aggregation-name': '_timestamp',
        'aggregation-type': 'min'
    }, {
        'aggregation-group': '_dayOfMonth',
        'aggregation-name': '_count'
    }];

    public searchGroups4 = [{
        'group-field-key': 'es1.earthquakes.quakedata.time',
        'group-type': 'dayOfMonth'
    }];

    public filterOptions4 = {
        'domain-field-key': 'es1.earthquakes.quakedata.time',
        'filter-type': 'domain'
        // Note no vis-filter-input-function or vis-filter-output-event
    }

    public searchOptions5 = {
        'search-field-keys': [
            'es1.earthquakes.quakedata.latitude',
            'es1.earthquakes.quakedata.longitude',
            'es1.earthquakes.quakedata.net'
        ].join(','),
        'search-limit': 100,
        'sort-aggregation': '_count',
        'sort-order': 'descending'
        // Note no vis-draw-function
    }

    public searchAggregations5 = [{
        'aggregation-field-key': 'es1.earthquakes.quakedata.net',
        'aggregation-name': '_count'
    }];

    public searchGroups5 = [{
        'group-field-key': 'es1.earthquakes.quakedata.latitude',
    }, {
        'group-field-key': 'es1.earthquakes.quakedata.longitude',
    }, {
        'group-field-key': 'es1.earthquakes.quakedata.net',
    }];

    public filterOptions5A = {
        'filter-type': 'list',
        'list-field-key': 'es1.earthquakes.quakedata.net',
        'list-operator': '='
        // Note no vis-filter-input-function or vis-filter-output-event
    }

    public filterOptions5B = {
        'filter-type': 'pair',
        'pair-field-key-1': 'es1.earthquakes.quakedata.longitude',
        'pair-field-key-2': 'es1.earthquakes.quakedata.latitude',
        'pair-intersection': true,
        'pair-operator-1': '=',
        'pair-operator-2': '='
        // Note no vis-filter-input-function or vis-filter-output-event
    }

    public filterService: FilterService;
    public searchService: SearchService;
    public dataset: Dataset;

    constructor(private changeDetectorRef: ChangeDetectorRef, private elementRef: ElementRef) { }

    ngAfterViewInit() {
        // Documentation: https://github.com/NextCenturyCorporation/component-library#the-basics
        // Create a single copy of each core Service to share with each NCCL Component.
        const connectionService = new ConnectionService();
        this.filterService = new FilterService();
        this.searchService = new SearchService(connectionService);

        // Define your NCCL Data Server hostname.
        const dataServerUrl = 'http://localhost:8090/neon';

        // Define your datastores, databases, tables, and (optionally) fields.
        // The NCCL will automatically detect fields if they are not defined.
        const fieldArray = [];
        const tableObject = TableConfig.get({
            prettyName: 'Data',
            fields: fieldArray
        });
        const databaseObject = DatabaseConfig.get({
            prettyName: 'Earthquakes',
            tables: {
                // The property name here ("quakedata") must match your table (or ES index type) name and the field keys in your HTML.
                quakedata: tableObject
            }
        });
        const datastoreObject = DatastoreConfig.get({
            host: 'localhost:9200',
            type: 'elasticsearchrest',
            databases: {
                // The property name here ("earthquakes") must match your database (or ES index) name and the field keys in your HTML.
                earthquakes: databaseObject
            }
        });
        const datastores = {
            // The property name here ("es1") must match the datastore ID of the field keys in your HTML.
            es1: datastoreObject
        };

        // Define relations to manage simultaneous filtering across datastores (if needed).
        const relations = [];

        // Create a single Dataset object with your datastores.
        this.dataset = new Dataset(datastores, connectionService, dataServerUrl, []);

        // Example custom data transformations
        // Documentation: https://github.com/NextCenturyCorporation/component-library#using-custom-data-transformations

        this.search4.elementRef.nativeElement.addEventListener('searchFinished', this._transformSearchTimestampsToDays.bind(this));
        this.vis4.elementRef.nativeElement.addEventListener('dataFiltered', this._transformFilteredTimestampsToDayDomains.bind(this));
        this.filter4.elementRef.nativeElement.addEventListener('valuesFiltered', this._transformFilteredDomainsToTimestamps.bind(this));

        this.search5.elementRef.nativeElement.addEventListener('searchFinished', this._transformSearchNetLonLatToStrings.bind(this));
        this.vis5.elementRef.nativeElement.addEventListener('dataFiltered', this._transformFilteredNetLonLatToNetsAndPoints.bind(this));

        // Must call detectChanges here to update the dataset of the Angular visualization wrapper elements.
        this.changeDetectorRef.detectChanges();
    }

    private _transformFilteredNetLonLatToNetsAndPoints(event: any): void {
        if (!event || !event.detail || !event.detail.values) {
            return;
        }

        // Assume the input is either a single value or an array of single values.
        const values: any|any[] = event.detail.values;

        // Transform the input strings into an array of net values.
        const nets: string[] = [];

        // Transform the input strings into one or more "pair" arrays of two values like [lon, lat]
        const points: number[][] = [];

        (Array.isArray(values) ? values : [values]).forEach((value) => {
            const splitValue = value.split(',');
            if (splitValue.length === 3) {
                nets.push(splitValue[0]);
                points.push([Number(splitValue[1]), Number(splitValue[2])]);
            }
        });

        this.filter5A.updateFilteredValues(nets);
        this.filter5B.updateFilteredValues(points);
    }

    private _transformFilteredDomainsToTimestamps(event: any): void {
        if (!event || !event.detail || !event.detail.values) {
            return;
        }

        // Assume the input is either a single domain array or an array of multiple domain arrays.
        const values: any|any[] = event.detail.values;

        // If [begin, end], transform to [[begin, end]]; if [[begin, end]], keep it.
        const domainArrays: any[] = ((Array.isArray(values) && values.length && Array.isArray(values[0])) ? values : [values]);

        // Transform the "domain" arrays of date strings like [begin, end] to timestamps.
        const timestamps: number[] = domainArrays.filter((domain) => Array.isArray(domain) && domain.length === 2)
            .map((domain) => DateUtil.fromStringToTimestamp(domain[0]));

        this.vis4.changeFilteredData(timestamps);
    }

    private _transformFilteredTimestampsToDayDomains(event: any): void {
        if (!event || !event.detail || !event.detail.values) {
            return;
        }

        // Assume the input is either a single value or an array of single values.
        const values: any|any[] = event.detail.values;

        // Transform the input timestamps into one or more "domain" arrays of date strings like [begin, end]
        const domainArrays: string[][] = (Array.isArray(values) ? values : [values]).map((value) => {
            let beginDate = new Date(value);
            let endDate = new Date(beginDate);
            endDate.setUTCHours(beginDate.getUTCHours() + 23);
            endDate.setUTCMinutes(beginDate.getUTCMinutes() + 59);
            endDate.setUTCSeconds(beginDate.getUTCSeconds() + 59);
            return [DateUtil.fromDateToString(beginDate), DateUtil.fromDateToString(endDate)];
        });

        this.filter4.updateFilteredValues(domainArrays);
    }

    private _transformSearchNetLonLatToStrings(event: any): void {
        let searchDataArray: any = event.detail.data;

        searchDataArray.forEach((searchDataObject) => {
            searchDataObject.netLonLat = searchDataObject.fields.net + ',' + searchDataObject.fields.longitude + ',' +
                searchDataObject.fields.latitude;
        });

        this.vis5.drawData(searchDataArray);
    }

    private _transformSearchTimestampsToDays(event: any): void {
        let searchDataArray: any = event.detail.data;

        searchDataArray.forEach((searchDataObject) => {
            let date = new Date(searchDataObject.aggregations._timestamp);
            date.setUTCHours(0);
            date.setUTCMinutes(0);
            date.setUTCSeconds(0);
            searchDataObject.day = date.getTime();
        });

        this.vis4.drawData(searchDataArray);
    }
}
