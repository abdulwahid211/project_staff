import {Component, ViewChild, OnInit} from '@angular/core';
import {GET_ALL_EMPLOYERS} from 'src/app/graphql/graphql.queries';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../dialogs/dialog-box/dialog-box.component';
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
