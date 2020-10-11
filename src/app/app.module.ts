import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule, CommonModule,
    BrowserModule,
    // core
    CoreModule,
    // app
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
 
export class AppModule {
    //constructor(private readonly globalVarSrv: GlobalService) {
        
    //    this.globalVarSrv.getLanguage().subscribe((language) => {
    //        this.translateService.use(language)
    //    });
    //    faIconLibrary.addIcons(...faIconscore);
    //}
}