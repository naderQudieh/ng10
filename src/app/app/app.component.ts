import browser from 'browser-detect';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DOCUMENT } from "@angular/common";
import { Inject } from "@angular/core";
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, debounceTime, map, take } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { globalVariableService } from '../core/services';
import { AppState, routeAnimations  } from '../core/core.module';
import * as fromActions from '../features/account/store/auth.actions';
import { AuthActions, AuthState, getAuth, getAuthError } from '../features/account/store';
import { BidiModule, Directionality, Direction } from '@angular/cdk/bidi'

@Component({
    selector: 'anms-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [routeAnimations]
})
export class AppComponent implements OnInit {
    public isProd = env.production;
    public isRtl: boolean = false;
    public isRtl2: Direction;
    public envName = env.envName;
    public year = new Date().getFullYear();
    public logo = require('../../assets/logo.png').default;
    public languages : any[] 
    public themes: any[]  
    navigation = [
        { link: 'home', label: 'main.menu.home' },
        { link: 'products', label: 'main.menu.products' },
        { link: 'about', label: 'main.menu.about' }
    ];
    navigationSideMenu = [
        ...this.navigation,
        { link: 'setting', label: 'main.menu.setting' }
    ];
    
    selectedtheme: any  ;
    loggedIn$: Observable<boolean>;
    stickyHeader$: Observable<boolean>;
    selectedlanguage: any;

    authState: Observable<any>;
    isAuthenticated: boolean = false;
    private _dirChangeSubscription = Subscription.EMPTY;
    constructor(dir: Directionality, @Inject(DOCUMENT) private document: Document, private globalVarSrv: globalVariableService,
        private router: Router, private store: Store<AppState>) {
        //this.store.pipe(select(getAuth), take(1))
        //    .subscribe((auth) => {
        //        console.log(auth);
        //    });

        //this.isRtl = dir.value === 'rtl';
        //this.isRtl2 = dir.value;

        //this._dirChangeSubscription = dir.change.subscribe((drc: Direction) => {
        //    console.log('dir changed');
        //    this.isRtl2 = drc;
        //});
       
        //this.globalVarSrv.isUserLoggedIn.subscribe(
        //    a => {
        //        console.log(a);
        //    }
        //)
        
        this.languages = this.globalVarSrv.getLanguages().map(p => p.value);
        this.themes = this.globalVarSrv.getThemesList().map(p => p.value);
    }

    private static isIEorEdgeOrSafari() {
        return ['ie', 'edge', 'safari'].includes(browser().name);
    }

    ngOnInit(): void {

        this.globalVarSrv.getLanguage().subscribe(lang => {
            this.selectedlanguage = lang;
        })
 
        this.globalVarSrv.getTheme().subscribe(theme => {
            this.selectedtheme = theme.toLowerCase();
        }) 
        
    }

    onThemeSelect(theme: any) { 
        this.globalVarSrv.setTheme(theme.value);
    }

    onLanguageSelect({ value: language }) {
        this.globalVarSrv.setLanguage(language);
        // this.changeLangage(language);   
        // this.store.dispatch(actionSettingChangeLanguage({ language }));
    }

   
    onLoginClick() {
        this.router.navigate(['/auth/login']);
    }


    onLogoutClick() {
        this.globalVarSrv.setAuthenticated(false);
        this.store.dispatch(new fromActions.LogOut());
    }

  

    changeLangage(lang: string) {
        this.isRtl = false;
        if (lang === "ar") {
            this.isRtl2 = "rtl";
            this.isRtl = true;
        }
        let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
        htmlTag.dir = (this.isRtl) ? "rtl" : "ltr";
        //this.changeCssFile(lang);
    }

    changeCssFile(lang: string) {
        //let headTag = this.document.getElementsByTagName(
        //    "head"
        //)[0] as HTMLHeadElement;
        //let existingLink = this.document.getElementById(
        //    "langCss"
        //) as HTMLLinkElement;

        //let bundleName = lang === "ar" ? "arabicStyle.css" : "englishStyle.css";

        //if (existingLink) {
        //    existingLink.href = bundleName;
        //} else {
        //    let newLink = this.document.createElement("link");
        //    newLink.rel = "stylesheet";
        //    newLink.type = "text/css";
        //    newLink.id = "langCss";
        //    newLink.href = bundleName;
        //    headTag.appendChild(newLink);
        //}
    }
    ngOnDestroy() {
        this._dirChangeSubscription.unsubscribe();
    }
}
