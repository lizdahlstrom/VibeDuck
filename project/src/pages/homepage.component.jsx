import React, { useContext } from 'react';
import SignIn from '../components/sign-in/sign-in.component';
import { AuthContext } from '../contexts/AuthContext';
import PlaylistGenerator from '../components/playlist-generator/playlist-generator.component';
import useStyles from './homepage.styles';
import HeaderBar from '../components/header-bar/header-bar.component';

const HomePage = () => {
  const [accessToken] = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {accessToken ? <PlaylistGenerator /> : <SignIn />}
    </div>
  );
};

export default HomePage;
