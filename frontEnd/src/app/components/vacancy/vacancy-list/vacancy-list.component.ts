import {Component, OnInit} from '@angular/core';
import {Vacancy} from 'src/app/types/vacancy';
import {GET_VACANCIES} from 'src/app/graphql/graphql.queries';

import {Apollo} from 'apollo-angular';
import {identifierName} from '@angular/compiler';

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css'],
})
export class VacancyListComponent implements OnInit {
  vacancies: Vacancy[] = [];

  sectors = ['All', 'Government', 'Retail', 'Sports', 'Information Technology'];

  public selectedSector;

  public selectedDefaultSector: string | undefined;

  selectedSectorJobs: Vacancy[] = [];

  constructor(private apollo: Apollo) {}

  public searchText;

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_VACANCIES,
      })
      .valueChanges.subscribe(({data, error}: any) => {
        console.log(data);
        this.vacancies = data.Vacancies;
        this.selectedSectorJobs = this.vacancies;
      });
  }

  public valueSelected() {
    this.selectedSector == 'All'
      ? (this.selectedSectorJobs = this.vacancies)
      : (this.selectedSectorJobs = this.vacancies.filter(
          item => item.Sector === this.selectedSector,
        ));

    console.log(this.selectedSectorJobs);
  }
}
