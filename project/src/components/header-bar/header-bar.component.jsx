import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logo from '../../img/white-logo.png';
import { Grid } from '@material-ui/core';
import useStyles from './header-bar.styles';

const HeaderBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.bar} data-testid={'root'}>
        <Toolbar>
          <Grid container>
            <Grid item lg={2} xl={3} />
            <Grid container item xs={12} lg={5} xl={7} direction='row'>
              <Grid item>
                <img className={classes.logo} src={Logo} alt='VibeDuck logo' />
              </Grid>
              <Grid item>
                <Typography variant='h6' className={classes.title}>
                  VibeDuck
                </Typography>
              </Grid>
            </Grid>
            <Grid item xl={2} />
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderBar;
