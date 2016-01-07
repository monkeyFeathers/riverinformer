var React = require('react');
var MainNav = require('./MainNav.react')


var RI_App = React.createClass({

  render: function() {
    return (
      <div>
        <h1>Hello</h1>
        <MainNav />
      </div>

    );
  },
});

module.exports = RI_App;
