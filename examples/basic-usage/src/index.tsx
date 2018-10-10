import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

/**
 * Thanks for checking this out!
 *
 * ./fibonacci has the example from the readme, written in TypeScript
 *
 * ./basicCounter includes some examples on basic usage patterns with comments, such as:
 *   - calling connect with no arguments
 *   - passing initial state to provider component
 *   - describing all possible state mutations in one place, and referencing them
 *
 * ./theming demonstrates some more advanced usage patterns, like:
 *   - creating resuable container components to consume state with
 *   - using multiple, nested instances of a Provider component
 */

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
