import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';
import { ConfirmSigupComponent } from './page/signup/confirmSigup.component';
import { SetNewPasswordComponent } from './page/set-new-password/set-new-password.component';
import { ConfirmResetPasswordComponent } from './page/signup/confirm-reset-password.component';


const routes: Routes = [
  // {path: "", component: HomepageComponent},
  {path: "main", loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  {path: "", redirectTo: '/login', pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "confirm-sigup/:token", component: ConfirmSigupComponent},
  {path: "reset-password", component: ResetPasswordComponent},
  {path: "set-new-password/:token", component: SetNewPasswordComponent},
  {path: "reset-password/:id", component: ConfirmResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
