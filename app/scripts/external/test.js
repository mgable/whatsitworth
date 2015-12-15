'use strict';

// console.info("loading test");

// $(document).ready(function () {
//     $("#theButton").on("click", function () {
//         console.info("CLICKED");

//         var elasticServerURL = "http://localhost:9200/bank/accounts/_search";


//         var searchText = "Kidd"; //$("#search").val();
//         var maxNumberOfResults = 100; //($("#txtMaxResult").val() === "") ? 100 : $("#txtMaxResult").val();
//         var exactMatch = false; //$('#chkExactMatch').prop('checked');
//         var fuzzyMatch = false; //$('#chkFuzzyMatch').prop('checked');

//         // if ($('#chkEnglishMatch').prop('checked'))
//         //     elasticServerURL = "http://localhost:9200/shakespeare2/_search";

//         var queryData = {
//             "query": {
//                 "query_string": {
//                     "query": "Kidd"
//                 }
//             }
//         };
//         console.info("jqeury");
//         console.info(typeof kendo.stringify(queryData));

//         var resultData = [];
//         var suggestionsData = [];
//         $.ajax({
//             url: elasticServerURL,
//             dataType: "json",
//             type: 'POST',
//             contentType: 'application/json',
//             data: kendo.stringify(queryData),
//             success: function (result, status, xhr) {
//                 console.info("success");
//                 console.info(result);
//             },
//             error: function (xhr, status, error) {
//                 console.info("ERROR");
//             }
//         });



//     });

    
// });
