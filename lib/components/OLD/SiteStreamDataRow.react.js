'use strict';

var React = require('react');

var SiteStreamDataRow = React.createClass({
  displayName: 'SiteStreamDataRow',

  render: function render() {
    var units;
    var label;
    switch (this.props.riverDataPoint.units.split(',')[0]) {
      case 'Temperature':
        label = 'Water Temperature';
        units = this.props.riverDataPoint.units.split(',')[2];
        break;
      case 'Streamflow':
        label = 'Streamflow';
        units = this.props.riverDataPoint.units.split(',')[1];
      default:
        label = this.props.riverDataPoint.units.split(',')[0];
        units = this.props.riverDataPoint.units.split(',')[1];
    }
    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        null,
        label,
        ':'
      ),
      React.createElement(
        'td',
        null,
        this.props.riverDataPoint.value,
        ' ',
        units
      ),
      React.createElement(
        'td',
        null,
        this.props.riverDataPoint.dateTime
      )
    );
  }
});

module.exports = SiteStreamDataRow;