import { Action, ActionReducerMap, ActionReducer,  MetaReducer,  createFeatureSelector} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { environment } from '../../../environments/environment';
import { createReducer, createSelector, Selector } from '@ngrx/store';
import { authReducer, initialState } from '../../features/account/store/auth.reducer'; 
import { AuthActions } from '../../features/account/store'; 
 import { AuthState } from '../../features/account/store/auth.model';
import { RouterState } from './router/router.state';
import { storeLogger } from 'ngrx-store-logger';

export const reducers: ActionReducerMap<AppState> = {
  
    auth: authReducer, 
    router: routerReducer
}; 
 
 
 export const selectAuthState = createFeatureSelector<AppState, AuthState>('auth'); 
 export const selectRouterState = createFeatureSelector<AppState, RouterReducerState<RouterState>>('router');



export interface AppState {
    auth: AuthState; 
    router: RouterReducerState<RouterState>;
}
 
export const getCoreState: Selector<AppState, AppState> = state => {
    return state
};

export function logger(reducer: ActionReducer<AppState>): any {
    return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [
   // logger
];