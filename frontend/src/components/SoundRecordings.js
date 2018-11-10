import React, {Component} from 'react'

import InputReports from './InputReports'
import InputReportMatches from './InputReportMatches'

export default class SoundRecordings extends Component {

	componentDidMount(){
		this.props.fetchInputReports();
	}

	render() {

		const { reportsError, isFetchingReports, inputReports, fetchMatches, matches, currentInputPk } = this.props

		if (reportsError) {
			return <div>Error: { reportsError }</div>;
		} else if (isFetchingReports) {
			return <div> Loading... </div>;
		} else {
			return(
				<React.Fragment>
					<InputReports inputReports={inputReports} handleClick={fetchMatches} currentInputPk={currentInputPk}/>
					{ matches.length ?
						<InputReportMatches matches={matches} /> : null
					}
				</React.Fragment>
			);
		}
	}
}
