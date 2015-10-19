var React = require('react');
var _ = require('lodash');
var USGS = require("../usgs/USGS");
var SiteSummary = require("./SiteSummary.react")
var FishingReport = require("./FishingReport.react")

var Stream = React.createClass({
  getInitialState: function() {
    return {
      siteDataPoints: []
    };
  },

  componentDidMount: function() {
    window.onpopstate = this.onBackButtonEvent
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
    var reportBodies = [];
    var streamName = this.props.streamName
    var zones = this.props.reports;
    var streamNameFrags = streamName.split(" ");
    _.forEach(zones, function(reports, zone){
      _.forEach(reports, function(locationReport){
        var matchCount = 0;
        _.forEach(streamNameFrags, function(frag){
          if (locationReport.location.match(RegExp(frag.toLowerCase(), 'i'))) {
            matchCount ++;
          }
        })
        if (matchCount/streamNameFrags.length == 1) {
          reportBodies.push(locationReport)
        }
      })
    })

    var sites = [];
    var siteDataPoints = this.state.siteDataPoints
    this.props.sites.forEach(function(site){
      sites.push(<SiteSummary 
                  siteDataPoints={siteDataPoints[site.siteCode]} 
                  key={site.siteCode}
                  site={site}/>)
    })
    var content = siteDataPoints ? {sites} : <img src="/img/gps.gif" />;
    var reportContent = _.map(reportBodies, function(report){
      return(<FishingReport report={report}/>)
    })
    return (
      <div onClick={this._onClick}>
        <h4>{streamName}</h4>
        <div className="row">
          <div className={"col-md-6"}>
            <h5>Fishing Reports</h5>
            {reportContent}
          </div>
          <div className={"col-md-6"} >
            <h5>Sites</h5>
            {content}
          </div>
        </div>
      </div>

    );
  },
  onBackButtonEvent: function(){
    this._onClick();
  },
  _onClick: function (event){
    event.stopPropagation();
  }
});

module.exports = Stream
