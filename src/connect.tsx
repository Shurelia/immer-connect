import * as React from 'react';
import { Connect, ImmerContextProps } from './index.d';

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
