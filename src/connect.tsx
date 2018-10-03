import * as React from 'react';
import {
  AllowableStateTypes,
  Connect,
  ConnectMap,
  ImmerConnectInjectedProps
} from './index.d';

export function createConnect<State extends AllowableStateTypes>(
  Consumer: React.Consumer<ImmerConnectInjectedProps<State>>
) {
  const connect: Connect<State> = <M extends {} = {}, O extends {} = {}>(
    mapFn?: ConnectMap<M, O, State>
  ) => {
    if (mapFn === undefined) {
      return <A extends any>(Component: React.ComponentType<A>) => {
        return (props: A) => (
          <Consumer>
            {val => <Component ctx={val.ctx} setCtx={val.setCtx} {...props} />}
          </Consumer>
        );
      };
    } else {
      return <A extends O>(Component: React.ComponentType<O>) => {
        return (props: A) => (
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
