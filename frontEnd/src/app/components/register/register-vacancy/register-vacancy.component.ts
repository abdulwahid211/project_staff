import {Component, OnInit} from '@angular/core';
import {RegisterVacancyService} from './register-vacancy.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-register-vacancy',
  templateUrl: './register-Vacancy.component.html',
  styleUrls: ['./register-vacancy.component.css'],
  providers: [DatePipe],
})
export class RegisterVacancyComponent {
  protected validation: boolean = false;

  protected registerError: boolean = false;

  protected formSuccessful: boolean = false;

  protected registerErrorLabelText: string = '';

  private registerVacancy: any | undefined;

  private _createdDate: any | undefined;

  constructor(
    private registerVacancyService: RegisterVacancyService,
    private router: Router,
    private datePipe: DatePipe,
  ) {}

  async onClickSubmit(result: NgForm) {
    this._createdDate = Date.now();
    this.registerVacancy = await this.registerVacancyService.registerVacancy(
      result,
      this.datePipe.transform(this._createdDate, 'yyyy-MM-dd'),
    );

    this.registerVacancy.subscribe(
      data => {
        console.log(data);
        this.formSuccessful = data.data.createVacancies;
      },
      error => {
        console.log('Error ' + error);
      },
    );
  }
}
