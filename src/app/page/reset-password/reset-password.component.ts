import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { MessageService } from 'primeng/api';
import { AppSettings } from "../../constants/app-setting";
import { EncrDecrService } from '../../service/encr-decr.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [MessageService]
})
export class ResetPasswordComponent implements OnInit {

  constructor(private _fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private encrdecrService: EncrDecrService ) { }
  model: any = {email: ''}
  submitted: boolean = false
  form: FormGroup = this._fb.group({
    email: [this.model.email, [Validators.required,Validators.email]],
  })  
  idUser: any;
  ngOnInit(): void {
  }

  onSubmit(){
    this.submitted = true
    
    this.userService.getByEmail(this.model.email).subscribe((result) => {
      this.idUser = result.idGuId 
      
      let request = {
        linkConfirm: AppSettings.WebAddress + "/set-new-password/",
        to: this.model.email,
        idUser: this.idUser,
      }
      
      this.userService.sendMailResetPassword(request).subscribe((result) => {
        if(result.status == 1){
          // this.router.navigate(['login'])
          this.showInfo("Request for password reset is successful. Check your mail for instructions.");
        }
        else{
        }
      });
    });

  }

	rebuilForm() {
		this.form.reset({
			email: '',
		})
	}
  
	get f() {
		return this.form.controls
	}

  showInfo(message: any) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }
}
