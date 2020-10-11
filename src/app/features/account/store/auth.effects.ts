import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { merge, BehaviorSubject, Observable } from 'rxjs';
import { map, flatMap, exhaustMap, switchMap, mergeMap, concatMap, tap, distinctUntilChanged, filter } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { AuthService } from '../../../core/services/auth.service';
import { AuthActionTypes, LogIn, LogInSuccess, LogInError, SignUp, SignUpSuccess, SignUpError, LogOut } from './auth.actions';
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

    @Effect()
    Login = this.actions.pipe(ofType(AuthActionTypes.LOGIN),
        map((action: LogIn) => action.payload),
        switchMap(payload =>
            this.authService.login(payload).pipe(
                map((authToken: any) => {
                    if (authToken) {
                        if (payload['returnUrl']) {
                            authToken['returnUrl'] = payload['returnUrl'];
                        }
                        return new LogInSuccess(authToken);
                    } else {
                        return new LogInError({ error: 'Sign in first' });
                    }
                }),
                catchError(error => of(new LogInError({ error })))
            )
        )
    );

 

    @Effect({ dispatch: false })
    loginSuccess = this.actions.pipe(ofType(AuthActionTypes.LOGIN_SUCCESS),
        map((action: any) => action.payload),
        switchMap((payload: any) => {
            let redirectUrl = payload['redirectUrl'] || null;
            if (redirectUrl == null) {
                redirectUrl = '/home';
            } else {
                this._delete(payload, 'redirectUrl');
            }
            this.authService.LogInSuccess(payload);
            return this.router.navigateByUrl(redirectUrl);

        })
    );




    @Effect()
    SignUp: Observable<Action> =  this.actions.pipe(ofType(AuthActionTypes.SIGNUP))
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
            );


    SignUpSuccess: Observable<any> = createEffect(() =>
            this.actions.pipe(ofType(AuthActionTypes.SIGNUP_SUCCESS),
                tap((action) => {
                    //this.storageService.getUserAuthToken(user); 
                })
            ),
        { dispatch: false }
    );
  

    SignUpFailure: Observable<any> = createEffect(() =>
        this.actions.pipe(ofType(AuthActionTypes.SIGNUP_ERROR)),
        { dispatch: false }
    );


    @Effect({ dispatch: false })
    LogOut: Observable<any> = this.actions.pipe(ofType(AuthActionTypes.LOGOUT),
        map((action: any) => {
            this.authService.logout();
            return this.router.navigateByUrl('/auth/login');
        })
    );


    private _delete(obj, prop) {
        if (obj[prop] && !obj[prop].length) delete obj[prop];
    }


}