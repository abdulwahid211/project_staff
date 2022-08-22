import { Component, OnInit, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import {UserFormsService} from './user-forms.service';
import {NgForm } from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'user-forms',
  templateUrl: './user-forms.component.html',
  styleUrls: ['./user-forms.component.css']
})
export class UserFormsComponent  implements OnInit{

  validation: boolean =false;

  applicantToken:any |undefined;

  loginError:boolean = false;

  loginErrorLabelText:string ="";
  text:any;

  constructor(private userFormsService: UserFormsService, private authService: AuthService,private router: Router, private ngZone: NgZone ) { }

  ngOnInit() {
    console.log("Output "+localStorage.getItem("token"))
  }

   async onClickSubmit(result:NgForm) {
    if(result.value.username && result.value.password){
    console.log("You have entered username: " + result.value.username); 
    console.log("You have entered password : " + result.value.password); 

     this.applicantToken = (await this.userFormsService.loginApplicant(result));


     this.applicantToken.subscribe(data=>{
      const token = data.data.applicantLogin.token;
      this.saveUserData(token);
      this.text = token;

       this.router.navigate(['/about']);
     })


     console.log(this.text)

    }
    else{
      this.validation = true;
    }
 }

 saveUserData( token: string) {
  this.authService.saveUserData(token);
}
 


}
// nul;ll123@gmail.com