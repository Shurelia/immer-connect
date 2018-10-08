import React, { SFC } from 'react';
import { IThemeWriterProps, withThemeWriter } from './store';

interface IUpdateThemeSelectProps extends IThemeWriterProps {
  colors: string[];
}
const UpdateThemeSelect: SFC<IUpdateThemeSelectProps> = props => {
  const colorOptions = props.colors.map((i, idx) => {
    return (
      <option key={idx} value={i} style={{ backgroundColor: i }}>
        {i}
      </option>
    );
  });
  const defaultOption = <option key="default" value={undefined} />;
  return (
    <select
      onChange={v =>
        v.currentTarget.value && props.setBackgroundColor(v.currentTarget.value)
      }
      style={{ width: '50%' }}
    >
      {[defaultOption, ...colorOptions]}
    </select>
  );
};

export default withThemeWriter(UpdateThemeSelect);
