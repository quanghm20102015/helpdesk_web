import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';

import { ReportsCsatService } from 'src/app/service/reports-csat.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';
import { OverviewService } from 'src/app/service/overview.service';

@Component({
  selector: 'app-csat',
  templateUrl: './csat.component.html',
  styleUrls: ['./csat.component.css']
})
export class CsatComponent implements OnInit {
  private optionDateSubscription$?: Subscription;

  listResponseDistribution: any = [
    {name: '#Label1', className: 'bg-purple-500', distribution: 'n%', conversation: 'nnnn'},
    {name: '#Label2', className: 'bg-primary-500', distribution: 'n%', conversation: 'nnn'},
    {name: '#Label3', className: 'bg-green-500', distribution: 'n%', conversation: 'nnn'},
    {name: '#Label4', className: 'bg-green-100', distribution: 'n%', conversation: 'nn'},
    {name: '#Label5', className: 'bg-yellow-500', distribution: 'n%', conversation: 'nn'},
    {name: '#Other', className: 'bg-gray-500', distribution: 'n%', conversation: 'nnnn'},
  ]

  listResponseDetails: any = [
    {id: 1, contact: 'Thu Hong Nguyen', assignedagent: 'Chrish Hoang', rating: 'Very good', feedback: 'Lorem ipsum dolor sit amet consectetur'},
    {id: 2, contact: 'Thu Hong Nguyen', assignedagent: 'Chrish Hoang', rating: 'Very good', feedback: 'Lorem ipsum dolor sit amet consectetur'},
    {id: 3, contact: 'Thu Hong Nguyen', assignedagent: 'Chrish Hoang', rating: 'Very good', feedback: 'Lorem ipsum dolor sit amet consectetur'},
    {id: 4, contact: 'Thu Hong Nguyen', assignedagent: 'Chrish Hoang', rating: 'Very good', feedback: 'Lorem ipsum dolor sit amet consectetur'},
    {id: 5, contact: 'Thu Hong Nguyen', assignedagent: 'Chrish Hoang', rating: 'Very good', feedback: 'Lorem ipsum dolor sit amet consectetur'},
    {id: 6, contact: 'Thu Hong Nguyen', assignedagent: 'Chrish Hoang', rating: 'Very good', feedback: 'Lorem ipsum dolor sit amet consectetur'},
  ]


  selectedFilter: any[] = []
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

  chartOptionsDistribution: Highcharts.Options = {
    chart: {
      plotBackgroundColor: undefined,
      plotBorderWidth: 0,
      plotShadow: false,
      style: {
        fontSize: '14px',
        fontFamily: 'Inter'
      }
    },
    title: undefined,
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    subtitle: {
      useHTML: true,
      text: this.getSubtitle(),
      floating: true,
      align: 'center',
      verticalAlign: 'middle',
      style: {
        textTransform: 'capitalize',
        textAlign: 'center',
      },
      y: 0
    },
    tooltip: {
      valueDecimals: 2,
      valueSuffix: ' TWh'
    },
    colors: ['#FCE700', '#F8C4B4', '#f6e1ea', '#B8E8FC', '#BCE29E'],
    legend: {
      floating: false,
      title: {
        text: '',
        style: {
          fontWeight: 'bold'
        }
      },
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: -180,
        center: ['50%', '50%'],
        size: '100%',
        showInLegend: false
      }
    },
    series: [
      {
        type: 'pie',
        name: 'Brands',
        innerSize: '70%',
        dataLabels: {
            enabled: false
        },
        data: [{
            name: 'Chrome',
            y: 61.41
        }, {
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        },
        ]
      }
    ]
  }

  constructor(
    private csatService: ReportsCsatService,
    private userInfoStorageService: UserInfoStorageService,
    private overviewService: OverviewService
  ) { }

  ngOnInit(): void {
    More(Highcharts);

    this.loadChartConversations();

    this.optionDateSubscription$ = this.overviewService.optionDateSubject$
    .subscribe((response: any) => {
      console.log(response);

      this.fromDate = response.fromDate;
      this.toDate = response.toDate;
    });
  }

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
    return `<span class="chart-total">Total response</span>
        <br>
        <span class="chart-total-number">
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
