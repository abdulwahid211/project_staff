import {Component, ViewChild, OnInit} from '@angular/core';
import {
  GET_ALL_ADMINS,
  DELETE_ALL_ADMIN,
} from 'src/app/graphql/graphql.queries';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../dialogs/dialog-box/dialog-box.component';
import {Apollo} from 'apollo-angular';
import {Admin} from 'src/app/types/admin';
import {AuthService} from '../../login/auth-service/auth.service';

@Component({
  selector: 'table-all-admins',
  templateUrl: './table-all-admins.component.html',
  styleUrls: ['./table-all-admins.component.css'],
})
export class TableAllAdminsComponent implements OnInit {
  displayedColumns: string[] = [
    'AdminID',
    'LastName',
    'FirstName',
    'Email',
    'Delete',
  ];
  isAdminLogin = false;
  dataSource = new MatTableDataSource<Admin>([]);

  @ViewChild(MatTable, {static: true}) table: MatTable<Admin> | undefined;

  constructor(
    public dialog: MatDialog,
    private apollo: Apollo,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.authService.isAdminLogin.subscribe(value => {
      this.fetchAllAdmins();
    });
  }

  fetchAllAdmins() {
    this.apollo
      .watchQuery({
        query: GET_ALL_ADMINS,
      })
      .valueChanges.subscribe(({data, error}: any) => {
        this.dataSource.data = data.admins;
        console.log(error);
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
        mutation: DELETE_ALL_ADMIN,
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
