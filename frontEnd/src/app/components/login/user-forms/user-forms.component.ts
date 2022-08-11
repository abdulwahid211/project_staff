import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'user-forms',
  templateUrl: './user-forms.component.html',
  styleUrls: ['./user-forms.component.css']
})
export class UserFormsComponent  {

  onClickSubmit(result) {
    console.log("You have entered username: " + result.username); 
    console.log("You have entered password : " + result.password); 
 }

}
