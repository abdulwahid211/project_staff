import {Component, OnInit} from '@angular/core';
import {LoginEmployerService} from './login-employer.service';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login-employer',
  templateUrl: './login-employer.component.html',
  styleUrls: ['./login-employer.component.css'],
})
export class LoginEmployerComponent implements OnInit {
  protected validation: boolean = false;

  private employerToken: any | undefined;

  protected loginError: boolean = false;

  protected loginErrorLabelText: string = '';

  constructor(
    private loginEmployerService: LoginEmployerService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {}

  async onClickSubmit(result: NgForm) {
    if (result.value.username && result.value.password) {
      this.employerToken = await this.loginEmployerService.loginEmployer(
        result,
      );

      this.employerToken.subscribe(data => {
        console.log(data);
        const token = data.data.employerLogin.token;
        const id = data.data.employerLogin.id;
        if (
          (token != 'Not Found' && id != '0') ||
          (token != 'Incorrect Details' && id != '0')
        ) {
          this.saveUserData(token, id, result.value.username);
          this.router.navigate(['/employerProfile']);
        } else {
          this.loginError = true;
          this.loginErrorLabelText = token;
        }
      });
    } else {
      this.validation = true;
    }
  }

  saveUserData(token: string, id: string, email: string) {
    this.authService.saveEmployerData(token, id, email);
  }
}
