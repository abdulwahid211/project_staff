import {Component, OnInit} from '@angular/core';
import {LoginAdminService} from './login-admin.service';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login-Admin',
  templateUrl: './login-Admin.component.html',
  styleUrls: ['./login-Admin.component.css'],
})
export class LoginAdminComponent implements OnInit {
  protected validation: boolean = false;

  private AdminToken: any | undefined;

  protected loginError: boolean = false;

  protected loginErrorLabelText: string = '';

  constructor(
    private loginAdminService: LoginAdminService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {}

  async onClickSubmit(result: NgForm) {
    if (result.value.username && result.value.password) {
      this.AdminToken = await this.loginAdminService.loginAdmin(result);

      this.AdminToken.subscribe(data => {
        console.log(data);
        const token = data.data.adminLogin.token;
        const id = data.data.adminLogin.id;

        if (
          (token != 'Not Found' && id != '0') ||
          (token != 'Incorrect Details' && id != '0')
        ) {
          this.saveUserData(token, id, true, result.value.username);
          this.router.navigate(['/']);
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
    this.authService.saveAdminData(token, id, enable, email);
  }
}
