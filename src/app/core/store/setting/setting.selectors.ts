/// <reference path="../app.state.ts" />
import { createSelector } from '@ngrx/store';

import { SettingState } from './setting.model';
import { selectSettingState } from '../app.state';

export const selectSetting = createSelector(
  selectSettingState,
  (state: SettingState) => state
);

export const selectSettingStickyHeader = createSelector(
  selectSetting,
  (state: SettingState) => state.stickyHeader
);

export const selectSettingLanguage = createSelector(
  selectSetting,
  (state: SettingState) => state.language
);

export const selectTheme = createSelector(
  selectSetting,
  (setting) => setting.theme
);

export const selectPageAnimations = createSelector(
  selectSetting,
  (setting) => setting.pageAnimations
);

export const selectElementsAnimations = createSelector(
  selectSetting,
  (setting) => setting.elementsAnimations
);

export const selectAutoNightMode = createSelector(
  selectSetting,
  (setting) => setting.autoNightMode
);

export const selectNightTheme = createSelector(
  selectSetting,
  (setting) => setting.nightTheme
);

export const selectHour = createSelector(
  selectSetting,
  (setting) => setting.hour
);

export const selectIsNightHour = createSelector(
  selectAutoNightMode,
  selectHour,
  (autoNightMode, hour) => autoNightMode && (hour >= 21 || hour <= 7)
);

export const selectEffectiveTheme = createSelector(
  selectTheme,
  selectNightTheme,
  selectIsNightHour,
  (theme, nightTheme, isNightHour) =>
    (isNightHour ? nightTheme : theme).toLowerCase()
);
