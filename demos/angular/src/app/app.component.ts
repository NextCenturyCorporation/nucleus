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

import { NextCenturyAggregation } from 'component-library/dist/core/components/aggregation.web-component';
import { NextCenturyFilter } from 'component-library/dist/core/components/filter.web-component';
import { NextCenturyGroup } from 'component-library/dist/core/components/group.web-component';
import { NextCenturySearch } from 'component-library/dist/core/components/search.web-component';
import { NextCenturyTextCloudVisualization } from 'component-library/dist/visualizations/text-cloud/text-cloud.visualization';
import 'component-library/dist/visualizations/text-cloud/text-cloud.web-component';
import { NextCenturyAngularTextCloud } from 'component-library/dist/wrappers/angular/text-cloud.angular-component';
import 'component-library/dist/visualizations/example.web-component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
    @ViewChild('textCloudSearch1') textCloudSearch1;
    @ViewChild('textCloudFilter1') textCloudFilter1;

    @ViewChild('textCloudSearch2') textCloudSearch2;
    @ViewChild('textCloudFilter2') textCloudFilter2;

    @ViewChild('textCloudSearch3') textCloudSearch3;
    @ViewChild('textCloudFilter3A') textCloudFilter3A;
    @ViewChild('textCloudFilter3B') textCloudFilter3B;

    @ViewChild('textCloud2') textCloud2;
    @ViewChild('textCloud3') textCloud3;

    @ViewChild('exampleSearch1') exampleSearch1;

    @ViewChild('exampleSearch2') exampleSearch2;
    @ViewChild('exampleFilter2') exampleFilter2;

    public filterService: FilterService;
    public searchService: SearchService;
    public dataset: Dataset;

    // API: https://github.com/NextCenturyCorporation/component-library/tree/master/visualizations/text-cloud
    public textCloudAngularWrapperOptions1 = {
        'enable-show-paragraphs': true,
        'enable-show-values': true,
        'search-limit': 100,
        'text-field-key': 'es1.earthquakes.quakedata.net'
    };

    public textCloudAngularWrapperOptions2 = {
        'aggregation-field-key': 'es1.earthquakes.quakedata.mag',
        'aggregation-type': 'avg',
        'enable-show-paragraphs': true,
        'enable-show-values': true,
        'search-limit': 100,
        'text-field-key': 'es1.earthquakes.quakedata.net'
    };

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

        // Initialize each Filter and Search Component with the Dataset, FilterService, and SearchService.
        this.textCloudFilter1.nativeElement.init(this.dataset, this.filterService);
        this.textCloudSearch1.nativeElement.init(this.dataset, this.filterService, this.searchService);

        this.textCloudFilter2.nativeElement.init(this.dataset, this.filterService);
        this.textCloudSearch2.nativeElement.init(this.dataset, this.filterService, this.searchService);

        this.textCloudFilter3A.nativeElement.init(this.dataset, this.filterService);
        this.textCloudFilter3B.nativeElement.init(this.dataset, this.filterService);
        this.textCloudSearch3.nativeElement.init(this.dataset, this.filterService, this.searchService);

        this.exampleSearch1.nativeElement.init(this.dataset, this.filterService, this.searchService);

        this.exampleFilter2.nativeElement.init(this.dataset, this.filterService);
        this.exampleSearch2.nativeElement.init(this.dataset, this.filterService, this.searchService);

        // Example custom data transformations
        // Documentation: https://github.com/NextCenturyCorporation/component-library#using-custom-data-transformations

        // The textCloud2 shows timestamps and emits timestamps in filter events.  Add custom data transformations to change the timestamps
        // into date arrays (from beginning of day to end of day), then set domain filters on the dates.
        CoreUtil.addListener(this._transformDateStringToDomainArray.bind(this), this.elementRef.nativeElement, 'textCloud2', 'filter');
        CoreUtil.addListener(this._transformDomainArrayToDateString.bind(this), this.elementRef.nativeElement, 'textCloudFilter2',
            'filterValuesChanged');

        // The textCloud3 shows longitude, latitude, and network as single strings and emits them in filter events.  Add custom data
        // transformations to change the latitude-longitude strings into both net arrays and point arrays, then set filters on both.
        CoreUtil.addListener(this._transformSearchDataToLatLonArray.bind(this), this.elementRef.nativeElement, 'textCloudSearch3',
            'searchFinished');
        CoreUtil.addListener(this._transformLatLonStringToNetsAndPoints.bind(this), this.elementRef.nativeElement, 'textCloud3',
            'filter');

        // Must call detectChanges here to update the dataset of the Angular visualization wrapper elements.
        this.changeDetectorRef.detectChanges();
    }

    private _transformSearchDataToLatLonArray(event: any): void {
        let searchDataArray: any = event.detail.data;

        searchDataArray.forEach((searchDataObject) => {
            searchDataObject.fields.latlon = searchDataObject.fields.longitude + ',' + searchDataObject.fields.latitude + ',' +
                searchDataObject.fields.net;
        });

        this.textCloud3.nativeElement.drawData(searchDataArray);
    }

    private _transformLatLonStringToNetsAndPoints(event: any): void {
        if (!event || !event.detail || !event.detail.values) {
            return;
        }

        const values: any|any[] = event.detail.values;

        // Transform latitude-longitude strings into net and point value arrays.
        const nets: string[] = [];
        const points: number[][] = [];

        (Array.isArray(values) ? values : [values]).forEach((value) => {
            const splitValue = value.split(',');
            if (splitValue.length === 3) {
                nets.push(splitValue[2]);
                points.push([Number(splitValue[0]), Number(splitValue[1])]);
            }
        });

        this.textCloudFilter3A.nativeElement.updateFilters(nets);
        this.textCloudFilter3B.nativeElement.updateFilters(points);
    }

    private _transformDateStringToDomainArray(event: any): void {
        if (!event || !event.detail || !event.detail.values) {
            return;
        }

        const values: any|any[] = event.detail.values;

        // Transform timestamps to date string arrays like [begin, end].
        const domainArray: string[][] = (Array.isArray(values) ? values : [values]).map((value) => {
            let beginDate = new Date(value);
            let endDate = new Date(beginDate);
            endDate.setHours(beginDate.getHours() + 23);
            endDate.setMinutes(beginDate.getMinutes() + 59);
            endDate.setSeconds(beginDate.getSeconds() + 59);
            return [DateUtil.fromDateToString(beginDate), DateUtil.fromDateToString(endDate)];
        });

        this.textCloudFilter2.nativeElement.updateFilters(domainArray);
    }

    private _transformDomainArrayToDateString(event: any): void {
        if (!event || !event.detail || !event.detail.values) {
            return;
        }

        const values: any|any[] = event.detail.values;

        // If [begin, end], transform to [[begin, end]]; if [[begin, end]], keep it.
        const domainArray: any[] = ((Array.isArray(values) && values.length && Array.isArray(values[0])) ? values : [values]);

        // Transform date string arrays like [begin, end] to timestamps.
        const timestamps: number[] = domainArray.filter((domain) => Array.isArray(domain) && domain.length === 2)
            .map((domain) => DateUtil.fromStringToTimestamp(domain[0]));

        this.textCloud2.nativeElement.changeFilteredText(timestamps);
    }
}
