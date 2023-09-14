import {Component} from '@angular/core';
import {RegisterAdminService} from './register-admin.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css'],
})
export class RegisterAdminComponent {
  protected validation: boolean = false;

  protected registerError: boolean = false;

  protected formSuccessful: boolean = false;

  protected registerErrorLabelText: string = '';

  private registerAdmin: any | undefined;

  constructor(
    private registerAdminService: RegisterAdminService,
    private router: Router,
  ) {}

  async onClickSubmit(result: NgForm) {
    this.registerAdmin = await this.registerAdminService.registerAdmin(result);

    this.registerAdmin.subscribe(
      data => {
        console.log(data);
        this.formSuccessful = data.createAdmin;
        if( this.formSuccessful){
          result.resetForm();
        }
      },
      error => {
        console.log('Error ' + error);
      },
    );
  }
}
