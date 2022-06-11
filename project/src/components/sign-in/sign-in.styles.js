import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  signIn: {
    overflow: 'hidden',
    height: '100vh',
    backgroundSize: '350% 350%',
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
  buttonGrid: {
    marginTop: theme.spacing(3),
  },
  button: {
    borderRadius: '2em',
    fontSize: '1rem',
  },
  logo: {
    opacity: '0.8',
    marginLeft: '-2px',
    height: 250,
    width: 250,
    zIndex: 100,
    filter: `drop-shadow(5px 4px 12px ${theme.palette.primary.main})`,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));

export default useStyles;
