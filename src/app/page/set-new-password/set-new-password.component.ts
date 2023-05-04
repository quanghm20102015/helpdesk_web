import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/shared/confirm-password.validator';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css']
})
export class SetNewPasswordComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute, 
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.model.token = +params['token']
    })

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

}
