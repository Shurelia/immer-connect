import * as React from 'react';
import { Router } from './router';

class App extends React.Component {
  public render() {
    return (
      <div>
        <h1>Immer Connect Basic Usage</h1>
        <Router />
      </div>
    );
  }
}

export default App;
