import React, { useContext, lazy, Suspense, useState } from 'react';

import List from '@material-ui/core/List';
import usePlaylistStyle from './playlist.style';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import { Divider, Box, useMediaQuery, Slide } from '@material-ui/core';
import LoadingScreen from '../loading-screen/loading-screen.component';
import { PlaybackProvider } from '../../contexts/PlaybackContext';

const Track = lazy(() => import('../track/track.component'));

const Playlist = () => {
  const classes = usePlaylistStyle();
  const [tracks, setTracks, fetchedTracks, setFetchedTracks] = useContext(
    PlaylistContext
  );
  const [deletedTrack, setDeletedTrack] = useState('');
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

  /**
   * Remove track from the playlsit
   *
   * @param {string} id
   */
  const removeTrack = (id) => {
    if (typeof fetchedTracks === 'undefined' || fetchedTracks.length === 0)
      return;

    setFetchedTracks((tracks) =>
      fetchedTracks.filter((track) => track.id !== id)
    );
  };

  return (
    <Box className={classes.root}>
      <PlaybackProvider>
        {fetchedTracks.length <= 0 ? (
          ''
        ) : (
          <Suspense fallback={<LoadingScreen />}>
            <List dense={isSmallScreen} className={classes.list}>
              {tracks.length > 0
                ? tracks.map((track) => (
                    <Slide
                      mountOnEnter
                      unmountOnExit
                      direction='left'
                      style={{ transformOrigin: '0 0 0' }}
                      {...{ timeout: 400 }}
                      appear={false}
                      in={deletedTrack.id !== track.id}
                      onExited={() => removeTrack(track.id)}
                      key={track.id}>
                      <Box>
                        <Track
                          track={track}
                          setDeletedTrack={setDeletedTrack}
                        />
                        <Divider variant='inset' light={true} className={classes.divider} />
                      </Box>
                    </Slide>
                  ))
                : ''}
            </List>
          </Suspense>
        )}
      </PlaybackProvider>
    </Box>
  );
};

export default Playlist;
