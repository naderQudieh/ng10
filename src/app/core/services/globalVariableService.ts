import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable} from 'rxjs'
import {shareReplay, map} from 'rxjs/operators' 
import { AuthService } from './auth.service';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Injectable({providedIn: 'root'})
export class globalVariableService  { 
    appthemes: Array<any> = [
        { value: 'default', name: 'Default', cssClass: null },
        { value: 'light', name: 'Light', cssClass: 'light-theme' },
        { value: 'snow-white', name: 'Snow white', cssClass: 'snow-white-theme' },
        { value: 'mixed', name: 'Mixed', cssClass: 'mixed-theme' },
        { value: 'Dark', name: 'Dark', cssClass: 'dark-theme' },
        { value: 'black', name: 'Black', cssClass: 'black-theme' }
    ];
    themes = [
        { value: 'DEFAULT-THEME', label: 'blue' },
        { value: 'LIGHT-THEME', label: 'light' },
        { value: 'NATURE-THEME', label: 'nature' },
        { value: 'BLACK-THEME', label: 'dark' }
    ];

    languages = [
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'Français' },
        { value: 'ar', label: 'ArabicA' }
    ];

    public isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());   
    public UserLanguage = new BehaviorSubject<string>(this.CurrentLang());
    public UserTheme = new BehaviorSubject<string>(this.CurrentTheme());

    constructor(private localStorage: LocalStorageService) {
        this.InitilizaeApp();
    }

  
 
    InitilizaeApp(): void {
        let lang = this.CurrentLang();
        if (lang == null || lang == undefined) {
            lang = "en";
            this.setLanguage(lang);
        }

        let theme = this.CurrentTheme();
        if (theme == null || theme == undefined) {
            lang = "default-theme";
            this.setTheme(lang);
        }
    }
     


    setAuthenticated(isAuthenticated: boolean): void {
        this.isAuthenticated.next(isAuthenticated);
    }

    getIsAuthenticated(): Observable<boolean> {
        if (this.hasToken()) {

            this.setAuthenticated(true);
        } else {

            this.setAuthenticated(false);
        }
        return this.isAuthenticated.asObservable();
    }


    

    setLanguage(lang: string): void {
        this.localStorage.setItem('settingslang', lang)
        this.UserLanguage.next(lang);
    }


    getLanguage(): Observable<string> { 
            let lang = this.localStorage.getItem('settingslang');
            
            if (!lang) {
                lang = "en";
                this.setLanguage(lang);
            }
            
            return this.UserLanguage.asObservable(); 
    }

    setTheme(theme: string): void {
        this.localStorage.setItem('settingstheme', theme.toLowerCase())
        this.UserTheme.next(theme );
    }


    getTheme(): Observable<string> {
        let theme = this.localStorage.getItem('settingstheme');  
        if (!theme) {
            theme = "default-theme" ;
            this.setTheme(theme);
        } 
        return this.UserTheme.asObservable();
    }

    getThemesList(): any[]  { 
        return this.themes ;
    }
    getLanguages(): any[] {
        return this.languages;
    }
    private CurrentLang(): string {
        try {
            return this.localStorage.getItem('settingslang') || 'en';
        } catch (err) {
            return 'en';
        }  
    }
    private CurrentTheme(): string {
        return this.localStorage.getItem('settingstheme') || 'DEFAULT-THEME'; 
    }
    private hasToken(): boolean {
        return !!this.localStorage.getUserAuthToken();
    }

}