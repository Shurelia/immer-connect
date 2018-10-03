import createReactContext from 'create-react-context';
import { Draft } from 'immer';
import * as React from 'react';
import { createConnect } from './connect';
import { ICreateBindings, ImmerContextProps } from './index.d';
import { createProvider } from './Provider';

export const createBindings: ICreateBindings = <S extends any>(
  defaultState: S
) => {
  const Context = getContext(defaultState);

  const Provider = createProvider<S>(Context.Provider);
  const connect = createConnect<S>(Context.Consumer);
  return {
    Provider,
    connect
  };
};

const getContext = <S extends any>(defaultState: S) => {
  const setState = (fn: (s: Draft<S>) => void) => {};
  const state = defaultState === undefined ? ({} as S) : defaultState;
  return createReactContext({ state, setState }) as React.Context<
    ImmerContextProps<S>
  >; // create-react-context using incompatible typings
};

export default createBindings;
