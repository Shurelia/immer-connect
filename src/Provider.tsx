import produce from 'immer';
import * as React from 'react';
import {
  AllowableStateTypes,
  ImmerConnectInjectedProps,
  ImmerConnectProviderProps,
  SetCtx,
  SetCtxInner
} from './types';
import { SetCtxInnerFn } from './typesInternal';

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

    updateState: SetCtx<S> = setCtxInner => {
      const value = isImmerFn(setCtxInner)
        ? produce(this.state.value, s => {
            setCtxInner(s);
          })
        : setCtxInner;
      this.setState({ value });
    };

    render() {
      const ctxValue = { ctx: this.state.value, setCtx: this.updateState };
      const RenderComponent = this.props.render;
      return (
        <ProviderComponent value={ctxValue}>
          {RenderComponent === undefined ? (
            this.props.children
          ) : (
            <RenderComponent {...ctxValue}>
              {this.props.children}
            </RenderComponent>
          )}
        </ProviderComponent>
      );
    }
  };
};

const isImmerFn = <S extends AllowableStateTypes>(
  v: SetCtxInner<S>
): v is SetCtxInnerFn<S> => {
  return typeof v === 'function';
};
