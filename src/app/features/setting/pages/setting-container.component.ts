import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { globalVariableService } from '../../../core/services';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'anms-setting',
  templateUrl: './setting-container.component.html',
  styleUrls: ['./setting-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
 

    public languages: any[]
    public themes: any[]  
    public selectedtheme: any;
    public selectedlanguage: any;

    constructor(private overlayContainer: OverlayContainer,  private translate: TranslateService , private globalVarSrv: globalVariableService,) {
        this.languages = this.globalVarSrv.getLanguages().map(p => p.value);
        this.themes = this.globalVarSrv.getThemesList();//.map(p => p.value);
        
    }

    ngOnInit() {
        this.globalVarSrv.getTheme().subscribe(theme => { 
            let apptheme = this.themes.filter(item => {
                return item.value.toLowerCase() === theme.toLowerCase()
            }); 
            this.selectedtheme = apptheme[0];  
        })

        this.globalVarSrv.getLanguage().subscribe(lang => {
          
            let applang = this.languages.filter(item => { 
                return item  === lang 
            });
            this.selectedlanguage = applang[0];
        })
  }

    onLanguageSelect({ value: lang }) {
        console.log(lang);
        this.globalVarSrv.setLanguage(lang);  
  }
      
  onThemeSelect({ value: theme }) { 
        let apptheme = this.themes.filter(item => { 
            return item.value === theme.value
        });
        this.selectedtheme = apptheme[0] ; 
        this.globalVarSrv.setTheme(apptheme[0].value.toLowerCase());  
  } 
 
}
