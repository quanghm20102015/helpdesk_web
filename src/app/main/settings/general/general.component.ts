import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/service/account.service';
import { EncrDecrService } from 'src/app/service/encr-decr.service';
import { UserInfoStorageService } from 'src/app/service/user-info-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  model: any = {
    username: '',
    idUser: 0,
    numberDay: 0,
    companyName: this.userInfoStorageService.getCompany(),
    language: 1,
    email: this.userInfoStorageService.getWorkemail(),
    displayName: ''
  }
  modelChangePassword: any = { passworkOld: '', passwordNew: '', passwordNewConfirm: '' }
  modelTab3: any = { alertEvent: null, alertTone: '', sendAudio: null, emailNotification: null, pushNotification: null }
  tab: any = 1
  note: any = ''
  idUser: number = +(this.userInfoStorageService.getIdUser() || 0)
  modelOld: any;
  submitted: boolean = false
  listLanguage: any = [
    { id: 1, name: 'English' }
  ]
  formTab1: FormGroup = this._fb.group({
    username: [this.model.username, [Validators.required]],
    companyName: [this.model.companyName],
    language: [this.model.language],
    email: [this.model.email],
    numberDay: [this.model.numberDay],
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
    private userService: UserService,
    private encrdecrService: EncrDecrService,
    private messageService: MessageService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.model.idUser = +(this.userInfoStorageService.getIdUser() ? this.userInfoStorageService.getIdUser() : 0)
    this.formTab1.get('email')?.disable();
    this.selectTab(1)
  }

  get f1() {
    return this.formTab1.controls
  }
  get fProfile() {
    return this.formProfile.controls
  }

  selectTab(tab: number) {
    this.tab = tab
    if (this.idUser != 0)
      this.accountService.getAccount(this.idUser).subscribe((result) => {

        this.model.username = result.fullname
        this.model.idLabel = result.idLabel
        this.model.numberDay = result.numberDay

        this.model.fullName = result.fullname
        this.model.displayName = result.displayName

        this.model.signature = result.signature
      })
  }

  onChangePassword() {
    let passwordOld = this.modelChangePassword.passworkOld;

    this.userService.GetById(this.idUser).subscribe((result) => {
      this.modelOld = result;
      let passwordDecrypt = this.encrdecrService.set("mypassword", passwordOld).toString()

      if (this.modelOld.password != passwordDecrypt) {
        this.showError("Old password is not correct")
        return
      }
      else {
        let password = this.encrdecrService.set("mypassword", this.modelChangePassword.passwordNew).toString()
        let request = {
          idGuId: this.modelOld.idGuId,
          password: password
        }
        this.userService.resetPassword(request).subscribe((result) => {
          if (result.status === 1) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Change status success' });
            this.modelChangePassword = { passworkOld: '', passwordNew: '', passwordNewConfirm: '' }
          } else {

          }
        })
      }
    });
  }

  updateAccountInformation() {
    let request = {
      Id: this.idUser,
      AccountName: this.model.username,
      Language: this.model.language,
      CompanyName: this.model.companyName,
      NumberDay: this.model.numberDay,
    }
    this.accountService.updateAccountInformation(request).subscribe((result) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Account Information' });
    })
  }

  updateProfile() {
    let request = {
      Id: this.idUser,
      AccountName: this.model.username,
      DisplayName: this.model.displayName,
    }
    this.accountService.updateProfile(request).subscribe((result) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Account Information' });
    })
  }

  showError(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  saveSignature() {
    let request = {
      Id: this.idUser,
      Signature: this.model.signature
    }
    this.accountService.updateSignature(request).subscribe((result) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Change Signature success' });
    })
  }
}
