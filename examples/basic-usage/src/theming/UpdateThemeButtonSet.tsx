import React, { CSSProperties, SFC } from 'react';
import UpdateThemeButton from './UpdateThemeButton';

interface IUpdateThemeButtonSetProps {
  colors: string[];
}
const UpdateThemeButtonSet: SFC<IUpdateThemeButtonSetProps> = props => {
  return (
    <div style={containerStyle}>
      {props.colors.map((i, idx) => {
        return <UpdateThemeButton key={idx} color={i} />;
      })}
    </div>
  );
};

export default UpdateThemeButtonSet;

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: 'white',
  padding: '1em'
};
