import { createBindings, SetCtx } from '@ecurry/immer-connect';
import { Draft } from 'immer';

export interface IThemeState {
  backgroundColor: string;
  textColor: string;
}

const initialState: IThemeState = {
  backgroundColor: 'lightgreen',
  textColor: 'black'
};

const { Provider, connect } = createBindings(initialState);

export const ThemeProvider = Provider;

const actions = {
  setBackgroundColor: (color: string) => (s: Draft<IThemeState>) =>
    (s.backgroundColor = color)
};

const mapReadToProps = (ctx: IThemeState) => ({ ...ctx });
// Reusable data-providing 'container' components can be generated from the first function call of connect
// This enables the common container/presentational component pattern, decoupling state from presentation
// ...and it's also nice not having to generate a new mapToProps function & interface for every component
export const withThemeReader = connect(mapReadToProps);
export type IThemeReaderProps = ReturnType<typeof mapReadToProps>;

const mapWriteToProps = (ctx: IThemeState, setCtx: SetCtx<IThemeState>) => ({
  ...ctx,
  setBackgroundColor: (c: string) => setCtx(actions.setBackgroundColor(c))
});
export const withThemeWriter = connect(mapWriteToProps);
export type IThemeWriterProps = ReturnType<typeof mapWriteToProps>;
