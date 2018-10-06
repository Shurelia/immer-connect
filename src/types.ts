import { Draft } from 'immer';
import { ComponentType } from 'react';

export interface SetCtx<S extends AllowableStateTypes> {
  (fn: SetCtxInnerFn<S>): void;
}

export interface SetCtxInnerFn<S extends AllowableStateTypes> {
  (draftState: Draft<S>): void | S;
}

export interface ImmerConnectInjectedProps<S extends AllowableStateTypes> {
  ctx: S;
  setCtx: (fn: SetCtxInnerFn<S>) => void;
}

export interface ImmerConnectProviderProps<S extends AllowableStateTypes> {
  initialState?: S;
  render?: ComponentType<ImmerConnectInjectedProps<S>>;
}

export type AllowableStateTypes = boolean | string | number | any[] | {};
