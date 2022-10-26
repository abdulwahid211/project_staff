import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MainComponent} from './components/main/main.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {UserFormsComponent} from './components/login/login-applicant/login-applicant.component';
import {FormsModule} from '@angular/forms';
import {AboutComponent} from './components/about/about.component';
import {ContactusComponent} from './components/contactus/contactus.component';
import {RegisterApplicantComponent} from './components/register/register-applicant/register-applicant.component';
import {RegisterAdminComponent} from './components/register/register-admin/register-admin.component';
import {NavComponent} from './components/nav/nav.component';
import {GraphQLModule} from './modules/graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {RegisterEmployerComponent} from './components/register/register-employer/register-employer.component';
import {RegisterVacancyComponent} from './components/register/register-vacancy/register-vacancy.component';
import {VacancyListComponent} from './components/vacancy/vacancy-list/vacancy-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgMaterialModule} from './modules/material.module';
import {VacancyCardComponent} from './components/vacancy/vacancy-card/vacancy-card.component';
import {VacancyProfileComponent} from './components/vacancy/vacancy-profile/vacancy-profile.component';
import {LoginEmployerComponent} from './components/login/login-employer/login-employer.component';
import {LoginAdminComponent} from './components/login/login-admin/login-admin.component';
import {ApplicantsProfileComponent} from './components/profile/applicant-profile/applicants-profile.component';
import {ApplicantComponent} from './components/profile/applicant-profile/applicant.components';
import {EmployerProfileComponent} from './components/profile/employer-profile/employer-profile.component';
import {EmployerComponent} from './components/profile/employer-profile/employer.components';
import {TableAllApplicantsComponent} from './components/tables/table-applicants/table-all-applicants.component';
import {TableAllEmployersComponent} from './components/tables/table-employers/table-all-employers.component';
import {TableAllAdminsComponent} from './components/tables/table-admins/table-all-admins.component';
import {TableAllApplicantsAppliedComponent} from './components/tables/table-applicants-applied/table-all-applicants-applied.component';
import {DialogBoxComponent} from './components/dialogs/dialog-box/dialog-box.component';
import {HomeComponent} from './components/home/home.component';
import {FooterComponent} from './components/footer/footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    UserFormsComponent,
    AboutComponent,
    ContactusComponent,
    RegisterApplicantComponent,
    RegisterEmployerComponent,
    RegisterVacancyComponent,
    RegisterAdminComponent,
    NavComponent,
    ApplicantsProfileComponent,
    ApplicantComponent,
    VacancyListComponent,
    VacancyCardComponent,
    VacancyProfileComponent,
    LoginEmployerComponent,
    LoginAdminComponent,
    EmployerProfileComponent,
    EmployerComponent,
    TableAllApplicantsComponent,
    TableAllEmployersComponent,
    TableAllAdminsComponent,
    TableAllApplicantsAppliedComponent,
    DialogBoxComponent,
    MainComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'loginEmployer', component: LoginEmployerComponent},
      {path: 'admin', component: LoginAdminComponent},
      {path: 'applicantProfile', component: ApplicantsProfileComponent},
      {path: 'employerProfile', component: EmployerProfileComponent},
      {path: 'about', component: AboutComponent},
      {path: 'contactus', component: ContactusComponent},
      {path: 'register', component: RegisterApplicantComponent},
      {path: 'registerAdmin', component: RegisterAdminComponent},
      {path: 'registerEmployer', component: RegisterEmployerComponent},
      {path: 'postVacancy', component: RegisterVacancyComponent},
      {path: 'vacancyList', component: VacancyListComponent},
      {path: 'vacancyProfile/:id', component: VacancyProfileComponent},
      {path: 'allApplicants', component: TableAllApplicantsComponent},
      {path: 'allEmployers', component: TableAllEmployersComponent},
      {path: 'allAdmins', component: TableAllAdminsComponent},
      {path: 'allAppliedApplicants', component: TableAllAdminsComponent},
      {
        path: 'allAppiedApplicants',
        component: TableAllApplicantsAppliedComponent,
      },
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
    ]),
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgMaterialModule,
  ],
  providers: [],
  bootstrap: [MainComponent],
})
export class AppModule {}
