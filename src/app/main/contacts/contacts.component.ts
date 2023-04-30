import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../service/country.service';
import { ContactService } from '../../service/contact.service';
import { UserInfoStorageService } from '../../service/user-info-storage.service';

declare var $: any;
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private _fb: FormBuilder,
    private countryService: CountryService,
    private contactService: ContactService,
    private userInfoStorageService: UserInfoStorageService) { }

  inputSearch: string = ''
  scrollDemo: any
  contacts: any = []
  countries: any = []
  model: any = 
  { 
    fullname: '',
    email: '',
    bio: '',
    phoneNumber: '',
    company: '',
    city: '',
    country: '',
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
    email: [this.model.email],
    bio: [this.model.bio],
    phoneNumber: [this.model.phoneNumber],
    company: [this.model.company],
    city: [this.model.city],
    country: [this.model.country],
    facebook: [this.model.facebook],
    twitter: [this.model.twitter],
    linkedin: [this.model.linkedin],
    github: [this.model.github]

    // socialProfiles: [this.model.socialProfiles],
    // lastActivity: [this.model.lastActivity],
    // createAt: [this.model.createAt],
    // conversations: [this.model.conversations]
  });
  ngOnInit(): void {
    this.idCompany = this.userInfoStorageService.getCompanyId()
    this.getAllCountry();
    this.getContact();
    // this.scrollDemo = document.querySelector("#box-messages");
    // this.scrollDemo.addEventListener("scroll", (event: any) => {
    //   if (this.scrollDemo.scrollHeight - this.scrollDemo.offsetHeight + this.scrollDemo.scrollTop < 1) {
    //     console.log("Scroll end")
    //   }
    // })
  }

  getAllCountry(){
    this.countryService.getAllCountry().subscribe((result) => {
      this.countries = result;
    });
  }

  getContact(){
    this.contactService.getByIdCompany(this.idCompany).subscribe((result) => {
      this.contacts = result;
    });
  }

  onSubmit(){    
    debugger
    this.model.idCompany = this.idCompany
    this.contactService.create(this.model).subscribe((result) => {
      if(result.status == 1){
        $("#newCOntact").modal("hide");
        this.getContact();
      }
    });
  }

  onSubmitFile(){

  }

  createContact(){
    $("#newCOntact").modal("show");
  }

  import(){
    $("#import").modal("show");
  }
  
}
