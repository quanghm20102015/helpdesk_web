import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as $ from 'jquery';
import { EmailInfoService } from '../../../service/emailInfo.service';
import { StatusService } from '../../../service/status.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { LabelService } from 'src/app/service/label.service';
import { Table } from 'primeng/table';
import { CsatService } from 'src/app/service/csat.service';
import { AppSettings } from "../../../constants/app-setting";
import { AccountService } from 'src/app/service/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TRISTATECHECKBOX_VALUE_ACCESSOR } from 'primeng/tristatecheckbox';
import { HistoryService } from 'src/app/service/history.service';
import { formatDate } from '@angular/common';
import { UploadFileService } from 'src/app/service/uploadfiles.service';
import { FILETYPE, CONSTANTS } from "../../../constants/CONSTANTS";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  @ViewChild("file", { static: false }) public file?: ElementRef;
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
    private fileService: UploadFileService,
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
  modelFilter: any = { date: null, status: 1 }
  statusSend: any = null
  date: any = null
  url: string = ''
  urlOld: string = ''
  onInit: boolean = true
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
    this.virtualChats = Array.from({ length: 10000 });
    this.idInterval = setInterval(() => {
      this.loadListEmail();
    }, 5000);
    this.messenger = this.signature
  }
  ngAfterContentChecked(): void {
    if (this.id != this.idOld) {
      this.loadListEmail()
      this.idOld = this.id
      this.rows = 10
    }
  }
  title: string = ''
  tab: number = 0
  total: number = 0
  loadListEmail() {
    let request = {
      idCompany: this.idCompany,
      textSearch: '',
      status: this.status,
      assign: 0,
      idConfigEmail: 0,
      idLabel: 0,
      idUserFollow: 0,
      idUserTrash: 0,
      unAssign: false,
      fromDate: this.date? this.date[0] : null,
      toDate: this.date? this.date[1] : null,
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
      request.unAssign = true
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
      this.listChat = result.listEmailInfo.slice(0, this.rows) ;
      this.total = result.total
      this.listChat.forEach((item) => {
        item['dateTime'] = new Date(item.date)
      })
      if(this.onInit && this.router.url.includes('/mentions')){
        this.onInit = false
        this.detailMail(this.listChat[0])
      }

    });
  }

  private timer: any;

  onKeyupSearch() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.loadListEmailFilter()
    }, 400);
  }

  loadListEmailFilter() {
    let request = {
      idCompany: this.idCompany,
      textSearch: this.textSearch,
      status: this.status,
      assign: 0,
      idConfigEmail: 0,
      idLabel: 0,
      idUserFollow: 0,
      idUserTrash: 0,
      unAssign: false
    }
    if (this.router.url.includes('/dashboard')) { this.title = 'Conversations' }
    else if (this.router.url.includes('/mentions')) {
      request.assign = this.idUser
    }
    else if (this.router.url.includes('/following')) {
      request.idUserFollow = this.idUser
    }
    else if (this.router.url.includes('/unattended')) {
      request.unAssign = true
    }
    else if (this.router.url.includes('/resolved')) {
      request.status = 2
    }
    else if (this.router.url.includes('/trash')) {
      request.idUserTrash = this.idUser
    }
    else if (this.router.url.includes('/channel/')) {
      request.idConfigEmail = this.id
    }
    else if (this.router.url.includes('/label/')) {
      request.idLabel = this.id
    }
    this.emailInfoService.getFillter(request).subscribe((result) => {
      this.listChatSearch = result.listEmailInfo;
      this.listChatSearch.forEach((item) => {
        item['dateTime'] = new Date(item.date)
      })
    });
  }

  loadmore(){
    this.rows += 10
    this.loadListEmail()
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
      // this.messageService.add({ severity: 'success', summary: 'Success', detail: "Update success" });
    });
  }

  loadStatus() {
    this.statusService.getAll().subscribe((result) => {
      this.listStatus = result;
      this.listStatusUpdate = result.filter((x: { id: number; }) => x.id != 0)
      this.listStatus = this.listStatusUpdate
    });
  }

  ngOnDestroy() {
    if (this.idInterval) {
      clearInterval(this.idInterval);
    }
  }

  subject: any = ''
  statusName: any = ''
  note: any = ''
  readonly: boolean = true
  scrollDemo: any
  Editor: any = ClassicEditor

  textSearch: string = ''
  messenger: string = ''
  status: number = 0
  signature: string = ''
  rows: number = 10
  tabReply: number = 1

  listStatus: any = []
  listStatusUpdate: any = []
  listChat: any[] = []
  listChatSearch: any[] = []
  virtualChats: any[] = []
  selectedLabel: any[] = []
  selectedAssign: any[] = []
  selectedFollow: any[] = []
  listSelectChat: any[] = []
  listMessenger: any[] = []
  listEmailInfo: any[] = []
  listAssign: any[] = []
  filteredListAssign: any[] = []

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
    if (event.target.files.length == 0) {
      return;
    }
    const check = this.fileService.checkFileWasExitsted(event, this.uploadedFiles);
    if (check === 1) {
      for (let item of event.target.files) {      
        const name = item.name;
        const lastDot = name.lastIndexOf('.');
      
        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);
      
        item.fileName = fileName;
        item.extension = ext;
        item.sizeText = (item.size/1048576).toFixed(2) + " MB"
        FILETYPE.forEach((fileType) => {
          if (item.type == fileType.text) {
            item.fileType = fileType.value;
            this.uploadedFiles.push(item);
          }
        });
      }
    } else if (check === 2) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Duplicate file name' })
    }
    if(this.file){
      this.file.nativeElement.value = "";
    }

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
      to: this.mailDetails.type == 1 ? this.mailDetails.from : this.mailDetails.to,
      cc: '',
      bcc: '',
      subject: this.mailDetails.subject,
      body: this.messenger,
      idCompany: this.idCompany,
      idConfigEmail: this.mailDetails.idConfigEmail,
      messageId: this.mailDetails.messageId,
      assign: 0
    }
    this.sending = true
    if(this.mailDetails.newConversation == false){
      this.emailInfoService.SendMail(request, this.uploadedFiles).subscribe((result) => {
        if (result.status == 1) {
          //thành công
          // ("Send success")
          this.detailMail(this.mailDetails)
          this.addHistory(this.mailDetails.id, 'Reply mail to ' + this.mailDetails.from);
        }
        else {
          //thất bại
        }
        this.sending = false
      });
    }
    else{      
      this.emailInfoService.SendMailNewConversation(request, this.uploadedFiles).subscribe((result) => {
        if (result.status == 1) {
          //thành công
          // ("Send success")
          this.detailMail(this.mailDetails)
          this.addHistory(this.mailDetails.id, 'Reply mail to ' + this.mailDetails.from);
        }
        else {
          //thất bại
        }
        this.sending = false
      });
    }
  }

  mailDetails: any;
  listLabelEmail: any = [];
  viewMail: boolean = false;
  detailMail(item: any) {
    this.note = "";
    this.messenger = "";
    this.uploadedFiles = []
    this.emailInfoService.getEmailInfo(item.id).subscribe((result) => {
      this.mailDetails = result.emailInfo
      this.listEmailInfo = result.listEmailInfo
      this.listMessenger = [];
      this.listEmailInfo.forEach(element => {
        this.listMessenger.push({
          id: element.id,
          messenger: element.textBody,
          dateTime: new Date(element.date),
          type: element.type,
          textBody: element.textBody,
          fromName: element.fromName
        })
      });
      this.viewMail = true;

      this.listLabelEmail = result.listLabel
      this.listLabelEmail.forEach((element:any) => {
        element.name = '#' + element.name
      });
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
    });

    // this.listMessenger = [];
    this.subject = item.subject
    // this.listMessenger.push({
    //   id: item.id,
    //   messenger: item.textBody,
    //   dateTime: new Date(item.date)
    // })
  }
  filterAssign(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.listAssign.length; i++) {
      let assign = this.listAssign[i];
      if (assign.fullname.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(assign);
      }
    }

    this.filteredListAssign = filtered;
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
        this.detailMail(this.mailDetails)
        // this.showSuccess("Change status success");
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
      // this.showSuccess("Update success");
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
    this.emailInfoService.updateAssign(request).subscribe((result) => {
      // this.showSuccess("Update success");
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
      // this.showSuccess("Update success");
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

  displayDelete: boolean = false
  delete() {
    let request = {
      idEmailInfo: this.mailDetails.id,
      idUserDelete: this.idUser
    }
    this.emailInfoService.delete(request).subscribe((result) => {
      if (result.status == 1) {
        this.viewMail = false
        this.loadListEmail()
        this.displayDelete = false
        this.mailDetails = {}
        // this.showSuccess('Delete success');
      } else {
        this.showError('Error')
      }
    });
  }

  confirm() {
    this.confirmationService.confirm({
      header: 'Confirmation delete',
      message: 'Are you sure you want to delete this conversation?',
      accept: () => {
        this.delete()
      }
    });
  }

  filter(){
    this.date = this.modelFilter.date
    this.status = this.modelFilter.status
    this.loadListEmail()
  }

  clearFilter(){
    this.modelFilter.status = 0
    this.modelFilter.date = null
    this.filter()
  }

  savePrivateNote(){
    let requets = {
      fullName: this.fullName,
      idEmailInfo: this.mailDetails.id,
      privateNote: this.note
    }
    
    this.emailInfoService.privateNote(requets).subscribe((result) => {
      if (result.status == 1) {
        this.loadListEmail();
        this.detailMail(this.mailDetails)
      }
    });
  }

  onRemoveFile(data: any) {
    var index = this.uploadedFiles.indexOf(data);
    this.uploadedFiles.splice(index, 1);
  }
}
