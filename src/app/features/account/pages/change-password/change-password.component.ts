import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { filter, debounceTime, map, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';
import { AuthActions, AuthState, getAuth, getAuthError } from '../../store';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['../auth-styles.scss'] 
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
	changePwForm: FormGroup;
	password: FormControl = new FormControl('');
	new_password: FormControl = new FormControl('');
	verify_password: FormControl = new FormControl('');
	user: any;

	constructor(
		private _formBuilder: FormBuilder,
		 
		private _router: Router,
		 
	) { }

	ngOnInit(): void {
		this.buildFormGroup();
		//this.user = this._auth.getUser();
	}

	ngOnDestroy() { }

	getErrorMessage(field: string) { }

	/**
	 * Create the FormGroup and update the changePwForm property
	 */
	buildFormGroup() {
		this.changePwForm = this._formBuilder.group({
			password: this.password,
			new_password: this.new_password,
			verify_password: this.verify_password
		});
	}

	/**
	 * Handler for clicking the cancel button
	 */
	onCancelClick() {
		this._router.navigateByUrl('/auth/login');
	}

	/**
	 * Handler for clicking the update button
	 */
	onUpdateClick() {
		 
	}
}
