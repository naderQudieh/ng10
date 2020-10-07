import { ActivationEnd, Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, merge, of } from 'rxjs';
import {
  tap,
  withLatestFrom,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';

import { selectSettingState } from '../app.state';
import { LocalStorageService } from '../../services/local-storage.service';
import { AnimationsService } from '../../services/animations.service';
import { TitleService } from '../../services/title.service';

import {
  actionSettingChangeAnimationsElements,
  actionSettingChangeAnimationsPage,
  actionSettingChangeAnimationsPageDisabled,
  actionSettingChangeAutoNightMode,
  actionSettingChangeLanguage,
  actionSettingChangeTheme,
  actionSettingChangeStickyHeader,
  actionSettingChangeHour
} from './setting.actions';
import {
  selectEffectiveTheme,
  selectSettingLanguage,
  selectPageAnimations,
  selectElementsAnimations
} from './setting.selectors';
import { State } from './setting.model';

export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('anms-init-effect-trigger');

@Injectable()
export class SettingEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService,
    private titleService: TitleService,
    private animationsService: AnimationsService,
    private translateService: TranslateService,
    private ngZone: NgZone
  ) {}

  hour = 0;
  changeHour = this.ngZone.runOutsideAngular(() =>
    setInterval(() => {
      const hour = new Date().getHours();
      if (hour !== this.hour) {
        this.hour = hour;
        this.ngZone.run(() =>
          this.store.dispatch(actionSettingChangeHour({ hour }))
        );
      }
    }, 60_000)
  );

  persistSetting = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actionSettingChangeAnimationsElements,
          actionSettingChangeAnimationsPage,
          actionSettingChangeAnimationsPageDisabled,
          actionSettingChangeAutoNightMode,
          actionSettingChangeLanguage,
          actionSettingChangeStickyHeader,
          actionSettingChangeTheme
        ),
        withLatestFrom(this.store.pipe(select(selectSettingState))),
        tap(([action, setting]) =>
          this.localStorageService.setItem(SETTINGS_KEY, setting)
        )
      ),
    { dispatch: false }
  );

  updateRouteAnimationType = createEffect(
    () =>
      merge(
        INIT,
        this.actions$.pipe(
          ofType(
            actionSettingChangeAnimationsElements,
            actionSettingChangeAnimationsPage
          )
        )
      ).pipe(
        withLatestFrom(
          combineLatest([
            this.store.pipe(select(selectPageAnimations)),
            this.store.pipe(select(selectElementsAnimations))
          ])
        ),
        tap(([action, [pageAnimations, elementsAnimations]]) =>
          this.animationsService.updateRouteAnimationType(
            pageAnimations,
            elementsAnimations
          )
        )
      ),
    { dispatch: false }
  );

  updateTheme = createEffect(
    () =>
      merge(INIT, this.actions$.pipe(ofType(actionSettingChangeTheme))).pipe(
        withLatestFrom(this.store.pipe(select(selectEffectiveTheme))),
        tap(([action, effectiveTheme]) => {
          const classList = this.overlayContainer.getContainerElement()
            .classList;
          const toRemove = Array.from(classList).filter((item: string) =>
            item.includes('-theme')
          );
          if (toRemove.length) {
            classList.remove(...toRemove);
          }
          classList.add(effectiveTheme);
        })
      ),
    { dispatch: false }
  );

  setTranslateServiceLanguage = createEffect(
    () =>
      this.store.pipe(
        select(selectSettingLanguage),
        distinctUntilChanged(),
          tap((language) => {
              
              this.translateService.use(language);
          })
      ),
    { dispatch: false }
  );

  setTitle = createEffect(
    () =>
      merge(
        this.actions$.pipe(ofType(actionSettingChangeLanguage)),
        this.router.events.pipe(
          filter((event) => event instanceof ActivationEnd)
        )
      ).pipe(
        tap(() => {
          this.titleService.setTitle(
            this.router.routerState.snapshot.root,
            this.translateService
          );
        })
      ),
    { dispatch: false }
  );
}
