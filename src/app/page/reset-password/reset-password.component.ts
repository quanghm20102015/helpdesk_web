import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }
  model: any = {email: ''}
  submitted: boolean = false
  form: FormGroup = this._fb.group({
    email: [this.model.email, [Validators.required,Validators.email]],
  })  

  ngOnInit(): void {
  }

  onSubmit(){
    this.submitted = true
  }

	rebuilForm() {
		this.form.reset({
			email: this.model.email,
		})
	}
  
	get f() {
		return this.form.controls
	}

}
