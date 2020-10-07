import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../core/core.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [  
        {
            path: '', redirectTo: 'login', pathMatch: 'full'
        },
        {
            path: 'login/:returnUrl',    component: LoginComponent 
        },
      {
        path: 'login',  component: LoginComponent 
      } ,
       {
        path: 'signup',  component: SignupComponent 
        },
        {
            path: 'resetpassword', component: ResetPasswordComponent
        }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
