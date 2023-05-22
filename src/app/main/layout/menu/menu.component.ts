import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigMailService } from '../../../service/configMail.service';
import { LabelService } from '../../../service/label.service';
import { MessageService } from 'primeng/api';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';
import { UserService } from '../../../service/user.service';

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
    private userService: UserService
  ) { }

  idInterval: any;
  idIntervalCountMenu: any;

  ngOnInit(): void {
    this.idCompany = +this.userInfoStorageService.getCompanyId()
    this.idUser = +this.userInfoStorageService.getIdUser()
    this.getListInbox();
    this.getListLabel();

    this.getMenuCount();    
    this.idIntervalCountMenu = setInterval(() => {
      this.getMenuCount();
    }, 5000);

    console.log(this.router.url);
    this.listRouterTab.forEach(item => {
      console.log('Url: ', this.url)
      if (this.url.includes(item.uri)) {
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

  display: boolean = false
  displayChooseChannel: boolean = false
  status: any = +this.userInfoStorageService.getStatus()
  model: any = {};
  submitted: boolean = false;
  form: FormGroup = this._fb.group({
    name: [this.model.name, [Validators.required]],
    description: [this.model.description],
    color: [this.model.color],
    showSidebar: [this.model.showSidebar],
  });

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

  get f() {
    return this.form.controls;
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

  listInboxes: any = []

  setTab(tab: any) {
    this.tab = tab
  }

  getListLabel() {
    this.labelService.getMenuByIdCompany(this.idCompany).subscribe((result) => {
      this.listLabel = result;
    });
  }
  saveLabel() {
    this.model.idCompany = this.userInfoStorageService.getCompanyId();
    this.labelService.create(this.model).subscribe((result) => {
      if (result.status == 1) {
        this.display = false;
        this.getListLabel()
      }
      else {
        this.showError(result.message);
      }
    });
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
  
  ngOnDestroy() {
    if (this.idIntervalCountMenu) {
      clearInterval(this.idIntervalCountMenu);
    }
  }
}
