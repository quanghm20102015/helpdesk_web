import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-st-agents',
  templateUrl: './st-agents.component.html',
  styleUrls: ['./st-agents.component.css']
})
export class StAgentsComponent implements OnInit {
  constructor(private _fb: FormBuilder) { }
  display: boolean = false;
  listRole: any = [
    { value: 1, name: 'Administrator' },
    { value: 2, name: 'Agents' },
  ]
  model: any = { agentName: '', role: null, workemail: '' }
  submitted: boolean = false
  passwordDecrypt: any
  form: FormGroup = this._fb.group({
    agentName: [this.model.agentName, [Validators.required]],
    role: [this.model.role, [Validators.required]],
    workemail: [this.model.workemail, [Validators.required, Validators.email]],
  })

  ngOnInit(): void {
    this.rebuilForm();
  }

  rebuilForm() {
    this.form.reset({
      agentName: this.model.agentName,
      role: this.model.role,
      workemail: this.model.workemail,
    })
  }

  get f() {
    return this.form.controls
  }

  showDialog() {
    this.display = true;
  }

}
