import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../login/auth-service/auth.service';
import {Router} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {
  ADMIN_LOGIN_ENABLED,
  APPLICANT_LOGIN_ENABLED,
  EMPLOYER_LOGIN_ENABLED,
} from 'src/app/graphql/constants';

import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  isAdminLogin = false;
  isApplicantLogin = false;
  isEmployerLogin = false;

  adminLoginText = '(Logged in as Admin)';
  applicantLoginText = '(Logged in as Applicant)';
  employerLoginText = '(Logged in as Employer)';

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnDestroy(): void {
    // this.unsubcribeAllServices();
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '600px',
      width: '600px',
      backdropClass: 'backdrop',
      panelClass: 'dialogTheme',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.authService.isEmployerLoggedIn.subscribe(value => {
      this.isEmployerLogin = value;
    });

    this.authService.isApplicantLogin.subscribe(value => {
      this.isApplicantLogin = value;
    });

    this.authService.isAdminLogin.subscribe(value => {
      this.isAdminLogin = value;
    });

    this.setAllLoginsEnabed();
  }

  setAllLoginsEnabed() {
    this.isApplicantLogin = localStorage.getItem(
      APPLICANT_LOGIN_ENABLED,
    ) as unknown as boolean;

    this.isAdminLogin = localStorage.getItem(
      ADMIN_LOGIN_ENABLED,
    ) as unknown as boolean;

    this.isEmployerLogin = localStorage.getItem(
      EMPLOYER_LOGIN_ENABLED,
    ) as unknown as boolean;
  }

  logout(): void {
    this.authService.logout();
    this.closeAllLogins();
    this.unsubcribeAllServices();
    this.router.navigateByUrl('/');
  }

  unsubcribeAllServices() {
    this.authService.isEmployerLoggedIn.subscribe().unsubscribe();
    this.authService.isApplicantLogin.subscribe().unsubscribe();
    this.authService.isAdminLogin.subscribe().unsubscribe();
  }

  closeAllLogins() {
    this.isAdminLogin = false;
    this.isApplicantLogin = false;
    this.isEmployerLogin = false;
  }
}
