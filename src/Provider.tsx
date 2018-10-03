import produce from 'immer';
import * as React from 'react';
import {
  AllowableStateTypes,
  ImmerConnectInjectedProps,
  ImmerConnectProviderProps,
  SetCtx
} from './index.d';

interface ImmerContextProviderState<S> {
  value: S;
}

type ReactProvider<S> = React.ComponentType<
  React.ProviderProps<ImmerConnectInjectedProps<S>>
>;

type ImmerConnectProvider<S> = React.ComponentClass<
  ImmerConnectProviderProps<S>,
  ImmerContextProviderState<S>
>;

export const createProvider = <S extends AllowableStateTypes>(
  ProviderComponent: ReactProvider<S>,
  defaultState: S
): ImmerConnectProvider<S> => {
  return class Provider extends React.Component<
    ImmerConnectProviderProps<S>,
    ImmerContextProviderState<S>
  > {
    static defaultProps = {
      initialState: defaultState
    };

    constructor(props: ImmerConnectProviderProps<S>) {
      super(props);
      this.state = { value: props.initialState! }; // defaultProps handles undefined case
    }

    updateState: SetCtx<S> = fn => {
      this.setState({ value: produce(this.state.value, s => fn(s)) });
    };

    render() {
      const ctxValue = { ctx: this.state.value, setCtx: this.updateState };
      return (
        <ProviderComponent value={ctxValue}>
          {this.props.children}
        </ProviderComponent>
      );
    }
  };
};
