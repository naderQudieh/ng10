import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../core/core.module';
import { LayoutComponent } from './layout/layout.component';
import { ProductsComponent } from './pages/products.component';
 ;
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [  
        {
            path: '', redirectTo: 'products', pathMatch: 'full'
        },
        {
            path: 'products', component: ProductsComponent
        } ,
        {
            path: 'products/:number', component: ProductsComponent 
        } 
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
