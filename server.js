var express = require('express');
var request = require('superagent');
var _ = require('lodash');
var ReportHelper = require("./src/utilities/ReportHelper");
var OREGON_SITES = require('./cache/oregon_sites');
var ZoneBoundaries = require("./src/odfw/ZoneBoundaries");

var app = express();

var weatherRequestURL = 'https://api.forecast.io/forecast/6f1ee742351615e3829b743a9ab82407/45.29984346,-122.3539746'

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
app.get('/report/:river', function(req, res){
  request
    .get('http://www.dfw.state.or.us/rr/willamette/')
    .end(function(err, odfwRes) {
      var reports = ReportHelper.extractReports(odfwRes.text)
      var re = new RegExp(req.params.river,'i');
      var riverReport = reports.filter(function(report) {
        if (report.location.match(re)) return report
      })
      res.json(riverReport)
    });
});

app.get('/zones', function(req,res){
  res.json(ZoneBoundaries);
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
