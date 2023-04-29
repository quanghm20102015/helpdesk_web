import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfigMailService } from '../../../service/configMail.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';

@Component({
  selector: 'app-st-inboxes',
  templateUrl: './st-inboxes.component.html',
  styleUrls: ['./st-inboxes.component.css']
})
export class StInboxesComponent implements OnInit {

  listData: any = [
    // { name: 'Email sale', type: 'Email' },
    // { name: 'Email customer', type: 'Email' },
  ]
  idCompany: any;
  constructor(
    private confirmationService: ConfirmationService, 
    private configMailService: ConfigMailService,
    private userInfoStorageService: UserInfoStorageService
    ) { }

  ngOnInit(): void {
    this.idCompany = this.userInfoStorageService.getCompanyId()
    this.loadListConfigMail()
  }

  loadListConfigMail(){    
    this.configMailService.GetByIdCompany(this.idCompany).subscribe((result) => {
      this.listData = result;
    });
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

  edit(item: any){

  }
}
