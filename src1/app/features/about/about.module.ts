import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { TranslateService } from '@ngx-translate/core';
import { AboutComponent } from './pages/about.component';
import { AboutRoutingModule } from './about-routing.module';
import { LazyElementsModule } from '@angular-extensions/elements';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../../../environments/environment';
import { AppState, selectSettingLanguage } from '../../core/core.module';
import { tap, take, distinctUntilChanged, filter } from 'rxjs/operators';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(
        http,
        `${environment.i18nPrefix}/assets/i18n/`,
        '.json'
    );
}


@NgModule({
  declarations: [AboutComponent],
    imports: [CommonModule, SharedModule, AboutRoutingModule,
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
 
export class AboutModule {
    constructor(private store: Store<AppState>, private readonly translateService: TranslateService) { 
        this.store.pipe(select(selectSettingLanguage))
            .subscribe((language) => { 
                this.translateService.use(language)
            }); 
    }
}
