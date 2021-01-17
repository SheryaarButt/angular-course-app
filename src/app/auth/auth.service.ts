import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {AuthResponseModel} from './auth-response.model';
import {AuthRequestModel} from './auth-request.model';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {

  public autoLogoutTimer: any;

  public userSubject = new BehaviorSubject<User>(null);

  private readonly AUTH_URL = 'https://identitytoolkit.googleapis.com/v1';
  private readonly SIGNUP_PATH = '/accounts:signUp';
  private readonly LOGIN_PATH = '/accounts:signInWithPassword';

  private readonly AUTH_PARAMS = new HttpParams().append('key', environment.fireBaseAPIKey);

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string): Observable<AuthResponseModel> {
    const SIGNUP_URL = this.AUTH_URL + this.SIGNUP_PATH;
    const signupRequest: AuthRequestModel = {email, password, returnSecureToken: true};
    console.log('Params:');
    console.log(this.AUTH_PARAMS);
    console.log('Request:');
    console.log(signupRequest);
    return this.http.post<AuthResponseModel>(SIGNUP_URL, signupRequest, {params: this.AUTH_PARAMS})
      .pipe(
        tap(this.updateLoggedInUser.bind(this)),
        catchError(this.handleError)
      );
  }

  login(email: string, password: string): Observable<AuthResponseModel> {
    const LOGIN_URL = this.AUTH_URL + this.LOGIN_PATH;
    const loginRequest: AuthRequestModel = {email, password, returnSecureToken: true};
    console.log('Params:');
    console.log(this.AUTH_PARAMS);
    console.log('Request:');
    console.log(loginRequest);
    return this.http.post<AuthResponseModel>(LOGIN_URL, loginRequest, {params: this.AUTH_PARAMS})
      .pipe(
        tap(this.updateLoggedInUser.bind(this)),
        catchError(this.handleError)
      );
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    console.log('Handling error');
    console.log(errorResponse);
    let errorMessage = 'An error has occurred';
    if (!errorResponse.error || !errorResponse.error.error || !errorResponse.error.error.message) {
      return throwError(errorMessage);
    }
    const errorCode = errorResponse.error.error.message;
    switch (errorCode) {
      case 'EMAIL_NOT_FOUND': {
        errorMessage = 'There is no user account associated with the email entered.';
        break;
      }
      case 'INVALID_PASSWORD': {
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      }
      case 'USER_DISABLED': {
        errorMessage = 'The user account has been disabled by an administrator.';
        break;
      }
      case 'EMAIL_EXISTS': {
        errorMessage = 'The email address is already in use by another account.';
        break;
      }
      case 'OPERATION_NOT_ALLOWED': {
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      }
      case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      }
    }
    return throwError(errorMessage);
  }

  public autoLogin(): void {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loggedInUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loggedInUser.token) {
      this.userSubject.next(loggedInUser);
    }
  }

  private updateLoggedInUser(response: AuthResponseModel): void {
    const expiresInMs = +response.expiresIn * 1000;
    const loggedInUser = new User(
      response.email,
      response.localId,
      response.idToken,
      (this.getFutureDateBySeconds(expiresInMs))
    );
    this.userSubject.next(loggedInUser);
    this.setAutoLogoutTimer(expiresInMs);
    localStorage.setItem('userData', JSON.stringify(loggedInUser));
  }

  private setAutoLogoutTimer(expiresInMs: number): void {
    this.autoLogoutTimer = setTimeout(() => {
      this.userSubject.next(null);
      localStorage.clear();
    }, expiresInMs);
  }

  getFutureDateBySeconds(expiresInMs: number): Date {
    return new Date(new Date().getTime() + expiresInMs);
  }
}
