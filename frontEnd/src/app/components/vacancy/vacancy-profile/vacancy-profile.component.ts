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
    'Thank you for submitting your CV, we will contact you if you have been successful!';
  TextAlreadyJobApplied = 'You have applied this job before!';
  applicantId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private datePipe: DatePipe,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const vacancyId = Number(this.route.snapshot.paramMap.get('id'));
    this.applicantId =
      localStorage.getItem(APPLICANT_ID) != null
        ? (localStorage.getItem(APPLICANT_ID) as string)
        : '0';
    console.log(vacancyId);

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
          applicantId: Number(this.applicantId),
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

    if (this.applicantId) {
      this.apollo
        .mutate({
          mutation: CREATE_APPLIED_JOBS,
          variables: {
            applicantId: this.applicantId,
            vacancyId: vacancyId,
          },
        })
        .subscribe((data: any) => {
          this.JobAppliedSucessful = data.data.createAppliedJobs;
          this.disableButton = true;
        });
    } else {
      this.openDialog();
    }
  }

  public SetCorrectDate(date: any) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
}
