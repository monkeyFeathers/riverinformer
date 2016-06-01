import React from 'react';
import Chart from './Chart.react';

export default class Site extends React.Component {
  render() {
    var charts = null;
    var siteName = null;

    if (this.props.chartData) {
      siteName =  this.props.chartData.siteName;
      charts = this.props.chartData.parameters.map(function(param, ind) {
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
}
