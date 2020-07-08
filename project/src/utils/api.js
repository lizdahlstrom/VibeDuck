import { getRefreshToken, setAccessTokenCookie } from './cookie-helper';

const API_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

/**
 * Redirect to login url
 */
export const signIn = () => {
  window.location = API_URI + '/login';
};

/**
 * Refresh the access token using the existing refresh token
 *
 *@throws {Error} if the access token couldn't be refreshed
 * @returns {string} a new access token
 */
export const refreshAccessToken = async () => {
  if (!getRefreshToken()) {
    throw new Error('cant refresh access token without refresh token');
  }

  const reqOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: getRefreshToken() }),
  };

  const response = await fetch(API_URI + '/refresh_token', reqOptions);
  const responseJson = await response.json();

  if (responseJson.error)
    throw new Error('could not refresh token', responseJson.error);

  setAccessTokenCookie(responseJson.access_token);

  return responseJson.access_token;
};
