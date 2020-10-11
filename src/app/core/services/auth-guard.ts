import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, NavigationExtras, RouterStateSnapshot, CanLoad, Route , UrlTree, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { GlobalService } from './globalService';
//import { selectIsAuthenticated } from '../../features/account/store/auth.selectors';
import { AccountState, } from '../../features/account/account.state';
import {AuthState  } from '../../features/account/store/auth.model';
import { selectAuthState, AppState } from '../store/app.state';
import { AuthService } from './auth.service';
import { mergeMap, take, map } from 'rxjs/operators';
import { log } from 'util';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate {
    isAuthenticated: boolean;
    constructor(private authService: AuthService, private router: Router, private store: Store<AppState>,
        private globalVarSrv: GlobalService,) {
      
       // this.store.pipe(select(selectAuthState), take(1))
       //             .subscribe((auth) => {
       //                 console.log(auth);
       //                 //return of(auth.isAuthenticated);
       //             }); 

       
    }
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree { 
        const returnurl: string = state.url;
        this.globalVarSrv.isAuthenticated.subscribe((isAuth) => {
            if (!isAuth) {
                console.log(isAuth);
               // this.router.navigate(['login'])
               // return false
            }
        })
        const observable = new Observable<boolean>((observer) => {
            const authenticated: boolean = this.authService.isAuthenticated();  
            if (authenticated) {
                observer.next(true);
            }
            else {
                this.authService.redirectUrl = returnurl; 
                const navigationExtras: NavigationExtras = {
                    queryParams: { redirectUrl: returnurl } 
                };
                this.router.navigate(['/auth/login'], navigationExtras);
                observer.next(false);
            }
            //if (!this.auth.isTokenExpired()) {
            //    observer.next(true);
            //} else {
            //    observer.next(false); 
            //    this.router.navigate(['auth/login', { returnUrl: (state.url ? state.url : '') }]); 
                
            //}
            //if (this.isAuthenticated) {
            //    observer.next(true);
            //} else { 
            //    observer.next(false); 
            //    this.router.navigate(['auth/login', { returnUrl: (state.url ? state.url : '') }]   ); 
            //} 
        });
        return observable;
        //return this.isAuthenticated();//  this.store.pipe(select(selectIsAuthenticated));
    }

    //canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean { 
    //    return this.store.select('account').map((state: AccountState) => state.auth.authToken);
    //}
    //canActivate3(): Observable<boolean> | boolean {

    //    return true;
    //    //return this.role$.pipe(
    //    //    map((role: string) => {
    //    //        if (role != "ADMIN") {
    //    //            this.router.navigate(['login']);
    //    //            return false;
    //    //        }
    //    //        return true

    //    //    }
    //    //    ))
    //}

    //canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //    this.store.pipe(select(selectAuth), take(1))
    //        .subscribe((auth) => {
    //            console.log(auth);
    //            return of(auth.isAuthenticated;
    //        }); 
 
    //}

    //canActivate2(): Observable<boolean> | boolean {
    //    if (localStorage.getItem('AuthToken')) {
    //        return true;
    //    }
    //    return false;

    //}
}
