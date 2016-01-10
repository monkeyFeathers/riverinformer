var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var USGS = require('../src/usgs/helper');

chai.use(chaiHttp);

var USGS_BASE_URL = 'http://waterservices.usgs.gov'

describe('USGS Instantaneous Data -- single site', function() {

  describe('#data', function() {
    var usgsData = null;

    before(function(done) {
      chai.request(USGS_BASE_URL).get('/nwis/iv/?format=json&parameterCd=00060,00065,00010&period=P7D&sites=14210000')
      .then(function(res) {
        usgsData = JSON.parse(res.text);
        done();
      })
    })

    it('should be an array',function() {
      expect(usgsData).to.be.an('object')
    })
  })

  describe('#simplify', function() {
    var usgsData = null;
    var simpleData = null;
    var firstParam = null;

    before(function(done) {
      chai.request(USGS_BASE_URL).get('/nwis/iv/?format=json&parameterCd=00060,00065,00010&period=P7D&sites=14210000')
      .then(function(res) {
        usgsData = JSON.parse(res.text)
        simpleData = USGS.simplify(usgsData)
        firstParam = simpleData.parameters[0]
        done();
      })
    });

    describe('--object properties', function(){
      it('should have properly formatted name of site', function() {
        expect(simpleData).to.have.property('siteName').and.eql('clackamas river at estacada, or')
      });
      it('should have a siteCode', function() {
        expect(simpleData).to.have.property('siteCode').and.eql('14210000')
      });
      it('should have site geodata', function() {
        expect(simpleData).to.have.property('geoLocation')
          .and.to.be.an('object')
          .and.to.have.property('longitude')
      });
      it('should have parameters', function() {
        expect(simpleData).to.have.property('parameters').and.length(3)
      })
    });

    describe('--parameters', function() {


      it('should each have description', function() {
        expect(firstParam).to.have.property('description')
          .and.to.eql('Temperature, water, degrees Celsius')
      });
      it('should each have properly formated units', function() {
        expect(firstParam).to.have.property('units')
          .and.to.eql('deg C')
      });
      it('should each have collection of data', function() {
        expect(firstParam).to.have.property('data')
          .and.is.an('array');
        expect(firstParam.data[0]).to.have.property('value')
          .and.to.be.ok;
        expect(firstParam.data[0]).to.have.property('date')
          .and.to.be.ok;
        expect(firstParam.data[0]).to.have.property('time')
          .and.to.be.ok;
      });
    })

  })
});
