import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LazyElementsModule } from '@angular-extensions/elements';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { Store, select } from '@ngrx/store';
import { tap, take, distinctUntilChanged, filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { globalVariableService } from '../../core/services';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppState } from '../../core/core.module';


import { SettingRoutingModule } from './setting-routing.module';
import { SettingContainerComponent } from './pages/setting-container.component';

@NgModule({
  declarations: [SettingContainerComponent],
  imports: [CommonModule, SharedModule, SettingRoutingModule]
})
 
export class SettingModule {
    constructor( private readonly translateService: TranslateService,
        private readonly globalVarSrv: globalVariableService) {
        this.globalVarSrv.getLanguage().subscribe((language) => {
            this.translateService.use(language)
        });
        //this.store.pipe(select(selectSettingLanguage))
        //    .subscribe((language) => { 
        //        this.translateService.use(language)
        //    }); 
    }
}