import * as React from 'react';
import { IThemeReaderProps, withThemeReader } from './store';

interface IThemedTextProps extends IThemeReaderProps {}
const ThemedText: React.SFC<IThemedTextProps> = props => {
  return (
    <div style={{ color: props.textColor, textAlign: 'center' }}>
      {props.children}
    </div>
  );
};

export default withThemeReader(ThemedText);
