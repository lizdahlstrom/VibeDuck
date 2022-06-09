import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#B39DDB',
    },
    secondary: {
      main: '#ffab40',
    },
    background: {
      default: '#141E30',
      paper: '#3c4559',
    },
    header: '#6a1b9a',
    contrastThreshold: 4,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: '"Catamaran", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontFamily: '"Marmelad","Roboto", "serif"',
      },
      h2: {
        fontFamily: '"Marmelad","Roboto", "serif"',
      },
      h6: {
        fontFamily: '"Marmelad","Roboto", "serif"',
      },
    },
  },
});

export default theme;
