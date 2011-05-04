var jade = require('jade');
var templates = {};
templates.results = jade.compile(mySharedApp.templates.results);

var res = mySharedApp.templateData;

document.getElementById('query').addEventListener('keyup', function(e){
    res.query = this.value;
    
    // Update the url for browsers that can handle it
    if(history.pushState){
        history.pushState({isMine:true}, null, window.location.pathname + '?query=' + this.value);
    }
    
    document.getElementById('app').innerHTML = templates.results.call(res);
}, false);