import browser from 'browser-detect';
import { MediaMatcher } from '@angular/cdk/layout';
import {Output,  EventEmitter, Input, ChangeDetectionStrategy,    ViewEncapsulation,} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DOCUMENT } from "@angular/common";
import { Inject, Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,  of, Subscription } from 'rxjs';
import { filter, delay, debounceTime, map, take } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { GlobalService } from '../core/services';
import { AppState, routeAnimations  } from '../core/core.module';
import * as fromActions from '../features/account/store/auth.actions';
import { AuthActions, AuthState, getAuth, getAuthError } from '../features/account/store';
import { BidiModule, Directionality, Direction } from '@angular/cdk/bidi'
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NotificationComponent } from '../core/components/widgets/notification.component';
 

@Component({
    selector: 'anms-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [routeAnimations],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
   
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;

    public isProd = env.production;
    public isRtl: boolean = false;
    public isRtl2: Direction;
    public envName = env.envName;
    public year = new Date().getFullYear();
    public logo = require('../../assets/images/logo.png').default;

    navigations = [
        { link: 'dashboard', label: 'main.menu.dashboard', icon:"dashboard" },
        { link: 'products', label: 'main.menu.products', icon: "star"},
        { link: 'about', label: 'main.menu.about', icon: "info_outline" },
        { link: 'admin', label: 'admin', icon: "star" },
        { link: 'setting', label: 'main.menu.setting', icon: "settings" }
    ];
  
    isLoggedIn: boolean;
    selectedtheme: any;
    selectedlanguage: any;
    language$: Observable<string>;
    isAuthenticated$: Observable<boolean>;
    showLoadingBar$: Observable<boolean>;
    showSpinner$: Observable<boolean>;
    public languages: any[]
    public themes: any[]  
    private _dirChangeSubscription = Subscription.EMPTY;
    @Output() toggleSidenavNotice = new EventEmitter<void>();

    constructor(dir: Directionality, private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        @Inject(DOCUMENT) private document: Document, private globalService: GlobalService,
        private overlayContainer: OverlayContainer, private router: Router, private store: Store<AppState>) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);

        // this.router.navigate([''])
        this.showLoadingBar$ = globalService.getBarValue().pipe(delay(30));

        globalService.getSpinnerValue().subscribe((e) => { 
            this.showSpinner$ = of(e); 
         });
       
        //this.isRtl = dir.value === 'rtl';
        //this.isRtl2 = dir.value;

        //this._dirChangeSubscription = dir.change.subscribe((drc: Direction) => {
        //    console.log('dir changed');
        //    this.isRtl2 = drc;
        //});
        this.isAuthenticated$ = this.globalService.getIsAuthenticated(); 
        this.languages = this.globalService.getLanguages().map(p => p.value);
        this.themes = this.globalService.getThemesList().map(p => p.value);
         
    }
   
    private static isIEorEdgeOrSafari() {
        return ['ie', 'edge', 'safari'].includes(browser().name);
    }

    
    ngOnInit(): void {
       
         this.globalService.getLanguage().subscribe(lang => {
             this.selectedlanguage = lang;
          })
        
        this.globalService.getIsAuthenticated().subscribe(auth => {
            this.isLoggedIn = auth;
        })
       
        this.globalService.getTheme().subscribe(theme => {
            this.selectedtheme = theme.toLowerCase();

            const classList = this.overlayContainer.getContainerElement().classList;
            const toRemove = Array.from(classList).filter((item: string) =>
                item.includes('-theme')
            );
            if (toRemove.length) {
                classList.remove(...toRemove);
            }
            classList.add(this.selectedtheme); 
        }) 
        
    }

    onThemeSelect(theme: any) { 
        this.globalService.setTheme(theme.value);
    }

    onLanguageSelect({ value: language }) {
        this.globalService.setLanguage(language); 
    }

   
    onLoginClick() {
        this.router.navigate(['/auth/login']);
    }


    onLogoutClick() {
         this.globalService.setAuthenticated(false);
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
    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }
    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener); 
        this._dirChangeSubscription.unsubscribe();
    }
}
