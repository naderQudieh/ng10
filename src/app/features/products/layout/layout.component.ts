import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {  routeAnimations } from '../../../core/core.module';

import { AppState } from '../../../core/store/app.state';

@Component({
  selector: 'anms-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['../products.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
    
    constructor(private router: Router,private store: Store<AppState>) {}


    addProducts(): void {

    }

    addProductsClick() {
        this.router.navigate(['/products/add']);
    }
  ngOnInit(): void {
     
  }
}
