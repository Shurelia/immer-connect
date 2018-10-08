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
  ctx: IBasicCounterState,
  setCtx: SetCtx<IBasicCounterState>
) => ({
  add: () => setCtx(basicCounterActions.add(1)),
  subtract: () => setCtx(basicCounterActions.subtract())
});
export const UpdateController = basicCounterConnect(mapToProps)(
  UpdateControllerRender
);
