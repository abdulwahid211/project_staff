import {Input, Component} from '@angular/core';
import {Employer} from 'src/app/types/employer';

@Component({
  selector: 'employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css'],
})
export class EmployerComponent {
  @Input('employer') data!: Employer;
}
