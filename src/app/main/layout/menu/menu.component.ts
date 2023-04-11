import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.router.url);
    this.listRouterTab.forEach(item => {
      this.url
      console.log(this.url.includes(item.uri))
      if (this.url.includes(item.uri)) {
        this.tab = item.tab
      }
    })
  }

  url: string = this.router.url
  tab: number = 0
  listRouterTab: any[] = [
    { tab: 1, uri: '/main/conversations' },
    { tab: 2, uri: '/main/contacts' },
    { tab: 3, uri: '/main/reports' },
    { tab: 4, uri: '/main/campaigns' },
    { tab: 5, uri: '/main/settings' },
  ]

  listLabel: any = [
    { name: 'Label 01', id: 156 },
    { name: 'Label 02', id: 1680 },
    { name: 'Label 03', id: 430 },
  ]

  listInboxes: any = [
    { name: 'Web 01', id: 200 },
    { name: 'Page 2', id: 329 },
  ]

  setTab(tab: any){
    this.tab = tab
  }
}
