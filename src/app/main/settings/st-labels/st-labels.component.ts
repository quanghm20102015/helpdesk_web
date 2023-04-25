import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LabelService } from '../../../service/label.service';
import { UserInfoStorageService } from '../../../service/user-info-storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-st-labels',
  templateUrl: './st-labels.component.html',
  styleUrls: ['./st-labels.component.css'],
  providers: [MessageService]
})
export class StLabelsComponent implements OnInit {
  constructor(private _fb: FormBuilder,
    private labelService: LabelService,
    private userInfoStorageService: UserInfoStorageService,
    private messageService: MessageService) { }
  display: boolean = false;
  create: boolean = false;
  model: any = { name: '', description: '', color: '#000000',showSidebar: false }
  submitted: boolean = false
  passwordDecrypt: any
  form: FormGroup = this._fb.group({
    name: [this.model.name, [Validators.required]],
    description: [this.model.description],
    color: [this.model.color],
    showSidebar: [this.model.showSidebar],
  })
  idCompany: any;
  listData: any = [
    // { name: 'Label 01', description: 'Description label', color: '#0BF08A', showSidebar: true },
    // { name: 'Label 02', description: 'Description label', color: '#250C1C', showSidebar: false },
  ]

  ngOnInit(): void {
    this.idCompany = this.userInfoStorageService.getCompanyId()
    this.rebuilForm();
    this.loadData();
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
    this.rebuilForm();
    this.create = true;
    this.display = true;
  }

  saveLabel(){
    this.model.idCompany = this.idCompany
    if(this.create){
      this.labelService.create(this.model).subscribe((result) => {
        if(result.status == 1){          
          this.display = false;
          this.loadData();
        }
        else{
          this.showError(result.message);
        }
      });
    }
    else{
      this.labelService.update(this.model).subscribe((result) => {
        if(result.status == 1){       
          this.display = false;
          this.loadData();
        }
        else{
          this.showError(result.message);
        }
      });
    }
  }

  loadData(){
    this.labelService.getByIdCompany(this.idCompany).subscribe((result) => {
      this.listData = result;
    });
  }

  edit(item: any){
    this.create = false;
    this.model = item
    this.display = true;
  }

  delete(item: any){
    
  }

  showError(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
