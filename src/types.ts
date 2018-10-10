import { ComponentType } from 'react';
import { SetCtxInnerFn } from './typesInternal';

export interface SetCtx<S extends AllowableStateTypes> {
  (fn: SetCtxInner<S>): void;
}

export type SetCtxInner<S extends AllowableStateTypes> = SetCtxInnerFn<S> | S;

export interface ImmerConnectInjectedProps<S extends AllowableStateTypes> {
  ctx: S;
  setCtx: SetCtx<S>;
}

export interface ImmerConnectProviderProps<S extends AllowableStateTypes> {
  initialState?: S;
  render?: ComponentType<ImmerConnectInjectedProps<S>>;
}

export type AllowableStateTypes = boolean | string | number | any[] | {};
