import {Component, OnInit} from '@angular/core';
import {LoginApplicantService} from './login-applicant.service';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login-applicant',
  templateUrl: './login-applicant.component.html',
  styleUrls: ['./login-applicant.component.css'],
})
export class LoginFormsComponent implements OnInit {
  protected validation: boolean = false;

  private applicantToken: any | undefined;

  protected loginError: boolean = false;

  protected loginErrorLabelText: string = '';

  constructor(
    private loginApplicantService: LoginApplicantService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {}

  async onClickSubmit(result: NgForm) {
    if (result.value.username && result.value.password) {
      this.applicantToken = await this.loginApplicantService.loginApplicant(
        result,
      );

      this.applicantToken.subscribe(data => {
        const token = data.data.applicantLogin.token;
        const id = data.data.applicantLogin.id;

        if (
          (token != 'Not Found' && id != '0') ||
          (token != 'Incorrect Details' && id != '0')
        ) {
          this.saveUserData(token, id, true, result.value.username);
          this.router.navigate(['/applicantProfile']);
        } else {
          this.loginError = true;
          this.loginErrorLabelText = token;
        }
      });
    } else {
      this.validation = true;
    }
  }

  saveUserData(token: string, id: string, enable: boolean, email: string) {
    this.authService.saveApplicantData(token, id, enable, email);
  }
}
// nul;ll123@gmail.com
