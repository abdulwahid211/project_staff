import {Component, OnInit} from '@angular/core';
import {
  APPLICANT_ID,
  AUTH_TOKEN,
  APPLICANT_EMAIL,
} from 'src/app/graphql/constants';
import {Apollo} from 'apollo-angular';
import {GET_APPLICANT_PROFILE} from 'src/app/graphql/graphql.queries';
import {Applicants} from 'src/app/types/applicants';
import {last} from 'rxjs';

@Component({
  selector: 'app-applicants-profile',
  templateUrl: './applicants-profile.component.html',
  styleUrls: ['./applicants-profile.component.css'],
})
export class ApplicantsProfileComponent implements OnInit {
  error: any;
  data!: Applicants;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_APPLICANT_PROFILE,
        variables: {
          email: localStorage.getItem(APPLICANT_EMAIL),
        },
      })
      .valueChanges.subscribe(({data, error}: any) => {
        this.data = data.applicant;
        this.error = error;
        console.log(this.data);
      });
  }
}
