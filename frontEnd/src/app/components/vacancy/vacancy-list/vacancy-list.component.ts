import {Component, OnInit} from '@angular/core';
import {Vacancy} from 'src/app/types/vacancy';
import {GET_VACANCIES} from 'src/app/graphql/graphql.queries';

import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css'],
})
export class VacancyListComponent implements OnInit {
  vacancies: Vacancy[] = [];
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_VACANCIES,
      })
      .valueChanges.subscribe(({data, error}: any) => {
        console.log(data);
        this.vacancies = data.Vacancies;
      });
  }
}
