import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { EncrDecrService } from '../../../service/encr-decr.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccountService } from 'src/app/service/account.service';
import { AppSettings } from "../../../constants/app-setting";

@Component({
  selector: 'app-st-agents',
  templateUrl: './st-agents.component.html',
  styleUrls: ['./st-agents.component.css']
})
export class StAgentsComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
    private accountService: AccountService,
    private encrdecrService: EncrDecrService, 
    private userInfoStorageService: UserInfoStorageService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    ) { }
  display: boolean = false;
  listRole: any = [
    { value: 1, name: 'Administrator' },
    { value: 2, name: 'Agent' },
  ]
  listData: any = [
    // { name: 'Tran Quan Dan', workemail: 'quantq@sgt.com', role: 1, roleName: 'Administrator', verified: true },
    // { name: 'Nguyen Thi Ha', workemail: 'hant@sgt.com', role: 2, roleName: 'Agents', verified: false },
  ]
  model: any = { fullname: '', role: 2, workemail: '', id: 0 }
  submitted: boolean = false
  passwordDecrypt: any
  form: FormGroup = this._fb.group({
    fullname: [this.model.fullname, [Validators.required]],
    role: [this.model.role, [Validators.required]],
    workemail: [this.model.workemail, [Validators.required, Validators.email]],
  })

  idCompany: number = +(localStorage.getItem('companyId') || 0);
  ngOnInit(): void {
    this.loadListAgent();
    this.rebuilForm();
  }

  loadListAgent(){    
    this.userService.GetByIdCompany(this.idCompany).subscribe((result) => {
      this.listData = result;
    });
  }

  rebuilForm() {
    this.form.reset({
      fullname: '',
      role: 2,
      workemail: '',
    })
  }

  get f() {
    return this.form.controls
  }

  showDialog() {
    this.rebuilForm()
    this.model.id = 0
    this.display = true
  }

  onSave(){
    if(!this.model.id){
      this.addAgent()
    } else {
      this.updateAgent()
    }
  }

  addAgent(){    
    this.model.password = this.encrdecrService.set("mypassword", "123456").toString()
    this.model.company = this.userInfoStorageService.getCompany()
    this.model.idCompany = this.userInfoStorageService.getCompanyId()
    this.model.confirm = true
    this.accountService.create(this.model).subscribe((result) => {
      if(result.status == 1){
        this.display = false
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Create success' });
        this.loadListAgent()
        
        let requestConfirm = {
          linkConfirm: AppSettings.WebAddress + "/set-password/" + result.idGuId,
          to: this.model.workemail,
          fullName: this.model.fullname
        }
        this.sendMailConfirm(requestConfirm);
      }
      else{
      }
    });
  }
  
  sendMailConfirm(request: any){    
    this.userService.SendMailConfirmAddAgent(request).subscribe((result) => {
      if(result.status == 1){
      }
      else{
      }
    });
  }

  updateAgent(){    
    this.model.company = this.userInfoStorageService.getCompany()
    this.model.idCompany = this.userInfoStorageService.getCompanyId()
    this.accountService.update(this.model).subscribe((result) => {
      if(result.status == 1){
        this.display = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update success' });
        this.loadListAgent();
      }
      else{
      }
    });
  }
  
  showDialogUpdate(item: any) {
    this.model = { ...item }
    this.display = true
  }
  
  confirm(id: number) {
    this.confirmationService.confirm({
      header: 'Confirmation delete',
      icon: 'pi pi-exclamation-triangle',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.accountService.deleteById(id).subscribe((result) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete success' });
          this.loadListAgent()
        })
      }
    });
  }

}
