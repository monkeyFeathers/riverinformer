var React = require('react');
var MainNav = require('./MainNav.react');

var RI_App = React.createClass({
  displayName: 'RI_App',

  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Hello'
      ),
      React.createElement(MainNav, null)
    );
  }
});

module.exports = RI_App;