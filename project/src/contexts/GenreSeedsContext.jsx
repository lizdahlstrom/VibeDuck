import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAvailableGenreSeeds } from '../utils/spotify-api';
import { AuthContext } from './AuthContext';

export const GenreSeedsContext = createContext();

export const GenreSeedsProvider = (props) => {
  const [accessToken] = useContext(AuthContext);
  const [genreSeeds, setGenreSeeds] = useState([]);

  useEffect(() => {
    const initGenreSeeds = async () => {
      const genres = await getAvailableGenreSeeds(accessToken);
      setGenreSeeds(genres);
    };
    initGenreSeeds();
  }, []);

  return (
    <GenreSeedsContext.Provider value={[genreSeeds]}>
      {props.children}
    </GenreSeedsContext.Provider>
  );
};
