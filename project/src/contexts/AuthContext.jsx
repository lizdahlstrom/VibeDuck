import React, { createContext, useState, useEffect } from 'react';
import {
  getAccessToken,
  setAccessTokenCookie,
  getRefreshToken,
  setRefreshTokenCookie,
  isAuthenticated,
  removeRefreshCookie,
  removeAccessTokenCookie,
} from '../utils/cookie-helper';
import querystring from 'querystring';
import { refreshAccessToken } from '../utils/api';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [accessToken, setAccessToken] = useState(getAccessToken() || '');
  const [refreshToken, setRefreshToken] = useState(getRefreshToken() || '');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const logOut = () => {
    removeAccessTokenCookie();
    removeRefreshCookie();
    navigate('/login');
  };

  const authenticate = async () => {
    console.log('call auth');
    if (getAccessToken() && getAccessToken() !== accessToken) {
      setAccessToken(getAccessToken());
      return;
    }

    const aToken = searchParams.get('access_token');
    const rToken = searchParams.get('refresh_token');

    if (aToken !== null) setAccessToken(aToken);
    if (rToken !== null) {
      setRefreshToken(rToken);
      return;
    }

    if (getRefreshToken()) {
      try {
        const refreshedAccessToken = await refreshAccessToken();

        setAccessToken(refreshedAccessToken);
      } catch (err) {
        removeRefreshCookie();
      }
    }
  };

  useEffect(() => {
    navigate('/');
  }, []);

  useEffect(() => {
    if (accessToken !== '') setAccessTokenCookie(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken !== '') setRefreshTokenCookie(refreshToken);
  }, [refreshToken]);

  return (
    <AuthContext.Provider
      value={[
        accessToken,
        setAccessToken,
        setRefreshToken,
        authenticate,
        logOut,
      ]}>
      {props.children}
    </AuthContext.Provider>
  );
};
