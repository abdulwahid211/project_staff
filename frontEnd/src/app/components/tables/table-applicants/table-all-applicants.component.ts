import {Component, ViewChild, OnInit} from '@angular/core';
import {
  GET_ALL_APPLICANTS,
  DELETE_ALL_APPLICANT,
} from 'src/app/graphql/graphql.queries';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../dialogs/dialog-box/dialog-box.component';
import {Apollo} from 'apollo-angular';
import {Applicants} from 'src/app/types/applicants';

@Component({
  selector: 'table-all-applicants',
  templateUrl: './table-all-applicants.component.html',
  styleUrls: ['./table-all-applicants.component.css'],
})
export class TableAllApplicantsComponent implements OnInit {
  displayedColumns: string[] = [
    'ApplicantID',
    'FirstName',
    'LastName',
    'Address',
    'City',
    'Postcode',
    'Email',
    'Delete',
  ];
  dataSource = new MatTableDataSource<Applicants>([]);

  @ViewChild(MatTable, {static: true}) table: MatTable<Applicants> | undefined;

  constructor(public dialog: MatDialog, private apollo: Apollo) {}
  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_ALL_APPLICANTS,
      })
      .valueChanges.subscribe(({data, error}: any) => {
        this.dataSource.data = data.applicants;
        console.log(data.applicants);
        console.log(error);
      });
  }

  openDialog(action, messageAction, obj) {
    obj.action = action;
    obj.messageAction = messageAction;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '350px',
      data: obj,
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
        mutation: DELETE_ALL_APPLICANT,
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
