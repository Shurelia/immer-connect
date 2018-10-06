import * as React from 'react';
import BasicCounter from './basicCounter';

class App extends React.Component {
  public render() {
    return (
      <div>
        <h1>Immer Connect Basic Usage</h1>
        <BasicCounter />
      </div>
    );
  }
}

export default App;
