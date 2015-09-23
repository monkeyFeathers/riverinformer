'use strict';

var React = require('react');
var _ = require('lodash');
var USGS = require("../usgs/USGS");
var SiteSummary = require("./SiteSummary.react");

var Stream = React.createClass({
  displayName: 'Stream',

  getInitialState: function getInitialState() {
    return {
      siteDataPoints: []
    };
  },

  componentDidMount: function componentDidMount() {
    // get stream data
    var streamRequestURL = 'http://waterservices.usgs.gov/nwis/iv/?format=json';
    streamRequestURL += '&parameterCd=00010,00060,00065';
    streamRequestURL += '&site=' + _.pluck(this.props.sites, 'siteCode');

    $.get(streamRequestURL, (function (result) {
      var USGSResponseObj = result;
      var USGSTimeSeriesItems = USGSResponseObj.value.timeSeries;
      var riverDataPoints = [];
      USGSTimeSeriesItems.forEach(function (item) {
        riverDataPoints.push(USGS.simplify(item));
      });
      if (this.isMounted()) {
        this.setState({
          siteDataPoints: _.groupBy(riverDataPoints, function (site) {
            return site.siteCode;
          })
        });
      }
    }).bind(this));
  },
  render: function render() {
    var sites = [];
    var siteDataPoints = this.state.siteDataPoints;
    this.props.sites.forEach(function (site) {
      sites.push(React.createElement(SiteSummary, {
        siteDataPoints: siteDataPoints[site.siteCode],
        key: site.siteCode,
        site: site }));
    });
    var content = siteDataPoints ? { sites: sites } : React.createElement('img', { src: '/img/gps.gif' });
    return React.createElement(
      'div',
      { className: 'col-md-12', onClick: this._onClick },
      React.createElement(
        'h4',
        null,
        this.props.streamName
      ),
      React.createElement(
        'div',
        { className: "col-md-6" },
        React.createElement(
          'h5',
          null,
          'Fishing Reports'
        )
      ),
      React.createElement(
        'div',
        { className: "col-md-6" },
        React.createElement(
          'h5',
          null,
          'Sites'
        ),
        content
      )
    );
  },
  _onClick: function _onClick(event) {
    event.stopPropagation();
  }
});

module.exports = Stream;