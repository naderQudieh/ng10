import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private emitChangeSource = new Subject<any>();
  public changeEmitted$ = this.emitChangeSource.asObservable();
  webDevice;
  constructor() { }

  emit(change: any): void {
    if (change.webDevice) {
      this.webDevice = change.webDevice;
    }
    this.emitChangeSource.next(change);
  }
}
