import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as $ from 'jquery';

interface Status {
  code: number,
  name: string
}

@Component({
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.css']
})

export class MentionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.messenger = this.signature
    this.listMessenger.push(this.listMessenger[1])
    this.listMessenger.push(this.listMessenger[1])
    this.listMessenger.push(this.listMessenger[1])
    this.listMessenger.push(this.listMessenger[1])
    this.listMessenger.push(this.listMessenger[1])
    this.listMessenger.push(this.listMessenger[1])
    this.listMessenger.push(this.listMessenger[1])

    this.scrollDemo = document.querySelector("#box-messages");
    this.scrollDemo.addEventListener("scroll", (event: any) => {
      if (this.scrollDemo.scrollHeight - this.scrollDemo.offsetHeight + this.scrollDemo.scrollTop < 1) {
        console.log("Scroll end")
      }
    })

  }

  readonly: boolean = true
  scrollDemo: any
  Editor: any = ClassicEditor

  inputSearch: string = ''
  messenger: string = ''
  filterStatus: number = 0
  signature: string = '<p></p><p>--------------------</p><p>Chữ ký: MinhPV</p><p>SĐT: 033 3494 434</p>'

  listStatus: Status[] = [
    { code: 1, name: 'Open' },
    { code: 2, name: 'Resolved' },
    { code: 3, name: 'Pending' },
    { code: 4, name: 'Snoozed' },
    { code: 0, name: 'All' },
  ]

  listChat: any[] = [
    { inbox: '1', name: 'Phạm Minh', lastChat: 'Rất vui được gặp bạn', sendDate: '10:34 20/04/2023', status: 1 },
    { inbox: '2', name: 'DungXT', lastChat: 'hello', sendDate: '10:34 20/04/2023', status: 1 },
    { inbox: '3', name: 'Phạm Minh', lastChat: 'Rất vui được gặp bạn', sendDate: '10:34 20/04/2023', status: 1 }
  ]

  listSelectChat: any[] = []

  listMessenger: any[] = [
    { id: 1, messenger: 'nội dung email' },
    {
      id: 2,
      messenger: `Breaking News:
    Our Latest Release is a Game-Changer!
    AFFILIATES WEBINAR | APRIL 20TH, 9:00-10:00 AM (EDT)
     
      Save Your Spot  
    Affiliate webinar
    It’s official! This quarter we’ve got big news to share including exciting features and performance enhancements for plugin and hosting products. We’ll dive into our new AI innovation and show you how this hard-to-resist offering can be a block-busting catalyst to drive more sales. YOU MUST BE THERE to hear the rest!    
     
    Speakers & Agenda  
     
    Hosting built-in
    Elementor AI Integration
    Amitai Gat
    Chief Product Officer
       
    Elementor Pro plugin features
    Hosting New Features
    Asaf Shevach
    Product Marketing Team Lead
     
    Hosting built-in
    Plug-in New Features
    Gabriella Laster
    Senior Product Marketing Manager 
       
    Elementor Pro plugin features
    Marketing Tips
    Itamar Ronen
    Affiliate Team Leader
     
    Want to Hear About the Affiliate Contest? Join us!
    In this webinar we’ll announce a new affiliate contest. Want the best chance to win some awesome prizes? We have plenty of creative content to help you generate materials and drive more sales!
      Register to Event` },
  ]

  onSelectChat(event: any) {
    console.log(event)
  }

  uploadedFiles: any = []
  onUpload(event: any) {
    console.log(event.target.files)
    for (let file of event.target.files) {
      this.uploadedFiles.push(file);
    }
  }

  remoteFile(item: any){

  }

  sendMessenger(){
    let request =  { id: 1, messenger: this.messenger }
    this.listMessenger.push(request)
    this.messenger = this.signature
  }
}
