# NUCLEUS Text Cloud API

## Text Cloud Web Component

The [Text Cloud Web Component](./text-cloud.web-component.ts) is an HTMLElement that contains a [Text Cloud Visualization](#text-cloud-visualization), NUCLEUS Search Component, and NUCLEUS Filter Component.

### Text Cloud Web Component Examples

Example:

```html
<nucleus-text-cloud
    id="textCloud"
    enable-ignore-self-filter
    text-field-key="datastore.database.table.text_field"
>
</nucleus-text-cloud>
```

```js
document.querySelector('textCloud').init(dataset, filterService, searchService);
```

Example:

```html
<nucleus-text-cloud
    id="textCloud"
    aggregation-field-key="datastore.database.table.number_field"
    aggregation-operation="max"
    enable-ignore-self-filter
    text-field-key="datastore.database.table.text_field"
>
</nucleus-text-cloud>
```

```js
document.querySelector('textCloud').init(dataset, filterService, searchService);
```

### Text Cloud Web Component Required Properties

**text-field-key**

The string [field key](../../README.md#field-key) containing the text in the data.

### Text Cloud Web Component Optional Properties

**All of the [Text Cloud Visualization Optional Properties](#text-cloud-visualization-optional-properties)**

**aggregation-field-key**

A string [field key](../../README.md#field-key) on which to aggregate.  Required only if **aggregation-group** is not set.

**aggregation-operation**

A string [aggregation operation](../../README.md#aggregation-operation).  Default `"count"`

**data-limit**

A number corresponding to the visualization display data limit.

**enable-hide-if-unfiltered**

If truthy, hides the visualization unless its dataset is filtered.  Default `false`

**enable-ignore-self-filter**

If truthy, all filters set on this visualization's filterable field(s) do not affect this visualization's data.  Default `false`

**list-intersection**

If truthy, each record in the data must match each value in this list filter in order to be returned by the search query.  Otherwise, each record in the data need only match one value in this list filter.  Default `false`

**list-operator**

A string [filter operator](../../README.md#filter-operator).

**search-limit**

A number corresponding to the search limit.  Default `10000`

**search-page**

A number corresponding to the search page.  Default `1`

**sort-order**

Either `"ascending"` or `"descending"`.  Default `"descending"`

### Text Cloud Web Component Output Events

**designsChanged**

Dispatched whenever valueless [filter designs](../../README.md#filter-design) are changed in the Filter Component.  The `event.detail.designs` property contains an array of valueless [filter designs](../../README.md#filter-design).

**filtersChanged**

Dispatched whenever filters are exchanged or deleted in the Filter Component.  The `event.detail.filters` property contains an array of [filter designs](../../README.md#filter-design).

**searchCanceled**

Dispatched whenever a search is canceled in this Search Component.

**searchFailed**

Dispatched whenever a search failed (and wasn't cancelled) in the Search Component.  The `event.detail.message` property contains a string error message and the `event.detail.error` property contains an error stacktrace as a JSON string.

**searchFinished**

Dispatched whenever a search is finished in the Search Component.  The `event.detail.data` property contains an array of [search data objects](../../README.md#search-data-object) and the `event.detail.size` property contains the size of the data.

**searchLaunched**

Dispatched whenever a search is launched in the Search Component.

**valuesFiltered**

Dispatched whenever filters that are compatible with the designs in the Filter Component are set in the Filter Service (see [externally filtered data](../../README.md#externally-filtered-data)).  The `event.detail.values` property contains an array of [filtered values](../../README.md#filtered-values).

### Text Cloud Web Component Public Functions

**init(dataset: Dataset, filterService: FilterService, searchService: SearchService): void**

Initializes the Text Cloud Visualization, Search Component, and Filter Component.

**redraw(): void**

Redraws the Text Cloud Visualization.

## Text Cloud Visualization

The [Text Cloud Visualization](./text-cloud.visualization.ts) is an HTMLElement that shows a collection of words or phrases as a simple [tag cloud](https://en.wikipedia.org/wiki/Tag_cloud).

### Text Cloud Visualization Examples

Example:

```html
<nucleus-visualization-text-cloud
    id="textCloud"
    aggregation-field="aggregations._records"
    text-field="fields.topic"
>
</nucleus-visualization-text-cloud>

<nucleus-search
    id="textCloudSearch"
    enable-ignore-self-filter
    search-field-keys="datastore.database.table.text_field"
    search-limit=10000
    sort-aggregation="_records"
    sort-order="descending"
    vis-draw-function="drawData"
    vis-element-id="textCloud"
>
    <nucleus-aggregation
        aggregation-field-key="datastore.database.table.text_field"
        aggregation-label="_records"
    ></nucleus-aggregation>
    <nucleus-group
        group-field-key="datastore.database.table.text_field"
    ></nucleus-group>
</nucleus-search>

<nucleus-filter
    id="textCloudFilter"
    list-field-key="datastore.database.table.text_field"
    list-operator="="
    filter-type="list"
    search-element-id="textCloudSearch"
    vis-element-id="textCloud"
    vis-filter-input-function="changeFilteredText"
    vis-filter-output-event="filter"
></nucleus-filter>
```

```js
document.querySelector('textCloudFilter').init(dataset, filterService);
document.querySelector('textCloudSearch').init(dataset, filterService, searchService);
```

### Text Cloud Visualization Required Properties

**aggregation-field**

The [dotted path](../../README.md#dotted-path) to the property within the [search data object](../../README.md#search-data-object) in which to find the aggregation data.

**text-field**

The [dotted path](../../README.md#dotted-path) to the property within the [search data object](../../README.md#search-data-object) in which to find the text data.

### Text Cloud Visualization Optional Properties

**aggregation-title**

The string label to show next to the aggregation values in the tooltips of the text.  Default none

**color-accent**

The color of the text with the greatest frequency in the data.  Must be a hex code string or an RGB string.  Default `"#0000FF"`

**color-text**

The color of the base text.  Must be a hex code string or an RGB string.  Default `"#111111"`

**enable-show-paragraphs**

If truthy, shows the text as individual paragraphs.  Default `false`

**enable-show-values**

If truthy, shows the aggregation values next to the text.  Default `false`

### Text Cloud Visualization Public Functions

**changeFilteredText(text: string|string[]): void**

Changes the filtered text to the given string or array of strings.

**drawData(data: any[]): void**

Draws the given array of [search data objects](../../README.md#search-data-object).

**redraw(): void**

Redraws the text cloud.

**toggleFilter(text: any): void**

Toggles the filtered status on the given string.

### Text Cloud Visualization Output Events

**filter**

Dispatched whenever the filtered text is changed in the Text Cloud Visualization.  The `event.detail.values` property contains an array of [filtered values](../../README.md#filtered-values).

