import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  listRangeDate: any = [
    {name: 'Today', value: 1},
    {name: 'Last 7 day', value: 2},
    {name: 'Last 30 day', value: 3},
    {name: 'Last 4 month', value: 4},
  ]
  rangeDate: any = null
}
