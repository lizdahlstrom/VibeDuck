import React, { useState, useEffect, useContext } from 'react';
import useStyles from './search-styles';
import { SearchSeedsContext } from '../../contexts/SearchSeedsContext';
import { AuthContext } from '../../contexts/AuthContext';
import TextField from '@material-ui/core/TextField';
import { Paper, Grid } from '@material-ui/core';
import SearchItem from '../search-item/search-item.component';
import SeedType from '../../constants/seed-type';
import SeedTypeContext from '../../contexts/SeedTypeContext';
import PropTypes from 'prop-types';
import SeedTypeSelector from '../seed-type-selector/seed-type-selector.component';
import { searchTracks, searchArtists } from '../../utils/spotify-api';
import { GenreSeedsContext } from '../../contexts/GenreSeedsContext';

const Search = () => {
  const classes = useStyles();
  const [accessToken] = useContext(AuthContext);
  const [selectedSeeds, setSelectedSeeds] = useContext(SearchSeedsContext);
  const [seedType, toString] = useContext(SeedTypeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const [genreSeeds] = useContext(GenreSeedsContext);
  const canAddMoreSeeds = selectedSeeds.length < 5;

  /**
   * Search seeds through Spotify API
   *
   * @param {string} query String to query API
   * @param {string} type can be 'tracks', 'artists' or 'genres'
   * @throws {TypeError}
   * @returns
   */
  const fetchSeeds = async (query, type) => {
    let fetchedSeeds;

    if (type === SeedType.TRACK) {
      fetchedSeeds = (await searchTracks(accessToken, query)).filter(
        (track) => track.popularity !== 0
      );
    } else if (type === SeedType.ARTIST) {
      fetchedSeeds = (await searchArtists(accessToken, query)).filter(
        (artist) => artist.popularity !== 0
      );
    } else if (type === SeedType.GENRE) {
      fetchedSeeds = await genreSeeds;
    } else {
      throw new TypeError("Can't fetch from invalid type");
    }

    return fetchedSeeds;
  };

  /**
   * Fetches seeds based on seedType and adds them to options
   */
  const updateData = async () => {
    if (!searchQuery || searchQuery.length < 2) return;

    const seeds = await fetchSeeds(searchQuery, seedType);
    setOptions((option) => [...seeds]);
  };

  /**
   * Adds passed option to the selected seeds, unless the option is already added.
   *
   * @param {object, string} option An object with id prop OR string which is an id.
   *    The id is a Spotify seed id, ie artist/track/genre id.
   */
  const selectOption = (option) => {
    if (seedType !== SeedType.GENRE) {
      if (selectedSeeds.some((s) => s.id === option.id)) return;
    } else if (seedType === SeedType.GENRE) {
      if (selectedSeeds.some((s) => s.id === option)) return;
    }

    if (selectedSeeds.length >= 5) return;

    const objToAdd =
      typeof option === 'string'
        ? { id: option, seedType }
        : { ...option, seedType };

    setSelectedSeeds((selectedSeeds) => [...selectedSeeds, objToAdd]);
    setSearchQuery('');
  };

  useEffect(() => {
    if ((!searchQuery || searchQuery.length === 0) && inputIsFocused) {
      if (seedType !== SeedType.GENRE) {
        setOptions([]);
      } else {
        setOptions(genreSeeds);
      }
      return;
    }

    const handleUpdates = async () => {
      if (seedType === SeedType.GENRE && genreSeeds.length > 0) {
        const filtered = genreSeeds.filter((genre) =>
          genre.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setOptions((options) => [...filtered]);
      } else {
        updateData();
      }
    };
    handleUpdates();
  }, [searchQuery, inputIsFocused]);

  useEffect(() => {
    setInputIsFocused(false);
    setSearchQuery('');
    setOptions([]);
  }, [seedType]);

  return (
    <Grid
      data-testid='root'
      item
      container
      className={classes.root}
      direction='column'
      align='stretch'>
      <SeedTypeSelector />
      <Grid item>
        <TextField
          className={classes.input}
          variant='outlined'
          alt='search'
          value={searchQuery}
          disabled={!canAddMoreSeeds}
          placeholder={
            canAddMoreSeeds
              ? `Add ${seedType ? toString() : ''}`
              : 'Max 5 seeds'
          }
          onChange={(event) => {
            if (inputIsFocused === false) setInputIsFocused(true);
            setSearchQuery(event.target.value);
          }}
          onClick={() => {
            if (!canAddMoreSeeds) return;
            setInputIsFocused(!inputIsFocused);
          }}
        />
      </Grid>
      <Grid
        item
        onMouseOver={() => setInputIsFocused(true)}
        onMouseLeave={() => setInputIsFocused(false)}>
        <div className={classes.dropdown}>
          {options.length > 0 && inputIsFocused ? (
            <Paper style={{ maxHeight: 260, overflow: 'auto' }}>
              {options.map((item, index) => (
                <SearchItem
                  key={item.id ? item.id : item + ''}
                  seedType={seedType}
                  item={item}
                  chooseOption={selectOption}
                  setInputIsFocused={setInputIsFocused}
                />
              ))}
            </Paper>
          ) : (
            ''
          )}
        </div>
      </Grid>
    </Grid>
  );
};

SearchItem.propTypes = {
  seedType: PropTypes.oneOf([SeedType.ARTIST, SeedType.GENRE, SeedType.TRACK]),
};

export default Search;
