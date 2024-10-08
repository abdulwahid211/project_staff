import {Apollo} from 'apollo-angular';
import {CREATE_APPLICANT_PROFILE} from '../../../graphql/graphql.queries';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterApplicantService {
  constructor(private apollo: Apollo) {}

  async registerApplicant(register: any): Promise<Observable<string>> {
    return this.apollo
      .mutate({
        mutation: CREATE_APPLICANT_PROFILE,
        variables: {
          firstName: register.value.firstname,
          lastName: register.value.lastname,
          email: register.value.email,
          password: register.value.password,
          telephone: register.value.telephone,
          city: register.value.city,
        },
      })
      .pipe((data: any) => {
        return data;
      });
  }
}
