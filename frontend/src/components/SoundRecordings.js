import React, { Component } from 'react';

import LoadingMessage from './LoadingMessage';
import InputReportsError from './InputReportsError';
import InputReports from './InputReports';
import InputReportMatchesError from './InputReportMatchesError';
import InputReportMatches from './InputReportMatches';

export default class SoundRecordings extends Component {
  componentDidMount() {
    this.props.fetchInputReports();
  }

  render() {
    const {
      reportsError,
      isFetchingReports,
      inputReports,
      fetchMatches,
      matchesError,
      isFetchingMatches,
      matches,
      currentInputPk,
      selectMatch
    } = this.props;
    let inputReportMatchesDiv, inputReportsDiv;

    if (isFetchingReports) {
      inputReportsDiv = <LoadingMessage />;
    } else if (!reportsError) {
      if (inputReports.length > 0) {
        inputReportsDiv = (
          <InputReports
            inputReports={inputReports}
            handleClick={fetchMatches}
            currentInputPk={currentInputPk}
          />
        );
      } else {
        inputReportsDiv = <h3>No entries</h3>;
      }
    } else {
      inputReportsDiv = <InputReportsError reportsError={reportsError} />;
    }

    if (isFetchingMatches) {
      inputReportMatchesDiv = <LoadingMessage />;
    } else if (!matchesError) {
      if (matches.length > 0) {
        inputReportMatchesDiv = (
          <InputReportMatches
            matches={matches}
            isFetchingMatches={isFetchingMatches}
            matchesError={matchesError}
            currentInputPk={currentInputPk}
            handleClick={selectMatch}
          />
        );
      } else if (currentInputPk !== null) {
        inputReportMatchesDiv = <h3>No matches found</h3>;
      }
    } else {
      inputReportMatchesDiv = (
        <InputReportMatchesError matchesError={matchesError} />
      );
    }

    return (
      <React.Fragment>
        {inputReportsDiv}
        {inputReportMatchesDiv}
      </React.Fragment>
    );
  }
}
