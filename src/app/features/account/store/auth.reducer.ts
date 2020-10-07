import { UserInfo, AuthToken, AuthState, UserClaims } from './auth.model';
import { AuthActionTypes, All } from './auth.actions';
import { log } from 'console';
import { AuthService } from '../../../core/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';



export const initialState: AuthState = {
    authToken: getToken(),
    userclaims: getUserClaims(),
    isAuthenticated: getIsAuthenticated(),
    isTokenExpired: false, 
    isLoading: false,
    error: null,
};
export function authReducer(state = initialState, action: any): AuthState {
     

    switch (action.type) {
        case AuthActionTypes.LOGIN: {
            return {
                ...state,
                isAuthenticated: false,
                isLoading: true,
                userInfo:null ,
                error: null,
            };
        }
        case AuthActionTypes.LOGIN_SUCCESS: {
            console.log('AuthActionTypes.LOGIN_SUCCESS'); 
            saveToken(action.payload);
            return {
                ...state,
                ...getAuthentication(action.payload),
                isLoading: false,
                isAuthenticated: true,
                authToken: action.payload, 
                error: null,
            };
        }
        case AuthActionTypes.LOGIN_ERROR: {
            return {
                ...state,
                authToken:null,
                error: 'Incorrect email or password.',
            };
        }
        case AuthActionTypes.SIGNUP_SUCCESS: {
            return {
                ...state,
                isAuthenticated: false,
                authToken: null,
                error: null,
            };
        }
        case AuthActionTypes.LOGOUT: {
            return {
                ...state,
                isAuthenticated: false,
                authToken: null,
                error: null,
                userclaims: null,
            };
        }
        case AuthActionTypes.INIT_APP_ERROR:
            return initialState
        default: {
            return state;
        }
    } 
    
}

function saveToken(_token) {
    localStorage.setItem('user_token', JSON.stringify(_token));  
}


function getAuthentication(token: AuthToken): AuthState {
    const jwtHelper = new JwtHelperService();
    if (token == null) {
        return { authToken: null, userclaims: null, error: null };
    } else {
        if (isTokenExpired(token.access_token))
        {
            return { isTokenExpired: true, authToken: null, userclaims: null, error: null };
        } else
        {
            const claims = jwtHelper.decodeToken(token.access_token);
            return { isTokenExpired: false, authToken: token, userclaims: claims, error: null };
        }
    }
}

function isTokenExpired(token) {
    const jwtHelper = new JwtHelperService(); 
    const claims = jwtHelper.decodeToken(token);

    if (claims.exp < new Date().getTime() / 1000) {
        destroyToken();
        return true;
    } else {
        return false;
    }
}

function destroyToken() {
    localStorage.removeItem('user_token');
}
export function getToken(): AuthToken {
    let token = localStorage.getItem("user_token");
    try {
        return JSON.parse(token)
    } catch (err) {
        return null;
    }
}
export function getUserClaims(): UserInfo {
    let token = localStorage.getItem("user_claims");
    try {
        return JSON.parse(token)
    } catch (err) {
        return null;
    }
}

export const getAuthTokenClaims = (state: AuthState) => {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(state.authToken.access_token) as UserClaims
};
export const getAuthToken = (state: AuthState) => state.authToken;

export function isAuthTokenExpired() : boolean {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(getToken().access_token)
};


export function getIsAuthenticated(): boolean { 
    const jwtHelper = new JwtHelperService();
    let token = getToken(); 
    if (token) { 
        return !jwtHelper.isTokenExpired(getToken().access_token)
    }
    return false;
}
 