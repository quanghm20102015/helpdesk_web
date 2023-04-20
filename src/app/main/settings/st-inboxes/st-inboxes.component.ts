import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-st-inboxes',
  templateUrl: './st-inboxes.component.html',
  styleUrls: ['./st-inboxes.component.css']
})
export class StInboxesComponent implements OnInit {

  listData: any = [
    { name: 'Email sale', type: 'Email' },
    { name: 'Email customer', type: 'Email' },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
