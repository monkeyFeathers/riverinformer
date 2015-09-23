'use strict';

var React = require('react');

var FishingReport = React.createClass({
  displayName: 'FishingReport',

  getInitialState: function getInitialState() {
    return { report: {} };
  },
  componentDidMount: function componentDidMount() {

    var reportURL = "http://www.dfw.state.or.us/rr/willamette/";
    $.get(reportURL, (function (result) {

      if (this.isMounted()) {
        this.setState({
          report: ''
        });
      }
    }).bind(this));
  },

  render: function render() {}

});

module.exports = FishingReport;