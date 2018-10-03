import createReactContext from 'create-react-context';
import { Draft } from 'immer';
import * as React from 'react';
import { createConnect } from './connect';
import { createProvider } from './Provider';
import { AllowableStateTypes, ImmerConnectInjectedProps } from './types';
import { ICreateBindings } from './typesInternal';

export const createBindings: ICreateBindings = <S extends AllowableStateTypes>(
  defaultState: S
) => {
  const Context = getContext(defaultState);

  const Provider = createProvider<S>(Context.Provider, defaultState);
  const connect = createConnect<S>(Context.Consumer);
  return {
    Provider,
    connect
  };
};

const getContext = <S extends AllowableStateTypes>(defaultState: S) => {
  const setCtx = (fn: (s: Draft<S>) => void) => {};
  const ctx = defaultState;
  return createReactContext({ ctx, setCtx }) as React.Context<
    ImmerConnectInjectedProps<S>
  >; // create-react-context using incompatible typings
};

export default createBindings;
