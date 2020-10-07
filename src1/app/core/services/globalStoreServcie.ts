import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs'
import {shareReplay, map} from 'rxjs/operators' 
import { AuthService } from './auth.service';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Injectable({providedIn: 'root'})
export class globalStoreService { 


    constructor(private localStorage: LocalStorageService) {

    }

    isAuthenticated = new BehaviorSubject<boolean>(this.hasToken()); 
 
    isLoggedIn(): Observable<boolean> {
        console.log(this.localStorage.getUserAuthToken()); 
        return this.isAuthenticated.asObservable();
    }

    public setLoggedIn() {
        this.isAuthenticated.next(true);
    }

    public setLoggedOut() {
        this.localStorage.clearToken();
        this.isAuthenticated.next(false);
    }

    
    private hasToken(): boolean {
        return !!this.localStorage.getUserAuthToken();
    }
 

}