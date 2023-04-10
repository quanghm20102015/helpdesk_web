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
import { TeamsComponent } from './settings/teams/teams.component';
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
    TeamsComponent,
    StInboxesComponent,
    StLabelsComponent,
    AttributesComponent,
    AtomationComponent,
    BotsComponent,
    MacrosComponent,
    CannedResponseComponent,
    IntegrationsComponent,
    ApplicationsComponent,
    BillingComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class MainModule { }
