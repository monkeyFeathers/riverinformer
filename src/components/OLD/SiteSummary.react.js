var React = require('react');
var _ = require("lodash");

var SiteSummary = React.createClass({
  render: function(){
    return (
      <div>
        <p><em>{this.props.site.siteName}</em></p>
        <p><small>{_.map(this.props.siteDataPoints, function(metric){
          return metric.formattedData.label+' '+ String.fromCharCode(8212) +' '+ metric.formattedData.value;
        }).join(" | ")}</small></p>
      </div>
    )
  }

})
module.exports = SiteSummary;
