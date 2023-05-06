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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private emailInfoService: EmailInfoService,
    private statusService: StatusService,
    private userInfoStorageService: UserInfoStorageService,
    private messageService: MessageService,
    private labelService: LabelService,
    private csatService: CsatService
  ) { }

  idInterval: any;
  idCompany: any = this.userInfoStorageService.getCompanyId();
  idUser: any = +this.userInfoStorageService.getIdUser();
  countAll: any = 0
  countMine: any = 0
  ngOnInit(): void {
    this.loadListEmail();
    this.getCountEmail()
    this.loadStatus();
    this.getListLabel();
    this.idInterval = setInterval(() => {
      this.loadListEmail();
      this.getCountEmail()
    }, 5000);
    this.messenger = this.signature
  }

  getCountEmail() {
    let request = { idCompany: this.idCompany, assign: this.idUser, idConfigEmail: 0, status: this.filterStatus, idLabel: 0 }
    this.emailInfoService.getCountByCompanyAgent(request).subscribe((result) => {
      this.countAll = result.all
      this.countMine = result.byAgent
    });
  }

  loadStatus() {
    this.statusService.getAll().subscribe((result) => {
      this.listStatus = result;
      this.listStatusUpdate = result.filter((x: { id: number; }) => x.id != 0)
    });
  }

  ngOnDestroy() {
    if (this.idInterval) {
      clearInterval(this.idInterval);
    }
  }

  tab: number = 0
  loadListEmail() {
    if (this.tab == 0) {
      let requets = {
        idCompany: this.idCompany,
        assign: this.idUser,
        status: this.filterStatus
      }

      this.emailInfoService.getByAgent(requets).subscribe((result) => {
        this.listChat = result;
        this.listChat.forEach((item) => {
          item['dateTime'] = new Date(item.date)
        })
      });
    } else if (this.tab == 1) {
      let requets = {
        idCompany: this.idCompany,
        status: this.filterStatus
      }

      this.emailInfoService.getByStatus(requets).subscribe((result) => {
        this.listChat = result;
        this.listChat.forEach((item) => {
          item['dateTime'] = new Date(item.date)
        })
      });
    }
  }

  subject: any = ''
  statusName: any = ''
  readonly: boolean = true
  scrollDemo: any
  Editor: any = ClassicEditor

  inputSearch: string = ''
  messenger: string = ''
  filterStatus: number = 0
  signature: string = ''

  listStatus: any = []
  listStatusUpdate: any = []
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
  listLabelEmail: any = [];
  viewMail: boolean = false
  detailMail(item: any) {
    // this.mailDetails = item;
    this.emailInfoService.getEmailInfo(item.id).subscribe((result) => {
      this.mailDetails = result.emailInfo
      this.listLabelEmail = result.listLabel
      this.selectedLabel = []
      this.statusName = this.listStatusUpdate.filter((x: { id: any; }) => x.id == this.mailDetails.status)[0].statusName
      result.listLabel.forEach((item: { check: boolean; }) => {
        if (item.check == true) {
          this.selectedLabel.push(item)
        }
      });
    });

    this.listMessenger = [];
    this.viewMail = true;
    this.subject = item.subject
    this.listMessenger.push({
      id: item.id,
      messenger: item.textBody,
      dateTime: new Date(item.date)
    })
  }

  updateStatus() {
    let requets = {
      status: this.mailDetails.status,
      id: this.mailDetails.id
    }
    this.statusName = this.listStatusUpdate.filter((x: { id: any; }) => x.id == this.mailDetails.status)[0].statusName
    this.emailInfoService.UpdateStatus(requets).subscribe((result) => {
      if (result.status == 1) {
        this.loadListEmail();
        this.showSuccess("Change status success");
      }
    });

  }

  sendMailCsat(idGuId: any) {
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

  updateEmailInfoLabel() {
    let request = {
      id: 0,
      idEmailInfo: this.mailDetails.id,
      listLabel: this.listIdLabelSelect
    }
    this.emailInfoService.postEmailInfoLabel(request).subscribe((result) => {
      this.showSuccess("Update success");
    });
  }

  listIdLabelSelect: any = []
  onChangeSelectLabel() {
    this.listIdLabelSelect = []
    this.selectedLabel.forEach((x) => {
      this.listIdLabelSelect.push(x.id)
    })
  }
}
