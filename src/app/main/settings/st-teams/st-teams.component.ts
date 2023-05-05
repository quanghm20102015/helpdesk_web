import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'app-st-teams',
  templateUrl: './st-teams.component.html',
  styleUrls: ['./st-teams.component.css'],
  providers: [MessageService]
})
export class StTeamsComponent implements OnInit {
  constructor(
    private _fb: FormBuilder, 
    private confirmationService: ConfirmationService,
    private teamService: TeamService,
    private messageService: MessageService
    ) { }
  display: boolean = false;
  model: any = { name: '', description: '' }
  submitted: boolean = false
  idCompany: number = +(localStorage.getItem('companyId') || 0);
  form: FormGroup = this._fb.group({
    name: [this.model.name, [Validators.required]],
    description: [this.model.description],
  })
  listData: any = []

  ngOnInit(): void {
    this.getList()
    this.rebuilForm();
  }

  rebuilForm() {
    this.form.reset({
      name: '',
      description: '' 
    })
  }

  get f() {
    return this.form.controls
  }
  
  getList() {
    if (this.idCompany != 0)
      this.teamService.getByIdCompany(this.idCompany).subscribe((result) => {
        this.listData = result;
      })
  }
  
  type: number = 0;
  title: string = ''
  showDialogCreate() {
    this.title = 'Create'
    this.rebuilForm()
    this.type = 1
    this.display = true
  }

  showDialogUpdate(item: any) {
    this.title = 'Update'
    this.type = 2
    this.model = { ...item }
    this.display = true
  }

  confirmDelete(id: number) {
    this.confirmationService.confirm({
      header: 'Confirmation delete',
      icon: 'pi pi-exclamation-triangle',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.teamService.deleteById(id).subscribe((result) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete team success' });
          this.getList()
        })
      }
    });
  }

  onCreateUpdate() {
    if (this.form.invalid) {
      return
    }
    let request = { ...this.model, idCompany: this.idCompany }
    if (this.type === 1) {
      delete request.id
      this.teamService.create(request).subscribe((result) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creat team success' });
        this.display = false
        this.getList()
      })
    } else {
      this.teamService.update(request).subscribe((result) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update team success' });
        this.display = false
        this.getList()
      })
    }
  }

}
