import { Component, OnInit } from '@angular/core';

interface Status {
  code: number,
  name: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  inputSearch: string = ''
  filterStatus: number = 0

  listStatus: Status[] = [
    { code: 1, name: 'Open' },
    { code: 2, name: 'Resolved' },
    { code: 3, name: 'Pending' },
    { code: 4, name: 'Snoozed' },
    { code: 0, name: 'All' },
  ]

  listChat: any[] = [
    {inbox: 'Inbox 01', name: 'Phạm Minh', lastChat: 'Rất vui được gặp bạn', from: '', sendDate:'', status: 1}
  ]

}
