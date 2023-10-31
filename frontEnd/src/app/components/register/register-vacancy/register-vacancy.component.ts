import {Component, OnInit} from '@angular/core';
import {RegisterVacancyService} from './register-vacancy.service';
import {NgForm} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {sectors} from 'src/app/types/sectors';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register-vacancy',
  templateUrl: './register-vacancy.component.html',
  styleUrls: ['./register-vacancy.component.css'],
  providers: [DatePipe],
})
export class RegisterVacancyComponent implements OnInit {
  protected validation: boolean = false;

  protected registerError: boolean = false;

  protected formSuccessful: boolean = false;

  protected registerErrorLabelText: string = '';

  private registerVacancy: any | undefined;

  private _createdDate: any | undefined;
  public jobSectors = sectors;

  constructor(
    private registerVacancyService: RegisterVacancyService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {}

  public selectedSector: string | undefined;

  async onClickSubmit(result: NgForm) {
    this._createdDate = Date.now();
    this.registerVacancy = await this.registerVacancyService.registerVacancy(
      result,
      this.datePipe.transform(this._createdDate, 'yyyy-MM-dd'),
      this.selectedSector,
    );
    console.log(this.selectedSector);
    this.registerVacancy.subscribe(
      data => {
        console.log(data);
        this.formSuccessful = data.data.createVacancies;
        if( this.formSuccessful){
          result.resetForm();
        }
      },
      error => {
        console.log('Error ' + error);
      },
    );
  }

  public onOptionsSelected(event) {
    const value = event.target.value;
    if (value) {
      this.selectedSector = value;
    }
  }
}
