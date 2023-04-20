import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-canned-response',
  templateUrl: './canned-response.component.html',
  styleUrls: ['./canned-response.component.css']
})
export class CannedResponseComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }
  display: boolean = false;
  listData: any = [
    { code: 'thank', content: 'Thank you!' },
    { code: 'help', content: 'What help do you need?' },
  ]
  model: any = { code: '', content: '' }
  submitted: boolean = false
  form: FormGroup = this._fb.group({
    code: [this.model.code, [Validators.required]],
    content: [this.model.content, [Validators.required]],
  })

  ngOnInit(): void {
    this.rebuilForm();
  }

  rebuilForm() {
    this.form.reset({
      code: this.model.code,
      content: this.model.content,
    })
  }

  get f() {
    return this.form.controls
  }

  showDialog() {
    this.display = true;
  }
}
