import React, { useEffect, useContext } from 'react';

import { Grid, Typography, Fade } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import 'firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';
import useStyles from './sign-in.styles';
import Logo from '../../img/vibeduck-logo.png';
import { signIn } from '../../utils/api';

const SignIn = () => {
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
    <Grid
      className={classes.root}
      container
      spacing={0}
      justify='center'
      direction='column'
      alignItems='center'>
      <Grid item>
        <Fade
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...{ timeout: 1000 }}>
          <img className={classes.logo} src={Logo} alt='VibeDuck logo' />
        </Fade>
      </Grid>
      <Grid item className={classes.title}>
        <Typography variant='h2'>VibeDuck</Typography>
      </Grid>
      <Grid item>
        <Typography variant='subtitle1'>
          Generate your own tailor-made playlists!
        </Typography>
      </Grid>
      <Grid item className={classes.button}>
        <Button color='primary' variant='contained' onClick={signIn}>
          Log in with Spotify
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignIn;
