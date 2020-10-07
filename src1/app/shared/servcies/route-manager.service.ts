import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


 const SIGN_IN_URL = 'sign-in';
 const SIGN_UP_URL = 'sign-up';
 const FORGOT_PASSWORD_URL = 'forgot-password';
 const HOME_URL = 'home';
 const PROFILE_URL = 'profile';
 const PROFILE_SETTINGS = 'profile/setting';

@Injectable({ providedIn: 'root' })
export class RouteManager {
  constructor(private readonly router: Router) {}

  public navigateToSignIn() {
    this.router.navigateByUrl(SIGN_IN_URL);
  }

  public navigateToSignUp() {
    this.router.navigateByUrl(SIGN_UP_URL);
  }

  public navigateToForgotPassword() {
    this.router.navigateByUrl(FORGOT_PASSWORD_URL);
  }

  public navigateToHome() {
    this.router.navigateByUrl(HOME_URL);
  }

  public navigateToProfile() {
    this.router.navigateByUrl(PROFILE_URL);
  }

  public navigateToProfileSetting() {
    this.router.navigateByUrl(PROFILE_SETTINGS);
  }

  public navigateToProductDetails(productId: string) {
    this.router.navigate(['home/shop/products', productId, 'details']);
  }
}
