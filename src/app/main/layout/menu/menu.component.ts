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
  constructor(private _fb: FormBuilder, 
    private router: Router, 
    private configMailService: ConfigMailService,
    private labelService: LabelService,
    private messageService: MessageService,
    private userInfoStorageService: UserInfoStorageService,
    private userService: UserService) { }

  idInterval: any;
  ngOnInit(): void {
    this.idCompany = this.userInfoStorageService.getCompanyId()
    this.idUser = this.userInfoStorageService.getIdUser()
    this.getListInbox();
    this.loadDataLabel();
    console.log(this.router.url);
    this.listRouterTab.forEach(item => {
      console.log('Url: ',this.url)
      if (this.url.includes(item.uri)) {
        this.tab = item.tab
        console.log('Tab: ',this.tab)
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

  getListInbox(){
    this.configMailService.GetByIdCompany(this.idCompany).subscribe((result) => {
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

  listLabel: any = [
    // { name: 'Label 01', id: 156 },
    // { name: 'Label 02', id: 1680 },
    // { name: 'Label 03', id: 430 },
  ]

  listInboxes: any = [
    // { name: 'Web 01', id: 200 },
    // { name: 'Page 2', id: 329 },
  ]

  setTab(tab: any){
    this.tab = tab
  }

  loadDataLabel(){
    this.labelService.getByIdCompany(this.idCompany).subscribe((result) => {
      this.listLabel = result;
    });
  }
  saveLabel(){    
    this.model.idCompany = this.userInfoStorageService.getCompanyId();
    this.labelService.create(this.model).subscribe((result) => {
      if(result.status == 1){          
        this.display = false;
      }
      else{
        this.showError(result.message);
      }
    });
  }
  showError(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  postLogin(){
    let request = {
      idUser: this.idUser
    }
    this.userService.postLogin(request).subscribe((result) => {
      if(result.status == 1){
      }
      else{
      }
    });
  }

  postLogout(){
    let request = {
      idUser: this.idUser
    }
    this.userService.postLogout(request).subscribe((result) => {
      if(result.status == 1){
      }
      else{
      }
    });
  }

  changeStatus(status: any){    
    let request = {
      idUser: this.idUser,
      status: status
    }
    this.userService.changeStatus(request).subscribe((result) => {
      if(result.status == 1){
      }
      else{
      }
    });
  }
}
