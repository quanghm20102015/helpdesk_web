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
        data: [49, 71.5, 106.4, 129.2, 76.0, 135.6, 56.6]
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
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      // categories:[
      //   { id: 1, labels: 'Monday' },
      //   { id: 2, labels: 'Tuesday' },
      //   { id: 3, labels: 'Wednesday' },
      //   { id: 4, labels: 'Thursday' },
      //   { id: 5, labels: 'Friday' },
      //   { id: 6, labels: 'Saturday' },
      //   { id: 7, labels: 'Sunday' },
      // ],
      title: {
        text: undefined
      },
      labels: {
        formatter: function () {
          return '<b class="chart-yAxis-label">' + this.value + '</b> <br>' + '<span class="block font-medium">Apr 24,2023</span>';
        }
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
        return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
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
        data: [
          [0, 0, 0], [0, 1, 19], [0, 2, 86], [0, 3, 24], [0, 4, 67], [0, 5, 24], [0, 6, 64],
          [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 77], [1, 4, 48], [1, 5, 34], [1, 6, 67],
          [2, 0, 0], [2, 1, 0], [2, 2, 66], [2, 3, 64], [2, 4, 52], [2, 5, 23], [2, 6, 54],
          [3, 0, 0], [3, 1, 0], [3, 2, 44], [3, 3, 19], [3, 4, 16], [3, 5, 65], [3, 6, 45],
          [4, 0, 0], [4, 1, 0], [4, 2, 86], [4, 3, 77], [4, 4, 55], [4, 5, 24], [4, 6, 34],
          [5, 0, 88], [5, 1, 0], [5, 2, 12], [5, 3, 64], [5, 4, 55], [5, 5, 54], [5, 6, 12],
          [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [6, 5, 45], [6, 6, 34],
          [7, 0, 31], [7, 1, 17], [7, 2, 82], [7, 3, 32], [7, 4, 30], [7, 5, 34], [7, 6, 44],
          [8, 0, 85], [8, 1, 97], [8, 2, 66], [8, 3, 64], [8, 4, 84], [8, 5, 45], [8, 6, 76],
          [9, 0, 47], [9, 1, 66], [9, 2, 31], [9, 3, 48], [9, 4, 91], [9, 5, 67], [9, 6, 34],
          [10, 0, 33], [10, 1, 66], [10, 2, 31], [10, 3, 48], [10, 4, 91], [10, 5, 24], [10, 6, 65],
          [11, 0, 55], [11, 1, 66], [11, 2, 45], [11, 3, 88], [11, 4, 23], [11, 5, 44], [11, 6, 45],
          [12, 0, 47], [12, 1, 33], [12, 2, 34], [12, 3, 87], [12, 4, 45], [12, 5, 66], [12, 6, 67],
          [13, 0, 55], [13, 1, 66], [13, 2, 43], [13, 3, 48], [13, 4, 65], [13, 5, 55], [13, 6, 67],
          [14, 0, 47], [14, 1, 88], [14, 2, 76], [14, 3, 67], [14, 4, 34], [14, 5, 24], [14, 6, 31],
          [15, 0, 66], [15, 1, 86], [15, 2, 66], [15, 3, 53], [15, 4, 32], [15, 5, 55], [15, 6, 12],
          [16, 0, 57], [16, 1, 77], [16, 2, 34], [16, 3, 48], [16, 4, 23], [16, 5, 26], [16, 6, 11],
          [17, 0, 88], [17, 1, 66], [17, 2, 44], [17, 3, 34], [17, 4, 14], [17, 5, 55], [17, 6, 67],
          [18, 0, 47], [18, 1, 66], [18, 2, 54], [18, 3, 48], [18, 4, 45], [18, 5, 44], [18, 6, 22],
          [19, 0, 47], [19, 1, 43], [19, 2, 23], [19, 3, 23], [19, 4, 65], [19, 5, 86], [19, 6, 11],
          [20, 0, 12], [20, 1, 36], [20, 2, 34], [20, 3, 48], [20, 4, 34], [20, 5, 66], [20, 6, 33],
          [21, 0, 33], [21, 1, 66], [21, 2, 86], [21, 3, 96], [21, 4, 23], [21, 5, 55], [21, 6, 23],
          [22, 0, 33], [22, 1, 36], [22, 2, 34], [22, 3, 56], [22, 4, 45], [22, 5, 23], [22, 6, 45],
          [23, 0, 26], [23, 1, 66], [23, 2, 67], [23, 3, 34], [23, 4, 24], [23, 5, 34], [23, 6, 34]
        ],
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
      this.loadLabelCompany();
      this.loadLabelDistribution();
      this.loadPerformentMonitor(1);
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
