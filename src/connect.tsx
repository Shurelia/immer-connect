import * as React from 'react';
import { AllowableStateTypes, ImmerConnectInjectedProps } from './types';
import { Connect, ConnectMap } from './typesInternal';

export function createConnect<State extends AllowableStateTypes>(
  Consumer: React.Consumer<ImmerConnectInjectedProps<State>>
) {
  const connect: Connect<State> = <M extends {} = {}, O extends {} = {}>(
    mapFn?: ConnectMap<M, O, State>
  ) => {
    if (mapFn === undefined) {
      return (
        Component: React.ComponentType<ImmerConnectInjectedProps<State> & O>
      ) => {
        return (props: O) => (
          <Consumer>
            {val => <Component ctx={val.ctx} setCtx={val.setCtx} {...props} />}
          </Consumer>
        );
      };
    } else {
      return (Component: React.ComponentType<M>) => {
        return (props: O) => (
          <Consumer>
            {val => {
              const newProps = mapFn(val.ctx, val.setCtx, props);
              return <Component {...props} {...newProps} />;
            }}
          </Consumer>
        );
      };
    }
  };

  return connect;
}
