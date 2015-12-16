'use strict';
/* globals kendo, _ */

/**
 * @ngdoc function
 * @name beakerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the beakerApp
 */
angular.module('whatsitworth')
.controller("SimpleCtrl", function($scope, QueryBuilder){

	$scope.clear();

	$scope.dataSearch.transport.options.read.data = getData;

	function getData(data){
		if (!_.isEmpty($scope.options)){
			return QueryBuilder.searchFields([$scope.term], ['title'], $scope.options);
		} else {
			return  ($scope.term) ? QueryBuilder.searchAllFields($scope.term) : "" ;
		}
	}
})
.controller('SearchCtrl', function ($scope, $timeout, CONFIG) {
  	var dataSearch = new kendo.data.DataSource({
			transport: {
				read: {
					url: makeUrl(CONFIG.data.endpoints.search), 
					type: 'POST',
					dataType: 'json',
					contentType: 'application/json'
					// data is supplied by the subclass
				},
				parameterMap: parameterMap
			},
			pageSize: 10,
			serverPaging: true,
			serverSorting: true,
			totalRecords: null,
			sort: { field: "date", dir: "desc" },
			schema: {
				parse: function(data){
					this.totalRecords = data.hits.total;
					$scope.totalResults = this.totalRecords;
					return data.hits.hits.map(function(item){
						if (item.highlight) {
							_.each(item.highlight, function(v,i){
								item._source[i] = v[0];
							});
						}

						var formattedDate = new Date(item._source.meta.date.formatted);

						if (formattedDate) {
							item._source.meta.date.formatted = formattedDate.toString("MMM d, yyyy");
						}

						var formattedPrice = item._source.meta.price / 100;

						item._source.meta.price = formattedPrice.toFixed(2);

						return item._source;
					});
				},
				total: function(){
					return this.totalRecords;
				},
				model: {
            		id: "_id",
            		// data: "data",
              		fields: {
                		_id: {
							type: "string"
						},
						price: {
							from: "meta.price"
						},
						bidders: {
							from: "meta.bids"
						},
						watchers: {
							from: "meta.watchers"
						},
						date: {
							from: "meta.date.formatted"
						}
					}
				}
			}
		}),
		mainGridOptions = {
			dataSource: dataSearch,
			sortable: true,
			pageable: true,
			scrollable: false,
			// autoBind: false,
			columns: CONFIG.columns
	},
    mappings = {
		"skip": "from",
		"take": "size",
		"page": "",
		"pageSize": "",
		"sort": "",
		"filter": ""
	};

	function makeUrl(endpoint){
		var d = CONFIG.data;
		console.info(d.protocol + "://"  + d.domain + "/" + d.index + "/" + d.type + "/" + endpoint);
		return d.protocol + "://"  + d.domain + "/" + d.index + "/" + d.type + "/" + endpoint
	}

	function parameterMap(data){ //type
		var esParams = remap(mappings, data),
			params =  _.omit(data, Object.keys(mappings));

		if (data.sort && data.sort.length) {
			esParams.sort = sort(data);
		}

		return JSON.stringify(_.extend (params, esParams));
	}

	function sort(data){
		var sortObj = {},
			field,
			order;

		data.sort.forEach(function(param){
			field = param.field;
			order = param.dir;
			sortObj[field] = {'order': order};
		});
		
		return [sortObj];
	}

	function remap(map, data){
		var params = {};

		_.each(map, function(v,i){
			if(v && data[i]){
				params[v] = data[i];
			}
		});

		return params;
	}

	function clear(){
		mainGridOptions.dataSource.data("");
		$scope.term = "";
		$scope.fields = {};
		$scope.options = {};
		$scope.noResultsTerm = "";
		$timeout(function(){
			$scope.searchForm.$submitted = false;
			$scope.searchForm.$setPristine();
		},0);
	}

	function simpleSearch(term){
		//if (!_.isEmpty(term)) {
			$scope.term = term;
			dataSearch.query({"page": 1, "skip": 0, "pageSize": 10, "sort": { "field": "date", "dir": "desc" }}).then(function(){
				if (dataSearch.data().length === 0){
					$scope.$apply(function(){
						$scope.noResultsTerm = _.clone($scope.term);
						$scope.term = "";
					});
				}
			});
		// } else {
		// 	clear();
		// }
	}

	$scope.fields = {};
	$scope.parameterMap = parameterMap;
	$scope.simpleSearch = simpleSearch;
	$scope.clear = clear;
	$scope.mainGridOptions = mainGridOptions;
	$scope.dataSearch = dataSearch;
});
