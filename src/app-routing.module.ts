import { NgModule } from '@angular/core';
import { Routes,  RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { AuthGuardService } from 'src/app//core/services/auth-guard.service';
const routes: Routes = [
    
    {
        path: '', redirectTo: 'about', pathMatch: 'full'
    },  
    {
        path: 'home', canActivate: [AuthGuardService],
        loadChildren: () => import('src/app/features/home/home.module')
            .then(m => m.HomeModule)
            .catch((e) => {
                console.log(e);
                location.reload()
            })
    }, 
    {
        path: 'products', canActivate: [AuthGuardService],
        loadChildren: () => import('src/app/features/products/products.module')
            .then(m => m.ProductsModule)
            .catch((e) => {
                console.log(e);
                location.reload()
            })
    },
    {
        path: 'auth', 
        loadChildren: () => import('src/app/features/account/account.module')
            .then(m => m.AccountModule)
            .catch((e) => {
                console.log(e);
                location.reload()
            })
    },
    {
        path: 'about', 
        loadChildren: () => import('src/app/features/about/about.module')
            .then(m => m.AboutModule)
            .catch((e) => {
                console.log(e);
                location.reload()
            })
    },  
    {
        path: 'setting',
        canActivate: [AuthGuardService],
        loadChildren: () => import('src/app/features/setting/setting.module')
            .then(m => m.SettingModule)
            .catch((e) => {
                console.log(e);
                location.reload()
            })
    }
    ,{
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
            useHash: true,
            scrollPositionRestoration: 'enabled',
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
