import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

const LoadingScreen = () => {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: '100vh' }}>
      <Grid item xs={5}>
        <CircularProgress size={65} />
      </Grid>
    </Grid>
  );
};

export default LoadingScreen;
