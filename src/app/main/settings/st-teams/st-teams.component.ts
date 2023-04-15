import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-st-teams',
  templateUrl: './st-teams.component.html',
  styleUrls: ['./st-teams.component.css']
})
export class StTeamsComponent implements OnInit {
  constructor(private _fb: FormBuilder) { }
  display: boolean = false;
  model: any = { teamName: '', teamDescription: '' }
  submitted: boolean = false
  passwordDecrypt: any
  form: FormGroup = this._fb.group({
    teamName: [this.model.teamName, [Validators.required]],
    teamDescription: [this.model.teamDescription],
  })

  ngOnInit(): void {
    this.rebuilForm();
  }

  rebuilForm() {
    this.form.reset({
      teamName: this.model.teamName,
      teamDescription: this.model.teamDescription
    })
  }

  get f() {
    return this.form.controls
  }

  showDialog() {
    this.display = true;
  }

}
