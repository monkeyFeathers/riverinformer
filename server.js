var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');

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
  var url = "http://www.dfw.state.or.us/rr/willamette/";

  request(url, function(error, response, html){
    if (!error) {
      var $ = cheerio.load(html);
      var list = $(".blue_blockwhite").nextAll();
      var p = list.filter('p');
      var count;
      p.each(function(i){
        if ($(this).hasClass('blue_blockwhite')) {
          if (!count){count = i;}
        }
      });

      p = p.slice(0,count);

      var text = []
      p.each(function(){
        text.push($(this).text())
      });
      var cleanText = text.map(function(val, ind, array){
        return _.compact(val.split(" ")).join(" ").split(/\r/).join('').split(/\n/).join('');
      })

      var reportIndices = _.compact(cleanText.map(function(el,i, array){
        if (el.match(/^([A-Z]+\s)+([A-Z]+:)/)){
          return i;
        }
      }));

      var reports = _.compact(reportIndices.map(function(el, i, array){
        if (i !== 0){   
          return cleanText.slice(array[i-1],el)
        }
      }));

      var reportCollection = reports.map(function(val, ind, array){
        var locSpec = val[0].split(":");
        return {"location" : locSpec[0], "species": locSpec[1], "report":_.rest(val)}
      })
      res.json(reportCollection)
    }
  });
});

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
