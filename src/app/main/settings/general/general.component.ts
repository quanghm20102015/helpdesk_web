import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  model: any = { username: 'minhtmu', dayResolve: 0 }
  submitted: boolean = false
  form: FormGroup = this._fb.group({
    username: [this.model.username, [Validators.required]],
    dayResolve: [this.model.dayResolve],
  });
  constructor(
    private _fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls
  }
}
