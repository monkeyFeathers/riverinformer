var React = require('react');
var _ = require("lodash");

var SiteSummary = React.createClass({
  displayName: 'SiteSummary',

  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'p',
        null,
        React.createElement(
          'em',
          null,
          this.props.site.siteName
        )
      ),
      React.createElement(
        'p',
        null,
        React.createElement(
          'small',
          null,
          _.map(this.props.siteDataPoints, function (metric) {
            return metric.formattedData.label + ' ' + String.fromCharCode(8212) + ' ' + metric.formattedData.value;
          }).join(" | ")
        )
      )
    );
  }

});
module.exports = SiteSummary;