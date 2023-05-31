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

  listGroup: any = []
  listConversationGroups: any[] = []

  total: number = 0;
  online: number = 0;
  busy: number = 0;
  offline: number = 0;

  selectedAgent: any = 0
  selectedGroup: any = 0

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
      type: 'column',
      events:{
        render:function(){
          setTimeout(() => {
            this.reflow()
          }, 200);
        }
      }
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
      type: 'column',
      events:{
        render:function(){
          setTimeout(() => {
            this.reflow()
          }, 200);
        }
      }
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

  performentAgentsTotalModel!: PerformentTotalModel;
  performentGroupTotalModel!: PerformentTotalModel;

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
      this.loadPerformentMonitorAgents(1);

      this.loadListConversationGroup();
      this.loadPerformentMonitorGroupTotal();
      this.loadPerformentMonitorGroup(1);
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
      this.total = respone.result.total;
      this.online = respone.result.online;
      this.busy = respone.result.busy;
      this.offline = respone.result.offline;
    });
  }

  //#region Agents
  loadPerformentMonitorTotal() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany,
      idUser: this.selectedAgent
    }

    this.agentService.agentPerformentMonitorTotal(request).subscribe((respone) => {
      this.performentAgentsTotalModel = respone.result;
    });
  }

  loadPerformentMonitorAgents(_type: number) {
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

      this.listConversationAgents.forEach((element) => {
        this.listAgent.push({name: element.agent, value: element.idUser});
      });
    });
  }
  //#endregion

  //#region Group
  loadPerformentMonitorGroupTotal() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany,
      idUser: this.selectedGroup
    }

    this.agentService.groupPerformentMonitorTotal(request).subscribe((respone) => {
      this.performentGroupTotalModel = respone.result;
    });
  }

  loadPerformentMonitorGroup(_type: number) {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany,
      type: _type,
      idUser: this.selectedGroup
    }

    this.agentService.groupPerformentMonitor(request).subscribe((respone) => {
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

      this.chartOptionsGroup.xAxis = {
        categories: respone.result.label,
        crosshair: true
      }

      this.chartOptionsGroup.series! = [
        {
          type: 'column',
          name: nameChart,
          data: respone.result.data
        }
      ]

      this.updateGroupFlag = true;
    });
  }

  loadListConversationGroup() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany
    }

    this.agentService.groupTopConversation(request).subscribe((respone) => {
      this.listConversationGroups = respone.result;

      this.listConversationGroups.forEach((element) => {
        this.listGroup.push({name: element.agent, value: element.idUser});
      });
    });
  }
  //#endregion

  onChangePerformance(event: any, action: number) {
    //action: 1:Agent; 2: Group

    let index = event.index + 1;

    if (action == 1)
      this.loadPerformentMonitorAgents(index);
    else
      this.loadPerformentMonitorGroup(index);
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
