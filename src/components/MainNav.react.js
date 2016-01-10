var React = require('react');

var MainNav = React.createClass({

  getInitialState: function() {
   return {clicked: false};
  },

  render: function() {
    var rivers = ['clackamas', 'sandy'];

    var riverSelectors = rivers.map(function(river) {
      var defaultActive = '';
      if (river === 'clackamas') defaultActive = 'active'
      return <li className={defaultActive}><a href={'#'+river} className="river-selector" data-river-name={river} onClick={this.handleClick.bind(this, river)}>{river}</a></li>
    }, this);

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
              {riverSelectors}
            </ul>
          </div>
        </div>
      </nav>
    );
  },

  handleClick: function(river) {
    this.setState({clicked: !this.state.clicked})
    this.props.selectRiver(river)
    var rivSels = document.getElementsByClassName('river-selector')
    for (var i = 0; i < rivSels.length; i++){
      if (rivSels[i].getAttribute('data-river-name') === river) {
        rivSels[i].parentElement.classList.add('active');
      } else {
        rivSels[i].parentElement.classList.remove('active');
      }
    }
  }
});

module.exports = MainNav;
