import React, { useContext, useEffect, lazy, Suspense } from 'react';

import { Typography, Grid, Box } from '@material-ui/core';
import { SearchSeedsProvider } from '../../contexts/SearchSeedsContext';
import { SeedTypeProvider } from '../../contexts/SeedTypeContext';
import { PlaylistProvider } from '../../contexts/PlaylistContext';
import { SettingsProvider } from '../../contexts/SettingsContext';
import { AuthContext } from '../../contexts/AuthContext';
import { GenreSeedsProvider } from '../../contexts/GenreSeedsContext';
import LoadingScreen from '../loading-screen/loading-screen.component';
import useStyles from './playlist-generator.styles';
import Footer from '../footer/footer.component';

const Search = lazy(() => import('../search/search.component'));
const SearchChipContainer = lazy(() =>
  import('../search-chip-container/search-chip-container.component')
);
const HeaderBar = lazy(() => import('../header-bar/header-bar.component'));
const Playlist = lazy(() => import('../playlist/playlist.component'));
const GenerateButton = lazy(() =>
  import('../generate-button/generate-button.component')
);
const GenerationSettings = lazy(() =>
  import('../generation-settings/generation-settings.component')
);
const PlaylistControls = lazy(() =>
  import('../playlist-controls/playlist-controls.component')
);

const PlaylistGenerator = () => {
  const classes = useStyles();
  const [
    accessToken,
    setAccessToken,
    setRefreshToken,
    authenticate,
  ] = useContext(AuthContext);

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <SearchSeedsProvider>
      <PlaylistProvider>
        <SettingsProvider>
          <Suspense fallback={<LoadingScreen />}>
            <Grid container direction='row' className={classes.root}>
              {/* Main content */}
              <Grid
                item
                container
                className={classes.mainContent}
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}>
                <SeedTypeProvider>
                  <GenreSeedsProvider>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      className={classes.header}>
                      <HeaderBar />
                    </Grid>
                    {/* Side content */}
                    <Grid item xs={false} sm={false} md={false} lg={2} xl={3} />
                    <Grid
                      className={classes.sideContent}
                      item
                      container
                      direction='column'
                      xs={12}
                      sm={12}
                      md={4}
                      lg={3}
                      xl={2}>
                      <Box className={classes.tips}>
                        <Typography variant='body1' display='inline'>
                          Add{' '}
                        </Typography>
                        <Typography
                          display='inline'
                          variant='body1'
                          className={classes.vibes}>
                          seeds{' '}
                        </Typography>
                        <Typography variant='body1' display='inline'>
                          and tweak the settings below to generate a playlist.
                        </Typography>
                      </Box>
                      <Search />
                      <SearchChipContainer />
                      <GenerateButton />
                      <GenerationSettings />
                      {/* Other settings */}
                    </Grid>
                  </GenreSeedsProvider>
                </SeedTypeProvider>

                {/* Current Playlist */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={8}
                  lg={5}
                  xl={4}
                  className={classes.playlistGenerator}>
                  <PlaylistControls />
                  <Suspense fallback={<div>loading playlist...</div>}>
                    <Playlist />
                  </Suspense>
                </Grid>

                <Grid item xs={false} sm={false} md={false} lg={2} xl={3} />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                className={classes.footer}>
                <Footer />
              </Grid>
            </Grid>
          </Suspense>
        </SettingsProvider>
      </PlaylistProvider>
    </SearchSeedsProvider>
  );
};

export default PlaylistGenerator;
