var React = require('react');

var NavItem = React.createClass({
  getInitialState: function() {
    return {active: this.setActive()}
  },

  componentDidMount: function() {
    window.addEventListener('hashchange', function() {
      this.setState({
        active: this.setActive()
      });
    }.bind(this))
  },

  render: function(){
    var river = this.props.river;
    return (
      <li className={this.state.active ? 'active': ''}>
        <a href={'#' + river}
          className="river-selector"
          data-river-name={river}>
          {river}
        </a>
      </li>
    )
  },
  
  setActive: function() {
    if (window.location.hash.substr(1) === this.props.river) return true
    return false
  }
});

module.exports = NavItem
