import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';

import { ReportsAgentService } from 'src/app/service/reports-agent.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';
import { OverviewService } from 'src/app/service/overview.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})

export class AgentComponent implements OnInit {
  private optionDateSubscription$?: Subscription;

  listConversationAgents: any = [
    {agent: 'Chris Hoang', mail: 'chrishoang@cavn.vn', open: 1, unattended: 43},
    {agent: 'Chris Hoang', mail: 'chrishoang@cavn.vn', open: 2, unattended: 59},
    {agent: 'Chris Hoang', mail: 'chrishoang@cavn.vn', open: 3, unattended: 88},
    {agent: 'Chris Hoang', mail: 'chrishoang@cavn.vn', open: 4, unattended: 66},
    {agent: 'Chris Hoang', mail: 'chrishoang@cavn.vn', open: 5, unattended: 55},
    {agent: 'Chris Hoang', mail: 'chrishoang@cavn.vn', open: 6, unattended: 44},
  ]

  listConversationGroups: any = [
    {groupName: 'Group 1', member: 1, conversation: 43},
    {groupName: 'Group 2', member: 2, conversation: 5},
    {groupName: 'Group 3', member: 3, conversation: 88},
    {groupName: 'Group 4', member: 4, conversation: 66},
    {groupName: 'Group 5', member: 5, conversation: 55},
    {groupName: 'Group 6', member: 6, conversation: 44},
  ]

  listAgent: any = [
    {name: 'Christ Hoang', value: 1},
    {name: 'Christ Hoang', value: 2},
    {name: 'Christ Hoang', value: 3},
  ]

  selectedAgent: any = null

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

  constructor(
    private agentService: ReportsAgentService,
    private userInfoStorageService: UserInfoStorageService,
    private overviewService: OverviewService
  ) { }

  ngOnInit(): void {
    More(Highcharts);

    this.loadChartConversations();

    setTimeout(() => {
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
          categories: ['28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22'],
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
          name: 'Test',
          type: 'column',
          color: '#3A69DB',
          tooltip: {
            valueSuffix: ''
          },
          data: [49, 71.5, 106.4, 129.2, 76.0, 135.6, 56.6]
        }
      ]
    };
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
          categories: ['28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22'],
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
          name: 'Test',
          type: 'column',
          color: '#3A69DB',
          tooltip: {
            valueSuffix: ''
          },
          data: [34, 55, 66, 14, 76, 35.6, 56.6]
        }
      ]
    };
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
          categories: ['28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22'],
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
          name: 'Test',
          type: 'column',
          color: '#3A69DB',
          tooltip: {
            valueSuffix: ''
          },
          data: [55, 44, 87, 43, 44, 56, 6.6]
        }
      ]
    };
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
          categories: ['28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22'],
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
          name: 'Test',
          type: 'column',
          color: '#3A69DB',
          tooltip: {
            valueSuffix: ''
          },
          data: [88, 44, 66, 14, 76, 55.6, 77.6]
        }
      ]
    };
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
          categories: ['28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22'],
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
          name: 'Test',
          type: 'column',
          color: '#3A69DB',
          tooltip: {
            valueSuffix: ''
          },
          data: [66, 55, 77, 88, 77, 99.6, 88.6]
        }
      ]
    };
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
          categories: ['28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22', '28 Dec,22'],
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
          name: 'Test',
          type: 'column',
          color: '#3A69DB',
          tooltip: {
            valueSuffix: ''
          },
          data: [34, 55, 66, 14, 76, 35.6, 56.6]
        }
      ]
    };
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
