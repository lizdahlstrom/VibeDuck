import React, { useContext } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logo from '../../img/white-logo.png';
import { Grid, Button } from '@material-ui/core';
import useStyles from './header-bar.styles';
import { AuthContext } from '../../contexts/AuthContext';

const HeaderBar = () => {
  const classes = useStyles();
  const [accessToken, setAccessToken, setRefreshToken, authenticate, logOut] =
    useContext(AuthContext);

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.bar} data-testid={'root'}>
        <Toolbar>
          <Grid container>
            <Grid item lg={2} xl={3} />

            <Grid
              container
              item
              xs={12}
              lg={8}
              xl={6}
              direction='row'
              alignItems='center'>
              {/* logo grid */}
              <Grid
                container
                item
                xs={6}
                xl={6}
                direction='row'
                alignItems='center'>
                <Grid item>
                  <img
                    className={classes.logo}
                    src={Logo}
                    alt='VibeDuck logo'
                  />
                </Grid>

                <Grid item>
                  <Typography variant='h6' className={classes.title}>
                    VibeDuck
                  </Typography>
                </Grid>
              </Grid>
              {/* Space  */}
              <Grid item xs={4} xl={2} />

              {/* Log out */}
              <Grid container item xs={2} xl={4} justify='flex-end'>
                <Button
                  onClick={() => {
                    logOut();
                  }}>
                  Log out
                </Button>
              </Grid>
            </Grid>

            <Grid item lg={2} xl={3} />
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderBar;
