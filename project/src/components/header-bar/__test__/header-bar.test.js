import React from 'react';
import { render } from '@testing-library/react';
import HeaderBar from './../header-bar.component';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../../theme';

describe('Header bar component', () => {
  it('renders correctly', () => {
    const { queryByTestId } = render(
      <MuiThemeProvider theme={theme}>
        <HeaderBar />
      </MuiThemeProvider>
    );

    expect(queryByTestId('root')).toBeTruthy();
  });
});
