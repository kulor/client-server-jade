var express = require('express'),
    app = express.createServer(),
    sanitize = require('validator').sanitize,
    api = require('./lib/search-api').searchAPI,
    fs = require('fs');
    sharedData = {}; // Some Dummy Data


app.configure(function(){
    // Setting views to use jade
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
    
    // Static asset handling
    var oneYear = 31557600000;
    app.use('/static', express.static(__dirname + '/static', { maxAge: oneYear }));
});


// Redirect homepage users
app.get('/', function(req, res){
    res.redirect('/search');
});


// Base app
app.get('/search/:format?', function(req, res, next){
    // Data that will be shared for the api and app
    sharedData.title = 'Kulor Search Engine';
    sharedData.query = req.query.query || '';
    sharedData.query = sanitize(sharedData.query).xss();
    sharedData.resultsData = api.getResults(sharedData.query);
    res.local('HELPERS', require('./static/shared-helpers').HELPERS);
    
    var format = req.params.format;
    if('json' === format){
        var callback = req.query.callback;
        if(callback){
            res.send(callback + '(' + JSON.stringify(sharedData) + ')');
        } else {
            res.send(sharedData);
        }
    } else {
        res.local('res', sharedData);
        res.render('app');
    }
});


// Proxy jade.min file.
app.get('/static/jade.min.js', function(req, res, next){
    fs.readFile(__dirname + '/node_modules/jade/jade.min.js', 'utf-8', function(error, fileContents){
        res.header('Content-Type', 'text/javascript');
        res.send(fileContents);
    });
});


app.get('/data/templates', function(req, res, next){
    templates = {};
    templates.results = fs.readFileSync(__dirname + '/views/partials/results.jade', 'utf-8');
    templates.form = fs.readFileSync(__dirname + '/views/partials/form.jade', 'utf-8');
    
    res.header('Content-Type', 'application/json');
    var callback = req.query.callback;
    if(callback){
        res.send(callback + '(' + JSON.stringify(templates) + ')');
    } else {
        res.send(ret);
    }
});


var appPort = 4040;
app.listen(appPort);
console.log('client-server-jade app started on port ' + appPort);
