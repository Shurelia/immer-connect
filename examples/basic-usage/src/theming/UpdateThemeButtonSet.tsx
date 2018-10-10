import * as React from 'react';
import UpdateThemeButton from './UpdateThemeButton';

interface IUpdateThemeButtonSetProps {
  colors: string[];
}
const UpdateThemeButtonSet: React.SFC<IUpdateThemeButtonSetProps> = props => {
  return (
    <div style={containerStyle}>
      {props.colors.map((i, idx) => {
        return <UpdateThemeButton key={idx} color={i} />;
      })}
    </div>
  );
};

export default UpdateThemeButtonSet;

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: 'white',
  padding: '1em'
};
