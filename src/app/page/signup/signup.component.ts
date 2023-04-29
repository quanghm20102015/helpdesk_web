import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { EncrDecrService } from '../../service/encr-decr.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {

  constructor(private _fb: FormBuilder,
    private userService: UserService,
    private encrdecrService: EncrDecrService,
    private router: Router,
    private messageService: MessageService) { }
  model: any = { fullName: '', company: '', workemail: '', password: '' }
  submitted: boolean = false
  passwordDecrypt: any
  form: FormGroup = this._fb.group({
    fullName: [this.model.fullName, [Validators.required]],
    company: [this.model.company, [Validators.required]],
    workemail: [this.model.email, [Validators.required, Validators.email]],
    password: [this.model.password, [Validators.required]],
  })

  ngOnInit(): void {
    this.rebuilForm();
  }

  onSubmit() {
    this.passwordDecrypt = this.model.password
    this.model.password = this.encrdecrService.set("mypassword", this.model.password).toString()
    this.model.idCompany = 0
    this.model.confirm = 0
    this.submitted = true
    this.userService.createUser(this.model).subscribe((result) => {
      if(result.status == 1){
        this.router.navigate(['/login']);
      }
      else{
        this.model.password = this.passwordDecrypt
        this.showError(result.message);
      }
    });
  }

  showError(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  rebuilForm() {
    debugger
    this.form.reset({
      fullName: this.model.fullName,
      company: this.model.company,
      workemail: this.model.workemail,
      password: this.model.password,
    })
  }

  get f() {
    return this.form.controls
  }
}
