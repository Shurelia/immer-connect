import { Draft } from 'immer';
import { createBindings } from 'immer-connect';

export interface IBasicCounterState {
  value: number;
  clickCount: number;
}

/**
 * TODO: Maybe include this in return of createBindings as a helper function?
 * const createAction: (
 *   fn: SetCtxInner<IBasicCounterState>
 * ) => SetCtxInner<IBasicCounterState> = fn => fn;
 *
 * Allows us to not have to type 's' as Draft<IBasicCounterState>
 * Usage would be:
 * add: (amount: number) => createAction(s => {
 *   s.value += amount;
 *   s.clickCount += 1;
 * })
 */

export const basicCounterActions = {
  add: (amount: number) => (s: Draft<IBasicCounterState>) => {
    s.value += amount;
    s.clickCount += 1;
  },
  subtract: () => (s: Draft<IBasicCounterState>) => {
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
