var _ = require("lodash");
var odfwHelper = require("../odfw/helper");
var ZoneBounds = require("../odfw/RevisedZoneBoundaries");
function decodeHtml(html) {
  if (html.match("&#176;")) {
    // degree symbol
    return html.split("&#176;").join("°");
  } else if (html.match("&#179;")) {
    // cubed symbol
    return html.split("&#179;").join("³");
  } else {
    return html;
  }
}

var PARAMETER_CODES = {
  "TEMPERATURE_FARENHEIGHT": "00011",
  "TEMPERATURE_CELSIUS": "00010",
  "GAGE_HEIGHT_FEET": "00065",
  "DISCHARGE_INST_FEET3PERSEC": "00060"
};
var Base_URL = 'http://waterservices.usgs.gov/nwis/iv/?format=json';

var USGS = {
  simplify: function (USGSTimeSeriesItem) {
    var simpleObj = {};
    simpleObj.siteName = this.toTitleCase(USGSTimeSeriesItem.sourceInfo.siteName);
    simpleObj.siteCode = USGSTimeSeriesItem.sourceInfo.siteCode[0].value;
    simpleObj.geoLocation = USGSTimeSeriesItem.sourceInfo.geoLocation.geogLocation;
    simpleObj.dateTime = USGSTimeSeriesItem.values[0].value[0].dateTime;
    simpleObj.value = USGSTimeSeriesItem.values[0].value[0].value;
    simpleObj.units = decodeHtml(USGSTimeSeriesItem.variable.variableName);
    simpleObj.parameter = '';
    for (var param in PARAMETER_CODES) {
      if (PARAMETER_CODES[param] === USGSTimeSeriesItem.name.split(":")[2]) {
        simpleObj.parameter = param;
        break;
      };
    };
    simpleObj.formattedData = this.cleanDataLabel(simpleObj);
    simpleObj.zone = this.getZone(simpleObj);
    console.log(simpleObj.zone);
    return simpleObj;
  },
  simplifySiteList: function (USGS_Site) {
    var simpleObj = {};
    simpleObj.siteName = USGS_Site.sourceInfo.siteName;
    simpleObj.siteCode = USGS_Site.sourceInfo.siteCode[0].value;
    simpleObj.geoLocation = USGS_Site.sourceInfo.geoLocation.geogLocation;
    simpleObj.zone = this.getZone(simpleObj);
    return simpleObj;
  },

  getStreamName: function (USGSSiteName) {
    var orSpecialCases = [{ "match": "lake creek", "output": "Lake Creek" }, { "match": "Lake Billy Chinook", "output": "Lake Billy Chinook" }, { "match": "Star Gulch near ruch", "output": "Star Gulch near Ruch, OR" }, { "match": "Oak Grove Fork", "output": "Clackamas River" }, { "match": "Klamath Straits Drain", "output": "Klamath Straits Drain" }, { "match": "Coast Fork Willamette", "output": "Coast Fork Willamette River" }];
    var specialOutput;
    _.forEach(orSpecialCases, function (specCase) {
      if (USGSSiteName.match(RegExp(specCase.match, 'i'))) {
        specialOutput = specCase.output;
      }
    });
    if (specialOutput) {
      return specialOutput;
    } else {
      var nameFrag = USGSSiteName.split(' ');
      var waterTerm = _.findIndex(nameFrag, function (frag) {
        return frag.match(/canal|creek|dam|lake|pond|river|slough/i);
      });
      // console.log(nameFrag.slice(0,waterTerm+1)+" | "+ USGSSiteName)
      return nameFrag.slice(0, waterTerm + 1).join(' ');
    }
  },

  cleanDataLabel: function (simplifiedUSGSobj) {
    var units;
    var label;
    switch (simplifiedUSGSobj.units.split(',')[0]) {
      case 'Temperature':
        label = 'Water Temperature';
        units = simplifiedUSGSobj.units.split(',')[2];
        break;
      case 'Streamflow':
        label = 'Streamflow';
        units = simplifiedUSGSobj.units.split(',')[1];
      default:
        label = simplifiedUSGSobj.units.split(',')[0];
        units = simplifiedUSGSobj.units.split(',')[1];
    }
    return { label: label, value: [simplifiedUSGSobj.value, units].join("") };
  },
  toTitleCase: function (string) {
    var str = string.toLowerCase();
    return str.split(" ").map(function (i) {
      return i[0].toUpperCase() + i.substring(1);
    }).join(" ");
  },

  cleanSiteNames: function (sites) {
    var sites = _.sortBy(_.unique(sites, 'siteCode'), 'siteName');

    _.forEach(sites, function (site) {
      var nameWords = site.siteName.split(" ");
      nameWords.forEach(function (nameFrag) {
        switch (nameFrag) {
          case 'CR':
            nameWords[nameWords.indexOf('CR')] = 'CREEK';
            break;
          case 'CRK':
            nameWords[nameWords.indexOf('CRK')] = 'CREEK';
            break;
          case 'FK':
            nameWords[nameWords.indexOf('FK')] = 'FORK';
            break;
          case 'M':
            nameWords[nameWords.indexOf('M')] = 'MIDDLE';
            break;
          case 'MF':
            nameWords[nameWords.indexOf('MF')] = 'MIDDLE FORK';
            break;
          case 'N':
            nameWords[nameWords.indexOf('N')] = 'NORTH';
            break;
          case 'N.UMPQUA':
            nameWords[nameWords.indexOf('N.UMPQUA')] = 'NORTH UMPQUA';
            break;
          case 'NF':
            nameWords[nameWords.indexOf('NF')] = 'NORTH FORK';
            break;
          case 'NO':
            nameWords[nameWords.indexOf('NO')] = 'NORTH';
            break;
          case 'R':
            nameWords[nameWords.indexOf('R')] = 'RIVER';
            break;
          case 'SO':
            nameWords[nameWords.indexOf('SO')] = 'SOUTH';
            break;
        }
      });

      site.siteName = nameWords.join(" ");
    });

    sites = _.reject(sites, function (site) {
      return site.siteCode.length > 8;
    });
    _.forEach(sites, function (site) {
      site.siteName = USGS.toTitleCase(site.siteName);
    });
    return sites;
  },
  getZone: function (site) {
    var swBound = odfwHelper.getCoordinates("Southwest Zone Boundary Line (rough)").reverse(),
        seBound = odfwHelper.getCoordinates("Southeast Zone Boundary Line (rough)").reverse(),
        nwBound = odfwHelper.getCoordinates("Northwest Zone Boundary Line (Rough)").reverse(),
        cBound = odfwHelper.getCoordinates("Central Zone Boundary Line (rough)"),
        wBound = odfwHelper.getCoordinates("Willamette Zone East Boundary Line (Rough)").reverse(),
        zone = "";

    // Begin site checking
    var checkOrientation = odfwHelper.orientToBoundary(site, seBound);

    switch (checkOrientation.orientation) {
      case "East of line":
        zone = "Southeast";
        break;
      case "West of line":
        checkOrientation = odfwHelper.orientToBoundary(site, swBound);
        switch (checkOrientation.orientation) {
          case "East of line":
            zone = "Southwest";
            break;
          default:
            zone = odfwHelper.checkBounds(site, nwBound, wBound, cBound);
            break;
        }
        break;
      case "Not in range":
        zone = odfwHelper.checkBounds(site, nwBound, wBound, cBound);
        break;
    }
    return zone;
  }

};

module.exports = USGS;