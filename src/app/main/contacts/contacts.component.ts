import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }

  inputSearch: string = ''
  scrollDemo: any
  contacts: any = []
  model: any = 
  { 
    name: '',
    emailAddress: '',
    phoneNumber: '',
    company: '',
    city: '',
    country: '',
    socialProfiles: '',
    lastActivity: '',
    createAt: '',
    conversations: ''
  };
  
  form: FormGroup = this._fb.group({
    name: [this.model.name],
    emailAddress: [this.model.emailAddress],
    phoneNumber: [this.model.phoneNumber],
    company: [this.model.company],
    city: [this.model.city],
    country: [this.model.country],
    socialProfiles: [this.model.socialProfiles],
    lastActivity: [this.model.lastActivity],
    createAt: [this.model.createAt],
    conversations: [this.model.conversations]
  });
  ngOnInit(): void {
    this.loadData();
    // this.scrollDemo = document.querySelector("#box-messages");
    // this.scrollDemo.addEventListener("scroll", (event: any) => {
    //   if (this.scrollDemo.scrollHeight - this.scrollDemo.offsetHeight + this.scrollDemo.scrollTop < 1) {
    //     console.log("Scroll end")
    //   }
    // })
  }

  loadData(){
    this.contacts=[
      {
        name: 'Van Minh',
        emailAddress: 'vanminh@th.com',
        phoneNumber: '0987 928 888',
        company: 'th',
        city: 'Ha noi',
        country: 'VietNam',
        socialProfiles: '---',
        lastActivity: '---',
        createAt: '1 days ago',
        conversations: '---'
      },
      {
        name: 'Hoang Van',
        emailAddress: 'hoangvan@th.com',
        phoneNumber: '0345 928 123',
        company: 'th',
        city: 'Ho Chi Minh',
        country: 'VietNam',
        socialProfiles: '---',
        lastActivity: '---',
        createAt: '2 days ago',
        conversations: '---'
      },
      {
        name: 'Van Minh',
        emailAddress: 'vanminh@th.com',
        phoneNumber: '0349 123 432',
        company: 'th',
        city: 'Da Nang',
        country: 'VietNam',
        socialProfiles: '---',
        lastActivity: '---',
        createAt: '3 days ago',
        conversations: '---'
      }
    ]
  }

  onSubmit(){
    
  }

  createContact(){
    $("#newCOntact").modal("show");
  }

  import(){
    $("#import").modal("show");
  }
  
}
