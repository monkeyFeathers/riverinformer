var React = require('react');
var DataRow = require('./DataRow.react');

var SiteWeatherDataTable = React.createClass({
  getInitialState: function() {
    return {
      weatherDataPoints: []
    };
  },

  componentDidMount: function() {

   // get/ set weather data
    $.get('/weather', function(result) {
      if (this.isMounted()){
        this.setState({
          weatherDataPoints: [{label:"Pressure", value:result.currently.pressure, units:"millibars", timeStamp:result.currently.time},
          {label:"Temperature", value:result.currently.temperature, units:"°F",timeStamp:result.currently.time},
          {label:"Wind Bearing",value:result.currently.windBearing, units:"°", timeStamp:result.currently.time}, 
          {label:"Wind Speed", value:result.currently.windSpeed, units:"mph",timeStamp:result.currently.time}
          ]
        });
      }
    }.bind(this));
  },
  render: function(){
    var rows = []
    console.log(this.state.weatherDataPoints);
    this.state.weatherDataPoints.forEach(function(dataPoint){
      rows.push(<DataRow dataPoint={dataPoint}/>)
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
});

module.exports = SiteWeatherDataTable;
