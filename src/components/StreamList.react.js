var React = require("react");
var _ = require("lodash");
var USGS = require("../usgs/USGS");

var StreamList = React.createClass({
  
  render: function(){
    var listItems = [];
    _.forEach(this.props.list, function(stream){
      listItems.push(<a href='#' className="list-group-item">{stream}</a>)
    });
    var twoPartitions = _.partition(listItems, function(item){
      return listItems.indexOf(item) < listItems.length / 2
    })
    var fourPartitions = []
    _.forEach(twoPartitions, function(group){
      fourPartitions.push(_.partition(group, function(item){
        return group.indexOf(item) < group.length / 2
      }))
    })
    if (listItems.length > 0) {
      var content = _.map(_.flatten(fourPartitions), function(group){
        return <div className="col-md-3 list-group">{group}</div>
      })
    } else {
      var content = <img src="img/gps.gif" />
    }

    return (
      <div className="row">
        {content}
      </div>
    );
  }
});

module.exports = StreamList;
