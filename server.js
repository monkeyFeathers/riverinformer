var express = require('express');

var Promise = require('bluebird');
var request = Promise.promisify(require("request"));
var _ = require('lodash');
var ReportHelper = require("./src/utilities/ReportHelper");
var OREGON_SITES = require('./cache/oregon_sites');

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
app.get('/report', function(req, res){
  var nwZone = request("http://www.dfw.state.or.us/rr/northwest/").get(1)
  var swZone = request("http://www.dfw.state.or.us/rr/southwest/").get(1)
  var wZone = request("http://www.dfw.state.or.us/rr/willamette/").get(1)
  var ctZone = request("http://www.dfw.state.or.us/rr/central/").get(1)
  var seZone = request("http://www.dfw.state.or.us/rr/southeast/").get(1)
  var neZone = request("http://www.dfw.state.or.us/rr/northeast/").get(1)
  var snkZone = request("http://www.dfw.state.or.us/rr/snake").get(1)
  var colZone = request("http://www.dfw.state.or.us/rr/columbia/").get(1)
  var marineZone = request("http://www.dfw.state.or.us/rr/marine/").get(1)

  Promise.join(nwZone, swZone,wZone,ctZone,seZone,neZone,snkZone,colZone,marineZone, 
    function(nw,sw,w,ct,se,ne,snk,col,marine){
      var extract = ReportHelper.extractReports;
      var reportCollection = { 
        "Northwest_zone" : extract(nw),
        "Soutwest_zone" : extract(sw),
        "Willamette_zone" : extract(w),
        "Central_zone" : extract(ct),
        "Southeast_zone" : extract(se),
        "Northeast_zone" : extract(ne),
        "Snake_zone" : extract(snk),
        "Columbia_zone" : extract(col),
        "Marine_zone" : extract(marine)
      }
      return reportCollection;
  }).then(function(reportCollection){
    res.json(reportCollection)
  }).catch(function(err){
    console.log(err);
  });
});

// app.get('/save_sites', function(req, res){
//   var url = 'http://waterservices.usgs.gov/nwis/iv/?format=json';
//     url += '&siteType=ST&stateCd=or';
//   request(url, function(error, response, body){
//     var USGSResponseObj = JSON.parse(body);
//     var USGSTimeSeriesItems = USGSResponseObj.value.timeSeries;
//     var sites = [];
//     USGSTimeSeriesItems.forEach(function(site){
//       sites.push(USGS.simplifySiteList(site));
//     });
      
//     sites = USGS.cleanSiteNames(sites)
//     fs.writeFile('oregonSites.js', JSON.stringify(sites), function (err) {
//       if (err) throw err;
//       console.log('It\'s saved!');
//     });
//     res.json(sites);
//   });
// })

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
