import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HomeComponent} from './components/home/home.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {UserFormsComponent} from './components/login/user-forms/user-forms.component';
import {FormsModule} from '@angular/forms';
import {AboutComponent} from './components/about/about.component';
import {ContactusComponent} from './components/contactus/contactus.component';
import {RegisterApplicantComponent} from './components/register/register-applicant/register-applicant.component';
import {RegisterAdminComponent} from './components/register/register-admin/register-admin.component';
import {NavComponent} from './components/nav/nav.component';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {ApplicantsProfileComponent} from './components/applicants-profile/applicants-profile.component';
import {ApplicantComponent} from './components/applicants-profile/applicant.components';
import {CommonModule} from '@angular/common';
import {RegisterEmployerComponent} from './components/register/register-employer/register-employer.component';
import {RegisterVacancyComponent} from './components/register/register-vacancy/register-vacancy.component';
import {VacancyListComponent} from './components/vacancy/vacancy-list/vacancy-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgMaterialModule} from './modules/material.module';
import {VacancyCardComponent} from './components/vacancy/vacancy-card/vacancy-card.component';
import {VacancyProfileComponent} from './components/vacancy/vacancy-profile/vacancy-profile.component';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'appProfile', component: ApplicantsProfileComponent},
      {path: 'about', component: AboutComponent},
      {path: 'contactus', component: ContactusComponent},
      {path: 'register', component: RegisterApplicantComponent},
      {path: 'registerAdmin', component: RegisterAdminComponent},
      {path: 'registerEmployer', component: RegisterEmployerComponent},
      {path: 'registerVacancy', component: RegisterVacancyComponent},
      {path: 'vacancyList', component: VacancyListComponent},
      {path: 'vacancyProfile/:id', component: VacancyProfileComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'home', pathMatch: 'full'},
    ]),
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgMaterialModule,
  ],
  providers: [],
  bootstrap: [HomeComponent],
})
export class AppModule {}
