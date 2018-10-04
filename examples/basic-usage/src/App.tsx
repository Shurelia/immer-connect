import {
  createBindings,
  ImmerConnectInjectedProps,
  SetCtxInnerFn
} from '@shurelia/immer-connect';
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
  ImmerConnectInjectedProps<IContextState>
> = props => {
  return (
    <div>
      <button onClick={() => props.setCtx(actions.subtract)}>-</button>
      <button onClick={() => props.setCtx(actions.add)}>+</button>
    </div>
  );
};

const UpdateController = connect()(UpdateControllerRender);

interface IValueDisplayOwnProps {
  label: string;
}
const ValueDisplayRender: React.SFC<
  ImmerConnectInjectedProps<IContextState> & IValueDisplayOwnProps
> = props => {
  return (
    <div>
      <div>
        {props.label}: {props.ctx.value}
      </div>
    </div>
  );
};

// Leave connect param empty to pass ctx and setCtx directly to component
const ValueDisplay = connect()(ValueDisplayRender);

interface IClickCountDisplayOwnProps {
  label: string;
}
const ClickCountDisplayRender: React.SFC<
  IClickCountDisplayOwnProps & IClickCountDisplayMapProps
> = props => {
  return (
    <div>
      <div>
        {props.label}: {props.value}
      </div>
    </div>
  );
};

// Pass a 'map to props' function to connect to get specific things out of state
// Hint: use selectors here!
type IClickCountDisplayMapProps = ReturnType<typeof mapToProps>;
const mapToProps = (s: IContextState) => ({
  value: s.clickCount
});
const ClickCountDisplay = connect(mapToProps)(ClickCountDisplayRender);

const actions: { [key: string]: SetCtxInnerFn<IContextState> } = {
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
