import React, { useContext } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import useStyles from './seed-type-selector.styles';
import SeedTypeContext from '../../contexts/SeedTypeContext';
import { Grid } from '@material-ui/core';
import SeedType from '../../constants/seed-type';

const SeedTypeSelector = () => {
  const classes = useStyles();
  const [seedType, toString, setSeedType] = useContext(SeedTypeContext);

  /**
   * Change seed type
   *
   * @param {*} event
   * @param {SeedType} newSeedType
   */
  const handleSeedChange = (event, newSeedType) => {
    if (newSeedType !== null) setSeedType(newSeedType);
  };

  return (
    <Grid container direction='column' align='right' className={classes.root}>
      <Grid item>
        <ToggleButtonGroup
          size='small'
          value={seedType}
          exclusive
          onChange={handleSeedChange}
          aria-label='text alignment'
          className={classes.buttonGroup}>
          {SeedType
            ? Object.entries(SeedType).map(([key, value]) => (
              <ToggleButton
                  key={key}
                  value={value}>{`${value}`}</ToggleButton>
              ))
            : ''}
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default SeedTypeSelector;
