import { Action, ActionReducerMap,  MetaReducer,  createFeatureSelector} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { environment } from '../../../environments/environment';
 
import { createReducer, createSelector, Selector } from '@ngrx/store';
import { authReducer, initialState } from '../../features/account/store/auth.reducer'; 
import { AuthActions } from '../../features/account/store'; 
 import { AuthState } from '../../features/account/store/auth.model';
import { RouterState } from './router/router.state';

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

//export const getSelectedCore = createSelector(
//    getAllCore,
//    getSelectedId,
//    (core, id) => {
//        const result = core.find(it => it['id'] === id);
//        return result ? Object.assign({}, result) : undefined;
//    }
//);
 