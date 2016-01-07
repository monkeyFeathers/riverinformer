var React = require('react');

var River = React.createClass({
  displayName: 'River',

  getInitialState: function () {
    return {
      report: '',
      siteData: null
    };
  },
  componentDidMount: function () {
    var siteCodes = {
      clackamas: '14210000',
      sandy: '14142500'
    };
    var USGS_BASE_URL = 'http://waterservices.usgs.gov/nwis/iv/?format=json&parameterCd=00060,00065';
    var USGS_REQ_URL = USGS_BASE_URL + '&sites=' + siteCodes[this.props.riverName];

    $.when($.get(stateSitesRequestURL), $.get('/report')).done((function (sites, reports) {}).bind(this));
  },
  render: function () {
    return React.createElement(
      'article',
      null,
      React.createElement(
        'div',
        null,
        React.createElement(
          'h3',
          null,
          this.props.riverName,
          ' river'
        )
      ),
      React.createElement(
        'div',
        { className: 'container-fluid' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-md-6' },
            React.createElement(
              'div',
              null,
              React.createElement(
                'h4',
                null,
                'fishing report'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'col-md-6' },
            React.createElement(
              'div',
              null,
              React.createElement(
                'h4',
                null,
                'site data and weather'
              )
            )
          )
        )
      )
    );
  }
});

module.exports = River;