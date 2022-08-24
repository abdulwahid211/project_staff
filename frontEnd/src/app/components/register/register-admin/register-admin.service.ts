import { Apollo } from 'apollo-angular';
import { CREATE_ADMIN_PROFILE } from '../../../graphql/graphql.queries';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RegisterAdminService {
 
    constructor(private apollo: Apollo) { }

   async registerAdmin(register:any): Promise<Observable<string>>{
       return this.apollo.mutate({
          mutation: CREATE_ADMIN_PROFILE,
          variables: {
            firstName: register.value.firstname,
            lastName: register.value.lastname,
            email: register.value.email,
            password: register.value.password
          }
        }).pipe(((data:any)=>{
            return data;
        }
        
        ))
        }


}