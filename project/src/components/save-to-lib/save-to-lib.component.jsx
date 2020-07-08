import React, { useContext, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import useStyles from './save-to-lib.styles';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../../contexts/AuthContext';
import { savePlaylistToLib } from '../../utils/spotify-api';

const SaveToLib = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const classes = useStyles();
  const [tracks] = useContext(PlaylistContext);
  const [accessToken] = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const openDialogBox = () => {
    if (tracks.length < 1) {
      enqueueSnackbar("Can't save an empty playlist", { variant: 'error' });
      return;
    }
    setDialogOpen(true);
  };

  const closeDialogBox = () => {
    setDialogOpen(false);
  };

  /**
   * Try to save playlist to library and display a snackbar
   * depending on success/fail
   */
  const handleSave = async () => {
    try {
      await save(playlistName);
      enqueueSnackbar("Added playlist to library. Keep vibin~'", {
        variant: 'success',
      });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }

    setPlaylistName('');
    setDialogOpen(false);
  };

  const save = async (playlistName) => {
    if (!accessToken || tracks.length === 0) return;

    await savePlaylistToLib(tracks, playlistName);
  };

  return (
    <div className={classes.btnSave}>
      <Button
        disabled={tracks.length < 1 ? true : false}
        variant='outlined'
        color='primary'
        onClick={openDialogBox}
        className={classes.btnSave}>
        Save to library
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={closeDialogBox}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Save playlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Playlist name'
            type='text'
            fullWidth
            placeholder='My awesome vibes~'
            onChange={(event) => {
              setPlaylistName(event.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') handleSave();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogBox} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SaveToLib;
