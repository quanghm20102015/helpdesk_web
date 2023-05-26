import { Component, OnInit } from '@angular/core';

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

  selectedFilter: any[] = []

  textSearch: string = ''

  constructor() { }

  ngOnInit(): void {

  }

  onKeyupSearch() {

  }

  onChangeSelectFilter() {

  }

}
