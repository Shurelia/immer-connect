# immer-connect

## Introduction

immer-connect...

## Usage

```jsx
import * as React from 'react';
import createBindings from 'immer-connect';

const initialState = { seq: [0, 1] };
const { Provider, connect } = createBindings(initialState);

const FibonacciDisplay = props => (
  <div>
    <div>{props.seq.join(' ')}</div>
    <button onClick={props.next}>Next</button>
  </div>
);

const mapToProps = (ctx, setCtx) => ({
  seq: ctx.seq,
  next: () =>
    setCtx(s => {
      const last = s.seq.length - 1;
      s.seq.push(s.seq[last] + s.seq[last - 1]);
    })
});
const FibonacciContainer = connect(mapToProps)(FibonacciDisplay);

const App = () => (
  <Provider>
    <FibonacciContainer />
  </Provider>
);

export default App;
```

More examples are available on [CodeSandbox](https://codesandbox.io/s/github/Shurelia/immer-connect/tree/master/examples/basic-usage).

## Installation

`npm install --save immer-connect`

## API

```js
import createBindings from 'immer-connect';
```

### `createBindings<S>(defaultState: S)`

Creates set of React bindings to provide and consume a state store with the shape `S`. `defaultState` is the state initially received by connected components, and will also be received by connected components that have [no parent Provider](https://reactjs.org/docs/context.html#reactcreatecontext).  
Returns an object that has the following properties:

- [Provider](#Provider)
- [connect](#connect)

### `Provider`

Provider is a component that provides an instance of the state store to all its children (at any depth in the component tree, not just direct children). It takes the following props:

#### `initialState?: S`

Initializes the state store with a value different than that passed to createBindings.

#### `render?: ComponentType<{ ctx: S, setCtx: SetCtx<S> }>`

Allows the provided state to be immediately consumed. Example:

```js
const App = () => (
  <Provider
    initialState={{ val: 0 }}
    render={({ ctx, setCtx }) => (
      <div>
        <button onClick={() => setCtx(s => (s += 1))}>{ctx.val}</button>
      </div>
    )}
  />
);
```

### `connect<S, O, R>(mapToProps?: (ctx?: S, setCtx?: SetCtx<S>, ownProps?: O) => R)(Component: ComponentType<R>)`

How do I make that sound way less complicated than it is?

## Todo

- Support immer's patches feature
