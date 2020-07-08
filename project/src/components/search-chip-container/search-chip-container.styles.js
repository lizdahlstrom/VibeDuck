import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  chipContainer: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
