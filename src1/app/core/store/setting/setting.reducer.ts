import { SettingState, NIGHT_MODE_THEME } from './setting.model';
import {
  actionSettingChangeAnimationsElements,
  actionSettingChangeAnimationsPage,
  actionSettingChangeAnimationsPageDisabled,
  actionSettingChangeAutoNightMode,
  actionSettingChangeHour,
  actionSettingChangeLanguage,
  actionSettingChangeStickyHeader,
  actionSettingChangeTheme
} from './setting.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: SettingState = {
  language: 'en',
  theme: 'DEFAULT-THEME',
  autoNightMode: false,
  nightTheme: NIGHT_MODE_THEME,
  stickyHeader: true,
  pageAnimations: true,
  pageAnimationsDisabled: false,
  elementsAnimations: true,
  hour: 0
};

const reducer = createReducer(
  initialState,
  on(
    actionSettingChangeLanguage,
    actionSettingChangeTheme,
    actionSettingChangeAutoNightMode,
    actionSettingChangeStickyHeader,
    actionSettingChangeAnimationsPage,
    actionSettingChangeAnimationsElements,
    actionSettingChangeHour,
    (state, action) => ({ ...state, ...action })
  ),
  on(
    actionSettingChangeAnimationsPageDisabled,
    (state, { pageAnimationsDisabled }) => ({
      ...state,
      pageAnimationsDisabled,
      pageAnimations: false
    })
  )
);

export function settingReducer(
  state: SettingState | undefined,
  action: Action
) {
  return reducer(state, action);
}
