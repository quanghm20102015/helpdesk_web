import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }
  model: any = {fullName: '', company: '',email: '', password: ''}
  submitted: boolean = false
  form: FormGroup = this._fb.group({
    fullName: [this.model.fullName, [Validators.required]],
    company: [this.model.company, [Validators.required]],
    email: [this.model.email, [Validators.required,Validators.email]],
    password: [this.model.password, [Validators.required]],
  })  

  ngOnInit(): void {
  }

  onSubmit(){
    this.submitted = true
  }

	rebuilForm() {
		this.form.reset({
			fullName: this.model.fullName,
			company: this.model.company,
			email: this.model.email,
			password: this.model.password,
		})
	}
  
	get f() {
		return this.form.controls
	}

}
