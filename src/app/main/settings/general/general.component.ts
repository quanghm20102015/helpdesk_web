import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoStorageService } from 'src/app/service/user-info-storage.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  model: any = { username: '', idUser: 0, dayResolve: 0, companyName: this.userInfoStorageService.getCompany(), language: 1, email: this.userInfoStorageService.getWorkemail() }
  modelChangePassword: any = { passworkOld: '', passwordNew: '', passwordNewConfirm: '' }
  modelTab3: any = { alertEvent: null, alertTone: '', sendAudio: null, emailNotification: null, pushNotification: null}
  tab: any = 1
  note: any = ''
  submitted: boolean = false
  listLanguage: any = [
    { id: 1, name: 'English' }
  ]
  formTab1: FormGroup = this._fb.group({
    username: [this.model.username, [Validators.required]],
    companyName: [this.model.companyName],
    language: [this.model.language],
    email: [this.model.email],
    dayResolve: [this.model.dayResolve],
  });
  formProfile: FormGroup = this._fb.group({
    fullName: [this.model.fullName, [Validators.required]],
    displayName: [this.model.displayName, [Validators.required]],
  });

  formChangePassword: FormGroup = this._fb.group({
    passworkOld: [this.model.passworkOld, [Validators.required]],
    passwordNew: [this.model.passwordNew, [Validators.required]],
    passwordNewConfirm: [this.model.passwordNewConfirm, [Validators.required]],
  })
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private userInfoStorageService: UserInfoStorageService,
  ) { }

  ngOnInit(): void {
    this.model.idUser = +(this.userInfoStorageService.getIdUser() ? this.userInfoStorageService.getIdUser() : 0)
    this.formTab1.get('email')?.disable();
  }

  get f1() {
    return this.formTab1.controls
  }
  get fProfile() {
    return this.formProfile.controls
  }

  selectTab(tab: number) {
    this.tab = tab
  }
}
