import React, { useContext, memo } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import {
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CachedIcon from '@material-ui/icons/Cached';
import Setting from '../setting/setting.component';
import useStyles from './generation-settings.styles';

const GenerationSettings = () => {
  const [settings, setSettings, setSettingValue, setActive, reset] = useContext(
    SettingsContext
  );
  const classes = useStyles();

  return (
    <Grid item>
      <Accordion defaultExpanded className={classes.panel}>
        <AccordionSummary
          className={classes.summary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography className={classes.heading}>Settings</Typography>
          <CachedIcon
            className={classes.resetIcon}
            onClick={(e) => {
              e.stopPropagation();
              reset();
            }}>
            Reset
          </CachedIcon>
        </AccordionSummary>
        {settings.map((setting) => (
          <Setting key={setting.name} setting={setting} />
        ))}
      </Accordion>
    </Grid>
  );
};

export default memo(GenerationSettings);
