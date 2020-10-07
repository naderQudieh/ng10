import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
 
//@Injectable()
export class JwtRefreshInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private jwtHelper: JwtHelperService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.url.startsWith('/api') && !req.url.startsWith('/api/auth/')) { 
          if (this.authService.isTokenExpired) {
              console.log('Refreshing token');
              this.authService.getAuthRefreshToken(localStorage.getItem('refresh_token'))
              .subscribe(resp => {
                localStorage.setItem('access_token', resp.access_token );
                localStorage.setItem('refresh_token', resp.refresh_token);
           });
      }
    }
    return next.handle(req);
  }

}