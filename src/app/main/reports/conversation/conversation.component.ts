import { Input, SimpleChanges, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

import * as Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
import HeatmapModule from 'highcharts/modules/heatmap';

import { ReportsConversationService } from 'src/app/service/reports-conversation.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';
import { OverviewService } from 'src/app/service/overview.service';

import { OverViewModel } from '../models/overview-model';
import { PerformentTotalModel } from '../models/performent-total-model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  private optionDateSubscription$?: Subscription;

  listFilter: any = []
  listTrendingLabel: any = []
  listLabelDistribution: any = []

  openedViewModel!: OverViewModel;
  unattendedViewModel!: OverViewModel;
  unassignedViewModel!: OverViewModel;
  resolvedViewModel!: OverViewModel;

  performentTotalModel!: PerformentTotalModel;

  selectedFilter: any[] = [];
  listLabelFilter: any = []

  textSearch: string = '';
  idCompany: any;
  fromDate: any;
  toDate: any;
  datePipe = new DatePipe('en-US');

  totalPie: number = 0;

  Highcharts: typeof Highcharts = Highcharts;

  updateFlag = false;

  updateTrafficFlag = false;
  updateDistributionFlag = false;

  chartOptions: Highcharts.Options = {
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

  chartOptionsTraffic: Highcharts.Options = {
    chart: {
      type: 'heatmap',
      style: {
        fontFamily: 'Inter',
        fontSize: '14px'
      },
      events:{
        render:function(){
          setTimeout(() => {
            this.reflow()
          }, 200);
        }
      },
      plotBorderWidth: 0
    },
    title: undefined,
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    xAxis: {
      categories: [
        '0-1',
        '1-2',
        '2-3',
        '3-4',
        '4-5',
        '5-6',
        '6-7',
        '7-8',
        '8-9',
        '9-10',
        '10-11',
        '11-12',
        '12-13',
        '13-14',
        '14-15',
        '15-16',
        '16-17',
        '17-18',
        '18-19',
        '19-20',
        '20-21',
        '21-22',
        '22-23',
        '23-24'
      ],
      labels: {
        formatter: function () {
          return '<b class="chart-yAxis-label">' + this.value + '</b>';
        }
      },
    },
    yAxis: {
      categories: [],
      title: {
        text: undefined
      },
      reversed: true
    },
    colorAxis: {
      min: 0,
      minColor: '#F6F7F9',
      maxColor: '#3A69DB'
    },

    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 280
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> <br><b>' +
          this.point.value + '</b> items on <br><b>Conversation Traffic</b>';
      },
      enabled: true
    },
    series: [
      {
        type: 'heatmap',
        name: 'Conversation Traffic',
        borderWidth: 0,
        borderRadius: 10,
        colsize: 0.5,
        rowsize: 0.7,
        dataLabels: {
          enabled: false,
          color: '#000000'
        },
        data: [],
      }
    ],
  }

  chartOptionsDistribution: Highcharts.Options = {
    chart: {
      plotBackgroundColor: undefined,
      plotBorderWidth: 0,
      plotShadow: false
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
      valueSuffix: ' '
    },
    colors: [],
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
    // plotOptions: {
    //   pie: {
    //     allowPointSelect: false,
    //     cursor: 'pointer',
    //     dataLabels: {
    //       enabled: true,
    //       distance: -50,
    //       style: {
    //         fontWeight: 'bold',
    //         color: 'white'
    //       }
    //     },
    //     startAngle: -90,
    //     endAngle: -180,
    //     center: ['50%', '50%'],
    //     size: '100%',
    //     showInLegend: false
    //   }
    // },
    series: [
      {
        type: 'pie',
        name: 'Label distribution',
        innerSize: '70%',
        dataLabels: {
          enabled: false
        },
        data: []
      }
    ]
  }

  constructor(
    private conversationService: ReportsConversationService,
    private userInfoStorageService: UserInfoStorageService,
    private overviewService: OverviewService
  ) { }

  ngOnInit(): void {
    More(Highcharts);
    HeatmapModule(Highcharts);

    this.optionDateSubscription$ = this.overviewService.optionDateSubject$
    .subscribe((response: any) => {
      this.fromDate = response.fromDate;
      this.toDate = response.toDate;

      this.loadOverview();

      this.loadPerformentMonitorTotal();
      this.loadPerformentMonitor(1);

      this.loadConversationTraffic();

      this.loadLabelCompany();
      this.loadLabelDistribution();
    });
  }

  loadOverview() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany
    }

    this.conversationService.getOverview(request).subscribe((respone) => {
      this.openedViewModel = respone.result.opened;
      this.unattendedViewModel = respone.result.unattended;
      this.unassignedViewModel = respone.result.unassigned;
      this.resolvedViewModel = respone.result.resolved;
    });
  }

  loadPerformentMonitorTotal() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany
    }

    this.conversationService.getPerformentMonitorTotal(request).subscribe((respone) => {
      this.performentTotalModel = respone.result;
    });
  }

  loadPerformentMonitor(_type: number) {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany,
      type: _type
    }

    this.conversationService.getPerformanceMonitor(request).subscribe((respone) => {
      let nameChart = '';

      if (_type == 1)
        nameChart = 'Conversations'
      else if (_type == 2)
        nameChart = 'Incoming Messages'
      else if (_type == 3)
        nameChart = 'Outgoing Messages'
      else if (_type == 4)
        nameChart = 'Resolved Count'
      else if (_type == 5)
        nameChart = 'First Response Time'
      else if (_type == 6)
        nameChart = 'Resolved Time'

      this.chartOptions.xAxis = {
        categories: respone.result.label,
        crosshair: true
      }

      this.chartOptions.series! = [
        {
          type: 'column',
          name: nameChart,
          data: respone.result.data
        }
      ]

      this.updateFlag = true;
    });
  }

  loadConversationTraffic() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany
    }

    this.conversationService.getConversationTraffic(request).subscribe((respone) => {
      this.chartOptionsTraffic.yAxis! = {
        categories: respone.categories.map((item: { id: any; }) => item.id),
        title: {
          text: undefined
        },
        labels: {
          formatter: function () {
            const context = respone.categories.filter((item: { id: any; }) => item.id === this.value)[0];
            return '<b class="chart-yAxis-label">' + context.days + '</b> <br>' + '<span class="block font-medium">' + context.labels + '</span>';
          }
        },
        reversed: true
      }

      this.chartOptionsTraffic.series! = [
        {
          type: 'heatmap',
          name: 'Conversation Traffic',
          borderWidth: 0,
          borderRadius: 10,
          colsize: 0.5,
          rowsize: 0.7,
          dataLabels: {
            enabled: false,
            color: '#000000'
          },
          data: respone.data
        }
      ]

      this.updateTrafficFlag = true;
    });
  }

  loadLabelCompany() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    this.conversationService.GetByIdCompany(this.idCompany).subscribe((respone) => {
      this.listFilter = respone
    });
  }

  loadLabelDistribution() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany,
      idLabel: this.listLabelFilter
    }

    this.conversationService.getLabelDistribution(request).subscribe((respone) => {
      this.totalPie = respone.total;
      this.listTrendingLabel = respone.topTrending
      this.listLabelDistribution = respone.resultTable

      this.chartOptionsDistribution.subtitle = {
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
      }

      this.chartOptionsDistribution.colors = respone.colors;

      this.chartOptionsDistribution.series! = [
        {
          type: 'pie',
          data: respone.result
        }
      ]

      this.updateDistributionFlag = true;
    });
  }

  onChangePerformance(event: any) {
    let index = event.index + 1;

    this.loadPerformentMonitor(index);
  }

  getSubtitle() {
    return `<span class="chart-total">Total use time</span>
          <br>
          <h2 class="chart-total-number">
              <b> ${this.totalPie}</b>
          </h2>`;
  }

  onKeyupSearch() {

  }

  onChangeSelectFilter() {
    this.listLabelFilter = []
    this.selectedFilter.forEach((x: { id: any; }) => {
      this.listLabelFilter.push(x.id)
    })

    this.loadLabelDistribution();
  }

  ngOnDestroy(): void {
    if(this.optionDateSubscription$)
      this.optionDateSubscription$.unsubscribe();
  }
}
