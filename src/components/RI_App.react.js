var React = require('react');
var RiverSite = require('./RiverSite.react');
var USState = require('./USState.react');
var Stream = require("./Stream.react")
var FishingReport = require("./FishingReport.react")
var RI_App = React.createClass({

  render: function() {
    
  return (
      <USState usState={'or'}/>
    );
  },
});

module.exports = RI_App;  
