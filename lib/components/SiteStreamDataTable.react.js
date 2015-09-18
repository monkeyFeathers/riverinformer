'use strict';

var SiteStreamDataRow = require('./SiteStreamDataRow.react');
var React = require('react');

var SiteStreamDataTable = React.createClass({
  displayName: 'SiteStreamDataTable',

  render: function render() {
    var rows = [];
    this.props.riverDataPoints.forEach(function (dataPoint) {

      rows.push(React.createElement(SiteStreamDataRow, { riverDataPoint: dataPoint }));
    });
    return React.createElement(
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
            { colSpan: 3 },
            this.props.tableTitle
          )
        )
      ),
      React.createElement(
        'tbody',
        null,
        rows
      )
    );
  }
});

module.exports = SiteStreamDataTable;