import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OverviewService } from 'src/app/service/overview.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {
  listOptionDate: any = [
    {name: 'Today', value: 1},
    {name: 'Last 7 day', value: 2},
    {name: 'Last 30 day', value: 3},
    {name: 'Last 3 month', value: 4},
    {name: 'Last 6 month', value: 5},
    {name: 'Last year', value: 6},
  ]

  optionDate: any = 2

  listOptionsDashboard!: any[];

  selectedDefault: number =  3;

  datePipe = new DatePipe('en-US');
  fromDate: any;
  toDate: any;

  constructor(
    private overviewService: OverviewService
  ) { }

  ngOnInit(): void {
    this.loadOptionsDashboard();

    let conllapse = $('#btncollapse')
    conllapse.addClass('hide-menu')
  }

  ngAfterViewInit() {
    this.loadDate(2);

    localStorage.setItem('reports-date', '2');
  }

  loadOptionsDashboard() {
    this.listOptionsDashboard = [
      { label: 'Overview', value: 1 },
      { label: 'Agent & Group', value: 2 },
      { label: 'CSAT', value: 3 },
    ];
  }

  loadDate(option: any) {
    const currentDate = new Date();

    this.fromDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.toDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');

    if (option == 1) {
      this.fromDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    }
    else if (option == 2) {
      const newDate = new Date(new Date().setDate(currentDate.getDate() - 7));

      this.fromDate = this.datePipe.transform(newDate, 'yyyy-MM-dd');
    }
    else if (option == 3) {
      const newDate = new Date(new Date().setDate(currentDate.getDate() - 30));

      this.fromDate = this.datePipe.transform(newDate, 'yyyy-MM-dd');
    }
    else if (option == 4) {
      const newDate = new Date(new Date().setMonth(currentDate.getMonth() - 3));

      this.fromDate = this.datePipe.transform(newDate, 'yyyy-MM-dd');
    }
    else if (option == 5) {
      const newDate = new Date(new Date().setMonth(currentDate.getMonth() - 6));

      this.fromDate = this.datePipe.transform(newDate, 'yyyy-MM-dd');
    }
    else if (option == 6) {
      const newDate = new Date(new Date().setFullYear(currentDate.getFullYear() - 1));

      this.fromDate = this.datePipe.transform(newDate, 'yyyy-MM-dd');
    }

    let request = {
      fromDate: this.fromDate,
      toDate: this.toDate
    }

    this.overviewService.changeOptionDate(request);
  }

  onChangeOptionsDashboard(event: any) {
    setTimeout(() => {
      if (localStorage.getItem('reports-date')) {
        this.selectedDefault = parseInt(localStorage.getItem('reports-date')!);
      }

      this.loadDate(this.selectedDefault);
    }, 100);
  }

  onChangeDate(event: any) {
    this.loadDate(event.value);

    localStorage.setItem('reports-date', event.value);
  }

  ngOnDestroy() {
    let conllapse = $('#btncollapse')
    conllapse.removeClass('hide-menu')
  }
}
