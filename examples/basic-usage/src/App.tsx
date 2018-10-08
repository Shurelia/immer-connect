import { Router } from '@shurelia/immer-connect/examples/basic-usage/src/router';
import * as React from 'react';

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
