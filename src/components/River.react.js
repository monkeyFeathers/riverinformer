import React from 'react';
import USGS from '../usgs/helper';
import Site from './Site.react';

export default class River extends React.Component {
  constructor(props) {
    super(props);
    this.state = {report: null, siteData: null}
  }

  componentDidMount() {
    if (this.props.riverName) {
      this.fetchRiverData(this.props.riverName)
      this.fetchRiverReport(this.props.riverName)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.fetchRiverData(nextProps.riverName)
    this.fetchRiverReport(nextProps.riverName)
  }

  fetchRiverData(river){
    this.setState({siteData: null})
    var siteCodes = {
      clackamas: '14210000',
      sandy: '14142500',
    }

    $.get('/site/'+siteCodes[river], (data) => {
        this.setState({
          siteData: USGS.simplify(data),
        });
    });
  }

  fetchRiverReport(river) {
    this.setState({report: null})
    $.get('/report/'+river, (data) => {
        this.setState({
          report: data[0]
        });
    });
  }

  render() {
    var report = null;
    var date = null;
    var species = null;
    var reportParagraphs = null;
    if (this.state.report) {
      report = this.state.report;
      date = '\u2014 ' + report.date;
      species = report.species
      reportParagraphs  = report.report.map(function(grph, ind) {
        return <p key={ind+new Date().getTime()}>{grph}</p>
      })
    } else {
      reportParagraphs = <img src="/img/gps.gif"/>
    }
    return (
      <article>
        <div className="container-fluid">
        <div>
          <h3>{this.props.riverName} river</h3>
        </div>
          <div className="row">
            <div className="col-md-6">
              <div>
                <h4>Fishing Report {date}</h4>
                <div>
                  <h6>Species: {species}</h6>
                  {reportParagraphs}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <h4>River Data</h4>
                <div>
                  <Site chartData={this.state.siteData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }
}
