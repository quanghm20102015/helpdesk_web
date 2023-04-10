import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  listLabel: any = [
    {name: 'Label 01',id: 156 },
    {name: 'Label 02',id: 1680 },
    {name: 'Label 03',id: 430 },
  ]

  listInboxes: any = [
    {name: 'Web 01', id: 200 },
    {name: 'Page 2', id: 329 },
  ]

}
