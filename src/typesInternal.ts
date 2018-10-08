import { Draft } from 'immer';
import { ComponentType } from 'react';
import {
  AllowableStateTypes,
  ImmerConnectInjectedProps,
  ImmerConnectProviderProps,
  SetCtx
} from './types';

export interface ICreateBindings {
  <State extends AllowableStateTypes>(defaultState: State): {
    connect: Connect<State>;
    Provider: ImmerContextProvider<State>;
  };
}

type ImmerContextProvider<S extends AllowableStateTypes> = React.ComponentClass<
  ImmerConnectProviderProps<S>
>;

export interface SetCtxInnerFn<S extends AllowableStateTypes> {
  (draftState: Draft<S>): any;
}

export interface Connect<State extends AllowableStateTypes> {
  <no_map = {}, OwnProps = {}>(): InferrableComponentEnhancer<
    ImmerConnectInjectedProps<State>,
    OwnProps
  >;

  <MapProps = {}, OwnProps = {}>(
    mapToProps: ConnectMap<MapProps, OwnProps, State>
  ): InferrableComponentEnhancer<MapProps, OwnProps>;
}

export interface ConnectMap<
  MapProps = {},
  OwnProps = {},
  State extends AllowableStateTypes = {}
> {
  (ctx: State, setCtx: SetCtx<State>, ownProps: OwnProps): MapProps;
}

// InferrableComponentEnhancer taken from react-redux types
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts
interface InferrableComponentEnhancer<InjectedProps, NeedsProps> {
  <P extends InjectedProps>(Component: ComponentType<P>): ComponentType<
    Omit<P, keyof InjectedProps> & NeedsProps
  >;
}

// Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
type Omit<T, K extends keyof T> = Pick<
  T,
  ({ [P in keyof T]: P } &
    { [P in K]: never } & { [x: string]: never; [x: number]: never })[keyof T]
>;
