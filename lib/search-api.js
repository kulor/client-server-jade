var searchAPI = {};
searchAPI.getResults = function(query){
    var res = [];
    
    if(query){
        res.push({
            title : query,
            url : 'http://' + query + '.com'
        });
        
        // Sample data
        res.push({
            title : 'Foo',
            url : 'http://foo.com'
        });
        res.push({
            title : 'Bar',
            url : 'http://bar.com'
        });
    }
    return res;
};
exports.searchAPI = searchAPI;