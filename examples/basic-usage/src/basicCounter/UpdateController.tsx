import { SetCtx } from '@shurelia/immer-connect';
import React, { SFC } from 'react';
import {
  basicCounterActions,
  basicCounterConnect,
  IBasicCounterState
} from './store';

const UpdateControllerRender: SFC<IUpdateControllerProps> = props => {
  return (
    <div>
      <button onClick={props.subtract}>-</button>
      <button onClick={props.add}>+</button>
    </div>
  );
};

type IUpdateControllerProps = ReturnType<typeof mapToProps>;
const mapToProps = (
  s: IBasicCounterState,
  set: SetCtx<IBasicCounterState>
) => ({
  add: () => set(basicCounterActions.add),
  subtract: () => set(basicCounterActions.subtract)
});
export const UpdateController = basicCounterConnect(mapToProps)(
  UpdateControllerRender
);
