import {Component, ViewChild, OnInit} from '@angular/core';
import {
  GET_ALL_APPLIED_APPLICANTS,
  DELETE_ALL_APPLICANT,
  DOWNLOAD_CV,
} from 'src/app/graphql/graphql.queries';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';
import {DownloadCVFile} from 'src/app/utils/cvFileTools';
import {EMPLOYER_ID} from 'src/app/graphql/constants';

@Component({
  selector: 'table-all-applicants-applied',
  templateUrl: './table-all-applicants-applied.component.html',
  styleUrls: ['./table-all-applicants-applied.component.css'],
})
export class TableAllApplicantsAppliedComponent implements OnInit {
  displayedColumns: string[] = [
    'VacancyID',
    'JobTitle',
    'ApplicantID',
    'FirstName',
    'LastName',
    'Address',
    'City',
    'Postcode',
    'Email',
    'Download_CV',
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatTable, {static: true}) table: MatTable<any> | undefined;

  constructor(public dialog: MatDialog, private apollo: Apollo) {}
  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_ALL_APPLIED_APPLICANTS,
        variables: {
          employerId: localStorage.getItem(EMPLOYER_ID),
        },
      })
      .valueChanges.subscribe(({data, error}: any) => {
        this.dataSource.data = data.applicantAppliedJobs;
        console.log(error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
