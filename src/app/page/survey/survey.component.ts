import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private userInfoStorageService: UserInfoStorageService
  ) { }
  idCompany: any;
  idGuIdEmailInfo: any;
  ngOnInit(): void {
    this.idCompany = this.userInfoStorageService.getCompanyId();
    this.activatedRoute.params.subscribe((params) => {
      const { token } = params;      
      this.idGuIdEmailInfo = token;
    })
  }

  title: string = 'Please rate the quality of the conversation'
  model: any = { review: 4, content: '', id: '' }
  submit: boolean = false
  
  onSend() {
    this.submit = true
    let request = {
      idGuIdEmailInfo: this.idGuIdEmailInfo,
      idFeedBack: this.model.review,
      descriptionFeedBack: this.model.content,
      idCompany: this.idCompany
    }
    
    this.csatService.updateCsat(request).subscribe((result) => {
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
