import { Component, OnInit } from '@angular/core';
import { RegisterApplicantService } from './register-applicant.service';
import {Router} from '@angular/router';
import {NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register-applicant.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterApplicantComponent {

  protected validation: boolean =false;

  protected  registerError:boolean = false;

  protected formSuccessful:boolean = false;

  protected registerErrorLabelText:string ="";

  private registerApplicant:any |undefined;

  constructor(private registerApplicantService: RegisterApplicantService, private router: Router) { }

  async onClickSubmit(result:NgForm) {

    this.registerApplicant = (await this.registerApplicantService.registerApplicant(result));

    this.registerApplicant.subscribe(data=>{
     console.log(data)
     this.formSuccessful = data.data.createApplicant

    },error=>{
      console.log("Error "+error)
    });


 }



}
