# NUCLEUS Example Queries

## SQL Query Conversions

* [One Field](#one-field)
* [Two Fields](#two-fields)
* [All Fields](#all-fields)
* [Limit](#limit)
* [Offset](#offset)
* [Sort](#sort)
* [One Group](#one-group)
* [Two Groups](#two-groups)
* [One Aggregation](#one-aggregation)
* [Two Aggregations](#two-aggregations)
* [Grouped Aggregation](#grouped-aggregation)
* [Grouped and Sorted Aggregation](#grouped-and-sorted-aggregation)
* [Date Aggregation](#date-aggregation)
* [Advanced Aggregation](#advanced-aggregation)
* [One Join](#one-join)
* [Two Joins](#two-joins)

### One Field

`SELECT user_field FROM database_name.table_name`

To create this SQL query using NUCLEUS components:

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.table_name.user_field"
>
</nucleus-search>
```

### Two Fields

`SELECT user_field, text_field FROM database_name.table_name`

To create this SQL query using NUCLEUS components, separate multiple fields in the `search-field-keys` with commas:

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.table_name.user_field,datastore_id.database_name.table_name.text_field"
>
</nucleus-search>
```

### All Fields

`SELECT * FROM database_name.table_name`

To create this SQL query using NUCLEUS components, set the field in the `search-field-keys` to the wildcard character (`*`):

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.table_name.*"
>
</nucleus-search>
```

### Limit

`SELECT * FROM database_name.table_name LIMIT 12`

To create this SQL query using NUCLEUS components, add a `search-limit`:

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.table_name.*"
    search-limit="12"
>
</nucleus-search>
```

### Offset

`SELECT * FROM database_name.table_name OFFSET 34`

To create this SQL query using NUCLEUS components, add a `search-limit` and a `search-page` (the offset will equal `(page - 1) * limit`):

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.table_name.*"
    search-limit="34"
    search-page="2"
>
</nucleus-search>
```

### Sort

`SELECT * FROM database_name.table_name ORDER BY user_field ASC`

To create this SQL query using NUCLEUS components, add a `sort-field-key` and a `sort-order` (optional; the default value is `descending`):

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.table_name.*"
    sort-field-key="datastore_id.database_name.table_name.user_field"
    sort-order="ascending"
>
</nucleus-search>
```

### One Group

`SELECT user_field FROM database_name.table_name GROUP BY user_field`

To create this SQL query using NUCLEUS components:

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.table_name.user_field"
>
    <nucleus-group
        group-field-key="datastore_id.database_name.table_name.user_field"
    >
    </nucleus-group>
</nucleus-search>
```

### Two Groups

`SELECT user_field, city_field FROM database_name.table_name GROUP BY user_field, city_field`

To create this SQL query using NUCLEUS components:

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.table_name.user_field,datastore_id.database_name.table_name.city_field"
>
    <nucleus-group
        group-field-key="datastore_id.database_name.table_name.user_field"
    >
    </nucleus-group>
    <nucleus-group
        group-field-key="datastore_id.database_name.table_name.city_field"
    >
    </nucleus-group>
</nucleus-search>
```

### One Aggregation

`SELECT COUNT(user_field) AS _userCount FROM database_name.table_name`

To create this SQL query using NUCLEUS components:

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.table_name.user_field"
>
    <nucleus-aggregation
        aggregation-field-key="datastore_id.database_name.table_name.user_field"
        aggregation-label="_userCount"
        aggregation-operation="count"
    >
    </nucleus-aggregation>
</nucleus-search>
```

### Two Aggregations

`SELECT COUNT(user_field) AS _userCount, AVG(age_field) as _averageAge FROM database_name.table_name`

To create this SQL query using NUCLEUS components:

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.table_name.user_field,datastore_id.database_name.table_name.age_field"
>
    <nucleus-aggregation
        aggregation-field-key="datastore_id.database_name.table_name.user_field"
        aggregation-label="_userCount"
        aggregation-operation="count"
    >
    </nucleus-aggregation>
    <nucleus-aggregation
        aggregation-field-key="datastore_id.database_name.table_name.age_field"
        aggregation-label="_averageAge"
        aggregation-operation="avg"
    >
    </nucleus-aggregation>
</nucleus-search>
```

### Grouped Aggregation

`SELECT COUNT(user_field) AS _userCount FROM database_name.table_name GROUP BY user_field`

To create this SQL query using NUCLEUS components:

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.table_name.user_field"
>
    <nucleus-aggregation
        aggregation-field-key="datastore_id.database_name.table_name.user_field"
        aggregation-label="_userCount"
        aggregation-operation="count"
    >
    </nucleus-aggregation>
    <nucleus-group
        group-field-key="datastore_id.database_name.table_name.user_field"
    >
    </nucleus-group>
</nucleus-search>
```

### Grouped and Sorted Aggregation

`SELECT COUNT(user_field) AS _userCount FROM database_name.table_name GROUP BY user_field ORDER BY _userCount DESC`

To create this SQL query using NUCLEUS components:

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.table_name.user_field"
    sort-aggregation="_userCount"
    sort-order="descending"
>
    <nucleus-aggregation
        aggregation-field-key="datastore_id.database_name.table_name.user_field"
        aggregation-label="_userCount"
        aggregation-operation="count"
    >
    </nucleus-aggregation>
    <nucleus-group
        group-field-key="datastore_id.database_name.table_name.user_field"
    >
    </nucleus-group>
</nucleus-search>
```

### Date Aggregation

`SELECT DAYOFMONTH(date_field) AS _dayOfMonth, MIN(date_field) AS _timeline, COUNT(_dayOfMonth) AS _dateCount FROM database_name.table_name GROUP BY date_field ORDER BY _timeline ASC`

To create this SQL query using NUCLEUS components:

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.table_name.date_field"
    sort-aggregation="_timeline"
    sort-order="ascending"
>
    <nucleus-aggregation
        aggregation-field-key="datastore_id.database_name.table_name.date_field"
        aggregation-label="_timeline"
        aggregation-operation="min"
    >
    <nucleus-aggregation
        aggregation-group="_dayOfMonth"
        aggregation-label="_dateCount"
        aggregation-operation="count"
    >
    </nucleus-aggregation>
    <nucleus-group
        group-field-key="datastore_id.database_name.table_name.date_field"
        group-label="_dayOfMonth"
        group-operation="dayOfMonth"
    >
    </nucleus-group>
</nucleus-search>
```

### Advanced Aggregation

TODO

### One Join

`SELECT user_table.user_field, post_table.text_field FROM database_name.user_table INNER JOIN database_name.post_table ON user_table.user_id_field = post_table.user_id_field`

To create this SQL query using NUCLEUS components:

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.user_table.user_field,datastore_id.database_name.post_table.text_field"
>
    <nucleus-join
        join-field-key-1="datastore_id.database_name.user_table.user_id_field"
        join-field-key-2="datastore_id.database_name.post_table.user_id_field"
        join-operator="="
        join-table-key="datastore_id.database_name.post_table"
        join-type="inner"
    >
    </nucleus-join>
</nucleus-search>
```

### Two Joins

`SELECT user_table.user_field, post_table.text_field FROM database_name.user_table INNER JOIN database_name.post_table ON user_table.user_id_field = post_table.user_id_field INNER JOIN database_name.city_table ON user_table.city_id_field = city_table.city_id_field`

To create this SQL query using NUCLEUS components:

```html
<nucleus-search
    search-field-keys="datastore_id.database_name.user_table.user_field,datastore_id.database_name.post_table.text_field,datastore_id.database_name.city_table.city_field"
>
      <nucleus-join
        join-field-key-1="datastore_id.database_name.user_table.user_id_field"
        join-field-key-2="datastore_id.database_name.post_table.user_id_field"
        join-operator="="
        join-table-key="datastore_id.database_name.post_table"
        join-type="inner"
    >
    </nucleus-join>
    <nucleus-join
        join-field-key-1="datastore_id.database_name.user_table.city_id_field"
        join-field-key-2="datastore_id.database_name.city_table.city_id_field"
        join-operator="="
        join-table-key="datastore_id.database_name.city_table"
        join-type="inner"
    >
    </nucleus-join>
</nucleus-search>
```
