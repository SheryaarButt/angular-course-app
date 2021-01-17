import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {AuthResponseModel} from './auth-response.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html'
})
export class AuthComponent {

  isLoginMode = false;
  isProcessing = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  switchLogin(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  getSignUpLoginBtnText(): string {
    return this.isLoginMode ? 'Login' : 'Sign Up';
  }

  getSwitchBtnText(): string {
    return 'Switch to ' + (this.isLoginMode ? 'Sign Up' : 'Login');
  }

  signUpOrLogin(form: NgForm): void {
    this.isProcessing = true;
    const email = form.controls.email.value;
    const password = form.controls.password.value;

    let authObservable: Observable<AuthResponseModel>;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable
      .subscribe(
        response => {
          console.log(response);
          this.error = null;
          this.isProcessing = false;
          this.router.navigate(['recipes']);
        }, (errorMsg: string) => {
          this.error = errorMsg;
          this.isProcessing = false;
        }
      );

    form.controls.password.reset();
  }


}
