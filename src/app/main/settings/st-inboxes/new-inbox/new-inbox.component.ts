import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfigMailService } from '../../../../service/configMail.service';
import { UserInfoStorageService } from '../../../../service/user-info-storage.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-inbox',
  templateUrl: './new-inbox.component.html',
  styleUrls: ['./new-inbox.component.css']
})
export class NewInboxComponent implements OnInit {
  constructor(private _fb: FormBuilder, 
    private confirmationService: ConfirmationService, 
    private configMailService: ConfigMailService,
    private userInfoStorageService: UserInfoStorageService,
    private messageService: MessageService,
    private router: Router) { }
  display: boolean = false;
  model: any = { yourName: '', email: '', password: '', incoming: '', incomingPort: '', outgoing: '', outgoingPort: '' }
  submitted: boolean = false
  passwordDecrypt: any
  idCompany: any
  form: FormGroup = this._fb.group({
    yourName: [this.model.yourName, [Validators.required]],
    email: [this.model.email, [Validators.required]],
    password: [this.model.email, [Validators.required, Validators.email]],
    incoming: [this.model.email, [Validators.required]],
    incomingPort: [this.model.email, [Validators.required]],
    outgoing: [this.model.email, [Validators.required]],
    outgoingPort: [this.model.email, [Validators.required]],
  })
  ngOnInit(): void {
    this.idCompany = this.userInfoStorageService.getCompanyId()
    this.rebuilForm();
  }

  rebuilForm() {
    this.form.reset({
      yourName: this.model.yourName,
      email: this.model.email,
      password: this.model.password,
      incoming: this.model.incoming,
      incomingPort: this.model.incomingPort,
      outgoing: this.model.outgoing,
      outgoingPort: this.model.outgoingPort,
    })
  }

  get f() {
    return this.form.controls
  }

  create(){
    this.model.idCompany = this.idCompany
    this.configMailService.create(this.model).subscribe((result) => {
      if(result.status == 1){
        this.router.navigate(['main/settings/inboxes']);
      }
      else{
        this.showError(result.message)
      }
    });
  }

  showError(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
