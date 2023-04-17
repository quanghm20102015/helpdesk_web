import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from './conversations/dashboard/dashboard.component';
import { MentionsComponent } from './conversations/mentions/mentions.component';
import { UnattendedComponent } from './conversations/unattended/unattended.component';
import { InboxesComponent } from './conversations/inboxes/inboxes.component';
import { LabelsComponent } from './conversations/labels/labels.component';
import { ContactsComponent } from '../main/contacts/contacts.component';
import { CtLabelsComponent } from './contacts/ct-labels/ct-labels.component';
import { OverviewComponent } from './reports/overview/overview.component';
import { ConversationComponent } from './reports/conversation/conversation.component';
import { CsatComponent } from './reports/csat/csat.component';
import { AgentComponent } from './reports/agent/agent.component';
import { RpLabelComponent } from './reports/rp-label/rp-label.component';
import { RpInboxesComponent } from './reports/rp-inboxes/rp-inboxes.component';
import { RpTeamsComponent } from './reports/rp-teams/rp-teams.component';
import { OngoingComponent } from './campaigns/ongoing/ongoing.component';
import { OneOffComponent } from './campaigns/one-off/one-off.component';
import { GeneralComponent } from './settings/general/general.component';
import { StTeamsComponent } from './settings/st-teams/st-teams.component';
import { StInboxesComponent } from './settings/st-inboxes/st-inboxes.component';
import { StLabelsComponent } from './settings/st-labels/st-labels.component';
import { AttributesComponent } from './settings/attributes/attributes.component';
import { CannedResponseComponent } from './settings/canned-response/canned-response.component';
import { IntegrationsComponent } from './settings/integrations/integrations.component';
import { ApplicationsComponent } from './settings/applications/applications.component';
import { BillingComponent } from './settings/billing/billing.component';
import { NewTeamComponent } from './settings/st-teams/new-team/new-team.component';
import { NewInboxComponent } from './settings/st-inboxes/new-inbox/new-inbox.component';
import { NewLabelComponent } from './settings/st-labels/new-label/new-label.component';
import { StAgentsComponent } from './settings/st-agents/st-agents.component';
import { AccountComponent } from './settings/account/account.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'conversations', redirectTo: 'conversations/dashboard', pathMatch: 'full' },
      { path: 'conversations/dashboard', component: DashboardComponent },
      { path: 'conversations/mentions', component: MentionsComponent },
      { path: 'conversations/unattended', component: UnattendedComponent },
      { path: 'conversations/inbox/:id', component: InboxesComponent },
      { path: 'conversations/label/:id', component: LabelsComponent },

      { path: 'contacts', redirectTo: 'contacts/all', pathMatch: 'full' },
      { path: 'contacts/all', component: ContactsComponent },
      { path: 'contacts/label/:id', component: CtLabelsComponent },
      
      { path: 'reports', redirectTo: 'reports/overview', pathMatch: 'full' },
      { path: 'reports/overview', component: OverviewComponent },
      { path: 'reports/conversation', component: ConversationComponent },
      { path: 'reports/csat', component: CsatComponent },
      { path: 'reports/agent', component: AgentComponent },
      { path: 'reports/label', component: RpLabelComponent },
      { path: 'reports/inboxes', component: RpInboxesComponent },
      { path: 'reports/teams', component: RpTeamsComponent },

      { path: 'campaigns',  redirectTo: 'campaigns/ongoing', pathMatch: 'full' },
      { path: 'campaigns/ongoing', component: OngoingComponent },
      { path: 'campaigns/one-off', component: OneOffComponent },

      { path: 'settings', redirectTo: 'settings/general', pathMatch: 'full' },
      { path: 'settings/general', component: GeneralComponent },
      { path: 'settings/account', component: AccountComponent },
      { path: 'settings/agents', component: StAgentsComponent },
      { path: 'settings/teams', component: StTeamsComponent },
      { path: 'settings/teams/new', component: NewTeamComponent },
      { path: 'settings/inboxes', component: StInboxesComponent },
      { path: 'settings/inboxes/new', component: NewInboxComponent },
      { path: 'settings/labels', component: StLabelsComponent },
      { path: 'settings/labels/new', component: NewLabelComponent },
      { path: 'settings/custom-attributes', component: AttributesComponent },
      { path: 'settings/canned-response', component: CannedResponseComponent },
      { path: 'settings/integrations', component: IntegrationsComponent },
      { path: 'settings/applications', component: ApplicationsComponent },
      { path: 'settings/billing', component: BillingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
