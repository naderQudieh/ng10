import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';

@NgModule({
  imports: [
    // angular
        BrowserAnimationsModule, CommonModule,
    BrowserModule,
    // core
    CoreModule,
    // app
    AppRoutingModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
 
export class AppModule {
    //constructor(private readonly globalVarSrv: globalVariableService) {
        
    //    this.globalVarSrv.getLanguage().subscribe((language) => {
    //        this.translateService.use(language)
    //    });
    //    faIconLibrary.addIcons(...faIconscore);
    //}
}