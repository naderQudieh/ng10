import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store, StoreModule, select } from '@ngrx/store'; 
import { environment } from '../../../environments/environment';
import { catchError, delay, tap, map } from 'rxjs/operators';
import { Observable, throwError, Subscription, Subject, BehaviorSubject, of } from 'rxjs';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { UserInfo, AuthToken, UserClaims, AuthState } from '../../features/account/store/auth.model';
import { AppState } from '../store/app.state';
import { AuthReducer, AuthActions, AuthSelectors } from '../../features/account/store';
import { globalVariableService } from './globalVariableService';
import { SpinnerService } from 'src/app/shared/services';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userId: number;
    protected logoutUrl = `${environment.baseUrl}/auth/sign-out`;
    protected tokenUrl = `${environment.baseUrl}/auth/login`;
 
    constructor(private spinner: SpinnerService, private gStoreService: globalVariableService, protected http: HttpClient, public jwtHelper: JwtHelperService,
        protected storageService: LocalStorageService) {
        
    }

    public registerUser(registerData: any): Observable<any> {
        
        return this.http.post(`${environment.baseUrl}/auth/sign-up`, registerData);
    }

    public login(loginData: any): Observable<AuthToken> {
        // let fakeResponse = [1, 2, 3];
        // let delayedObservable = Observable.of(fakeResponse).delay(5000);
        let _userClaims: UserClaims = {
            "iss": "www.ourdnsname.com",
            "iat": 1601850811,
            "exp": 1633386853,
            "aud": "www.example.com",
            "sub": "useremail@example.com",
            "name": "nahed kadih",
            "email": "jrocket@example.com",
            "role": "1,2",
            "first_name": "nahed",
            "last_name": "kadih"
        }
        let mytokenkey = "qwertyuiopasdfghjklzxcvbnm123456";
        let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3d3cub3VyZG5zbmFtZS5jb20iLCJpYXQiOjE2MDE4NTA4MTEsImV4cCI6MTYzMzM4Njg1MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoidXNlcmVtYWlsQGV4YW1wbGUuY29tIiwibmFtZSI6Im5haGVkIGthZGloIiwiZW1haWwiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwicm9sZSI6IjEsMiIsImZpcnN0X25hbWUiOiJuYWhlZCIsImxhc3RfbmFtZSI6ImthZGloIn0.b0Pt27Q2_Q18n-usQQPvwCa8SdJfyEbaapY8qT622mw";
        let _token: AuthToken = {
            userId: 1601841917,
            access_token: token,
            refresh_token: 'fea054eb-98f8-46c7-ad5d-5074db74c2b6',
            token_type: 'bear',
            expires_date: '11/11/2020' 
        }
        this.userId = _token.userId; 
        //this.storageService.setUserToken(_token);
       // let xxxx = this.storageService.getUserAuthToken();
        //console.log(this.jwtHelper.decodeToken(xxxx.access_token));
        //this.gStoreService.setLoggedIn();
        return of(_token);
        // this.storageService.deleteAdmin();
        //return this.http.post(`${environment.baseUrl}/auth/sign-in`, loginData);
    }



    public logout(): Observable<any> {
        //const headers = new HttpHeaders();
        //const accessToken = this.storageService.getAccessToken();
        //headers.set('Authorization', 'Bearer ' + accessToken);
        //headers.set('Cache-Control', 'no-cache');
        this.storageService.clearToken(); 
        //this.gStoreService.setLoggedOut();
        return of({ fake: true }); 
    }

    public forgot(forgotData: any) {
        return this.http.post(
            `${environment.baseUrl}/auth/forgot-password`,
            forgotData,
        );
    }

    public reset(forgotData: any) {
        return this.http.post(
            `${environment.baseUrl}/auth/change-password`,
            forgotData,
        );
    }
     

   

    getAuthRefreshToken(refresh_token?: string): Observable<AuthToken> {
        const payload = {
            grant_type: 'refresh_token',
            refresh_token: this.storageService.getRefreshToken()
        };
        return this.http.post(`${environment.baseUrl}/auth/refresh_token/`, payload)
            .pipe(
                catchError(this.handleError),
                tap((data: any) => {
                    this.storageService.setUserToken(data);
                })
            );
    }
 
    getAccessToken(): string {
        return this.storageService.getAccessToken(); 
    }
    getRefreshToken(): string {
        return this.storageService.getRefreshToken();
    }
    setUserToken(authtoken: AuthToken )  {
        this.storageService.setUserToken(authtoken);
    }
    getUserToken(): AuthToken {
       return this.storageService.getUserAuthToken();
    }
    isTokenExpired() { 
        try {
            let accessToken = this.storageService.getAccessToken(); 
            console.log(this.jwtHelper.decodeToken(accessToken));
            console.log(this.jwtHelper.getTokenExpirationDate(accessToken));
            return this.jwtHelper.isTokenExpired(accessToken);
        } catch (err) {
            return false;
        } 
    }

    isTokenExpired2(token?: string): boolean {
        if (!token) { token = this.getAccessToken(); }
        if (!token) { return true; }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) { return false; }
        return !(date.valueOf() > new Date().valueOf());
    }
    getTokenExpirationDate(token: string): Date {
        if (!token) { return null; }
        const decoded = this.jwtHelper.decodeToken(token) 
        const expirationDate = decoded.expires_in;
        if (expirationDate === undefined) { return null; }

        const date = new Date(0);
        date.setUTCSeconds(expirationDate);
        return date;
    }

    decodeToken() {
        let token = this.storageService.getAccessToken(); 
        return this.jwtHelper.decodeToken(token);
    }
 
    public isAuthenticated(): boolean {
        let accessToken = this.storageService.getAccessToken(); 
        if (!accessToken) { console.error('accessToken is null'); } 
        if (accessToken) {
            let isexp = this.jwtHelper.isTokenExpired(accessToken);
            if (isexp) { console.error('expired'); } 
            return !isexp;
        }  
         return false; 

    }
    public confirmEmail(token: string) {
        return this.http.post(`${environment.baseUrl}/auth/confirm-email`, {
            token,
        });
    }

    public checkToken(data: { token: string; user_id: number | string }) {
        return this.http.post(`${environment.baseUrl}/auth/check-token`, data);
    }

    public resendCodeTFA() {
        return this.http.get(`${environment.baseUrl}/two-factor-auth/send-code`);
    }
    public checkTFA() {
        return this.http.get(`${environment.baseUrl}/auth/check-two-factor-auth`);
    }

    public confirmCodeTFA(code: string) {
        return this.http.put(
            `${environment.baseUrl}/two-factor-auth/confirm-code`,
            { code },
        );
    }
    private handleError(error: HttpErrorResponse): Observable<never> {
        return throwError(error);
    }
}
