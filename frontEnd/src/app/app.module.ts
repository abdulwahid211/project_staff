import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserFormsComponent } from './components/login/user-forms/user-forms.component';
import { FormsModule  } from '@angular/forms';
import { AboutComponent } from './components/about/about.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { RegisterApplicantComponent } from './components/register/register-applicant.component';
import { NavComponent } from './components/nav/nav.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ApplicantsProfileComponent } from './components/applicants-profile/applicants-profile.component';
import { ApplicantComponent } from './components/applicants-profile/applicant.components';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    UserFormsComponent,
    AboutComponent,
    ContactusComponent,
    RegisterApplicantComponent,
    NavComponent,
    ApplicantsProfileComponent,
    ApplicantComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'appProfile', component: ApplicantsProfileComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contactus', component: ContactusComponent },
      { path: 'register', component: RegisterApplicantComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]),
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
