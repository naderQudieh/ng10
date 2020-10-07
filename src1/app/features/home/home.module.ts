import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LazyElementsModule } from '@angular-extensions/elements';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { Store, select } from '@ngrx/store';
import { tap, take, distinctUntilChanged, filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment'; 
import { LanguageService } from '../../shared/servcies/language.service';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeRoutingModule } from './home-routing.module'; 
import { HomeComponent } from './pages/home.component';
import { ProductsService } from '../products/products.service';
import { AppState, selectSettingLanguage } from '../../core/core.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(
        http, `${environment.i18nPrefix}/assets/i18n/`, '.json'
    );
}
@NgModule({
    declarations: [HomeComponent],
    imports: [ SharedModule, HomeRoutingModule, LazyElementsModule,
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
    providers: [ProductsService]
})
 
 
export class HomeModule {
    constructor(private store: Store<AppState>, private readonly translateService: TranslateService) {
        this.store.pipe(select(selectSettingLanguage))
            .subscribe((language) => {
                this.translateService.use(language)
            });
    }
}