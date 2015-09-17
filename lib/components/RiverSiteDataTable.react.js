'use strict';

var SiteDataRow = require('./SiteDataRow.react');
var React = require('react');
// var USGS= require("../usgs/USGS");

var RiverSiteDataTable = React.createClass({
  displayName: 'RiverSiteDataTable',

  //   getInitialState: function() {
  //     return {
  //       siteName: '',
  //       riverDataPoints: [],
  //       geoLocation: {}
  //     };
  //   },

  // componentDidMount: function() {
  //   var streamRequestURL = 'http://waterservices.usgs.gov/nwis/iv/?format=json';
  //   streamRequestURL += '&parameterCd=00010,00060,00065'
  //   streamRequestURL += '&site=' + this.props.site;

  //   $.get(streamRequestURL, function(result) {
  //     var USGSResponseObj = result;
  //     var USGSTimeSeriesItems = USGSResponseObj.value.timeSeries;
  //     var riverDataPoints = []
  //     USGSTimeSeriesItems.forEach(function(item){
  //       riverDataPoints.push(USGS.simplify(item));
  //     })
  //     if (this.isMounted()) {
  //       this.setState({
  //         siteName: riverDataPoints[0].siteName,
  //         riverDataPoints: riverDataPoints,
  //         geoLocation: riverDataPoints[0].geoLocation
  //       });
  //     }
  //   }.bind(this));
  // },
  render: function render() {
    var rows = [];
    this.props.riverDataPoints.forEach(function (dataPoint) {

      rows.push(React.createElement(SiteDataRow, { riverDataPoint: dataPoint }));
    });
    return React.createElement(
      'div',
      { className: "col-md-6" },
      React.createElement(
        'h3',
        null,
        this.props.siteName
      ),
      React.createElement(
        'table',
        { className: "table" },
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              null,
              'Data type'
            ),
            React.createElement(
              'th',
              null,
              'Value'
            ),
            React.createElement(
              'th',
              null,
              'Time Collected'
            )
          )
        ),
        React.createElement(
          'tbody',
          null,
          rows
        )
      ),
      React.createElement(
        'p',
        null,
        'Site at longitude:',
        this.props.geoLocation.longitude,
        ' by latitude:',
        this.props.geoLocation.latitude
      )
    );
  }
});

module.exports = RiverSiteDataTable;