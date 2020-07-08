import React, { useContext } from 'react';

import { Button } from '@material-ui/core';
import { SearchSeedsContext } from '../../contexts/SearchSeedsContext';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import { AuthContext } from '../../contexts/AuthContext';
import { SettingsContext } from '../../contexts/SettingsContext';
import useStyles from './generate-button.styles';
import { getRecommendations } from '../../utils/spotify-api';

const GenerateButton = () => {
  const classes = useStyles();
  const [accessToken] = useContext(AuthContext);
  const [selectedSeeds] = useContext(SearchSeedsContext);
  const [
    tracks,
    setTracks,
    fetchedTracks,
    setFetchedTracks,
  ] = useContext(PlaylistContext);
  const [settings] = useContext(SettingsContext);
  const canGenerate = selectedSeeds.length > 0;

  const handleButtonClick = async () => {
    if (!canGenerate) return;

    const newPlaylist = await getRecommendations(
      accessToken,
      selectedSeeds,
      settings
    );

    setFetchedTracks(newPlaylist);
    return fetchedTracks;
  };

  return (
    <Button
      variant='contained'
      disabled={!canGenerate}
      color='primary'
      onClick={() => handleButtonClick()}
      className={classes.root}>
      Generate
    </Button>
  );
};

export default GenerateButton;
