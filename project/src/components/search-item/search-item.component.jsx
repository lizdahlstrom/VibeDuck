import React from 'react';
import useStyles from './search-item.styles';
import SeedType from '../../constants/seed-type';
import { getSeedTitle } from '../../utils/seed-helper';

const SearchItem = ({ chooseOption, setInputIsFocused, item, seedType }) => {
  const classes = useStyles();

  const getId = () => {
    let id = '';

    if (seedType === SeedType.TRACK) {
      id = item.id;
    } else if (seedType === SeedType.ARTIST) {
      id = `${item.id}`;
    } else if (seedType === SeedType.GENRE) {
      id = item + '';
    } else {
      throw new Error('seed type of search-item is not handled');
    }
    return id;
  };

  return (
    <div
      key={getId()}
      className={classes.root}
      onClick={() => {
        chooseOption(item);
        setInputIsFocused(false);
      }}>
      {getSeedTitle(seedType, item)}
    </div>
  );
};

export default SearchItem;
