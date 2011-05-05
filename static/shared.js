var jade = require('jade');
var templates = {};
var compiledTemplates = {};
var resultsData = {};

// var updateResultsData = function(json){
//     console.log('setting data', json);
//     resultsData = json;
//     res = {};
//     res.resultsData = resultsData;
// };

var updateTemplates = function(json){
    console.log('setting templates', json);
    templates = json;
    precompileTemplates();
};

var precompileTemplates = function(){
    compiledTemplates.results = jade.compile(templates.results);
};

var updateResults = function(res){
    document.getElementById('search-results').innerHTML = compiledTemplates.results.call(null, {res: res});
}

var realtimeUpdateSearchResults = function(){
    var res = {};
    var apiScript = document.getElementById("api");
    
    document.getElementById('query').addEventListener('keyup', function(e){
        var query = this.value;
        $.ajax({
            url: '/search/json?query=' + query,
            success: function(response) {
                updateResults(response);

                // Update the url for browsers that can handle it
                if(history.pushState){
                    history.pushState({isMine:true}, null, window.location.pathname + '?query=' + query);
                }
            },

            error: function(xhr) {
                // console.log(xhr)
            }
        });
        
    }, false);
};

window.onload = function(){
    realtimeUpdateSearchResults();
};