import React, {Component} from 'react'
import { Table } from 'semantic-ui-react'

export default class InputReportMatches extends Component {
	render () {

		const { matches } = this.props
		
		return (
			<div className="input-report-table matches-container">
				<h3>Choose the right candidate!</h3>
				<Table color='blue' celled inverted selectable>
				 	<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Artist</Table.HeaderCell>
							<Table.HeaderCell>Title</Table.HeaderCell>
							<Table.HeaderCell>ISRC</Table.HeaderCell>
							<Table.HeaderCell>Duration</Table.HeaderCell>
							<Table.HeaderCell>Similarity Score</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
				 	<Table.Body>
						{matches.map(match => (
							<Table.Row key={match.pk}>
								<Table.Cell>{match.sound_recording.artist}</Table.Cell>
								<Table.Cell>{match.sound_recording.title}</Table.Cell>
								<Table.Cell>{match.sound_recording.isrc}</Table.Cell>
								<Table.Cell>{match.sound_recording.duration}</Table.Cell>
								<Table.Cell>{match.similarity_score}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>
		)
	}
}