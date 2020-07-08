import React, { useState, createContext, useEffect, memo } from 'react';
import SettingValueType from '../constants/setting-value-type';

export const SettingsContext = createContext();

const STORAGE_NAME = 'settings';

const getDefaultValue = (valueType) => {
  if (valueType > 1) return valueType / 2;
  return 0.5;
};

function Setting(
  id,
  name,
  label,
  valueType = SettingValueType.FLOAT,
  active = false
) {
  this.id = id;
  this.name = name;
  this.label = label;
  this.valueType = valueType;
  this.value = getDefaultValue(valueType);
  this.active = active;
}

const initialState = [
  new Setting(1, 'danceability', 'Danceability'),
  new Setting(2, 'acousticness', 'Acousticness'),
  new Setting(3, 'tempo', 'Tempo', SettingValueType.TEMPO),
  new Setting(4, 'popularity', 'Popularity', SettingValueType.POPULARITY),
  new Setting(5, 'valence', 'Cheerfulness'),
  new Setting(6, 'energy', 'Energy'),
  new Setting(7, 'instrumentalness', 'Instrumentalness'),
  new Setting(8, 'liveness', 'Liveness'),
];

export const SettingsProvider = memo((props) => {
  const [settings, setSettings] = useState(
    JSON.parse(sessionStorage.getItem(STORAGE_NAME)) ||
      initialState.map((i) => ({ ...i }))
  );

  const isIdValid = (id) => {
    if (settings.filter((e) => e.id === id).length === 0)
      throw new Error('no such id ' + id);
  };

  const setSettingValue = (id, value) => {
    if (value < 0) throw new Error('cannot set value to less than 0');
    isIdValid(id);

    const setting = settings.filter((e) => e.id === id)[0];

    if (setting.valueType === SettingValueType.FLOAT) {
      if (value > 1) {
        throw new Error('cannot set value to more than 1');
      }
    }

    setting.value = value;

    const newSettings = settings.map((o) => (o.id === id ? setting : o));

    setSettings(newSettings);
  };

  const setActive = (id, bool) => {
    if (bool === null) throw new Error('must be of type boolean');
    isIdValid(id);

    const setting = settings.filter((s) => s.id === id)[0];
    setting.active = bool;

    const newSettings = settings.map((s) => (s.id === id ? setting : s));
    setSettings(newSettings);
  };

  const reset = () => {
    setSettings(initialState.map((i) => ({ ...i })));
  };

  useEffect(() => {
    // Save settings to session storage every time it is updated
    sessionStorage.setItem(STORAGE_NAME, JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={[settings, setSettings, setSettingValue, setActive, reset]}>
      {/* Pass props to children */}
      {props.children}
    </SettingsContext.Provider>
  );
});
