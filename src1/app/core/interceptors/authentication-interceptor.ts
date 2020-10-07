import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import { AuthActions, getAuth, getAuthError } from '../../features/account/store/';
import { UserInfo, AuthToken, UserClaims, AuthState } from '../../features/account/store/auth.model';
import { AuthSelectors } from '../../features/account/store/';
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private isRefreshing;
    private refreshTokenSubject: BehaviorSubject<AuthToken>;

  constructor( private authService: AuthService) {
      this.refreshTokenSubject = new BehaviorSubject<AuthToken>(null);
      this.isRefreshing = false;
     }

     intercept(request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>>  {
         const tokens = this.authService.getUserToken();
      if (tokens !== null) {
        request = this.addTokensToHeader(request, tokens);
      }
      return next.handle(request).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next, tokens);
        }
        return throwError(error);
      }));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler, tokens: UserClaims): Observable<any> {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
        return this.refreshTokens(request, next, tokens);
       }
      return this.continueWithoutRefreshing(request, next, tokens);
    }

    private refreshTokens(request: HttpRequest<any>, next: HttpHandler, tokens: UserClaims): Observable<any> {
        return this.authService.getAuthRefreshToken().pipe(
            switchMap((newTokens) => {
            this.isRefreshing = false; 
            this.refreshTokenSubject.next(newTokens);
          return next.handle(this.addTokensToHeader(request, newTokens));
         }));
    }

    private continueWithoutRefreshing(request: HttpRequest<any>, next: HttpHandler, tokens: UserClaims): Observable<any> {
      return this.refreshTokenSubject.pipe(
        take(1),
        switchMap(() => {
          return next.handle(this.addTokensToHeader(request, tokens));
        }));
    }

    private addTokensToHeader(request: HttpRequest<any>, tokens: UserClaims) {
      return request.clone({
        headers: request.headers.set('RefreshToken', tokens.refresh_token),
        setHeaders: {
          Authorization: `Bearer ${tokens.access_token}`
        }
      });
    }
}
