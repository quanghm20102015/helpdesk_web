import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsComponent } from './reports/reports.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { SetNewPasswordComponent } from './page/set-new-password/set-new-password.component';
import { SurveyComponent } from './page/survey/survey.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    ReportsComponent,
    SetNewPasswordComponent,
    SurveyComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
