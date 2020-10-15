import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GlobalService } from '../../../core/services';
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
    public selectedtheme : any ;
    public selectedlanguage: any;

    constructor(private overlayContainer: OverlayContainer, private translate: TranslateService, private globalService: GlobalService,) {
        this.languages = this.globalService.getLanguages() ;
        this.themes = this.globalService.getThemesList(); 
        
    }

    ngOnInit() {
        this.globalService.UserTheme.subscribe(theme => { 

            let apptheme = this.themes.filter(item => {
                return item.value.toLowerCase()  == theme.toLowerCase()
            }); 
            this.selectedtheme = apptheme[0];
            console.log(this.selectedtheme);
           
        })
        
        this.globalService.UserLanguage.subscribe(lang => { 
            let applang = this.languages.filter(item => { 
                return item.value  == lang  ;  
            });
            this.selectedlanguage = applang[0];
            
        })
    }

    onLanguageSelect() {
       
        this.globalService.setLanguage(this.selectedlanguage['value']);
    }
      
    onThemeSelect() { 
        this.globalService.setTheme(this.selectedtheme['value'] );  
    } 


    //onThemeSelect({ value: theme }) {
    //    console.log(theme);
    //    let apptheme = this.themes.filter(item => {
    //        return item.value === theme.value
    //    });
    //    this.selectedtheme = apptheme[0];
    //    console.log(apptheme[0].value.toLowerCase());
    //    this.globalService.setTheme(apptheme[0].value.toLowerCase());
    //} 
}
