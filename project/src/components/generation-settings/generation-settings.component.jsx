import React, { useContext, memo } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
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
      <ExpansionPanel defaultExpanded className={classes.panel}>
        <ExpansionPanelSummary
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
        </ExpansionPanelSummary>
        {settings.map((setting) => (
          <Setting key={setting.name} setting={setting} />
        ))}
      </ExpansionPanel>
    </Grid>
  );
};

export default memo(GenerationSettings);
