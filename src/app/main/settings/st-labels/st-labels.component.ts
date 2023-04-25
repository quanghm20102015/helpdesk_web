import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-st-labels',
  templateUrl: './st-labels.component.html',
  styleUrls: ['./st-labels.component.css']
})
export class StLabelsComponent implements OnInit {
  constructor(private _fb: FormBuilder, private confirmationService: ConfirmationService) { }
  display: boolean = false;
  model: any = { name: '', description: '', color: '#000000',showSidebar: false }
  submitted: boolean = false
  passwordDecrypt: any
  form: FormGroup = this._fb.group({
    name: [this.model.name, [Validators.required]],
    description: [this.model.description],
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
      name: this.model.name,
      description: this.model.description, 
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
  
  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        //Actual logic to perform a confirmation
      }
    });
  }
}
