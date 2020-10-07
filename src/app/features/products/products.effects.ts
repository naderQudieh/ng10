import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { merge } from 'rxjs';
import { tap, distinctUntilChanged, filter } from 'rxjs/operators';
import {  AppState,  selectSettingLanguage} from '../../core/core.module';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private translateService: TranslateService,
    private router: Router 
  ) {}

  setTranslateServiceLanguage = createEffect(
    () => () =>
      this.store.pipe(
        select(selectSettingLanguage),
        distinctUntilChanged(),
        tap((language) => this.translateService.use(language))
      ),
    { dispatch: false }
  ); 
  
}
