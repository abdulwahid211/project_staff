import {Component, ViewChild, OnInit} from '@angular/core';
import {
  GET_VACANCIES,
  DELETE_ALL_VACANCY,
} from 'src/app/graphql/graphql.queries';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';
import {Vacancy} from 'src/app/types/vacancy';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'table-all-vacancies',
  templateUrl: './table-all-vacancies.component.html',
  styleUrls: ['./table-all-vacancies.component.css'],
})
export class TableAllVacanciesComponent implements OnInit {
  displayedColumns: string[] = [
    'VacancyID',
    'EmployerID',
    'Title',
    'Created',
    'Sector',
    'Location',
    'Delete',
  ];
  dataSource = new MatTableDataSource<Vacancy>([]);

  @ViewChild(MatTable, {static: true}) table: MatTable<Vacancy> | undefined;

  constructor(
    public dialog: MatDialog,
    private apollo: Apollo,
    private datePipe: DatePipe,
  ) {}
  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_VACANCIES,
      })
      .valueChanges.subscribe(({data, error}: any) => {
        this.dataSource.data = data.Vacancies;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public SetCorrectDate(date: any) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  delete(vacancyId) {
    console.log(vacancyId);
    this.apollo
      .mutate({
        mutation: DELETE_ALL_VACANCY,
        variables: {
          vacancyId: vacancyId,
        },
      })
      .subscribe(value => {
        if (value) {
          window.location.reload();
        }
      });
  }
}
