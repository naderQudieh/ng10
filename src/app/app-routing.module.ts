import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { catchError, delay, tap, map } from 'rxjs/operators';
//import { Logger, LoggerFactory } from "./services/logger-factory.service";
import { SpinnerService } from 'src/app/shared/services';
import { BehaviorSubject,   Observable } from 'rxjs';
import { of } from "rxjs";
 

const routes: Routes = [
    
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'products', 
        loadChildren: () => import('./features/products/products.module')
            .then(m => m.ProductsModule)
            .catch(() => location.reload())
    }
    , 
    {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule)
    },   
    {
        path: 'auth',
        loadChildren: () => import('./features/account/account.module').then((m) => m.AccountModule)
    },
    {
        path: 'about', runGuardsAndResolvers: 'always',
        loadChildren: () => import('./features/about/about.module').then((m) => m.AboutModule)
    },  
    {
        path: 'setting',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./features/setting/setting.module')
            .then(m => m.SettingModule)
            .catch(() => location.reload())
    }
    ,
    {
        path: 'notfound',
        component: PageNotFoundComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    // useHash supports github.io demo page, remove in your app
    imports: [
        RouterModule.forRoot(routes, {
           // enableTracing: true,
            useHash: true,
            scrollPositionRestoration: 'enabled',
            preloadingStrategy: PreloadAllModules,
            onSameUrlNavigation: 'reload'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
   // private logger: Logger; private router: Router,
    
    constructor(private router: Router, private spinnerService: SpinnerService) {
        router.events.subscribe((event) => {
            console.log('NavigationStart ' + this.router.url);
            if (event instanceof NavigationStart) {
                console.log('NavigationStart '+this.router.url);
                spinnerService.show();
            }
            if (event instanceof RouteConfigLoadStart) {
                
            }

            if (event instanceof RouteConfigLoadEnd) {
                  
            }

            if (event instanceof NavigationEnd) {
                //console.log('NavigationStart ' +this.router.url);
                of('dummy').pipe(delay(200)).subscribe(val => {
                    spinnerService.hide();
                });
                document.querySelector('meta[property=og\\:url').setAttribute('content', window.location.href);
            }
        });
        //this.logger = loggerFactory.createLogger(AppRoutingModule, NgxLoggerLevel.OFF);
    }
}
