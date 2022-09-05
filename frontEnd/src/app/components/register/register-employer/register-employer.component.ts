import {Component, OnInit} from '@angular/core';
import {RegisterEmployerService} from './register-employer.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ADMIN_LOGIN_ENABLED} from 'src/app/graphql/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register-employer.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterEmployerComponent {
  protected validation: boolean = false;

  protected registerError: boolean = false;

  protected formSuccessful: boolean = false;

  protected registerErrorLabelText: string = '';

  private registerEmployer: any | undefined;

  constructor(
    private registerEmployerService: RegisterEmployerService,
    private router: Router,
  ) {}

  private isAdminLogin = false;

  async onClickSubmit(result: NgForm) {
    this.isAdminLogin = localStorage.getItem(
      ADMIN_LOGIN_ENABLED,
    ) as unknown as boolean;

    if (this.isAdminLogin) {
      this.registerEmployer =
        await this.registerEmployerService.registerEmployer(result);

      this.registerEmployer.subscribe(
        data => {
          console.log(data);
          this.formSuccessful = data.data.createEmployer;
        },
        error => {
          console.log('Error ' + error);
        },
      );
    }
  }
}
