import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { GlobalService } from '../services/globalService';
 

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    constructor(private gService: GlobalService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.gService.showSpinner();

        return next
            .handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.gService.hideSpinner();
                    }
                }, (error) => {
                        this.gService.hideSpinner();
                })
            );
    }
}
