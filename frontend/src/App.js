import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import Header from './components/Header'
import SoundRecordings from './containers/SoundRecordings'

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Container className="reports-container">
          <SoundRecordings />
        </Container>
      </div>
    );
  }
}

export default App;
