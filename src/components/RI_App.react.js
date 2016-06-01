import React from 'react';
import MainNav from './MainNav.react';
import River from'./River.react';

class RI_App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {route: window.location.hash.substr(1)}
  }

  componentWillMount() {
  }

  componentDidMount() {
    window.addEventListener('hashchange', function() {
      this.setState({
        route: window.location.hash.substr(1)
      })
    }.bind(this))
    if (!window.location.hash) window.location.hash = '#clackamas'
  }

  render() {
    return (
      <section>
        <MainNav selectRiver={this.setRiver}/>
        <River riverName={this.state.route} siteData={this.state.siteData}/>
      </section>
    );
  }
}
module.exports = RI_App;
