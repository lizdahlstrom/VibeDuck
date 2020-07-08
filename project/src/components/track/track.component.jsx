import React, { useState, useEffect, useContext } from 'react';

import useStyles from './track.styles';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Avatar,
  ListItemSecondaryAction,
  Grow,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { PlaybackContext } from '../../contexts/PlaybackContext';
import AvatarPlaceholder from '../../img/avatar-placeholder-dark.png';

const Track = ({ track, setDeletedTrack }) => {
  const classes = useStyles();
  const [audio, setAudio] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio, play, setPlay] = useContext(
    PlaybackContext
  );

  const toggle = () => {
    // set the current audio and play it if needed
    if (currentAudio !== audio) setCurrentAudio(audio);
    setIsPlaying(!isPlaying);

    setPlay(!isPlaying);
  };

  // sets audio if it has one
  useEffect(() => {
    let res = false;

    if (track.preview_url) {
      const trackAudio = new Audio(track.preview_url + '.mp3');
      const canPlay = trackAudio.canPlayType('audio/mpeg');
      if (canPlay !== '') res = trackAudio;
    }

    setAudio(res);
  }, []);

  useEffect(() => {
    if (currentAudio !== audio || !play) {
      setIsPlaying(false);
    }
  }, [currentAudio, play]);

  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  return (
    <ListItem button className={classes.root}>
      <ListItemAvatar>
        {track.album.images[0] ? (
          <Grow
            in={hasImageLoaded}
            style={{ transformOrigin: '0 0 0' }}
            {...{ timeout: 1000 }}>
            <Avatar
              alt='album cover'
              variant='rounded'
              src={track.album.images[0].url}
              imgProps={{
                onLoad: () => {
                  setHasImageLoaded(true);
                },
                hidden: !hasImageLoaded,
              }}
            />
          </Grow>
        ) : (
          <Grow
            in={true}
            style={{ transformOrigin: '0 0 0' }}
            {...{ timeout: 1000 }}>
            <Avatar
              variant='rounded'
              className={classes.cover}
              src={AvatarPlaceholder}
            />
          </Grow>
        )}
      </ListItemAvatar>
      <ListItemText
        className={classes.listText}
        primary={`${track.name}`}
        secondary={`${track.artists[0].name}`}
      />
      <ListItemSecondaryAction className={classes.control}>
        <div>
          {audio ? (
            <IconButton
              aria-label='play/pause'
              onClick={() => {
                toggle();
              }}>
              {isPlaying && currentAudio === audio ? (
                <PauseIcon className={classes.listIcon} />
              ) : (
                <PlayArrowIcon className={classes.listIcon} />
              )}
            </IconButton>
          ) : (
            ''
          )}
          <IconButton
            aria-label='delete'
            onClick={() => {
              setDeletedTrack(track);
            }}>
            <DeleteOutlineIcon className={classes.listIcon} />
          </IconButton>
        </div>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Track;
