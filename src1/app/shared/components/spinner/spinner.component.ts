import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { SpinnerService } from '../../servcies';


@Component({
  selector: 'app-spinner',
  template:
  `
  <span class="spinner-bg" *ngIf="show">
  <img *ngIf="loadingImage" [src]="loadingImage" />
  <ng-content></ng-content>
</span>
  `,
  styles: [`
  .spinner-bg{
    background: transparent;
    min-width: 100px;
    text-align: center;
    position: relative;
  }
  `]
})
export class SpinnerComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() group: string;
  @Input() loadingImage: string;

  private isShowing = false;


  constructor(private _spinner: SpinnerService) { }
 
  @Input()
  get show(): boolean {
    return this.isShowing;
  }

  @Output() showChange = new EventEmitter();

  set show(val: boolean) {
    this.isShowing = val;
    this.showChange.emit(this.isShowing);
  }

  ngOnInit() {
    if (!this.name) throw new Error("Spinner must have a 'name' attribute.");
 
     this._spinner._register(this);
  }
 
  ngOnDestroy() {
    this._spinner._unregister(this);
  }
}
