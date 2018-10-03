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
    ImmerContextProps<State>,
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
  (
    ctx: State,
    setCtx: (fn: ImmerContextUpdateFn<State>) => void,
    ownProps: OwnProps
  ): MapProps;
}

export type ImmerContextProvider<
  S extends AllowableStateTypes
> = React.ComponentClass<ImmerContextProviderProps<S>>;

export type ImmerContextUpdateFn<S extends AllowableStateTypes> = (
  draftState: Draft<S>
) => void | S;

export interface ImmerContextProps<S extends AllowableStateTypes> {
  ctx: S;
  setCtx: (fn: ImmerContextUpdateFn<S>) => void;
}

export interface ImmerContextProviderProps<S extends AllowableStateTypes> {
  initialState?: S;
}

export type AllowableStateTypes = boolean | string | number | any[] | {};

// InferrableComponentEnhancer taken from react-redux types
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts
export interface InferrableComponentEnhancer<InjectedProps, NeedsProps> {
  <P extends InjectedProps>(Component: ComponentType<P>): ComponentType<
    Omit<P, keyof InjectedProps> & NeedsProps
  >;
}

// Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
export type Omit<T, K extends keyof T> = Pick<
  T,
  ({ [P in keyof T]: P } &
    { [P in K]: never } & { [x: string]: never; [x: number]: never })[keyof T]
>;
