import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import useStyles from './homepage.styles';
// Components
import HeaderBar from '../components/header-bar/header-bar.component';
import SignIn from '../components/sign-in/sign-in.component';
import PlaylistGenerator from '../components/playlist-generator/playlist-generator.component';
import { element } from 'prop-types';

import AuthenticatedRoutes from '../routes/authenticated-routes';

const HomePage = () => {
  const [accessToken, setAccessToken, setRefreshToken, authenticate] =
    useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <div className={classes.root}>
      <Routes>
        <Route>
          <Route element={<AuthenticatedRoutes />}>
            <Route element={<PlaylistGenerator />} path='/' exact />
          </Route>
        </Route>
        <Route element={<SignIn />} path='/login' exact />
      </Routes>
    </div>
  );
};

export default HomePage;
