<template>
    <div>
        <div class="block title">
            <div>Total: {{ dataArray.length }}</div>
            <div>Filters: {{ filterText }}</div>
        </div>
        <div class="container">
            <!-- eslint-disable-next-line -->
            <div class="block" v-for="item in dataArray" :class="{ 'highlight': item.isHighlighted, 'clickable': item.isClickable }"
                v-on:click="filterDataItem(item)">

                <div v-if="item.aggregationArray.length" class="title">Aggregations:</div>
                <!-- eslint-disable-next-line -->
                <div v-for="aggregation in item.aggregationArray" class="row">{{ aggregation.key + ': ' + aggregation.value }}</div>

                <div class="title">Fields:</div>
                <!-- eslint-disable-next-line -->
                <div v-for="field in item.fieldArray" class="row">{{ field.key + ': ' + field.value }}</div>

                <div class="title">Filtered: {{ item.isHighlighted ? 'Yes' : 'No' }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { CoreUtil } from 'nucleus/dist/core/core.util';

export default {
    name: 'ExampleComponent',

    props: {
        filterProperty: String
    },

    data: () => ({
        dataArray: [],
        filterText: '',
        filteredValues: []
    }),

    methods: {
        /**
         * Changes the filtered data in this visualization to the values in the given filter data.  Invoked by a Filter Component.
         */
        changeFilteredData(filterData) {
            const filtered = !Array.isArray(filterData) ? [filterData] : filterData.reduce((list, part) => list.concat(part), []);

            if (this.filteredValues.length !== filtered.length || this.filteredValues.some((value, index) => value !== filtered[index])) {
                this.filteredValues = filtered;

                this.updateFilterText();

                // Do NOT dispatch a dataFiltered event here!
            }
        },

        /**
         * Draws the given search data as HTML elements in this visualization.  Invoked by a Search Component.
         */
        drawData(searchDataArray) {
            this.dataArray = searchDataArray.map((searchDataObject) => {
                const filterValue = this.filterProperty ? CoreUtil.deepFind(searchDataObject, this.filterProperty) : null;

                searchDataObject.filterValue = filterValue;
                searchDataObject.isClickable = !!filterValue;
                searchDataObject.isHighlighted = searchDataObject.filtered || (filterValue && this.filteredValues.indexOf(filterValue) >= 0);
                searchDataObject.aggregationArray = Object.keys(searchDataObject.aggregations).map((aggregationKey) => ({
                    key: aggregationKey,
                    value: JSON.stringify(searchDataObject.aggregations[aggregationKey])
                }));
                searchDataObject.fieldArray = Object.keys(searchDataObject.fields).map((fieldKey) => ({
                    key: fieldKey,
                    value: JSON.stringify(searchDataObject.fields[fieldKey])
                }));

                return searchDataObject;
            });

            this.updateFilterText();
        },

        /**
         * Creates or changes the filtered values based on the given item from the visualization's data array.  Invoked by user interaction.
         */
        filterDataItem(item) {
            const index = this.filteredValues.indexOf(item.filterValue);
            if (index >= 0) {
                this.filteredValues.splice(index, 1);
            } else {
                this.filteredValues.push(item.filterValue);
            }

            this.updateFilterText();

            document.querySelector('#' + this.$attrs.id).dispatchEvent(new CustomEvent('dataFiltered', {
                bubbles: true,
                detail: {
                    values: this.filteredValues
                }
            }));
        },

        /**
         * Updates the filter text using the filter property and the filtered values.
         */
        updateFilterText() {
            this.filterText = !this.filterProperty ? 'Disabled' : (!this.filteredValues.length ? 'None' :
                ('"' + this.filteredValues.join('","') + '"'));
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block {
    border-bottom: 2px solid black;
    color: black;
    margin-bottom: 10px;
    padding-bottom: 10px;
}

.highlight {
    color: orange;
}

.row {
    padding-left: 10px;
}

.title {
    font-weight: bold;
}

.clickable:hover {
    color: blue;
    cursor: pointer;
}
</style>
