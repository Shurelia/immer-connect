import * as React from 'react';
import { AllowableStateTypes, Connect, ImmerContextProps } from './index.d';

export function createConnect<State extends AllowableStateTypes>(
  Consumer: React.Consumer<ImmerContextProps<any>>
) {
  const connect: Connect<State> = Component => {
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
