import { Apollo } from 'apollo-angular';
import { CREATE_EMPLOYER_PROFILE } from '../../../graphql/graphql.queries';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RegisterEmployerService {

    constructor(private apollo: Apollo) { }

   async registerEmployer(register:any): Promise<Observable<string>>{
       return this.apollo.mutate({
          mutation: CREATE_EMPLOYER_PROFILE,
          variables: {
            name: register.value.name,
            email: register.value.email,
            password: register.value.password,
            address: register.value.address,
            city: register.value.city,
            postcode: register.value.postcode
          }
        }).pipe(((data:any)=>{
            return data;
        }
        
        ))
        }


}