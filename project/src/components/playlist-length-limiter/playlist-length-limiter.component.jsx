import React, { useContext, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import useStyles from './playlist-length-limiter.styles';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import { MenuItem } from '@material-ui/core';

const PlaylistLengthLimiter = () => {
  const [
    tracks,
    setTracks,
    fetchedTracks,
    setFetchedTracks,
    length,
    setLength,
  ] = useContext(PlaylistContext);
  const classes = useStyles();

  const updatePlaylistLimit = (event) => {
    const limit = event.target.value;
    setLength(limit);
  };

  return (
    <FormControl variant='outlined' className={classes.root}>
      <InputLabel id='demo-simple-select-outlined-label'>Limit</InputLabel>
      <Select
        labelId='playlist-length-limit'
        id='length-limit'
        value={length}
        onChange={updatePlaylistLimit}
        label='Age'>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={75}>75</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PlaylistLengthLimiter;
