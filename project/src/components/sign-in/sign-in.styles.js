import { makeStyles } from '@material-ui/styles';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  title: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
  },
  logo: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(10),
    height: 250,
    filter: `drop-shadow(5px 4px 30px ${theme.palette.primary.main})`,
    zIndex: 100,
  },
}));

export default useStyles;
