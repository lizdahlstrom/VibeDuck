import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  signIn: {
    overflow: 'hidden',
    height: '100vh',
    backgroundSize: '400% 400%',
    background: 'linear-gradient(0deg, #222831, #243B55, #141E30)',
  },
  '@keyframes gradient': {
    '0%:': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
  title: {},
  buttonGrid: {
    marginTop: theme.spacing(3),
  },
  button: {
    borderRadius: '2em',
    fontSize: '1rem',
  },
  logo: {
    opacity: '0.8',
    height: 250,
    width: 250,
    boxShadow: `rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15p`,
    zIndex: 100,
    filter: `drop-shadow(5px 4px 20px ${theme.palette.primary.main})`,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));

export default useStyles;
