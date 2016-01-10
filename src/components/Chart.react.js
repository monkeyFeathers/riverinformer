var React = require('react');
var ChartistGraph = require('react-chartist');
var _ = require('lodash');

var Chart = React.createClass({

  render: function(){
    var data = this.props.dataSet;

    var dayGroups = _.groupBy(data.data, function(datum) {
      return datum.date
    });

    var filteredDataSet = _.chain(dayGroups).map(function(dayGroup) {
      return _.filter(dayGroup, function(reading) {
        var midnight = '00:00:00.000-08:00';
        var noon = '12:00:00.000-08:00';
        var time = reading.time;
        if (reading.time === midnight || reading.time === noon) return reading;
      })
    }).filter(function(set) { return set.length > 0 }).flatten().value()

    var labeledDataSet = filteredDataSet.map(function(set) {
      set.label = (set.time === '00:00:00.000-08:00') ? set.date + ' - midnight': set.date + ' - noon'
      return set
    });

    var simpleLineChartData = {
      labels: labeledDataSet.map(function(set) { return set.label }),
      series: [labeledDataSet.map(function(set) { return set.value } )]
    }
    return (
      <div>
        <h6>{data.description} -- {data.units}:</h6>
        <ChartistGraph data={simpleLineChartData} type={'Line'} options={{showPoint: false}}/>
      </div>
    )
  }
});

module.exports = Chart;
