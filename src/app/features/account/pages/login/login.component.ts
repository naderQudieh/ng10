/// <reference path="../../store/auth.selectors.ts" />
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { filter, debounceTime, map, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS, NotificationService } from '../../../../core/core.module';
import { AuthActions, AuthState, getAuth, getAuthError } from '../../store';

@Component({
    selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent implements OnInit {
    isLoading = false;
    public error$: Observable<string>;
    hide = true;
    returnUrl: string="";
    private loadingSub: Subscription;
  mainform = this.fb.group({
    autosave: false,
      email: ['', [Validators.required, Validators.email]],  
      password: ['', [Validators.required]
      ] 
    
  });

 

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {}

    ngOnInit() {
        this.isLoading = false; 
        this.store.pipe(select(getAuth), take(1))
        .subscribe((auth) => {
            console.log(auth);
            //this.mainform.patchValue(auth)
        });
        this.error$ = this.store.pipe(select(getAuthError)); 
        this.route.params.subscribe((params) => {
            if (params.returnUrl) {
                this.returnUrl = params.returnUrl;
            }
            
             console.log(this.returnUrl); 
        }); 
  }
  
 

    SubmitForm(data: any): void {
      
        let me = {
            email: data.value.email,
            password: data.value.password,
            returnUrl: this.returnUrl
        }
        console.log(me);
        if (data.value) {

            this.store.dispatch(new AuthActions.LogIn(me));
        }
    }
 

 
}
