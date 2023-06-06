import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LabelService } from 'src/app/service/label.service';


@Component({
  selector: 'app-st-labels',
  templateUrl: './st-labels.component.html',
  styleUrls: ['./st-labels.component.css'],
  providers: [MessageService]
})
export class StLabelsComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private labelService: LabelService,
    private messageService: MessageService
  ) { }
  display: boolean = false;
  model: any = { name: '', description: '', showSidebar: false }
  submitted: boolean = false
  idCompany: number = +(localStorage.getItem('companyId') || 0);
  form: FormGroup = this._fb.group({
    name: [this.model.name, [Validators.required]],
    description: [this.model.description],
    showSidebar: [this.model.showSidebar],
  })
  listData: any = []

  ngOnInit(): void {
    this.getList()
    this.rebuilForm();
  }

  rebuilForm() {
    this.form.reset({
      name: '',
      description: '',
      showSidebar: false,
    })
  }

  get f() {
    return this.form.controls
  }

  getList() {
    if (this.idCompany != 0)
      this.labelService.getByIdCompany(this.idCompany).subscribe((result) => {
        this.listData = result;
        this.listData.forEach((element: any) => {
          element.name = element.name
        });
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

  confirm(id: number) {
    this.confirmationService.confirm({
      header: 'Confirmation delete',
      icon: 'pi pi-exclamation-triangle',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.labelService.deleteById(id).subscribe((result) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete label success' });
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
      this.labelService.create(request).subscribe((result) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creat label success' });
        this.display = false
        this.getList()
      })
    } else {
      this.labelService.update(request).subscribe((result) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update label success' });
        this.display = false
        this.getList()
      })
    }
  }

}
