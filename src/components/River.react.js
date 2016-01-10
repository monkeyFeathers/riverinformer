var React = require('react');
var USGS = require('../usgs/helper');
var Site = require('./Site.react');

var River = React.createClass({

  getInitialState: function() {
    return {
      report: null,
      siteData: null,
    }
  },

  componentDidMount: function() {
    this.fetchRiverData(this.props.riverName)
    this.fetchRiverReport(this.props.riverName)
  },

  componentWillReceiveProps: function(nextProps) {
    this.fetchRiverData(nextProps.riverName)
    this.fetchRiverReport(this.props.riverName)
  },

  fetchRiverData: function(river){
    var siteCodes = {
      clackamas: '14210000',
      sandy: '14142500',
    };
    var USGS_BASE_URL = 'http://waterservices.usgs.gov/nwis/iv/?format=json&parameterCd=00060,00065,00010&period=P10D';
    var USGS_REQ_URL = USGS_BASE_URL + '&sites=' + siteCodes[river];

    $.get(USGS_REQ_URL, function(data) {
      if (this.isMounted()){
        this.setState({
          siteData: USGS.simplify(data),
        })
      }
    }.bind(this))
  },

  fetchRiverReport: function(river) {
    $.get('/report/'+river, function(data) {
      if (this.isMounted()){
        this.setState({
          report: data[0]
        })
      }
    }.bind(this))
  },

  render: function(){
    var report = null;
    var date = null;
    var species = null;
    var reportParagraphs = null;
    if (this.state.report) {
      report = this.state.report;
      date = report.date;
      species = report.species
      reportParagraphs  = report.report.map(function(grph, ind) {
        return <p key={ind+new Date().getTime()}>{grph}</p>
      })
    }
    return (
      <article>
        <div>
          <h3>{this.props.riverName} river</h3>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div>
                <h4>fishing report</h4>
                <div>
                  <h5>{date}</h5>
                  <h6>Species: {species}</h6>
                  {reportParagraphs}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <h4>site data and weather</h4>
                <div>
                  <Site chartData={this.state.siteData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }
});

module.exports = River;
