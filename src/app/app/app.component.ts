import browser from 'browser-detect';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DOCUMENT } from "@angular/common";
import { Inject } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, debounceTime, map, take } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { globalStoreService } from '../core/services/globalstoreservcie';
import { AppState, routeAnimations, selectSettingStickyHeader, selectSettingLanguage, selectEffectiveTheme } from '../core/core.module';
import { actionSettingChangeAnimationsPageDisabled, actionSettingChangeLanguage } from '../core/store/setting/setting.actions';
import * as fromActions from '../features/account/store/auth.actions';
import { AuthActions, AuthState, getAuth, getAuthError } from '../features/account/store';
import { BidiModule, Directionality } from '@angular/cdk/bidi'

@Component({
    selector: 'anms-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [routeAnimations]
})
export class AppComponent implements OnInit {
    private isProd = env.production;
    private isRtl: boolean = false;
    private envName = env.envName;
    private year = new Date().getFullYear();
    private logo = require('../../assets/logo.png').default;
    private languages = ['en', 'fr', 'ar'];
    navigation = [
        { link: 'home', label: 'main.menu.home' },
        { link: 'products', label: 'main.menu.products' },
        { link: 'about', label: 'main.menu.about' }
    ];
    navigationSideMenu = [
        ...this.navigation,
        { link: 'setting', label: 'main.menu.setting' }
    ];

    loggedIn$: Observable<boolean>;
    stickyHeader$: Observable<boolean>;
    language$: Observable<string>;
    theme$: Observable<string>;
    authState: Observable<any>;
    isAuthenticated: boolean = false;

    constructor(dir: Directionality, @Inject(DOCUMENT) private document: Document, private gStoreService: globalStoreService, private router: Router, private store: Store<AppState>) {
        this.store.pipe(select(getAuth), take(1))
            .subscribe((auth) => {
                console.log(auth);
                //this.mainform.patchValue(auth)
            });
        this.store.select(state => state['auth']).subscribe(
            auth => {
                console.log(auth);
                this.isAuthenticated = auth.isAuthenticated;
            }
        );

    }

    private static isIEorEdgeOrSafari() {
        return ['ie', 'edge', 'safari'].includes(browser().name);
    }

    ngOnInit(): void {


        if (AppComponent.isIEorEdgeOrSafari()) {
            this.store.dispatch(
                actionSettingChangeAnimationsPageDisabled({
                    pageAnimationsDisabled: true
                })
            );
        }

        this.stickyHeader$ = this.store.pipe(select(selectSettingStickyHeader));
        this.language$ = this.store.pipe(select(selectSettingLanguage));
        this.theme$ = this.store.pipe(select(selectEffectiveTheme));
    }



    onLoginClick() {
        this.router.navigate(['/auth/login']);
    }


    onLogoutClick() {

        this.store.dispatch(new fromActions.LogOut());
    }

    onLanguageSelect({ value: language }) {
        this.changeLangage(language);
        this.store.dispatch(actionSettingChangeLanguage({ language }));
    }

    changeLangage(lang: string) {
        let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
        htmlTag.dir = lang === "ar" ? "rtl" : "ltr"; 
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
}
