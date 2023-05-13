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
import { CsatService } from 'src/app/service/csat.service';
import { AppSettings } from 'src/app/constants/app-setting';
import { AccountService } from 'src/app/service/account.service';
@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private emailInfoService: EmailInfoService,
    private statusService: StatusService,
    private userInfoStorageService: UserInfoStorageService,
    private messageService: MessageService,
    private labelService: LabelService,
    private csatService: CsatService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
  ) { }

  id: number = 0
  idOld: number = 0
  idInterval: any;
  idCompany: any = +this.userInfoStorageService.getCompanyId();
  idUser: any = +this.userInfoStorageService.getIdUser();
  countAll: any = 0
  countMine: any = 0
  ngAfterContentChecked(): void{
    if(this.id != this.idOld){
      this.idOld = this.id
      this.loadListEmail()
    } 
  }
  ngOnInit(): void {
    this.getListUser()
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id']
    })
    this.idOld = this.id
    this.loadListEmail()
    this.loadStatus();
    this.getListLabel();
    this.idInterval = setInterval(() => {
      this.loadListEmail();
    }, 5000);
    this.messenger = this.signature
  }

  tab: number = 0
  loadListEmail() {
    let request = {
      idCompany: this.idCompany,
      textSearch: this.textSearch,
      status: this.status,
      assign: this.tab == 1? 0 : this.idUser,
      idConfigEmail: 0,
      idLabel: this.id,
    }
    this.getCountEmail()
    this.emailInfoService.getFillter(request).subscribe((result) => {
      this.listChat = result;
      this.listChat.forEach((item) => {
        item['dateTime'] = new Date(item.date)
      })
    });
  }

  getCountEmail() {
    let request = {
      idCompany: this.idCompany,
      textSearch: this.textSearch,
      status: this.status,
      assign: this.idUser,
      idConfigEmail: 0,
      idLabel: this.id,
    }
    this.emailInfoService.getFillterCount(request).subscribe((result) => {
      this.countAll = result.all
      this.countMine = result.byAgent
    });
  }
  
  listUser: any = []
  getListUser() {
    this.accountService.getByIdCompany(this.idCompany).subscribe((result) => {
      this.listUser = result
    });
  }

  updateAsign() {
    let request = {
      id: this.mailDetails.id,
      status: this.mailDetails.status,
      idCompany: this.idCompany,
      assign: this.mailDetails.assign
    }
    this.emailInfoService.updateAssign(request).subscribe((result) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Update success" });
    });
  }

  onChangeValue(){
    this.textSearch = this.textSearchChange
    this.loadListEmail()
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

  subject: any = ''
  statusName: any = ''
  readonly: boolean = true
  scrollDemo: any
  Editor: any = ClassicEditor

  textSearch: string = ''
  textSearchChange: string = ''
  messenger: string = ''
  status: number = 0
  signature: string = ''

  listStatus: any = []
  listStatusUpdate: any = []
  listChat: any[] = []
  selectedLabel: any[] = []
  listSelectChat: any[] = []
  listMessenger: any[] = []
  listEmailInfo: any[] = []

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

  sending: boolean = false
  sendMessenger() {
    let request = {
      to: this.mailDetails.from,
      cc: '',
      bcc: '',
      subject: this.mailDetails.subject,
      body: this.messenger,
      idCompany: this.idCompany,
      idConfigEmail: this.mailDetails.idConfigEmail,
      messageId: this.mailDetails.messageId,
      assign: this.mailDetails.assign
    }
    this.sending = true
    this.emailInfoService.SendMail(request).subscribe((result) => {
      if (result.status == 1) {
        //thành công
        this.showSuccess("Send success")
        this.viewMail = false;
        this.detailMail(this.mailDetails)
      }
      else {
        //thất bại
      }
      this.sending = false
    });
  }

  mailDetails: any;
  listLabelEmail: any = [];
  viewMail: boolean = false
  detailMail(item: any) {
    this.messenger = "";
    this.emailInfoService.getEmailInfo(item.id).subscribe((result) => {
      this.mailDetails = result.emailInfo
      this.listLabelEmail = result.listLabel
      this.listEmailInfo = result.listEmailInfo
      this.selectedLabel = []
      if (this.mailDetails.status > 0) {
        this.statusName = this.listStatusUpdate.filter((x: { id: any; }) => x.id == this.mailDetails.status)[0].statusName
      }
      result.listLabel.forEach((item: { check: boolean; }) => {
        if (item.check == true) {
          this.selectedLabel.push(item)
        }
      });

      this.listMessenger = [];
      this.listEmailInfo.forEach(element => {
        this.listMessenger.push({
          id: element.id,
          messenger: element.textBody,
          dateTime: new Date(element.date),
          type: element.type,
        })
      });
    });

    // this.listMessenger = [];
    this.viewMail = true;
    this.subject = item.subject
    // this.listMessenger.push({
    //   id: item.id,
    //   messenger: item.textBody,
    //   dateTime: new Date(item.date)
    // })
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
        if(requets.status == 2){
          //status resole, send mail survey
          this.sendMailCsat(this.mailDetails.idGuId)
        }
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
