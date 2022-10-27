import {Component, ViewChild, OnInit} from '@angular/core';
import {
  GET_ALL_EMPLOYERS,
  DELETE_ALL_EMPLOYER,
} from 'src/app/graphql/graphql.queries';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';
import {Employer} from 'src/app/types/employer';

@Component({
  selector: 'table-all-employers',
  templateUrl: './table-all-employers.component.html',
  styleUrls: ['./table-all-employers.component.css'],
})
export class TableAllEmployersComponent implements OnInit {
  displayedColumns: string[] = [
    'EmployerID',
    'Name',
    'Address',
    'City',
    'Postcode',
    'Email',
    'Delete',
  ];
  dataSource = new MatTableDataSource<Employer>([]);

  @ViewChild(MatTable, {static: true}) table: MatTable<Employer> | undefined;

  constructor(public dialog: MatDialog, private apollo: Apollo) {}
  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_ALL_EMPLOYERS,
      })
      .valueChanges.subscribe(({data, error}: any) => {
        this.dataSource.data = data.Employers;
        console.log(data);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(email) {
    console.log(email);
    this.apollo
      .mutate({
        mutation: DELETE_ALL_EMPLOYER,
        variables: {
          email: email,
        },
      })
      .subscribe(value => {
        if (value) {
          window.location.reload();
        }
      });
  }
}
