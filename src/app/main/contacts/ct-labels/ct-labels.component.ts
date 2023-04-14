import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ct-labels',
  templateUrl: './ct-labels.component.html',
  styleUrls: ['./ct-labels.component.css']
})
export class CtLabelsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id']
    })
  }

  id: number = 0

}
