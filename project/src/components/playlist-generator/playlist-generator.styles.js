import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    flexDirection: 'row',
    display: 'flex',
  },
  mainContent: {
    flex: '1 0 auto',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  sideContent: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  playlistGenerator: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  tips: {
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  vibes: {
    color: theme.palette.secondary.light,
  },
  header: {
    flexGrow: 1,
    alignSelf: 'flex-start',
    paddingBottom: theme.spacing(0.5),
  },
  footer: {
    alignSelf: 'flex-end',
    flexShrink: '0',
    display: 'flex',
    paddingBottom: '1em',
  },
}));

export default useStyles;
