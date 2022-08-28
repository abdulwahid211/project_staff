import {Apollo} from 'apollo-angular';
import {EMPLOYER_LOGIN} from '../../../graphql/graphql.queries';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginEmployerService {
  constructor(private apollo: Apollo) {}
  error: any;
  data: string = '';

  async loginEmployer(login: any): Promise<Observable<string>> {
    return this.apollo
      .mutate({
        mutation: EMPLOYER_LOGIN,
        variables: {
          email: login.value.username,
          password: login.value.password,
        },
      })
      .pipe((data: any) => {
        return data;
      });
  }
}
