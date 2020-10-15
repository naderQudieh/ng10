import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LazyElementsModule } from '@angular-extensions/elements';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { Store, select } from '@ngrx/store';
import { tap, take, distinctUntilChanged, filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { GlobalService } from '../../core/services';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppState } from '../../core/core.module';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeRoutingModule } from './home-routing.module'; 
import { HomeComponent } from './pages/home.component';
import { HomeService } from './home.service';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(
        http, `${environment.i18nPrefix}/assets/i18n/`, '.json'
    );
}
@NgModule({
    declarations: [HomeComponent],
    imports: [ CommonModule,SharedModule, HomeRoutingModule, LazyElementsModule,
        TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
            },
            isolate: false
        }) 
    ],
  entryComponents: [],
    providers: [HomeService]
})
 
 
export class HomeModule {
    constructor(private store: Store<AppState>, private readonly translateService: TranslateService,
        private readonly globalVarSrv: GlobalService) {
        this.globalVarSrv.getLanguage().subscribe((language) => {
            let slang = language;

            if (language['value']) {
                slang = language['value']
            }
            
            this.translateService.use(slang)
        });
        //this.store.pipe(select(selectSettingLanguage))
        //    .subscribe((language) => { 
        //        this.translateService.use(language)
        //    }); 
    }
}