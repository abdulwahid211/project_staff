import {Apollo} from 'apollo-angular';
import {ADMIN_LOGIN} from '../../../graphql/graphql.queries';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginAdminService {
  constructor(private apollo: Apollo) {}
  error: any;
  data: string = '';

  async loginAdmin(login: any): Promise<Observable<string>> {
    return this.apollo
      .mutate({
        mutation: ADMIN_LOGIN,
        variables: {
          email: login.value.username,
          password: login.value.password,
        },
      })
      .pipe((data: any) => {
        console.log(data);
        return data;
      });
  }
}
