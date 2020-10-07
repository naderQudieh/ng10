
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store'; 
import { authReducer } from './store/auth.reducer';
import { AuthState } from './store/auth.model';
import { AppState } from '../../core/core.module';

export const FEATURE_NAME = 'account';
export const selectAccount  = createFeatureSelector<State,AccountState>(FEATURE_NAME); 
export const selectState = createFeatureSelector<State,AuthState>('auth');

export const account_reducers: ActionReducerMap<AccountState> =
{
    auth: authReducer
};

export interface AccountState  {
    auth: AuthState;
    //auth: fromAuth.State
}
//export interface AccountState extends AuthState {
//    auth: AuthState;
//    //auth: fromAuth.State
//}

export interface State extends AppState { account: AccountState, auth: AuthState}
