import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../core/core.module';
import { LayoutComponent } from './layout/layout.component';
import { ProductsComponent } from './pages/products.component';
import { AddProductsComponent } from './pages/addproducts.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [ 
            {
                path: '', component: ProductsComponent
            },
            {
                path: 'add', component: AddProductsComponent
            },
            {
                path: 'add/:number', component: AddProductsComponent
            } 
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
