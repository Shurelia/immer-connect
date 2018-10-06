import { createBindings, SetCtxInnerFn } from '@shurelia/immer-connect';

export interface IBasicCounterState {
  value: number;
  clickCount: number;
}

export const basicCounterActions: {
  [key: string]: SetCtxInnerFn<IBasicCounterState>;
} = {
  add: s => {
    s.value += 1;
    s.clickCount += 1;
  },
  subtract: s => {
    s.value -= 1;
    s.clickCount += 1;
  }
};

// 'defaultState' passed to createBindings is only used if the connected component doesn't have a parent provider
// in this example, if that's the case, something is wrong!
const { Provider, connect } = createBindings<IBasicCounterState>({
  value: -999,
  clickCount: -999
});

export const BasicCounterProvider = Provider;
export const basicCounterConnect = connect;
