import * as React from 'react';
import { ImmerContextProps, Omit } from './types';

type IsDeclared<O, I> = O extends undefined ? I : O;

export function createConnect<DeclaredContext>(
  Consumer: React.Consumer<ImmerContextProps<any>>
) {
  const connect: Connect<DeclaredContext> = Component => {
    return props => (
      <Consumer>
        {val => (
          <Component state={val.state} setState={val.setState} {...props} />
        )}
      </Consumer>
    );
  };

  return connect;
}

export interface Connect<DeclaredContext> {
  <Context extends DeclaredContext, OwnProps>(
    Component: React.StatelessComponent<OwnProps & ImmerContextProps<Context>>
  ): React.ComponentType<
    Omit<OwnProps, Extract<keyof OwnProps, keyof ImmerContextProps<{}>>>
  >;
}
