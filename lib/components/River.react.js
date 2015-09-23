'use strict';

var React = require('react');
var Site = require('./RiverSite.react');
var River = React.createClass({
  displayName: 'River',

  getInitialState: function getInitialState() {
    return { showList: false };
  },
  render: function render() {
    var sites = [];
    this.props.siteGroup.forEach(function (site) {
      sites.push(React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: '#' + site.siteCode },
          site.siteName,
          ' - ',
          site.siteCode
        )
      ));
    });
    var showList = this.state.showList ? 'show' : 'hidden';
    return React.createElement(
      'li',
      null,
      React.createElement(
        'a',
        { href: '#', onClick: this.onClick },
        this.props.streamName,
        ' -- ',
        sites.length,
        ' ',
        sites.length > 1 ? 'sites' : 'site'
      ),
      React.createElement(
        'ul',
        { className: showList },
        sites
      )
    );
  },
  onClick: function onClick(event) {
    this.setState({ showList: !this.state.showList });
    // event.stopPropagation();
    // this.props.onClick(this.props.streamName)
  }

});

module.exports = River;