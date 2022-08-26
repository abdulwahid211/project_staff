import {Component, OnInit} from '@angular/core';
import {UserFormsService} from './login-applicant.service';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login-applicant',
  templateUrl: './login-applicant.component.html',
  styleUrls: ['./login-applicant.component.css'],
})
export class UserFormsComponent implements OnInit {
  protected validation: boolean = false;

  private applicantToken: any | undefined;

  protected loginError: boolean = false;

  protected loginErrorLabelText: string = '';

  constructor(
    private userFormsService: UserFormsService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {}

  async onClickSubmit(result: NgForm) {
    if (result.value.username && result.value.password) {
      this.applicantToken = await this.userFormsService.loginApplicant(result);

      this.applicantToken.subscribe(data => {
        const token = data.data.applicantLogin.token;
        const id = data.data.applicantLogin.id;

        if (
          (token != 'Not Found' && id != '0') ||
          (token != 'Incorrect Details' && id != '0')
        ) {
          const enabledLogin = true;
          this.saveUserData(token, id, enabledLogin, result.value.username);
          this.router.navigate(['/appProfile']);
        } else {
          this.loginError = true;
          this.loginErrorLabelText = token;
        }
      });
    } else {
      this.validation = true;
    }
  }

  saveUserData(token: string, id: string, login: boolean, email: string) {
    this.authService.saveApplicantData(token, id, login, email);
  }
}
// nul;ll123@gmail.com
