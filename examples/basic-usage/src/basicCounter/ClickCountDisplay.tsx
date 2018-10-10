import * as React from 'react';
import { basicCounterConnect, IBasicCounterState } from './store';

// OwnProps interface defined here to demonstrate that connect
// correctly infers the props that should be passed through
interface IClickCountDisplayOwnProps {
  label: string;
}
const ClickCountDisplayRender: React.SFC<
  IClickCountDisplayOwnProps & IClickCountDisplayMapProps
> = props => {
  return (
    <div>
      <div>
        {props.label}: {props.value}
      </div>
    </div>
  );
};

// Pass a 'map to props' function to connect to get specific things out of state
// Hint: use selectors here!
type IClickCountDisplayMapProps = ReturnType<typeof mapToProps>;
const mapToProps = (s: IBasicCounterState) => ({
  value: s.clickCount
});
export const ClickCountDisplay = basicCounterConnect(mapToProps)(
  ClickCountDisplayRender
);
