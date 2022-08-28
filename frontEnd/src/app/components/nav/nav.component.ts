import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../login/auth-service/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  isAdminLogin = false;
  isApplicantLogin = false;
  isEmployerLogin = false;
  isDisableLogin = false;

  adminLoginText = '(Logged in as Admin)';
  applicantLoginText = '(Logged in as Applicant)';
  employerLoginText = '(Logged in as Employer)';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.unsubcribeAllServices();
  }

  ngOnInit(): void {
    this.authService.isEmployerLoggedIn.subscribe(value => {
      this.isEmployerLogin = value;
      this.isDisableLogin = value;
    });

    this.authService.isApplicantLogin.subscribe(value => {
      this.isApplicantLogin = value;
      this.isDisableLogin = value;
    });

    this.authService.isAdminLogin.subscribe(value => {
      this.isAdminLogin = value;
      this.isDisableLogin = value;
    });
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
    this.isDisableLogin = false;
  }
}
