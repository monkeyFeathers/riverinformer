var React = require('react');

var FishingReport = React.createClass({
  displayName: 'FishingReport',

  render: function () {
    var report = this.props.report;
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h4',
        null,
        report.location,
        ' ',
        React.createElement(
          'small',
          null,
          report.date
        )
      ),
      React.createElement(
        'h6',
        null,
        report.species
      ),
      report.report.map(function (rep) {
        return React.createElement(
          'p',
          null,
          rep
        );
      })
    );
  }

});

module.exports = FishingReport;