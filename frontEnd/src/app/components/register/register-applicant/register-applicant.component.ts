import {Component, OnInit} from '@angular/core';
import {RegisterApplicantService} from './register-applicant.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UPLOAD_CV} from 'src/app/graphql/graphql.queries';
import {Apollo} from 'apollo-angular';
import {ReplaySubject} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register-applicant.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DatePipe],
})
export class RegisterApplicantComponent {
  protected validation: boolean = false;

  protected registerError: boolean = false;

  protected formSuccessful: boolean = false;

  protected registerErrorLabelText: string = '';

  private registerApplicant: any | undefined;

  private _createdDate: any | undefined;

  protected cvFile: Event | undefined;

  constructor(
    private registerApplicantService: RegisterApplicantService,
    private router: Router,
    private apollo: Apollo,
    private datePipe: DatePipe,
  ) {}

  async onClickSubmit(result: any) {
    this._createdDate = Date.now();

    this.registerApplicant =
      await this.registerApplicantService.registerApplicant(result);

    this.fileUpload(this.cvFile, result.value.email);

    this.registerApplicant.subscribe(
      data => {
        console.log(data);
        this.formSuccessful = data.data.createApplicant;
      },
      error => {
        console.log('Error ' + error);
      },
    );
  }

  async fileUpload(event: any, email: string) {
    const file: File = event.target.files[0];
    console.log(file);

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload;

    this.convertFile(file).subscribe(base64 => {
      console.log(file.type);

      this.apollo
        .mutate({
          mutation: UPLOAD_CV,
          variables: {
            file: base64,
            email: email,
            filename: file.name,
            created: this.datePipe.transform(this._createdDate, 'yyyy-MM-dd'),
            type: file.type,
            size: file.size,
          },
        })
        .subscribe(data => {
          console.log(data);
        });
    });
  }

  convertFile(file: File) {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) =>
      result.next(btoa(event.target.result.toString()));
    return result;
  }
}
