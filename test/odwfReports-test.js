var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var ODFWScraper = require('../src/odfw/reportScraper');
var reportHelper = require('../src/utilities/ReportHelper')

chai.use(chaiHttp);

describe('Report Scraper', function() {
  var fullRes = null;
  var body = null;
  var river = 'clackamas';

  before(function(done) {
    chai.request('http://www.dfw.state.or.us').get('/rr/willamette/')
      .then(function(res) {
        fullRes = res;
        body = res.text;
        done();
      });
    });

  it('should pass sanity check', function() {
    expect(fullRes).to.have.status(200)
    expect(body).to.be.ok;
  });

  describe('#scrape', function() {
    it('should return the data for the specified river', function() {
      var report = ODFWScraper(body, river)
      expect(report).to.be.an('object');
      expect(report).to.have.property('reportDate');
      expect(report).to.have.property('species');
      expect(report).to.have.property('reportBody');
    });
  });
  describe.only('#reportHelper Extract', function() {
    it('should extract', function() {
      var reports = reportHelper.extractReports(body)
      var clackamas = reports.filter(function(report) {
        if (report.location.match(/clackamas/i)) return report
      })
      //expect(reports, 'is array').to.be.an('array');
      //expect(reports[0], 'eqls hello').to.eql('hello');
      expect(clackamas[0]).to.eql('hello')
    })

  });

})
