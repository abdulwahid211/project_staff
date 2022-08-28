import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {
  APPLICANT_ID,
  EMPLOYER_ID,
  ADMIN_ID,
  AUTH_TOKEN,
  APPLICANT_EMAIL,
  ADMIN_EMAIL,
  EMPLOYER_EMAIL,
} from 'src/app/graphql/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAdminLogin = new BehaviorSubject(false);
  public isApplicantLogin = new BehaviorSubject(false);
  public isEmployerLogin = new BehaviorSubject(false);

  constructor() {}

  // Providing a observable to listen the authentication states
  get isAdminLoggedIn(): Observable<boolean> {
    return this.isAdminLogin.asObservable();
  }

  get isApplicantLoggedIn(): Observable<boolean> {
    return this.isApplicantLogin.asObservable();
  }

  get isEmployerLoggedIn(): Observable<boolean> {
    return this.isEmployerLogin.asObservable();
  }

  saveApplicantData(
    token: string,
    id: string,

    email: string,
  ) {
    this.clearAllData();
    localStorage.setItem(APPLICANT_ID, id);
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(APPLICANT_EMAIL, email);
    this.isApplicantLogin.next(true);
  }

  saveEmployerData(token: string, id: string, email: string) {
    this.clearAllData();
    localStorage.setItem(EMPLOYER_ID, id);
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(EMPLOYER_EMAIL, email);
    this.isEmployerLogin.next(true);
  }

  saveAdminData(token: string, id: string, email: string) {
    this.clearAllData();
    localStorage.setItem(ADMIN_ID, id);
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(ADMIN_EMAIL, email);
    this.isAdminLogin.next(true);
  }

  logout() {
    // Removing user data from local storage and the service
    this.clearAllData();
    // Dispatching to all listeners that the user is not authenticated
    this.clearAllLoggedIn;
  }

  clearAllLoggedIn() {
    this.isAdminLogin.next(false);
    this.isEmployerLogin.next(false);
    this.isApplicantLogin.next(false);
  }

  clearAllData() {
    localStorage.clear();
  }
}
