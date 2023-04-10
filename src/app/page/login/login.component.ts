import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private _fb: FormBuilder, private router: Router) { }
  model: any = { email: '', password: '' };
  submitted: boolean = false;
  form: FormGroup = this._fb.group({
    email: [this.model.email, [Validators.required, Validators.email]],
    password: [this.model.password, [Validators.required]],
  });

  ngOnInit(): void { }

  onSubmit() {
    this.submitted = true;
  }

  rebuilForm() {
    this.form.reset({
      email: this.model.email,
      password: this.model.password,
    });
  }

  get f() {
    return this.form.controls;
  }

  login() {
    this.router.navigate(['main/dashboard']);
  }
}
