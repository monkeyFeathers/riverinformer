var _ = require('lodash');

var USGS = {

  simplify: function(data) {
    data = data.value
    var metaDataSource = data.timeSeries[0].sourceInfo;
    var obj = {}
    obj.siteName = metaDataSource.siteName.toLowerCase();
    obj.siteCode = metaDataSource.siteCode[0].value;
    obj.geoLocation = metaDataSource.geoLocation.geogLocation;
    obj.parameters = this.setDataParameters(data.timeSeries);
    return obj
  },

  setDataParameters: function(tsArray){
    var parameters = [];
    tsArray.map(function(tsItem) {
      var param = {}
      param.description = tsItem.variable.variableDescription;
      param.units = tsItem.variable.unit.unitCode;
      param.data = tsItem.values[0].value.map(function(val, ind) {
        var dateTime = val.dateTime.split('T')
        return {date: dateTime[0], value: val.value, time: dateTime[1]}
      })
      parameters.push(param)
    })
    return parameters;
  },

}

module.exports = USGS;
