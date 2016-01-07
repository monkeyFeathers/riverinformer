var React = require('react');

var MainNav = React.createClass({
  displayName: 'MainNav',

  getInitialState: function () {
    return { clicked: false };
  },

  render: function () {
    var rivers = ['clackamas', 'sandy'];

    var riverSelectors = rivers.map(function (river) {
      var defaultActive = '';
      if (river === 'clackamas') defaultActive = 'active';
      return React.createElement(
        'li',
        { className: defaultActive },
        React.createElement(
          'a',
          { href: '#' + river, className: 'river-selector', 'data-river-name': river, onClick: this.handleClick.bind(this, river) },
          river
        )
      );
    }, this);

    return React.createElement(
      'nav',
      { className: 'navbar navbar-default' },
      React.createElement(
        'div',
        { className: 'container-fluid' },
        React.createElement(
          'div',
          { className: 'navbar-header' },
          React.createElement(
            'button',
            { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#bs-example-navbar-collapse-1', 'aria-expanded': 'false' },
            React.createElement(
              'span',
              { className: 'sr-only' },
              'Toggle navigation'
            ),
            React.createElement('span', { className: 'icon-bar' }),
            React.createElement('span', { className: 'icon-bar' }),
            React.createElement('span', { className: 'icon-bar' })
          ),
          React.createElement(
            'a',
            { className: 'navbar-brand', href: '#' },
            'River Informer'
          )
        ),
        React.createElement(
          'div',
          { className: 'collapse navbar-collapse', id: 'bs-example-navbar-collapse-1' },
          React.createElement(
            'ul',
            { className: 'nav navbar-nav' },
            riverSelectors
          )
        )
      )
    );
  },

  handleClick: function (river) {
    this.setState({ clicked: !this.state.clicked });
    this.props.selectRiver(river);
    var rivSels = document.getElementsByClassName('river-selector');
    for (var i = 0; i < rivSels.length; i++) {
      if (rivSels[i].getAttribute('data-river-name') === river) {
        rivSels[i].parentElement.classList.add('active');
      } else {
        rivSels[i].parentElement.classList.remove('active');
      }
    }
  }
});

module.exports = MainNav;