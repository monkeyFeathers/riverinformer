'use strict';

var React = require('react');
var _ = require('lodash');
var USGS = require("../usgs/USGS");
var SiteSummary = require("./SiteSummary.react");
var FishingReport = require("./FishingReport.react");

var Stream = React.createClass({
  displayName: 'Stream',

  getInitialState: function getInitialState() {
    return {
      siteDataPoints: []
    };
  },

  componentDidMount: function componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
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
    var reportBodies = [];
    var streamName = this.props.streamName;
    var zones = this.props.reports;
    var streamNameFrags = streamName.split(" ");
    _.forEach(zones, function (reports, zone) {
      console.group(zone);
      _.forEach(reports, function (locationReport) {
        var matchCount = 0;
        console.log(streamName + " | " + locationReport.location);
        _.forEach(streamNameFrags, function (frag) {
          if (locationReport.location.match(RegExp(frag.toLowerCase(), 'i'))) {
            matchCount++;
          }
        });
        console.log(matchCount);
        if (matchCount / streamNameFrags.length == 1) {

          console.group("match condition met");
          console.log("reports prior:");
          console.log(reportBodies);
          reportBodies.push(locationReport);
          console.log('reports after:');
          console.log(reportBodies);
          console.log("location report:");
          console.log(locationReport);
          console.groupEnd();
        }
      });
      console.groupEnd();
    });

    var sites = [];
    var siteDataPoints = this.state.siteDataPoints;
    this.props.sites.forEach(function (site) {
      sites.push(React.createElement(SiteSummary, {
        siteDataPoints: siteDataPoints[site.siteCode],
        key: site.siteCode,
        site: site }));
    });
    var content = siteDataPoints ? { sites: sites } : React.createElement('img', { src: '/img/gps.gif' });
    var reportContent = _.map(reportBodies, function (report) {
      return React.createElement(FishingReport, { report: report });
    });
    return React.createElement(
      'div',
      { className: 'col-md-12', onClick: this._onClick },
      React.createElement(
        'h4',
        null,
        streamName
      ),
      React.createElement(
        'div',
        { className: "col-md-6" },
        React.createElement(
          'h5',
          null,
          'Fishing Reports'
        ),
        console.log(reportBodies),
        reportContent
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
  onBackButtonEvent: function onBackButtonEvent() {
    this._onClick();
  },
  _onClick: function _onClick(event) {
    event.stopPropagation();
  }
});

module.exports = Stream;