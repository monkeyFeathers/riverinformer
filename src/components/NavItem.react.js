import React from 'react';

export default class NavItem extends React.Component {
  constructor(props) {
   super(props);
   this.state = {active: this.setActive()};
 }
  componentDidMount() {
    window.addEventListener('hashchange', function() {
      this.setState({
        active: this.setActive()
      });
    }.bind(this))
  }

  render(){
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
  }

  setActive() {
    if (window.location.hash.substr(1) === this.props.river) return true
    return false
  }
}
