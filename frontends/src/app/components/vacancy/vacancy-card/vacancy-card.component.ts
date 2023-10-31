import {Component, OnInit, Input} from '@angular/core';
import {Vacancy} from 'src/app/types/vacancy';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'vacancy-card',
  templateUrl: './vacancy-card.component.html',
  styleUrls: ['./vacancy-card.component.css'],
})
export class VacancyCardComponent {
  @Input('vacancy') vacancy!: Vacancy;

  constructor(private router: Router, private datePipe: DatePipe) {}

  onSelect(vacancy: Vacancy): void {
    const id = vacancy.vacancyID;
    console.log(vacancy.title);

    this.router.navigate(['/vacancyProfile/' + id]);
  }

  public SetCorrectDate(date: any) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
}
