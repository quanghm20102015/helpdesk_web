import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
import HeatmapModule from 'highcharts/modules/heatmap';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  listTrendingLabel: any = [
    {name: '#Label1', usetime: 1, conversation: 43},
    {name: '#Label2', usetime: 2, conversation: 5},
    {name: '#Label3', usetime: 3, conversation: 88},
    {name: '#Label4', usetime: 4, conversation: 66},
    {name: '#Label5', usetime: 5, conversation: 55},
    {name: '#Label6', usetime: 6, conversation: 44},
  ]

  listFilter: any = [
    {name: '#Label1', value: 1},
    {name: '#Label2', value: 2},
    {name: '#Label3', value: 3},
    {name: '#Label4', value: 4}
  ]

  listLabelDistribution: any = [
    {name: '#Label1', className: 'bg-purple-500', distribution: 'n%', conversation: 'nnnn'},
    {name: '#Label2', className: 'bg-primary-500', distribution: 'n%', conversation: 'nnn'},
    {name: '#Label3', className: 'bg-green-500', distribution: 'n%', conversation: 'nnn'},
    {name: '#Label4', className: 'bg-green-100', distribution: 'n%', conversation: 'nn'},
    {name: '#Label5', className: 'bg-yellow-500', distribution: 'n%', conversation: 'nn'},
    {name: '#Other', className: 'bg-gray-500', distribution: 'n%', conversation: 'nnnn'},
  ]

  selectedFilter: any[] = []

  textSearch: string = ''

  Highcharts: typeof Highcharts = Highcharts;

  updateConversationsFlag = false;
  updateIncomingMessagesFlag = false;
  updateOutgoingMessagesFlag = false;
  updateResolvedCountFlag = false;
  updateFirstResponseTimeFlag = false;
  updateResolvedTimeFlag = false;
  updateTrafficFlag = false;

  chartOptionsConversations: any;
  chartOptionsIncomingMessages: any;
  chartOptionsOutgoingMessages: any;
  chartOptionsResolvedCount: any;
  chartOptionsFirstResponseTime: any;
  chartOptionsResolvedTime: any;

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
        // console.log(this.point);
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
        data: [
          {
            name: 'Chrome',
            y: 61.41
          },
          {
            name: 'Internet Explorer',
            y: 11.84
          },
          {
            name: 'Firefox',
            y: 10.85
          },
          {
            name: 'Edge',
            y: 4.67
          },
        ]
      }
    ]
  }

  constructor() { }

  ngOnInit(): void {
    More(Highcharts);
    HeatmapModule(Highcharts);

    this.loadChartConversations();
  }

  onChangePerformance(event: any) {
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
    return `<span class="chart-total">Total use time</span>
        <br>
        <h2 class="chart-total-number">
            <b> ${totalNumber}</b>
        </h2>`;
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

}
