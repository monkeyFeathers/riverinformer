"use strict";

var ZoneBounds = require("./RevisedZoneBoundaries");
var _ = require("lodash");

var Helper = {

  getCoordinates: function getCoordinates(name) {
    var rawCoordinates,
        sortedCoordinates,
        coordinates = [];

    // get the list of coordinates from the zone boundaries list
    rawCoordinates = _.pluck(_.pluck(_.where(ZoneBounds.features, { "properties": { "name": name } }), "geometry"), "coordinates");
    rawCoordinates = rawCoordinates[0];

    // turn each coordinate into a lat/lon object
    coordinates = _.map(rawCoordinates, function (coord) {
      return { "longitude": coord[0], "latitude": coord[1] };
    });

    return coordinates;
  },

  orientToBoundary: function orientToBoundary(site, points) {

    var siteCoords = {
      "latitude": site.geoLocation.latitude,
      "longitude": site.geoLocation.longitude
    };

    // figure out which point on the boundary line is above site
    var result = _.findIndex(points, function (point) {
      return point.latitude > siteCoords.latitude;
    });

    // make sure it's in range
    if (result === 0 || result === -1) {

      return { "orientation": "Not in range" };
    } else {
      // take the upper and lower limit points and
      // determine whether site is east or west

      // sorry about the maths :(
      var x1 = points[result - 1].longitude,
          y1 = points[result - 1].latitude;
      var x2 = points[result].longitude,
          y2 = points[result].latitude;
      var x = siteCoords.longitude,
          y = siteCoords.latitude;

      var m = Math.sign((y2 - y1) / (x2 - x1));

      var d = Math.sign((x - x1) * (y2 - y1) - (y - y1) * (x1 - x2));

      if (d !== m) {
        return { "orientation": "West of line", "bounds": [points[result - 1], points[result]] };
      } else if (d === m) {
        return { "orientation": "East of line", "bounds": [points[result - 1], points[result]] };
      } else if (d === 0) {
        return { "orientation": "On line", "bounds": [points[result - 1], points[result]] };
      }
    };
  },
  checkBounds: function checkBounds(site, nwBound, wBound, cBound) {
    var zone = "";
    // add points above to settle not in range issues
    // This will have to be reconciled with columbia river and snake river sites (later)
    nwBound.push({ "latitude": 46.34692, "longitude": _.last(nwBound).longitude });
    wBound.push({ "latitude": 46.34692, "longitude": _.last(wBound).longitude });
    cBound.push({ "latitude": 46.34692, "longitude": _.last(cBound).longitude });
    var checkOrientation = this.orientToBoundary(site, nwBound);
    switch (checkOrientation.orientation) {
      case "West of line":
        zone = "Northwest";
        break;
      case "Not in range":
        zone = "Northwest";
        break;
      case "East of line":
        checkOrientation = this.orientToBoundary(site, wBound);
        switch (checkOrientation.orientation) {
          case "West of line":
            zone = "Willamette";
            break;
          case "Not in range":
            zone = "Willamette";
            break;
          case "East of line":
            checkOrientation = this.orientToBoundary(site, cBound);
            switch (checkOrientation.orientation) {
              case "West of line":
                zone = "Central";
                break;
              case "Not in range":
                zone = "Central";
                break;
              case "East of line":
                zone = "Northeast";
                break;
            }
        }
    }
    return zone;
  }
};
module.exports = Helper;