import { Apollo } from 'apollo-angular';
import { CREATE_VACANCY_PROFILE } from '../../../graphql/graphql.queries';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RegisterVacancyService {

    constructor(private apollo: Apollo) { }

   async registerVacancy(register:any): Promise<Observable<string>>{
       return this.apollo.mutate({
          mutation: CREATE_VACANCY_PROFILE,
          variables: {
            employerId: register.value.employerId,
            title: register.value.title,
            description: register.value.description,
            created: register.value.created
          }
        }).pipe(((data:any)=>{
            return data;
        }
        
        ))
        }


}