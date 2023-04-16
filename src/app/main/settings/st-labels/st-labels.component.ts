import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-st-labels',
  templateUrl: './st-labels.component.html',
  styleUrls: ['./st-labels.component.css']
})
export class StLabelsComponent implements OnInit {
  constructor(private _fb: FormBuilder) { }
  display: boolean = false;
  model: any = { labelName: '', labelDescription: '', color: '#000000',showSidebar: false }
  submitted: boolean = false
  passwordDecrypt: any
  form: FormGroup = this._fb.group({
    labelName: [this.model.labelName, [Validators.required]],
    labelDescription: [this.model.labelDescription],
    color: [this.model.color],
    showSidebar: [this.model.showSidebar],
  })
  listData: any = [
    { name: 'Label 01', description: 'Description label', color: '#0BF08A', showSidebar: true },
    { name: 'Label 02', description: 'Description label', color: '#250C1C', showSidebar: false },
  ]

  ngOnInit(): void {
    this.rebuilForm();
  }

  rebuilForm() {
    this.form.reset({
      labelName: this.model.labelName,
      labelDescription: this.model.labelDescription, 
      color: this.model.color, 
      showSidebar: this.model.showSidebar, 
    })
  }

  get f() {
    return this.form.controls
  }

  showDialog() {
    this.display = true;
  }
}
