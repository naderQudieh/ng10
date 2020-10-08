import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
 
  private userLanguage$ = new BehaviorSubject<string>('en');

  getUserLanguage$ = this.userLanguage$.asObservable();
  private userLang: string;

  constructor(private translate: TranslateService ,private storageService: LocalStorageService ) {
    let lng =  JSON.parse(localStorage.getItem('lang'));
    if(lng == undefined || lng===null){
        this.setCurrentLanguage ('en');
     }
     this.onChangeLanguage();
     this.getUserLanguage$.subscribe(lang => {
      this.userLang = lang;
    });
  }

 private onChangeLanguage() {
    this.translate.onLangChange.subscribe((event: any) => {
      console.log(event);
      this.translate.setDefaultLang(event.lang);
      this.translate.use(event.lang);
    });
  }
    getLang()  {  
        this.storageService.getItem('lang')
            .then((lang: string) => {
                return lang;
            }).catch(() => {
                return '';
         })
      //return this.storageService.getItem('lang');
  }
  public setCurrentLanguage(lang:string) { 
    this.storageService.setItem('lang', lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang); 
    //this.currentLanguage.next(lang);
  }
}