﻿import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable} from 'rxjs'
import {shareReplay, map} from 'rxjs/operators' 
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({providedIn: 'root'})
export class GlobalService  { 
  
    themes = [
        { value: 'DEFAULT-THEME', label: 'Blue' },
        { value: 'LIGHT-THEME', label: 'Light' },
        { value: 'NATURE-THEME', label: 'Nature' },
        { value: 'BLACK-THEME', label: 'Dark' }
    ];

    languages = [
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'Français' },
        { value: 'ar', label: 'ArabicA' }
    ];

    public isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());   
    public UserLanguage = new BehaviorSubject<string>(this.CurrentLang());
    public UserTheme = new BehaviorSubject<string>(this.CurrentTheme());

    private progressBar  = new BehaviorSubject<boolean>(false);
    private spinnerBar = new BehaviorSubject<boolean>(false);

    constructor(private localStorage: LocalStorageService) {
        this.InitilizaeApp();
    }

  
 
    InitilizaeApp(): void {
        this.setAuthenticated(false);

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
        console.log(lang);
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
        this.UserTheme.next(theme);
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
        try {
            return this.localStorage.getItem('settingstheme') || 'DEFAULT-THEME'.toLowerCase();
        } catch (err) {
            return 'DEFAULT-THEME'.toLowerCase();
        }  
        
    }
    private hasToken(): boolean {
        return !!this.localStorage.getUserAuthToken();
    } 
   

    showBar(): void {
        this.progressBar.next(true);
    }

    hideBar(): void {
        this.progressBar.next(false);
    }

    getBarValue(): Observable<boolean> {
        return this.progressBar.asObservable();
    }

    showSpinner(): void {
        this.spinnerBar.next(true);
    }

    hideSpinner(): void {
        this.spinnerBar.next(false);
    }

    getSpinnerValue(): Observable<boolean> {
        return this.spinnerBar.asObservable();
    }
}