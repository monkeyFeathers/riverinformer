var React = require('react');

var FishingReport = React.createClass({


  render: function() {
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

});

module.exports = FishingReport;
