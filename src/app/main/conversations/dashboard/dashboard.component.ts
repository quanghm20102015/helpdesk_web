import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as $ from 'jquery';
import { EmailInfoService } from '../../../service/emailInfo.service';
import { StatusService } from '../../../service/status.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LabelService } from 'src/app/service/label.service';
import { Table } from 'primeng/table';
import { CsatService } from 'src/app/service/csat.service';
import { AppSettings } from "../../../constants/app-setting";
import { AccountService } from 'src/app/service/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TRISTATECHECKBOX_VALUE_ACCESSOR } from 'primeng/tristatecheckbox';
import { HistoryService } from 'src/app/service/history.service';

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
    private csatService: CsatService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private historyService: HistoryService,
    private confirmationService: ConfirmationService,
  ) { }

  idInterval: any;
  idCompany: any = +this.userInfoStorageService.getCompanyId();
  idUser: any = +this.userInfoStorageService.getIdUser();
  fullName: any = this.userInfoStorageService.getFullname();
  countAll: any = 0
  countMine: any = 0
  id: any = 0
  idOld: any = 0
  listHistory: any = []
  listFollow: any = []

  url: string = ''
  urlOld:string = ''
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.id = +params['id']
      }
    })
    this.getListUser()
    this.loadListEmail();
    this.loadStatus();
    this.getListLabel();
    this.idInterval = setInterval(() => {
      this.loadListEmail();
    }, 5000);
    this.messenger = this.signature
  }
  ngAfterContentChecked(): void {
    if ( this.id != this.idOld) {
      this.loadListEmail()
      this.idOld = this.id
    }
  }
  title: string = ''
  tab: number = 0
  loadListEmail() {
    let request = {
      idCompany: this.idCompany,
      textSearch: this.textSearch,
      status: this.status,
      assign: 0,
      idConfigEmail: 0,
      idLabel: 0,
      idUserFollow: 0,
      idUserTrash: 0,
    }
    if (this.router.url.includes('/dashboard')) { this.title = 'Conversations' }
    else if (this.router.url.includes('/mentions')) {
      request.assign = this.idUser
      this.title = 'Mine'
    }
    else if (this.router.url.includes('/following')) {
      request.idUserFollow = this.idUser
      this.title = 'Following'
    }
    else if (this.router.url.includes('/unattended')) {
      this.title = 'Unassigned'
    }
    else if (this.router.url.includes('/resolved')) {
      this.title = 'Resolved'
      request.status = 2
    }
    else if (this.router.url.includes('/trash')) {
      this.title = 'Trash'
      request.idUserTrash = this.idUser
    }
    else if (this.router.url.includes('/channel/')) {
      request.idConfigEmail = this.id
      this.title = 'Channel'
    }
    else if (this.router.url.includes('/label/')) {
      request.idLabel = this.id
      this.title = 'Label'
    }
    // this.getCountEmail()
    this.emailInfoService.getFillter(request).subscribe((result) => {
      this.listChat = result;
      this.listChat.forEach((item) => {
        item['dateTime'] = new Date(item.date)
      })
    });
  }

  // getCountEmail() {
  //   let request = {
  //     idCompany: this.idCompany,
  //     textSearch: this.textSearch,
  //     status: this.status,
  //     assign: this.idAssign,
  //     idConfigEmail: this.idIndex,
  //     idLabel: this.idLabel,
  //   }
  //   this.emailInfoService.getFillterCount(request).subscribe((result) => {
  //     this.countAll = result.all
  //     this.countMine = result.byAgent
  //   });
  // }

  onChangeValue() {
    this.textSearch = this.textSearchChange
    this.loadListEmail()
  }

  listUser: any = []
  getListUser() {
    this.accountService.getByIdCompany(this.idCompany).subscribe((result) => {
      this.listUser = result
    });
  }

  updateAsign() {
    let request = {
      id: 0,
      idEmailInfo: this.mailDetails.id,
      listAssign: this.listIdAssignSelect
    }
    this.emailInfoService.updateAssign(request).subscribe((result) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Update success" });
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
  selectedAssign: any[] = []
  selectedFollow: any[] = []
  listSelectChat: any[] = []
  listMessenger: any[] = []
  listEmailInfo: any[] = []
  listAssign: any[] = []

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
        this.detailMail(this.mailDetails)
        this.addHistory(this.mailDetails.id, 'Reply mail to ' + this.mailDetails.from);
      }
      else {
        //thất bại
      }
      this.sending = false
    });
  }

  mailDetails: any;
  listLabelEmail: any = [];
  viewMail: boolean = false;
  detailMail(item: any) {
    this.messenger = "";
    this.emailInfoService.getEmailInfo(item.id).subscribe((result) => {
      this.mailDetails = result.emailInfo
      this.listLabelEmail = result.listLabel
      this.listEmailInfo = result.listEmailInfo
      this.listHistory = result.listHistory
      this.listFollow = result.listFollow
      this.listAssign = result.listAssign

      if (this.mailDetails.status > 0) {
        this.statusName = this.listStatusUpdate.filter((x: { id: any; }) => x.id == this.mailDetails.status)[0].statusName
      }

      this.selectedAssign = []
      result.listAssign.forEach((item: { check: boolean; }) => {
        if (item.check == true) {
          this.selectedAssign.push(item)
        }
      });

      this.selectedFollow = []
      result.listFollow.forEach((item: { check: boolean; }) => {
        if (item.check == true) {
          this.selectedFollow.push(item)
        }
      });

      this.selectedLabel = []
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
      this.viewMail = true;
    });

    // this.listMessenger = [];
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
      id: this.mailDetails.id,
      fullName: this.fullName
    }
    this.statusName = this.listStatusUpdate.filter((x: { id: any; }) => x.id == this.mailDetails.status)[0].statusName
    this.emailInfoService.UpdateStatus(requets).subscribe((result) => {
      if (result.status == 1) {
        this.loadListEmail();
        this.showSuccess("Change status success");
        if (requets.status == 2) {
          //status resole, send mail survey
          this.sendMailCsat(this.mailDetails.idGuId)
        }
      }
    });

  }

  addHistory(idEmailInfo: any, content: any) {
    let request = {
      idCompany: this.idCompany,
      idDetail: idEmailInfo,
      type: 1,
      content: content,
      fullName: this.fullName
    }
    debugger
    this.historyService.create(request).subscribe((result) => {
      if (result.status == 1) {
      }
    });

  }

  sendMailCsat(idGuId: any) {
    let request = {
      to: this.mailDetails.from,
      link: AppSettings.WebAddress + "/survey/" + idGuId,
    }

    this.csatService.sendMail(request).subscribe((result) => {
      this.addHistory(this.mailDetails.id, 'Send mail survey to ' + this.mailDetails.from);
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
      this.addHistory(this.mailDetails.id, 'Update label to email info');
      this.detailMail(this.mailDetails)
    });
  }

  updateAssign() {
    let request = {
      id: 0,
      idEmailInfo: this.mailDetails.id,
      listLabel: this.listIdLabelSelect
    }
    debugger
    this.emailInfoService.updateAssign(request).subscribe((result) => {
      this.showSuccess("Update success");
      this.addHistory(this.mailDetails.id, 'Update assign to email');
      this.detailMail(this.mailDetails)
    });
  }

  updateFollow() {
    let request = {
      id: 0,
      idEmailInfo: this.mailDetails.id,
      listFollow: this.listIdFollowSelect
    }
    this.emailInfoService.updateFollow(request).subscribe((result) => {
      this.showSuccess("Update success");
      this.addHistory(this.mailDetails.id, 'Update follow to email');
      this.detailMail(this.mailDetails)
    });
  }

  listIdLabelSelect: any = []
  onChangeSelectLabel() {
    this.listIdLabelSelect = []
    this.selectedLabel.forEach((x) => {
      this.listIdLabelSelect.push(x.id)
    })
    this.updateEmailInfoLabel()
  }

  listIdFollowSelect: any = []
  onChangeSelectFollow() {
    this.listIdFollowSelect = []
    this.selectedFollow.forEach((x) => {
      this.listIdFollowSelect.push(x.id)
    })
    this.updateFollow()
  }

  listIdAssignSelect: any = []
  onChangeSelectAssign() {
    this.listIdAssignSelect = []
    this.selectedAssign.forEach((x) => {
      this.listIdAssignSelect.push(x.id)
    })
    this.updateAsign()
  }

  delete(){
    let request = {
      idEmailInfo: this.mailDetails.id,
      idUserDelete: this.idUser
    }
    this.emailInfoService.delete(request).subscribe((result) => {
      if(result.status == 1){
        this.viewMail = false
        this.loadListEmail()
        this.showSuccess('Delete success');
      } else {
        this.showError('Error')
      }
    });
  }

  confirm() {
    this.confirmationService.confirm({
      header: 'Confirmation delete',
      icon: 'pi pi-exclamation-triangle',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.delete()
      }
    });
  }
}
