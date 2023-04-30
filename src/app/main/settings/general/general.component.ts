import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoStorageService } from 'src/app/service/user-info-storage.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  model: any = { username: '',idUser: 0, dayResolve: 0 }
  submitted: boolean = false
  form: FormGroup = this._fb.group({
    username: [this.model.username, [Validators.required]],
    dayResolve: [this.model.dayResolve],
  });
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private userInfoStorageService: UserInfoStorageService,
    ) { }

  ngOnInit(): void {
    this.model.idUser = +(this.userInfoStorageService.getIdUser() ? this.userInfoStorageService.getIdUser() : 0)
  }

  get f() {
    return this.form.controls
  }
}
