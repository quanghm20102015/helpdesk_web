import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContactService } from 'src/app/service/contact.service';
import { CountryService } from 'src/app/service/country.service';
import { LabelService } from 'src/app/service/label.service';
import { UserInfoStorageService } from 'src/app/service/user-info-storage.service';
import { LabelGroupsService } from 'src/app/service/labelGroups.service';

declare var $: any;
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private _fb: FormBuilder,
    private countryService: CountryService,
    private contactService: ContactService,
    private userInfoStorageService: UserInfoStorageService,
    private labelService: LabelService,
    private messageService: MessageService,
    private labelGroupsService: LabelGroupsService,
    private router: Router,

  ) { }

  model: any = {}
  countries: any = []
  notes: string = ''
  listNote: any = []
  submitted: boolean = false
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.model.id = +params['id']
    })
    this.getData()
    this.getAllCountry()
    this.getListGroup()
  }

  form: FormGroup = this._fb.group({
    fullname: [this.model.fullname, [Validators.required]],
    email: [this.model.email,[Validators.required, Validators.email]],
    bio: [this.model.bio],
    phoneNumber: [this.model.phoneNumber],
    company: [this.model.company],
    city: [this.model.city],
    groupLabel: [this.model.groupLabel],
    country: [this.model.country],
    address: [this.model.address],
    facebook: [this.model.facebook],
    twitter: [this.model.twitter],
    linkedin: [this.model.linkedin],
    github: [this.model.github]
  });


  getData() {
    this.contactService.getContact(this.model.id).subscribe((result) => {
      this.model = result.contact
      this.listLabels = result.listLabel
      this.listNote = result.listNote
      result.listLabel.forEach((item: { check: boolean; }) => {
        if (item.check == true) {
          this.selectedLabel.push(item)
        }
      });
    });
  }

  addNote(){
    let request = {
      id: 0,
      idContact: this.model.id,
      note: this.notes
    }
    this.contactService.postNoteContact(request).subscribe((result) => {
      // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add note success' });
      this.notes = ''
      this.getData()
    });
  }

  getAllCountry() {
    this.countryService.getAllCountry().subscribe((result) => {
      this.countries = result;
    });
  }

  listGroup: any = []
  getListGroup() {
    this.labelGroupsService.getByIdCompany(this.idCompany).subscribe((result) => {
      this.listGroup = result;
    });
  }

  selectedLabel: any = []
  idCompany: any = this.userInfoStorageService.getCompanyId()
  listLabels: any = []

  position: string = ''
  displayPosition: boolean = false
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  confirm() {
    this.confirmationService.confirm({
      header: 'Confirmation delete',
      icon: 'pi pi-exclamation-triangle',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.contactService.deleteContact(this.model.id).subscribe((result) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete contact success' });
          this.getData()
        })
      }
    });
  }

  onSubmitUpdate() {
    this.submitted = true
    this.contactService.update(this.model).subscribe((result) => {
      if (result.status == 1) {
        $("#newContact").modal("hide");
        this.getData()
        this.submitted = false
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update contact success' });
      }
    });
  }

  listIdLabelSelect: any = []
  onChangeSelectLabel() {
    this.listIdLabelSelect = []
    this.selectedLabel.forEach((x: { id: any; }) => {
      this.listIdLabelSelect.push(x.id)
    })
  }

  updateContactLabel() {
    let request = {
      id: 0,
      idContact: this.model.id,
      listLabel: this.listIdLabelSelect
    }
    this.contactService.postContactLabel(request).subscribe((result) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update success' });
    });
  }

  createContact(){
    $("#newContact").modal("show");
  }

  get f() {
    return this.form.controls;
  }

}
