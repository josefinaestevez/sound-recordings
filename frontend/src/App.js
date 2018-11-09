import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import Header from './components/Header'
import InputReports from './containers/InputReports'

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Container className="reports-container">
          <InputReports />
        </Container>
      </div>
    );
  }
}

export default App;
