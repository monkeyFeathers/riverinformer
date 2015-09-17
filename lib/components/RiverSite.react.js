"use strict";

var React = require("react");
var RiverSiteDataTable = require("./RiverSiteDataTable.react");
var USGS = require("../usgs/USGS");

var RiverSite = React.createClass({
  displayName: "RiverSite",

  getInitialState: function getInitialState() {
    return {
      siteName: '',
      riverDataPoints: [],
      geoLocation: {}
    };
  },

  componentDidMount: function componentDidMount() {
    var streamRequestURL = 'http://waterservices.usgs.gov/nwis/iv/?format=json';
    streamRequestURL += '&parameterCd=00010,00060,00065';
    streamRequestURL += '&site=' + this.props.site;

    $.get(streamRequestURL, (function (result) {
      var USGSResponseObj = result;
      var USGSTimeSeriesItems = USGSResponseObj.value.timeSeries;
      var riverDataPoints = [];
      USGSTimeSeriesItems.forEach(function (item) {
        riverDataPoints.push(USGS.simplify(item));
      });
      if (this.isMounted()) {
        this.setState({
          siteName: riverDataPoints[0].siteName,
          riverDataPoints: riverDataPoints,
          geoLocation: riverDataPoints[0].geoLocation
        });
      }
    }).bind(this));
  },
  render: function render() {
    return React.createElement(RiverSiteDataTable, { siteName: this.state.siteName,
      riverDataPoints: this.state.riverDataPoints,
      geoLocation: this.state.geoLocation });
  }

});
module.exports = RiverSite;