var React = require('react');
var MainNav = require('./MainNav.react');
var River = require('./River.react');

var RI_App = React.createClass({

  getInitialState: function() {
    return {
      route: window.location.hash.substr(1),
    }
  },

  componentWillMount: function() {
    if (!window.location.hash) window.location.hash = '#clackamas'
  },

  componentDidMount: function() {
    window.addEventListener('hashchange', function() {
      this.setState({
        route: window.location.hash.substr(1)
      })
    }.bind(this))
  },

  render: function() {
    return (
      <section>
        <MainNav selectRiver={this.setRiver}/>
        <River riverName={this.state.route} siteData={this.state.siteData}/>
      </section>
    );
  }

});

module.exports = RI_App;
