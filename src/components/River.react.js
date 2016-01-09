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
  },

  componentWillReceiveProps: function(nextProps) {
    this.fetchRiverData(nextProps.riverName)
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

  render: function(){

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
                  {this.state.report}
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
