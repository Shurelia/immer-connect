import { ImmerConnectInjectedProps } from 'immer-connect';
import * as React from 'react';
import { basicCounterConnect, IBasicCounterState } from './store';

interface IValueDisplayOwnProps {
  label: string;
}
const ValueDisplayRender: React.SFC<
  ImmerConnectInjectedProps<IBasicCounterState> & IValueDisplayOwnProps
> = props => {
  return (
    <div>
      <div>
        {props.label}: {props.ctx.value}
      </div>
    </div>
  );
};

// Leave connect param empty to pass ctx and setCtx directly to component
export const ValueDisplay = basicCounterConnect()(ValueDisplayRender);
