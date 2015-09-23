var React = require('react');

var FishingReport = React.createClass({
  getInitialState: function(){
    return {report:{}}
  },
  componentDidMount: function(){
    
    var reportURL = "http://www.dfw.state.or.us/rr/willamette/"
    $.get(reportURL, function(result){

      if (this.isMounted()){
        this.setState({
          report: ''
        });
      }

    }.bind(this));
  },

  render: function() {

  }

});

module.exports = FishingReport
