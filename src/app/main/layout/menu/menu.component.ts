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

  listMainMenu: any = [
    {routerLink: "/main/dashboard",title: "CONVERSATIONS", icon: "pi-comments" },
    {routerLink: "/main/contacts",title: "CONTACTS", icon: "pi-users" },
    {routerLink: "/main/reports",title: "REPORTS", icon: "pi-chart-pie" },
    {routerLink: "/main/campaigns",title: "CAMPAIGNS", icon: "pi-megaphone" },
    {routerLink: "/main/account",title: "SETTINGS", icon: "pi-cog" },
  ];

}
