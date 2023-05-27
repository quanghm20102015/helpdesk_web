import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {
  listRangeDate: any = [
    {name: 'Today', value: 1},
    {name: 'Last 7 day', value: 2},
    {name: 'Last 30 day', value: 3},
    {name: 'Last 3 month', value: 4},
    {name: 'Last 6 month', value: 5},
    {name: 'Last year', value: 6},
  ]

  rangeDate: any = null

  listOptionsDashboard!: any[];

  selectedDefault: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.loadOptionsDashboard();

    let conllapse = $('#btncollapse')
    conllapse.addClass('hide-menu')
  }

  loadOptionsDashboard() {
    this.listOptionsDashboard = [
      { label: 'Overview', value: 1 },
      { label: 'Agent & Group', value: 2 },
      { label: 'CSAT', value: 3 },
    ];
  }

  ngOnDestroy() {
    let conllapse = $('#btncollapse')
    conllapse.removeClass('hide-menu')
  }
}
