import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  HttpEventType,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  accessTokenHeader = 'x-access-token';
  defaultAccessToken = '';
  defaultOauthProvider = 'Google';
  restURLHeaders = {
    accessToken: '',
    oauthProvider: 'Google',
  };
  globals: any = {
    env: '',
  };
  private state: any;
  public apiHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router, private dialogRef: MatDialog) {}

  configureServerParams(_isFile?: any) {
    this.apiHeaders = new HttpHeaders();
    let commonheaders = {
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
      'If-Modified-Since': '0',
    };
    if (sessionStorage.getItem('access_token')) {
      this.apiHeaders = this.apiHeaders.set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('access_token'))}`
      );
    }
    Object.keys(commonheaders).forEach((c) => {
      this.apiHeaders = this.apiHeaders.set(c, commonheaders[c]);
    });
  }

  configureDynamicParams(headers: any) {
    if (headers && Object.keys(headers).length !== 0) {
      for (var property in headers) {
        if (headers.hasOwnProperty(property)) {
          this.apiHeaders = this.apiHeaders.set(property, headers[property]);
        }
      }
    }
  }

  configureServerHeaders(headers?: any, _isFile?: any) {
    this.configureServerParams(_isFile);
    this.configureDynamicParams(headers);
    let httpOptions = {
      headers: this.apiHeaders,
    };
    return httpOptions;
  }

  prepareHeaders(_options?: any, _isFile?: any) {
    let headerOptions = undefined;
    if (_options) {
      headerOptions = { ..._options, ...this.configureServerHeaders() };
    } else {
      headerOptions = this.configureServerHeaders(null, _isFile);
    }
    return headerOptions;
  }

  /**
   * Generic Method for Get API Calls
   */
  get(url: any, options?: any) {
    let headerOptions = this.prepareHeaders(options);
    url = this.addQueryStringParm(url, '_', new Date().getTime());
    return this.http.get(url, headerOptions).pipe(
      catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
      finalize(() => {})
    );
  }

  /**
   * Generic Method for Get API Calls with payload
   */
  getWithPayload(url: any, getBody?: any, options?: any) {
    let headerOptions = this.prepareHeaders(options);
    headerOptions.body = getBody;
    url = this.addQueryStringParm(url, '_', new Date().getTime());
    return this.http.request('GET', url, headerOptions).pipe(
      catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
      finalize(() => {})
    );
  }

  /**
   * Generic Method for POST API Calls
   */
  post(url: any, postBody?: any, options?: any) {
    let headerOptions = this.prepareHeaders(options);
    url = this.addQueryStringParm(url, '_', new Date().getTime());
    return this.http.post(url, postBody, headerOptions).pipe(
      catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
      finalize(() => {})
    );
  }

  /**
   * Generic Method for POST API Calls
   */
  postFile(url: any, postBody?: any, options?: any, contentType?: any) {
    this.apiHeaders = new HttpHeaders();

    let commonheaders = {
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
      'If-Modified-Since': '0',
    };
    Object.keys(commonheaders).forEach((c) => {
      this.apiHeaders = this.apiHeaders.set(c, commonheaders[c]);
    });

    let httpOptions = {
      headers: this.apiHeaders,
    };
    return this.http.post(url, postBody, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
      finalize(() => {})
    );
  }

  /**
   * Generic Method for PUT API Calls
   */
  put(url: any, putData?: any, options?: any) {
    let headerOptions = this.prepareHeaders(options);
    url = this.addQueryStringParm(url, '_', new Date().getTime());
    return this.http.put(url, putData, headerOptions).pipe(
      catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
      finalize(() => {})
    );
  }

  /**
   * Generic Method for DELETE API Calls
   */
  delete(url: any, options?: any) {
    let headerOptions = this.prepareHeaders(options);
    url = this.addQueryStringParm(url, '_', new Date().getTime());
    return this.http.delete(url, headerOptions).pipe(
      catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
      finalize(() => {})
    );
  }

  /**
   * Generic Method for DELETE API Calls
   */
  deleteWithBody(url: any, deletebody?: any, options?: any) {
    let headerOptions = this.prepareHeaders(options);
    headerOptions.body = deletebody;
    url = this.addQueryStringParm(url, '_', new Date().getTime());
    return this.http.delete(url, headerOptions).pipe(
      catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
      finalize(() => {})
    );
  }
  /**
   * Generic Method for PATCH API Calls
   */
  patch(url: any, patchBody?: any, options?: any) {
    let headerOptions = this.prepareHeaders(options);
    url = this.addQueryStringParm(url, '_', new Date().getTime());
    return this.http.patch(url, patchBody, headerOptions).pipe(
      catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
      finalize(() => {})
    );
  }

  longRequest() {
    const request = new HttpRequest('POST', '/api/test-request', {}, { reportProgress: true });
    this.http.request(request).subscribe((event) => {
      if (event.type === HttpEventType.DownloadProgress) {
        console.log('Download progress event', event);
      }

      if (event.type === HttpEventType.UploadProgress) {
        console.log('Upload progress event', event);
      }

      if (event.type === HttpEventType.Response) {
        console.log('response received...', event.body);
      }
    });
  }

  private handleError(error: any | HttpErrorResponse) {
    let $t = this;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      if (error.statusText == 'OK') {
        let redirectToLogin: boolean = false;
        let errPopupMessage: string = '';
        switch (error.status) {
          case 202: // Review Request Status
            errPopupMessage = error.error.text;
            break;
          case 301: // Moved Permanently
          case 400: // Bad Request
          case 401: // Unauthorized
          case 403: // Forbidden
          case 404: // Forbidden
          case 405: // Method Not Allowed
            if (!_.isUndefined(error) && !_.isUndefined(error.error)) {
              if (_.isObject(error.error) && _.keys(error.error).length) {
                errPopupMessage = error.error.errorMessage;
                switch (error.error.errorType) {
                  case 'SessionExpired':
                  case 'InvalidCredentials':
                    redirectToLogin = true;
                    break;
                }
              } else {
                errPopupMessage = error.error;
              }
            }
            break;
          case 500: // Internal Server Error
          case 501: // Not Implemented
          case 502: // Bad Gateway
          case 503: // Service Unavailable
          case 504: // Gateway Timeout
            errPopupMessage = 'Something Went Wrong. \n Due to below technical error \n' + error.error;
            Swal.fire({
              title: 'Something Went Wrong. \n Due to below technical error \n',
              text: error.error, // description of the modal
              type: 'error', // warning, error, success, info, and question,
              backdrop: true,
              allowOutsideClick: true,
              allowEscapeKey: true,
              allowEnterKey: true,
              timer: 5000,
            });
            break;
        }
        if (redirectToLogin) {
          this.dialogRef.closeAll();
          const sweetAlertCancel = document.querySelector('.swal2-cancel') as HTMLElement;
          if (sweetAlertCancel) {
            sweetAlertCancel.click();
          }
          setTimeout(() => {
            $t.router.navigate(['/login'], { queryParams: {}, replaceUrl: true });
          }, 700);
        }
        error.error = errPopupMessage;
      }
      return error;
    }
    // returning an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  addQueryStringParm(url: any, name: any, value: any) {
    var re = new RegExp('([?&]' + name + '=)[^&]+', '');
    var add = function (sep: any) {
      url += sep + name + '=' + encodeURIComponent(value);
    };
    var change = function () {
      url = url.replace(re, '$1' + encodeURIComponent(value));
    };
    if (url.indexOf('?') === -1) {
      add('?');
    } else {
      if (re.test(url)) {
        change();
      } else {
        add('&');
      }
    }
    return url;
  }
}
