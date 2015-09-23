var React = require("react");
var _ = require("lodash");
var USGS = require("../usgs/USGS");

var StreamList = React.createClass({
  
  render: function(){
    var listItems = [];
    _.forEach(this.props.list, function(stream){
      listItems.push(<li><a href='#'>{stream}</a></li>)
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
        return <div className="col-md-3"><ul>{group}</ul></div>
      })
    } else {
      var content = <img src="img/gps.gif" />
    }

    return (
      <div>
        {content}
      </div>
    );
  }
});

module.exports = StreamList;
