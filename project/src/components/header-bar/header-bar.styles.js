import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: theme.palette.background.default,
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  logo: {
    maxWidth: 30,
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
