import * as React from 'react';
import { StringMap } from '../utils';
import { IThemeReaderProps, withThemeReader } from './store';

interface IThemedContainerProps extends IThemeReaderProps {
  style?: React.CSSProperties;
}
const ThemedContainer: React.SFC<IThemedContainerProps> = props => {
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

const styles: StringMap<React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: '1em',
    padding: '1em'
  }
};
