var cheerio = require('cheerio');
var _ = require('lodash');
var fs = require('fs');

var ReportHelper = {
  extractReports: function(html){
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
        if (el.match(/^([A-Z]+\s)+(.+:)/)){
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
      return reportCollection
    }

}

module.exports = ReportHelper;
