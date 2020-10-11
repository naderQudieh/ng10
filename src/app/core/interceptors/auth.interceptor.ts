import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpErrorResponse, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { exhaustMap, catchError, filter, first, map, mergeMap, take, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthActions, getAuth, getAuthError } from '../../features/account/store/';
import { UserInfo, AuthToken, UserClaims, AuthState } from '../../features/account/store/auth.model';
import { AuthSelectors } from '../../features/account/store/';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private authService: AuthService;
	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	private access_token = null;
	private ignoredUrls = [
		'https://eu.battle.net/oauth/token'
	];

	constructor(private store: Store<AppState>, private router: Router, private injector: Injector) {
		//this.store.select("auth").subscribe((authState: AuthState) => {
		//	console.log("*****************");
		//	console.log(authState.authToken);
		//	console.log("*****************");
		//	if (authState.authToken) {
		//		if (authState.authToken.access_token) {
		//			console.log(authState.authToken);
		//			this.access_token = authState.authToken.access_token;
		//		}
		//		else {
		//			this.access_token = null;
		//		}
		//	} else {
		//		this.access_token = null;
		//	}
			
		//});
	}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		return this.isSameOriginUrl(request) && this.store.select(AuthSelectors.getValidToken).pipe(
			map(token => { 
				return request.clone({ setHeaders: { Authorization: `${token != null ? token.access_token : ''}` } }) 
			}),
			switchMap(request => next.handle(request))
		);
	}

	//intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	//	console.log("inside the intercept method");
	//	if (this.access_token) {
	//		// console.log("access token is available");
	//		const cloned = req.clone({
	//			headers: req.headers.set("Authorization",
	//				`Bearer ${this.access_token}`)
	//		});
	//		return next.handle(cloned);
	//	}

	//	return next.handle(req);
	//}
 
	/*
	 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.authService = this.injector.get(AuthService);


		const authtoken: AuthToken = this.authService.getUserAuthToken();
		if (authtoken) {
			req = req.clone({
				setHeaders: {
					'Authorization': `Bearer ${authtoken != null ? authtoken.access_token : ''}`
				}
			});
			return next.handle(req).pipe(
				catchError((err) => {
					console.log('caught error in intercept ', err);
					if (err instanceof HttpErrorResponse) {
						if (err.status === 401) {
							if (err.headers.get('Token-Expired')) {
								console.log('I got header token expired ');
								return this.handle401error(req, next);
							}
						}
						return throwError(err);
					} else {
						return throwError(err);
					}
				})
			);
		}
	}
	   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.authService = this.injector.get(AuthService);
		const authtoken: AuthToken = this.authService.getUserAuthToken();
		if (authtoken) {
			req = req.clone({
				setHeaders: {
					'Authorization': `Bearer ${authtoken != null ? authtoken.access_token : ''}`
				}
			});
			return next.handle(req);
		}
	}

	  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('register') !== -1 || req.url.indexOf('login') !== -1) {
			return next.handle(req);
		}
		//const authState = this.store.select('auth');
		const authState = this.store.select(getAuth);
		return this.ignoredUrls.includes(req.url) ? next.handle(req) : authState.pipe(
			first()
			, map(auth => {
				console.log(auth);
				return auth.authToken.access_token;
			})
			, mergeMap(token => {
				console.log(token);
				return next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))
			})
		);

	}
	 intercept(req: HttpRequest<any>, next: HttpHandler): any {
		const authState = this.store.select(getAuth);
		return authState.pipe(
			take(1),
			map((authState) => {

				return authState.authToken
			}),
			exhaustMap((user) => {
				if (!user) {
					return next.handle(req)
				}
				const modifiedReq = req.clone({
					params: new HttpParams().set('auth', user.access_token),
				})
				return next.handle(modifiedReq)
			})
		)
	}
	*/

	private handle401error(request: HttpRequest<any>, next: HttpHandler) {
		if (!this.isRefreshing) {
			console.log('Token is not refreshing, so can be refreshed');
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);
			return this.authService.getAuthRefreshToken().pipe(
				switchMap((token: AuthToken) => {
					console.log('in handle 401 error i got', token);
					this.refreshTokenSubject.next(token.access_token);
					this.isRefreshing = false;
					return next.handle(this.addToken(request));
				})
			);
		} else {
			console.log('Token is being expired, so waiting...');
			return this.refreshTokenSubject.pipe(
				filter((token) => token != null),
				take(1),
				switchMap((jwt) => {
					console.log('wtf');
					return next.handle(this.addToken(request));
				})
			);
		}
	}
	private addRefreshToken(request: HttpRequest<any>): HttpRequest<any> {
		const token = this.getRefreshToken();
		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
				},
			});
		}
		return request;
	}

	private addToken(request: HttpRequest<any>): HttpRequest<any> {
		const token = this.getAccessToken();
		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
				},
			});
		}
		return request;
	}
	private getRefreshToken(): string {
		let token = localStorage.getItem('user_token');
		let tokenObj = JSON.parse(token) || null;
		return tokenObj['refresh_token'] || null;
	}
	private getAccessToken(): string {
		let token = localStorage.getItem('user_token');
		let tokenObj = JSON.parse(token) || null;
		return tokenObj['access_token'] || null;
	}

	private isSameOriginUrl(req: any) {
		// It's an absolute url with the same origin.
		if (req.url.startsWith(`${window.location.origin}/`)) {
			return true;
		}

		// It's a protocol relative url with the same origin.
		// For example: //www.example.com/api/Products
		if (req.url.startsWith(`//${window.location.host}/`)) {
			return true;
		}

		// It's a relative url like /api/Products
		if (/^\/[^\/].*/.test(req.url)) {
			return true;
		}

		// It's an absolute or protocol relative url that
		// doesn't have the same origin.
		return false;
	}
}
