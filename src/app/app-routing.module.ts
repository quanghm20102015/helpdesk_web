import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';

const routes: Routes = [
  // {path: "", component: HomepageComponent},
  {path: "", redirectTo: '/login', pathMatch: 'full'},
  {path: "main", loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "reset-password", component: ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
