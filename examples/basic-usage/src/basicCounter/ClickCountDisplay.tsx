import React from 'react';
import { basicCounterConnect, IBasicCounterState } from './store';

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
