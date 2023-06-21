import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../service/country.service';
import { ContactService } from '../../service/contact.service';
import { UserInfoStorageService } from '../../service/user-info-storage.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

declare var $: any;
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private countryService: CountryService,
    private contactService: ContactService,
    private userInfoStorageService: UserInfoStorageService,
    private messageService: MessageService,
  ) { }

  textSearch: string = ''
  scrollDemo: any
  contacts: any = []
  countries: any = []
  submitted: boolean = false
  model: any =
    {
      fullname: '',
      email: '',
      bio: '',
      phoneNumber: '',
      company: '',
      city: '',
      country: '',
      address: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      github: ''

      // socialProfiles: '',
      // lastActivity: '',
      // createAt: '',
      // conversations: ''
    };
  idCompany: any

  file: any = {}
  formImport: FormGroup = this._fb.group({
    file: [this.file, [Validators.required]]
  })

  form: FormGroup = this._fb.group({
    fullname: [this.model.fullname, [Validators.required]],
    email: [this.model.email, [Validators.required, Validators.email]],
    bio: [this.model.bio],
    phoneNumber: [this.model.phoneNumber],
    company: [this.model.company],
    city: [this.model.city],
    country: [this.model.country],
    address: [this.model.address],
    facebook: [this.model.facebook],
    twitter: [this.model.twitter],
    linkedin: [this.model.linkedin],
    github: [this.model.github]
  });
  idLabel: any
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.idLabel = +params['id']
    })
    this.idCompany = +this.userInfoStorageService.getCompanyId()
    this.getAllCountry();
    this.getContact();
    // this.scrollDemo = document.querySelector("#box-messages");
    // this.scrollDemo.addEventListener("scroll", (event: any) => {
    //   if (this.scrollDemo.scrollHeight - this.scrollDemo.offsetHeight + this.scrollDemo.scrollTop < 1) {
    //     console.log("Scroll end")
    //   }
    // })
  }

  getAllCountry() {
    this.countryService.getAllCountry().subscribe((result) => {
      this.countries = result;
    });
  }

  getContact() {
    let request = {
      idCompany: this.idCompany,
      idLabel: this.idLabel ? this.idLabel : 0,
      textSearch: this.textSearch
    }
    this.contactService.getFillter(request).subscribe((result) => {
      this.contacts = result;
    });
  }

  onSubmit() {
    this.submitted = true
    this.model.idCompany = this.idCompany
    this.contactService.create(this.model).subscribe((result) => {
      if (result.status == 1) {
        $("#newCOntact").modal("hide");
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add contact success' });
        this.getContact();
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Waning', detail: result.message });
      }
    });
  }

  onSubmitFile() {

  }

  createContact() {
    $("#newContact").modal("show");
  }

  import() {
    $("#import").modal("show");
  }

  get f() {
    return this.form.controls;
  }

}
