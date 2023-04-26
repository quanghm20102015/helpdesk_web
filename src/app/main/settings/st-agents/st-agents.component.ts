import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { EncrDecrService } from '../../../service/encr-decr.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';


@Component({
  selector: 'app-st-agents',
  templateUrl: './st-agents.component.html',
  styleUrls: ['./st-agents.component.css']
})
export class StAgentsComponent implements OnInit {
  constructor(private _fb: FormBuilder,
    private userService: UserService,
    private encrdecrService: EncrDecrService, 
    private userInfoStorageService: UserInfoStorageService) { }
  display: boolean = false;
  listRole: any = [
    { value: 1, name: 'Administrator' },
    { value: 2, name: 'Agents' },
  ]
  listData: any = [
    // { name: 'Tran Quan Dan', workemail: 'quantq@sgt.com', role: 1, roleName: 'Administrator', verified: true },
    // { name: 'Nguyen Thi Ha', workemail: 'hant@sgt.com', role: 2, roleName: 'Agents', verified: false },
  ]
  model: any = { name: '', role: null, workemail: '' }
  submitted: boolean = false
  passwordDecrypt: any
  form: FormGroup = this._fb.group({
    name: [this.model.name, [Validators.required]],
    role: [this.model.role, [Validators.required]],
    workemail: [this.model.workemail, [Validators.required, Validators.email]],
  })

  ngOnInit(): void {
    this.loadListAgent();
    this.rebuilForm();
  }

  loadListAgent(){    
    this.userService.getAll().subscribe((result) => {
      this.listData = result;
    });
  }

  rebuilForm() {
    this.form.reset({
      name: this.model.name,
      role: this.model.role,
      workemail: this.model.workemail,
    })
  }

  get f() {
    return this.form.controls
  }

  showDialog() {
    this.display = true;
  }

  addAgent(){    
    this.model.password = this.encrdecrService.set("mypassword", "123456").toString()
    this.model.company = this.userInfoStorageService.getCompany()
    this.model.idCompany = this.userInfoStorageService.getCompanyId()
    this.model.fullName = this.model.name
    this.userService.createUser(this.model).subscribe((result) => {
      if(result.status == 1){
        this.display = false;
        this.loadListAgent();
      }
      else{
      }
    });
  }
}
