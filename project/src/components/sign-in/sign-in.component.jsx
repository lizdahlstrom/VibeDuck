import React, { useEffect, useContext } from 'react';

import { Grid, Typography, Fade, Grow, Slide, Zoom } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import 'firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';
import useStyles from './sign-in.styles';
import Logo from '../../img/vibeduck-logo.png';
import { signIn } from '../../utils/api';

const SignIn = () => {
  const classes = useStyles();
  const [accessToken, setAccessToken, setRefreshToken, authenticate] =
    useContext(AuthContext);

  return (
    <Grid
      className={classes.signIn}
      container
      justify='center'
      direction='row'
      alignItems='center'>
      <Grid
        item
        container
        direction='row'
        alignItems='center'
        justify='center'
        className={classes.title}>
        <Grid item>
          <Fade in={true} timeout={1000}>
            <img className={classes.logo} src={Logo} alt='VibeDuck logo' />
          </Fade>
        </Grid>
        <Grid item className={classes.titleContainer} direction='column'>
          <Grow in={true} timeout={700}>
            <Typography variant='h2'>VibeDuck</Typography>
          </Grow>
          <Zoom in={true} timeout={700}>
            <Typography variant='subtitle1'>
              Generate your own tailor-made playlists!
            </Typography>
          </Zoom>

          <Grid item className={classes.buttonGrid}>
            <Grow in={true} timeout={1000}>
              <Button
                className={classes.button}
                color='primary'
                size='medium'
                variant='contained'
                onClick={signIn}>
                Log in with Spotify
              </Button>
            </Grow>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignIn;
