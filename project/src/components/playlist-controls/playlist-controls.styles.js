import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& *': {},
  },
  playlistName: {
    height: '100%',
    width: '100%',
  },
  btnSave: {
    height: '100%',
  },
  btnContainer: {
    paddingLeft: theme.spacing(2),
  },
  limiter: {
    paddingLeft: theme.spacing(1),
  }
}));

export default useStyles;
