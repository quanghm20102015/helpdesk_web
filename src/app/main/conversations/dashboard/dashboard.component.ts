import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as $ from 'jquery';
import { EmailInfoService } from '../../../service/emailInfo.service';
import { StatusService } from '../../../service/status.service';

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
  constructor(private emailInfoService: EmailInfoService,
    private statusService: StatusService) { }

  ngOnInit(): void {
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
  // this.scrollDemo = document.querySelector("#box-messages");
  // this.scrollDemo.addEventListener("scroll", (event: any) => {
  //   if (this.scrollDemo.scrollHeight - this.scrollDemo.offsetHeight + this.scrollDemo.scrollTop < 1) {
  //     console.log("Scroll end")
  //   }
  // })

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
    // { code: 1, name: 'Open' },
    // { code: 2, name: 'Resolved' },
    // { code: 3, name: 'Pending' },
    // { code: 4, name: 'Snoozed' },
    // { code: 0, name: 'All' },
  ]

  listChat: any[] = [
    // { inbox: '1', name: 'Phạm Minh', lastChat: 'Rất vui được gặp bạn', sendDate: '10:34 20/04/2023', status: 1 },
    // { inbox: '2', name: 'DungXT', lastChat: 'hello', sendDate: '10:34 20/04/2023', status: 1 },
    // { inbox: '3', name: 'Phạm Minh', lastChat: 'Rất vui được gặp bạn', sendDate: '10:34 20/04/2023', status: 1 }
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
    let request = { id: 1, messenger: this.messenger, dateTime: new Date() }
    this.listMessenger.push(request)
    this.messenger = this.signature
  }

  viewMail: boolean = false
  detailMail(item: any) {
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
