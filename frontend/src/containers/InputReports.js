import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchInputReports } from '../actions/inputReportsActions'

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchInputReports
}, dispatch)

const mapStateToProps = state => {
	return {
		error: state.inputReports.error,
		input_reports: state.inputReports.input_reports,
		is_fetching: state.inputReports.is_fetching,
	}
}

const InputReportsHeader = () => {
	return (
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Artist</Table.HeaderCell>
				<Table.HeaderCell>Title</Table.HeaderCell>
				<Table.HeaderCell>ISRC</Table.HeaderCell>
				<Table.HeaderCell>Duration</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
	);
}

const InputReportsBody = props => {
	const { items } = props;
	return (
		<Table.Body>
			{items.map(item => (
				<Table.Row key={item.pk}>
					<Table.Cell>{item.artist}</Table.Cell>
					<Table.Cell>{item.title}</Table.Cell>
					<Table.Cell>{item.isrc}</Table.Cell>
					<Table.Cell>{item.duration}</Table.Cell>
				</Table.Row>
			))}
		</Table.Body>
	);
}

class InputReports extends Component {

	// Check handling errors

	componentDidMount(){
		this.props.fetchInputReports();
	}

	render() {
		if (this.props.error) {
			console.log(this.props.error);
			return <div>Error: { this.props.error }</div>;
		} else if (this.props.is_fetching) {
			return <div> Loading... </div>;
		} else {
			return(
				<div className="input-report-table">
					<h3>Input Report</h3>
					<Table celled inverted selectable>
					 	<InputReportsHeader/>
					 	<InputReportsBody items={this.props.input_reports} />
					</Table>
				</div>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InputReports);