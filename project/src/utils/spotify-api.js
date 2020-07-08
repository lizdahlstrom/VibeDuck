import SpotifyApi from 'spotify-web-api-js';
import {
  setAccessTokenCookie,
  removeRefreshCookie,
  getRefreshToken,
  isAuthenticated,
  getAccessToken,
  removeAccessTokenCookie,
} from './cookie-helper';
import { refreshAccessToken, signIn } from './api';

const api = new SpotifyApi();

/**
 * Wrapper function for API calls
 *
 * @param {function} apiCallFunc
 * @returns {function}
 */
const APICallWrapper = function (apiCallFunc) {
  return async function () {
    await getNewTokenIfNeeded();

    try {
      const val = await apiCallFunc.apply(this, arguments);
      return val;
    } catch (err) {
      try {
        // will fix if error is happening because the accessToken is corrupted
        await refreshAccessToken();
        const val = await apiCallFunc.apply(this, arguments);
        return val;
      } catch (err) {
        // clear cookies
        removeAccessTokenCookie();
        removeRefreshCookie();
        signIn();
      }
    }
  };
};

/**
 * 1. Check if the user has no access token
 * 2. Tries to refresh with refresh token
 * 3. If no refresh token, redirects to sign in
 */
const getNewTokenIfNeeded = async () => {
  if (!isAuthenticated()) {
    if (getRefreshToken()) {
      try {
        const refreshedAccessToken = await refreshAccessToken();
        return refreshedAccessToken;
      } catch (err) {
        // clean up invalid refresh cookie
        removeRefreshCookie();
      }
    } else {
      signIn();
    }
  }
};

/**
 * Search Spotify api for tracks
 *
 * @param {string} accessToken
 * @param {string} query
 * @param {number} limit
 * @returns {Array} of found artists
 */
export const searchTracks = APICallWrapper(
  async (accessToken, query, limit = 7) => {
    api.setAccessToken(getAccessToken());
    let data = await api.searchTracks(query, { limit });
    return await data.tracks.items;
  }
);

/**
 *  Search Spotify api for artists
 *
 * @param {string} accessToken
 * @param {string} query
 * @param {number} limit
 * @returns {Array}of found artists if any
 */
export const searchArtists = APICallWrapper(
  async (accessToken, query, limit = 7) => {
    let data;
    api.setAccessToken(getAccessToken());
    data = await api.searchArtists(query, { limit });

    return data.artists.items;
  }
);

/**
 *  Get recommendations based attributes
 *
 * @param {string} accessToken
 * @param {Array} seeds
 * @param {Array} settingAttributes
 * @returns {Array} of recommendations (if any)
 */
export const getRecommendations = APICallWrapper(
  async (accessToken, seeds, settingAttributes) => {
    let data;

    api.setAccessToken(getAccessToken());
    const options = buildRecommendationApiCall(seeds, settingAttributes);
    data = await api.getRecommendations(options);

    return data.tracks;
  }
);

/**
 * Get a list of available genres to use as seeds
 *
 * @param {string} accessToken
 * @returns {Array} of available genres
 */
export const getAvailableGenreSeeds = APICallWrapper(async (accessToken) => {
  api.setAccessToken(accessToken);
  const data = await api.getAvailableGenreSeeds();

  return await data.genres;
});

/**
 * Save a list of tracks as a new public playlist to
 * Spotify library
 *
 * @param {Array} tracks
 * @param {string} playlistName
 */
export const savePlaylistToLib = APICallWrapper(
  async (tracks, playlistName) => {
    if (tracks.length === 0)
      throw new Error('tracks array is empty, there is nothing to save');

    const trackUris = tracks.map((track) => track.uri);

    api.setAccessToken(getAccessToken());
    const me = await api.getMe();
    const name =
      playlistName && typeof playlistName === 'string'
        ? playlistName
        : `${me.display_name}'s vibes`;
    const options = {
      name,
    };

    const playlist = await api.createPlaylist(me.id, options);

    await api.addTracksToPlaylist(playlist.id, trackUris, {}, (err, val) => {
      if (err) {
        throw new Error('could not add to playlist', err);
      }
    });
  }
);

/**
 * Build options object to pass with api call to get recommendations.
 *
 * @param {Array} seeds genres, artists or tracks seeds
 * @param {Array} settings tuneable attributes such as danceability or tempo
 * @param {number} [limit=100] number of results to get
 * @returns {Object}
 */
const buildRecommendationApiCall = (seeds, settings, limit = 100) => {
  const options = {
    limit,
  };

  seeds.forEach((seed) => {
    let property = 'seed_' + seed.seedType.toLowerCase();
    if (options.hasOwnProperty(property)) {
      options[property].push(seed.id);
    } else {
      options[property] = [seed.id];
    }
  });

  const targets = settings.filter((setting) => setting.active === true);

  targets.forEach((target) => {
    let property = 'target_' + target.name;
    options[property] = target.value;
  });

  return options;
};
