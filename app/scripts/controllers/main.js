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
.controller('SearchCtrl', function ($scope, $timeout, $uibModal, CONFIG) {
  	var imagePath = "http://localhost/~markgable/data/collectorsDB/advertising_tins/store/images/",
  		dataSearch = new kendo.data.DataSource({
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

						// fix date
						var formattedDate = new Date(item._source.meta.date.formatted);
						if (formattedDate) {
							item._source.meta.date.formatted = formattedDate.toString("MMM d, yyyy");
						}

						// fix id
						item._source.itemId = item._source.id;

						// fix price
						var formattedPrice = item._source.meta.price / 100;
						item._source.meta.price = formattedPrice.toFixed(2);

						// fix thumbnail image
						var image = item._source.src.local;
						item._source.src.local = imagePath + image;

						// fix additional Images
						var additionalImages = item._source.images.local;
						item._source.images.local = additionalImages.map(function(image){
							return imagePath + image;
						});

						item._source.images.count = additionalImages.length;

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
						},
						src: {
							from: "src.local"
						},
						imgs: {
							type: "array",
							from: "images.local"
						},
						count: {
							from: "images.count"
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

	$scope.showAdditionalImages = function (itemId) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'views/modal.tpl.html',
			controller: 'ModalInstanceCtrl',
			size: 'lg', //size,
			// resolve: {
			// 	items: function () {
			// 		return $scope.items;
			// 	}
			// }
		});

		console.info(itemId);

		modalInstance.result.then(function (selectedItem) {
			console.info(selectedItem);
			console.info("selectedItem");
			$scope.selected = selectedItem;
		}, function () {
			console.info('Modal dismissed at: ' + new Date());
		});
	};

	$timeout(
		function(){
			var grid = $('div[kendo-grid]').data('kendoGrid');

			grid.thead.kendoTooltip({
	    		filter: "th",
			    content: function (e) {
			    	console.info("tooltip");
			    	console.info(e);
			        var target = e.target; // element for which the tooltip is shown
			        return $(target).text();
			    }
			});
	},1000);
})
.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

  $scope.ok = function () {
  	console.info("you clicked ok");
    $uibModalInstance.close("foobar");
  };

  $scope.cancel = function () {
  	console.info("you clicked cancel");
    $uibModalInstance.dismiss('cancel');
  };
});
