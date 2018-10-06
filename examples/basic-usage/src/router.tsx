import { createBindings } from '@shurelia/immer-connect';
import React, { SFC } from 'react';
import BasicCounter from './basicCounter';

export enum ERoutes {
  COUNTER = 'counter'
}

interface IRouterState {
  route: ERoutes;
}

const { Provider } = createBindings<IRouterState>({ route: ERoutes.COUNTER });

// Provider takes a prop 'render' with the type ComponentType<ImmerConnectInjectedProps<State>>,
// letting you directly consume your state, in instances where you want direct access to those values
export const Router: SFC<{}> = () => {
  return (
    <Provider
      render={({ ctx, setCtx }) => {
        const RouteComponent = getRouteComponentForRoute(ctx.route);
        return <RouteComponent />;
      }}
    />
  );
};

const getRouteComponentForRoute = (route: ERoutes): React.ComponentType => {
  switch (route) {
    case ERoutes.COUNTER:
      return BasicCounter;
    default:
      return () => <div>No route here!</div>;
  }
};
