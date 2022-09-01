import {Component, ViewChild, OnInit} from '@angular/core';
import {GET_ALL_ADMINS} from 'src/app/graphql/graphql.queries';
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
    'Password',
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

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.dataSource);
      } else if (result.event == 'Update') {
        this.updateRowData(result.dataSource);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.dataSource);
      }
    });
  }

  addRowData(row_obj) {
    // var d = new Date();
    // this.dataSource.push({
    //   id: d.getTime(),
    //   name: row_obj.name,
    // });
    // this.table?.renderRows();
  }
  updateRowData(row_obj) {
    // this.dataSource = this.dataSource.filter((value, key) => {
    //   if (value.id == row_obj.id) {
    //     value.name = row_obj.name;
    //   }
    //   return true;
    // });
  }
  deleteRowData(row_obj) {
    //   this.dataSource = this.dataSource.filter((value, key) => {
    //     return value.id != row_obj.id;
    //   });
    // }
  }
}
