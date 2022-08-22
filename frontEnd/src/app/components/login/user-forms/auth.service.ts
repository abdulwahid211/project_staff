import {Injectable} from '@angular/core';
import {Observable,BehaviorSubject} from 'rxjs';
export const GC_USER_ID = 'graphcool-user-id';
export const GC_AUTH_TOKEN = 'token';
export const LINKS_PER_PAGE = 5;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userToken: string | undefined;

  private _isAuthenticated = new BehaviorSubject(false);

  constructor() {
  }

  // Providing a observable to listen the authentication state
  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  setUserToken(token: string) {
    this.userToken = token;

    // Dispatching to all listeners that the user is authenticated
    this._isAuthenticated.next(true);
  }

  saveUserData( token: string) {
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.setUserToken(token);
  }

  logout() {
    // Removing user data from local storage and the service
    localStorage.removeItem(GC_USER_ID);
    localStorage.removeItem(GC_AUTH_TOKEN);
    // this.userToken = null;

    // Dispatching to all listeners that the user is not authenticated
    this._isAuthenticated.next(false);
  }

  // autoLogin() {
  //   const id = localStorage.getItem(GC_USER_ID);

  //   if (id) {
  //     this.setUserId(id);
  //   }
  // }
}
