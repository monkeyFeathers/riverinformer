var React = require('react');
var Chart = require('./Chart.react')

var Site = React.createClass({
  render: function() {
    var charts = null;
    var siteName = null;

    if (this.props.chartData) {
      siteName =  this.props.chartData.siteName;
      charts = this.props.chartData.parameters.map(function(param, ind) {
      //  console.log(param)
        return <Chart dataSet={param} key={ind + new Date().getTime()}/>
      })
    }
    return(
      <div>
        <h5>{siteName}</h5>
        {charts}
      </div>
    )
  }
});

module.exports = Site;
