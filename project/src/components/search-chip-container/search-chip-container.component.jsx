import React, { useContext } from 'react';
import { SearchSeedsContext } from '../../contexts/SearchSeedsContext';
import { Paper } from '@material-ui/core';
import useStyles from './search-chip-container.styles';
import SeedTypeContext from '../../contexts/SeedTypeContext';
import SearchChip from '../search-chip/search-chip.component';

const SearchChipContainer = () => {
  const classes = useStyles();
  const [selectedSeeds, setSelectedSeeds] = useContext(SearchSeedsContext);
  const [seedType] = useContext(SeedTypeContext);

  /**
   * Delete chip from container
   *
   * @param {object} chipToDelete object with an id prop
   */
  const handleDelete = (chipToDelete) => () => {
    setSelectedSeeds((chips) =>
      chips.filter((chip) => chip.id !== chipToDelete.id)
    );
  };

  return (
    <div>
      {seedType && selectedSeeds && selectedSeeds.length <= 0 ? (
        ''
      ) : (
        <Paper component='ul' className={classes.chipContainer}>
          {selectedSeeds
            ? selectedSeeds.map((data) => {
                return (
                  <li key={data.id ? `chip-${data.id}` : `chip-${data}`}>
                    <SearchChip
                      handleDelete={handleDelete}
                      data={data}
                      seedType={seedType}
                    />
                  </li>
                );
              })
            : ''}
        </Paper>
      )}
    </div>
  );
};

export default SearchChipContainer;
