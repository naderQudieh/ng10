import { NgModule } from '@angular/core';
import { Routes,  RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthGuardService } from './core/services/auth-guard.service';
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
        path: 'about',
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
           //enableTracing: true,
            useHash: true,
            scrollPositionRestoration: 'enabled',
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
