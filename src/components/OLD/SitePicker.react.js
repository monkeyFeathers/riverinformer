var React = require('react');
var SitePicker = React.createClass({


  getInitialState: function() {
    return {value: 'B'};
  },
  handleSubmit: function(event) {
    //this.setState({value: event.target.value});
    console.log('submit event');
    event.preventDefault();
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
    console.log(event.target);
  },
    //
  render: function(){
    
    var value = this.state.value
    return (

      <form className="form" onSubmit={this.handleSubmit}>
        <select value={value} onChange={this.handleChange}>
          <option value="A">Apple</option>
          <option value="B">Banana</option>
          <option value="C">Cranberry</option>
        </select>
        <input type="submit" value={value}></input>
      </form>

    );
  },

});

module.exports = SitePicker;
