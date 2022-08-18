import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-forms',
  templateUrl: './user-forms.component.html',
  styleUrls: ['./user-forms.component.css']
})
export class UserFormsComponent  {

  validation: boolean =false;

  onClickSubmit(result) {
    if(result.value.username && result.value.password){
    console.log("You have entered username: " + result.value.username); 
    console.log("You have entered password : " + result.value.password); 
    result.reset()
    this.validation = false;
    }
    else{
      this.validation = true;
    }
 }

}
