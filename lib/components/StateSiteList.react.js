'use strict';

var React = require('react');
var USGS = require('../usgs/USGS');
var _ = require('lodash');
var River = require('./River.react');
var Stream = require("./Stream.react");

var StateSiteList = React.createClass({
  displayName: 'StateSiteList',

  getInitialState: function getInitialState() {
    return {
      siteGroups: [],
      selectedRiverName: selectedRiverName
    };
  },

  componentDidMount: function componentDidMount() {
    // get all sites for specified US State and simplify
    // TODO: cache these sites and check for periodic updates
    var stateSitesRequestURL = 'http://waterservices.usgs.gov/nwis/iv/?format=json';
    stateSitesRequestURL += '&stateCd=or';

    $.get(stateSitesRequestURL, (function (result) {
      var USGSResponseObj = result;
      var USGSTimeSeriesItems = USGSResponseObj.value.timeSeries;
      var sites = [];
      USGSTimeSeriesItems.forEach(function (site) {
        sites.push(USGS.simplifySiteList(site));
      });
      sites = _.sortBy(_.unique(sites, 'siteCode'), 'siteName');

      _.forEach(sites, function (site) {
        var nameWords = site.siteName.split(" ");
        nameWords.forEach(function (nameFrag) {
          switch (nameFrag) {
            case 'CR':
              nameWords[nameWords.indexOf('CR')] = 'CREEK';
              break;
            case 'CRK':
              nameWords[nameWords.indexOf('CRK')] = 'CREEK';
              break;
            case 'FK':
              nameWords[nameWords.indexOf('FK')] = 'FORK';
              break;
            case 'MF':
              nameWords[nameWords.indexOf('MF')] = 'MIDDLE FORK';
              break;
            case 'N':
              nameWords[nameWords.indexOf('N')] = 'NORTH';
              break;
            case 'N.UMPQUA':
              nameWords[nameWords.indexOf('N.UMPQUA')] = 'NORTH UMPQUA';
              break;
            case 'NF':
              nameWords[nameWords.indexOf('NF')] = 'NORTH FORK';
              break;
            case 'NO':
              nameWords[nameWords.indexOf('NO')] = 'NORTH';
              break;
            case 'R':
              nameWords[nameWords.indexOf('R')] = 'RIVER';
              break;
            case 'SO':
              nameWords[nameWords.indexOf('SO')] = 'SOUTH';
              break;
          }
        });

        site.siteName = nameWords.join(" ");
      });

      sites = _.reject(sites, function (site) {
        return site.siteCode.length > 8;
      });
      var siteGroups = _.groupBy(sites, function (site) {
        return USGS.getOregonStreamName(site.siteName);
      });
      var sortedSiteGroupsKeys = _.keys(siteGroups).sort();
      var sortedSiteGroups = {};
      sortedSiteGroupsKeys.forEach(function (key) {
        sortedSiteGroups[key] = siteGroups[key];
      });

      if (this.isMounted()) {
        this.setState({
          siteGroups: sortedSiteGroups
        });
      }
    }).bind(this));
  },

  render: function render() {
    var content = this.state.riverSelected ? React.createElement(Stream, { streamName: this.state.selectedRiverName, sites: this.state.riverList[this.state.selectedRiverName] }) : React.createElement(StateStreamList, null);
    var streams = [];
    _.forEach(this.state.siteGroups, function (siteGroup, streamName) {
      streams.push(React.createElement(River, { siteGroup: siteGroup, streamName: streamName }));
    });
    return React.createElement(
      'div',
      { onClick: this.onClick },
      React.createElement(
        'ul',
        null,
        streams
      )
    );
  },
  onClick: function onClick(event) {
    this.setState({
      selectedRiverName: event.target.textContent
    });
  }
});

module.exports = StateSiteList;