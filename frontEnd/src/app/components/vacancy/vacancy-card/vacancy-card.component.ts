import {Component, OnInit, Input} from '@angular/core';
import {Vacancy} from 'src/app/types/vacancy';
import {Router} from '@angular/router';

@Component({
  selector: 'vacancy-card',
  templateUrl: './vacancy-card.component.html',
  styleUrls: ['./vacancy-card.component.css'],
})
export class VacancyCardComponent {
  @Input('vacancy') vacancy!: Vacancy;

  constructor(private router: Router) {}

  onSelect(vacancy: Vacancy): void {
    const id = vacancy.VacancyID;
    console.log(vacancy.Title);

    this.router.navigate(['/vacancyProfile/' + id]);
  }
}
