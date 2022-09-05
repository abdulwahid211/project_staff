import {Apollo} from 'apollo-angular';
import {CREATE_ADMIN_PROFILE} from '../../../graphql/graphql.queries';
import {Observable} from 'rxjs';
import {Injectable, OnInit} from '@angular/core';
import {ADMIN_LOGIN_ENABLED} from 'src/app/graphql/constants';

@Injectable({
  providedIn: 'root',
})
export class RegisterAdminService implements OnInit {
  private isAdminLogin = false;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.isAdminLogin = localStorage.getItem(
      ADMIN_LOGIN_ENABLED,
    ) as unknown as boolean;
  }

  async registerAdmin(register: any): Promise<Observable<string>> {
    return this.apollo
      .mutate({
        mutation: CREATE_ADMIN_PROFILE,
        variables: {
          firstName: register.value.firstname,
          lastName: register.value.lastname,
          email: register.value.email,
          password: register.value.password,
        },
      })
      .pipe((data: any) => {
        return data;
      });
  }
}
