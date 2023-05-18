import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    if (window.innerWidth <= 1025) {
      let conllapse = $('#btncollapse')
      conllapse.addClass('hide-menu')
    }
  }

  @HostListener('window:resize', ['$event'])

  onResize(event: any) {
    // if (window.innerWidth <= 1025) {
    //   let conllapse = $('#btncollapse')
    //   conllapse.addClass('hide-menu')
    // }
  }

  onCollapse() {
    // let conllapse = $('#btncollapse')
    // conllapse.toggleClass('hide-menu')
  }

}
