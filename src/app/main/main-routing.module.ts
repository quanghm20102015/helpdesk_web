import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from './conversations/dashboard/dashboard.component';
import { AccountComponent } from './settings/account/account.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // { path: 'contacts', component: DashboardComponent },
      { path: 'reports', component: DashboardComponent },
      { path: 'campaigns', component: DashboardComponent },
      { path: 'account', component: AccountComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
