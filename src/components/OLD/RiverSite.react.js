var React = require("react");
var SiteStreamDataTable = require("./SiteStreamDataTable.react");
var SiteWeatherDataTable = require("./SiteWeatherDataTable.react");
var USGS = require("../usgs/USGS");
var odfwHelper = require("../odfw/helper");

var RiverSite = React.createClass({
  getInitialState: function() {
    return {
      siteName: '',
      riverDataPoints: [],
      geoLocation: {},
      weatherDataPoints: []
    };
  },

  componentDidMount: function() {
    // get stream data
    var streamRequestURL = 'http://waterservices.usgs.gov/nwis/iv/?format=json';
    streamRequestURL += '&parameterCd=00010,00060,00065'
    streamRequestURL += '&site=' + this.props.site;

    $.get(streamRequestURL, function(result) {
      var USGSResponseObj = result;
      var USGSTimeSeriesItems = USGSResponseObj.value.timeSeries;
      var riverDataPoints = []
      USGSTimeSeriesItems.forEach(function(item){
        riverDataPoints.push(USGS.simplify(item));
      });
      var zoneSites = riverDataPoints.map(function(val,ind,arry){
        var zone = "";
        return val.zone = zone; 
      })
      window.zoneSites = zoneSites;

      if (this.isMounted()) {
        this.setState({
          siteName: riverDataPoints[0].siteName,
          riverDataPoints: riverDataPoints,
          geoLocation: riverDataPoints[0].geoLocation
        });
      }

    }.bind(this));

  },
render: function(){
  return (
    <article className={"container col-md-12"}>
      <header className={"row"}>
        <h3>{this.state.siteName}</h3>
        <p>latitude: {this.state.geoLocation.latitude} by longitude: {this.state.geoLocation.longitude}</p>
      </header>
      <div className={'col-md-6'}>
        <h4>Fishing Reports</h4>
      </div>
      <div className={'col-md-6'}>
        <div className={'row stream-table'}>
          <SiteStreamDataTable siteName={this.state.siteName} 
          riverDataPoints={this.state.riverDataPoints} 
          geoLocation={this.state.geoLocation}
          tableTitle={'Stream Data'} />
        </div>
        <div className={'row weather-table'}>
          <SiteWeatherDataTable tableTitle={'Weather Data'} />
        </div>
      </div>
    </article>
    );
}


});
module.exports = RiverSite;
