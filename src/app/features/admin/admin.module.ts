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
import { AppState } from '../../core/core.module';
import { tap, take, distinctUntilChanged, filter } from 'rxjs/operators';
import { globalVariableService } from '../../core/services';


import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageCrisesComponent } from './manage-crises/manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';

import { AdminRoutingModule } from './admin-routing.module';
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(
        http,
        `${environment.i18nPrefix}/assets/i18n/`,
        '.json'
    );
}

@NgModule({
    imports: [CommonModule, SharedModule, AdminRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: false
        })
    ]
  ,
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageCrisesComponent,
    ManageHeroesComponent
  ]
})
 
export class AdminModule {
    constructor(private store: Store<AppState>, private readonly translateService: TranslateService, private readonly globalVarSrv: globalVariableService) {
        this.globalVarSrv.getLanguage().subscribe((language) => {
            this.translateService.use(language)
        });
        //this.store.pipe(select(selectSettingLanguage))
        //    .subscribe((language) => { 
        //        this.translateService.use(language)
        //    }); 
    }
}
