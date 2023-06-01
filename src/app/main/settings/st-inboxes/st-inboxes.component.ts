import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfigMailService } from '../../../service/configMail.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncrDecrService } from '../../../service/encr-decr.service';

@Component({
  selector: 'app-st-inboxes',
  templateUrl: './st-inboxes.component.html',
  styleUrls: ['./st-inboxes.component.css']
})
export class StInboxesComponent implements OnInit {

  listData: any = [
    // { name: 'Email sale', type: 'Email' },
    // { name: 'Email customer', type: 'Email' },
  ]
  constructor(private _fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private configMailService: ConfigMailService,
    private userInfoStorageService: UserInfoStorageService,
    private messageService: MessageService,
    private encrdecrService: EncrDecrService,
    private router: Router) { }
  display: boolean = false;
  model: any = { yourName: '', email: '', password: '', incoming: '', incomingPort: '', outgoing: '', outgoingPort: '' }
  submitted: boolean = false
  passwordDecrypt: any
  idCompany: any = +this.userInfoStorageService.getCompanyId()
  form: FormGroup = this._fb.group({
    yourName: [this.model.yourName, [Validators.required]],
    email: [this.model.email, [Validators.required, Validators.email]],
    password: [this.model.password, [Validators.required]],
    incoming: [this.model.incoming, [Validators.required]],
    incomingPort: [this.model.incomingPort, [Validators.required]],
    outgoing: [this.model.outgoing, [Validators.required]],
    outgoingPort: [this.model.outgoingPort, [Validators.required]],
  })

  ngOnInit(): void {
    this.loadListConfigMail()
  }

  loadListConfigMail(){    
    this.configMailService.GetByIdCompany(this.idCompany).subscribe((result) => {
      this.listData = result.listConfigMail;
    });
  }

  confirm(id: number) {
    this.confirmationService.confirm({
      header: 'Confirmation delete',
      icon: 'pi pi-exclamation-triangle',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.configMailService.deleteById(id).subscribe((result) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete success' });
          this.loadListConfigMail()
        })
      }
    });
  }

  update(){
    this.configMailService.putEmailInfo(this.model).subscribe((result) => {
      this.display = false
    });
    this.submitted = true
  }
  
  get f() {
    return this.form.controls
  }

  showDialogUpdate(item: any) {
    this.configMailService.GetById(item.id).subscribe((result) => {
      this.model = result
    });
    this.display = true
  }
}
