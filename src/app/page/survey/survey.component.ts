import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CsatService } from '../../service/csat.service';
import { UserInfoStorageService } from '../../service/user-info-storage.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private csatService: CsatService,
    private userInfoStorageService: UserInfoStorageService
  ) { }
  idCompany: any;
  ngOnInit(): void {
    
    this.idCompany = this.userInfoStorageService.getCompanyId();
    this.activatedRoute.params.subscribe((params) => {
      this.model.id = +params['id']
    })
  }

  title: string = 'Please rate the quality of the conversation'
  model: any = { review: 4, content: '', id: '' }
  submit: boolean = false
  
  onSend() {
    this.submit = true
    let request = {
      idEmailInfo: 0,
      idFeedBack: this.model.review,
      descriptionFeedBack: this.model.content,
      idCompany: this.idCompany
    }
    
    this.csatService.create(request).subscribe((result) => {
      if(result.status == 1){        
        this.title = 'Thank you for submitting the rating';
      }
      else{
      }
    });
  }

  changeReview(review: number){
    this.model.review = review
  }

}
