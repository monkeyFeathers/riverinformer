var React = require("react");
var SiteStreamDataTable = require("./SiteStreamDataTable.react");
var SiteWeatherDataTable = require("./SiteWeatherDataTable.react");
var USGS = require("../usgs/USGS");
// var ForecastIo = require('forecastio');

// var forecastIo = new ForecastIo('6f1ee742351615e3829b743a9ab82407');


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
      if (this.isMounted()) {
        this.setState({
          siteName: riverDataPoints[0].siteName,
          riverDataPoints: riverDataPoints,
          geoLocation: riverDataPoints[0].geoLocation
        });
      }

    }.bind(this));
    // // get/ set weather data

    // $.get(streamRequestURL, function(result) {
    //   if (this.isMounted()){
    //     this.setState({
    //       weatherDataPoints:["weather", "looks", "good"]
    //     });
    //   }
    // }.bind(this));
  },
render: function(){
  return (
    <article className={"container col-md-6"}>
      <header className={"row"}>
        <h3>{this.state.siteName}</h3>
        <p>latitude:{this.state.geoLocation.latitude} by longitude:{this.state.geoLocation.longitude}</p>
      </header>
      <div className={'row stream-table'}>
        <SiteStreamDataTable siteName={this.state.siteName} 
        riverDataPoints={this.state.riverDataPoints} 
        geoLocation={this.state.geoLocation}
        tableTitle={'Stream Data'} />
      </div>
      <div className={'row weather-table'}>
        <SiteWeatherDataTable tableTitle={'Weather Data'} />
      </div>
    </article>
    );
}


});
module.exports = RiverSite;
