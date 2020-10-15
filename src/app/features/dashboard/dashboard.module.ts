import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { TranslateService } from '@ngx-translate/core';
import { LazyElementsModule } from '@angular-extensions/elements';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../../../environments/environment';
import { AppState  } from '../../core/core.module';
import { tap, take, distinctUntilChanged, filter } from 'rxjs/operators';
import { GlobalService } from '../../core/services';

import { DashboardComponent } from './pages/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(
        http,
        `${environment.i18nPrefix}/assets/i18n/`,
        '.json'
    );
}


@NgModule({
    declarations: [DashboardComponent],
    imports: [CommonModule, SharedModule, DashboardRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: false
        }) 
    ]
})
 
export class DashboardModule {
    constructor(private store: Store<AppState>, private readonly translateService: TranslateService, private readonly globalVarSrv: GlobalService) { 
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
