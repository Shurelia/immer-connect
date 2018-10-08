import * as React from 'react';
import { ThemeProvider } from './store';
import ThemedContainer from './ThemedContainer';
import ThemedText from './ThemedText';
import UpdateThemeButtonSet from './UpdateThemeButtonSet';
import UpdateThemeSelect from './UpdateThemeSelect';

interface IThemeExampleProps {}
const ThemeExample: React.SFC<IThemeExampleProps> = props => {
  return (
    <ThemeProvider>
      <div style={containerStyle}>
        <ThemedContainer style={{ flex: 1 }}>
          <ThemedText>
            Connected components under the same Provider share the same state.
          </ThemedText>
          <UpdateThemeButtonSet
            colors={['lightblue', 'lightpink', 'lightgreen']}
          />
        </ThemedContainer>
        <ThemedContainer style={{ flex: 1 }}>
          <ThemedText>
            Both of these sibling inputs read from and control the state
            provided by their parent Provider.
          </ThemedText>
          <UpdateThemeSelect colors={['plum', 'coral', 'aquamarine']} />
          <ThemeProvider
            initialState={{ backgroundColor: 'maroon', textColor: 'white' }}
          >
            <ThemedContainer style={{ width: '80%', height: '50%' }}>
              <ThemedText>
                However, instances of the Provider component each provide their
                own copy of state.
              </ThemedText>
              <ThemedText>
                Connected components look upwards in the component tree for the
                nearest parent Provider.
              </ThemedText>
              <UpdateThemeButtonSet
                colors={['midnightblue', 'black', 'maroon', 'forestgreen']}
              />
            </ThemedContainer>
          </ThemeProvider>
        </ThemedContainer>
      </div>
    </ThemeProvider>
  );
};

export default ThemeExample;

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  height: '30em',
  fontFamily: 'Arial'
};
