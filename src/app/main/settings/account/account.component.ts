import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/service/account.service';
import { UserInfoStorageService } from 'src/app/service/user-info-storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private userInfoStorageService: UserInfoStorageService,
    private accountService: AccountService,
    private messageService: MessageService

  ) { }
  disabled: boolean = true
  submitted: boolean = false
  idCompany: number = +(this.userInfoStorageService.getCompanyId() || 0)
  idUser: number = +(this.userInfoStorageService.getIdUser() || 0)
  model: any = { fullname: '', company: '', workemail: '', idCompany: 0, confirm: false }
  modelChangePassword: any = { passworkOld: '', passwordNew: '', passwordNewConfirm: '' }

  form: FormGroup = this._fb.group({
    fullname: [this.model.fullname, [Validators.required]],
    company: [this.model.company],
    workemail: [this.model.workemail, [Validators.required]],
  })

  formChangePassword: FormGroup = this._fb.group({
    passworkOld: [this.model.passworkOld, [Validators.required]],
    passwordNew: [this.model.passwordNew, [Validators.required]],
    passwordNewConfirm: [this.model.passwordNewConfirm, [Validators.required]],
  })
  listTone: any = [{ text: 'Ding', value: 1 }, { text: 'Tong', value: 2 }]

  ngOnInit(): void {
    this.form.controls['company'].disable();
    this.form.controls['workemail'].disable();
    this.rebuilForm();
    this.getData()
  }

  rebuilForm() {
    this.form.reset({
      fullName: '',
      company: '',
      workemail: '',
    })
  }

  get f() {
    return this.form.controls
  }

  getData() {
    if (this.idUser != 0)
      this.accountService.getAccount(this.idUser).subscribe((result) => {
        this.model = result;
      })
  }

  onUpdate() {
    if (this.form.invalid) {
      return
    }
    let request = { ...this.model }
    this.accountService.update(request).subscribe((result) => {
      if (result.status === 1) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update success' });
        this.getData()
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update not success' });
      }
    })
  }

  onChangePassword() {

  }

  url: any = 'https://app.chatwoot.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBL3RBVXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--4124222e04993bf596b60e55006f5ba50c03862d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2QzNKbGMybDZaVWtpRERJMU1IZ3lOVEFHT3daVSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d5bd8600745fd77201f6159b61f8b9f6f6f54b0a/unnamed.jpg'
  changeAvatar(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => this.url = reader.result ? reader.result : ''
      reader.readAsDataURL(file)
    } else this.url = ''
  }

  removeFile() {
    $("#file").val('');
    this.url = ''
  }
}
