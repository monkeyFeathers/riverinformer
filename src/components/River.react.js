var React = require('react');

var River = React.createClass({
  getInitialState: function() {
    return {
      report:'',
      siteData: null,
    }
  },
  componentDidMount: function() {
    var siteCodes = {
      clackamas: '14210000',
      sandy: '14142500',
    };
    var USGS_BASE_URL = 'http://waterservices.usgs.gov/nwis/iv/?format=json&parameterCd=00060,00065';
    var USGS_REQ_URL = USGS_BASE_URL + '&sites=' + siteCodes[this.props.riverName];

    $.when($.get(stateSitesRequestURL), $.get('/report')).done(function(sites, reports) {}.bind(this))

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
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <h4>site data and weather</h4>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }
});

module.exports = River;
