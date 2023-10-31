import {Component, ViewChild, OnInit} from '@angular/core';
import {
  GET_ALL_APPLICANTS,
  DELETE_APPLICANT,
  DOWNLOAD_CV,
} from 'src/app/graphql/graphql.queries';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';
import {Applicants} from 'src/app/types/applicants';
import {DownloadCVFile} from 'src/app/utils/cvFileTools';

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
    'City',
    'Email',
    'Telephone',
    'Download_CV',
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
        mutation: DELETE_APPLICANT,
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

  downloadCV(email) {
    console.log(email);
    this.apollo
      .mutate({
        mutation: DOWNLOAD_CV,
        variables: {
          email: email,
        },
      })
      .subscribe((value: any) => {
        if (value) {
          DownloadCVFile(value.data.downloadCV);
        }
      });
  }
}
