var request = require('request');
var Events = require('events');
function decodeHtml(html) {
  if (html.match("&#176;")){ // degree symbol
    return html.split("&#176;").join("°")
  } else if (html.match("&#179;")) { // cubed symbol
    return html.split("&#179;").join("³");
  }
}

var BASE_URL = 'http://waterservices.usgs.gov/nwis/iv/?format=json';

var PARAMETER_CODES = {
  "TEMPERATURE_FARENHEIGHT" : "00011",
  "TEMPERATURE_CELSIUS" : "00010",
  "GAGE_HEIGHT_FEET" : "00065",
  "DISCHARGE_INST_FEET3PERSEC" : "00060"
}



USGS = {

  CreateStreamSite: function(siteCode, eventEmitter) {

    var parameters = [PARAMETER_CODES.TEMPERATURE_CELSIUS,
                      PARAMETER_CODES.TEMPERATURE_FARENHEIGHT,
                      PARAMETER_CODES.GAGE_HEIGHT_FEET,
                      PARAMETER_CODES.DISCHARGE_INST_FEET3PERSEC
                      ].join(',');
    var requestURL = BASE_URL + "&site=" + siteCode + "&parameterCd=" + parameters;
    var streamSite =  {};

    request(requestURL, function (error, response, body) {

      var USGSResponseObj = JSON.parse(body);
      var USGSTimeSeriesItems = USGSResponseObj.value.timeSeries;

      streamSite.siteName = USGSTimeSeriesItems[0].sourceInfo.siteName;
      streamSite.siteCode = siteCode;
      streamSite.geoLocation = USGSTimeSeriesItems[0].sourceInfo.geoLocation.geoLocation;
      
      var items = []
      USGSTimeSeriesItems.forEach(function(item){
        items.push(parseTimeSeriesItem(item));
      })
      items.forEach(function(item){
        streamSite[item.parameter] = item;
      });
    });
    eventEmitter.emit('STREAM_DATA');
    return streamSite;
  }


}

function parseTimeSeriesItem(USGSTimeSeriesItem) {
  var simpleObj = {}
  simpleObj.siteName = USGSTimeSeriesItem.sourceInfo.siteName;
  simpleObj.siteCode = USGSTimeSeriesItem.sourceInfo.siteCode[0].value;
  simpleObj.dateTime = USGSTimeSeriesItem.values[0].value[0].dateTime;
  simpleObj.value = USGSTimeSeriesItem.values[0].value[0].value;
  simpleObj.units = decodeHtml(USGSTimeSeriesItem.variable.variableName)
  simpleObj.parameter = ''
  for (param in PARAMETER_CODES) {

    if (PARAMETER_CODES[param] === USGSTimeSeriesItem.name.split(":")[2]) {
      simpleObj.parameter = param;
      break;
    };
  }

  return simpleObj;
}
var eventEmitter = new Events.EventEmitter();
var streamSite = USGS.CreateStreamSite('14210000', eventEmitter);

eventEmitter.on('STREAM_DATA', function(){
  console.log(JSON.stringify(streamSite));
});




