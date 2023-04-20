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
  model: any = { name: '', description: '' }
  submitted: boolean = false
  passwordDecrypt: any
  form: FormGroup = this._fb.group({
    name: [this.model.name, [Validators.required]],
    description: [this.model.description],
  })
  listData: any = [
    { name: 'Team content', description: 'Team for content' },
    { name: 'Team sale', description: 'Team for sale' },
  ]

  ngOnInit(): void {
    this.rebuilForm();
  }

  rebuilForm() {
    this.form.reset({
      name: this.model.name,
      description: this.model.description
    })
  }

  get f() {
    return this.form.controls
  }

  showDialog() {
    this.display = true;
  }

}
