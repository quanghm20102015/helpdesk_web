import { Component, ElementRef, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';

import { ReportsAgentService } from 'src/app/service/reports-agent.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';
import { OverviewService } from 'src/app/service/overview.service';

import { PerformentTotalModel } from '../models/performent-total-model';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})

export class AgentComponent implements OnInit {
  private optionDateSubscription$?: Subscription;

  listAgent: any = []
  listConversationAgents: any[] = []

  listConversationGroups: any = [
    {groupName: 'Group 1', member: 1, conversation: 43},
    {groupName: 'Group 2', member: 2, conversation: 5},
    {groupName: 'Group 3', member: 3, conversation: 88},
    {groupName: 'Group 4', member: 4, conversation: 66},
    {groupName: 'Group 5', member: 5, conversation: 55},
    {groupName: 'Group 6', member: 6, conversation: 44},
  ]

  total: number = 0;
  online: number = 0;
  busy: number = 0;
  offline: number = 0;

  selectedAgent: any = 0

  textSearch: string = '';
  idCompany: any;
  fromDate: any;
  toDate: any;
  datePipe = new DatePipe('en-US');

  Highcharts: typeof Highcharts = Highcharts;
  updateAgentFlag = false;
  updateGroupFlag = false;

  chartOptionsAgent: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: undefined,
    subtitle: undefined,
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    xAxis: {
      categories: [],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: undefined
      }
    },
    tooltip: {
      shared: true
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      x: 0,
      y: 20,
      floating: true,
      enabled: false
    },
    series: [
      {
        type: 'column',
        color: '#3A69DB',
        tooltip: {
          valueSuffix: ''
        },
        data: []
      }
    ]
  };

  chartOptionsGroup: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: undefined,
    subtitle: undefined,
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    xAxis: {
      categories: ['28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22' ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: undefined
      }
    },
    tooltip: {
      shared: true
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      x: 0,
      y: 20,
      floating: true,
      enabled: false
    },
    series: [
      {
        type: 'column',
        color: '#3A69DB',
        tooltip: {
          valueSuffix: ''
        },
        data: [41, 24, 57, 66, 44, 33, 77]
      }
    ]
  };

  performentTotalModel!: PerformentTotalModel;

  constructor(
    private agentService: ReportsAgentService,
    private userInfoStorageService: UserInfoStorageService,
    private overviewService: OverviewService
  ) { }

  ngOnInit(): void {
    More(Highcharts);

    this.optionDateSubscription$ = this.overviewService.optionDateSubject$
    .subscribe((response: any) => {
      this.fromDate = response.fromDate;
      this.toDate = response.toDate;

      this.loadOverview();
      this.loadListConversationAgents();
      this.loadPerformentMonitorTotal();
      this.loadPerformentMonitor(1);
    });
  }

  ngAfterViewInit() {}

  loadOverview() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany
    }

    this.agentService.getOverview(request).subscribe((respone) => {
      console.log('getOverview', respone);

      this.total = respone.result.total;
      this.online = respone.result.online;
      this.busy = respone.result.busy;
      this.offline = respone.result.offline;
    });
  }

  loadPerformentMonitorTotal() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany,
      idUser: this.selectedAgent
    }

    this.agentService.agentPerformentMonitorTotal(request).subscribe((respone) => {
      this.performentTotalModel = respone.result;
    });
  }

  loadPerformentMonitor(_type: number) {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany,
      type: _type,
      idUser: this.selectedAgent
    }

    this.agentService.agentPerformentMonitor(request).subscribe((respone) => {
      let nameChart = '';

      if (_type == 1)
        nameChart = 'Conversations'
      else if (_type == 2)
        nameChart = 'Outgoing Messages'
      else if (_type == 3)
        nameChart = 'Resolved Count'
      else if (_type == 4)
        nameChart = 'First Response Time'
      else if (_type == 5)
        nameChart = 'Resolved Time'

      this.chartOptionsAgent.xAxis = {
        categories: respone.result.label,
        crosshair: true
      }

      this.chartOptionsAgent.series! = [
        {
          type: 'column',
          name: nameChart,
          data: respone.result.data
        }
      ]

      this.updateAgentFlag = true;
    });
  }

  loadListConversationAgents() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany
    }

    this.agentService.agentTopConversation(request).subscribe((respone) => {
      this.listConversationAgents = respone.result;
      console.log('topConversationAgent', respone);

      this.listConversationAgents.forEach((element) => {
        this.listAgent.push({name: element.agent, value: element.idUser});
      });
    });
  }

  onChangePerformance(event: any, action: number) {
    //action: 1:Agent; 2: Group

    if (action == 1) {
      let index = event.index + 1;

      this.loadPerformentMonitor(index);
    }
  }

  onKeyupSearch() {

  }

  onChangeSelectFilter() {

  }

  ngOnDestroy(): void {
    if(this.optionDateSubscription$)
      this.optionDateSubscription$.unsubscribe();
  }

}
