var _ = require("lodash");
function decodeHtml(html) {
  if (html.match("&#176;")){ // degree symbol
    return html.split("&#176;").join("°")
  } else if (html.match("&#179;")) { // cubed symbol
    return html.split("&#179;").join("³");
  } else {
    return html
  }
}

var PARAMETER_CODES = {
  "TEMPERATURE_FARENHEIGHT" : "00011",
  "TEMPERATURE_CELSIUS" : "00010",
  "GAGE_HEIGHT_FEET" : "00065",
  "DISCHARGE_INST_FEET3PERSEC" : "00060"
};
var Base_URL = 'http://waterservices.usgs.gov/nwis/iv/?format=json'

var USGS = {
  simplify: function(USGSTimeSeriesItem) {
      var simpleObj = {}
      simpleObj.siteName = this.toTitleCase(USGSTimeSeriesItem.sourceInfo.siteName);
      simpleObj.siteCode = USGSTimeSeriesItem.sourceInfo.siteCode[0].value;
      simpleObj.geoLocation = USGSTimeSeriesItem.sourceInfo.geoLocation.geogLocation
      simpleObj.dateTime = USGSTimeSeriesItem.values[0].value[0].dateTime;
      simpleObj.value = USGSTimeSeriesItem.values[0].value[0].value;
      simpleObj.units = decodeHtml(USGSTimeSeriesItem.variable.variableName)
      simpleObj.parameter = ''
      for (var param in PARAMETER_CODES) {
        if (PARAMETER_CODES[param] === USGSTimeSeriesItem.name.split(":")[2]) {
          simpleObj.parameter = param;
          break;
        };
      };
      simpleObj.formattedData = this.cleanDataLabel(simpleObj)

      return simpleObj;
    },
    simplifySiteList: function(USGS_Site) {
      var simpleObj = {};
      simpleObj.siteName = USGS_Site.sourceInfo.siteName;
      simpleObj.siteCode = USGS_Site.sourceInfo.siteCode[0].value;
      simpleObj.geoLocation = USGS_Site.sourceInfo.geoLocation.geogLocation
      return simpleObj;
    },

  getOregonStreamName: function(USGSSiteName) {
    
    if (USGSSiteName.match("WILLAMETTE")) {
      return "WILLAMETTE RIVER"
    }
    var nameFrag = USGSSiteName.split(' ');   
    if (nameFrag[0].match(/North|SOUTH|EAST|COAST|MIDDLE|WEST/i)){
      if (nameFrag[1].match(/fork/i)) {
        if ([nameFrag[2], nameFrag[3]].join(' ').match(/OF M/i)){
          return [nameFrag[5], nameFrag[6]].join(' ');
        } else {
          return [nameFrag[2], nameFrag[3]].join(' ');
        }
      } else {
        return [nameFrag[1], nameFrag[2]].join(' ');
      }
    } else {
      return [nameFrag[0], nameFrag[1]].join(' ');
    }
  },
  cleanDataLabel: function(simplifiedUSGSobj){
    var units;
    var label;
    switch (simplifiedUSGSobj.units.split(',')[0]) {
      case 'Temperature':
        label = 'Water Temperature';
        units = simplifiedUSGSobj.units.split(',')[2];
        break;
      case 'Streamflow':
        label = 'Streamflow';
        units = simplifiedUSGSobj.units.split(',')[1];
      default:
        label = simplifiedUSGSobj.units.split(',')[0];
        units = simplifiedUSGSobj.units.split(',')[1]
    }
    return {label:label, value:[simplifiedUSGSobj.value,units].join("")}
  },
  toTitleCase: function(string) {
    var str = string.toLowerCase()
    return str.split(" ").map(function(i){return i[0].toUpperCase() + i.substring(1)}).join(" ");
  }

}

module.exports = USGS;
