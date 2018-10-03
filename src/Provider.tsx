import produce from 'immer';
import * as React from 'react';
import {
  ImmerContextProps,
  ImmerContextProviderProps,
  ImmerContextUpdateFn
} from './index.d';

interface ImmerContextProviderState<S> {
  value: S;
}

type ReactProvider<S> = React.ComponentType<
  React.ProviderProps<ImmerContextProps<S>>
>;

type ImmerConnectProvider<S> = React.ComponentClass<
  ImmerContextProviderProps<S>,
  ImmerContextProviderState<S>
>;

export const createProvider = <S extends any>(
  ProviderComponent: ReactProvider<S>
): ImmerConnectProvider<S> => {
  return class Provider extends React.Component<
    ImmerContextProviderProps<S>,
    ImmerContextProviderState<S>
  > {
    constructor(props: ImmerContextProviderProps<S>) {
      super(props);
      this.state = { value: props.initialState };
    }

    updateState = (fn: ImmerContextUpdateFn<S>) => {
      this.setState({ value: produce(this.state.value, s => fn(s)) });
    };

    render() {
      const ctxValue = { state: this.state.value, setState: this.updateState };
      return (
        <ProviderComponent value={ctxValue}>
          {this.props.children}
        </ProviderComponent>
      );
    }
  };
};
