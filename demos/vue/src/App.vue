<template>
    <div id="app">
        <!-- Column 1 -->
        <div class="column">
            <div class="column-header">Show Each Field (Top 100), Sort by Time, No Filter</div>

            <div class="column-body">
                <ExampleComponent id="vis1" ref="vis1"></ExampleComponent>
                <nucleus-search
                    id="search1"
                    ref="search1"
                    search-field-keys="es1.earthquakes.quakedata.*"
                    search-limit="100"
                    sort-field-key="es1.earthquakes.quakedata.time"
                    sort-order="descending"
                    vis-draw-function="drawData"
                >
                </nucleus-search>
            </div>
        </div>

        <!-- Column 2 -->
        <div class="column">
            <div class="column-header">Show Field Subset (Top 100), Sort by ID, Filter on ID</div>

            <div class="column-body">
                <ExampleComponent id="vis2" ref="vis2" :filterProperty="'fields.id'"></ExampleComponent>
                <nucleus-search
                    id="search2"
                    ref="search2"
                    search-field-keys="es1.earthquakes.quakedata.id,es1.earthquakes.quakedata.latitude,es1.earthquakes.quakedata.longitude,es1.earthquakes.quakedata.net,es1.earthquakes.quakedata.time"
                    search-limit="100"
                    sort-field-key="es1.earthquakes.quakedata.id"
                    sort-order="ascending"
                    vis-draw-function="drawData"
                >
                </nucleus-search>
                <nucleus-filter
                    id="filter2"
                    ref="filter2"
                    filter-type="list"
                    list-field-key="es1.earthquakes.quakedata.id"
                    list-operator="="
                    search-element-id="search2"
                    vis-filter-input-function="changeFilteredData"
                    vis-filter-output-event="dataFiltered"
                >
                </nucleus-filter>
            </div>
        </div>

        <!-- Column 3 -->
        <div class="column">
            <div class="column-header">Aggregate on Count of Network, Filter on Network</div>

            <div class="column-body">
                <ExampleComponent id="vis3" ref="vis3" :filterProperty="'fields.net'"></ExampleComponent>
                <nucleus-search
                    id="search3"
                    ref="search3"
                    search-field-keys="es1.earthquakes.quakedata.net"
                    search-limit="0"
                    sort-aggregation="_count"
                    sort-order="descending"
                    vis-draw-function="drawData"
                >
                    <nucleus-aggregation
                        aggregation-field-key="es1.earthquakes.quakedata.net"
                        aggregation-label="_count"
                        aggregation-operation="count"
                    ></nucleus-aggregation>
                    <nucleus-group
                        group-field-key="es1.earthquakes.quakedata.net"
                    ></nucleus-group>
                </nucleus-search>
                <nucleus-filter
                    id="filter3"
                    ref="filter3"
                    filter-type="list"
                    list-field-key="es1.earthquakes.quakedata.net"
                    list-operator="="
                    search-element-id="search3"
                    vis-filter-input-function="changeFilteredData"
                    vis-filter-output-event="dataFiltered"
                >
                </nucleus-filter>
            </div>
        </div>

        <!-- Column 4 -->
        <div class="column">
            <div class="column-header">Aggregate on Count of Day, Filter on Day</div>

            <div class="column-body">
                <ExampleComponent id="vis4" ref="vis4" :filterProperty="'day'"></ExampleComponent>
                <!-- Note that this search component does not have a vis-draw-function -->
                <nucleus-search
                    id="search4"
                    ref="search4"
                    search-field-keys="es1.earthquakes.quakedata.time"
                    search-limit="0"
                    sort-aggregation="_timestamp"
                    sort-order="ascending"
                >
                    <nucleus-aggregation
                        aggregation-field-key="es1.earthquakes.quakedata.time"
                        aggregation-label="_timestamp"
                        aggregation-operation="min"
                    ></nucleus-aggregation>
                    <nucleus-aggregation
                        aggregation-group="_dayOfMonth"
                        aggregation-label="_count"
                        aggregation-operation="count"
                    ></nucleus-aggregation>
                    <nucleus-group
                        group-field-key="es1.earthquakes.quakedata.time"
                        group-label="_dayOfMonth"
                        group-operation="dayOfMonth"
                    ></nucleus-group>
                </nucleus-search>
                <!-- Note that this filter component does not have vis-filter-input-function or vis-filter-output-event attributes -->
                <nucleus-filter
                    id="filter4"
                    ref="filter4"
                    domain-field-key="es1.earthquakes.quakedata.time"
                    filter-type="domain"
                    search-element-id="search4"
                >
                </nucleus-filter>
            </div>
        </div>

        <!-- Column 5 -->
        <div class="column">
            <div class="column-header">Aggregate on Count of Network / Lon / Lat (Top 100), Filter on Network and Lon / Lat Point</div>

            <div class="column-body">
                <ExampleComponent id="vis5" ref="vis5" :filterProperty="'netLonLat'"></ExampleComponent>
                <!-- Note that this search component does not have a vis-draw-function -->
                <nucleus-search
                    id="search5"
                    ref="search5"
                    search-field-keys="es1.earthquakes.quakedata.latitude,es1.earthquakes.quakedata.longitude,es1.earthquakes.quakedata.net"
                    search-limit="100"
                    sort-aggregation="_count"
                    sort-order="descending"
                >
                    <nucleus-aggregation
                        aggregation-field-key="es1.earthquakes.quakedata.net"
                        aggregation-label="_count"
                        aggregation-operation="count"
                    ></nucleus-aggregation>
                    <nucleus-group
                        group-field-key="es1.earthquakes.quakedata.latitude"
                    ></nucleus-group>
                    <nucleus-group
                        group-field-key="es1.earthquakes.quakedata.longitude"
                    ></nucleus-group>
                    <nucleus-group
                        group-field-key="es1.earthquakes.quakedata.net"
                    ></nucleus-group>
                </nucleus-search>
                <!-- Note that this filter component does not have vis-filter-input-function or vis-filter-output-event attributes -->
                <nucleus-filter
                    id="filter5A"
                    ref="filter5A"
                    filter-type="list"
                    list-field-key="es1.earthquakes.quakedata.net"
                    list-operator="="
                    search-element-id="search5"
                >
                </nucleus-filter>
                <!-- Note that this filter component does not have vis-filter-input-function or vis-filter-output-event attributes -->
                <nucleus-filter
                    id="filter5B"
                    ref="filter5B"
                    filter-type="pair"
                    pair-field-key-1="es1.earthquakes.quakedata.longitude"
                    pair-field-key-2="es1.earthquakes.quakedata.latitude"
                    pair-intersection
                    pair-operator-1="="
                    pair-operator-2="="
                    search-element-id="search5"
                >
                </nucleus-filter>
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line
import ExampleComponent from './components/ExampleComponent.vue'

import { ConnectionService } from 'nucleus/dist/core/services/connection.service';
import { DatabaseConfig, Dataset, DatastoreConfig, TableConfig } from 'nucleus/dist/core/models/dataset';
import { DateUtil } from 'nucleus/dist/core/date.util';
import { FilterService } from 'nucleus/dist/core/services/filter.service';
import { SearchService } from 'nucleus/dist/core/services/search.service';

// eslint-disable-next-line
import { NucleusAggregation } from 'nucleus/dist/core/components/aggregation.web-component';
// eslint-disable-next-line
import { NucleusGroup } from 'nucleus/dist/core/components/group.web-component';
// eslint-disable-next-line
import { NucleusFilter } from 'nucleus/dist/core/components/filter.web-component';
// eslint-disable-next-line
import { NucleusSearch } from 'nucleus/dist/core/components/search.web-component';

export default {
    name: 'app',

    components: {
        ExampleComponent
    },

    data: () => ({
        dataset: undefined,
        filterService: undefined,
        searchService: undefined
    }),

    created() {
        this.initNucleus();
    },

    mounted() {
        this.$refs.filter2.init(this.dataset, this.filterService, {
            visInput: this.$refs.vis2,
            visOutput: document.querySelector('#vis2')
        });
        this.$refs.filter3.init(this.dataset, this.filterService, {
            visInput: this.$refs.vis3,
            visOutput: document.querySelector('#vis3')
        });
        this.$refs.filter4.init(this.dataset, this.filterService, {
            visInput: this.$refs.vis4,
            visOutput: document.querySelector('#vis4')
        });
        this.$refs.filter5A.init(this.dataset, this.filterService, {
            visInput: this.$refs.vis5,
            visOutput: document.querySelector('#vis5')
        });
        this.$refs.filter5B.init(this.dataset, this.filterService, {
            visInput: this.$refs.vis5,
            visOutput: document.querySelector('#vis5')
        });

        this.$refs.search1.init(this.dataset, this.filterService, this.searchService, {
            visInput: this.$refs.vis1
        });
        this.$refs.search2.init(this.dataset, this.filterService, this.searchService, {
            visInput: this.$refs.vis2
        });
        this.$refs.search3.init(this.dataset, this.filterService, this.searchService, {
            visInput: this.$refs.vis3
        });
        this.$refs.search4.init(this.dataset, this.filterService, this.searchService, {
            visInput: this.$refs.vis4
        });
        this.$refs.search5.init(this.dataset, this.filterService, this.searchService, {
            visInput: this.$refs.vis5
        });

        // Example custom data transformations
        // Documentation: https://github.com/NextCenturyCorporation/nucleus#using-custom-data-transformations

        document.querySelector('#search4').addEventListener('searchFinished', this.transformSearchTimestampsToDays.bind(this));
        document.querySelector('#vis4').addEventListener('dataFiltered', this.transformFilteredTimestampsToDayDomains.bind(this));
        document.querySelector('#filter4').addEventListener('valuesFiltered', this.transformFilteredDomainsToTimestamps.bind(this));

        document.querySelector('#search5').addEventListener('searchFinished', this.transformSearchNetLonLatToStrings.bind(this));
        document.querySelector('#vis5').addEventListener('dataFiltered', this.transformFilteredNetLonLatToNetsAndPoints.bind(this));

    },

    methods: {
        initNucleus() {
            // Create a single copy of each core Service to share with each NUCLEUS Component.
            const connectionService = new ConnectionService();
            const filterService = new FilterService();
            const searchService = new SearchService(connectionService);

            // Define your NUCLEUS Data Server hostname.
            const dataServer = 'http://localhost:8090/neon';

            // Define your datastores, databases, tables, and (optionally) fields.
            // NUCLEUS will automatically detect fields if they are not defined.
            const fieldArray = [];
            const tableObject = TableConfig.get({
                fields: fieldArray
            });
            const databaseObject = DatabaseConfig.get({
                tables: {
                    quakedata: tableObject // Change the table name here ("quakedata") if needed
                    // Insert additional tables here if needed
                }
            });
            const datastoreObject = DatastoreConfig.get({
                host: 'localhost:9200', // Change the host and port here if needed
                type: 'elasticsearch', // Change the type here if needed
                databases: {
                    earthquakes: databaseObject // Change the database name here ("earthquakes") if needed
                    // Insert additional databases here if needed
                }
            });

            // Define relations to manage simultaneous filtering across datastores (if needed).
            const relations = [];

            // Create a single Dataset object with your datastores.
            const dataset = new Dataset({
                es1: datastoreObject // Change the datastore ID here ("es") if you want to
            }, connectionService, dataServer, relations);

            this.dataset = dataset;
            this.filterService = filterService;
            this.searchService = searchService;
        },

        transformFilteredNetLonLatToNetsAndPoints(event) {
            if (!event || !event.detail || !event.detail.values) {
                return;
            }

            // Assume the input is either a single value or an array of single values.
            const values = event.detail.values;

            // Transform the input strings into an array of net values.
            const nets = [];

            // Transform the input strings into one or more "pair" arrays of two values like [lon, lat]
            const points = [];

            (Array.isArray(values) ? values : [values]).forEach((value) => {
                const splitValue = value.split(',');
                if (splitValue.length === 3) {
                    nets.push(splitValue[0]);
                    points.push([Number(splitValue[1]), Number(splitValue[2])]);
                }
            });

            this.$refs.filter5A.updateFilteredValues(nets);
            this.$refs.filter5B.updateFilteredValues(points);
        },

        transformFilteredDomainsToTimestamps(event) {
            if (!event || !event.detail || !event.detail.values) {
                return;
            }

            // Assume the input is either a single domain array or an array of multiple domain arrays.
            const values = event.detail.values;

            // If [begin, end], transform to [[begin, end]]; if [[begin, end]], keep it.
            const domainArrays = ((Array.isArray(values) && values.length && Array.isArray(values[0])) ? values : [values]);

            // Transform the "domain" arrays of date strings like [begin, end] to timestamps.
            const timestamps = domainArrays.filter((domain) => Array.isArray(domain) && domain.length === 2)
                .map((domain) => DateUtil.fromStringToTimestamp(domain[0]));

            this.$refs.vis4.changeFilteredData(timestamps);
        },

        transformFilteredTimestampsToDayDomains(event) {
            if (!event || !event.detail || !event.detail.values) {
                return;
            }

            // Assume the input is either a single value or an array of single values.
            const values = event.detail.values;

            // Transform the input timestamps into one or more "domain" arrays of date strings like [begin, end]
            const domainArrays = (Array.isArray(values) ? values : [values]).map((value) => {
                let beginDate = new Date(value);
                let endDate = new Date(beginDate);
                endDate.setUTCHours(beginDate.getUTCHours() + 23);
                endDate.setUTCMinutes(beginDate.getUTCMinutes() + 59);
                endDate.setUTCSeconds(beginDate.getUTCSeconds() + 59);
                return [DateUtil.fromDateToString(beginDate), DateUtil.fromDateToString(endDate)];
            });

            this.$refs.filter4.updateFilteredValues(domainArrays);
        },

        transformSearchNetLonLatToStrings(event) {
            let searchDataArray = event.detail.data;

            searchDataArray.forEach((searchDataObject) => {
                searchDataObject.netLonLat = searchDataObject.fields.net + ',' + searchDataObject.fields.longitude + ',' +
                    searchDataObject.fields.latitude;
            });

            this.$refs.vis5.drawData(searchDataArray);
        },

        transformSearchTimestampsToDays(event) {
            let searchDataArray = event.detail.data;

            searchDataArray.forEach((searchDataObject) => {
                let date = new Date(searchDataObject.aggregations._timestamp);
                date.setUTCHours(0);
                date.setUTCMinutes(0);
                date.setUTCSeconds(0);
                searchDataObject.day = date.getTime();
            });

            this.$refs.vis4.drawData(searchDataArray);
        }
    }
}
</script>

<style>
body {
    margin: 0;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    border: 1px solid black;
    display: grid;
    grid-template-columns: repeat(5, 20%);
}

.column {
    border: 1px solid black;
    color: #111;
    display: grid;
    font-size: 14px;
    grid-template-rows: 1fr 10fr;
    height: 500px;
    word-break: break-word;
}

.column-header {
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
}

.column-body {
    overflow-y: scroll;
    padding: 10px;
}
</style>
