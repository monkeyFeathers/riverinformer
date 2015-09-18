var React = require('react');

var SiteStreamDataRow = React.createClass({
  render: function(){
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
        units = this.props.riverDataPoint.units.split(',')[1]
    }
    return (
      <tr>
        <td>{label}:</td>
        <td>{this.props.riverDataPoint.value} {units}</td>
        <td>{this.props.riverDataPoint.dateTime}</td>
      </tr>
    );
  }
})

module.exports = SiteStreamDataRow;
