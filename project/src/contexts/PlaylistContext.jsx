import React, { createContext, useState, useEffect } from 'react';

export const PlaylistContext = createContext();

const FETCHED_STORAGE_NAME = 'fetched';
const PLAYLIST_STORAGE_NAME = 'playlist';
const LENGTH_STORAGE_NAME = 'playlistLength';

export const PlaylistProvider = (props) => {
  const [length, setLength] = useState(
    JSON.parse(sessionStorage.getItem(LENGTH_STORAGE_NAME)) || 25
  );
  const [tracks, setTracks] = useState(
    JSON.parse(sessionStorage.getItem(PLAYLIST_STORAGE_NAME)) || []
  );
  const [fetchedTracks, setFetchedTracks] = useState(
    JSON.parse(sessionStorage.getItem(FETCHED_STORAGE_NAME)) || []
  );

  useEffect(() => {
    sessionStorage.setItem(PLAYLIST_STORAGE_NAME, JSON.stringify(tracks));
  }, [tracks]);

  useEffect(() => {
    setTracks([...fetchedTracks].slice(0, length));
    sessionStorage.setItem(FETCHED_STORAGE_NAME, JSON.stringify(fetchedTracks));
    sessionStorage.setItem(LENGTH_STORAGE_NAME, JSON.stringify(length));
  }, [length, fetchedTracks]);

  return (
    <PlaylistContext.Provider
      value={[
        tracks,
        setTracks,
        fetchedTracks,
        setFetchedTracks,
        length,
        setLength,
      ]}>
      {props.children}
    </PlaylistContext.Provider>
  );
};
