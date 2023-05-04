import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.model.id = +params['id']
    })
  }

  title: string = 'Please rate the quality of the conversation'
  model: any = { review: 4, content: '', id: '' }
  submit: boolean = false
  
  onSend() {
    this.submit = true
    this.title = 'Thank you for submitting the rating';
    console.log(this.model)
  }

  changeReview(review: number){
    this.model.review = review
  }

}
