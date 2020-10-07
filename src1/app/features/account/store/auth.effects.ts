import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { merge,  BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, mergeMap, concatMap, tap, distinctUntilChanged, filter } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { AuthService } from '../../../core/services/auth.service';
import { AuthActionTypes, StartAppInitializerFail, LogIn, LogInSuccess, LogInError, SignUp, SignUpSuccess, SignUpError, LogOut, } from './auth.actions';
import { AuthToken, UserInfo } from './auth.model';
import { selectQueryParam, selectUrl } from '../../../core/store/router/router.state';

@Injectable()
export class AuthEffects {
       
 

    constructor(private store: Store,
        private actions: Actions, protected storageService: LocalStorageService,
        private authService: AuthService,
        private router: Router
    ) {
          
    }

    LogIn: Observable<any> = createEffect(() =>
        this.actions.pipe(ofType(AuthActionTypes.LOGIN))
            .pipe(map((action: LogIn) => action.payload))
            .pipe(
                switchMap((payload) => {
                    console.log(payload);
                    return this.authService.login(payload).pipe(map((authToken) => { 
                                //console.log(authToken);
                                if (authToken) {  
                                    if (payload['returnUrl']) {
                                        authToken['returnUrl'] = payload['returnUrl'];
                                    }  
                                    return new LogInSuccess(authToken);
                                } else {
                                    return new LogInError({ error: 'Sign in first' });
                                }
                            })
                        )
                        .pipe(
                            catchError((error) => {
                                return of(new LogInError({ error }));
                            })
                        );
                })
            )
    );
    
    LogInSuccess: Observable<any> = createEffect(() =>
        this.actions.pipe(ofType(AuthActionTypes.LOGIN_SUCCESS))
            .pipe(map((action: LogInSuccess) => action.payload))
            .pipe(
                tap((payload: AuthToken) => {
                    //console.log(payload);
                    let returnUrl = payload['returnUrl'] || null;
                    //console.log(returnUrl);
                    if (!returnUrl) {
                        returnUrl = '/home';
                    } else {
                        this._delete(payload, 'returnUrl'); 
                    } 
                    this.authService.setUserToken(payload); 
                    this.router.navigateByUrl(returnUrl);
                })
        ),
        { dispatch: false }
    );
    

    SignUp: Observable<any> = createEffect(() =>
        this.actions.pipe(ofType(AuthActionTypes.SIGNUP))
            .pipe(map((action: SignUp) => action.payload))
            .pipe(
                switchMap((payload) => {
                    //console.log(payload);
                    return this.authService.registerUser
                        (payload)
                        .pipe(
                            map((user) => {
                                return new SignUpSuccess(payload);
                            })
                        )
                        .pipe(
                            catchError((error) => {
                                return of(new SignUpError({ error }));
                            })
                        );
                })
            )
    );

    SignUpSuccess: Observable<any> = createEffect(
        () =>
            this.actions.pipe(
                ofType(AuthActionTypes.SIGNUP_SUCCESS),
                tap((user) => {
                    //this.storageService.getUserAuthToken(user); 
                })
            ),
        { dispatch: false }
    );

    SignUpFailure: Observable<any> = createEffect(
        () => this.actions.pipe(ofType(AuthActionTypes.SIGNUP_ERROR)),
        { dispatch: false }
    );

    public LogOut: Observable<any> = createEffect(
        () =>
            this.actions.pipe( ofType(AuthActionTypes.LOGOUT),
                tap((user) => { 
                    //console.log('eff logout');
                    this.authService.logout(); 
                    this.storageService.clearToken(); 
                    this.router.navigateByUrl('/auth/login');
                })
            ),
        { dispatch: false }
    );

    
    StartApp$ = this.actions
        .pipe(
            ofType(AuthActionTypes.INIT_APP),
            mergeMap(() => {
               // const token = this.storageService.getItem("userToken");
                const payload = this.authService.decodeToken(); 
                 return of(true)
            }),
            catchError(() => {
                this.storageService.clear();
                return of(new StartAppInitializerFail())
            })
        )
    public redirectAfterLogin: Observable<any> =   createEffect(
        () =>
            this.store.pipe(select(selectQueryParam('returnUrl'))).pipe( 
                tap(navigateTo => this.router.navigateByUrl(navigateTo))
            ),
        { dispatch: false }
    );
    private redirectToPreviousUrl = (returnUrl: string) => {
        this.router.navigateByUrl(returnUrl);
    };
    private _delete(obj, prop) {
        if (obj[prop] && !obj[prop].length) delete obj[prop];
    }
    //private decodedToken() {
    //    const token = this.jwtStorageService.getToken();
    //    if (!token || new JwtHelperService().isTokenExpired(token)) {
    //        this.logout();
    //        return null;
    //    }

    //    const decodedToken = new JwtHelperService().decodeToken(token);
    //    this.user = decodedToken;
    //    return this.user;
    //}

}