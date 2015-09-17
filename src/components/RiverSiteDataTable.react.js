var SiteDataRow = require('./SiteDataRow.react');
var React = require('react');
// var USGS= require("../usgs/USGS");

var RiverSiteDataTable = React.createClass({
  //   getInitialState: function() {
  //     return {
  //       siteName: '',
  //       riverDataPoints: [],
  //       geoLocation: {}
  //     };
  //   },

  // componentDidMount: function() {
  //   var streamRequestURL = 'http://waterservices.usgs.gov/nwis/iv/?format=json';
  //   streamRequestURL += '&parameterCd=00010,00060,00065'
  //   streamRequestURL += '&site=' + this.props.site;

  //   $.get(streamRequestURL, function(result) {
  //     var USGSResponseObj = result;
  //     var USGSTimeSeriesItems = USGSResponseObj.value.timeSeries;
  //     var riverDataPoints = []
  //     USGSTimeSeriesItems.forEach(function(item){
  //       riverDataPoints.push(USGS.simplify(item));
  //     })
  //     if (this.isMounted()) {
  //       this.setState({
  //         siteName: riverDataPoints[0].siteName,
  //         riverDataPoints: riverDataPoints,
  //         geoLocation: riverDataPoints[0].geoLocation
  //       });
  //     }
  //   }.bind(this));
  // },
  render: function(){
    var rows = []
    this.props.riverDataPoints.forEach(function(dataPoint){

      rows.push(<SiteDataRow riverDataPoint={dataPoint}/>)
    });
    return (
      <div className={"col-md-6"}>
        <h3>{this.props.siteName}</h3>
        <table className={"table"}>
          <thead>
            <tr>
              <th>Data type</th><th>Value</th><th>Time Collected</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <p>Site at longitude:{this.props.geoLocation.longitude} by latitude:{this.props.geoLocation.latitude}</p>
      </div>

    );
  }
})



module.exports = RiverSiteDataTable;
