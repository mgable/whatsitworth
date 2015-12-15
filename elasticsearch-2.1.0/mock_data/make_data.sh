#!/bin/bash

curl -XDELETE "http://localhost:9200/bank"

curl -XPUT "http://localhost:9200/bank"

curl -XPUT "http://localhost:9200/bank/accounts/_mapping" -d '
{
   "accounts": {
      "properties": {
         "firstname": {
            "type": "string"
         },
         "lastname": {
            "type": "string"
         },
         "address": {
            "type": "string"
         },
         "city": {
            "type": "string"
         },
         "state": {
            "type": "string"
         },
         "gender": {
            "type": "string"
         },
         "employer": {
            "type": "string"
         },
         "email": {
            "type": "string"
         },
         "balance": {
            "type": "integer"
         },
         "age": {
            "type": "integer"
         },
         "account_number": {
            "type": "integer"
         },
         "description": {
            "type": "string"
         },
         "social_security": {
            "type": "string"
         },
         "suggest": {
            "type": "completion",
            "analyzer": "simple",
            "search_analyzer": "simple",
            "payloads": false
         }
      }
   }
}'

curl -XPOST 'http://localhost:9200/bank/accounts/_bulk?pretty' --data-binary "@./elasticsearch-2.1.0/mock_data/test_accounts.json"

sleep 1

curl -XGET 'http://localhost:9200/_cat/indices?v'