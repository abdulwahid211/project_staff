import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Vacancy} from 'src/app/types/vacancy';

import {
  GET_VACANCY_PROFILE,
  CREATE_APPLIED_JOBS,
  CHECK_APPLIED_JOBS,
} from 'src/app/graphql/graphql.queries';
import {Apollo} from 'apollo-angular';
import {APPLICANT_ID} from 'src/app/graphql/constants';
import {DatePipe} from '@angular/common';
import {LoginComponent} from '../../login/login.component';
import {MatDialog} from '@angular/material/dialog';

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
    '(Thank you for submitting your CV, we will contact you if you have been successful!)';
  TextAlreadyJobApplied = '(You have already applied for this job!)';
  applicantID!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private datePipe: DatePipe,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const vacancyId = Number(this.route.snapshot.paramMap.get('id'));
    this.applicantID =
      localStorage.getItem(APPLICANT_ID) != null
        ? (localStorage.getItem(APPLICANT_ID) as string)
        : '0';
    this.disableButton =
      localStorage.getItem(APPLICANT_ID) == null ? true : false;

    this.apollo
      .watchQuery({
        query: GET_VACANCY_PROFILE,
        variables: {
          vacancyId: vacancyId,
        },
      })
      .valueChanges.subscribe(({data}: any) => {
        this.vacancy = data.vacancy;
        console.log(data);
        this.disableButton = false;
      });

    this.apollo
      .watchQuery({
        query: CHECK_APPLIED_JOBS,
        variables: {
          vacancyId: vacancyId,
          applicantId: Number(this.applicantID),
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

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '600px',
      width: '600px',
      backdropClass: 'backdrop',
      panelClass: 'dialogTheme',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onApplySubmit(vacancy: Vacancy) {
    const vacancyId = vacancy.vacancyID;
    if (this.applicantID !=='0') {
      this.apollo
        .mutate({
          mutation: CREATE_APPLIED_JOBS,
          variables: {
            applicantId: Number(this.applicantID),
            vacancyId: vacancyId,
          },
        })
        .subscribe((data: any) => {
          console.log(data);
          this.JobAppliedSucessful = data.data.createAppliedJobs;
          this.disableButton = this.JobAppliedSucessful;
        });
    } else {
      this.openDialog();
    }
  }

  public SetCorrectDate(date: any) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
}
