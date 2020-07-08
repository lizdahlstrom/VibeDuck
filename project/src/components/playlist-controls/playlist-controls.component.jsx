import React from 'react';

import { Grid } from '@material-ui/core';
import useStyles from './playlist-controls.styles';
import PlaylistLengthLimiter from '../playlist-length-limiter/playlist-length-limiter.component';
import SaveToLib from '../save-to-lib/save-to-lib.component';

/**
 * Component containing controls for playlist
 */
const PlaylistControls = () => {
  const classes = useStyles();

  return (
    <Grid item container className={classes.root}>
      <Grid item xs={6} sm={5} md={5} lg={6} xl={6}></Grid>
      <Grid
        item
        xs={2}
        sm={3}
        md={3}
        lg={3}
        xl={3}
        align='right'
        className={classes.limiter}>
        <PlaylistLengthLimiter />
      </Grid>
      <Grid
        item
        xs={4}
        sm={4}
        md={4}
        lg={3}
        xl={3}
        className={classes.btnContainer}
        align='right'>
        <SaveToLib />
      </Grid>
    </Grid>
  );
};

export default PlaylistControls;
