var React = require('react');
var ChartistGraph = require('react-chartist')

var Chart = React.createClass({

  render: function(){
    var data = this.props.dataSet
    var simpleLineChartData = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6]
      ]
    }
    return (
      <div>
        <h6>{data.description}:</h6>
        <ChartistGraph data={simpleLineChartData} type={'Line'} />
      </div>
    )
  }
});

module.exports = Chart;
