var React = require('react');
var SitePicker = React.createClass({
  displayName: 'SitePicker',

  getInitialState: function () {
    return { value: 'B' };
  },
  handleSubmit: function (event) {
    //this.setState({value: event.target.value});
    console.log('submit event');
    event.preventDefault();
  },
  handleChange: function (event) {
    this.setState({ value: event.target.value });
    console.log(event.target);
  },
  //
  render: function () {

    var value = this.state.value;
    return React.createElement(
      'form',
      { className: 'form', onSubmit: this.handleSubmit },
      React.createElement(
        'select',
        { value: value, onChange: this.handleChange },
        React.createElement(
          'option',
          { value: 'A' },
          'Apple'
        ),
        React.createElement(
          'option',
          { value: 'B' },
          'Banana'
        ),
        React.createElement(
          'option',
          { value: 'C' },
          'Cranberry'
        )
      ),
      React.createElement('input', { type: 'submit', value: value })
    );
  }

});

module.exports = SitePicker;