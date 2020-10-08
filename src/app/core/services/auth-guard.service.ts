import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route , UrlTree, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { globalVariableService } from './globalVariableService';
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
export class AuthGuardService implements CanActivate {
    isAuthenticated: boolean;
    constructor(private authService: AuthService, private router: Router, private store: Store<AppState>,
        private globalVarSrv: globalVariableService,) {
      
       // this.store.pipe(select(selectAuthState), take(1))
       //             .subscribe((auth) => {
       //                 console.log(auth);
       //                 //return of(auth.isAuthenticated);
       //             }); 

       
    }
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree { 
        this.globalVarSrv.isUserLoggedIn.subscribe((isAuth) => {
            if (!isAuth) {
                console.log(isAuth);
               // this.router.navigate(['login'])
               // return false
            }
        })
        const observable = new Observable<boolean>((observer) => {
            const authenticated: boolean = this.authService.isAuthenticated(); 
            console.log(authenticated);
            console.log(state.url);
            if (authenticated) {
                observer.next(true);
            }
            else {
                this.router.navigate(["/auth/login"]);
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
