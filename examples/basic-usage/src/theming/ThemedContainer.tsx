import React, { CSSProperties, SFC } from 'react';
import { StringMap } from '../utils';
import { IThemeReaderProps, withThemeReader } from './store';

interface IThemedContainerProps extends IThemeReaderProps {
  style?: CSSProperties;
}
const ThemedContainer: SFC<IThemedContainerProps> = props => {
  const themeStyles = { backgroundColor: props.backgroundColor };
  const computedStyles = {
    ...themeStyles,
    ...styles.container,
    ...props.style!
  };
  return <div style={computedStyles}>{props.children}</div>;
};
ThemedContainer.defaultProps = {
  style: {}
};

export default withThemeReader(ThemedContainer);

const styles: StringMap<CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: '1em',
    padding: '1em'
  }
};
