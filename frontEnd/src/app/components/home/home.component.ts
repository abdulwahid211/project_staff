import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/user-forms/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log("Output "+localStorage.getItem("token"))
    console.log("TEST")
  }

}
