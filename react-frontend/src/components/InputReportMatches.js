import React, { Component } from 'react';
import { Table, Progress } from 'semantic-ui-react';

export default class InputReportMatches extends Component {
  render() {
    const { matches, currentInputPk, handleClick } = this.props;

    return (
      <div className="input-report-table matches-container">
        <h3>Choose the right candidate!</h3>
        <Table color="blue" celled inverted selectable>
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
              <Table.Row
                key={match.pk}
                onClick={() => handleClick(currentInputPk, match)}
              >
                <Table.Cell>{match.sound_recording.artist}</Table.Cell>
                <Table.Cell>{match.sound_recording.title}</Table.Cell>
                <Table.Cell>{match.sound_recording.isrc}</Table.Cell>
                <Table.Cell>{match.sound_recording.duration}</Table.Cell>
                <Table.Cell>
                  <Progress
                    percent={match.similarity_score * 100}
                    inverted
                    color="green"
                    progress
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
