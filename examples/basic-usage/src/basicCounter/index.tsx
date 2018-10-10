import * as React from 'react';
import { ClickCountDisplay } from './ClickCountDisplay';
import { BasicCounterProvider } from './store';
import { UpdateController } from './UpdateController';
import { ValueDisplay } from './ValueDisplay';

// initial state can be passed as a prop to the Provider component
// useful for getting async data first to initialize with, among other things
const basicCounterInitialState = {
  value: 0,
  clickCount: 0
};
interface IBasicCounterProps {}
const BasicCounter: React.SFC<IBasicCounterProps> = props => {
  return (
    <BasicCounterProvider initialState={basicCounterInitialState}>
      <div>
        <span>Add or subtract:</span>
        <UpdateController />
        <ValueDisplay label="Value" />
        <ClickCountDisplay label="Click count" />
      </div>
    </BasicCounterProvider>
  );
};

export default BasicCounter;
