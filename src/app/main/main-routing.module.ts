import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from './conversations/dashboard/dashboard.component';
import { AccountComponent } from './settings/account/account.component';
import { MentionsComponent } from './conversations/mentions/mentions.component';
import { UnattendedComponent } from './conversations/unattended/unattended.component';
import { InboxesComponent } from './conversations/inboxes/inboxes.component';
import { LabelsComponent } from './conversations/labels/labels.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { ReportsComponent } from '../reports/reports.component';
import { CampaignsComponent } from '../campaigns/campaigns.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'mentions/conversations', component: MentionsComponent },
      { path: 'unattended/conversations', component: UnattendedComponent },
      { path: 'inbox/:id', component: InboxesComponent },
      { path: 'label/:id', component: LabelsComponent },

      { path: 'contacts', component: ContactsComponent },

      { path: 'reports', component: ReportsComponent },

      { path: 'campaigns', component: CampaignsComponent },

      { path: 'settings', redirectTo: 'account', pathMatch: 'full' },
      { path: 'account', component: AccountComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
