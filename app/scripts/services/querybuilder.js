'use strict';
/* global _ */

/**
 * @ngdoc service
 * @name beakerApp.QueryBuilder
 * @description
 * # QueryBuilder
 * Factory in the beakerApp.
 */
angular.module('whatsitworth')
.factory('QueryBuilder', function () {

	function searchAllFields(term){
		return {
			"query": {
				"query_string": {
					"query": term
				}
			}
		};
	}

	function clean(data){
		_.each(data, function(v,i){
			if (!v){
				delete data[i];
			}
		});
    	return data;
	}

	function searchFields(data, options){
		var fields = Object.keys(clean(data)),
			term = fields.map(function(v){
				return data[v];
			}).join(' '),
			options = options || {},
			query = {};

		if (options.fuzzySearch){
			query = {
				"query":
					{
					  "multi_match" : {
					    "query": term,
					    "fields": fields,
					    "operator": matchingOperator(options),
				 		"fuzziness": "AUTO"
					  }
					}
				};

		} else {
			query =  {
				"query": {
					 	"multi_match": {
						    "query": term,
						    "type": "cross_fields",
						    "fields": fields,
						    "operator": matchingOperator(options)
						}
					}
				};
		}

		if (options.highlight){
			_.extend(query, highlightField(fields));
		}

		return query;
	}

	function getStats(field){
		return {
			"aggs" : {
				"account_stats" : { "stats" : { "field" : field } }
			},
			"size": 0
		};
	}

	function matchingOperator(options){
		return options.exactMatch ? "and" : "or";
	}

	function highlightField(fields){
		var query = {
			"highlight": {
                "pre_tags": ["<span class='highlight'>"],
                "post_tags": ["</span>"],
                "fields": {}
            }
        };

        fields.forEach(function(field){
        	query.highlight.fields[field] = { "type": "plain" };
        });
        
        return query;
	}

	function suggest(term){
		return {
			"accounts_suggest":
				{
					"text": term,
					"completion": {"field" : "suggest"}
				}
			};
	}

	// Public API here
	return {
		searchAllFields: searchAllFields,
		searchFields: searchFields,
		suggest: suggest,
		getStats: getStats
	};
});
