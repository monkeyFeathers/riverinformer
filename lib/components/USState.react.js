'use strict';

var React = require('react');
var USGS = require('../usgs/USGS');
var _ = require('lodash');
var River = require('./River.react');
var Stream = require("./Stream.react");
var StreamList = require("./StreamList.react");

var USState = React.createClass({
  displayName: 'USState',

  getInitialState: function getInitialState() {
    return {
      siteGroups: {},
      selectedRiverName: '',
      siteGroupNames: [],
      reports: {}
    };
  },

  componentDidMount: function componentDidMount() {
    // get all sites for specified US State and simplify
    // TODO: cache these sites and check for periodic updates
    var stateSitesRequestURL = 'http://waterservices.usgs.gov/nwis/iv/?format=json';
    stateSitesRequestURL += '&siteType=ST&stateCd=' + this.props.usState;

    $.when($.get(stateSitesRequestURL), $.get('/report')).done((function (sites, reports) {

      // TODO: New interface for USGS
      // TODO: Move all USGS formatting to the module
      var USGSResponseObj = sites[0];
      var USGSTimeSeriesItems = USGSResponseObj.value.timeSeries;

      var sites = [];
      USGSTimeSeriesItems.forEach(function (site) {
        sites.push(USGS.simplifySiteList(site));
      });

      sites = USGS.cleanSiteNames(sites);

      var siteGroups = _.groupBy(sites, function (site) {
        return USGS.getStreamName(site.siteName);
      });
      var sortedSiteGroupsKeys = _.keys(siteGroups).sort();
      var sortedSiteGroups = {};
      sortedSiteGroupsKeys.forEach(function (key) {
        sortedSiteGroups[key] = siteGroups[key];
      });

      if (this.isMounted()) {
        this.setState({
          siteGroups: sortedSiteGroups,
          siteGroupNames: _.keys(siteGroups),
          reports: reports[0]
        });
      }
    }).bind(this));
  },

  render: function render() {
    window.siteGroupNames = this.state.siteGroupNames;
    window._ = _;
    if (this.state.selectedRiverName) {
      var content = React.createElement(Stream, {
        streamName: this.state.selectedRiverName,
        sites: this.state.siteGroups[this.state.selectedRiverName],
        reports: this.state.reports });
      var breadCrumb = React.createElement(
        'em',
        null,
        React.createElement(
          'a',
          { href: '#', id: 'breadCrumb' },
          'All Oregon'
        )
      );
    } else {
      var content = React.createElement(StreamList, { list: this.state.siteGroupNames });
      var breadCrumb = "";
    }

    return React.createElement(
      'article',
      { onClick: this.onClick },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col-md-12' },
          breadCrumb
        )
      ),
      content
    );
  },
  onClick: function onClick(event) {
    if (event.target.hasAttribute('id', 'breadCrumb')) {
      this.setState({
        selectedRiverName: ''
      });
    } else {
      this.setState({
        selectedRiverName: event.target.textContent
      });
    }
  }
});

module.exports = USState;