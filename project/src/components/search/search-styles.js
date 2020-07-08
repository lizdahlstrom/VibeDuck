import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  input: {
    width: '100%',
  },
  dropdown: {
    '&:hover': {
      cursor: 'default',
      color: green,
    },
    position: 'absolute',
    zIndex: 10,
    flexBasis: '75%',
    minWidth: '400px',
  },
}));

export default useStyles;
