import React, { createContext, useState, useEffect } from 'react';
import {
  getAccessToken,
  setAccessTokenCookie,
  getRefreshToken,
  setRefreshTokenCookie,
  isAuthenticated,
  removeRefreshCookie,
} from '../utils/cookie-helper';
import querystring from 'querystring';
import { refreshAccessToken } from '../utils/api';
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [accessToken, setAccessToken] = useState(getAccessToken() || '');
  const [refreshToken, setRefreshToken] = useState(getRefreshToken() || '');

  const authenticate = async () => {
    if (isAuthenticated()) {
      if (accessToken !== getAccessToken()) setAccessToken(getAccessToken());
      return;
    }

    const tokensFromURI = getTokensFromURI();

    if (tokensFromURI !== null) {
      setRefreshToken(tokensFromURI.refresh_token);
      setAccessToken(tokensFromURI.access_token);
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

  /**
   * Parses the querystring from the URI
   *
   * @returns {string} parsed querystring
   */
  const getTokensFromURI = () => {
    const parsed =
      window.location.search[0] === '?'
        ? querystring.parse(window.location.search.slice(1))
        : querystring.parse(window.location.search);

    if (Object.keys(parsed).length > 0) {
      window.location = '/';
      return parsed;
    }

    return null;
  };

  useEffect(() => {
    if (accessToken !== '') setAccessTokenCookie(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken !== '') setRefreshTokenCookie(refreshToken);
  }, [refreshToken]);

  return (
    <AuthContext.Provider
      value={[accessToken, setAccessToken, setRefreshToken, authenticate]}>
      {props.children}
    </AuthContext.Provider>
  );
};
