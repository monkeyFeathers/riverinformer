var React = require('react');

var MainNav = React.createClass({
  displayName: "MainNav",

  getInitialState: function () {
    return { clicked: false };
  },
  render: function () {
    return React.createElement(
      "nav",
      { className: "navbar navbar-default" },
      React.createElement(
        "div",
        { className: "container-fluid" },
        React.createElement(
          "div",
          { className: "navbar-header" },
          React.createElement(
            "button",
            { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1", "aria-expanded": "false" },
            React.createElement(
              "span",
              { className: "sr-only" },
              "Toggle navigation"
            ),
            React.createElement("span", { className: "icon-bar" }),
            React.createElement("span", { className: "icon-bar" }),
            React.createElement("span", { className: "icon-bar" })
          ),
          React.createElement(
            "a",
            { className: "navbar-brand", href: "#" },
            "River Informer"
          )
        ),
        React.createElement(
          "div",
          { className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1" },
          React.createElement(
            "ul",
            { className: "nav navbar-nav" },
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { href: "#clackamas", onClick: this.handleClick.bind(this, 'clackamas') },
                "Clackamas"
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { href: "#sandy", onClick: this.handleClick.bind(this, 'sandy') },
                "Sandy"
              )
            )
          )
        )
      )
    );
  },
  handleClick: function (river) {
    this.setState({ clicked: !this.state.clicked });
    this.props.selectRiver(river);
    console.log(river);
  }
});

module.exports = MainNav;