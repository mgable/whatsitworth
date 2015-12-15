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
		return  ($scope.term) ? QueryBuilder.searchAllFields($scope.term, $scope.options) : "" ;
	}
})
.controller("AdvancedCtrl", function($scope, QueryBuilder){
	var dataSuggest = new kendo.data.DataSource({
		transport: {
			read: {
				url: '//localhost:9200/bank/_suggest',
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: suggest
			},
			parameterMap: $scope.parameterMap
		},
		serverFiltering: true,
		schema: {
			parse: function(data){
				return data.accounts_suggest[0].options;
			}
		}
	}),
	acCustomOptions = {
		dataSource: dataSuggest,
        dataTextField: "text"
    };

    $scope.clear();

	$scope.dataSearch.transport.options.read.data = getData;
	$scope.acCustomOptions = acCustomOptions;

	function getData(data){
		if (data) {
			return QueryBuilder.searchFields($scope.term, $scope.options);
		}
	}

	function suggest(data){
		return QueryBuilder.suggest(data.filter.filters[0].value);
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
					return data.hits.hits.map(function(item){
						if (item.highlight) {
							_.each(item.highlight, function(v,i){
								item._source[i] = v[0];
							});
						}

						var formattedDate = new Date(item._source.data.date.formatted);

						if (formattedDate) {
							item._source.data.date.formatted = formattedDate.toString("MMM d, yyyy");
						}

						var formattedPrice = item._source.data.price;

						item._source.data.price = item._source.data.price.toFixed(2);

						return item._source;
					});
				},
				total: function(){
					return this.totalRecords;
				},
				model: {
            		id: "_id",
            		data: "data",
              		fields: {
                		_id: {
							type: "string"
						},
						price: {
							from: "data.price"
						},
						bidders: {
							from: "data.bids"
						},
						watchers: {
							from: "data.watchers"
						},
						date: {
							from: "data.date.formatted"
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
		$scope.noResultsTerm = "";
		$timeout(function(){
			$scope.searchForm.$submitted = false;
			$scope.searchForm.$setPristine();
		},0);
	}

	function simpleSearch(term){
		if (!_.isEmpty(term)) {
			$scope.term = term;
			dataSearch.query({"page": 1, "skip": 0, "pageSize": 10}).then(function(){
				if (dataSearch.data().length === 0){
					$scope.$apply(function(){
						$scope.noResultsTerm = _.clone($scope.term);
						$scope.term = "";
					});
				}
			});
		} else {
			clear();
		}
	}

	$scope.fields = {};
	$scope.parameterMap = parameterMap;
	$scope.simpleSearch = simpleSearch;
	$scope.clear = clear;
	$scope.mainGridOptions = mainGridOptions;
	$scope.dataSearch = dataSearch;
});
