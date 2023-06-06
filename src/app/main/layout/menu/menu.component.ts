import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigMailService } from '../../../service/configMail.service';
import { LabelService } from '../../../service/label.service';
import { MessageService } from 'primeng/api';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';
import { UserService } from '../../../service/user.service';
import { EmailInfoService } from 'src/app/service/emailInfo.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MessageService]
})
export class MenuComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private configMailService: ConfigMailService,
    private labelService: LabelService,
    private messageService: MessageService,
    private userInfoStorageService: UserInfoStorageService,
    private userService: UserService,
    private emailInfoService: EmailInfoService
    
  ) { }

  idInterval: any;
  idIntervalCountMenu: any;
  displayNewConvesation: boolean = false

  modelChannel: any = { id: 0, yourName: '', email: '', idCompany: +this.userInfoStorageService.getCompanyId() }


  ngOnInit(): void {
    this.idCompany = +this.userInfoStorageService.getCompanyId()
    this.idUser = +this.userInfoStorageService.getIdUser()
    this.getListInbox()
    this.getListLabel()
    this.getListGroup()
    this.getListUser()
    this.getMenuCount()    
    this.idIntervalCountMenu = setInterval(() => {
      this.getMenuCount();
    }, 60000);

    this.listRouterTab.forEach(item => {
      if (this.router.url.includes(item.uri)) {
        this.tab = item.tab
      }
    })
    this.postLogin();
    // window.addEventListener('beforeunload', this.postLogout, false);

    // window.addEventListener('beforeunload', this.postLogout, false);

    window.addEventListener('beforeunload', (event) => {
      this.postLogout();
    });
    // this.idInterval = setInterval(() => {
    //   this.postLogin();
    // }, 10000);
  }

  ngAfterContentChecked(): void {
    this.listRouterTab.forEach(item => {
      if (this.router.url.includes(item.uri)) {
        this.tab = item.tab
      }
    })
  }

  display: boolean = false
  displayAddGroup: boolean = false
  displayChooseChannel: boolean = false
  displayChooseChannel2: boolean = false
  displayChooseChannel3: boolean = false
  status: any = +this.userInfoStorageService.getStatus()
  model: any = {};
  modelAddGroup: any = {};
  submitted: boolean = false;
  form: FormGroup = this._fb.group({
    name: [this.model.name, [Validators.required]],
    description: [this.model.description],
    color: [this.model.color],
    showSidebar: [this.model.showSidebar],
  });

  formAddGroup: FormGroup = this._fb.group({
    name: [this.modelAddGroup.name, [Validators.required]],
    description: [this.modelAddGroup.description],
    color: [this.modelAddGroup.color],
  });

  formChannel: FormGroup = this._fb.group({
    yourName: [this.modelChannel.yourName, [Validators.required]],
    email: [this.modelChannel.email, [Validators.required, Validators.email]],
  });
  
  modelNewConversation: any = {
    selectedCategory: 1,
    username: '',
    email: ''
  }

  idCompany: any;
  idUser: any;
  onSubmit() {
    this.submitted = true;
  }
  
  emailInfoCount: any = {}
  getMenuCount(){
    let request = {
      idCompany: this.idCompany,
      idUser: this.idUser
    }
    this.configMailService.getMenuCount(request).subscribe((result) => {
      this.emailInfoCount = result.emailInfoCount;
    });
  }

  getListInbox() {
    this.configMailService.getMenuByIdCompany(this.idCompany).subscribe((result) => {
      this.listInboxes = result;
    });
  }

  rebuilForm() {
    this.form.reset({
      name: '',
      description: '',
      color: '',
      showSidebar: false,
    });
  }

  rebuilFormAddGroup() {
    this.formAddGroup.reset({
      name: '',
      description: '',
      color: '',
    });
  }

  get f() {
    return this.form.controls;
  }

  get fg() {
    return this.formAddGroup.controls;
  }

  get fchannel() {
    return this.formChannel.controls;
  }

  url: string = this.router.url
  tab: number = 0
  listRouterTab: any[] = [
    { tab: 1, uri: '/main/conversations' },
    { tab: 2, uri: '/main/contacts' },
    { tab: 3, uri: '/main/reports' },
    { tab: 4, uri: '/main/campaigns' },
    { tab: 5, uri: '/main/settings' },
  ]

  listLabel: any = []
  listGroup: any = []

  listInboxes: any = []

  setTab(tab: any) {
    this.tab = tab
  }

  getListLabel() {
    this.labelService.getMenuByIdCompany(this.idCompany).subscribe((result) => {
      this.listLabel = result;
    });
  }

  getListGroup() {
    this.listGroup = [{name: 'group1', description: 'description', color: '#333333', emailInfoCount: 5}]
    // this.groupService.getMenuByIdCompany(this.idCompany).subscribe((result) => {
    //   this.listGroup = result;
    // });
  }

  saveLabel() {
    this.model.idCompany = this.userInfoStorageService.getCompanyId();
    this.labelService.create(this.model).subscribe((result) => {
      if (result.status == 1) {
        this.display = false;
        this.rebuilForm()
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Add label success" });
        this.getListLabel()
      }
      else {
        this.showError(result.message);
      }
    });
  }

  saveGroup() {
    this.modelAddGroup.idCompany = this.userInfoStorageService.getCompanyId();
    // this.groupService.create(this.modelAddGroup).subscribe((result) => {
    //   if (result.status == 1) {
    //     this.displayAddGroup = false;
    //     this.rebuilFormAddGroup()
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: "Add label success" });
    //     this.getListGroup()
    //   }
    //   else {
    //     this.showError(result.message);
    //   }
    // });
  }

  showError(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  postLogin() {
    let request = {
      idUser: this.idUser
    }
    this.userService.postLogin(request).subscribe((result) => {
      if (result.status == 1) {
      }
      else {
      }
    });
  }

  postLogout() {
    let request = {
      idUser: this.idUser
    }
    this.userService.postLogout(request).subscribe((result) => {
      if (result.status == 1) {
      }
      else {
      }
    });
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  changeStatus(status: any) {
    let request = {
      idUser: this.idUser,
      status: status
    }
    this.userService.changeStatus(request).subscribe((result) => {
      if (result.status == 1) {
        this.userInfoStorageService.setStatus(status)
        this.status = status
      }
      else {
      }
    });
  }

  createChannel() {
    this.configMailService.addChannel(this.modelChannel).subscribe((result) => {
      if (result.status == 1) {
        this.displayChooseChannel2 = false
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Add channel success" });
        this.getListInbox()
      }
      else {
        this.showError(result.message)
      }
    });
  }

  toSetting(){
    this.displayChooseChannel3 = false
    this.router.navigate(['/main/settings/inboxes'])
  }

  toTakeMe(){
    this.displayChooseChannel3 = false
    // this.router.navigate(['/main/settings/inboxes'])
  }

  // update(){
  //   this.configMailService.putEmailInfo(this.modelChannel).subscribe((result) => {
  //     this.displayChooseChannel2 = false
  //   });
  //   this.submitted = true
  // }
  
  ngOnDestroy() {
    if (this.idIntervalCountMenu) {
      clearInterval(this.idIntervalCountMenu);
    }
  }

  
  selectedLabel: any[] = []
  selectedAssign: any[] = []
  selectedFollow: any[] = []
  selectedAgent: any[] = []
  selectedRequester: number = 0;
  listUser: any = []
  ingredient: any;
  getListUser() {
    this.userService.GetByIdCompany(this.idCompany).subscribe((result) => {
      this.listUser = result
    });
  }

  city: string = '';

  selectedCategory: any = null;

  categories: any[] = [{name: 'End user', value: 1}, {name: 'Member', value: 2}];

  saveConversation(){
    this.modelNewConversation
    this.modelNewConversation.listAgent = this.selectedAgent
    this.modelNewConversation.listLabel = this.selectedLabel
    this.modelNewConversation.listAssign = this.selectedAssign
    this.modelNewConversation.listFollow = this.selectedFollow
    this.modelNewConversation.idCompany = this.idCompany
    this.modelNewConversation.idConfigEmail = 5

    this.emailInfoService.newConversation(this.modelNewConversation).subscribe((result) => {
      if(result.status == 1){
        this.displayNewConvesation = false
      }
    });
  }

  newConversation(){
    this.displayNewConvesation = true;
    
    this.modelNewConversation = {
      selectedCategory: 1,
      username: '',
      email: ''
    }
    this.selectedAgent = []
    this.selectedLabel = []
    this.selectedAssign = []
    this.selectedFollow = []
  }
}
