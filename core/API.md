# NUCLEUS Core Components API

## Aggregation Component

Creates a SQL-like aggregation clause:  `aggregation-operation(aggregation-field-key) AS aggregation-label`

### Aggregation Component Required Properties

**aggregation-field-key**

A string [field key](../../README.md#field-key) on which to aggregate.  Required only if **aggregation-group** is not set.

**aggregation-group**

A string corresponding to the **group-label** of a sibling [Group Component](#group-component).  Required only if **aggregation-field-key** is not set.

**aggregation-label**

A unique string for the aggregation's label.

### Aggregation Component Optional Properties

**aggregation-operation**

A string [aggregation operation](../../README.md#aggregation-operation).  Default `"count"`

## Filter Component

### Filter Component Required Properties

**bounds-field-key-x**

A string [field key](../../README.md#field-key) for the X field on which to filter.  Required only if **filter-type** is `"bounds"`.

**bounds-field-key-y**

A string [field key](../../README.md#field-key) for the Y field on which to filter.  Required only if **filter-type** is `"bounds"`.

**domain-field-key**

A string [field key](../../README.md#field-key) for the field on which to filter.  Required only if **filter-type** is `"domain"`.

**filter-type**

A string [filter type](../../README.md#filter-type).  Required.

**list-field-key**

A string [field key](../../README.md#field-key) for the field on which to filter.  Required only if **filter-type** is `"list"`.

**list-operator**

A string [filter operator](../../README.md#filter-operator).  Required only if **filter-type** is `"list"`.

**no-toggle**

If false, setting a filter on a value that is already filtered will remove the existing filter on that value.  If true, setting a filter on a value that is already filtered will do nothing (and not cause a requery).

**pair-field-key-1**

A string [field key](../../README.md#field-key) for a field on which to filter.  Required only if **filter-type** is `"pair"`.

**pair-field-key-2**

A string [field key](../../README.md#field-key) for a field on which to filter.  Required only if **filter-type** is `"pair"`.

**pair-operator-1**

A string [filter operator](../../README.md#filter-operator) for **pair-field-key-1**.  Required only if **filter-type** is `"pair"`.

**pair-operator-2**

A string [filter operator](../../README.md#filter-operator) for **pair-field-key-2**.  Required only if **filter-type** is `"pair"`.

**search-element-id**

The ID attribute of the Search Component corresponding to this Filter Component.  Required.

**vis-element-id**

The ID attribute of the visualization element corresponding to this Filter Component.  Required unless you are [using custom data transformations](../../README.md#using-custom-data-transformations).

**vis-filter-input-function**

The function in the visualization element corresponding to this Filter Component that sets new [filtered values](../../README.md#filtered-values).  Required unless you are [using custom data transformations](../../README.md#using-custom-data-transformations).

**vis-filter-output-event**

The event from the visualization element corresponding to this Filter Component that contains its [filtered values](../../README.md#filtered-values).  Required unless you are [using custom data transformations](../../README.md#using-custom-data-transformations).

### Filter Component Optional Properties

**list-intersection**

If truthy, each record in the data must match each value in this list filter in order to be returned by the search query.  Otherwise, each record in the data need only match one value in this list filter.  Optional if **filter-type** is `"list"`.  Default `false`

**pair-intersection**

If truthy, each record in the data must match each value in this pair filter in order to be returned by the search query.  Otherwise, each record in the data need only match one value in this pair filter.  Optional if **filter-type** is `"pair"`.  Default `false`

**vis-filter-output-event-detail-prop**

The name of the property containing the filtered values inside the `detail` object of the filter output event from the visualization element.  Default:  `'values'`

### Filter Component Output Events

**designsChanged**

Dispatched whenever valueless [filter designs](../../README.md#filter-design) are changed in this Filter Component.  The `event.detail.designs` property contains an array of valueless [filter designs](../../README.md#filter-design).

**filtersChanged**

Dispatched whenever filters are exchanged or deleted in this Filter Component.  The `event.detail.filters` property contains an array of [filter designs](../../README.md#filter-design).

**valuesFiltered**

Dispatched whenever filters that are compatible with the designs in this Filter Component are set in the Filter Service (see [externally filtered data](../../README.md#externally-filtered-data)).  The `event.detail.values` property contains an array of [filtered values](../../README.md#filtered-values).

### Filter Component Public Functions

**init(dataset: Dataset, filterService: FilterService, visElement?: any, searchElement?: any): void**

Initializes this Filter Component.

**updateFilteredValues(values: any|any[]): void**

Creates and/or deletes filters using the given [filtered values](../../README.md#filtered-values).

## Group Component

Creates a SQL-like group clause:  `GROUP BY group-field-key AS group-label`

### Group Component Required Properties

**group-field-key**

A string [field key](../../README.md#field-key) on which to group.

### Group Component Optional Properties

**group-label**

Auto-generated by the [group operation](../../README.md#group-operation).  TODO

**group-operation**

A string [group operation](../../README.md#group-operation).

## Join Component

Creates a SQL-like join clause:  `join-type JOIN join-table-key ON join-field-key-1 join-operator join-field-key-2`

### Join Component Required Properties

**join-field-key-1**

A string [field key](../../README.md#field-key) on which to join.

**join-field-key-2**

A string [field key](../../README.md#field-key) on which to join.

**join-table-key**

A string [table key](../../README.md#field-key) on which to join.

### Join Component Optional Properties

**join-operator**

A string [filter operator](../../README.md#filter-operator).  Default `'='`

**join-type**

A string [join type](../../README.md#join-type).  Default `''`

## Search Component

### Search Component Required Properties

**search-field-keys**

A string [field key](../../README.md#field-key), or a string containing multiple field keys separated by commas, on which to search.  Required.

**vis-draw-function**

The function in the visualization element corresponding to this Search Component that draws data.  Required unless you are [using custom data transformations](../../README.md#using-custom-data-transformations).

**vis-element-id**

The ID attribute of the visualization element corresponding to this Search Component.  Required unless you are [using custom data transformations](../../README.md#using-custom-data-transformations).

### Search Component Optional Properties

**data-limit**

A number corresponding to the visualization display data limit.

**enable-hide-if-unfiltered**

If truthy, hides the visualization unless its dataset is filtered.  Default `false`

**enable-ignore-self-filter**

If truthy, all filters set on this visualization's filterable field(s) do not affect this visualization's data.  Default `false`

**search-limit**

A number corresponding to the search limit.  Default `10`

**search-page**

A number corresponding to the search page.  Default `1`

**sort-aggregation**

A string corresponding to the **aggregation-label** of a sibling [Aggregation Component](#aggregation-component).  Needed to configure the sort only if **sort-field-key** is not set.

**sort-field-key**

A string [field key](../../README.md#field-key) on which to sort.  Needed to configure the sort only if **sort-aggregation** is not set.

**sort-order**

Either `"ascending"` or `"descending"`.  Default `"descending"`

### Search Component Output Events

**searchCanceled**

Dispatched whenever a search is canceled in this Search Component.

**searchFailed**

Dispatched whenever a search failed (and wasn't cancelled) in this Search Component.  The `event.detail.message` property contains a string error message and the `event.detail.error` property contains an error stacktrace as a JSON string.

**searchFinished**

Dispatched whenever a search is finished in this Search Component.  The `event.detail.data` property contains an array of [search data objects](../../README.md#search-data-object) and the `event.detail.size` property contains the size of the data.

**searchLaunched**

Dispatched whenever a search is launched in this Search Component.

### Search Component Public Functions

**init(dataset: Dataset, filterService: FilterService, searchService: SearchService, visElement?: any): void**

Initializes this Search Component.

**runQuery(): void**

Runs the search query.  Only call this function if you want to manually trigger a requery.

**updateFilters(id: string, filters: AbstractFilter[]): void**

Sets the unshared filters of this Search Component corresponding with the given ID to the given filter objects.

**updateFilterDesigns(id: string, filterDesigns: AbstractFilterDesign[]): void**

Sets the [filter designs](../../README.md#filter-design) of this Search Component corresponding with the given ID to the given filter designs.

