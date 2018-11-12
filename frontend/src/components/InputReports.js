import React, { Component } from 'react';
import { Table, Transition } from 'semantic-ui-react';

export default class InputReports extends Component {
  render() {
    const { inputReports, handleClick, currentInputPk } = this.props;

    return (
      <Transition transitionOnMount={true} animation="fade" duration={500}>
        <div className="input-report-table">
          <h3>Choose an entry to see their matches...</h3>
          <Table color="teal" celled inverted selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Artist</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>ISRC</Table.HeaderCell>
                <Table.HeaderCell>Duration</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {inputReports.map(inputReport => (
                <Table.Row
                  key={inputReport.pk}
                  onClick={() => handleClick(inputReport)}
                  className={
                    currentInputPk === inputReport.pk ? 'active' : 'none'
                  }
                >
                  <Table.Cell>{inputReport.artist}</Table.Cell>
                  <Table.Cell>{inputReport.title}</Table.Cell>
                  <Table.Cell>{inputReport.isrc}</Table.Cell>
                  <Table.Cell>{inputReport.duration}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Transition>
    );
  }
}
