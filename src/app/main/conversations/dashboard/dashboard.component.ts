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
    { inbox: '1', name: 'Phạm Minh', lastChat: 'Rất vui được gặp bạn', sendDate: '10:34 20/04/2023', status: 1 },
    { inbox: '2', name: 'DungXT', lastChat: 'hello', sendDate: '10:34 20/04/2023', status: 1 },
    { inbox: '3', name: 'Phạm Minh', lastChat: 'Rất vui được gặp bạn', sendDate: '10:34 20/04/2023', status: 1 }
  ]

  listSelectChat: any[] = []

  listContent: any[] = [
    { content: 'nội dung email' },
    { content: 'nội dung email' },
  ]

  onSelectChat(event: any){
    console.log(event)
  }

}
