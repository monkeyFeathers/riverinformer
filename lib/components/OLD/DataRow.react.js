var React = require('react');

var DataRow = React.createClass({
  displayName: 'DataRow',

  render: function () {
    var label = this.props.dataPoint.label;
    var value = this.props.dataPoint.value;
    var units = this.props.dataPoint.units;
    var timeStamp = new Date(this.props.dataPoint.timeStamp * 1000);
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
        value,
        ' ',
        units
      ),
      React.createElement(
        'td',
        null,
        timeStamp.toISOString()
      )
    );
  }
});

module.exports = DataRow;