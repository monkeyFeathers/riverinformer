var React = require('react');
var MainNav = require('./MainNav.react');
var River = require('./River.react');


var RI_App = React.createClass({
  getInitialState: function() {
    return {river: 'clackamas'}
  },
  render: function() {
    return (
      <section>
        <MainNav selectRiver={this.setRiver}/>
        <River riverName={this.state.river} />
      </section>

    );
  },
  setRiver: function(river) {
    this.setState({river: river})
    console.log(river + ' passed to app')
  }


});

module.exports = RI_App;
