import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  constructor(
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urlArray = request.url.split('/');
    if (urlArray[1] === 'assets'){
      return next.handle(request);
    }
    const apiReq = request.clone({ url: `${environment.baseUrl}/${request.url}` });
    return next.handle(apiReq);
  }
}
