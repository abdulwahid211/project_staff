import { Apollo } from 'apollo-angular';
import { APPLICANT_LOGIN } from '../../../graphql/graphql.queries';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserFormsService {

    constructor(private apollo: Apollo) { }
     error: any;
     data:string ='';

    loginApplicant(login): Observable<string>{
       return this.apollo.mutate({
          mutation: APPLICANT_LOGIN,
          variables: {
            email: login.value.username,
            password: login.value.password,
          }
        }).pipe(map((data:any)=>{
            return data
        }))
        }


}