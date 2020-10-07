/// <reference path="../../../core/store/setting/setting.selectors.ts" />
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

import {  actionSettingChangeAnimationsElements,
  actionSettingChangeAnimationsPage,  actionSettingChangeAutoNightMode,
  actionSettingChangeLanguage,  actionSettingChangeTheme,  actionSettingChangeStickyHeader
} from '../../../core/store/setting/setting.actions';
import { SettingState, State } from '../../../core/store/setting/setting.model';
import { selectSetting } from '../../../core/store/setting/setting.selectors';

@Component({
  selector: 'anms-setting',
  templateUrl: './setting-container.component.html',
  styleUrls: ['./setting-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  setting$: Observable<SettingState>;

  themes = [
    { value: 'DEFAULT-THEME', label: 'blue' },
    { value: 'LIGHT-THEME', label: 'light' },
    { value: 'NATURE-THEME', label: 'nature' },
    { value: 'BLACK-THEME', label: 'dark' }
  ];

  languages = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'ar', label: 'ArabicA' }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.setting$ = this.store.pipe(select(selectSetting));
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingChangeLanguage({ language }));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(actionSettingChangeTheme({ theme }));
  }

  onAutoNightModeToggle({ checked: autoNightMode }) {
    this.store.dispatch(actionSettingChangeAutoNightMode({ autoNightMode }));
  }

  onStickyHeaderToggle({ checked: stickyHeader }) {
    this.store.dispatch(actionSettingChangeStickyHeader({ stickyHeader }));
  }

  onPageAnimationsToggle({ checked: pageAnimations }) {
    this.store.dispatch(actionSettingChangeAnimationsPage({ pageAnimations }));
  }

  onElementsAnimationsToggle({ checked: elementsAnimations }) {
    this.store.dispatch(
      actionSettingChangeAnimationsElements({ elementsAnimations })
    );
  }
}
