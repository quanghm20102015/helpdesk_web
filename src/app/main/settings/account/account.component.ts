import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  model: any = {fullName: '', displayName: '', email: ''}
  listTone: any = [{text: 'Ding', value: 1},{text: 'Tong', value: 2}]
  constructor() { }

  ngOnInit(): void {
  }

  url: any = 'https://app.chatwoot.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBL3RBVXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--4124222e04993bf596b60e55006f5ba50c03862d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2QzNKbGMybDZaVWtpRERJMU1IZ3lOVEFHT3daVSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d5bd8600745fd77201f6159b61f8b9f6f6f54b0a/unnamed.jpg'
  changeAvatar(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => this.url = reader.result ? reader.result : ''
      reader.readAsDataURL(file)
    } else this.url = ''
  }

  removeFile() {
    $("#file").val('');
    this.url = ''
  }
}
