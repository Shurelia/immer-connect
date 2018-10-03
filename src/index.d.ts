import { Draft } from 'immer';
import { Component, ComponentClass, ComponentType } from 'react';

export interface ICreateBindings {
  <State>(defaultState: State): {
    connect: Connect<State>;
    Provider: ImmerContextProvider<State>;
  };
}

export const createBindings: ICreateBindings;
export default createBindings;

export interface Connect<State> {
  <Context extends State, OwnProps>(
    Component: React.StatelessComponent<OwnProps & ImmerContextProps<Context>>
  ): React.ComponentType<
    Omit<OwnProps, Extract<keyof OwnProps, keyof ImmerContextProps<{}>>>
  >;
}

export type ImmerContextProvider<S> = React.ComponentClass<
  ImmerContextProviderProps<S>
>;

export type ImmerContextUpdateFn<S> = (draftState: Draft<S>) => void | S;

export interface ImmerContextProps<S> {
  state: S;
  setState: (fn: ImmerContextUpdateFn<S>) => void;
}

export interface ImmerContextProviderProps<S> {
  initialState: S;
}

export interface InferrableComponentEnhancer<InjectedProps, NeedsProps> {
  <P extends InjectedProps>(Component: P): ComponentType<
    Omit<P, keyof InjectedProps> & NeedsProps
  > & { WrappedComponent: Component<P> };
}

// Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
export type Omit<T, K extends keyof T> = Pick<
  T,
  ({ [P in keyof T]: P } &
    { [P in K]: never } & { [x: string]: never; [x: number]: never })[keyof T]
>;

export type Matching<InjectedProps, DecorationTargetProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends DecorationTargetProps[P]
      ? DecorationTargetProps[P]
      : InjectedProps[P]
    : DecorationTargetProps[P]
};

export type GetProps<C> = C extends ComponentType<infer P> ? P : never;

export type ConnectedComponentClass<C, P> = ComponentClass<
  JSX.LibraryManagedAttributes<C, P>
>;

export type Shared<
  InjectedProps,
  DecorationTargetProps extends Shared<InjectedProps, DecorationTargetProps>
> = {
  [P in Extract<
    keyof InjectedProps,
    keyof DecorationTargetProps
  >]?: InjectedProps[P] extends DecorationTargetProps[P]
    ? DecorationTargetProps[P]
    : never
};

export interface InferableComponentEnhancerWithProps<
  TInjectedProps,
  TNeedsProps
> {
  <C extends ComponentType<Matching<TInjectedProps, GetProps<C>>>>(
    component: C
  ): ConnectedComponentClass<
    C,
    Omit<GetProps<C>, keyof Shared<TInjectedProps, GetProps<C>>> & TNeedsProps
  >;
}