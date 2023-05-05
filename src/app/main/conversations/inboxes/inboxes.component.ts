import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as $ from 'jquery';
import { EmailInfoService } from '../../../service/emailInfo.service';
import { StatusService } from '../../../service/status.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';
import { MessageService } from 'primeng/api';
import { LabelService } from 'src/app/service/label.service';
import { Table } from 'primeng/table';
import { CsatService } from 'src/app/service/csat.service';
import { AppSettings } from "../../../constants/app-setting";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inboxes',
  templateUrl: './inboxes.component.html',
  styleUrls: ['./inboxes.component.css']
})
export class InboxesComponent implements OnInit {  
    id: number = 0

    @ViewChild('dt') dt: Table | undefined;

  idInterval: any;
  idCompany: any = this.userInfoStorageService.getCompanyId();
  idUser: any = +this.userInfoStorageService.getIdUser();
  constructor(
    private emailInfoService: EmailInfoService,
    private statusService: StatusService,
    private userInfoStorageService: UserInfoStorageService,
    private messageService: MessageService,
    private labelService: LabelService,
    private csatService: CsatService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id']
    })
    this.loadListEmail();
    this.loadStatus();
    this.getListLabel();
    this.idInterval = setInterval(() => {
      this.loadListEmail();
    }, 5000);
    this.messenger = this.signature
  }

  loadStatus() {
    this.statusService.getAll().subscribe((result) => {
      this.listStatus = result;
    });
  }

  ngOnDestroy() {
    if (this.idInterval) {
      clearInterval(this.idInterval);
    }
  }

  tab: number = 0
  loadListEmail() {
      this.emailInfoService.getByIdConfigEmail(this.id).subscribe((result) => {
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

  listStatus: any = []
  listChat: any[] = []
  selectedLabel: any[] = []
  listSelectChat: any[] = []
  listMessenger: any[] = []

  onSelectChat(event: any) {
    console.log(event)
  }

  listLabel: any = []
  getListLabel() {
    this.labelService.getByIdCompany(this.idCompany).subscribe((result) => {
      this.listLabel = result;
    });
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

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
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
      if (result.status == 1) {
        //thành công
        // this.updateStatus(2, 1);
        this.viewMail = false;
      }
      else {
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
    debugger
    this.mailDetails = item;

    this.listMessenger = [];
    this.viewMail = true;
    this.subject = item.subject
    this.listMessenger.push({
      id: item.id,
      messenger: item.textBody,
      dateTime: new Date()
    })
  }

  updateStatus(status: any, sendMessenger: any) {
    let requets = {
      status: status,
      id: this.mailDetails.id
    }
    this.emailInfoService.UpdateStatus(requets).subscribe((result) => {
      if (result.status == 1) {
        if(status == 2){
          this.sendMailCsat(this.mailDetails.idGuId)
        }
        this.loadListEmail();
        if (sendMessenger == 0) {
          this.showSuccess("Change status success");
        }
      }
    });

  }

  sendMailCsat(idGuId: any){
    let request = {
      to: this.mailDetails.from,
      link: AppSettings.WebAddress + "/survey/" + idGuId,
    }

    this.csatService.sendMail(request).subscribe((result) => {
      
    });
  }

  showError(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showSuccess(message: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showInfo(message: any) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }

  handleChange(event: any) {
    this.tab = event.index
    this.loadListEmail()
  }

}
