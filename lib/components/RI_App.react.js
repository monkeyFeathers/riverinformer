var React = require('react');
var MainNav = require('./MainNav.react');
var River = require('./River.react');

var RI_App = React.createClass({
  displayName: 'RI_App',

  getInitialState: function () {
    return { river: 'clackamas' };
  },
  render: function () {
    return React.createElement(
      'section',
      null,
      React.createElement(MainNav, { selectRiver: this.setRiver }),
      React.createElement(River, { riverName: this.state.river })
    );
  },
  setRiver: function (river) {
    this.setState({ river: river });
    console.log(river + ' passed to app');
  }

});

module.exports = RI_App;