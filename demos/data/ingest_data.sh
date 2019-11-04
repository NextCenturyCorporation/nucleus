#!/bin/bash

HOST=${1:-http://localhost:9200}

declare -a indexes=("earthquakes")

for i in "${indexes[@]}"
do
    if curl -s -XDELETE $HOST/$i > /dev/null; then
        elasticdump --type=mapping --input=$i.mapping_dump.json --output=$HOST/$i
        elasticdump --type=data --input=$i.data.json --output=$HOST/$i --limit=5000
    fi
done

