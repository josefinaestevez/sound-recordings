import React, {Component} from 'react'

import InputReports from './InputReports'
import InputReportMatches from './InputReportMatches'

export default class SoundRecordings extends Component {

	componentDidMount(){
		this.props.fetchInputReports();
	}

	render() {

		const { reportsError, isFetchingReports, inputReports, fetchMatches, matchesError, isFetchingMatches, matches, currentInputPk, selectMatch } = this.props
		let inputReportMatchesDiv, inputReportsDiv

		if(matches.length>0){
			inputReportMatchesDiv = <InputReportMatches matches={matches} isFetchingMatches={isFetchingMatches} matchesError={matchesError} currentInputPk={currentInputPk} handleClick={selectMatch} />
		} else if(currentInputPk!==null) {
			inputReportMatchesDiv = <h3>No matches found</h3>
		}

		if(inputReports.length>0){
			inputReportsDiv = <InputReports inputReports={inputReports} handleClick={fetchMatches} currentInputPk={currentInputPk} />
		} else {
			inputReportsDiv = <h3>No entries</h3>
		}

		if (reportsError) {
			return <div>Error: { reportsError }</div>;
		} else if (isFetchingReports) {
			return <div> Loading... </div>;
		} else {
			return(
				<React.Fragment>
					{inputReportsDiv}
					{inputReportMatchesDiv}
				</React.Fragment>
			);
		}
	}
}
