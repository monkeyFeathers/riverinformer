var React = require('react');

var DataRow = React.createClass({
  render: function(){
    var label = this.props.dataPoint.label;
    var value = this.props.dataPoint.value;
    var units = this.props.dataPoint.units;
    var timeStamp = new Date(this.props.dataPoint.timeStamp*1000);
    return (
      <tr>
        <td>{label}:</td>
        <td>{value} {units}</td>
        <td>{timeStamp.toISOString()}</td>
      </tr>
    );
  }
})

module.exports = DataRow;
