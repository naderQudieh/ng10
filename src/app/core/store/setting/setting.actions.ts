import { createAction, props } from '@ngrx/store';

import { Language } from './setting.model';

export const actionSettingChangeLanguage = createAction(
  '[Setting] Change Language',
  props<{ language: Language }>()
);

export const actionSettingChangeTheme = createAction(
  '[Setting] Change Theme',
  props<{ theme: string }>()
);
export const actionSettingChangeAutoNightMode = createAction(
  '[Setting] Change Auto Night Mode',
  props<{ autoNightMode: boolean }>()
);

export const actionSettingChangeStickyHeader = createAction(
  '[Setting] Change Sticky Header',
  props<{ stickyHeader: boolean }>()
);

export const actionSettingChangeAnimationsPage = createAction(
  '[Setting] Change Animations Page',
  props<{ pageAnimations: boolean }>()
);

export const actionSettingChangeAnimationsPageDisabled = createAction(
  '[Setting] Change Animations Page Disabled',
  props<{ pageAnimationsDisabled: boolean }>()
);

export const actionSettingChangeAnimationsElements = createAction(
  '[Setting] Change Animations Elements',
  props<{ elementsAnimations: boolean }>()
);
export const actionSettingChangeHour = createAction(
  '[Setting] Change Hours',
  props<{ hour: number }>()
);
