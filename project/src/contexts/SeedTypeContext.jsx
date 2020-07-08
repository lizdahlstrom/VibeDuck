import React, { createContext, useState } from 'react';
import SeedType from '../constants/seed-type';

export const SeedTypeContext = createContext();

export const SeedTypeProvider = (props) => {
  const [seedType, setSeedType] = useState(SeedType.TRACK);

  const toString = () => {
    let str = '';

    switch (seedType) {
      case SeedType.ARTIST:
        str = 'artist';
        break;
      case SeedType.GENRE:
        str = 'genre';
        break;
      case SeedType.TRACK:
        str = 'track';
        break;
      default:
        throw new Error(
          'Cannot return toString of invalid SeedType :' + seedType
        );
    }

    return str;
  };

  return (
    <SeedTypeContext.Provider value={[seedType, toString, setSeedType]}>
      {props.children}
    </SeedTypeContext.Provider>
  );
};

export default SeedTypeContext;
