var React = require('react');
var _ = require('lodash');
var USGS = require("../usgs/USGS");
var SiteSummary = require("./SiteSummary.react")

var Stream = React.createClass({
  getInitialState: function() {
    return {
      siteDataPoints: []
    };
  },

  componentDidMount: function() {
    // get stream data
    var streamRequestURL = 'http://waterservices.usgs.gov/nwis/iv/?format=json';
    streamRequestURL += '&parameterCd=00010,00060,00065'
    streamRequestURL += '&site=' + _.pluck(this.props.sites,'siteCode');

    $.get(streamRequestURL, function(result) {
      var USGSResponseObj = result;
      var USGSTimeSeriesItems = USGSResponseObj.value.timeSeries;
      var riverDataPoints = []
      USGSTimeSeriesItems.forEach(function(item){
        riverDataPoints.push(USGS.simplify(item));
      });
      if (this.isMounted()) {
        this.setState({
          siteDataPoints: _.groupBy(riverDataPoints, function(site){
            return site.siteCode
          })
        });
      }

    }.bind(this));

  },
  render: function(){
    var sites = [];
    var siteDataPoints = this.state.siteDataPoints
    this.props.sites.forEach(function(site){
      sites.push(<SiteSummary 
                  siteDataPoints={siteDataPoints[site.siteCode]} 
                  key={site.siteCode}
                  site={site}/>)
    })
    var content = siteDataPoints ? {sites} : <img src="/img/gps.gif" />;
    return (
      <div className={'col-md-12'} onClick={this._onClick}>
        <h4>{this.props.streamName}</h4>
        <div className={"col-md-6"}>
          <h5>Fishing Reports</h5>

        </div>
        <div className={"col-md-6"} >
          <h5>Sites</h5>
          {content}
        </div>
      </div>

    );
  },
  _onClick: function (event){
    event.stopPropagation();
  }
});

module.exports = Stream
