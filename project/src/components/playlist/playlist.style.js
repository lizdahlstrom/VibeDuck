import { makeStyles } from '@material-ui/styles';

const usePlaylistStyles = makeStyles((theme) => ({
  root: {
    minHeight: '90%',
    marginBottom: theme.spacing(2),
    overflowX: 'hidden',
  },
}));

export default usePlaylistStyles;
