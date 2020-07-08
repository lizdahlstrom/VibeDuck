import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    '&:hover': {
      background: theme.palette.action.hover,
    },
  },
}));

export default useStyles;
