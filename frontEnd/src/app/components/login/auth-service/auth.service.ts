import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {
  USER_ID,
  AUTH_TOKEN,
  ADMIN_LOGIN,
  APPLICANT_LOGIN,
  APPLICANT_EMAIL,
} from 'src/app/graphql/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userId: string | undefined;
  private userToken: string | undefined;
  private userLogin: boolean | undefined;
  private userEmail: string | undefined;
  private _isAuthenticated = new BehaviorSubject(false);

  constructor() {}

  // Providing a observable to listen the authentication state
  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  setUserId(id: string) {
    this.userId = id;

    // Dispatching to all listeners that the user is authenticated
    this._isAuthenticated.next(true);
  }

  setUserEmail(email: string) {
    this.userEmail = email;

    // Dispatching to all listeners that the user is authenticated
    this._isAuthenticated.next(true);
  }

  setUserToken(token: string) {
    this.userToken = token;

    // Dispatching to all listeners that the user is authenticated
    this._isAuthenticated.next(true);
  }

  setUserLogin(enabled: boolean) {
    this.userLogin = enabled;

    // Dispatching to all listeners that the user is authenticated
    this._isAuthenticated.next(true);
  }

  saveApplicantData(
    token: string,
    id: string,
    enabled: boolean,
    email: string,
  ) {
    localStorage.setItem(USER_ID, id);
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(APPLICANT_LOGIN, String(enabled));
    localStorage.setItem(APPLICANT_EMAIL, email);
    this.setUserToken(token);
    this.setUserEmail(email);
    this.setUserId(id);
  }

  saveAdminData(token: string, id: string, enabled: boolean) {
    localStorage.setItem(USER_ID, id);
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(ADMIN_LOGIN, String(enabled));
    this.setUserToken(token);
    this.setUserId(id);
  }

  logoutApplicant() {
    // Removing user data from local storage and the service
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(APPLICANT_LOGIN);
    localStorage.removeItem(APPLICANT_EMAIL);

    // Dispatching to all listeners that the user is not authenticated
    this._isAuthenticated.next(false);
  }

  logoutAdmin() {
    // Removing user data from local storage and the service
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(ADMIN_LOGIN);

    // Dispatching to all listeners that the user is not authenticated
    this._isAuthenticated.next(false);
  }

  autoLoginApplicant() {
    const id = localStorage.getItem(USER_ID);
    const userToken = localStorage.getItem(AUTH_TOKEN);
    const applicantLogin = localStorage.getItem(APPLICANT_LOGIN);

    if (id && userToken && applicantLogin) {
      this.setUserId(id);
    }
  }
}
