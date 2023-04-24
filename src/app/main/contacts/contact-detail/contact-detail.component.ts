import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  model: any = { "id": 0, "fullname": "quanghm", "email": "quanghm2010@gmail.com", "bio": "1", "phoneNumber": "0343632155", "company": "", "country": 1, "city": "hanoi", "facebook": "", "twitter": "", "linkedin": "", "github": "" }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.model.id = +params['id']
    })
  }

}
