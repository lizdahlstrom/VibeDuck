import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    paddingLeft: '0',
    '&:hover $listText': {
      color: theme.palette.secondary.light,
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '40px',
    minHeight: '40px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(1),
  },
  listText: {
    paddingRight: theme.spacing(8.5),
  },
  listIcon: {
    height: 25,
    width: 25,
    color: theme.palette.text.secondary,
  },
}));

export default useStyles;
