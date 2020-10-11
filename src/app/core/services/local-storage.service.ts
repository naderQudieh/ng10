import { Inject, Injectable, InjectionToken } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthToken, UserClaims } from '../../features/account/store/auth.model';
import { Observable, of } from 'rxjs';

export const TOKEN_INFO = 'user_token';
export const USER_INFO = 'user_claims';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage
});

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService { 

    constructor(@Inject(BROWSER_STORAGE) public storage: Storage,  public jwtHelper: JwtHelperService) { } 

  
    public setItem(key: string, value: any)  {
        
            localStorage.setItem(key, JSON.stringify(value));
           
    }

    public getItem(key: string)  {
        try { 
            return JSON.parse(localStorage.getItem(key));
        } catch (err) {
            return null;
        }  
    }

    public removeItem(key: string)  { 
         localStorage.removeItem(key);  
    }

     


    setUserToken(token: AuthToken) {
       
        let _authTokenInfo = this.jwtHelper.decodeToken(token.access_token);
        localStorage.setItem(USER_INFO, JSON.stringify(_authTokenInfo)); 
        localStorage.setItem(TOKEN_INFO, JSON.stringify(token)); 
        
    }

    getUserAuthToken(): AuthToken {
        let token = localStorage.getItem(TOKEN_INFO); 
        try {
            return JSON.parse(token)
        } catch (err) {
            return null;
        } 
    }
    getUserUserClaims(): UserClaims {
        let userTokenInfo = localStorage.getItem(USER_INFO);
        try {
            return JSON.parse(userTokenInfo)
        } catch (err) {
            return null;
        }
    }
    getRefreshToken(): string {
        let token = this.getUserAuthToken();
        return token ? token.refresh_token : null;
    }

    getAccessToken(): string {
        let token = this.getUserAuthToken(); 
        if (!token) { console.error('token is null'); } 
        return token ? token.access_token : null;
    }

    clearToken() { 
        localStorage.removeItem(TOKEN_INFO);
        localStorage.removeItem(USER_INFO);
    }
   
    isTokenExpired() {

        try {
            let accessToken = this.getAccessToken();
            console.log(this.jwtHelper.decodeToken(accessToken));
            console.log(this.jwtHelper.getTokenExpirationDate(accessToken));
            return this.jwtHelper.isTokenExpired(accessToken);
        } catch (err) {
            return false;
        }
    }

    clear() {
        this.storage.clear();
    }
    
}
