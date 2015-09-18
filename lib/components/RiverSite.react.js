"use strict";

var React = require("react");
var SiteStreamDataTable = require("./SiteStreamDataTable.react");
var SiteWeatherDataTable = require("./SiteWeatherDataTable.react");
var USGS = require("../usgs/USGS");
// var ForecastIo = require('forecastio');

// var forecastIo = new ForecastIo('6f1ee742351615e3829b743a9ab82407');

var RiverSite = React.createClass({
  displayName: "RiverSite",

  getInitialState: function getInitialState() {
    return {
      siteName: '',
      riverDataPoints: [],
      geoLocation: {},
      weatherDataPoints: []
    };
  },

  componentDidMount: function componentDidMount() {
    // get stream data
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
    // // get/ set weather data

    // $.get(streamRequestURL, function(result) {
    //   if (this.isMounted()){
    //     this.setState({
    //       weatherDataPoints:["weather", "looks", "good"]
    //     });
    //   }
    // }.bind(this));
  },
  render: function render() {
    return React.createElement(
      "article",
      { className: "container col-md-6" },
      React.createElement(
        "header",
        { className: "row" },
        React.createElement(
          "h3",
          null,
          this.state.siteName
        ),
        React.createElement(
          "p",
          null,
          "latitude:",
          this.state.geoLocation.latitude,
          " by longitude:",
          this.state.geoLocation.longitude
        )
      ),
      React.createElement(
        "div",
        { className: 'row stream-table' },
        React.createElement(SiteStreamDataTable, { siteName: this.state.siteName,
          riverDataPoints: this.state.riverDataPoints,
          geoLocation: this.state.geoLocation,
          tableTitle: 'Stream Data' })
      ),
      React.createElement(
        "div",
        { className: 'row weather-table' },
        React.createElement(SiteWeatherDataTable, { tableTitle: 'Weather Data' })
      )
    );
  }

});
module.exports = RiverSite;