import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { EncrDecrService } from '../../service/encr-decr.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _fb: FormBuilder,
    private userService: UserService,
    private encrdecrService: EncrDecrService) { }
  model: any = { fullName: '', company: '', workemail: '', password: '' }
  submitted: boolean = false
  form: FormGroup = this._fb.group({
    fullName: [this.model.fullName, [Validators.required]],
    company: [this.model.company, [Validators.required]],
    workemail: [this.model.email, [Validators.required, Validators.email]],
    password: [this.model.password, [Validators.required]],
  })

  ngOnInit(): void {
  }

  onSubmit() {
    this.model.password = this.encrdecrService.set("mypassword", this.model.password).toString()
    this.submitted = true
    this.userService.createUser(this.model).subscribe((result) => {
    });
  }

  rebuilForm() {
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
