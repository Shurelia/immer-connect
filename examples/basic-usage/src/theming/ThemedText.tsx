import {
  IThemeReaderProps,
  withThemeReader
} from '@shurelia/immer-connect/examples/basic-usage/src/theming/store';
import React, { SFC } from 'react';

interface IThemedTextProps extends IThemeReaderProps {}
const ThemedText: SFC<IThemedTextProps> = props => {
  return (
    <div style={{ color: props.textColor, textAlign: 'center' }}>
      {props.children}
    </div>
  );
};

export default withThemeReader(ThemedText);
