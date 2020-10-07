import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders,  HttpParams,  HttpResponse,} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, timeout } from 'rxjs/operators'; 
import { environment } from '../../../environments/environment';

/**
 * Http wrapper service
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected header = new HttpHeaders();
  protected headerUpload = new HttpHeaders(); 
  constructor(private httpClient: HttpClient) { }

  /**
   * Get HTTP Header
   * @returns HttpHeaders
   */
  getHeaders(): HttpHeaders {
    return this.header
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json');
  }

  getHeadersProcess(): HttpHeaders {
    return this.header
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json')
      .append('Timeout', '900000');
  }

  /**
   * Get HTTP Header for Form Data
   * @returns HttpHeaders
   */
  getHeadersFormData(): HttpHeaders {
    return this.headerUpload.append('enctype', 'multipart/form-data');
  }

  /**
   *  Map error response body
   *
   *  @param err Http Error Response param
   */
  private handleError(err: HttpErrorResponse): Observable<any> {
    return throwError(err.error);
  }

  /**
   *  Map response body
   *
   *  @param response Http Response param
   */
  private mapToAppResponse(response: HttpResponse<any>): any {
    return response.body;
  }

  /**
   * Get data from API
   *
   * @param   uri Uniform Resource Identifier
   * @param   param Url Param
   * @returns AppResponse
   */
  get(uri: string, param?: HttpParams): Observable<any> {
    return this.httpClient
      .get<any>(environment.baseUrl + uri, {
        headers: this.getHeaders(),
        observe: 'response',
        params: param,
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }
  getSocket(): string {
    return environment.baseUrl + 'socket'
  }
  getSeacrh(uri: string, param?: HttpParams, body?: HttpParams): Observable<any> {
    return this.httpClient
      .get<any>(environment.baseUrl + uri, {
        headers: this.getHeaders(),
        observe: 'response',
        params: param,
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Post search param to API for Search
   *
   * @param   uri Uniform Resource Identifier
   * @param   body Post Content
   * @param   param Url Param
   * @returns AppResponse
   */
  postSearch(uri: string, body: object, param?: HttpParams): Observable<any> {
    return this.httpClient
      .post<any>(environment.baseUrl + uri, body, {
        headers: this.getHeaders(),
        observe: 'response',
        params: param,
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Post Notification data to API
   *
   * @param   uri Uniform Resource Identifier
   * @param   body Post Content
   * @param   param Url Param
   * @returns AppResponse
   */
  postNotif(uri: string, body: object, param?: HttpParams): Observable<any> {
    return this.httpClient
      .post<any>(environment.baseUrl + uri, body, {
        headers: this.getHeaders(),
        observe: 'response',
        params: param,
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }

  postUpload(uri: string, body: object): Observable<any> {
    return this.httpClient
      .post<any>(environment.baseUrl + uri, body, {
        headers: this.getHeadersFormData(),
        observe: 'response',
        reportProgress: true
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Post data to API
   *
   * @param   uri Uniform Resource Identifier
   * @param   body Post Content
   * @param   param Url Param
   * @returns AppResponse
   */
  post(uri: string, body?: object, param?: HttpParams): Observable<any> {
    return this.httpClient
      .post<any>(environment.baseUrl + uri, body, {
        headers: this.getHeaders(),
        observe: 'response',
        params: param,
        responseType: 'text' as 'json',
      })
      .pipe(
        retry(3),
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }


  postProcess(uri: string, body: object, param?: HttpParams): Observable<any> {
    return this.httpClient
      .post<any>(environment.baseUrl + uri, body, {
        // headers: this.getHeadersProcess(),
        // headers: new HttpHeaders({ timeout: '900000' }),
        headers: this.getHeaders(),
        observe: 'response',
        params: param,
        responseType: 'text' as 'json',
      })
      .pipe(
        timeout(900000),
        retry(3),
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError),
      );
  }

  /**
   * Post Report Request to API
   *
   * @param   uri Uniform Resource Identifier
   * @param   body Post Content
   * @returns AppResponse
   */
  postReport(uri: string, body: object): Observable<any> {
    return this.httpClient
      .post<any>(environment.baseUrl + uri, body, {
        headers: this.getHeaders(),
        observe: 'response',
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Post Login data to API
   *
   * @param   uri Uniform Resource Identifier
   * @param   body Post Content
   * @returns AppResponse
   */
  postLogin(uri: string, body: object): Observable<any> {
    return this.httpClient
      .post<any>(environment.baseUrl + uri, body, {
        headers: this.getHeaders(),
        observe: 'response',
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Post data to API
   *
   * @param   uri Uniform Resource Identifier
   * @param   body Post Content
   * @param   param Url Param
   * @returns AppResponse
   */
  postEmployee(
    uri: string,
    body: object,
    param?: HttpParams
  ): Observable<any> {
    return this.httpClient
      .post<any>(environment.baseUrl + uri, body, {
        headers: this.getHeaders(),
        observe: 'response',
        params: param,
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Put data to API
   *
   * @param   uri Uniform Resource Identifier
   * @param   body Put Content
   * @returns AppResponse
   */
  put(uri: string, body: object): Observable<any> {
    return this.httpClient
      .put<any>(environment.baseUrl + uri, body, {
        headers: this.getHeaders(),
        observe: 'response',
        responseType: 'text' as 'json',
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Put form-data to API
   *
   * @param   uri Uniform Resource Identifier
   * @param   body Put Content
   * @returns AppResponse
   */
  putFormData(uri: string, body: object): Observable<any> {
    return this.httpClient
      .put<any>(environment.baseUrl + uri, body, {
        reportProgress: true,
        observe: 'response',
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Put form-data to API
   *
   * @param   uri Uniform Resource Identifier
   * @param   body Put Content
   * @returns AppResponse
   */
  postFormData(uri: string, body: object): Observable<any> {
    return this.httpClient
      .post<any>(environment.baseUrl + uri, body, {
        reportProgress: true,
        observe: 'response',
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Delete data from API
   *
   * @param   uri Uniform Resource Identifier
   * @returns AppResponse
   */
  delete(uri: string): Observable<any> {
    return this.httpClient
      .delete<any>(environment.baseUrl + uri, {
        headers: this.getHeaders(),
        observe: 'response',
        responseType: 'text' as 'json',
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }

  postRerun(uri: string): Observable<any> {
    return this.httpClient
      .post<any>(environment.baseUrl + uri, {
        headers: this.getHeaders(),
        observe: 'response',
        responseType: 'text' as 'json',
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Delete data from API
   *
   * @param   uri Uniform Resource Identifier
   * @param   body Post Content
   * @returns AppResponse
   */
  deleteAll(uri: string, body: object[]): Observable<any> {
    return this.httpClient
      .request('DELETE', environment.baseUrl + uri, {
        headers: this.getHeaders(),
        observe: 'response',
        responseType: 'text' as 'json',
        body,
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Get data from Mock API
   *
   * @param   uri Uniform Resource Identifier
   * @returns AppResponse
   */


  patch(uri: string, body?: any): Observable<any> {
    return this.httpClient
      .patch<any>(environment.baseUrl + uri, body, {
        reportProgress: true,
        observe: 'response',
      })
      .pipe(
        map(response => this.mapToAppResponse(response)),
        catchError(this.handleError)
      );
  }
}
