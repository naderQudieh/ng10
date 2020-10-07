import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingContainerComponent } from './pages/setting-container.component';

const routes: Routes = [
  {
    path: '',
    component: SettingContainerComponent,
    data: { title: 'menu.setting' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {}
