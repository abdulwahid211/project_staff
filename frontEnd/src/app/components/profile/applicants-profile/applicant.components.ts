import {Input, Component} from '@angular/core';
import {Applicants} from 'src/app/types/applicants';

@Component({
  selector: 'applicant',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css'],
})
export class ApplicantComponent {
  @Input('applicant') data!: Applicants;
}
