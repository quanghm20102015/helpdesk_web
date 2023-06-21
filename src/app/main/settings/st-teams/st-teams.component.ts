import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TRISTATECHECKBOX_VALUE_ACCESSOR } from 'primeng/tristatecheckbox';
import { AccountService } from 'src/app/service/account.service';
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
    private messageService: MessageService,
    private accountService: AccountService,
    ) { }
  display: boolean = false;
  submitted: boolean = false
  listAgent: any = []
  idCompany: number = +(localStorage.getItem('companyId') || 0);
  model: any = { id: 0, name: '', description: '', listAgent: [],autoAssign: false  }
  form: FormGroup = this._fb.group({
    name: [this.model.name, [Validators.required]],
    description: [this.model.description],
    listAgent: [this.model.listAgent],
    autoAssign: [this.model.autoAssign],
  })
  listData: any = []

  ngOnInit(): void {
    this.getList()
    this.rebuilForm()
    this.getListAgent()
  }

  rebuilForm() {
    this.form.reset({
      id: 0, name: '', description: '', listAgent: [],autoAssign: false
    })
  }

  get f() {
    return this.form.controls
  }
  
  getListAgent(){
    this.accountService.getByIdCompany(this.idCompany).subscribe((result) => {
      this.listAgent = result;
    })
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
    this.teamService.getById(item.id).subscribe((result) => {
      this.model = result;
    })
    // this.model = { ...item }
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

  
  confirm(id: number) {
    this.confirmationService.confirm({
      header: 'Confirmation delete',
      icon: 'pi pi-exclamation-triangle',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.teamService.deleteById(id).subscribe((result) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete success' });
          this.getList()
        })
      }
    });
  }

}
