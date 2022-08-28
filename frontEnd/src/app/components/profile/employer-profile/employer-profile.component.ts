import {Component, OnInit} from '@angular/core';
import {
  EMPLOYER_ID,
  AUTH_TOKEN,
  EMPLOYER_EMAIL,
} from 'src/app/graphql/constants';
import {Apollo} from 'apollo-angular';
import {GET_EMPLOYER_PROFILE} from 'src/app/graphql/graphql.queries';
import {Employer} from 'src/app/types/employer';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css'],
})
export class EmployerProfileComponent implements OnInit {
  error: any;
  data!: Employer;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_EMPLOYER_PROFILE,
        variables: {
          email: localStorage.getItem(EMPLOYER_EMAIL),
        },
      })
      .valueChanges.subscribe(({data, error}: any) => {
        console.log(data);
        this.data = data.Employer;
        this.error = error;
        console.log(this.data.EmployerID);
      });
  }
}
