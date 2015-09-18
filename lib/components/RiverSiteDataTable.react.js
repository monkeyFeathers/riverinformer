'use strict';

var SiteDataRow = require('./SiteDataRow.react');
var React = require('react');

var RiverSiteDataTable = React.createClass({
  displayName: 'RiverSiteDataTable',

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