import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import * as CryptoJS from 'crypto-js';
import { EncrDecrService } from '../../service/encr-decr.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserInfoStorageService } from '../../service/user-info-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
    private encrdecrService: EncrDecrService,
    private router: Router,
    private messageService: MessageService  , 
    private userInfoStorageService: UserInfoStorageService
    ) { }
  model: any = {workemail: '', password: ''}
  submitted: boolean = false
  form: FormGroup = this._fb.group({
    workemail: [this.model.workemail, [Validators.required,Validators.email]],
    password: [this.model.password, [Validators.required]],
  });

  ngOnInit(): void { 
    this.rebuilForm();
  }

  onSubmit(){
    let request = {
      workemail: this.model.workemail,
      password: this.encrdecrService.set("mypassword", this.model.password).toString()
    }

    this.submitted = true
    this.userService.login(request).subscribe((result) => {
      if(result.status == 1){
        debugger
        this.setLocalStorage(request.workemail)
        this.router.navigate(['main/conversations']);
      }
      else{
        this.showError(result.message);
      }
    });
  }
  
  setLocalStorage(email: any){
    this.userService.getByEmail(email).subscribe((result) => {
      debugger
      this.userInfoStorageService.setCompany(result.company)
    });
  }

  showError(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

	rebuilForm() {
		this.form.reset({
			workemail: this.model.workemail,
			password: this.model.password,
		})
    debugger
	}
  
	get f() {
		return this.form.controls
	}

  login() {
    this.router.navigate(['main/conversations']);
  }
}
