var React = require('react');

var MainNav = React.createClass({
  getInitialState: function() {
   return {clicked: false};
  },
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">River Informer</a>
          </div>


          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a href="#clackamas" onClick={this.handleClick.bind(this, 'clackamas')}>Clackamas</a></li>
              <li><a href="#sandy" onClick={this.handleClick.bind(this, 'sandy')}>Sandy</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  },
  handleClick: function(river) {
    this.setState({clicked: !this.state.clicked})
    this.props.selectRiver(river)
    console.log(river)
  }
});

module.exports = MainNav;