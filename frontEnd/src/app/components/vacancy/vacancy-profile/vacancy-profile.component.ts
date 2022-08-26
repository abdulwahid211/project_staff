import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Vacancy} from 'src/app/types/vacancy';
import {
  GET_VACANCY_PROFILE,
  CREATE_APPLIED_JOBS,
  CHECK_APPLIED_JOBS,
} from 'src/app/graphql/graphql.queries';
import {Apollo} from 'apollo-angular';
import {USER_ID} from 'src/app/graphql/constants';

@Component({
  selector: 'app-vacancy-profile',
  templateUrl: './vacancy-profile.component.html',
  styleUrls: ['./vacancy-profile.component.css'],
})
export class VacancyProfileComponent implements OnInit {
  vacancy!: Vacancy;
  JobAlreadyApplied = false;
  JobAppliedSucessful = false;
  disableButton = false;
  TextJobAppliedSucess =
    'Thank you for submitting your CV, we will contact you if you have been successful!';
  TextAlreadyJobApplied = 'You have applied this job before!';
  applicantId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
  ) {}

  ngOnInit(): void {
    const vacancyId = Number(this.route.snapshot.paramMap.get('id'));
    // this.applicantId = localStorage.getItem(USER_ID) as string;

    this.apollo
      .watchQuery({
        query: GET_VACANCY_PROFILE,
        variables: {
          vacancyId: vacancyId,
        },
      })
      .valueChanges.subscribe(({data}: any) => {
        console.log(data);
        this.vacancy = data.Vacancy;
        this.disableButton = false;
      });

    this.apollo
      .watchQuery({
        query: CHECK_APPLIED_JOBS,
        variables: {
          vacancyId: vacancyId,
          applicantId: 45,
        },
      })
      .valueChanges.subscribe(({data}: any) => {
        console.log(data);
        this.JobAlreadyApplied = data.verifyAlreadyAppliedJob;
        this.disableButton = data.verifyAlreadyAppliedJob;
      });
  }

  onBack(): void {
    this.router.navigate(['/vacancyList']);
  }

  onApplySubmit(vacancy: Vacancy) {
    const vacancyId = vacancy.VacancyID;

    this.apollo
      .mutate({
        mutation: CREATE_APPLIED_JOBS,
        variables: {
          applicantId: 45,
          vacancyId: vacancyId,
        },
      })
      .subscribe((data: any) => {
        this.JobAppliedSucessful = data.data.createAppliedJobs;
        this.disableButton = true;
      });
  }
}
