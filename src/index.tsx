import createReactContext from 'create-react-context';
import { Draft } from 'immer';
import * as React from 'react';
import { createConnect } from './connect';
import {
  AllowableStateTypes,
  ICreateBindings,
  ImmerContextProps
} from './index.d';
import { createProvider } from './Provider';

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
  const setState = (fn: (s: Draft<S>) => void) => {};
  const state = defaultState;
  return createReactContext({ state, setState }) as React.Context<
    ImmerContextProps<S>
  >; // create-react-context using incompatible typings
};

export default createBindings;
