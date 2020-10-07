import { Action } from '@ngrx/store';
import { createAction, props } from '@ngrx/store';
import { UserModel } from './auth.model';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_ERROR = '[Auth] Login Failure',
    SIGNUP = '[Auth] Signup',
    SIGNUP_SUCCESS = '[Auth] Signup Success',
    SIGNUP_ERROR = '[Auth] Signup Failure',
    LOGOUT = '[Auth] Logout',
    INIT_APP= '[App] Start app initializer',
    INIT_APP_ERROR= '[App] Start app initializer fail',
}

export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: UserModel ) {
        console.log('Action LogIn');
        console.log(payload);
    }
}

export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any ) {
        console.log('Action LogInSuccess');
    }
}

export class LogInError implements Action {
    readonly type = AuthActionTypes.LOGIN_ERROR;
    constructor(public payload: any) { }
}

export class SignUp implements Action {
    readonly type = AuthActionTypes.SIGNUP;
    constructor(public payload: any) { }
}

export class SignUpSuccess implements Action {
    readonly type = AuthActionTypes.SIGNUP_SUCCESS;
    constructor(public payload: any) { }
}

export class SignUpError implements Action {
    readonly type = AuthActionTypes.SIGNUP_ERROR;
    constructor(public payload: any) { }
}

export class LogOut implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export class StartAppInitializer implements Action {
    readonly type = AuthActionTypes.INIT_APP;
    constructor(public payload: any = null) { }
}
export class StartAppInitializerFail implements Action {
    readonly type = AuthActionTypes.INIT_APP_ERROR;
    constructor(public payload: any = null) { }
}

export type All =
    | LogIn
    | LogInSuccess
    | LogInError
    | SignUp
    | SignUpSuccess
    | SignUpError
    | LogOut
    | StartAppInitializer
    | StartAppInitializerFail;

 

