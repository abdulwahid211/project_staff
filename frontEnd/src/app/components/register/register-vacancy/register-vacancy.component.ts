import {Component, OnInit} from '@angular/core';
import {RegisterVacancyService} from './register-vacancy.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register-vacancy',
  templateUrl: './register-Vacancy.component.html',
  styleUrls: ['./register-vacancy.component.css'],
})
export class RegisterVacancyComponent {
  protected validation: boolean = false;

  protected registerError: boolean = false;

  protected formSuccessful: boolean = false;

  protected registerErrorLabelText: string = '';

  private registerVacancy: any | undefined;

  constructor(
    private registerVacancyService: RegisterVacancyService,
    private router: Router,
  ) {}

  async onClickSubmit(result: NgForm) {
    this.registerVacancy = await this.registerVacancyService.registerVacancy(
      result,
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
