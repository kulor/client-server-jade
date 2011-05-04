var express = require('express'),
    app = express.createServer(),
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


// Base app
app.get('/', function(req, res, next){
    // Assign the data to the renderer
    res.local('title', 'Kulor Search Engine');
    sharedData.query = req.query.query || '';
    res.local('res', sharedData);
    res.render('app');
});


// Proxy jade.min file.
app.get('/static/jade.min.js', function(req, res, next){
    fs.readFile(__dirname + '/node_modules/jade/jade.min.js', 'utf-8', function(error, fileContents){
        res.header('Content-Type', 'text/javascript');
        res.send(fileContents);
    });
});


// Data to share with the frontend code
app.get('/data/shared.json', function(req, res, next){    
    var ret = {};
    ret.templateData = sharedData;
    ret.templates = {};
    ret.templates.results = fs.readFileSync(__dirname + '/views/partials/results.jade', 'utf-8');
    ret.templates.form = fs.readFileSync(__dirname + '/views/partials/form.jade', 'utf-8');
    
    res.header('Content-Type', 'application/javascript');
    res.send('var mySharedApp = ' + JSON.stringify(ret));
});


var appPort = 4040;
app.listen(appPort);
console.log('client-server-jade app started on port ' + appPort);