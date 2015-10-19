"use strict";

var React = require("react");
var SiteStreamDataTable = require("./SiteStreamDataTable.react");
var SiteWeatherDataTable = require("./SiteWeatherDataTable.react");
var USGS = require("../usgs/USGS");
var odfwHelper = require("../odfw/helper");

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
      var zoneSites = riverDataPoints.map(function (val, ind, arry) {
        var zone = "";
        return val.zone = zone;
      });
      window.zoneSites = zoneSites;

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
    return React.createElement(
      "article",
      { className: "container col-md-12" },
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
          "latitude: ",
          this.state.geoLocation.latitude,
          " by longitude: ",
          this.state.geoLocation.longitude
        )
      ),
      React.createElement(
        "div",
        { className: 'col-md-6' },
        React.createElement(
          "h4",
          null,
          "Fishing Reports"
        )
      ),
      React.createElement(
        "div",
        { className: 'col-md-6' },
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
      )
    );
  }

});
module.exports = RiverSite;