angular.module('Beaker').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/advanced.html',
    "<!-- advanced search -->\n" +
    "<div class=\"form-group\">\n" +
    "\t<div class=\"panel panel-default\">\n" +
    "\t\t<div class=\"panel-body\">\n" +
    "\t\t\t<div class=\"sub-head\">Search by field</div>\n" +
    "\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t<div class=\"col-md-6\">\n" +
    "\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t<div class=\"input-group\">\n" +
    "\t\t\t\t\t\t\t<label for=\"firstname\">First Name</label>\n" +
    "\t\t\t\t\t\t\t<input type=\"text\" ng-model=\"fields.firstname\" class=\"form-control\" id=\"firstname\" autocomplete=\"false\"/>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t<div class=\"input-group\">\n" +
    "\t\t\t\t\t\t\t<label for=\"lastname\">Last Name</label>\n" +
    "\t\t\t\t\t\t\t<input type=\"text\" ng-model=\"fields.lastname\" class=\"form-control\" id=\"lastname\" autocomplete=\"off\" />\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"col-md-6\">\n" +
    "\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t\t<div class=\"input-group\">\n" +
    "\t\t\t\t\t\t\t\t<label for=\"city\">City</label>\n" +
    "\t\t\t\t\t\t\t\t<input kendo-auto-complete  k-options=\"acCustomOptions\" ng-model=\"fields.city\" id=\"city\" class=\"form-control\" />\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t<div class=\"input-group\">\n" +
    "\t\t\t\t\t\t\t<label for=\"description\">Description</label>\n" +
    "\t\t\t\t\t\t\t<input type=\"text\" ng-model=\"fields.description\" class=\"form-control\" id=\"description\" autocomplete=\"off\" />\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\n" +
    "\t<div class=\"form-group form-inline\">\n" +
    "\t\t<div class=\"checkbox\">\n" +
    "\t\t\t<label>\n" +
    "\t\t\t\t<input type=\"checkbox\" value=\"\" ng-model=\"options.fuzzySearch\">\n" +
    "\t\t\t\tFuzzy Search\n" +
    "\t\t\t</label>\n" +
    "\t\t</div>\n" +
    "\t\t&nbsp;\n" +
    "\t\t<div class=\"checkbox\">\n" +
    "\t\t\t<label>\n" +
    "\t\t\t\t<input type=\"checkbox\" value=\"\" ng-model=\"options.highlight\">\n" +
    "\t\t\t\tHighlight Matches\n" +
    "\t\t\t</label>\n" +
    "\t\t</div>\n" +
    "\t\t&nbsp;\n" +
    "\t\t<div class=\"checkbox\">\n" +
    "\t\t\t<label>\n" +
    "\t\t\t\t<input type=\"checkbox\" value=\"\" ng-model=\"options.exactMatch\">\n" +
    "\t\t\t\tExact Match\n" +
    "\t\t\t</label>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\n" +
    "\t<div class=\"panel panel-default\" ng-if=\"sliderOptions\">\n" +
    "\t\t<div class=\"panel-body\">\n" +
    "\t\t\t<div class=\"sub-head\">Filter by balance</div>\n" +
    "\t\t\t<div class=\"row slider-holder\">\n" +
    "\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t<input kendo-slider=\"beakerSlider\" options=\"sliderOptions\"  id=\"beakerSlider\" style=\"width: 100%\" />\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\n" +
    "\t<input class=\"btn btn-primary\" type=\"submit\" value=\"Search\" ng-click=\"simpleSearch(fields)\">&nbsp;\n" +
    "\t<button class=\"btn btn-default\" type=\"button\" id=\"clearButton\" ng-click=\"clear()\">Clear</button>\n" +
    "</div>\n" +
    "\n" +
    "<p class=\"text-center\"><button type=\"button\" class=\"btn btn-link\" ui-sref=\"Search.simple\">use simple search</button></p>\n" +
    "\n" +
    "<div class=\"grid\" ng-show=\"dataSearch.data().length\">\n" +
    "\t<div kendo-grid=\"beakerGrid\" options=\"mainGridOptions\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-show=\"!searchForm.pristine && searchForm.$submitted && searchForm.$dirty && dataSearch.data().length === 0\">No results found for <em>{{noResultsTerm}}</em>.</div>\n" +
    "<br/>"
  );


  $templateCache.put('views/search.html',
    "<div>\n" +
    "\t<form name=\"searchForm\" novalidate autocomplete=\"false\">\n" +
    "\t\t<div ui-view></div>\n" +
    "\t</form>\n" +
    "</div>"
  );


  $templateCache.put('views/simple.html',
    "<!-- simple search -->\n" +
    "<div class=\"input-group\">\n" +
    "\t<input type=\"text\" class=\"form-control\" ng-model=\"fields.term\" placeholder=\"Search for...\">\n" +
    "\t<span class=\"input-group-btn\">\n" +
    "\t\t<input class=\"btn btn-primary\" type=\"submit\" value=\"Search\" ng-click=\"simpleSearch(fields.term)\">\n" +
    "\t\t<button class=\"btn btn-default\" type=\"button\" id=\"clearButton\" ng-click=\"clear()\">Clear</button>\n" +
    "\t</span>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"form-group form-inline\">\n" +
    "\t<div class=\"checkbox\">\n" +
    "\t\t<label>\n" +
    "\t\t\t<input type=\"checkbox\" value=\"\" ng-model=\"options.fuzzySearch\">\n" +
    "\t\t\tFuzzy Search\n" +
    "\t\t</label>\n" +
    "\t</div>\n" +
    "\t&nbsp;\n" +
    "\t<div class=\"checkbox\">\n" +
    "\t\t<label>\n" +
    "\t\t\t<input type=\"checkbox\" value=\"\" ng-model=\"options.highlight\">\n" +
    "\t\t\tHighlight Matches\n" +
    "\t\t</label>\n" +
    "\t</div>\n" +
    "\t&nbsp;\n" +
    "\t<div class=\"checkbox\">\n" +
    "\t\t<label>\n" +
    "\t\t\t<input type=\"checkbox\" value=\"\" ng-model=\"options.exactMatch\">\n" +
    "\t\t\tExact Match\n" +
    "\t\t</label>\n" +
    "\t</div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- <p class=\"text-center\"><button type=\"button\" class=\"btn btn-link\" ui-sref=\"Search.advanced\">use advanced search</button></p> -->\n" +
    "\n" +
    "<div class=\"grid\" ng-show=\"dataSearch.data().length\">\n" +
    "\t<div>A search for <em>{{term || \"everything\"}}</em> found {{totalResults}} results.</div>\n" +
    "\t<br/>\n" +
    "\t<div kendo-grid=\"myGrid\" k-options=\"mainGridOptions\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-show=\"!searchForm.pristine && searchForm.$submitted && searchForm.$dirty && dataSearch.data().length === 0\">No results found for <em>{{noResultsTerm}}</em>.</div>\n" +
    "<br/>"
  );

}]);
