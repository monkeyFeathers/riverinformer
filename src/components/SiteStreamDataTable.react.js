var SiteStreamDataRow = require('./SiteStreamDataRow.react');
var React = require('react');


var SiteStreamDataTable = React.createClass({

  render: function(){
    var rows = []
    this.props.riverDataPoints.forEach(function(dataPoint){

      rows.push(<SiteStreamDataRow riverDataPoint={dataPoint}/>)
    });
    return (
        <table className={"table"}>
          <thead>
            <tr>
              <th colSpan={3}>{this.props.tableTitle}</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
    );
  }
})



module.exports = SiteStreamDataTable;
