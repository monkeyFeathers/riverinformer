import React from 'react';

export default class FishingReport extends React.Component {
  render() {
    var report = this.props.report;
    return(
      <div>
        <h4>{report.location} <small>{report.date}</small></h4>
        <h6>{report.species}</h6>
        {report.report.map(function(rep){
          return <p>{rep}</p>
        })}
      </div>
    )
  }
}
