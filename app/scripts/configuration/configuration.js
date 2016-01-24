"use strict";

angular.module('whatsitworth')
	.constant('CONFIG', {
		"data": {
			"protocol": "http",
			"domain": "localhost:9200",
			"index": "collectorsdb",
			"type": "advertising_tins",
			"endpoints": {
				"search": "_search",
				"suggest": "_suggest"
			}
		},
		"columns": [{
					field: "src",
					title: "Item",
					template: "<a href='#: link #'><img src='#: src  #' /></a>"
				},{
					field: "title",
					title: "Description",
					template: "<div class='description'>#: title #</div><div class='meta'><span class='category'>Bidders:&nbsp; <span>#: bidders #</span></span><span class='category'>Watchers:&nbsp;<span>#: watchers #</span></span><span class='category' ng-click='showAdditionalImages(\"#: itemId #\")'>Additional Images:&nbsp;<span>#: count #</span></span></div>",
					encoded: false
				},{
					field: "price",
					title: "Price",
					template: "<span>$#: price # </span>"
				},{
					field: "date",
					title: "Date",
					width: "120px" 
				}]
	});


