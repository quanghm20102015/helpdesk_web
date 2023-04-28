import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CountryService } from 'src/app/service/country.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private _fb: FormBuilder,
    private countryService: CountryService) { }

  model: any = { id: 0, fullname: "quanghm", email: "quanghm2010@gmail.com", bio: "1", phoneNumber: "0343632155", company: "", country: 1, city: "hanoi", facebook: "", twitter: "", linkedin: "", github: ""}
  countries: any = []
  notes: string = ''
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.model.id = +params['id']
    })
  }

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
  });

  getAllCountry() {
    this.countryService.getAllCountry().subscribe((result) => {
      this.countries = result;
    });
  }

  selectedLabel: any = []
  listLabels: any = [
    { name: 'Label 01', id: 156, color: "#333333" },
    { name: 'Label 02', id: 1680, color: "#555555" },
    { name: 'Label 03', id: 430, color: "#858838" },
    { name: 'Label 04', id: 440, color: "#318888" },
    { name: 'Label 05', id: 450, color: "#882388" },
  ]

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
        //Actual logic to perform a confirmation
      }
    });
  }
  
  onSubmit(){    
    // this.contactService.create(this.model).subscribe((result) => {
    //   if(result.status == 1){
    //     $("#newCOntact").modal("hide");
    //     this.getContact();
    //   }
    // });
  }


}
