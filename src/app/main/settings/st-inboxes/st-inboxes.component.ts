import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

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
  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  confirm() {
    this.confirmationService.confirm({
      header: 'Confirmation delete',
      icon: 'pi pi-exclamation-triangle',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        //Actual logic to perform a confirmation
      }
    });
  }
}
