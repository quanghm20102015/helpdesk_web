import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EncrDecrService } from 'src/app/service/encr-decr.service';
import { UserService } from 'src/app/service/user.service';
import { ConfirmPasswordValidator } from 'src/app/shared/confirm-password.validator';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  
  constructor(
    private activatedRoute: ActivatedRoute, 
    private _fb: FormBuilder,
    private userService: UserService,
    private encrdecrService: EncrDecrService,
    private router: Router,
    private messageService: MessageService
  ) { }

  idGuId: any;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const { token } = params;
      this.idGuId = token;
    });
  }
  model: any = { newPassword: '', confirmPassword: '', token: '' }
  submitted: boolean = false;
  form: FormGroup = this._fb.group({
    newPassword: [this.model.newPassword, [Validators.required]],
    confirmPassword: [this.model.confirmPassword, [Validators.required]]
  },
    {
      validator: ConfirmPasswordValidator("newPassword", "confirmPassword")
    }
  );

  onSubmit() {
    this.submitted = true;
    let request = {
      idGuId: this.idGuId,
      password: this.encrdecrService.set("mypassword", this.model.newPassword).toString()
    }

    // this.userService.resetPassword(request).subscribe((result) => {
    //   if(result.status == 1){        
    //     this.router.navigate(['login'])
    //     this.showSuccess("Change password successful!")
    //   }
    //   else{
    //   }
    // });
    
  }

  rebuilForm() {
    this.form.reset({
      newPassword: '',
      confirmPassword: ''
    });
  }

  get f() {
    return this.form.controls;
  }

  showError(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showSuccess(message: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showInfo(message: any) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }
}
