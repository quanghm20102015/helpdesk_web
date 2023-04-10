import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inboxes',
  templateUrl: './inboxes.component.html',
  styleUrls: ['./inboxes.component.css']
})
export class InboxesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id']
    })
  }

  id: number = 0

}
