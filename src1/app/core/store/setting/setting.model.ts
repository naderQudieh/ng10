import { AppState } from '../../core.module';

export const NIGHT_MODE_THEME = 'BLACK-THEME';
export enum Language2 {
    'en',
    'fr',
    'ar'
}
export type Language = 'en' | 'fr' | 'ar' ;

export interface SettingState {
  language: string;
  theme: string;
  autoNightMode: boolean;
  nightTheme: string;
  stickyHeader: boolean;
  pageAnimations: boolean;
  pageAnimationsDisabled: boolean;
  elementsAnimations: boolean;
  hour: number;
}

export interface State extends AppState {
  setting: SettingState;
}
