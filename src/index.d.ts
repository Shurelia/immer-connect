import { Draft } from 'immer';
import { ComponentType } from 'react';

export interface ICreateBindings {
  <State extends AllowableStateTypes>(defaultState: State): {
    connect: Connect<State>;
    Provider: ImmerContextProvider<State>;
  };
}

export const createBindings: ICreateBindings;
export default createBindings;

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

export interface SetCtx<S extends AllowableStateTypes> {
  (fn: SetCtxInnerFn<S>): void;
}

interface SetCtxInnerFn<S extends AllowableStateTypes> {
  (draftState: Draft<S>): void | S;
}

export interface ImmerConnectInjectedProps<S extends AllowableStateTypes> {
  ctx: S;
  setCtx: (fn: SetCtxInnerFn<S>) => void;
}

export interface ImmerConnectProviderProps<S extends AllowableStateTypes> {
  initialState?: S;
}

export type AllowableStateTypes = boolean | string | number | any[] | {};

type ImmerContextProvider<S extends AllowableStateTypes> = React.ComponentClass<
  ImmerConnectProviderProps<S>
>;

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
