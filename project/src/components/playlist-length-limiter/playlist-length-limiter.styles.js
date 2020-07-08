import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  select: {
    color: green,
    '& option': {
      background: green,
      color: green,
      '&:hover': {
        background: theme.palette.action.hover,
      },
    },
  },
}));

export default useStyles;
