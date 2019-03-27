import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

export default class InputReportsError extends Component {
  render() {
    const { reportsError } = this.props;

    return (
      <Message negative>
        <Message.Header>We're sorry we can't load input reports</Message.Header>
        <p>{reportsError.message}</p>
      </Message>
    );
  }
}
