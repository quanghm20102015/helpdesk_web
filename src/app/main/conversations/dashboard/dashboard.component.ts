import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as $ from 'jquery';
import { EmailInfoService } from '../../../service/emailInfo.service';
import { StatusService } from '../../../service/status.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';

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

  idInterval: any;
  idCompany: any;
  constructor(private emailInfoService: EmailInfoService,
    private statusService: StatusService,
    private userInfoStorageService: UserInfoStorageService) { }

  ngOnInit(): void {
    this.idCompany = this.userInfoStorageService.getCompanyId()
    this.loadListEmail();
    this.loadStatus();
    this.idInterval = setInterval(() => {
      this.loadListEmail();
    }, 5000);
    this.messenger = this.signature
    // this.listMessenger.push(this.listMessenger[1])
    // this.listMessenger.push(this.listMessenger[1])
    // this.listMessenger.push(this.listMessenger[1])
    // this.listMessenger.push(this.listMessenger[1])
    // this.listMessenger.push(this.listMessenger[1])
    // this.listMessenger.push(this.listMessenger[1])
    // this.listMessenger.push(this.listMessenger[1])

  }

  loadStatus(){
    this.statusService.getAll().subscribe((result) => {
      this.listStatus = result;
    });
  }

  ngOnDestroy() {
    if (this.idInterval) {
      clearInterval(this.idInterval);
    }
  }
  
  loadListEmail() {
    this.emailInfoService.getAll().subscribe((result) => {
      this.listChat = result;
      this.listChat.forEach((item) => {
        item['dateTime'] = new Date(item.date)
      })

    });
  }

  subject: any = ''
  readonly: boolean = true
  scrollDemo: any
  Editor: any = ClassicEditor

  inputSearch: string = ''
  messenger: string = ''
  filterStatus: number = 0
  signature: string = ''

  listStatus: Status[] = [
  ]

  listChat: any[] = [
  ]

  listSelectChat: any[] = []

  listMessenger: any[] = [
  ]

  onSelectChat(event: any) {
    console.log(event)
  }

  uploadedFiles: any = []
  onUpload(event: any) {
    console.log(event.target.files)
    for (let file of event.target.files) {
      this.uploadedFiles.push(file);
    }
  }

  remoteFile(item: any) {

  }

  sendMessenger() {
    let request = {
      to: this.mailDetails.from,
      cc: '',
      bcc: '',
      subject: this.mailDetails.subject,
      body: this.messenger,
      idCompany: this.idCompany
    }
    
    this.emailInfoService.SendMail(request).subscribe((result) => {
      if(result.status == 1){
        //thành công
      }
      else{
        //thất bại
      }
    });
    // let request = { id: 1, messenger: this.messenger, dateTime: new Date() }
    // this.listMessenger.push(request)
    // this.messenger = this.signature
  }

  mailDetails: any;
  viewMail: boolean = false
  detailMail(item: any) {
    this.mailDetails = item;
    console.log(this.listSelectChat)
    this.listMessenger = [];
    this.viewMail = true;
    this.subject = item.subject
    this.listMessenger.push({
      id: item.id,
      messenger: item.textBody, 
      dateTime: new Date()
    })
  }
}
