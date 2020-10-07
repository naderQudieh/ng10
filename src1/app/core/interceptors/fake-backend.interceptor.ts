import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { HttpEvent } from '@angular/common/http/src/response';
import { HttpRequest } from '@angular/common/http/src/request';
import { HttpHandler } from '@angular/common/http/src/backend';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


interface Account {
  email: string;
  name?: string;
  password: string;
}

const DEFAULT_ACCOUNTS: Array<Account> = [
  {email: 'konstantin@mail.ru', password: '123'}
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {
    if (!window.localStorage.getItem('accounts')) {
      window.localStorage.setItem('accounts', JSON.stringify(DEFAULT_ACCOUNTS));
    }
  }

  interceptLogin(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const {email, password} = req.body;
    const accounts = JSON.parse(window.localStorage.getItem('accounts'));
    const account = accounts.find(v => v.email === email && v.password === password);
    if (account) {
      const body = {email, token: `fake-jwt-token-${email}`};
      return of(new HttpResponse({status: 200, body}));
    } else {
      return throwError(401);
    } 
  } 

  interceptRegister(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const {email, name, password} = req.body;
    const accounts = JSON.parse(window.localStorage.getItem('accounts'));
    const existingAccount = accounts.find(v => v.email === email);
    if (existingAccount) {
      return throwError(401);
    } else {
      accounts.push({email, name, password});
      window.localStorage.setItem('accounts', JSON.stringify(accounts));
      const body = {email, token: `fake-jwt-token-${email}`};
      return of(new HttpResponse({status: 200, body}));
    } 
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(mergeMap(() => {
      if (req.url.endsWith('/users/login') && req.method === 'POST') {
        return this.interceptLogin(req);
      } else if (req.url.endsWith('/users/register') && req.method === 'POST') {
        return this.interceptRegister(req);
      }
      return next.handle(req);
    }))
    .pipe(materialize())
    .pipe(delay(500))
    .pipe(dematerialize());
  }
}
