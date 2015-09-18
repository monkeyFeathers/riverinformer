var express = require('express');
var request = require('request');

var app = express();

var weatherRequestURL = 'https://api.forecast.io/forecast/6f1ee742351615e3829b743a9ab82407/37.8267,-122.423'

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname+"/public"));

app.get('/', function(req, res){
  res.type('text/html');
  res.sendFile();
});

app.get('/about', function(req, res){
  res.type('text/plain');
  res.send('About River Informer');
});

app.get('/weather', function(req,res){
  request(weatherRequestURL, function (error, response, body) {
    if (error) {
      console.error(error);
    } else {
      //console.log(body)
    }
  }).pipe(res);
  // res.send('hello')
})

// Custom 404 page
app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 -- Not Found');
});

// Custom 500 page
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 -- Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

/****************************************/
/********** Get Clackamas Rivers ********/
/*
var clackSites = [], siteNames = [];
oregonSites.forEach(function(site){
  if (site.sourceInfo.siteName.match(/clackamas/i)) {
    console.log(site.sourceInfo.siteName);
    if (siteNames.indexOf(site.name) !== -1) {
      console.log(site.name);
      console.log('hello')
      siteNames.push(site.name);
      clackSites.push(site);
    }
  }
});
****************************************/
