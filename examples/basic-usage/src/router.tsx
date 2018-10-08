import { createBindings } from '@ecurry/immer-connect';
import React, { SFC } from 'react';
import BasicCounter from './basicCounter';
import ThemeExample from './theming';

export enum ERoutes {
  COUNTER = 'basic-counter',
  THEME = 'theme-provider'
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
        return (
          <div>
            <RouteController setRoute={route => setCtx({ route })} />
            <RouteComponent />
          </div>
        );
      }}
    />
  );
};

interface IRouteControllerProps {
  setRoute: (route: ERoutes) => void;
}
const RouteController: SFC<IRouteControllerProps> = props => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '2em' }}>
      Examples:
      {Object.values(ERoutes).map((i: ERoutes) => {
        return (
          <button key={i} onClick={() => props.setRoute(i)}>
            {i}
          </button>
        );
      })}
    </div>
  );
};

const getRouteComponentForRoute = (route: ERoutes): React.ComponentType => {
  switch (route) {
    case ERoutes.COUNTER:
      return BasicCounter;
    case ERoutes.THEME:
      return ThemeExample;
    default:
      return () => <div>No route here!</div>;
  }
};
