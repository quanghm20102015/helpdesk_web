import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as $ from 'jquery';
import { EmailInfoService } from '../../../service/emailInfo.service';
import { StatusService } from '../../../service/status.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';
import { MessageService } from 'primeng/api';
import { LabelService } from 'src/app/service/label.service';
import { Table } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  idInterval: any;
  idCompany: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private emailInfoService: EmailInfoService,
    private statusService: StatusService,
    private userInfoStorageService: UserInfoStorageService,
    private messageService: MessageService,
    private labelService: LabelService,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id']
    })
    debugger
    this.idCompany = this.userInfoStorageService.getCompanyId()
    this.loadListEmail();
    this.loadStatus();
    this.getCountEmail()
    this.getListLabel();
    this.idInterval = setInterval(() => {
      this.getCountEmail()
      this.loadListEmail();
    }, 5000);
    this.messenger = this.signature
  }

  id: number = 0
  idUser: number = +this.userInfoStorageService.getIdUser()
  countAll: number = 0
  countMine: number = 0
  getCountEmail(){
    let request = {idCompany: this.idCompany, assign: this.idUser, idConfigEmail: 0, status: this.filterStatus, idLabel: this.id}
    this.emailInfoService.getCountByCompanyAgent(request).subscribe((result) => {
      this.countAll = result.all
      this.countMine = result.byAgent
    });
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

  loadListEmail() {
    let requets = {
      idCompany: this.idCompany,
      status: this.filterStatus,
      idLabel: this.id
    }
    console.log('loadListEmail()')
    this.emailInfoService.getByIdLabel(requets).subscribe((result) => {
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
        this.updateStatus(2, 1);
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
        this.loadListEmail();
        if (sendMessenger == 0) {
          this.showSuccess("Change status success");
        }
      }
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

}
