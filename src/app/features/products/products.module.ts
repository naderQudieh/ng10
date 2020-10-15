import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LazyElementsModule } from '@angular-extensions/elements';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; 
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';
import { ProductsService } from './products.service';
import { ProductsRoutingModule } from './products-routing.module';   
import { LayoutComponent } from './layout/layout.component';
import { ProductsComponent } from './pages/products.component'; 
import { GlobalService } from '../../core/services';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    LazyElementsModule,
    SharedModule,
    ProductsRoutingModule,
   
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  declarations: [
      LayoutComponent, ProductsComponent 
  
  ],
    providers: [ProductsService]
})
export class ProductsModule {
    constructor(private readonly translateService: TranslateService,
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
