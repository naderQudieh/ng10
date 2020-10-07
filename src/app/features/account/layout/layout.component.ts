import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
 // selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../account.state';

@Component({
  selector: 'anms-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  layouts = [ 
    { link: 'form', label: 'authz2.form' } ,
    { link: 'todos', label: 'authz2.form' }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    //this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
