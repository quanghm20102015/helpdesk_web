import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';

import { ReportsCsatService } from 'src/app/service/reports-csat.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';
import { OverviewService } from 'src/app/service/overview.service';

import { OverViewModel } from '../models/overview-model';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-csat',
  templateUrl: './csat.component.html',
  styleUrls: ['./csat.component.css']
})
export class CsatComponent implements OnInit {
  private optionDateSubscription$?: Subscription;

  listResponseDistribution: any = []
  listResponseDetails: any = []

  responseRateModel!: OverViewModel;
  totalResponsesModel!: OverViewModel;
  satisfactionScoreModel!: OverViewModel;

  idCompany: any;
  fromDate: any;
  toDate: any;
  datePipe = new DatePipe('en-US');

  totalPie: number = 0;

  totalRecords: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  Highcharts: typeof Highcharts = Highcharts;

  updateDistributionFlag = false;

  chartsDistribution: Highcharts.Options = {
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
        name: 'Response distribution',
        innerSize: '70%',
        dataLabels: {
            enabled: false
        },
        data: []
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

    this.optionDateSubscription$ = this.overviewService.optionDateSubject$
    .subscribe((response: any) => {
      this.fromDate = response.fromDate;
      this.toDate = response.toDate;

      this.loadOverview();
      this.loadLabelDistribution();
      this.loadResponeDetail();
    });
  }

  loadOverview() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany
    }

    this.csatService.getOverview(request).subscribe((respone) => {
      this.responseRateModel = respone.result.responseRate;
      this.totalResponsesModel = respone.result.totalResponses;
      this.satisfactionScoreModel = respone.result.satisfactionScore;
    });
  }

  loadLabelDistribution() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany
    }

    this.csatService.getCsatResponeDistribution(request).subscribe((respone) => {
      this.totalPie = respone.total;
      this.listResponseDistribution = respone.resultTable

      this.chartsDistribution.subtitle = {
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

      this.chartsDistribution.colors = respone.colors;

      this.chartsDistribution.series! = [
        {
          type: 'pie',
          data: respone.result
        }
      ]

      this.updateDistributionFlag = true;
    });
  }

  loadResponeDetail() {
    this.idCompany = +this.userInfoStorageService.getCompanyId()

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      idCompany: this.idCompany,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }

    this.csatService.getResponeDetail(request).subscribe((respone) => {
      this.listResponseDetails = respone.result

      this.totalRecords = respone.total;
    });
  }

  getSubtitle() {
    return `<span class="chart-total">Total use time</span>
          <br>
          <h2 class="chart-total-number">
              <b> ${this.totalPie}</b>
          </h2>`;
  }

  loadDataResponseDetails(event?: LazyLoadEvent) {
    const currentPage = event ? event.first! / event.rows! : 1;

    console.log('currentPage', currentPage);
    this.pageIndex = currentPage;

    if (this.fromDate != undefined && this.toDate != undefined)
      this.loadResponeDetail();
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
