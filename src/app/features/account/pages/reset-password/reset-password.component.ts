import { Component, OnInit, OnDestroy} from '@angular/core';
import { Validators ,FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { filter, debounceTime, map, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';
import { AuthActions, AuthState, getAuth, getAuthError } from '../../store';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['../auth-styles.scss'] 
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
	forgotPwForm: FormGroup;
	email: FormControl = new FormControl('');
	new_password: FormControl = new FormControl('');
	verify_password: FormControl = new FormControl('');
	user: any;

	constructor(
		private _formBuilder: FormBuilder,
		 
		private _router: Router
	) { }

	ngOnInit(): void {
		this.buildFormGroup();
		//this.user = this._auth.getUser();
	}

	ngOnDestroy() { }

	getErrorMessage(field: string) {

	}

	/**
	 * Creates the FormGroup and populates the forgotPwForm property
	 */
	buildFormGroup() {
		this.forgotPwForm = this._formBuilder.group({
			email: this.email,
			new_password: this.new_password,
			verify_password: this.verify_password
		});
	}

	/**
	 * Click handler for the cancel button
	 */
	onCancelClick() {
		this._router.navigateByUrl('/auth/login');
	}

	/**
	 * Click handler for the Update button
	 */
	onUpdateClick() {
		//this._auth.forgotPassword(this.forgotPwForm.getRawValue());
	}
}
