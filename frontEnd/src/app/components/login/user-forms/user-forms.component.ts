import { Component, OnInit } from '@angular/core';
import {UserFormsService} from './user-forms.service';

@Component({
  selector: 'user-forms',
  templateUrl: './user-forms.component.html',
  styleUrls: ['./user-forms.component.css']
})
export class UserFormsComponent  {

  validation: boolean =false;

  applicantToken:string | undefined;

  loginError:boolean = false;

  loginErrorLabelText:string ="";

  constructor(private userFormsService: UserFormsService ) { }

  onClickSubmit(result) {
    if(result.value.username && result.value.password){
    console.log("You have entered username: " + result.value.username); 
    console.log("You have entered password : " + result.value.password); 

    this.userFormsService.loginApplicant(result).subscribe((results:any)=>{
      this.applicantToken = results.data.applicantLogin.token;
      result.reset()
      this.validation = false;
    })

    console.log(this.applicantToken)

    if(this.applicantToken == "Not Found" || this.applicantToken == "Incorrect Details"){
        this.loginErrorLabelText = this.applicantToken;
        this.loginError = true;
        this.applicantToken = '';
    }
    }
    else{
      this.validation = true;
    }
 }


}
// nul;ll123@gmail.com