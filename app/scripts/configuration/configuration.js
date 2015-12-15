"use strict";

angular.module('whatsitworth')
	.constant('CONFIG', {
		"data": {
			"protocol": "http",
			"domain": "localhost:9200",
			"index": "collectors",
			"type": "tins",
			"endpoints": {
				"search": "_search",
				"suggest": "_suggest"
			}
		},
		"columns": [{
					field: "src",
					title: "Image",
					template: "<img src='#: src  #' />"
				},{
					field: "title",
					title: "Title"
				},{
					field: "price",
					title: "Sold For",
					template: "<span>$#: price # </span>"
				},{
					field: "date",
					title: "Date Sold"
				},{
					field: "bidders",
					title: "Bidders"
				},{
					field: "watchers",
					title: "Watchers"
				}]
	});


