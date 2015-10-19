var React = require('react');
var Site = require('./RiverSite.react')
var River = React.createClass({
  getInitialState: function(){
    return {showList:false}
  },
  render: function() {
    var sites = [];
    this.props.siteGroup.forEach(function(site) {
      sites.push(<li><a href={'#'+site.siteCode}>{site.siteName} - {site.siteCode}</a></li>)
    });
    var showList = this.state.showList ? 'show' : 'hidden';
    return (
      <li><a href={'#'} onClick={this.onClick}>{this.props.streamName} -- {sites.length} {sites.length > 1 ? 'sites' : 'site'}</a>
        <ul className={showList}>
          {sites}
        </ul>
      </li>  
    )
  },
  onClick: function(event) {
    this.setState({showList: !this.state.showList});
    // event.stopPropagation();
    // this.props.onClick(this.props.streamName)
  }
  
});

module.exports = River;
