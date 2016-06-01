import React from 'react';
import ChartistGraph from 'react-chartist';
import _ from 'lodash';

export default class Chart extends React.Component {
  render(){
    var data = this.props.dataSet;

    var dayGroups = _.groupBy(data.data, function(datum) {
      return datum.date
    });

    var filteredDataSet = _.chain(dayGroups).map(function(dayGroup) {
      return _.filter(dayGroup, function(reading) {
        var midnight = '00:00:00.000';
        var noon = '12:00:00.000';
        var time = reading.time;
        if (reading.time.match(midnight) || reading.time.match(noon)) return reading;
      })
    })
    .filter(function(set) { return set.length > 0 })
    .map(function(set) {
      return set.reduce(function(a,b ) {
        return {date: a.date, value: (Number(a.value) + Number(b.value))/2}
      })
    }).flatten().value()

    var simpleLineChartData = {
      labels: filteredDataSet.map(function(set) { return set.date }),
      series: [filteredDataSet.map(function(set) { return set.value } )]
    }
    return (
      <div>
        <h6>{data.description} -- {data.units}:</h6>
        <ChartistGraph data={simpleLineChartData} type={'Line'} options={{showPoint: false}}/>
      </div>
    )
  }
}
