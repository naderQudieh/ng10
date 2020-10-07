import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingContainerComponent } from './pages/setting-container.component';

@NgModule({
  declarations: [SettingContainerComponent],
  imports: [CommonModule, SharedModule, SettingRoutingModule]
})
export class SettingModule {}
