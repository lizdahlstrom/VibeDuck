import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  panel: {},
  heading: {
    flexBasis: '80%',
    alignSelf: 'center',
  },
  resetIcon: {
    alignSelf: 'center',
    height: '19px',
    marginLeft: '1em',
    flexShrink: 0,
  },
}));

export default useStyles;
