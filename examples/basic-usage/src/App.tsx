import {
  createBindings,
  ImmerContextProps,
  ImmerContextUpdateFn
} from 'immer-connect';
import * as React from 'react';

interface IContextState {
  value: number;
  clickCount: number;
}

const initialState: IContextState = {
  value: 0,
  clickCount: 0
};

const { Provider, connect } = createBindings<IContextState>({
  value: -999,
  clickCount: -999
});

class App extends React.Component {
  public render() {
    return (
      <div>
        <h1>Immer Context Basic Usage</h1>
        <Provider initialState={initialState}>
          <Content />
        </Provider>
      </div>
    );
  }
}

const Content: React.SFC<{}> = props => {
  return (
    <div>
      <span>Add or subtract:</span>
      <UpdateController />
      <ValueDisplay label="Value" />
      <ClickCountDisplay label="Click count" />
    </div>
  );
};

const UpdateControllerRender: React.SFC<
  ImmerContextProps<IContextState>
> = props => {
  return (
    <div>
      <button onClick={() => props.setState(actions.subtract)}>-</button>
      <button onClick={() => props.setState(actions.add)}>+</button>
    </div>
  );
};

const UpdateController = connect(UpdateControllerRender);

interface IValueDisplayOwnProps {
  label: string;
}
const ValueDisplayRender: React.SFC<
  ImmerContextProps<IContextState> & IValueDisplayOwnProps
> = props => {
  return (
    <div>
      <div>
        {props.label}: {props.state.value}
      </div>
    </div>
  );
};

// Explicitly passing state interface and ownprops as type params guarantees
// type safety of required props
const ValueDisplay = connect<IContextState, IValueDisplayOwnProps>(
  ValueDisplayRender
);

interface IClickCountDisplayOwnProps {
  label: string;
}
const ClickCountDisplayRender: React.SFC<
  ImmerContextProps<IContextState> & IClickCountDisplayOwnProps
> = props => {
  return (
    <div>
      <div>
        {props.label}: {props.state.clickCount}
      </div>
    </div>
  );
};

// Inference of required props and injected props works well when
// ImmerContextProps<State> is used as a prop
const ClickCountDisplay = connect(ClickCountDisplayRender);

const actions: { [key: string]: ImmerContextUpdateFn<IContextState> } = {
  add: s => {
    s.value += 1;
    s.clickCount += 1;
  },
  subtract: s => {
    s.value -= 1;
    s.clickCount += 1;
  }
};

export default App;
