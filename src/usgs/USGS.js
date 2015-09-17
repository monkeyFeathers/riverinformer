
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
      simpleObj.siteName = USGSTimeSeriesItem.sourceInfo.siteName;
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
      }

      return simpleObj;
    }

}

module.exports = USGS;
