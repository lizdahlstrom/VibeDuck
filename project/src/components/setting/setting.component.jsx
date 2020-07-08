import React, { useContext, memo, useEffect, useState } from 'react';
import useStyles from './setting.styles';
import { Slider, Grid, FormControlLabel, Switch } from '@material-ui/core';
import SettingValueType from '../../constants/setting-value-type';
import { SettingsContext } from '../../contexts/SettingsContext';

const Setting = ({ setting }) => {
  const classes = useStyles();
  const [settings, setSettings, setSettingValue, setActive] = useContext(
    SettingsContext
  );

  const [sliderValue, setSliderValue] = useState(setting.value);

  const handleValueChange = (value) => {
    setSettingValue(setting.id, value);
  };

  const handleToggleOn = (e) => {
    setActive(setting.id, e.target.checked);
  };

  const getMaxValue = () => {
    const type = setting.valueType;
    return type;
  };

  const getStep = () => {
    const type = setting.valueType;
    if (type === SettingValueType.POPULARITY) return 1;
    return 0.1;
  };

  useEffect(() => {
    setSliderValue(setting.value);
  }, [setting.value]);

  return (
    <Grid item container direction='column' className={classes.setting}>
      <Grid item xs={1} align='left'>
        <FormControlLabel
          control={
            <Switch
              checked={setting.active}
              size='small'
              onChange={(e) => handleToggleOn(e)}
              color='secondary'
            />
          }
          label={setting.label}
        />
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={1}></Grid>
        <Grid item xs={11} align='center'>
          <Slider
            color='secondary'
            disabled={!setting.active}
            value={sliderValue}
            max={getMaxValue()}
            getAriaValueText={() => setting.label}
            aria-labelledby='discrete-slider-custom'
            step={getStep()}
            valueLabelDisplay='auto'
            onChange={(event, value) => {
              setSliderValue(value);
            }}
            onChangeCommitted={(event, value) => {
              handleValueChange(value);
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Setting;
