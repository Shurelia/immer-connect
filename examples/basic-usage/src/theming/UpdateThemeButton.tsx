import React, { SFC } from 'react';
import { IThemeWriterProps, withThemeWriter } from './store';

interface IUpdateThemeButtonProps extends IThemeWriterProps {
  color: string;
}
const UpdateThemeButton: SFC<IUpdateThemeButtonProps> = props => {
  const { color, setBackgroundColor } = props;
  return (
    <button
      style={{
        backgroundColor: color,
        margin: '0.5em',
        color: props.textColor
      }}
      onClick={() => setBackgroundColor(color)}
    >
      {color}
    </button>
  );
};

export default withThemeWriter(UpdateThemeButton);
