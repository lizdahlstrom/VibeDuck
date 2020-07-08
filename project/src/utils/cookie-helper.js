import Cookies from 'js-cookie';

const ACCESS_COOKIE_NAME = 'access_token';
const REFRESH_COOKIE_NAME = 'refresh_token';

/**
 * Validate token to be a string
 *
 * @throws {TypeError} if the param is not a string
 * @param {string} token
 */
const validateToken = (token) => {
  if (typeof token !== 'string')
    throw new TypeError('token of cookie needs to be a string, instead found');
};

export const getAccessToken = () => Cookies.get(ACCESS_COOKIE_NAME);
export const getRefreshToken = () => Cookies.get(REFRESH_COOKIE_NAME);
export const isAuthenticated = () => (getAccessToken() ? true : false);

/**
 * Set new refresh token cookie
 *
 * @param {string} token
 */
export const setRefreshTokenCookie = (token) => {
  if (token === getRefreshToken()) return;
  validateToken(token);

  Cookies.set(REFRESH_COOKIE_NAME, token, { sameSite: 'lax', expires: '' });
};

/**
 * Set new access token cookie
 *
 * @param {string} token
 */
export const setAccessTokenCookie = (token) => {
  if (token === getAccessToken()) return;
  validateToken(token);

  Cookies.set(ACCESS_COOKIE_NAME, token, {
    sameSite: 'lax',
    expires: inAnHour(),
  });
};

/**
 * Remove the current refresh token cookie
 */
export const removeAccessTokenCookie = () => {
  Cookies.remove(ACCESS_COOKIE_NAME);
};

/**
 * Remove the current refresh token cookie
 */
export const removeRefreshCookie = () => {
  Cookies.remove(REFRESH_COOKIE_NAME);
};

export const inAnHour = () => {
  const expires = 3600000;
  return new Date(new Date().getTime() + expires);
};
