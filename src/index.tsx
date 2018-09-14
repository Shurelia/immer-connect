import createReactContext from 'create-react-context';
import * as React from 'react';
import { createConnect } from './connect';
import { createProvider, ImmerContextProviderState } from './Provider';
import { ImmerContextProps, ImmerContextProviderProps } from './types';

export const createBindings = <S extends {} = any>() => {
  const Context = createReactContext({} as ImmerContextProps<
    S
  >) as React.Context<ImmerContextProps<S>>; // create-react-context using incompatible typings

  const Provider: React.ComponentClass<
    ImmerContextProviderProps<S>,
    ImmerContextProviderState<S>
  > = createProvider<S>(Context.Provider);
  const connect = createConnect<S>(Context.Consumer);
  return {
    Provider,
    connect
  };
};

const { Provider, connect } = createBindings();

export * from './types';
export { Provider, connect };
