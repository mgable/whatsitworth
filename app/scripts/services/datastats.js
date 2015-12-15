'use strict';
/* global kendo */

/**
 * @ngdoc service
 * @name beakerApp.DataStats
 * @description
 * # QueryBuilder
 * Factory in the beakerApp.
 */
angular.module('whatsitworth').service("DataStats", function(QueryBuilder){
	var dataStats = new kendo.data.DataSource({
		transport: {
			read: {
				url: '//localhost:9200/bank/_search',
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: getStats
			},
			parameterMap: function(params){return JSON.stringify(params);}
		},
		schema: {
			parse: function(data){
				return [data.aggregations.account_stats];
			}
		}
	});

	this.get = function(){	
		return dataStats.read().then(function(){
			var stats = dataStats.data()[0];

			return {
				min: Math.floor(stats.min/1000) * 1000,
				max: Math.ceil(stats.max/1000) * 1000,
				smallStep: 1000,
				largeStep: 10000,
				value: stats.max
		    };
		});
	};

	function getStats(){
		return QueryBuilder.getStats("balance");
	}
});