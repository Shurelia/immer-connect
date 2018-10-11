# Immer Connect

Immer Connect provides a simple way of connecting React components to a shared state store.  
It leverages the very excellent [Immer](https://github.com/mweststrate/immer) to allow the state to be updated immutably, using a mutable API.

- 100% type safe (written in Typescript)
- Mutable API for state updates (no more spread operators)
- Familiar connect API (only receive the slice of state you need)

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
    setCtx(d => {
      const last = d.seq.length - 1;
      d.seq.push(d.seq[last] + d.seq[last - 1]);
    })
});
const FibonacciConnected = connect(mapToProps)(FibonacciDisplay);

const App = () => (
  <Provider>
    <FibonacciConnected />
  </Provider>
);

export default App;
```

More examples are available on [CodeSandbox](https://codesandbox.io/s/github/Shurelia/immer-connect/tree/master/examples/basic-usage).

## Installation

- npm: `npm install --save immer-connect`
- yarn: `yarn add immer-connect`

## API

```js
import createBindings from 'immer-connect';
```

### `createBindings<S>(defaultState: S)`

Creates set of React bindings to provide and consume a state store with the shape `S`. `defaultState` is the state initially received by connected components, and will also be received by connected components that have [no parent Provider](https://reactjs.org/docs/context.html#reactcreatecontext).  
Returns an object that has the following properties:

- [connect](#connect)
- [Provider](#Provider)

### `connect(mapToProps?: Function)`

Used to connect a component to a parent provider's state store. It takes a single optional argument `mapToProps`, and returns a higher-order component that injects the return value of `mapToProps` into the component passed to it.

#### `mapToProps?: (ctx?: S, setCtx?: SetCtx<S>, ownProps?: O) => InjectedProps`

`mapToProps` is a function that takes as arguments:

- `ctx?: S` - Your store's state.
- `setCtx?: (S | (draft: Draft<S>) => any) => void` - A function that takes either:
  - `S` - An entirely new state object. Calling setCtx with this replaces your entire state with the given state.
  - `(draft: Draft<S>) => any` - A function that takes an Immer draft object as an argument. In the body of this function, you may mutate this object. When it returns, the mutations will be used to create a new state (without ever mutating the old state). The return value of this function is not used. If you haven't read about [Immer](https://github.com/mweststrate/immer) yet, now's the time!
- `ownProps?: O` - The props that were directly passed to this component.

The return value of this function becomes the props that are injected by the higher-order component. Each time your store updates, `mapToProps` is called with the new state, keeping your component up to date. Let's look at an example:

```js
const initialState = { value: 0 };
// ...
const mapToProps = (ctx, setCtx) => ({
  value: ctx.value,
  addOne: () => setCtx(draft => (draft.value += 1)),
  reset: () => setCtx(initialState)
});
```

Now we can call `connect` with this function. `withInjectedProps` is a function that takes a component, and returns a new component with the injected props:

```js
const withInjectedProps = connect(mapToProps);
const ConnectedComponent = withInjectedProps(MyComponent);
```

`ConnectedComponent` is a React component that passes three new props to `MyComponent`: the current `value`, a function `addOne` that incremenets the current value by one, and a function `reset` that resets the value to zero. Any additional props passed to `ConnectedComponent` are passed through to `MyComponent`.

Combining all of this into a one-liner, a connected component can be generated from `MyComponent` like so:

```js
const ConnectedComponent = connect((ctx, setCtx) => ({
  value: ctx.value,
  addOne: () => setCtx(draft => (draft.value += 1)),
  reset: () => setCtx(initialState)
}))(MyComponent);
```

In the case that `connect` is called with no arguments, `ctx` and `setCtx` are passed as props directly to the given component:

```js
const SimpleConnected = connect()(MyComponent);
```

### `Provider`

A component that provides an instance of the state store to all its children (at any depth in the component tree, not just direct children). Any number of them can be instantiated in the component tree, and each will provide its own copy of the store. Connected components will look upwards in the component tree for the nearest parent provider (take a look at the `theming` [example](https://codesandbox.io/s/github/Shurelia/immer-connect/tree/master/examples/basic-usage) for what this looks like in practice).

`Provider` takes the following props:

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
        <button onClick={() => setCtx(d => (d.val += 1))}>{ctx.val}</button>
      </div>
    )}
  />
);
```

### Extra Types

In addition to the single function exported by this module, if you are using Typescript, some utility types are exposed. They can be viewed [here](src/types.ts).

## Gotchas

- All of the [pitfalls](https://github.com/mweststrate/immer#pitfalls) described in immer's documentation hold just as true in this module. The main take away from this is that you should only ever mutate primitives, plain objects, or arrays (no class instances!).
- In immer, returning a new state inside `produce` replaces the entire state. In this module, if you call `setCtx` with a new state as an argument, it will replace the entire state. _However_, if you call `setCtx` with a function as an argument, the return of that function is not used, only the mutations to the draft object are.
- The function passed to `setCtx` should always execute syncronously. The draft object is created at the time `setCtx` is called, and other state changes happening before `setCtx` returns will cause unexpected behaviors.

## Todo

- Support immer's patches feature
- Add WrappedComponent to HOC-generated component, for accessing refs
- Only call mapToProps with necessary arguments, based on mapToProps` arity (even necessary?)
