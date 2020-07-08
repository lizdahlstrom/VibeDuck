import React, { createContext, useState, useEffect } from 'react';

export const SearchSeedsContext = createContext();

const STORAGE_NAME = 'seeds';

export const SearchSeedsProvider = (props) => {
  const [selectedSeeds, setSelectedSeeds] = useState(
    JSON.parse(sessionStorage.getItem(STORAGE_NAME)) || []
  );

  useEffect(() => {
    sessionStorage.setItem(STORAGE_NAME, JSON.stringify(selectedSeeds));
  }, [selectedSeeds]);

  return (
    <SearchSeedsContext.Provider value={[selectedSeeds, setSelectedSeeds]}>
      {props.children}
    </SearchSeedsContext.Provider>
  );
};
