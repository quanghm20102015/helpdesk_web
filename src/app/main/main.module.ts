import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './conversations/dashboard/dashboard.component';
import { MentionsComponent } from './conversations/mentions/mentions.component';
import { UnattendedComponent } from './conversations/unattended/unattended.component';
import { InboxesComponent } from './conversations/inboxes/inboxes.component';
import { LabelsComponent } from './conversations/labels/labels.component';
import { AccountComponent } from './settings/account/account.component';
import { AgentsComponent } from './settings/agents/agents.component';
import { StInboxesComponent } from './settings/st-inboxes/st-inboxes.component';
import { StLabelsComponent } from './settings/st-labels/st-labels.component';
import { AttributesComponent } from './settings/attributes/attributes.component';
import { AtomationComponent } from './settings/atomation/atomation.component';
import { BotsComponent } from './settings/bots/bots.component';
import { MacrosComponent } from './settings/macros/macros.component';
import { CannedResponseComponent } from './settings/canned-response/canned-response.component';
import { IntegrationsComponent } from './settings/integrations/integrations.component';
import { ApplicationsComponent } from './settings/applications/applications.component';
import { BillingComponent } from './settings/billing/billing.component';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './layout/menu/menu.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
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
import { NewLabelComponent } from './settings/st-labels/new-label/new-label.component';
import { NewTeamComponent } from './settings/st-teams/new-team/new-team.component';
import { NewInboxComponent } from './settings/st-inboxes/new-inbox/new-inbox.component';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    //Conversations
    DashboardComponent,
    MentionsComponent,
    UnattendedComponent,
    InboxesComponent,
    LabelsComponent,
    //Setting
    AccountComponent,
    AgentsComponent,
    StInboxesComponent,
    StLabelsComponent,
    AttributesComponent,
    AtomationComponent,
    BotsComponent,
    MacrosComponent,
    CannedResponseComponent,
    IntegrationsComponent,
    ApplicationsComponent,
    BillingComponent,
    ContactsComponent,
    CampaignsComponent,
    CtLabelsComponent,
    OverviewComponent,
    ConversationComponent,
    CsatComponent,
    AgentComponent,
    RpLabelComponent,
    RpInboxesComponent,
    RpTeamsComponent,
    OngoingComponent,
    OneOffComponent,
    GeneralComponent,
    StTeamsComponent,
    NewLabelComponent,
    NewTeamComponent,
    NewInboxComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class MainModule { }
