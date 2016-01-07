var React = require('react');
var DataRow = require('./DataRow.react');

var SiteWeatherDataTable = React.createClass({
  displayName: 'SiteWeatherDataTable',

  getInitialState: function () {
    return {
      weatherDataPoints: []
    };
  },

  componentDidMount: function () {

    // get/ set weather data
    $.get('/weather', (function (result) {
      if (this.isMounted()) {
        this.setState({
          weatherDataPoints: [{ label: "Pressure", value: result.currently.pressure, units: "millibars", timeStamp: result.currently.time }, { label: "Temperature", value: result.currently.temperature, units: "°F", timeStamp: result.currently.time }, { label: "Wind Bearing", value: result.currently.windBearing, units: "°", timeStamp: result.currently.time }, { label: "Wind Speed", value: result.currently.windSpeed, units: "mph", timeStamp: result.currently.time }]
        });
      }
    }).bind(this));
  },
  render: function () {
    var rows = [];
    console.log(this.state.weatherDataPoints);
    this.state.weatherDataPoints.forEach(function (dataPoint) {
      rows.push(React.createElement(DataRow, { dataPoint: dataPoint }));
    });
    return React.createElement(
      'table',
      { className: "table" },
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            { colSpan: 3 },
            this.props.tableTitle
          )
        )
      ),
      React.createElement(
        'tbody',
        null,
        rows
      )
    );
  }
});

module.exports = SiteWeatherDataTable;