import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AccountState, selectAccount } from '../account.state';
import { AuthState } from './auth.model';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector("auth");

export const getAuth = createSelector(
    selectAuthState,
    (state: AuthState) => {
        //console.log(state);
        return state
      }
);

export const getAuthError = createSelector(
    getAuth,
    (authState: AuthState) => {
        if (authState) {
            return authState.error;
        } else {
            return null;
        }
    }
);
export const  getAuthRole = createSelector(
    getAuth,
    (authState: AuthState) => {
        if (authState) {
            return authState.role;
        } else {
            return null;
        }
    }
);
export const getAuthIsAuthenticated  = createSelector(
    getAuth,
    (authState: AuthState) => {
        if (authState) {
            return authState.isAuthenticated;
        } else {
            return null;
        }
    }
);

export const getAuthToken2  = createSelector(
    getAuth,
    (authState: AuthState) => {
        if (authState) {
            return authState.authToken;
        } else {
            return null;
        }
    }
);

export const getAuthCurrentUser = createSelector(
    getAuth,
    (authState: AuthState) => {
        if (authState) {
            return authState.userInfo ;
        } else {
            return null;
        }
    }
);
export const getAuthToken = createSelector(
    getAuth,
    fromAuth.getAuthToken
);
export const isAuthTokenExpired = createSelector(
    getAuth,
    fromAuth.isAuthTokenExpired
);

export const getAuthTokenClaims = createSelector(
    getAuth,
    fromAuth.getAuthTokenClaims
);
export const getValidToken  = createSelector(
    getAuth,
    (authState: AuthState) => {
        if (authState) {
            if (!authState.isTokenExpired && authState.authToken) {
                return authState.authToken;
            }  
        }   
        return null;
       
    }
);