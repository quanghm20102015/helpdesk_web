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

  listConversationAgents: any[] = []

  listConversationGroups: any = [
    {groupName: 'Group 1', member: 1, conversation: 43},
    {groupName: 'Group 2', member: 2, conversation: 5},
    {groupName: 'Group 3', member: 3, conversation: 88},
    {groupName: 'Group 4', member: 4, conversation: 66},
    {groupName: 'Group 5', member: 5, conversation: 55},
    {groupName: 'Group 6', member: 6, conversation: 44},
  ]

  listAgent: any = []

  selectedAgent: any = 0

  listFilter: any = [
    {name: '#Label1', value: 1},
    {name: '#Label2', value: 2},
    {name: '#Label3', value: 3},
    {name: '#Label4', value: 4}
  ]

  selectedFilter: any[] = [];
  textSearch: string = '';
  idCompany: any;
  fromDate: any;
  toDate: any;
  datePipe = new DatePipe('en-US');

  Highcharts: typeof Highcharts = Highcharts;

  updateConversationsFlag = false;
  updateIncomingMessagesFlag = false;
  updateOutgoingMessagesFlag = false;
  updateResolvedCountFlag = false;
  updateFirstResponseTimeFlag = false;
  updateResolvedTimeFlag = false;

  chartOptionsConversations: any;
  chartOptionsIncomingMessages: any;
  chartOptionsOutgoingMessages: any;
  chartOptionsResolvedCount: any;
  chartOptionsFirstResponseTime: any;
  chartOptionsResolvedTime: any;

  performentTotalModel!: PerformentTotalModel;

  constructor(
    private agentService: ReportsAgentService,
    private userInfoStorageService: UserInfoStorageService,
    private overviewService: OverviewService
  ) { }

  ngOnInit(): void {
    More(Highcharts);

    this.loadChartConversations();

    setTimeout(() => {
      this.loadListConversationAgents();
      this.loadPerformentMonitorTotal();
      this.loadChartConversations();

      this.updateConversationsFlag = true;
    }, 500);

    this.optionDateSubscription$ = this.overviewService.optionDateSubject$
    .subscribe((response: any) => {
      console.log(response);

      this.fromDate = response.fromDate;
      this.toDate = response.toDate;
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

    this.agentService.performentMonitorAgentTotal(request).subscribe((respone) => {
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

    this.agentService.getPerformanceMonitorAgent(request).subscribe((respone) => {
      console.log(respone);

      if (_type == 1) {
        this.chartOptionsConversations.xAxis = {
          categories: respone.result.label,
          crosshair: true
        }

        this.chartOptionsConversations.series! = [
          {
            type: 'column',
            data: respone.result.data
          }
        ]

        this.updateConversationsFlag = true;
      }
      else if (_type == 2) {
        this.chartOptionsIncomingMessages.xAxis = {
          categories: respone.result.label,
          crosshair: true
        }

        this.chartOptionsIncomingMessages.series! = [
          {
            type: 'column',
            data: respone.result.data
          }
        ]

        this.updateIncomingMessagesFlag = true;
      }
      else if (_type == 3) {
        this.chartOptionsOutgoingMessages.xAxis = {
          categories: respone.result.label,
          crosshair: true
        }

        this.chartOptionsOutgoingMessages.series! = [
          {
            type: 'column',
            data: respone.result.data
          }
        ]

        this.updateOutgoingMessagesFlag = true;
      }
      else if (_type == 4) {
        this.chartOptionsResolvedCount.xAxis = {
          categories: respone.result.label,
          crosshair: true
        }

        this.chartOptionsResolvedCount.series! = [
          {
            type: 'column',
            data: respone.result.data
          }
        ]

        this.updateResolvedCountFlag = true;
      }
      else if (_type == 5) {
        this.chartOptionsFirstResponseTime.xAxis = {
          categories: respone.result.label,
          crosshair: true
        }

        this.chartOptionsFirstResponseTime.series! = [
          {
            type: 'column',
            data: respone.result.data
          }
        ]

        this.updateFirstResponseTimeFlag = true;
      }
      else if (_type == 6) {
        this.chartOptionsResolvedTime.xAxis = {
          categories: respone.result.label,
          crosshair: true
        }

        this.chartOptionsResolvedTime.series! = [
          {
            type: 'column',
            data: respone.result.data
          }
        ]

        this.updateResolvedTimeFlag = true;
      }
    });
  }

  loadListConversationAgents() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany
    }

    this.agentService.topConversationAgent(request).subscribe((respone) => {
      this.listConversationAgents = respone.result;

      this.listConversationAgents.forEach((element) => {
        this.listAgent.push({name: element.agent, value: element.idUser});
      });
    });
  }

  ngAfterViewInit() {}

  onChangePerformance(event: any) {
    console.log(event);
    if (event.index == 0)
      this.loadChartConversations();
    else if (event.index == 1)
      this.loadChartIncomingMessages();
    else if (event.index == 2)
      this.loadChartOutgoingMessages();
    else if (event.index == 3)
      this.loadChartResolvedCount();
    else if (event.index == 4)
      this.loadChartFirstResponseTime();
    else if (event.index == 5)
      this.loadChartResolvedTime();
  }

  getSubtitle() {
    const totalNumber: number = 1900
    return `<span style="font-size: 1.5rem">Total use time</span>
        <br>
        <span style="font-size: 1.5rem; text-aign:center">
            <b> ${totalNumber}</b>
        </span>`;
  }

  //#region Load Performance Monitoring
  loadChartConversations() {
    this.chartOptionsConversations = {
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
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Conversations',
          type: 'column',
          color: '#3A69DB',
          tooltip: {
            valueSuffix: ''
          },
          data: []
        }
      ]
    };

    this.loadPerformentMonitor(1);
  }

  loadChartIncomingMessages() {
    this.chartOptionsIncomingMessages = {
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
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Incoming Messages',
          type: 'column',
          color: '#3A69DB',
          tooltip: {
            valueSuffix: ''
          },
          data: []
        }
      ]
    };

    this.loadPerformentMonitor(2);
  }

  loadChartOutgoingMessages() {
    this.chartOptionsOutgoingMessages = {
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
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Outgoing Messages',
          type: 'column',
          color: '#3A69DB',
          tooltip: {
            valueSuffix: ''
          },
          data: []
        }
      ]
    };

    this.loadPerformentMonitor(3);
  }

  loadChartResolvedCount() {
    this.chartOptionsResolvedCount = {
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
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Resolved Count',
          type: 'column',
          color: '#3A69DB',
          tooltip: {
            valueSuffix: ''
          },
          data: []
        }
      ]
    };

    this.loadPerformentMonitor(4);
  }

  loadChartFirstResponseTime() {
    this.chartOptionsFirstResponseTime = {
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
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'First Response Time',
          type: 'column',
          color: '#3A69DB',
          tooltip: {
            valueSuffix: ''
          },
          data: []
        }
      ]
    };

    this.loadPerformentMonitor(5);
  }

  loadChartResolvedTime() {
    this.chartOptionsResolvedTime = {
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
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Resolved Time',
          type: 'column',
          color: '#3A69DB',
          tooltip: {
            valueSuffix: ''
          },
          data: []
        }
      ]
    };

    this.loadPerformentMonitor(6);
  }
  //#endregion
  onKeyupSearch() {

  }

  onChangeSelectFilter() {

  }

  ngOnDestroy(): void {
    if(this.optionDateSubscription$)
      this.optionDateSubscription$.unsubscribe();
  }

}
