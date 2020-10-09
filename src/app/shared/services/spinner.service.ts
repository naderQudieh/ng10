
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    private spinnerSubject = new BehaviorSubject<boolean>(false);

    constructor() { }

    show(): void {
        this.spinnerSubject.next(true);
    }

    hide(): void {
        this.spinnerSubject.next(false);
    }

    getValue(): Observable<boolean> {
        return this.spinnerSubject.asObservable();
    }
}