import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-new-inbox',
  templateUrl: './new-inbox.component.html',
  styleUrls: ['./new-inbox.component.css']
})
export class NewInboxComponent implements OnInit {
  constructor(private _fb: FormBuilder, private confirmationService: ConfirmationService) { }
  display: boolean = false;
  model: any = { name: '', email: '', password: '', incoming: '', icomingPort: '', outgoing: '', outgoingPort: '' }
  submitted: boolean = false
  passwordDecrypt: any
  form: FormGroup = this._fb.group({
    name: [this.model.name, [Validators.required]],
    email: [this.model.email, [Validators.required]],
    password: [this.model.email, [Validators.required, Validators.email]],
    incoming: [this.model.email, [Validators.required]],
    icomingPort: [this.model.email, [Validators.required]],
    outgoing: [this.model.email, [Validators.required]],
    outgoingPort: [this.model.email, [Validators.required]],
  })
  ngOnInit(): void {
    this.rebuilForm();
  }

  rebuilForm() {
    this.form.reset({
      name: this.model.name,
      email: this.model.email,
      password: this.model.password,
      incoming: this.model.incoming,
      icomingPort: this.model.icomingPort,
      outgoing: this.model.outgoing,
      outgoingPort: this.model.outgoingPort,
    })
  }

  get f() {
    return this.form.controls
  }
}
